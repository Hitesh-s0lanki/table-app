import TasksForm from "@/components/create-form/create-tasks-form";
import ErrorPage from "@/components/common/error";
import { Project, User } from "@/types";
import axios from "axios";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";

const CreateTaskPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found!" />;

  const { data: projects, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI!}/projects`
  );

  const { data: users, status: usersStatus } = await axiosBase(user.token).get(
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
