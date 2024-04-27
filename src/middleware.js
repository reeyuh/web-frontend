import { NextResponse } from "next/server";
import { apiList } from "@/utils/apiList";

/**
 * Middleware function to handle authentication and redirection logic.
 * @param {object} request - The incoming request object.
 * @param {object} context - The context object associated with the request.
 * @returns {object} - The response object indicating the action to be taken.
 */

export async function middleware(request, context) {
   // Extract token from the request URL
  const token = request.nextUrl.searchParams.get("code");
  // Extract stored token from cookies
  const storedToken = request.cookies.get("_d");
  // Extract page info from cookies
  const page = request.cookies.get("page");
  // Handle redirection based on token and requested URL
  if (
    token &&
    ["/sign-in", "/register"].indexOf(request.nextUrl.pathname) === -1
  ) {
    if (page && page.value === "register") {
      return NextResponse.redirect(
        new URL(`/register?code=${token}`, request.url)
      );
    }
    return NextResponse.redirect(
      new URL(`/sign-in?code=${token}`, request.url)
    );
  } else if (
    [
      "/",
      "/sign-in",
      "/reset-password",
      "/register",
      "/mfa",
      "/forgot-password",
    ].indexOf(request.nextUrl.pathname) > -1 &&
    !token
  ) {
    if (storedToken && storedToken.value) {
      const data = await (
        await fetch(apiList.validateToken, {
          headers: { Authorization: `Bearer ${storedToken.value}` },
        })
      ).json();
      if (data.code === 200) {
        return NextResponse.redirect(new URL(`/dashboard`, request.url));
      } else if (["/"].indexOf(request.nextUrl.pathname) > -1) {
        const response = NextResponse.redirect(
          new URL(`/register`, request.url)
        );
        response.cookies.delete("_d");
        return response;
      }
    } else {
      if (["/"].indexOf(request.nextUrl.pathname) > -1) {
        return NextResponse.redirect(new URL(`/register`, request.url));
      }
    }
  } else if (
    [
      "/profile",
      "/agent-status",
      "/users",
      "/security-dashboard",
      "/control-management",
      "/audit-trail",
      "/dashboard",
      "/organization",
    ].indexOf(request.nextUrl.pathname) > -1
  ) {
    if (storedToken && storedToken.value) {
      const data = await (
        await fetch(apiList.validateToken, {
          headers: { Authorization: `Bearer ${storedToken.value}` },
        })
      ).json();
      if (data.code === 401) {
        const response = NextResponse.redirect(
          new URL(`/sign-in`, request.url)
        );
        response.cookies.delete("_d");
        return response;
      }
    } else {
      return NextResponse.redirect(new URL(`/sign-in`, request.url));
    }
  } else if (["/logout"].indexOf(request.nextUrl.pathname) > -1) {
    const response = NextResponse.redirect(new URL(`/sign-in`, request.url));
    response.cookies.delete("_d");
    return response;
  }
}

/**
 * Configuration object specifying the URLs that this middleware should be applied to.
 */

export const config = {
  matcher: [
    "/sso",
    "/",
    "/register",
    "/sign-in",
    "/reset-password",
    "/mfa",
    "/forgot-password",
    "/profile",
    "/dashboard",
    "/logout",
    "/agent-status",
    "/users",
    "/security-dashboard",
    "/control-management",
    "/audit-trail",
    "/organization",
  ],
};
