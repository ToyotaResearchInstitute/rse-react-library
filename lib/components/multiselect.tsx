import React from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Button, Chip } from '@material-tailwind/react';

interface MultiselectProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Multiselect = ({ label, options, selectedOptions, setSelectedOptions }: MultiselectProps) => {
  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="w-full">
      <Menu>
        <MenuHandler>
          <Button variant="outlined" color="blue" className="w-full">
            {label}
          </Button>
        </MenuHandler>
        <MenuList className="max-w-full">
          {options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleSelect(option)}>
              <div className="flex w-full items-center justify-between">
                <span>{option}</span>
                {selectedOptions.includes(option) && <Chip value="Selected" color="green" size="sm" className="ml-2" />}
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedOptions.map((option, index) => (
          <Chip key={index} value={option} color="blue" size="sm" />
        ))}
      </div>
    </div>
  );
};
