import Sidebar from "@/components/sidebar";
import { getUserRole } from "@/hooks/use-function";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user?.profile) {
    return redirect("/onboarding");
  }

  const { role, message } = await getUserRole();

  return (
    <div className="h-full w-full flex overflow-hidden">
      <Sidebar role={role} />
      <main className=" h-full w-full overflow-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
