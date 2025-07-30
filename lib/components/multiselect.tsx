import React from 'react';
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

interface MultiselectProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Multiselect = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}: MultiselectProps) => {
  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map((opt, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs px-2 py-1"
                  >
                    {opt}
                  </Badge>
                ))}
              </div>
            ) : (
              label
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[--radix-popover-trigger-width] p-2">
          <div className="flex flex-col gap-1">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="flex items-center justify-between px-2 py-1 w-full rounded hover:bg-muted text-left"
              >
                <span>{option}</span>
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => {}}
                  className="pointer-events-none"
                />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};