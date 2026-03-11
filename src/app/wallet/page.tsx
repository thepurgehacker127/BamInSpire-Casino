"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SectionHeading from "../../components/SectionHeading";

type Transaction = {
  id: number;
  type: string;
  amount: number;
  balance: number;
  createdAt: string;
};

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function WalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number | null>(null);

  async function loadWallet() {
    const response = await fetch("/api/wallet/history");
    const data = await response.json();

    if (response.ok) {
      setTransactions(data.transactions);
      setBalance(data.wallet.balance);
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Wallet"
          title="Transaction Ledger"
          description="Every wallet movement on the platform is recorded in the ledger."
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="mb-6 flex justify-between">
            <h3 className="text-2xl font-bold">Transaction History</h3>

            <div className="text-right">
              <p className="text-sm text-white/60">Current Balance</p>
              <p className="text-2xl font-black text-yellow-400">
                {balance !== null ? formatMoney(balance) : "--"}
              </p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="text-white/60">
              <tr>
                <th className="pb-3">Time</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Balance</th>
              </tr>
            </thead>

            <tbody className="text-white/80">
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-white/10">
                  <td className="py-3">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>

                  <td className="py-3">{tx.type}</td>

                  <td
                    className={`py-3 font-bold ${
                      tx.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formatMoney(tx.amount)}
                  </td>

                  <td className="py-3">{formatMoney(tx.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </main>
  );
}