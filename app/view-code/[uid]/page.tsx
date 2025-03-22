"use client";

import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Prompt } from "@/data/Constant";
import AppHeader from "@/app/_components/AppHeader";
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditor from "../_components/CodeEditor";

interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResponse, setCodeResponse] = useState("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Prevent duplicate API calls
  const isGenerating = useRef(false);

  useEffect(() => {
    if (uid) {
      GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async (forceRegenerate = false) => {
    if (loading) return; // Prevent duplicate calls

    setIsReady(false);
    setCodeResponse(""); // Clear old code
    setLoading(true);

    try {
      const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
      console.log("🚀 ~ GetRecordInfo ~ result:", result.data);

      const response = result?.data;
      setRecord(response);

      if (forceRegenerate || !response?.code) {
        // Force regenerate OR if no existing code
        await GenerateCode(response);
      } else {
        // If code already exists, use it
        setCodeResponse(response.code);
        setIsReady(true);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    if (isGenerating.current) return; // Prevent duplicate execution
    isGenerating.current = true;

    setLoading(true);
    try {
      const response = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: `${record.description}\n\n${Prompt.PROMPT}`,
          model: record.model,
          imageUrl: record.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("ReadableStream not supported");

      const decoder = new TextDecoder();
      let fullCode = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder
          .decode(value, { stream: true })
          .replace("```jsx", "")
          .replace("jsx", "")
          .replace("```", "");

        fullCode += text;
        setCodeResponse(fullCode);
      }

      if (record.uid && fullCode) {
        await UpdateCodeToDb(record.uid, fullCode);
      }
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
      setIsReady(true);
      isGenerating.current = false;
    }
  };

  const UpdateCodeToDb = async (uid: string, code: string) => {
    try {
      const response = await axios.put("/api/wireframe-to-code", {
        uid: uid,
        codeResponse: code,
      });
      console.log("🚀 ~ UpdateCodeToDb ~ response:", response.data);
    } catch (error) {
      console.log("🚀 ~ page.tsx:127 ~ UpdateCodeToDb ~ error:", error);
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          {/* SelectionDetails */}

          <SelectionDetail
            record={record}
            regenerateCode={() => GetRecordInfo(true)}
            isReady={isReady}
          />
        </div>
        <div className="col-span-4">
          {/* CodeEditor */}
          {loading ? (
            <div>
              <h2 className="font-bold text-2xl text-center p-20 flex items-center justify-center bg-gray-100 h-[80vh] rounded-lg">
                <Loader2Icon className="animate-spin" />
                Generating Code...
              </h2>
            </div>
          ) : (
            <CodeEditor codeResponse={codeResponse} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
