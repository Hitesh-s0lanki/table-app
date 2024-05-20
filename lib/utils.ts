import { Task, TaskSummary } from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { CheckCircle, Circle, Clock, HelpCircle } from "lucide-react";
import { twMerge } from "tailwind-merge"

export const axiosBase = (accesstoken?: string, roleId?: string) => axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    accesstoken,
    role: roleId
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpeg" || fileType === "gif" || fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}

export const Tags = [
  {
    name: "touchpad"
  },
  {
    name: "keyboard"
  },
  {
    name: "mouse"
  },
  {
    name: "laptop"
  },
  {
    name: "smartphone"
  },
  {
    name: "tablet"
  },
  {
    name: "headphones"
  },
  {
    name: "monitor"
  },
  {
    name: "printer"
  },
  {
    name: "camera"
  },
]

export const SERVER_URI = "http://localhost:4000"


// Define the array of color combinations
const colorCombinations = [
  { bg: "bg-blue-500", text: "text-white" },
  { bg: "bg-red-500", text: "text-white" },
  { bg: "bg-green-500", text: "text-white" },
  { bg: "bg-yellow-400", text: "text-gray-800" },
  { bg: "bg-indigo-500", text: "text-white" },
  { bg: "bg-purple-500", text: "text-white" },
  { bg: "bg-pink-500", text: "text-white" },
  { bg: "bg-teal-500", text: "text-white" },
  { bg: "bg-gray-300", text: "text-black" },
  { bg: "bg-orange-500", text: "text-white" }
];

// Function to pick a random color combination
export function pickRandomColorCombo() {
  const randomIndex = Math.floor(Math.random() * colorCombinations.length);
  return colorCombinations[randomIndex];
}



export function summarizeTasks(tasks: Task[]): { date: Date; complete: number; inprogress: number; pending: number }[] {
  const summaryMap: { [key: string]: { date: Date; complete: number; inprogress: number; pending: number } } = {};

  tasks.forEach(task => {
    const createdAtDate = task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt);
    const dateKey = createdAtDate.toISOString().split('T')[0];
    if (!summaryMap[dateKey]) {
      summaryMap[dateKey] = { date: task.createdAt, complete: 0, inprogress: 0, pending: 0 };
    }

    if (task.status === "COMPLETED") {
      summaryMap[dateKey].complete += 1;
    } else if (task.status === "INPROGRESS") {
      summaryMap[dateKey].inprogress += 1;
    } else if (task.status === "PENDING") {
      summaryMap[dateKey].pending += 1;
    }
  });

  return Object.values(summaryMap);
}

export const sampleData: TaskSummary[] = [
  {
    date: new Date('2024-05-10'),
    complete: 0,
    inprogress: 0,
    pending: 1
  },
  {
    date: new Date('2024-05-11'),
    complete: 0,
    inprogress: 2,
    pending: 0
  },
  {
    date: new Date('2024-05-12'),
    complete: 0,
    inprogress: 0,
    pending: 0
  },
  {
    date: new Date('2024-05-13'),
    complete: 0,
    inprogress: 0,
    pending: 0
  },
];

export const status = [
  {
    value: "PENDING",
    label: "Pending",
    icon: HelpCircle,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "INPROGRESS",
    label: "In Progress",
    icon: Clock,
  },
  {
    value: "COMPLETED",
    label: "Complete",
    icon: CheckCircle,
  },
]
