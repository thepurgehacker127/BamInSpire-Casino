import type { NextRequest } from "next/server";

export const ALLOWED_COUNTRIES = ["US"] as const;

export type GeoDecision = {
  country: string;
  allowed: boolean;
  source:
    | "x-vercel-ip-country"
    | "cf-ipcountry"
    | "debug-query"
    | "unknown";
};

function normalizeCountry(value: string | null | undefined) {
  return (value ?? "").trim().toUpperCase();
}

export function resolveCountryFromRequest(request: NextRequest): GeoDecision {
  const debugCountry = normalizeCountry(request.nextUrl.searchParams.get("geo"));

  if (debugCountry) {
    return {
      country: debugCountry,
      allowed: ALLOWED_COUNTRIES.includes(
        debugCountry as (typeof ALLOWED_COUNTRIES)[number]
      ),
      source: "debug-query",
    };
  }

  const vercelCountry = normalizeCountry(
    request.headers.get("x-vercel-ip-country")
  );

  if (vercelCountry) {
    return {
      country: vercelCountry,
      allowed: ALLOWED_COUNTRIES.includes(
        vercelCountry as (typeof ALLOWED_COUNTRIES)[number]
      ),
      source: "x-vercel-ip-country",
    };
  }

  const cloudflareCountry = normalizeCountry(
    request.headers.get("cf-ipcountry")
  );

  if (cloudflareCountry) {
    return {
      country: cloudflareCountry,
      allowed: ALLOWED_COUNTRIES.includes(
        cloudflareCountry as (typeof ALLOWED_COUNTRIES)[number]
      ),
      source: "cf-ipcountry",
    };
  }

  return {
    country: "UNKNOWN",
    allowed: false,
    source: "unknown",
  };
}

export function isPublicPath(pathname: string) {
  return (
    pathname === "/blocked" ||
    pathname.startsWith("/api/geo") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  );
}