import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import ContactForm from "@/components/ContactForm";

interface AboutMeData {
  profileImage?: string;
}

export default async function ContactPage() {
  // Fetch about me data for avatar
  const aboutMe: AboutMeData | null = await client.fetch(
    `*[_type == "aboutMe" && page == "about"][0]{
      "profileImage": profileImage.asset->url
    }`
  );

  const avatarUrl = aboutMe?.profileImage || "https://avatars.githubusercontent.com/u/5627502?s=400&u=19f2b557d056836444dab9128fe98b42c9e9fcb5&v=4";
  return (
    <div className="pt-12 pb-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      {/* Hero Section Asymmetric */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
        <div className="lg:col-span-8">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-none mb-8">
            Let&apos;s build <br />{" "}
            <span className="italic">something together.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-body leading-relaxed">
            Whether you have a specific project in mind or just want to discuss
            the nuances of clean architecture, my inbox is always open for
            thoughtful collaboration.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-start lg:justify-end pb-4">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-label uppercase tracking-widest font-semibold text-outline">
              Social Connections
            </span>
            <div className="flex gap-6">
              <a
                className="group flex items-center gap-2 text-primary font-medium"
                href="https://github.com/vineet-bhardwaj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">terminal</span>
                <span className="border-b border-transparent group-hover:border-primary transition-all">
                  GitHub
                </span>
              </a>
              <a
                className="group flex items-center gap-2 text-primary font-medium"
                href="https://www.linkedin.com/in/vineetbme/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="border-b border-transparent group-hover:border-primary transition-all">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Contact & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Contact Form Section */}
        <section className="lg:col-span-3 bg-surface-container-low rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-serif mb-10">Send a Message</h2>
          <ContactForm />
        </section>

        {/* Resume & Logistics Sidebar */}
        <aside className="lg:col-span-2 space-y-12">
          {/* Resume Card */}
          <div
            id="resume"
            className="bg-surface-container-highest rounded-xl p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-4">Curriculum Vitae</h3>
              <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
                A comprehensive overview of my technical expertise, professional
                experience, and academic background in software engineering.
              </p>
              <a
                className="inline-flex items-center justify-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-xl font-bold transition-all hover:bg-stone-50 group"
                href="/vineetbhardwaj.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Vineet-Bhardwaj-Resume.pdf"
              >
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </a>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12">
              <span className="material-symbols-outlined text-[120px]">
                description
              </span>
            </div>
          </div>

          {/* Expertise Clusters */}
          <div className="space-y-6">
            <h3 className="text-xs font-label uppercase tracking-widest font-semibold text-outline">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Architecture Design",
                "Full-Stack Development",
                "Cloud Infrastructure",
                "UI/UX Strategy",
                "API Engineering",
              ].map((comp) => (
                <span
                  key={comp}
                  className="px-4 py-2 bg-tertiary-container text-on-tertiary-container rounded-lg text-sm font-medium"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Friendly Note */}
          <div className="p-8 border border-outline-variant/15 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary-container">
                <Image
                  className="w-full h-full object-cover"
                  src={avatarUrl}
                  alt="Profile portrait"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <p className="italic font-serif text-lg leading-snug">
                  &ldquo;I typically respond within 24 hours. Looking forward to
                  our conversation.&rdquo;
                </p>
                <p className="text-xs font-label uppercase tracking-widest mt-2 text-outline">
                  The Curator
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Featured Project Preview */}
      {/* <section className="mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-4xl font-serif">Latest Publication</h2>
          <Link
            href="/projects"
            className="text-xs font-label uppercase tracking-widest font-semibold text-primary flex items-center gap-2 group"
          >
            View Journal{" "}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE5JPpXgbNk46sWFPce-6Tw7Uc-Y5oRGC3AbFzNEW8PZ7sUELxpitT2hcu-tSq8_UkNzDbzjEaVwdvVif45zoAOsnfbGA3g6aEkd7SvH3EsX8kJfdU7Vh_1zGblJP2v9Gd3R2UIvV3CYY9oiOsoA_xxrxmCH1LESildsUwfLBDZh2XDwPQrzQry2S2T52b0mu4z5MJrprrLqkgXa3hZWwqpFMYZdNajiREA3jqJPmKz2ApHJxAYjinT9h5GQUPbtNAIezoIQrQTqWi"
              alt="Modern workspace with sunset"
              width={800}
              height={450}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest font-medium opacity-80 mb-2">
                Case Study
              </span>
              <h4 className="text-2xl font-serif">
                Scaling Architecture for Modern Workspaces
              </h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container rounded-xl flex flex-col justify-center items-center p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">
                star_rate
              </span>
              <h5 className="text-3xl font-serif">12+</h5>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                Global Awards
              </p>
            </div>
            <div className="bg-surface-container-high rounded-xl flex flex-col justify-center items-center p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">
                groups
              </span>
              <h5 className="text-3xl font-serif">40+</h5>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                Happy Partners
              </p>
            </div>
            <div className="col-span-2 bg-secondary-container/30 rounded-xl p-8 flex items-center justify-between">
              <div>
                <h5 className="text-xl font-serif">Available for work</h5>
                <p className="text-sm text-on-secondary-container">
                  Current capacity: Q4 2024
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
