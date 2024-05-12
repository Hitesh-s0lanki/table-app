"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-model";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

const Navbar = ({ isMain }: { isMain?: boolean }) => {
  const scrolled = useScrollTop();
  const { onOpen } = useAuthModal();

  const user = useCurrentUser();

  return (
    <nav
      className={cn(
        "z-50 bg-gray-50 fixed flex items-center top-0 w-full",
        scrolled && !isMain && "border-b shadow-md",
        isMain && "bg-background"
      )}
    >
      <div className="w-full px-10">
        <div
          className={cn(
            " w-full flex justify-between items-center py-4",
            isMain && " justify-end"
          )}
        >
          {!isMain && (
            <div className="flex-shrink-0">
              <h1 className=" text-lg font-semibold text-black">DATASHARP</h1>
            </div>
          )}
          <div className=" block">
            {!user && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:bg-gray-800 hover:text-white rounded-md text-sm font-medium"
                  onClick={() => onOpen("LOGIN")}
                >
                  Log in
                </Button>
                <Button
                  onClick={() => onOpen("REGISTER")}
                  className="bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
                >
                  Sign Up
                </Button>
              </div>
            )}
            {user && <UserButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
