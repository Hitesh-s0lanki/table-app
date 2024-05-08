import ErrorPage from "@/components/error";
import { TasksDataTable } from "@/components/tasks-data-table";
import { Task } from "@/types";
import axios from "axios";

const TasksPage = async () => {
  const { data: tasks, status } = await axios.get(
    `${process.env.SERVER_URI}/tasks`
  );

  if (status !== 200 || !tasks) {
    return <ErrorPage title="Failed to load the tasks!" />;
  }

  return (
    <div className="h-full w-full p-20 flex flex-col gap-5">
      <h1 className="text-black font-semibold text-xl">Tasks</h1>
      <TasksDataTable data={tasks as Task[]} />
    </div>
  );
};

export default TasksPage;
