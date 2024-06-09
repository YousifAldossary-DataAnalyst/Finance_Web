import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import {parse, format} from "date-fns"

const dateFormat = "yyyy-MM-dd HH:mm:ss" || "yyyy-MM-dd HH:mm:ss" || "yyyy-MM-dd" || "dd-MM-yyyy"  || "dd/MM/yyyy" || "yyyy/MM/dd"
const outputFormat = "yyyy-MM-dd";

const requiredOption = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSeletChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
        return row.reduce((acc:any, cell, index) => {
            const header= mappedData.headers[index]
            if(header !== null){
                acc[header] = cell
            }

            return acc;
        }, {})
    })
    
    const formatedData = arrayOfData.map((item) => ({
        ...item,
        amount: convertAmountToMiliunits(parseFloat(item.amount)),
        date: format(parse(item.date, dateFormat, new Date()), outputFormat)
    }))

    onSubmit(formatedData)
  };

  return (
    <div className="max-w-screen-2xll mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex gap-y-2 flex-col lg:flex-row items-center gap-x-2">
            <Button
              size="sm"
              onClick={onCancel}
              className="w-full lg:w-auto bg-primary-foreground text-black border-primary/10 border-2 hover:bg-secondary/30"
            >
              Cancel
            </Button>
            <Button
              className="w-full lg:w-auto"
              size="sm"
              disabled={progress < requiredOption.length}
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOption.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-black/50 mb-2 text-sm lg:text-base">
            Please, make sure to select Payee, Amount (Numbers), and Date (YYYY-MM-DD HH:mm:ss)
          </p>

          <ImportTable
            header={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSeletChange={onTableHeadSeletChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
