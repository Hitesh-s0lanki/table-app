import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getProjects } from "@/hooks/use-function";
import { Project, TableType } from "@/types";

const ProjectsPage = async () => {
  const { message, projects } = await getProjects();

  if (message) {
    return <ErrorPage title={message} />;
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
