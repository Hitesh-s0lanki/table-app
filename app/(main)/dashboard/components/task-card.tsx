import ErrorPage from "@/components/common/error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project, Status, Task } from "@/types";
import { List, PenBoxIcon, ShieldQuestionIcon } from "lucide-react";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { getUserTasks } from "@/hooks/use-function";

const TaskCard = async () => {
  const { tasks, message } = await getUserTasks();

  if (message) {
    return <ErrorPage title={message} />;
  }

  const userTasks: Task[] = tasks;

  const userCount = userTasks.length;

  const listPendingTasks = userTasks.filter(
    (task) => task.status === "PENDING"
  );

  const listActiveTasks = userTasks.filter(
    (task) => task.status === "INPROGRESS"
  );

  const listCompleteTasks = userTasks.filter(
    (task) => task.status === Status.COMPLETED
  );

  const findUniqueProjects = (tasks: Task[]): Project[] => {
    const projectMap: { [key: string]: Project } = {};

    tasks.forEach((task) => {
      if (!projectMap[task.project.id]) {
        projectMap[task.project.id] = task.project;
      }
    });

    return Object.values(projectMap);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Task Allocated
            </CardTitle>
            <List className=" size-5 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userCount > 10 ? userCount : `0${userCount}`}
            </div>
            <p className="text-xs text-muted-foreground">
              total number of task {(tasks as Task[]).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projects enroll
            </CardTitle>
            <ShieldQuestionIcon className=" size-5 text-orange-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{findUniqueProjects(tasks).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {findUniqueProjects(tasks).length > 0
                ? `${findUniqueProjects(tasks)[0].name} the last project`
                : "No project enroll"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Pending</CardTitle>
            <PenBoxIcon className=" size-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listPendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              number of pending task
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Active</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listActiveTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              number of pending in progress
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview tasks={userTasks} />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Complete</CardTitle>
            <CardDescription>
              You made {listCompleteTasks.length} tasks this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales tasks={listCompleteTasks} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TaskCard;
