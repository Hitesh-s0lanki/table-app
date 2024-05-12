"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormSuccess from "../common/form-success";
import FormError from "../common/form-error";
import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthError } from "next-auth";
import { ONBOARDING_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import Loading from "../common/loading";
import { User } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";

const NewVerificationForm = () => {
  const router = useRouter();

  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const seachParams = useSearchParams();
  const token = seachParams.get("token");

  const onSubmit = useCallback(async () => {
    if (user) {
      setSuccess("Email verified Successfully");
      return;
    }

    if (error || success) return;

    if (!token) {
      setError("Missing Token!");
      return;
    }

    try {
      const { data } = await axios.get(`${SERVER_URI}/users/verify/${token}`);

      if (data.response) {
        setError(data.response);
      } else if (data.user && data.message) {
        setSuccess(data.message);

        const { email, password } = data.user as User;

        await signIn("credentials", {
          email,
          password,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message.toString());
      } else if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            setError("Invalid Credentials!");
          default:
            setError("Something went wrong");
        }
      }
      throw error;
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="h-full w-full flex justify-center items-center bg-yellow-600">
      <Card className="p-10">
        <CardHeader>
          <CardTitle>Token verification</CardTitle>
          <CardDescription>Confirming your verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center w-full justify-center flex-col gap-5">
            {!success && !error && <Loading />}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-center items-center">
          <Button
            variant="link"
            onClick={() =>
              router.push(success ? ONBOARDING_LOGIN_REDIRECT : "/")
            }
          >
            {success ? "continue to onboarding" : "Back to home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewVerificationForm;
