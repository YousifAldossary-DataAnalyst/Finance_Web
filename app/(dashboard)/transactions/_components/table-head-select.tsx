import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "date", "notes"];

export const TableHeadeSelect = ({
  onChange,
  columnIndex,
  selectedColumns,
}: Props) => {
  const currentSelect = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelect || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus: ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelect && "primary"
        )}
      >
        <SelectValue placeholder="Skip" />
        <SelectContent>
          <SelectItem value="skip">Skip</SelectItem>
          {options.map((option, index) => {
            const disabled = Object.values(selectedColumns)
                .includes(option) && selectedColumns[`column_${columnIndex}`] !== option;
            return (
            <SelectItem
                key={index}
                value={option}
                disabled={disabled}
                className="capitalized"
            >
                {option}
            </SelectItem>
          )})}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};
