import { Option, Select as MTSelect } from '@material-tailwind/react';
import styles from './select.module.css';

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
      className={`${styles['selectContainer']} text-gray-900 font-normal `}
      labelProps={{
        className: 'before:mr-0 after:ml-0',
      }}
      menuProps={{
        className: 'font-medium text-gray-900 border-none shadow-md',
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
