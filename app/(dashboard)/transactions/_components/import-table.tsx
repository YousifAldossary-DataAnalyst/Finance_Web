import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeadeSelect } from "./table-head-select";

type Props = {
  header: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSeletChange: (columnIndex: number, value: string | null) => void;
};

export const ImportTable = ({
  header,
  body,
  selectedColumns,
  onTableHeadSeletChange,
}: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {header.map((_index, index) => (
              <TableHead key={index}>
                <TableHeadeSelect
                    columnIndex= {index}
                    selectedColumns={selectedColumns}
                    onChange={onTableHeadSeletChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
            {body.map((row: string[], index) => (
              <TableRow key={index}>
                {row.map((cell, index) => (
                    <TableCell key={index}>
                        {cell}
                    </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
