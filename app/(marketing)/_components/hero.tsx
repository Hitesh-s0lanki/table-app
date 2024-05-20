"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-model";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const user = useCurrentUser();
  const { onOpen } = useAuthModal();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
      <div className="text-center space-y-4 flex flex-col items-center justify-center">
        <Image src="/home.png" alt="home" height={400} width={400} />
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to Our Data Analysis Platform
        </h1>
        <p className="text-gray-600">
          Delivering insights and driving business performance with data.
        </p>
        <Button
          onClick={() => {
            if (user) {
              router.push("/dashboard");
            } else {
              onOpen("LOGIN");
            }
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded inline-flex items-center"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>{"Let's Start"}</span>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
