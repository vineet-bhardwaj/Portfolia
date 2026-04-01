import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";

interface HeroSectionProps {
  tagline?: string;
  headlineTop?: string;
  headlineAccent?: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  heroImage?: any;
  chips?: Array<{ icon: string; label: string; _key: string }>;
}

export default function HeroSection({
  tagline = "Software Architect & Curator",
  headlineTop = "Building Scalable",
  headlineAccent = "Digital Experiences",
  description = "A synthesis of technical precision and editorial soul. Specializing in high-performance architectures that prioritize human intuition.",
  ctaPrimary = { label: "View My Work", href: "/projects" },
  ctaSecondary = { label: "The Philosophy", href: "/about" },
  heroImage,
  chips = [
    { _key: "1", icon: "terminal", label: "Fullstack Engineering" },
    { _key: "2", icon: "architecture", label: "System Design" },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[921px] flex items-center px-8 md:px-16 max-w-screen-2xl mx-auto overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] rounded-full bg-surface-container-low blur-[120px] -z-10" />
      <div className="absolute left-[-5%] bottom-[5%] w-[400px] h-[400px] rounded-full bg-secondary-container/20 blur-[100px] -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Headline Content */}
        <div className="md:col-span-8 lg:col-span-7">
          <span className="inline-block font-label text-xs uppercase tracking-[0.2em] font-bold text-outline mb-6">
            {tagline}
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[1.05] tracking-tight text-on-surface mb-10">
            {headlineTop} <br />
            <span className="italic text-primary-dim">{headlineAccent}</span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-10 py-5 rounded-full font-medium text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="group flex items-center gap-3 font-medium text-on-surface hover:text-primary transition-colors"
              >
                <span>{ctaSecondary.label}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Asymmetric Hero Graphic */}
        <div className="md:col-span-4 lg:col-span-5 relative mt-12 md:mt-0">
          <div className="relative w-full aspect-[4/5] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl shadow-on-surface/5">
            {heroImage ? (
              <Image
                alt={headlineTop || "Hero image"}
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply hover:scale-110 transition-transform duration-1000"
                src={urlFor(heroImage).width(600).height(750).url()}
                width={600}
                height={750}
                priority
              />
            ) : (
              <Image
                alt="Abstract minimalist tech"
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply hover:scale-110 transition-transform duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeOsTuXMqV6S_50Z6CTjLO057HHYdns5EAthmgnPO0elVw5DjSeuY7NJQ47XALI8gtZTmHSMbfbKbp8epatMd-Fktl3uywWwQhJt0tp77uKkP5tXK9rKuc5VYvGTAwiewQMJ0Q3adsLfFFHgSpV118Rgkw-VLZ-46PnWD5q6TH3bubmv7T1RtORj8QmOZTc3q7kq4d9Pl3GTm6h9NwbEgYK-gM2YBl3GfHEdIpPb4wcliAIaXVj_wK1GVH9IIAKuVOiMwzh9Gbu10p"
                width={600}
                height={750}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/80 via-transparent to-transparent" />
            {/* Floating Spec Chips */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-3">
              {chips?.map((chip) => (
                <div
                  key={chip._key}
                  className="bg-tertiary-container/90 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-on-tertiary-container text-sm">
                    {chip.icon}
                  </span>
                  <span className="font-label text-xs uppercase tracking-widest font-bold text-on-tertiary-container">
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative Element */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-surface-container-lowest rounded-xl shadow-xl flex items-center justify-center -z-10 rotate-12">
            <span className="material-symbols-outlined text-4xl text-outline-variant opacity-30">
              deployed_code
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
