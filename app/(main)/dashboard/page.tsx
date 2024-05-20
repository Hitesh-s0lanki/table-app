import { Metadata } from "next";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { RecentSales } from "./components/recent-sales";
import { UserButton } from "@/components/auth/user-button";
import { List, ShieldQuestionIcon } from "lucide-react";
import TaskCard from "./components/task-card";
import { Overview } from "./components/overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <UserButton />
          </div>
        </div>

        <TaskCard />
      </div>
    </div>
  );
}
