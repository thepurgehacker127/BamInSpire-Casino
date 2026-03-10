import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicPath, resolveCountryFromRequest } from "@/lib/geo";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const decision = resolveCountryFromRequest(request);

  if (!decision.allowed) {
    const blockedUrl = new URL("/blocked", request.url);
    blockedUrl.searchParams.set("country", decision.country);
    blockedUrl.searchParams.set("source", decision.source);

    return NextResponse.redirect(blockedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};