"use client";

import { Project, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UserSelect from "./Select";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import NpmSelect from "./NpmSelect";
import Image from "next/image";
import axios from "axios";
import { SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  members: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, { message: "I user is require for the task" }),
  project: z.string().min(3, { message: "Project is required" }),
  status: z.string({
    required_error: "Please select an status to display.",
  }),
});

const TasksForm = ({
  projects,
  users,
}: {
  projects: Project[];
  users: User[];
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const promise = axios
      .post(`${SERVER_URI}/tasks/${values.project}`, {
        ...values,
        members: values.members.map((member) => member.value),
      })
      .then(() => {
        router.replace("/tasks");
        form.reset();
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: "adding the task...",
      success: "added Task successfully",
      error: "Something went wrong in creating the task",
    });
  };

  const members = form.watch("members");

  return (
    <div className=" grid grid-cols-2 h-full w-full">
      <div className=" flex items-center justify-center h-full w-full">
        <Image src="/pngegg.png" alt="tasks" height={500} width={500} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10  border-2 border-separate rounded-lg"
        >
          <div className="flex flex-col gap-5 p-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="enter the title of task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project*</FormLabel>
                  <FormControl>
                    <NpmSelect
                      isLoading={loading}
                      options={projects.map((project: Project) => ({
                        value: project.id,
                        label: project.name,
                      }))}
                      onChange={(value) => {
                        form.setValue("project", value.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"COMPLETE"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Status of Tasks" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="INPROGRESS">INPROGRESS</SelectItem>
                      <SelectItem value="COMPLETE">COMPLETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users</FormLabel>
                  <FormControl>
                    <UserSelect
                      disabled={loading}
                      options={users.map((user) => ({
                        value: user.id,
                        label: user.UserName,
                      }))}
                      onChange={(value: any) => {
                        form.setValue("members", value);
                      }}
                      value={members}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" w-full p-4 flex justify-center items-center">
            <Button type="submit" className="w-1/2" disabled={loading}>
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TasksForm;
