"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Editor from "../common/editor";
import { createProjectFormSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Project, User } from "@/types";
import MultiCreatableSelect from "../multi-createable";
import NpmSelect from "../common/NpmSelect";
import Select from "../common/Select";
import { Separator } from "../ui/separator";
import { format } from "url";

const ProjectForm = ({
  users,
  project,
}: {
  users: User[];
  project?: Project;
}) => {
  const router = useRouter();

  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [clientValue, setClientValue] = useState<any[]>([]);
  const [technologyValue, setTechnologyValue] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const formSchema = createProjectFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (!user) return toast.error("User not found!");

    const promise = axiosBase(user?.token)
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

  useEffect(() => {
    if (project) {
      form.setValue("name", project.name);
      form.setValue("description", project.description);
      form.setValue("managerId", project.managerId);
      form.setValue(
        "participants",
        project.participants.map((e) => e.id)
      );
      form.setValue("technology", project.technology);
      form.setValue("client", project.client);

      setClientValue(
        project.client.map((e) => ({
          value: e,
          label: e,
        })) || []
      );
      setTechnologyValue(
        project.technology.map((e) => ({
          value: e,
          label: e,
        })) || []
      );
      setParticipants(
        project.participants.map((e) => ({
          value: e.id,
          label: e.UserName,
        }))
      );
    }
  }, [project]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter the name of project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <MultiCreatableSelect
                    disabled={loading}
                    options={clientValue.map((subcategory: any) => ({
                      value: subcategory.id,
                      label: subcategory.name,
                    }))}
                    onChange={(value: any) => {
                      setClientValue(value);
                      form.setValue(
                        "client",
                        value.map((e: any) => e.value),
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    value={clientValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology</FormLabel>
                <FormControl>
                  <MultiCreatableSelect
                    disabled={loading}
                    options={clientValue.map((subcategory: any) => ({
                      value: subcategory.id,
                      label: subcategory.name,
                    }))}
                    onChange={(value: any) => {
                      setTechnologyValue(value);
                      form.setValue(
                        "technology",
                        value.map((e: any) => e.value),
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    value={technologyValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="managerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <FormControl>
                  <NpmSelect
                    isLoading={loading}
                    options={users.map((user: User) => ({
                      value: user.id,
                      label: user.UserName,
                    }))}
                    onChange={(value) => {
                      form.setValue("managerId", value.value, {
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
            name="participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participants</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.UserName,
                    }))}
                    onChange={(value: any) => {
                      setParticipants(value);
                      form.setValue(
                        "participants",
                        value.map((e: any) => e.value)
                      );
                    }}
                    value={participants}
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

        <Separator />
        <div className=" w-full p-4 flex justify-center items-center">
          <Button type="submit" className="w-1/2" disabled={loading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
