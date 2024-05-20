import { format } from "date-fns";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomTooltips from "./custom-tooltips";

interface Props {
  data: {
    date: Date;
    complete: number;
    inprogress: number;
    pending: number;
  }[];
}

const LineChartVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value: Date) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltips />} />
        <Line
          dot={false}
          dataKey="pending"
          stroke="#3b82f6"
          strokeWidth={2}
          className=" drop-shadow-sm"
        />
        <Line
          dot={false}
          dataKey="inprogress"
          stroke="#f43f5e"
          className=" drop-shadow-sm"
          strokeWidth={2}
        />
        <Line
          dot={false}
          dataKey="complete"
          stroke="##3d8212"
          className=" drop-shadow-sm"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartVariant;
