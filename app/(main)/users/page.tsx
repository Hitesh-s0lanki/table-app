import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { TableType, User } from "@/types";

const UserPage = async () => {
  const user = await currentUser();

  if (!user?.token) {
    return <ErrorPage title="No accessToken provided" />;
  }

  const { data: users, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI}/users`
  );

  if (status !== 200 || !users) {
    return <ErrorPage title="Failed to load the users!" />;
  }

  return (
    <DataTable
      apiLink={"users/list"}
      data={users as User[]}
      title="Users"
      filterColumnName="UserName"
      createHref="/users/create"
      tableType={TableType.USER}
    />
  );
};

export default UserPage;
