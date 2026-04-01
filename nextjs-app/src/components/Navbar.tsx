"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/70 dark:bg-stone-900/70 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 md:px-16 py-6 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-serif italic text-stone-900 dark:text-stone-50 tracking-tight"
        >
          vineetb.me
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-stone-900 dark:text-stone-50 font-bold border-b-2 border-stone-800 dark:border-stone-200 pb-1 font-medium tracking-tight"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium tracking-tight"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/vineetbhardwaj.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-primary/10"
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
