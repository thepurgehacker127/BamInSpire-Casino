import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const vipTiers = [
  "Silver Lounge",
  "Gold Circle",
  "Platinum Reserve",
  "Black Elite",
];

export default function VipPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="VIP"
          title="Premium membership experience framework"
          description="The VIP area is where high-value player experiences, personalized rewards, tier systems, and premium service design can live later. Right now we are establishing the route and visual section structure."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {vipTiers.map((tier) => (
            <article
              key={tier}
              className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6"
            >
              <h3 className="text-xl font-bold text-yellow-300">{tier}</h3>
              <p className="mt-4 leading-7 text-white/70">
                Placeholder tier section for rewards, support access, benefits,
                and premium loyalty treatment.
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}