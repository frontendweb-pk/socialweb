import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  // Extract the URL path
  const { pathname } = req.nextUrl;

  // check if user is authenticated
  const session = req.auth;
  if (!session) {
    return NextResponse.redirect(
      new URL("/login?redirect=" + encodeURIComponent(pathname), req.nextUrl)
    );
  }

  // Extract the role from session (assuming session has 'user' object with 'role_id')
  const role = session.user?.role_id;

  // Check if the user is trying to access admin pages
  if (pathname.startsWith("/admin") && role !== 1) {
    // Redirect non-admin users to login page
    return NextResponse.redirect(
      new URL("/login?redirect=" + encodeURIComponent(pathname), req.nextUrl)
    );
  }

  // Check if the user is trying to access user-specific pages
  if (pathname.startsWith("/user") && role !== 2) {
    // Redirect non-user users to login page
    return NextResponse.redirect(
      new URL("/login?redirect=" + encodeURIComponent(pathname), req.nextUrl)
    );
  }

  // Continue to the next middleware
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */

    "/admin/:path*",
    "/user/:path*",
  ],
};
