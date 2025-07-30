import {
  Select as ShadSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/selectShadcn';
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
  return (
    <ShadSelect
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger
        id={id}
        data-testid={`select-dropdown-${id}`}
        className={`${styles['selectContainer']} text-gray-900 font-normal`}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="font-medium text-gray-900 border-none shadow-md">
        {options.map((option, index) => (
          <SelectItem
            key={`${id}-dropdown-${index}`}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;