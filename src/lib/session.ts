import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "baminspire_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const sessionModel =
  (prisma as any).session ??
  (prisma as any).sessions;

if (!sessionModel) {
  throw new Error(
    "Prisma session model not found. Ensure your Prisma model name matches this file."
  );
}

export async function createSession(playerId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await sessionModel.create({
    data: {
      token,
      playerId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return { token, expiresAt };
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await sessionModel.findUnique({
    where: { token },
    include: {
      player: {
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  if (!session) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await sessionModel.deleteMany({
      where: { token },
    });

    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return session;
}

export async function clearCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await sessionModel.deleteMany({
      where: { token },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}