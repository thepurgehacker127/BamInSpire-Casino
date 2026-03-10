import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

export default function BlockedPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Access Restricted"
          title="BamInSpire Casino is not available in your current location"
          description="This is the first geofencing block page for the platform. Access to gameplay and account areas can be restricted based on request country."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6">
            <h3 className="text-2xl font-bold text-red-300">
              Region Block Active
            </h3>
            <p className="mt-4 leading-7 text-white/70">
              Your request is currently being blocked by the platform's initial
              geofencing layer.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">What This Means</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>• location-based access controls are now active</li>
              <li>• blocked regions are redirected before page render</li>
              <li>• local testing can simulate countries safely</li>
              <li>• this is the first layer, not the final compliance stack</li>
            </ul>
          </article>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Return Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}