import { checkFileType } from "@/lib/utils";
import * as z from "zod";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["ADMIN", "USER"]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Password is required!",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(2, { message: "Password is required" })
});

export const ResetSchema = z.object({
    email: z.string().email(),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password is should be minimun of 8 letters" }),
    UserName: z.string().min(3, { message: "UserName is Required" })
});

export const createUserFormSchema = (isAdmin?: boolean) => z.object({
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
    UserName: isAdmin ? z
        .string()
        .regex(
            /^[a-zA-Z][a-zA-Z0-9]*$/,
            "Username should only include alphanumeric characters and should not start with a digit."
        )
        : z.string().optional(),
    email: isAdmin ? z.string().email("Invalid email format") : z.string().email().optional(),
    contact: z.string().min(1, { message: "Contact number is neccesary" }),
    dob: z.date().optional(),
    city: z.string().min(1, { message: "City cannot be empty" }),
    landMark: z.string().min(1, { message: "Landmark cannot be empty" }),
    State: z.string().min(1, { message: "State cannot be empty" }),
    Country: z.string().min(1, { message: "Country cannot be empty" }),
    Pincode: z.string(),
});

export const createProductFormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    price: z.string().min(2, {
        message: "Price must be mention",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    category: z.string().min(2, {
        message: "Category must be selected.",
    }),
    Tags: z.array(z.string()).min(1, {
        message: "Tag must be selected.",
    }),
    bannnerImage: z
        .instanceof(File, { message: "Banner Image is required!" })
        .refine(
            (file) => checkFileType(file),
            "Only .png, .jpeg, .jpg, .gif formats are supported."
        ),
    images: z
        .array(z.instanceof(File))
        .refine(
            (files) => files.map((file) => checkFileType(file)),
            "Only .png, .jpeg, .jpg, .gif formats are supported."
        ),
});

export const createProjectFormSchema = z.object({
    name: z.string().min(3, { message: "Project name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
});

export const createTaskformSchema = z.object({
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

export const createCategoryFormSchema = z.object({
    name: z.string().min(2).max(20),
    description: z.string().min(1, {
        message: "description must be provided...",
    }),
});

export const createSubCategoryFormSchema = z.object({
    id: z.string().min(2, {
        message: "Id is require",
    }),
    name: z.string().min(2).max(20),
    description: z.string().min(1, {
        message: "description must be provided...",
    }),
});

export const editCategoryFormSchema = z.object({
    name: z.string().min(2).max(20),
    description: z.string().min(1, {
        message: "description must be provided...",
    }),
});

export const editSubCategoryFormSchema = z.object({
    name: z.string().min(2).max(20),
    description: z.string().min(1, {
        message: "description must be provided...",
    }),
});

export const editTaskFormSchema = z.object({
    status: z.string({
        required_error: "Please select an status to display.",
    }),
});

