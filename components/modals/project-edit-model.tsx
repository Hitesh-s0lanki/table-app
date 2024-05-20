import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditProjectModal } from "@/hooks/use-edit-project";
import ProjectForm from "../create-form/create-project-form";
import { useCallback, useEffect, useState } from "react";
import { axiosBase } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Project, User } from "@/types";
import Loading from "../common/loading";

const ProjectEditModal = () => {
  const { isOpen, onClose, id } = useEditProjectModal();
  const user = useCurrentUser();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<Project | undefined>(undefined);

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    if (id && user) {
      const { data: users } = await axiosBase(user.token).get(`/users`);
      setUsers(users);
      const { data: project } = await axiosBase(user.token).get(
        `/projects/${id}`
      );
      setProject(project);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getUsers();
  }, [getUsers, id]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent></DialogContent>
        </DialogHeader>
        {isLoading ? (
          <Loading />
        ) : (
          <ProjectForm users={users} project={project} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditModal;
