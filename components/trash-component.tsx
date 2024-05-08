"use client";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TrashBox from "./trash-box";
import axios from "axios";
import { User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { SERVER_URI } from "@/lib/utils";
import Loading from "./loading";

const TrashComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    const { data: users, status } = await axios.get(
      `${SERVER_URI}/users/archived`
    );

    setIsMounted(true);

    if (status !== 200 || !users) {
      return;
    }

    setUsers(users);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!isMounted) return <Loading />;

  return (
    <Popover>
      <PopoverTrigger className="mt-4">
        <Button variant="outline">
          <Trash className=" h-4 w-4 mr-2" />
          Trash
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72" side={"bottom"}>
        <TrashBox users={users} />
      </PopoverContent>
    </Popover>
  );
};

export default TrashComponent;
