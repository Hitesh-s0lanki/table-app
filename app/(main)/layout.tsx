"use client";

import Sidebar from "@/components/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import Navbar from "../(marketing)/_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();

  if (!user?.profile) {
    return redirect("/onboarding");
  }

  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <main className=" h-full w-full overflow-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
