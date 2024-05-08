import TasksForm from "@/components/create-tasks-form";
import ErrorPage from "@/components/error";
import { Project, User } from "@/types";
import axios from "axios";

const CreateTaskPage = async () => {
  const { data: projects, status } = await axios.get(
    `${process.env.SERVER_URI!}/projects`
  );

  const { data: users, status: usersStatus } = await axios.get(
    `${process.env.SERVER_URI!}/users`
  );

  if (status !== 200 || !projects || usersStatus !== 200 || !users) {
    return <ErrorPage title="Failed to load the category!" />;
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
