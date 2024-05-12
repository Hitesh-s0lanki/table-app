import ErrorPage from "@/components/common/error";
import UserDetails from "@/components/user-details";
import { User } from "@/types";
import axios from "axios";

interface IParams {
  params: {
    userId: string;
  };
}

const UserDetailsPage = async ({ params }: IParams) => {
  const { data: user, status } = await axios.get(
    `${process.env.SERVER_URI}/users/${params.userId}`
  );

  if (status !== 200 || !user) {
    return <ErrorPage title="Failed to load the users!" />;
  }

  return (
    <div className=" h-full w-full flex flex-col gap-5 p-20">
      <h1 className=" text-xl font-semibold">{(user as User).UserName}</h1>
      <UserDetails user={user as User} />
    </div>
  );
};

export default UserDetailsPage;
