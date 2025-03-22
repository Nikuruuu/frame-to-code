import { Button } from "@/components/ui/button";
import { RefreshCcwIcon, ChevronLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SelectionDetail({ record, regenerateCode, isReady }: any) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigateToDashboard = () => {
    setIsNavigating(true);
    router.push("/dashboard");
  };
  return (
    record && (
      <div className="p-5 bg-gray-100 h-[80vh] rounded-lg">
        <Button onClick={handleNavigateToDashboard} disabled={isNavigating}>
          {isNavigating ? (
            <>
              <Loader2Icon className="animate-spin" />
              Dashboard
            </>
          ) : (
            <>
              <ChevronLeft />
              Dashboard
            </>
          )}
        </Button>
        <h2 className="mt-4 font-bold my-2">Wireframe:</h2>
        <Image
          src={record.imageUrl}
          alt="Wireframe"
          width={300}
          height={400}
          className="rounded-lg object-contain h-[200px] w-full mt-5 border-2 border-dashed p-2 bg-white"
        />
        <h2 className="font-bold mb-2 mt-4">AI Model</h2>
        <h2 className="p-1 bg-white border-2 border-dotted rounded-md">
          {record?.model}
        </h2>
        <h2 className="font-bold mb-2 mt-4">Description</h2>
        <h2 className="p-1 bg-white border-2 border-dotted rounded-md h-[150px]">
          {record?.description}
        </h2>
        <Button
          className="mt-7 w-full"
          disabled={!isReady}
          onClick={regenerateCode}
        >
          <RefreshCcwIcon />
          Regenerate Code
        </Button>
      </div>
    )
  );
}

export default SelectionDetail;
