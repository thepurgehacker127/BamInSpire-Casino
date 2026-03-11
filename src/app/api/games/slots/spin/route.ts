import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";
import { getCurrentSession } from "../../../../../lib/session";

const ALLOWED_BETS = [10, 25, 50, 100] as const;

const REEL_SYMBOL_POOL = [
  "BLANK",
  "BLANK",
  "BLANK",
  "BLANK",
  "BLANK",
  "BLANK",
  "CHERRY",
  "CHERRY",
  "LEMON",
  "LEMON",
  "BAR",
  "BAR",
  "SEVEN",
  "DIAMOND",
] as const;

type SymbolName = (typeof REEL_SYMBOL_POOL)[number];

function getWeightedRandomSymbol(): SymbolName {
  return REEL_SYMBOL_POOL[randomInt(0, REEL_SYMBOL_POOL.length)];
}

function calculatePayout(reels: SymbolName[], bet: number) {
  const [a, b, c] = reels;

  if (a === "SEVEN" && b === "SEVEN" && c === "SEVEN") {
    return { payout: bet * 30, label: "Triple SEVEN Jackpot" };
  }

  if (a === "DIAMOND" && b === "DIAMOND" && c === "DIAMOND") {
    return { payout: bet * 22, label: "Triple DIAMOND" };
  }

  if (a === "BAR" && b === "BAR" && c === "BAR") {
    return { payout: bet * 12, label: "Triple BAR" };
  }

  if (a === "CHERRY" && b === "CHERRY" && c === "CHERRY") {
    return { payout: bet * 5, label: "Triple CHERRY" };
  }

  const cherryCount = reels.filter((symbol) => symbol === "CHERRY").length;

  if (cherryCount >= 2) {
    return { payout: bet * 2, label: "Double CHERRY" };
  }

  return { payout: 0, label: "No win" };
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as { bet?: number };
    const bet = Number(body.bet);

    if (
      !Number.isFinite(bet) ||
      !Number.isInteger(bet) ||
      !ALLOWED_BETS.includes(bet as (typeof ALLOWED_BETS)[number])
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid bet amount.",
          allowedBets: ALLOWED_BETS,
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const wallet = await tx.wallet.findUnique({
          where: { playerId: session.player.id },
        });

        if (!wallet) {
          throw new Error("Wallet not found.");
        }

        if (wallet.balance < bet) {
          throw new Error("Insufficient balance.");
        }

        const reels: SymbolName[] = [
          getWeightedRandomSymbol(),
          getWeightedRandomSymbol(),
          getWeightedRandomSymbol(),
        ];

        const { payout, label } = calculatePayout(reels, bet);

        const afterBetBalance = wallet.balance - bet;
        const finalBalance = afterBetBalance + payout;

        await tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: finalBalance },
        });

        await tx.transaction.create({
          data: {
            walletId: wallet.id,
            type: "slot_bet",
            amount: -bet,
            balance: afterBetBalance,
          },
        });

        if (payout > 0) {
          await tx.transaction.create({
            data: {
              walletId: wallet.id,
              type: "slot_win",
              amount: payout,
              balance: finalBalance,
            },
          });
        }

        return {
          reels,
          bet,
          payout,
          label,
          balance: finalBalance,
          net: payout - bet,
        };
      }
    );

    return NextResponse.json({
      ok: true,
      game: "Lucky Sevens",
      mode: "weighted-rng-v2",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to complete spin.";

    const status =
      message === "Unauthorized."
        ? 401
        : message === "Invalid bet amount."
        ? 400
        : message === "Insufficient balance."
        ? 400
        : message === "Wallet not found."
        ? 404
        : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}