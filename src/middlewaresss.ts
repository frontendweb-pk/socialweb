import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(function middleware(req) {
  const url = req.nextUrl.pathname;
  const role = req.auth?.user?.role_id;

  if (url.startsWith("/admin") && role !== 1) {
    return NextResponse.redirect(new URL(encodeURI("/login?" + url), req.url));
  }

  if (url.startsWith("/user") && role !== 2) {
    return NextResponse.redirect(new URL(encodeURI("/login?" + url), req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
