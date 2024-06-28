import { axiosBase } from "@/lib/utils";
import { AxiosError } from "axios";
import { User } from "next-auth";

export const getUserById = async (id?: string, user?: (User & {
    role: string;
    profile: boolean;
    token: string;
})) => {
    try {
        if (!id) {
            throw new Error("Id not provided!")
        }

        if (!user) {
            throw new Error("User not found!")
        }

        const { data: users } = await axiosBase(user.token, user.role).get(`/users/${id}`);

        return {
            message: null,
            users
        }

    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    users: null
                }
            }
        }
        return {
            message: error.message,
            users: null
        }
    }
}

export const getRoles = async (user?: (User & {
    role: string;
    profile: boolean;
    token: string;
})) => {
    try {
        if (!user) {
            throw new Error("User not found!")
        }

        const { data: roles } = await axiosBase(user.token, user.role).get("/roles");

        return {
            message: null,
            roles
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response) {
                return {
                    message: ((error.response?.data as any).message.toString()),
                    roles: null
                }
            }
        }
        return {
            message: error.message,
            roles: null
        }
    }
}
