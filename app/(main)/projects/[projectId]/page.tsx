import Editor from "@/components/common/editor";
import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { TasksDataTable } from "@/components/tasks-data-table";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Project, TableType } from "@/types";

interface IParams {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: IParams) => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found!" />;

  const { data: project, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI}/projects/${params.projectId}`
  );

  if (status !== 200 || !project) {
    return <ErrorPage title="Failed to load the products!" />;
  }

  return (
    <div className="flex flex-col gap-5 h-full w-full p-20">
      <h1 className=" text-xl font-semibold">{(project as Project).name}</h1>
      <Separator />
      <div className=" flex flex-col gap-5">
        <h2 className=" text-sm font-semibold">Description</h2>
        <Editor
          initialContent={(project as Project).description}
          editable={false}
        />
      </div>
      <Separator />
      <DataTable
        model={project as Project}
        apiLink={"tasks/list"}
        data={(project as Project).tasks}
        title="Tasks"
        filterColumnName="title"
        createHref="/tasks/create"
        tableType={TableType.TASK}
      />
    </div>
  );
};

export default ProjectIdPage;
