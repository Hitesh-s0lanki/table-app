"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
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
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/lib/utils";
import { useOrigin } from "@/hooks/use-origin";

const ResetForm = () => {
  const origin = useOrigin();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, setPending] = useState(false);
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    setPending(true);

    try {
      const { data } = await axios.post(`${SERVER_URI}/users/password/reset`, {
        ...values,
        url: origin,
      });

      console.log(data);

      if (data.response) {
        setError(data.response);
      } else if (data.message) {
        setSuccess(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          setError((error.response?.data as any).message.toString());
        }
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <CardWrapper
      label="Reset Password"
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
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
                      disabled={isPending}
                      placeholder="hiteshsolanki4623@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
