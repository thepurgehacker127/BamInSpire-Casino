import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const wallet = await prisma.wallet.findUnique({
      where: { playerId: session.player.id },
      include: {
        transactions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 25,
        },
      },
    });

    if (!wallet) {
      return NextResponse.json(
        { ok: false, error: "Wallet not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      wallet: {
        id: wallet.id,
        balance: wallet.balance,
      },
      transactions: wallet.transactions,
    });
  } catch (error) {
    console.error("Wallet history route error:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to load wallet history." },
      { status: 500 }
    );
  }
}