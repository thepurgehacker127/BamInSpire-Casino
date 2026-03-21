import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const updatedPlayer = await prisma.player.update({
      where: { id: session.player.id },
      data: { role: "admin" },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Current player promoted to admin.",
      player: updatedPlayer,
    });
  } catch (error) {
    console.error("Admin bootstrap route error:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to promote current player." },
      { status: 500 }
    );
  }
}