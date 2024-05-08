"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import axios from "axios";
import { SERVER_URI } from "@/lib/utils";
import ConfirmModal from "./confirm-model";

const TrashBox = ({ users }: { users: User[] }) => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filterDocuments = users?.filter((user) => {
    return user.UserName.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    userId: string
  ) => {
    event.stopPropagation();
    const promise = axios
      .patch(`${SERVER_URI}/users/${userId}`, {
        isArchive: false,
      })
      .then(() => router.refresh());

    toast.promise(promise, {
      loading: "Restoring user...",
      success: "User restored!",
      error: "Failed to restore user.",
    });
  };

  const onRemove = (userId: String) => {
    const promise = axios.delete(`${SERVER_URI}/users/${userId}`);

    toast.promise(promise, {
      loading: "Deleting user...",
      success: "User deleted!",
      error: "Failed to delete user.",
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
        {filterDocuments?.map((document) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className=" truncate pl-2">{document.UserName}</span>
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
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
