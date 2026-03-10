import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const gameCategories = [
  {
    title: "Lucky Sevens Slots",
    description:
      "First playable wallet-connected slot prototype with server-side spin logic.",
    href: "/slots",
  },
  {
    title: "Blackjack",
    description:
      "Premium table-game zone layout for future blackjack experiences.",
    href: "#",
  },
  {
    title: "Roulette",
    description:
      "Dedicated interface section for future roulette tables and quick access.",
    href: "#",
  },
  {
    title: "Live Casino",
    description:
      "Future-ready section for hosted real-time gaming experiences and live-style presentation.",
    href: "#",
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Games"
          title="BamInSpire Casino game lobby foundation"
          description="The platform now includes its first playable slot prototype. The rest of these categories remain structured placeholders for future expansion."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {gameCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-2xl font-bold text-yellow-400">
                {category.title}
              </h3>
              <p className="mt-4 leading-7 text-white/70">
                {category.description}
              </p>

              {category.href !== "#" ? (
                <Link
                  href={category.href}
                  className="mt-6 inline-block rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
                >
                  Open Game
                </Link>
              ) : (
                <div className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white/50">
                  Coming later
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}