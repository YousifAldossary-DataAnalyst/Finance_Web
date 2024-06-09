import { format } from "date-fns";

import {
  Tooltip,
  XAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import CustomTooltip from "./custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
            dot={false}
            dataKey="income"
            stroke="#48bf53"
            strokeWidth={2}
            className="drop-shadow-sm"
        />
        <Line
            dataKey="expenses"
            stroke="#f43f5e"
            className="drop-shadow-sm"
            strokeWidth={2}
            dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
