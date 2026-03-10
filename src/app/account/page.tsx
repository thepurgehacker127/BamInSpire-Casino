import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { getCurrentSession } from "@/lib/session";

export default async function AccountPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const player = session.player;

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Account"
          title={`Welcome back, ${player.fullName}`}
          description="This is the first protected player page in BamInSpire Casino. Access requires a valid session cookie and a matching database session."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold text-yellow-400">
              Player Details
            </h3>

            <div className="mt-6 space-y-4 text-white/80">
              <p>
                <span className="font-semibold text-white">Full Name:</span>{" "}
                {player.fullName}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {player.email}
              </p>
              <p>
                <span className="font-semibold text-white">Player ID:</span>{" "}
                {player.id}
              </p>
              <p>
                <span className="font-semibold text-white">Account Created:</span>{" "}
                {new Date(player.createdAt).toLocaleString()}
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold">Account Status</h3>

            <div className="mt-6 space-y-4 text-white/80">
              <p>
                <span className="font-semibold text-white">Session Status:</span>{" "}
                Active
              </p>
              <p>
                <span className="font-semibold text-white">Protected Route:</span>{" "}
                Enabled
              </p>
              <p>
                <span className="font-semibold text-white">Platform Stage:</span>{" "}
                Account foundation complete
              </p>
              <p>
                <span className="font-semibold text-white">Next Direction:</span>{" "}
                Wallet ledger and admin controls
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}