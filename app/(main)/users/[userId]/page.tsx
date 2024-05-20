import ErrorPage from "@/components/common/error";
import UserDetails from "@/components/user-details";
import { getUserById } from "@/hooks/use-function";
import { User } from "@/types";

interface IParams {
  params: {
    userId: string;
  };
}

const UserDetailsPage = async ({ params }: IParams) => {
  const { users, message } = await getUserById(params.userId);

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <div className=" h-full w-full flex flex-col gap-5 p-20">
      <h1 className=" text-xl font-semibold">{(users as User).UserName}</h1>
      <UserDetails user={users as User} />
    </div>
  );
};

export default UserDetailsPage;
