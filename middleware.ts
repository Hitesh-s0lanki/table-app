import authConfig from "./auth.config"
import NextAuth from "next-auth"

import { adminRoutes, apiAuthPrefix, publicRoutes } from "./route";

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) return

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/", nextUrl))
    }

    return
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}


