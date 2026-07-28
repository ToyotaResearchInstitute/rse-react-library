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
    <div className="tri-w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="tri-h-auto tri-min-h-9 tri-w-full tri-flex-wrap tri-justify-start tri-py-1.5"
          >
            {selectedOptions.length > 0 ? (
              <div className="tri-flex tri-w-full tri-flex-wrap tri-gap-1">
                {selectedOptions.map((opt, i) => (
                  <span
                    key={i}
                    className="tri-inline-flex tri-items-center tri-gap-1 tri-rounded-xs tri-bg-brand-gray tri-px-2 tri-py-0.5 tri-text-xs tri-font-normal tri-text-foreground"
                  >
                    {opt}
                    <span
                      role="button"
                      aria-label={`Remove ${opt}`}
                      tabIndex={0}
                      className="tri-inline-flex tri-cursor-pointer tri-items-center tri-text-muted-foreground hover:tri-text-foreground"
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
                      <X className="tri-h-3 tri-w-3" />
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              label
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="tri-w-[--radix-popover-trigger-width] tri-p-2">
          <div className="tri-flex tri-flex-col tri-gap-1">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="tri-flex tri-items-center tri-justify-between tri-px-2 tri-py-1 tri-w-full tri-rounded hover:tri-bg-muted tri-text-left"
              >
                <span>{option}</span>
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => {}}
                  className="tri-pointer-events-none"
                />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};