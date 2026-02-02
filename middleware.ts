import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register", "/forget-password", "/reset-password"];
const adminRoutes = ["/admin"];
const userRoutes = ["/user"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("role")?.value;

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isUserRoute = userRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && role) {
    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isUserRoute && role !== "user" && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
  ],
};
