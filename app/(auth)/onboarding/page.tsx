import UserForm from "@/components/create-form/create-user-form";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const onBoardingPage = async () => {
  const user = await currentUser();

  if (user?.profile) {
    return redirect("/category");
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 py-10 px-20">
      <h1 className=" text-black text-xl font-semibold">onBoarding</h1>
      {user && <UserForm user={user} />}
    </div>
  );
};

export default onBoardingPage;
