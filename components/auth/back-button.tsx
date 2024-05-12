"use client";

import { Button } from "../ui/button";
import { useAuthModal } from "@/hooks/use-auth-model";

interface BackButtonProps {
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label }) => {
  const { onOpen, type } = useAuthModal();

  return (
    <Button
      onClick={() =>
        onOpen(
          type === "LOGIN"
            ? "REGISTER"
            : type === "PASSWORD"
            ? "LOGIN"
            : "LOGIN"
        )
      }
      variant="link"
      className=" text-black font-normal w-full"
      size="sm"
    >
      {label}
    </Button>
  );
};

export default BackButton;
