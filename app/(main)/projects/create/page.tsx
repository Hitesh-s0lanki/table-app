import ErrorPage from "@/components/common/error";
import ProjectForm from "@/components/create-form/create-project-form";
import { getUsers } from "@/hooks/use-function";
import { User } from "@/types";

const CreateProjectPage = async () => {
  const { users, message } = await getUsers();

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 p-10">
      <h1 className=" text-black text-xl font-semibold w-full px-10">
        Create new Project.
      </h1>
      <ProjectForm users={users as User[]} />
    </div>
  );
};

export default CreateProjectPage;
