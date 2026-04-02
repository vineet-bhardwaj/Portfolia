import Image from "next/image";
import { client } from "@/sanity/client";
import AboutMe from "@/components/AboutMe";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import TechnicalStack from "@/components/TechnicalStack";

interface AboutMeData {
  tagline: string;
  title: string;
  description: string;
  profileImage?: string;
}

interface ProfessionalJourneyData {
  title: string;
  experiences: {
    period: string;
    position: string;
    company: string;
    location: string;
  }[];
}

interface TechnicalStackData {
  title: string;
  categories: {
    title: string;
    icon: string;
    bgStyle: string;
    skills: string[];
  }[];
}

export default async function AboutPage() {
  // Fetch About Me from Sanity
  const aboutMe: AboutMeData | null = await client.fetch(
    `*[_type == "aboutMe" && page == "about"][0]{
      tagline,
      title,
      description,
      "profileImage": portrait.asset->url
    }`
  );

  console.log('About Me data from Sanity:', aboutMe);

  // Fetch Professional Journey from Sanity
  const journey: ProfessionalJourneyData | null = await client.fetch(
    `*[_type == "professionalJourney" && page == "about"][0]{
      title,
      experiences[]{
        period,
        position,
        company,
        location
      }
    }`
  );

  // Fetch Technical Stack from Sanity
  const techStack: TechnicalStackData | null = await client.fetch(
    `*[_type == "technicalStack" && page == "about"][0]{
      title,
      categories[]{
        title,
        icon,
        bgStyle,
        skills
      }
    }`
  );

  // Fallback data for About Me
  const aboutMeData = aboutMe || {
    tagline: "Introduction",
    title: "About Me",
    description: "A passionate software architect and digital curator dedicated to crafting meaningful digital experiences. With expertise spanning frontend and backend development, I specialize in creating elegant solutions to complex technical challenges.",
    profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJpVrL1fB-BUL1ciePkTU9ZbMjx9xb9dRpUOUQiD6z5bELsfDDkHYM-Wh37urnkAD_SkhNcS7iWe3uon2y-X39akcKASXfcvp9HfSmSAWggUsFQZ8HeyQcnvjxNJHABqN2WNlS2F3tk5RbH5ZT7Hy_SxOh1yZIiR3kp4kqpmxYHQjHjBS7ruR7PU0ZDYGwM94uoh-xO6LjRst3F47VV-t2uX0SyGfCQTyJxBhvDm7uobDi8O47vP43_ksA90x3USUM9f5KgJiJ0k7F"
  };

  console.log('About Me data being passed to component:', aboutMeData);

  // Fallback data for Professional Journey
  const journeyData = journey || {
    title: "Professional Journey",
    experiences: [
      {
        period: "2022 — Present",
        position: "Senior Product Engineer",
        company: "Nexus Creative Agency",
        location: "Stockholm, SE"
      },
      {
        period: "2019 — 2022",
        position: "Full Stack Developer",
        company: "Vanguard Tech Solutions",
        location: "London, UK"
      },
      {
        period: "2017 — 2019",
        position: "Junior Web Developer",
        company: "Starlight Digital",
        location: "Remote"
      }
    ]
  };

  // Fallback data for Technical Stack
  const techStackCategories = techStack?.categories || [
    {
      icon: "web",
      title: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: "storage",
      title: "Backend",
      skills: ["Sanity.io", "Node.js", "PostgreSQL"]
    },
    {
      icon: "settings",
      title: "Tools & Infrastructure",
      skills: ["Git", "VS Code", "Docker"]
    }
  ];

  return (
    <div className="pt-12 pb-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      {/* About Me Section */}
      <AboutMe 
        tagline={aboutMeData.tagline}
        title={aboutMeData.title}
        description={aboutMeData.description}
        profileImage={aboutMeData.profileImage}
      />

      {/* The Skill Ecosystem (Bento Grid) */}
      <TechnicalStack 
        title={techStack?.title}
        categories={techStackCategories}
      />

      {/* Process / Philosophy Section */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-center">
        <div className="order-2 md:order-1">
          <div className="aspect-video bg-surface-container-low rounded-xl overflow-hidden relative">
            <Image
              alt="Studio Environment"
              className="w-full h-full object-cover opacity-80 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjlfio-BegidwwTZyKulRa_Ztj2RImqulmuAex-e-LV2nrMouvWHUAijQT41iXjR_lalaRETJfkKWehU2Y0MFbsU_XxA4cr-tcXS3ZcKXNRCviJTGVc0yJqggtGIqSwUQvyaPMhoPaksaepPmgQqfo8v5ytGXp8bFARohPIEyI0dzmiDKeBLZFgiWOPzNqAI55sZipzy_YW97jJy9JtBeOyDESf7rX7h46lCsIQrVRglAikijZ1W_1vGpT3SgLzrZZTpWH6rmaBMCQ"
              width={800}
              height={450}
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="font-label text-xs uppercase tracking-widest font-semibold text-tertiary mb-6 block">
            Philosophy
          </span>
          <h2 className="font-serif text-4xl text-on-surface mb-8">
            The Pursuit of the <span className="italic">Meaningful</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <span className="font-serif text-2xl text-outline-variant">
                01
              </span>
              <div>
                <h4 className="font-body font-bold text-on-surface mb-2">
                  Intentional Design
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Every pixel serves a purpose. I avoid decorative clutter in
                  favor of clarity and usability.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="font-serif text-2xl text-outline-variant">
                02
              </span>
              <div>
                <h4 className="font-body font-bold text-on-surface mb-2">
                  Performant Logic
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Speed is a feature. My backend architectures are built for
                  high-concurrency and minimal latency.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="font-serif text-2xl text-outline-variant">
                03
              </span>
              <div>
                <h4 className="font-body font-bold text-on-surface mb-2">
                  Continuous Iteration
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  The best software is never finished. I leverage robust CI/CD
                  pipelines for rapid, safe deployment cycles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Experience Micro-Timeline */}
      <ProfessionalJourney 
        title={journeyData.title}
        experiences={journeyData.experiences}
      />
    </div>
  );
}
