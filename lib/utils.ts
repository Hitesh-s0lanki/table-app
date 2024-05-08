import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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