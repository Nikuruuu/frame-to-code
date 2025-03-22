import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { AiModelList } from "../data/Constant";

interface SelectComponentProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function SelectComponent({
  value,
  onChange,
}: SelectComponentProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select AI Model" />
      </SelectTrigger>
      <SelectContent>
        {AiModelList?.map((model, index) => (
          <SelectItem key={index} value={model.name}>
            <div className="flex items-center gap-2 ">
              <Image src={model.icon} alt={model.name} width={25} height={25} />
              <h2>{model.name}</h2>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
