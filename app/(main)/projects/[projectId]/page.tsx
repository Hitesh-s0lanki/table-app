import Editor from "@/components/editor";
import ErrorPage from "@/components/error";
import { TasksDataTable } from "@/components/tasks-data-table";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import axios from "axios";

interface IParams {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: IParams) => {
  const { data: project, status } = await axios.get(
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
      <TasksDataTable data={(project as Project).tasks} />
    </div>
  );
};

export default ProjectIdPage;
