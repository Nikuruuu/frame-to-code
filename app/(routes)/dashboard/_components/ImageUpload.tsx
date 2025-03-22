"use client";

import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/configs/firebaseConfig";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CloudUpload, X, WandSparkles, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  const OnConvertToCodeButtonClick = async () => {
    if (!file || !model || !description) {
      toast("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Check user's credits BEFORE uploading image
      const creditCheck = await axios.post("/api/check-user-credits", {
        email: user?.email,
      });

      if (!creditCheck.data.hasEnoughCredits) {
        toast(`Not enough credits! You have ${creditCheck.data.credits} left.`);
        setLoading(false);
        return;
      }

      // Step 2: Upload image (only if credits are enough)
      const fileName = Date.now().toString();
      const imageRef = ref(storage, `Frame_to_code/${fileName}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      // Step 3: Save details in DB (wireframe-to-code)
      const uid = uuidv4();
      const result = await axios.post("/api/wireframe-to-code", {
        description,
        model,
        imageUrl,
        uid,
        email: user?.email,
      });

      if (result.data.error) {
        toast("An error occurred. Try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push(`/view-code/${uid}`);
    } catch (error) {
      console.error("Error:", error);
      toast("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!previewUrl ? (
          <div className="p-7 border-2 border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-12 w-12 mx-auto text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400 mt-3">Upload your wireframe here</p>
            <div className="w-full flex items-center justify-center">
              <Label
                htmlFor="imageSelect"
                className="p-5 border-2 border-dashed w-full flex items-center justify-center mt-5 cursor-pointer"
              >
                Select Image
              </Label>
              <Input
                type="file"
                id="imageSelect"
                className="hidden"
                onChange={OnImageSelect}
                multiple={false}
                accept="image/png, image/jpeg, image/jpg"
                aria-label="Upload PNG or JPEG image"
              />
            </div>
          </div>
        ) : (
          <div className="p-7 border-4 border-dashed rounded-md shadow-md">
            <Image
              src={previewUrl}
              alt="preview"
              width={400}
              height={400}
              className="object-contain w-full"
            />
            <X
              className="flex item justify-end w-full cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            ></X>
          </div>
        )}
        <div className="p-7 border shadow-md rounded-md">
          <h2 className="font-bold text-lg">Select AI model</h2>
          <SelectComponent value={model} onChange={setModel} />
          <h2 className="font-bold text-lg mt-7">
            Enter description about your webpage
          </h2>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your webpage"
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <Button
          onClick={OnConvertToCodeButtonClick}
          className="text-mainText"
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <WandSparkles />
          )}
          Convert to code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
