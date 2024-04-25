import { Option, Select as MTSelect } from '@material-tailwind/react';

export interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  options: OptionType[];
  id: string;  
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const Select = ({ options, id, value, onChange }: SelectProps) => {
  const handleChange = (val: string | undefined) => {
    if (val) {
      onChange(val);
    }
  };

  return (
    <MTSelect
      id={id}
      data-testid={`select-dropdown-${id}`}
      value={value}
      onChange={handleChange}
      className="!border border-t-1 !border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
      labelProps={{
        className: 'hidden',
      }}
    >
      {options.map((option, index) => {
        return (
          <Option
            key={`${id}-dropdown-${index}`}
            value={option.value}
          >
            {option.label}
          </Option>
        );
      })}
    </MTSelect>
  );
};

export default Select;
