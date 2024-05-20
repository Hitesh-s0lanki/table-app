import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getUsers } from "@/hooks/use-function";
import { TableType, User } from "@/types";

const UserPage = async () => {
  const { message, users } = await getUsers();

  if (message) {
    return <ErrorPage title={message} />;
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
