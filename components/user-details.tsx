"use client";

import { User } from "@/types";

const UserDetails = ({ user }: { user: User }) => {
  return (
    <div className=" flex flex-col gap-5 w-full">
      <p className=" text-muted-foreground text-md">Role : {user.role?.name}</p>
      <p className=" text-muted-foreground text-md">
        firstName : {user.profile?.firstName}
      </p>
      <p className=" text-muted-foreground text-md">
        middleName : {user.profile?.middleName}
      </p>
      <p className=" text-muted-foreground text-md">
        LastName : {user.profile?.lastName}
      </p>

      <div className=" flex flex-col gap-3">
        <h2 className=" font-semibold text-black">Tasks</h2>
        {user.tasks.map((e) => (
          <p key={e.id}>
            {e.project.name} ---- {e.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
