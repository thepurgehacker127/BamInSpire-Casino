import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const wallet = await prisma.wallet.upsert({
    where: { playerId: session.player.id },
    update: {},
    create: {
      playerId: session.player.id,
      balance: 0,
    },
  });

  const newBalance = wallet.balance + amount;

  await prisma.$transaction([
    prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: newBalance },
    }),
    prisma.transaction.create({
      data: {
        walletId: wallet.id,
        type: "deposit",
        amount,
        balance: newBalance,
      },
    }),
  ]);

  return NextResponse.json({
    balance: newBalance,
  });
}