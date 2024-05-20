"use client";

import { Project, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UserSelect from "../common/Select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useEffect, useState } from "react";
import NpmSelect from "../common/NpmSelect";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTaskformSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FileState, MultiFileDropzone } from "../common/MultiFileDropzone";
import Image from "next/image";
import Editor from "../common/editor";

const TasksForm = ({
  projects,
  users,
}: {
  projects: Project[];
  users: User[];
}) => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const router = useRouter();
  const formSchema = createTaskformSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) return toast.error("User not Found!");
    setLoading(true);

    const formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("ownerId", values.ownerId);
    formdata.append("status", values.status);
    formdata.append("project", values.project);

    for (let i of values.members) {
      formdata.append("members", i.value);
    }

    if (values.documents) {
      for (let i of values.documents) {
        formdata.append("documents", i);
      }
    }

    const promise = axiosBase(user.token)
      .post(`/tasks/${values.project}`, formdata)
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

  useEffect(() => {
    if (user && user.id) {
      form.setValue("ownerId", user.id);
      form.setValue("status", "PENDING");
    }
  }, [user]);

  const members = form.watch("members");

  return (
    <div className="h-full flex gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 w-full"
        >
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
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
                    defaultValue={"PENDING"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Status of Tasks" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="TODO">TODO</SelectItem>
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

          <FormField
            control={form.control}
            name="documents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documents</FormLabel>
                <FormControl>
                  <MultiFileDropzone
                    value={fileStates}
                    onChange={(files) => {
                      setFileStates(files);
                      const allFiles = files.map((file) => file.file);
                      form.setValue("documents", allFiles);
                    }}
                    onFilesAdded={async (addedFiles) => {
                      setFileStates([...fileStates, ...addedFiles]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" w-full p-4 flex justify-center items-center">
            <Button type="submit" className="w-1/2" disabled={loading}>
              Add
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-1/3">
        <Image src="/pngegg.png" alt="tasks" height={200} width={200} />
      </div>
    </div>
  );
};

export default TasksForm;
