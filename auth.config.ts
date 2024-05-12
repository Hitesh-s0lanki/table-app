import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas";
import axios from "axios";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const { data, status } = await axios.post(`${process.env.SERVER_URI}/users/login`, { email, password });

                    if (!data.user || status !== 201) return null

                    return data.user
                }

                return null
            }
        })
    ],
} satisfies NextAuthConfig