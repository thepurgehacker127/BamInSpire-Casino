import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

type LoginPayload = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoginPayload>;

    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const player = await prisma.player.findUnique({
      where: { email },
    });

    if (!player) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, player.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createSession(player.id);

    return NextResponse.json({
      ok: true,
      message: "Login successful.",
      player: {
        id: player.id,
        fullName: player.fullName,
        email: player.email,
      },
    });
  } catch (error) {
    console.error("Login route error:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to log in right now." },
      { status: 500 }
    );
  }
}