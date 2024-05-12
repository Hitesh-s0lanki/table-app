import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import axios from "axios"
import { User, UserRole } from "./types"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/",
        error: "/error"
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true

            const { data: existingUser, status } = await axios.get(`${process.env.SERVER_URI}/users/${user.id}`)

            // Prevent Sign-in without email verification
            if (!existingUser || status !== 200 || !existingUser.emailVerified) return false

            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.profile = !!token.profile
                session.user.token = token.token as string
            }

            return session
        },
        async jwt({ token }) {

            if (!token.sub) return token;

            try {
                const { data: existingUser, status } = await axios.get(`${process.env.SERVER_URI}/users/${token.sub}`)

                if (!existingUser || status !== 200) return token

                token.name = (existingUser as User).UserName;
                token.role = (existingUser as User).role;
                token.profile = !!(existingUser as User).profile;
                token.token = (existingUser as User).token;

            } catch (error) {
            } finally {
                return token
            }
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
})