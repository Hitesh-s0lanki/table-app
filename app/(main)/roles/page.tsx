import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Role, TableType } from "@/types";

const RolesPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found!" />;

  const { data: roles, status } = await axiosBase(user?.token).get(`/roles`);

  if (status !== 200 || !roles) {
    return <ErrorPage title="Failed to load the projects!" />;
  }

  return (
    <DataTable
      apiLink={"roles/list"}
      data={roles as Role[]}
      title="Roles"
      filterColumnName="name"
      createHref="/roles/create"
      tableType={TableType.ROLE}
    />
  );
};

export default RolesPage;
