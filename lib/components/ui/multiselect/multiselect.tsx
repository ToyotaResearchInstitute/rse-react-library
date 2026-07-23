import React from 'react';
import { X } from "lucide-react";
import { Button } from "../button";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Checkbox } from "../checkbox";

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
          <Button
            variant="outline"
            className="h-auto min-h-9 w-full flex-wrap justify-start py-1.5"
          >
            {selectedOptions.length > 0 ? (
              <div className="flex w-full flex-wrap gap-1">
                {selectedOptions.map((opt, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-xs bg-brand-gray px-2 py-0.5 text-xs font-normal text-foreground"
                  >
                    {opt}
                    <span
                      role="button"
                      aria-label={`Remove ${opt}`}
                      tabIndex={0}
                      className="inline-flex cursor-pointer items-center text-muted-foreground hover:text-foreground"
                      // Stop the event on pointerDown so Radix's trigger (which opens
                      // on pointerDown) never fires — otherwise the popover opens
                      // instead of removing the tag.
                      onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelect(opt);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelect(opt);
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </span>
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