import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import ProjectDetails from "@/components/project-details";
import { Separator } from "@/components/ui/separator";
import { getProjectById } from "@/hooks/use-function";
import { Project, TableType } from "@/types";

interface IParams {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: IParams) => {
  const { message, project } = await getProjectById(params.projectId);

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <ProjectDetails project={project as Project} />
      <Separator />
      <DataTable
        model={project as Project}
        apiLink={"tasks/list"}
        data={(project as Project).tasks}
        title="Tasks"
        filterColumnName="title"
        createHref="/tasks/create"
        tableType={TableType.TASK}
        history={(project as Project).history}
      />
    </div>
  );
};

export default ProjectIdPage;
