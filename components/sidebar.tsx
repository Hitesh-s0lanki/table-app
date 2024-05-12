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
  UserRound,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkTooltips from "./common/link-tooltips";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/types";
import Image from "next/image";
import { ImProfile } from "react-icons/im";
import { signOut } from "next-auth/react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Categories",
    icon: LayoutDashboard,
    href: "/category",
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
];

const AdminRoute = [
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

  const user = useCurrentUser();

  return (
    <div className="hidden space-y-4 py-4 w-60 md:flex md:flex-col lg:flex lg:flex-col h-full bg-[#111827] text-white justify-between ">
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

          {user?.role.toString() === "ADMIN" &&
            AdminRoute.map((route) => (
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
