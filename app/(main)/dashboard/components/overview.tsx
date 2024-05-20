"use client";

import AreaVariant from "@/components/area-variant";
import BarAreaVariant from "@/components/bar-variant";
import LineChartVariant from "@/components/line-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleData, summarizeTasks } from "@/lib/utils";
import { Task } from "@/types";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import { useState } from "react";

export function Overview({ tasks }: { tasks: Task[] }) {
  const data = summarizeTasks(tasks);

  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="col-span-4">
      <CardHeader className="w-full flex flex-row space-y-2 lg:space-y-0 justify-between lg:items-center">
        <CardTitle className=" text-xl line-clamp-1">Overview </CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className=" lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className=" flex items-center">
                <AreaChart className=" size-4 mr-2 shrink-0" />
                <p className=" line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className=" flex items-center">
                <LineChart className=" size-4 mr-2 shrink-0" />
                <p className=" line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className=" flex items-center">
                <BarChart className=" size-4 mr-2 shrink-0" />
                <p className=" line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        {chartType === "area" && (
          <AreaVariant data={[...sampleData, ...data]} />
        )}
        {chartType === "line" && (
          <LineChartVariant data={[...sampleData, ...data]} />
        )}
        {chartType === "bar" && (
          <BarAreaVariant data={[...sampleData, ...data]} />
        )}
      </CardContent>
    </Card>
  );
}
