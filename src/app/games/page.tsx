import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const gameCategories = [
  {
    title: "Slots",
    description:
      "Fast browsing area for featured reels, jackpot slots, and category-based discovery.",
  },
  {
    title: "Blackjack",
    description:
      "Premium table-game zone layout for classic and variant blackjack experiences.",
  },
  {
    title: "Roulette",
    description:
      "Dedicated interface section for roulette categories, featured tables, and quick access.",
  },
  {
    title: "Live Casino",
    description:
      "Future-ready section for hosted real-time gaming experiences and live-style presentation.",
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
          description="This page is the first structured version of the games area. Right now it is a premium placeholder page, but it is already organized like a real product area and ready for future categories, filters, providers, and game cards."
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
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}