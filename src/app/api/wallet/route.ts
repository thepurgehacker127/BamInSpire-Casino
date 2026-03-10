import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const wallet = await prisma.wallet.upsert({
    where: {
      playerId: session.player.id,
    },
    update: {},
    create: {
      playerId: session.player.id,
      balance: 0,
    },
  });

  return NextResponse.json({
    balance: wallet.balance,
  });
}