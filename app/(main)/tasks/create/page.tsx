import TasksForm from "@/components/create-form/create-tasks-form";
import ErrorPage from "@/components/common/error";
import { Project, User } from "@/types";
import { getProjects, getUsers } from "@/hooks/use-function";

const CreateTaskPage = async () => {
  const { message: ProjectMessage, projects } = await getProjects();

  if (ProjectMessage) {
    return <ErrorPage title={ProjectMessage} />;
  }

  const { message, users } = await getUsers();

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 p-10">
      <h1 className=" text-black text-xl font-semibold w-full px-10">
        Create new Tasks.
      </h1>
      <TasksForm projects={projects as Project[]} users={users as User[]} />
    </div>
  );
};

export default CreateTaskPage;
