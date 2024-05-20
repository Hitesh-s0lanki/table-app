import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

const BarAreaVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
        <Bar
          dataKey="pending"
          fill="#3b82f6"
          className=" drop-shadow-sm"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="inprogress"
          fill="#f43f5e"
          className=" drop-shadow-sm"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="complete"
          fill="##3d8212"
          className=" drop-shadow-sm"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarAreaVariant;
