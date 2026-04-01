import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import TechnicalStack from "@/components/TechnicalStack";
import HeroSection from "@/components/HeroSection";

interface IntroSection {
  tagline?: string;
  headlineTop?: string;
  headlineAccent?: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  heroImage?: any;
  chips?: Array<{ icon: string; label: string; _key: string }>;
}

interface TechnicalStackData {
  title?: string;
  categories?: Array<{
    title: string;
    icon: string;
    skills: string[];
  }>;
}

export default async function Home() {
  // Fetch intro section for home page
  const intro: IntroSection | null = await client.fetch(
    `*[_type == "introSection" && page == "home"][0]{
      tagline,
      headlineTop,
      headlineAccent,
      description,
      ctaPrimary,
      ctaSecondary,
      heroImage,
      chips
    }`
  );

  // Fetch technical stack for home page
  const techStack: TechnicalStackData | null = await client.fetch(
    `*[_type == "technicalStack" && page == "home"][0]{
      title,
      categories[]{
        title,
        icon,
        bgStyle,
        skills
      }
    }`
  );

  // Fallback content if no data in Sanity
  const content = intro || {
    tagline: "Software Architect & Curator",
    headlineTop: "Building Scalable",
    headlineAccent: "Digital Experiences",
    description:
      "A synthesis of technical precision and editorial soul. Specializing in high-performance architectures that prioritize human intuition.",
    ctaPrimary: { label: "View My Work", href: "/projects" },
    ctaSecondary: { label: "The Philosophy", href: "/about" },
    chips: [
      { _key: "1", icon: "terminal", label: "Fullstack Engineering" },
      { _key: "2", icon: "architecture", label: "System Design" },
    ],
  };

  // Prepare tech stack categories with fallback data
  const techStackCategories = techStack?.categories || [
    {
      icon: "web",
      title: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      bgStyle: "light" as const,
    },
    {
      icon: "storage",
      title: "Backend",
      skills: ["Sanity.io", "Node.js"],
      bgStyle: "medium" as const,
    },
    {
      icon: "settings",
      title: "Tools & Infrastructure",
      skills: ["Git", "VS Code"],
      bgStyle: "high" as const,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection {...content} />
       {/* Technical Stack Section */}
      <section className="bg-surface pt-16 pb-32 px-8 md:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <TechnicalStack 
            title={techStack?.title} 
            categories={techStackCategories} 
          />
        </div>
      </section>
      {/* Featured Section (Bento Grid) */}
      {/* <section className="bg-surface-container-low py-32 px-8 md:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.2em] font-bold text-outline mb-4 block">
                Selection 2024
              </span>
              <h2 className="font-serif text-5xl text-on-surface leading-tight">
                Hand-crafted solutions for complex problems
              </h2>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-outline-variant/30 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-on-surface/5 group">
              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-surface-container mb-8">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMz6sblRNg3yv1fC9DbvDNP0z70V2jYQ1-I_s8Cjgx-JPLiWFQK6sSIRr93x8ySq6ilsoACPaafvBl9MBTXajFgA5s4zIZPpJKQJdneHsLTE9xdjec3rcQcKgKLvUrvUvLGPLVwNZ0SNuQa91RB6zhbJ6LhjPeOnZRuSSWX0sqRER-Z5Pk2P1Cj1PirHQcx-9ajuHL32RS5gzND8mWupkqgZHr3BwHyKNRtcxqzxaGcCSfQRepo--HIordZb3g5CNY9UJCqEPuRLEf"
                  alt="Artisan Analytics dashboard"
                  width={900}
                  height={506}
                />
              </div>
              <div className="px-4 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-3xl mb-2">
                      Artisan Analytics
                    </h3>
                    <p className="text-on-surface-variant font-body">
                      Custom data engine for boutique galleries.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    north_east
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-label">
                    Next.js
                  </span>
                  <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-label">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-highest rounded-xl p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-on-surface/5 group">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-surface-container mb-8">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5wCaNkCE6v0NOCRqNR0rVH7rdmEuXYiWRsK4IfPiBCWAQY447SZDh7dMPSaEFY0y3Vozc-APa6mCvL1v45RsPKCneo1vQ571fzlMG6lGahAx3qT88Sfxobq16vJbmnsnj8dnToreM5EQcedigJFYqdmOh3lsKi_a7hv7p4mPCbIKs2b9r3SGC8XBvauWREgGV-rcpmqBhQ9oOast9WuUFq6Hct-9oz0tuVYIwpIzSJe_DEK2irDRkDfbykVYUqs9ZR8hoPNZqpwYU"
                  alt="Protocol X code"
                  width={500}
                  height={500}
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-serif text-2xl mb-2">Protocol X</h3>
                <p className="text-on-surface-variant font-body text-sm mb-6">
                  Open-source automation framework.
                </p>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-label">
                  Rust
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
}
