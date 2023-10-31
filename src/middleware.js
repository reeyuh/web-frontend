import { NextResponse } from "next/server";
import { apiList } from "@/utils/apiList";

export async function middleware(request, context) {
  const token = request.nextUrl.searchParams.get("code");
  const storedToken = request.cookies.get("_d");
  const page = request.cookies.get("page");
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
        return NextResponse.redirect(new URL(`/agent-status`, request.url));
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
      "/policy-management",
      "/audit-trail",
    ].indexOf(request.nextUrl.pathname) > -1
  ) {
    if (storedToken && storedToken.value) {
      const data = await (
        await fetch(apiList.validateToken, {
          headers: { Authorization: `Bearer ${storedToken.value}` },
        })
      ).json();
      if (data.code === 400 || data.code === 401) {
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
    "/policy-management",
    "/audit-trail",
  ],
};
