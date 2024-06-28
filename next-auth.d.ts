import { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: string,
    profile: boolean;
    token: string;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}