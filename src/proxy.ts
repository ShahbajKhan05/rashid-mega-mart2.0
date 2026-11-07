import { NextResponse, type NextRequest } from "next/server";

// Temporary customer-only launch mode: keep all admin screens out of the client experience.
// Remove this guard when private owner authentication is ready.
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
