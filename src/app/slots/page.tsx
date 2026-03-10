"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SectionHeading from "../../components/SectionHeading";

type SpinResponse = {
  ok: boolean;
  error?: string;
  game?: string;
  reels?: string[];
  bet?: number;
  payout?: number;
  label?: string;
  balance?: number;
  net?: number;
};

const BET_OPTIONS = [10, 25, 50, 100] as const;

export default function SlotsPage() {
  const [bet, setBet] = useState<number>(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [result, setResult] = useState<SpinResponse | null>(null);
  const [error, setError] = useState("");

  async function loadBalance() {
    try {
      const response = await fetch("/api/wallet");
      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance);
      } else {
        setError("Failed to load balance.");
      }
    } catch {
      setError("Unable to load balance right now.");
    }
  }

  useEffect(() => {
    loadBalance();
  }, []);

  async function handleSpin() {
    if (balance === null || balance < bet) {
      setError("Insufficient balance for this bet.");
      return;
    }

    setIsSpinning(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/games/slots/spin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bet }),
      });

      const data = (await response.json()) as SpinResponse;

      if (!response.ok) {
        setError(data.error || "Spin failed.");
        return;
      }

      setResult(data);

      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
    } catch {
      setError("Unable to complete spin right now.");
    } finally {
      setIsSpinning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Slots"
          title="Lucky Sevens — first live game prototype"
          description="This is the first wallet-connected game in BamInSpire Casino. Outcomes are generated on the server and every balance change is recorded in the ledger."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-yellow-400">
                  Lucky Sevens
                </h3>
                <p className="mt-2 text-white/70">
                  Server-side slot spin prototype using wallet credits.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-right">
                <p className="text-sm text-white/60">Current Balance</p>
                <p className="text-2xl font-black text-yellow-300">
                  {balance ?? "--"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {(result?.reels ?? ["?", "?", "?"]).map((symbol, index) => (
                <div
                  key={`${symbol}-${index}`}
                  className="flex h-32 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-center text-xl font-black"
                >
                  {symbol}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                Bet Size
              </p>

              <div className="flex flex-wrap gap-3">
                {BET_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBet(option)}
                    className={`rounded-2xl px-5 py-3 font-bold transition ${
                      bet === option
                        ? "bg-yellow-400 text-black"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning || balance === null || balance < bet}
                className="rounded-2xl bg-yellow-400 px-8 py-4 text-lg font-black text-black transition hover:bg-yellow-300 disabled:opacity-70"
              >
                {isSpinning ? "Spinning..." : `Spin for ${bet}`}
              </button>
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-300">
                {error}
              </div>
            ) : null}

            {result?.ok ? (
              <div className="mt-6 rounded-2xl border border-green-400/30 bg-green-400/10 px-5 py-4">
                <p className="font-bold text-green-300">{result.label}</p>
                <p className="mt-2 text-white/80">
                  Bet: {result.bet} | Payout: {result.payout} | Net: {result.net}
                </p>
              </div>
            ) : null}
          </article>

          <aside className="space-y-6">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">Paytable</h3>
              <ul className="mt-4 space-y-3 text-white/70">
                <li>• SEVEN / SEVEN / SEVEN → 20x bet</li>
                <li>• DIAMOND / DIAMOND / DIAMOND → 12x bet</li>
                <li>• BAR / BAR / BAR → 8x bet</li>
                <li>• CHERRY / CHERRY / CHERRY → 5x bet</li>
                <li>• Any 2 CHERRY symbols → 2x bet</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">Why This Matters</h3>
              <p className="mt-4 leading-7 text-white/70">
                This is the first end-to-end game loop in the platform: wallet
                debit, secure outcome generation, optional payout, and ledger
                recording all happen server-side.
              </p>
            </article>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}