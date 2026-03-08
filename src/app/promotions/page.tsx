import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const promos = [
  {
    title: "Welcome Bonus",
    description:
      "High-visibility promotion zone for onboarding offers and new-player incentives.",
  },
  {
    title: "Weekly Rewards",
    description:
      "A recurring offer space for engagement campaigns and repeat-visit incentives.",
  },
  {
    title: "High Roller Offers",
    description:
      "Premium section for top-tier reward campaigns and exclusive player experiences.",
  },
];

export default function PromotionsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Promotions"
          title="Offer and campaign page structure"
          description="This page gives BamInSpire Casino a real place for promotions, bonuses, featured campaigns, and future reward systems. For now, we are focused on strong visual structure and route setup."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {promos.map((promo) => (
            <article
              key={promo.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-400/10 to-white/5 p-6"
            >
              <h3 className="text-2xl font-bold">{promo.title}</h3>
              <p className="mt-4 leading-7 text-white/70">
                {promo.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}