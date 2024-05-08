"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn, SERVER_URI } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { toast } from "sonner";
import Editor from "./editor";

const formSchema = z.object({
  name: z.string().min(3, { message: "Project name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

const ProjectForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const promise = axios
      .post(`${SERVER_URI}/projects`, values)
      .then(() => {
        router.replace("/projects");
        form.reset();
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: "adding the project...",
      success: "added Project successfully",
      error: "Something went wrong in creating the project",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
        <div className=" flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-1/2"
                    placeholder="enter the name of project"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className=" text-black text-muted-foreground text-md font-semibold">
            Define your project here.
          </h1>
          <Separator />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    onChange={(value: string) => {
                      form.setValue("description", value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" w-full p-4 flex justify-center items-center pt-10">
          <Button type="submit" className="w-1/2" disabled={loading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
