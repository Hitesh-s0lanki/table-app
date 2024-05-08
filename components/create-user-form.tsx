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

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name cannot be empty" })
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username should only include alphanumeric characters and should not start with a digit."
    ),
  lastName: z
    .string()
    .min(1, { message: "Last name cannot be empty" })
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username should only include alphanumeric characters and should not start with a digit."
    ),
  middleName: z
    .string()
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username should only include alphanumeric characters and should not start with a digit."
    ),
  UserName: z
    .string()
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username should only include alphanumeric characters and should not start with a digit."
    ),
  email: z.string().email("Invalid email format"),
  contact: z.string().min(1, { message: "Contact number is neccesary" }),
  dob: z.date().optional(),
  city: z.string().min(1, { message: "City cannot be empty" }),
  landMark: z.string().min(1, { message: "Landmark cannot be empty" }),
  State: z.string().min(1, { message: "State cannot be empty" }),
  Country: z.string().min(1, { message: "Country cannot be empty" }),
  Pincode: z.string(),
});

const UserForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [tagsValue, setTagsValue] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const promise = axios
      .post(`${SERVER_URI}/users`, values)
      .then(() => {
        router.replace("/users");
        form.reset();
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: "adding the user...",
      success: "added user successfully",
      error: "Something went wrong in creating the user",
    });
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
