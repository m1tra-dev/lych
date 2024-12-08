import { Check } from "lucide-react";
import { useState } from "react";

interface InputProps {
    children: React.ReactNode,
    onChange?: () => void ;
    checked: boolean;
    style?: string;
  }

export const Checkbox: React.FC<InputProps> = ({
    children,
    onChange, 
    checked = false,
    style }) => {

  
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        onChange={onChange}
        checked={checked}
      />
      <div
        className={`w-5 h-5 flex items-center justify-center rounded border border-gray-300 shadow-sm bg-white ${
          checked ? 'bg-gray-600 border-none' : ''
        }`}
      >
        {checked && (
          <Check className="text-secondary" strokeWidth={3.5}/>
        )}
      </div>
      {children}
    </label>
  );
}


