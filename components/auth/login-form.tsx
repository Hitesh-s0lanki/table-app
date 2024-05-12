"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/lib/utils";
import { useOrigin } from "@/hooks/use-origin";
import { loginUser } from "@/lib/actions";
import { useAuthModal } from "@/hooks/use-auth-model";
import { signIn } from "next-auth/react";
import { User } from "@/types";
import { DEFAULT_LOGIN_REDIRECT, ONBOARDING_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

const LoginForm = () => {
  const { onClose, onOpen } = useAuthModal();

  const searchParams = useSearchParams();
  const urlError: string =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email use with differrnt proider"
      : "";

  const origin = useOrigin();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${SERVER_URI}/users/login`, {
        ...values,
        url: origin,
      });

      if (data.user) {
        const redirectTo = (data.user as User).profile
          ? DEFAULT_LOGIN_REDIRECT
          : ONBOARDING_LOGIN_REDIRECT;

        await signIn("credentials", {
          ...values,
          redirectTo,
        });

        onClose();
      } else if (data.response) {
        setError(data.response);
      } else if (data.message) {
        setSuccess(data.message);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Sign in to DataSharp"
      label="Welcome back"
      backButtonLabel="Don't have an account?"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="hiteshsolanki4623@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <Button
                    size="sm"
                    variant={"link"}
                    className="px-0 font-normal"
                    asChild
                  >
                    <Button variant="link" onClick={() => onOpen("PASSWORD")}>
                      Forgot password?
                    </Button>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
