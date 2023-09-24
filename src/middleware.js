import { NextResponse } from "next/server";

export function middleware(request, context) {
  const token = request.nextUrl.searchParams.get("code");
  if (token) {
    return NextResponse.redirect(
      new URL(`/sign-in?code=${token}`, request.url)
    );
  } else if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/register`, request.url));
  }
}

export const config = {
  matcher: ["/sso", "/"],
};
