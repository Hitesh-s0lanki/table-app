import { cn, pickRandomColorCombo } from "@/lib/utils";

const ProfileImage = ({ name }: { name: string }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  // Example of using the function
  const randomColorCombo = pickRandomColorCombo();

  return (
    <span
      className={cn(
        "user-profile-image",
        randomColorCombo.bg,
        randomColorCombo.text
      )}
    >
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;
