import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

function formatAmount(amount: number) {
  return amount >= 0 ? `+${amount}` : `${amount}`;
}

function formatType(type: string) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AccountPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const player = session.player;

  const wallet = await prisma.wallet.findUnique({
    where: { playerId: player.id },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 25,
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Account"
          title={`Welcome back, ${player.fullName}`}
          description="This is the upgraded player dashboard for BamInSpire Casino. It now shows your protected account data, wallet balance, and recent transaction history."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold text-yellow-400">
                Player Details
              </h3>

              <div className="mt-6 space-y-4 text-white/80">
                <p>
                  <span className="font-semibold text-white">Full Name:</span>{" "}
                  {player.fullName}
                </p>
                <p>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {player.email}
                </p>
                <p>
                  <span className="font-semibold text-white">Player ID:</span>{" "}
                  {player.id}
                </p>
                <p>
                  <span className="font-semibold text-white">Account Created:</span>{" "}
                  {new Date(player.createdAt).toLocaleString()}
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">Wallet Status</h3>

              <div className="mt-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                  Current Balance
                </p>
                <p className="mt-2 text-5xl font-black text-yellow-300">
                  {wallet?.balance ?? 0}
                </p>
              </div>

              <div className="mt-6 space-y-3 text-white/80">
                <p>
                  <span className="font-semibold text-white">Protected Route:</span>{" "}
                  Enabled
                </p>
                <p>
                  <span className="font-semibold text-white">Session Status:</span>{" "}
                  Active
                </p>
                <p>
                  <span className="font-semibold text-white">Ledger Status:</span>{" "}
                  Recording transactions
                </p>
              </div>
            </article>
          </div>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Recent Activity</h3>
                <p className="mt-2 text-white/70">
                  Latest wallet and gameplay ledger entries.
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-white/50">
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Balance After</th>
                    <th className="px-3 py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet?.transactions?.length ? (
                    wallet.transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="rounded-2xl bg-black/20 text-white/85"
                      >
                        <td className="rounded-l-2xl px-3 py-3">
                          {formatType(transaction.type)}
                        </td>
                        <td
                          className={`px-3 py-3 font-bold ${
                            transaction.amount >= 0
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {formatAmount(transaction.amount)}
                        </td>
                        <td className="px-3 py-3">{transaction.balance}</td>
                        <td className="rounded-r-2xl px-3 py-3 text-white/65">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-6 text-center text-white/50"
                      >
                        No transaction history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}