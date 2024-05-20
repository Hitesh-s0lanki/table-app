import ProfileImage from "@/components/common/profile-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/types";

export function RecentSales({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-8">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              <ProfileImage name={task.name} />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{task.name}</p>
            <p className="text-sm text-muted-foreground">{task.project.name}</p>
          </div>
          <div className="ml-auto font-medium">{task.members.length}</div>
        </div>
      ))}
    </div>
  );
}
