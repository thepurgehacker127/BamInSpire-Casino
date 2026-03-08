import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: siteConfig.name,
    apiVersion: siteConfig.apiVersion,
    timestamp: new Date().toISOString(),
    message: "BamInSpire Casino API is running.",
  });
}