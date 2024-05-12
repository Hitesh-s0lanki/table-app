"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCreateSubCategoryModal } from "@/hooks/use-create-subcategory";
import { useCreateCategoryModal } from "@/hooks/use-create-category";

interface LinkTooltipsProps {
  children: React.ReactNode;
  list_href: string;
  create_href: string;
}

const LinkTooltips = ({
  children,
  list_href,
  create_href,
}: LinkTooltipsProps) => {
  const { onOpen: handleSubCategoryOpen } = useCreateSubCategoryModal();
  const { onOpen: handleCategoryOpen } = useCreateCategoryModal();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">{children}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={5} className="p-2">
          <div className="flex flex-col gap-1 w-full">
            <Link href={list_href}>
              <div className="text-md text-black flex gap-1  justify-between items-center px-4 py-2 hover:bg-slate-200 rounded-md">
                List
                <ChevronRight />
              </div>
            </Link>
            {create_href === "/subcategory/create" && (
              <Button
                variant="ghost"
                asChild
                onClick={() => handleSubCategoryOpen()}
              >
                <div className=" cursor-pointer text-md text-black flex gap-1  justify-between items-center px-4 py-2 hover:bg-slate-200 rounded-md">
                  Create
                  <ChevronRight />
                </div>
              </Button>
            )}
            {create_href === "/category/create" && (
              <Button
                variant="ghost"
                asChild
                onClick={() => handleCategoryOpen()}
              >
                <div className="text-md text-black flex gap-1  justify-between items-center px-4 py-2 hover:bg-slate-200 rounded-md cursor-pointer">
                  Create
                  <ChevronRight />
                </div>
              </Button>
            )}
            {create_href !== "/category/create" &&
              create_href !== "/subcategory/create" && (
                <Link href={create_href}>
                  <div className="text-md text-black flex gap-1  justify-between items-center px-4 py-2 hover:bg-slate-200 rounded-md">
                    Create
                    <ChevronRight />
                  </div>
                </Link>
              )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkTooltips;
