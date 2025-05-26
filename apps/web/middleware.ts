import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("middleware session", session);
  
  // If the session is null and the request is not for the auth page, redirect to the auth page
  if (session === null && request.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next({
    headers: {
      "x-pathname": request.nextUrl.pathname,
    },
  });
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
