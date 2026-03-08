import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/promotions", label: "Promotions" },
  { href: "/vip", label: "VIP" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link href="/" className="block">
            <h1 className="text-2xl font-black tracking-wide text-yellow-400">
              BamInSpire Casino
            </h1>
          </Link>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Premium Digital Casino Experience
          </p>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 transition hover:text-yellow-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <button className="rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-black transition hover:scale-[1.02] hover:bg-yellow-300">
            Join Now
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 md:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-x-auto px-4 py-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/5 hover:text-yellow-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}