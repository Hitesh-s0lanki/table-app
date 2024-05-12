import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Project, TableType } from "@/types";

const ProjectsPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found!" />;

  const { data: projects, status } = await axiosBase(user?.token).get(
    `${process.env.SERVER_URI}/projects`
  );

  if (status !== 200 || !projects) {
    return <ErrorPage title="Failed to load the projects!" />;
  }

  return (
    <DataTable
      apiLink={"projects/list"}
      data={projects as Project[]}
      title="Projects"
      filterColumnName="name"
      createHref="/projects/create"
      tableType={TableType.PROJECT}
    />
  );
};

export default ProjectsPage;
