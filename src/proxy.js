import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuth = !!token;
  if (!isAuth) {
    if (path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const adminPath = "/dashboard/admin";
  const officeStaffPath = "/dashboard/office-staff";
  const teamLeaderPath = "/dashboard/team-leader";
  const workerPath = "/dashboard/worker";

  if (path.startsWith(adminPath)) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (path.startsWith(officeStaffPath)) {
    if (token?.role !== "OFFICE_STAFF") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (path.startsWith(teamLeaderPath)) {
    if (token?.role !== "TEAM_LEADER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (path.startsWith(workerPath)) {
    if (token?.role !== "WORKER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
