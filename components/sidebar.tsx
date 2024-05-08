"use client";

import { cn } from "@/lib/utils";
import {
  CassetteTape,
  Code,
  ImageIcon,
  LayoutDashboard,
  List,
  MessageSquare,
  PersonStandingIcon,
  ShieldQuestionIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { League_Spartan, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkTooltips from "./link-tooltips";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Categories",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
    create_href: "/category/create",
  },
  {
    label: "SubCategories",
    icon: CassetteTape,
    href: "/subcategory",
    color: "text-violet-500",
    create_href: "/subcategory/create",
  },
  {
    label: "Products",
    icon: ShoppingCartIcon,
    href: "/products",
    color: "text-pink-700",
    create_href: "/products/create",
  },
  {
    label: "Projects",
    icon: ShieldQuestionIcon,
    href: "/projects",
    color: "text-orange-700",
    create_href: "/projects/create",
  },
  {
    label: "Users",
    icon: PersonStandingIcon,
    href: "/users",
    color: "text-emerald-500",
    create_href: "/users/create",
  },
  {
    label: "Tasks",
    icon: List,
    href: "/tasks",
    color: "text-green-700",
    create_href: "/tasks/create",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden space-y-4 py-4 w-60 md:flex md:flex-col lg:flex lg:flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Tables
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <LinkTooltips
              key={route.href}
              list_href={route.href}
              create_href={route.create_href}
            >
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            </LinkTooltips>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
