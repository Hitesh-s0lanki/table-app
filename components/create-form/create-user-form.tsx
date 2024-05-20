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
import { axiosBase, cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { User } from "next-auth";
import { createUserFormSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AxiosError } from "axios";

const UserForm = ({ isAdmin, user }: { isAdmin?: boolean; user?: User }) => {
  const router = useRouter();
  const formSchema = createUserFormSchema(isAdmin);

  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      let redirectUrl = "/";

      if (user) {
        const token = (user as any).token;

        await axiosBase(token).post(`/users/profile/${user.id}`, values);
      } else {
        await axiosBase(currentUser?.token!).post(
          `/users/admin/profile`,
          values
        );
        redirectUrl = "/users";
      }
      toast.success("User Profile Created Successfully");
      router.replace(redirectUrl);
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
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
        <div className=" flex flex-col gap-2">
          <h1 className=" text-black text-muted-foreground text-md font-semibold">
            Personal Details
          </h1>
          <Separator />
          <div className="grid grid-cols-2 gap-2 gap-x-5 grid-rows-2 p-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="enter the first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isAdmin && (
              <FormField
                control={form.control}
                name="UserName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isAdmin && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the username"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No.*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the username"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* //Address ---  */}
        <div className=" flex flex-col gap-2">
          <h1 className=" text-black text-muted-foreground text-md font-semibold">
            Address
          </h1>
          <Separator />
          <div className="grid grid-cols-2 gap-2 gap-x-5 grid-rows-2 p-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City*</FormLabel>
                  <FormControl>
                    <Input placeholder="enter the city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="landMark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the landmark*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="State"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the PinCode"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className=" w-full p-4 flex justify-center items-center">
          <Button type="submit" className="w-1/2" disabled={loading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
