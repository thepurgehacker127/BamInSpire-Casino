"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

type LoginForm = {
  email: string;
  password: string;
};

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setServerMessage("");
    setServerError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || "Login failed.");
        return;
      }

      setServerMessage(
        `${data.message || "Login successful."} Welcome, ${data.player.fullName}.`
      );
      setForm(initialForm);
    } catch {
      setServerError("Unable to log in right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading
          eyebrow="Login"
          title="Access your BamInSpire Casino player account"
          description="This is the first working local login flow backed by your SQLite database."
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/80">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-white/80">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                placeholder="Enter your password"
              />
            </div>

            {serverMessage ? (
              <div className="rounded-2xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300">
                {serverMessage}
              </div>
            ) : null}

            {serverError ? (
              <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-70"
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}