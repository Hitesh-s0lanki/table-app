import ProjectForm from "@/components/create-project-form";

const CreateProjectPage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5 p-10">
      <h1 className=" text-black text-xl font-semibold w-full px-10">
        Create new Product.
      </h1>
      <ProjectForm />
    </div>
  );
};

export default CreateProjectPage;
