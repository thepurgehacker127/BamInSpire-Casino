import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_COUNTRIES, resolveCountryFromRequest } from "@/lib/geo";

export async function GET(request: NextRequest) {
  const decision = resolveCountryFromRequest(request);

  return NextResponse.json({
    ok: true,
    geofencing: {
      country: decision.country,
      allowed: decision.allowed,
      source: decision.source,
      allowedCountries: ALLOWED_COUNTRIES,
    },
    message: decision.allowed
      ? "Request country is allowed."
      : "Request country is blocked.",
  });
}