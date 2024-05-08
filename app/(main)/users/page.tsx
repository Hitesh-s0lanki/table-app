import ErrorPage from "@/components/error";
import TrashComponent from "@/components/trash-component";
import { UsersDataTable } from "@/components/users-data-table";
import { User } from "@/types";
import axios from "axios";

const UserPage = async () => {
  const { data: users, status } = await axios.get(
    `${process.env.SERVER_URI}/users`
  );

  if (status !== 200 || !users) {
    return <ErrorPage title="Failed to load the users!" />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 p-20">
      <h1 className=" text-xl font-semibold">Users</h1>
      <UsersDataTable data={users as User[]} />
    </div>
  );
};

export default UserPage;
