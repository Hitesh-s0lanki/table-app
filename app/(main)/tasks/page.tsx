import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getTasks } from "@/hooks/use-function";
import { TableType, Task } from "@/types";

const TasksPage = async () => {
  const { message, tasks } = await getTasks();

  if (message) {
    return <ErrorPage title={message} />;
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
