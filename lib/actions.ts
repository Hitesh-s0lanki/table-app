"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, ONBOARDING_LOGIN_REDIRECT } from "@/route";

import { signOut } from "@/auth";

export const loginUser = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: ONBOARDING_LOGIN_REDIRECT,
        });
    } catch (error) {
        throw error
    }
}


export const logout = async () => {
    // some server stuff
    await signOut()
}