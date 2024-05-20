"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Category, dataTableType } from "@/types";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import ConfirmModal from "./confirm-model";
import { useCurrentUser } from "@/hooks/use-current-user";

const TrashBox = ({
  data,
  apiLink,
}: {
  data: dataTableType;
  apiLink: string;
}) => {
  const router = useRouter();
  const user = useCurrentUser();

  const [search, setSearch] = useState("");

  const filterDocuments = data?.filter((user: any) => {
    if (user.name) {
      return user.name.toLowerCase().includes(search.toLowerCase());
    } else if (user.title) {
      return user.title.toLowerCase().includes(search.toLowerCase());
    } else if (user.UserName) {
      return user.UserName.toLowerCase().includes(search.toLowerCase());
    }

    return user.id.toLowerCase().includes(search.toLowerCase());
  });

  if (!user) return null;

  const onClick = (userId: string) => {
    router.push(`/${apiLink}/${userId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    userId: string
  ) => {
    event.stopPropagation();
    const promise = axiosBase(user?.token, user.role)
      .patch(`/${apiLink.split("/")[0]}/${userId}`, {
        isArchived: false,
      })
      .then(() => router.refresh());

    toast.promise(promise, {
      loading: `Restoring ${apiLink.split("/")[0]}...`,
      success: `${apiLink.split("/")[0]} restored!`,
      error: `Failed to restore ${apiLink.split("/")[0]}.`,
    });
  };

  const onRemove = (userId: String) => {
    const promise = axiosBase(user.token, user.role)
      .delete(`${SERVER_URI}/${apiLink.split("/")[0]}/${userId}`)
      .then(() => router.refresh());

    toast.promise(promise, {
      loading: `Deleting ${apiLink.split("/")[0]}...`,
      success: `${apiLink.split("/")[0]} deleted!`,
      error: `Failed to delete ${apiLink.split("/")[0]}.`,
    });
  };

  return (
    <div className=" text-sm">
      <div className=" flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className=" hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filterDocuments?.map((document: any) => {
          let value = "";

          if (document.name) {
            value = document.name;
          } else if (document.title) {
            value = document.title;
          } else if (document.UserName) {
            value = document.UserName;
          }

          return (
            <div
              key={document.id}
              role="button"
              onClick={() => onClick(document.id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className=" truncate pl-2">{value}</span>
              <div className=" flex items-center">
                <div
                  onClick={(e) => onRestore(e, document.id)}
                  role="button"
                  className=" rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(document.id)}>
                  <div
                    role="button"
                    className=" rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Trash className=" h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrashBox;
