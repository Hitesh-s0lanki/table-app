import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { TableType, Task } from "@/types";

const TasksPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found!" />;

  const { data: tasks, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI}/tasks`
  );

  if (status !== 200 || !tasks) {
    return <ErrorPage title="Failed to load the tasks!" />;
  }

  return (
    <DataTable
      apiLink={"tasks/list"}
      data={tasks as Task[]}
      title="Tasks"
      filterColumnName="title"
      createHref="/tasks/create"
      tableType={TableType.TASK}
    />
  );
};

export default TasksPage;
