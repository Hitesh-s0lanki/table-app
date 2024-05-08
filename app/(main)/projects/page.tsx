import ErrorPage from "@/components/error";
import { ProjectsDataTable } from "@/components/projects-data-table";
import { Project } from "@/types";
import axios from "axios";

const ProjectsPage = async () => {
  const { data: projects, status } = await axios.get(
    `${process.env.SERVER_URI}/projects`
  );

  if (status !== 200 || !projects) {
    return <ErrorPage title="Failed to load the projects!" />;
  }

  return (
    <div className="h-full w-full p-20 flex flex-col gap-5">
      <h1 className="text-black font-semibold text-xl">Projects</h1>
      <ProjectsDataTable data={projects as Project[]} />
    </div>
  );
};

export default ProjectsPage;
