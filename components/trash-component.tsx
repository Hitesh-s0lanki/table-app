"use client";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TrashBox from "./common/trash-box";
import { dataTableType, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import Loading from "./common/loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

const TrashComponent = ({ apiLink }: { apiLink: string }) => {
  const user = useCurrentUser();

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<dataTableType>([]);

  const getTableData = useCallback(async () => {
    if (!user) return toast.error("User not found!");

    const { data, status } = await axiosBase(user.token, user.role).get(
      `${SERVER_URI}/${apiLink}/archived`
    );

    setIsMounted(true);

    if (status !== 200 || !data) {
      return;
    }

    setData(data);
  }, [apiLink, user]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

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
        <TrashBox data={data} apiLink={apiLink} />
      </PopoverContent>
    </Popover>
  );
};

export default TrashComponent;
