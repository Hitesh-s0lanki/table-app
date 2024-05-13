"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../common/form-error";
import FormSuccess from "../common/form-success";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ONBOARDING_LOGIN_REDIRECT } from "@/route";
import Loading from "../common/loading";
import { toast } from "sonner";

const NewPasswordForm = () => {
  const router = useRouter();
  const seacrhParams = useSearchParams();
  const token = seacrhParams.get("verify");
  const user = useCurrentUser();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post(`${SERVER_URI}/users/password/change`, {
        id: user?.id,
        ...values,
        url: origin,
      });

      toast.success("Updated password successfully");

      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  const onLoad = useCallback(async () => {
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
  }, [token, user, error, success]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className="h-full w-full flex justify-center items-center bg-yellow-600">
      <div className=" w-1/2">
        {success ? (
          <CardWrapper
            label="Welcome back"
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-4"
              >
                <div className=" space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            placeholder="**********"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!success && <FormError message={error} />}
                <FormSuccess message={success} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Login
                </Button>
              </form>
            </Form>
          </CardWrapper>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default NewPasswordForm;
