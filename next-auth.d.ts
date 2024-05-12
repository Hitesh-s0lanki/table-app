import { DefaultSession } from "next-auth"
import { UserRole } from "./types";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole,
    profile: boolean;
    token: string;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}