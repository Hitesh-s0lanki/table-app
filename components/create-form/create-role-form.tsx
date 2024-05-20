"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import CRUDCheckBox from "../CRUD-check-box";
import {
  Asterisk,
  CassetteTape,
  LayoutDashboard,
  List,
  PersonStandingIcon,
  ShieldQuestionIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { axiosBase } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";

const formSchema = z.object({
  name: z.string().min(1, { message: "Role Name is required" }),
  description: z.string(),
  category: z.array(z.string()),
  subcategory: z.array(z.string()),
  products: z.array(z.string()),
  projects: z.array(z.string()),
  tasks: z.array(z.string()),
  users: z.array(z.string()),
  roles: z.array(z.string()),
});

const labelForm = [
  {
    name: "category",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    name: "subcategory",
    icon: CassetteTape,
    color: "text-violet-500",
  },
  {
    name: "products",
    icon: ShoppingCartIcon,
    color: "text-pink-700",
  },
  {
    name: "projects",
    icon: ShieldQuestionIcon,
    color: "text-orange-700",
  },
  {
    name: "tasks",
    icon: List,
    color: "text-green-700",
  },
  {
    name: "users",
    icon: PersonStandingIcon,
    color: "text-emerald-500",
  },
  {
    name: "roles",
    icon: Asterisk,
    color: "text-rose-500",
  },
];

type formSchemaType = z.infer<typeof formSchema>;

const RoleForm = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: [],
      subcategory: [],
      products: [],
      projects: [],
      tasks: [],
      users: [],
      roles: [],
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    setIsLoading(true);

    if (!user) return toast.error("User not found!");

    try {
      await axiosBase(user.token).post("/roles", values);

      toast.success("Role Created Successfully");
      router.push("/roles");
    } catch (error) {
      toast.error("Something went wrong in creating the user profile");
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error((error.response?.data as any).message.toString());
        }
      }
    } finally {
      form.reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full w-full flex flex-col gap-5 "
        >
          <Card className=" border-none">
            <div className="flex justify-between items-center w-full">
              <CardHeader>
                <CardTitle>Create a role</CardTitle>
                <CardDescription>
                  Define the rights given to the role
                </CardDescription>
              </CardHeader>
              <Button
                disabled={isLoading}
                size="sm"
                className="mr-10"
                type="submit"
              >
                Save
              </Button>
            </div>
            <CardContent className=" flex flex-col gap-5 pb-10">
              <Card>
                <CardHeader>
                  <CardTitle className=" text-lg">Details</CardTitle>
                  <CardDescription>
                    Name and description of the role
                  </CardDescription>
                </CardHeader>
                <CardContent className=" grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="enter the role name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="enter the description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className=" text-lg">Collection Types</CardTitle>
                  <CardDescription>
                    Select the options you want to this role to perform
                  </CardDescription>
                </CardHeader>
                <CardContent className=" flex flex-col gap-5">
                  {labelForm.map((field) => (
                    <CRUDCheckBox
                      key={field.name}
                      name={field.name}
                      form={form}
                      icon={field.icon}
                      color={field.color}
                    />
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default RoleForm;
