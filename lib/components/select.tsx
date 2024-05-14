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
      className="text-black"
      labelProps={{
        className: 'before:mr-0 after:ml-0',
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
