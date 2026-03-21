import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatType(type: string) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AdminPage() {
  await requireAdmin();

  const [playerCount, wallets, recentPlayers, recentTransactions] =
    await Promise.all([
      prisma.player.count(),
      prisma.wallet.findMany({
        select: {
          balance: true,
        },
      }),
      prisma.player.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          wallet: true,
        },
      }),
      prisma.transaction.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
        include: {
          wallet: {
            include: {
              player: true,
            },
          },
        },
      }),
    ]);

  const totalWalletBalance = wallets.reduce(
    (sum, wallet) => sum + wallet.balance,
    0
  );

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Admin"
          title="BamInSpire Casino admin dashboard"
          description="This is the first internal operations dashboard for the platform. It gives visibility into players, wallet balances, and recent ledger activity."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Total Players
            </p>
            <p className="mt-3 text-4xl font-black text-yellow-400">
              {playerCount}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Total Wallet Balance
            </p>
            <p className="mt-3 text-4xl font-black text-yellow-400">
              {formatMoney(totalWalletBalance)}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Recent Ledger Events
            </p>
            <p className="mt-3 text-4xl font-black text-yellow-400">
              {recentTransactions.length}
            </p>
          </article>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">Recent Players</h3>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-white/50">
                  <tr>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Balance</th>
                    <th className="pb-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPlayers.map((player) => (
                    <tr key={player.id} className="border-t border-white/10">
                      <td className="py-3">{player.fullName}</td>
                      <td className="py-3">{player.email}</td>
                      <td className="py-3">
                        {formatMoney(player.wallet?.balance ?? 0)}
                      </td>
                      <td className="py-3 text-white/65">
                        {new Date(player.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">Recent Transactions</h3>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-white/50">
                  <tr>
                    <th className="pb-3">Player</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Balance</th>
                    <th className="pb-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-white/10">
                      <td className="py-3">{tx.wallet.player.fullName}</td>
                      <td className="py-3">{formatType(tx.type)}</td>
                      <td
                        className={`py-3 font-bold ${
                          tx.amount >= 0 ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {formatMoney(tx.amount)}
                      </td>
                      <td className="py-3">{formatMoney(tx.balance)}</td>
                      <td className="py-3 text-white/65">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
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