"use client";

import { cn } from "@/lib/utils";
import {
  CassetteTape,
  LayoutDashboard,
  List,
  PersonStandingIcon,
  ShieldQuestionIcon,
  ShoppingCartIcon,
  UserRound,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkTooltips from "./common/link-tooltips";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaCriticalRole, FaDashcube } from "react-icons/fa";
import { Role } from "@/types";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    id: "category",
    label: "Category",
    icon: LayoutDashboard,
    href: "/category",
    color: "text-sky-500",
    create_href: "/category/create",
  },
  {
    id: "subcategory",
    label: "SubCategory",
    icon: CassetteTape,
    href: "/subcategory",
    color: "text-violet-500",
    create_href: "/subcategory/create",
  },
  {
    id: "products",
    label: "Products",
    icon: ShoppingCartIcon,
    href: "/products",
    color: "text-pink-700",
    create_href: "/products/create",
  },
  {
    id: "projects",
    label: "Projects",
    icon: ShieldQuestionIcon,
    href: "/projects",
    color: "text-orange-700",
    create_href: "/projects/create",
  },
  {
    id: "user",
    label: "Users",
    icon: PersonStandingIcon,
    href: "/users",
    color: "text-emerald-500",
    create_href: "/users/create",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: List,
    href: "/tasks",
    color: "text-green-700",
    create_href: "/tasks/create",
  },
  {
    id: "roles",
    label: "Roles",
    icon: FaCriticalRole,
    href: "/roles",
    color: "text-blue-700",
    create_href: "/roles/create",
  },
];

type modelType =
  | "products"
  | "category"
  | "subcategory"
  | "projects"
  | "tasks"
  | "user"
  | "roles";

const Sidebar = ({ role }: { role: Role }) => {
  const pathname = usePathname();

  const user = useCurrentUser();

  return (
    <div className="hidden space-y-4 py-4 w-60 md:flex md:flex-col lg:flex lg:flex-col h-full bg-[#111827] text-white justify-between ">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Tables
          </h1>
        </Link>
        <div className="space-y-1">
          <Link
            href={"/dashboard"}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === "/dashboard"
                ? "text-white bg-white/10"
                : "text-zinc-400"
            )}
          >
            <div className="flex items-center flex-1">
              <FaDashcube className={cn("h-5 w-5 mr-3 via-violet-600")} />
              Dashboard
            </div>
          </Link>
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

          <Link
            href={`/users/${user?.id}`}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === `/users/${user?.id}`
                ? "text-white bg-white/10"
                : "text-zinc-400"
            )}
          >
            <div className="flex items-center flex-1">
              <UserRound className={cn("h-5 w-5 mr-3 text-red-600")} />
              Profile
            </div>
          </Link>
        </div>
      </div>
      <div className="flex cursor-pointer gap-4 p-4">
        <Image src="/logout.svg" alt="logout" width={24} height={24} />
        <p
          className="text-light-2 max-lg:hidden"
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
