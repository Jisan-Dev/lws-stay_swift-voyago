import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = getSessionCookie(request, {
    cookiePrefix: "better-auth-voyago",
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/bookings"], // Specify the routes the middleware applies to
};
