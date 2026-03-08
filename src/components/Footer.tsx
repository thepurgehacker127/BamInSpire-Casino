import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© 2026 BamInSpire Casino. All rights reserved.</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/support" className="transition hover:text-yellow-400">
            Support
          </Link>
          <a href="#" className="transition hover:text-yellow-400">
            Terms
          </a>
          <a href="#" className="transition hover:text-yellow-400">
            Privacy
          </a>
          <a href="#" className="transition hover:text-yellow-400">
            Responsible Gaming
          </a>
        </div>
      </div>
    </footer>
  );
}