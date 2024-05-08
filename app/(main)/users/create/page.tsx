import UserForm from "@/components/create-user-form";

const CreateUserPage = () => {
  return (
    <div className=" flex flex-col gap-5 h-full w-full py-10 px-20">
      <h1 className=" text-lg font-semibold ">Create User</h1>
      <UserForm />
    </div>
  );
};

export default CreateUserPage;
