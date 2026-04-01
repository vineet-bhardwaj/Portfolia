import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface AboutMeProps {
  label?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  profileImage?: any;
}

export default function AboutMe({
  label = "The Narrative",
  title = "Crafting digital experiences with a curator's precision.",
  titleAccent = "experiences",
  description = "I am a full-stack developer based in Stockholm, dedicated to building software that balances high-performance engineering with intentional aesthetic design. My approach is rooted in the belief that code should be as elegant as the interface it powers.",
  profileImage
}: AboutMeProps) {
  // Format title with accent word
  const formatTitle = () => {
    if (!titleAccent || !title.includes(titleAccent)) {
      return title;
    }
    
    const parts = title.split(titleAccent);
    return (
      <>
        {parts[0]}
        <span className="italic text-primary">{titleAccent}</span>
        {parts[1]}
      </>
    );
  };

  // Get profile image URL
  const portraitUrl = profileImage
    ? (typeof profileImage === 'string' ? profileImage : urlFor(profileImage).width(600).height(750).url())
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAJpVrL1fB-BUL1ciePkTU9ZbMjx9xb9dRpUOUQiD6z5bELsfDDkHYM-Wh37urnkAD_SkhNcS7iWe3uon2y-X39akcKASXfcvp9HfSmSAWggUsFQZ8HeyQcnvjxNJHABqN2WNlS2F3tk5RbH5ZT7Hy_SxOh1yZIiR3kp4kqpmxYHQjHjBS7ruR7PU0ZDYGwM94uoh-xO6LjRst3F47VV-t2uX0SyGfCQTyJxBhvDm7uobDi8O47vP43_ksA90x3USUM9f5KgJiJ0k7F";

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32">
      <div className="md:col-span-7">
        <span className="font-label text-xs uppercase tracking-widest font-semibold text-tertiary mb-6 block">
          {label}
        </span>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight text-on-surface mb-8">
          {formatTitle()}
        </h1>
        <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      <div className="md:col-span-5 relative mt-12 md:mt-0">
        <div className="aspect-[4/5] bg-surface-container-high rounded-xl overflow-hidden relative z-10">
          <Image
            alt="Developer Portrait"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            src={portraitUrl}
            width={600}
            height={750}
          />
        </div>
        <div className="absolute -bottom-6 -left-6 w-full h-full bg-surface-container-low rounded-xl -z-10" />
      </div>
    </section>
  );
}
