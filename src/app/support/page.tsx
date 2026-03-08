"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function SupportPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setServerMessage("");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || "Something went wrong.");
        return;
      }

      setServerMessage(data.message || "Support request submitted.");
      setForm(initialFormState);
    } catch {
      setServerError("Unable to submit the form right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Support"
          title="Player help and service structure"
          description="This page now includes BamInSpire Casino’s first live frontend-to-backend workflow. The form below posts directly to a Route Handler inside your app."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold text-yellow-400">
              Contact Support
            </h3>
            <p className="mt-4 leading-7 text-white/70">
              Use this form to test your first working backend flow inside the
              BamInSpire Casino project.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                  placeholder="What do you need help with?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                  placeholder="Describe your issue or request"
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
                className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-[1.02] hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Support Request"}
              </button>
            </form>
          </article>

          <aside className="space-y-6">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">Support System Progress</h3>
              <p className="mt-4 leading-7 text-white/70">
                This page now connects a client-side form to a server-side Route
                Handler, which is a major step forward in your full-stack build.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">Support Contact</h3>
              <p className="mt-4 leading-7 text-white/70">
                Primary support email:{" "}
                <span className="font-semibold text-yellow-400">
                  {siteConfig.supportEmail}
                </span>
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold">What This Enables Later</h3>
              <ul className="mt-4 space-y-3 text-white/70">
                <li>• ticket creation</li>
                <li>• admin notifications</li>
                <li>• database storage</li>
                <li>• player account workflows</li>
                <li>• fraud/compliance event logging</li>
              </ul>
            </article>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}