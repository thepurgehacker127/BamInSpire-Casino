import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";

export async function requireAdmin() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const player = await prisma.player.findUnique({
    where: { id: session.player.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });

  if (!player || player.role !== "admin") {
    redirect("/account");
  }

  return player;
}