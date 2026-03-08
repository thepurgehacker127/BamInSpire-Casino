import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RegisterPayload>;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const existingPlayer = await prisma.player.findUnique({
      where: { email },
    });

    if (existingPlayer) {
      return NextResponse.json(
        { ok: false, error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const player = await prisma.player.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Player account created successfully.",
      player,
    });
  } catch (error) {
    console.error("Register route error:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to create account right now." },
      { status: 500 }
    );
  }
}