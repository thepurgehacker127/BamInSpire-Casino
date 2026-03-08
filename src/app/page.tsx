import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937_0%,_#0b1020_40%,_#030712_100%)] text-white">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-300">
            BamInSpire Casino — Multi-Page Foundation
          </p>

          <h2 className="max-w-2xl text-5xl font-black leading-tight md:text-6xl">
            The premium casino brand shell is now becoming a real platform.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            BamInSpire Casino now has real page structure, reusable components,
            and routed navigation. This is the first major jump from a static
            landing page into a scalable application layout.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/games"
              className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-[1.02] hover:bg-yellow-300"
            >
              Explore Games
            </Link>
            <Link
              href="/promotions"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Promotions
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-black text-yellow-400">4</p>
              <p className="text-sm text-white/70">Live Sections</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-black text-yellow-400">1</p>
              <p className="text-sm text-white/70">Shared Navbar</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-black text-yellow-400">1</p>
              <p className="text-sm text-white/70">Shared Footer</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-black text-yellow-400">Clean</p>
              <p className="text-sm text-white/70">Scalable UI</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Platform Progress</p>
                <h3 className="text-2xl font-bold text-white">Application Shell</h3>
              </div>
              <div className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
                Routed
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 p-5">
                <p className="text-sm text-white/60">Games</p>
                <h4 className="mt-2 text-xl font-bold">Lobby Foundations</h4>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Dedicated page structure for future slots, tables, live
                  experiences, and browsing categories.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-cyan-400/10 p-5">
                <p className="text-sm text-white/60">Promotions</p>
                <h4 className="mt-2 text-xl font-bold">Offer Framework</h4>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  The promotions section gives us a place for bonuses, featured
                  offers, campaigns, and seasonal content.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
                <p className="text-sm text-white/60">Architecture Direction</p>
                <h4 className="mt-2 text-xl font-bold">
                  Shared UI + route-driven structure
                </h4>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  We are now moving from isolated page styling into reusable
                  components and real navigation, which is the right setup for a
                  serious multi-page product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading
          eyebrow="Core Sections"
          title="The first routed pages of the BamInSpire Casino experience"
          description="These sections are early placeholders with premium styling, but they are now real pages connected to real navigation. This gives us the application skeleton we need for future platform features."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/games"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
          >
            <h4 className="text-xl font-bold">Games</h4>
            <p className="mt-3 leading-7 text-white/70">
              Slot, table, and future live gaming lobby structure.
            </p>
          </Link>

          <Link
            href="/promotions"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
          >
            <h4 className="text-xl font-bold">Promotions</h4>
            <p className="mt-3 leading-7 text-white/70">
              Bonuses, rewards, featured offers, and campaign layout.
            </p>
          </Link>

          <Link
            href="/vip"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
          >
            <h4 className="text-xl font-bold">VIP</h4>
            <p className="mt-3 leading-7 text-white/70">
              Premium membership space for top-tier player experiences.
            </p>
          </Link>

          <Link
            href="/support"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
          >
            <h4 className="text-xl font-bold">Support</h4>
            <p className="mt-3 leading-7 text-white/70">
              Help center, contact routing, and future player assistance flows.
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}