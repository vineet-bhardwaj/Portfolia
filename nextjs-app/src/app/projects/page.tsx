import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="pt-12 pb-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      {/* Hero Section: Editorial Asymmetry */}
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <span className="font-label text-xs uppercase tracking-widest font-semibold text-outline mb-4 block">
            Selected Works 2023—2024
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-on-background italic">
            Curating digital experiences through{" "}
            <span className="text-primary font-normal not-italic">
              precise engineering
            </span>{" "}
            and intentional design.
          </h1>
        </div>
        <div className="md:pb-4">
          <p className="font-body text-on-surface-variant max-w-xs leading-relaxed">
            A collection of high-performance applications built with a focus on
            tactile interactions and scalable architecture.
          </p>
        </div>
      </header>

      {/* Projects Grid: Bento-style variations */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Feature Project (Wide) */}
        <div className="md:col-span-8 group">
          <div className="bg-surface-container-high rounded-xl p-4 overflow-hidden h-full flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-8">
              <Image
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQnSCx6B_EG797y_TzVwJhT730-8UzR9nqr5056TBuIbo8XrmUkeo3-ZY8FVvmPZ2ilOdtEM_-6Zj7WFQUHcoBdyh14D6emJBiCMKtSHoEInuE3PpSCMWJHAgQ-mId2Xtljw_Q3NQrAqfF496nbSIgu1482dkjIgJtx8rw_6ilpV6c_KQiDlUPv7ONjor_1EFUJxEeUBuFgT0-eXXSxlnvDoCc8gkePSQgWrnW5WY1_VSQO5p-Ll23zqunmd1GRU_VIM3WPIx7ssNY"
                alt="Ethereal Analytics Engine dashboard"
                width={900}
                height={506}
              />
            </div>
            <div className="px-4 pb-4 mt-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  React
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  TypeScript
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  GraphQL
                </span>
              </div>
              <h3 className="font-serif text-3xl mb-3">
                Ethereal Analytics Engine
              </h3>
              <p className="text-on-surface-variant mb-8 max-w-xl">
                A deep-data visualization platform for creative agencies,
                focusing on real-time performance metrics and aesthetic
                reporting.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  View Details{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-outline hover:text-on-surface transition-colors"
                >
                  Live Demo{" "}
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Small Project 1 */}
        <div className="md:col-span-4 group">
          <div className="bg-surface-container-low rounded-xl p-4 h-full flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-square mb-6">
              <Image
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_zYjM4ytSQ2nKE5cruiOSur9txqfcgB1ww7qZ5Kp8L1G05lzWBTkqWFnJnYiHiOIvu9TKGZd8uojXd30u9xRdRCAKRUukZo1H4CDeeE-TuPqIp7XlM_VGI1mjkLuuHHXoxJXoj0UU_VLTUkKcyaOj3HZX3BbEgxLa9ZBYFsWQ_NiYVYI4-3y_Af10c9hNggUO2ihU2hKck5p8g44B4-YwQRr59sxl7LXBiC6fWudcjLaZYvGOD9ffpkL8mQNXBIIpBquCj0rUpzSi"
                alt="Nexus Protocol abstract shapes"
                width={500}
                height={500}
              />
            </div>
            <div className="px-2 mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  Node.js
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  PostgreSQL
                </span>
              </div>
              <h3 className="font-serif text-2xl mb-2">Nexus Protocol</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Lightweight infrastructure for decentralized file management and
                encrypted metadata storage.
              </p>
              <Link
                href="#"
                className="editorial-gradient text-on-primary text-center block py-3 rounded-full font-medium active:scale-95 duration-200 transition-all"
              >
                Explore Project
              </Link>
            </div>
          </div>
        </div>

        {/* Small Project 2 */}
        <div className="md:col-span-4 group">
          <div className="bg-surface-container-low rounded-xl p-4 h-full flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-square mb-6">
              <Image
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW-5FaT-5RBUCuNCGIiijsccVH9j-NfZkyriB7zMIMo0nK8-4LcA0fuwxn9AozI2H6Wl8K0ZRmVUBmjY_blY5QigFBSgj6MCd3zMO6oEiBi0kakXn90R7TU5Nw7vS4THnkSUZfTXE7450RGTEOnvz8mNpQwWAX2NXdGEQ6Njep4wJrUez-LJeOeBSiSAAFaQ6DMZPipNrdvQz-A2ZJTJt-g5-HdpjPAbBCy5PxzZ8_XvB-4nSTpZ4ba77GxUMyEt1iCAlFdMDYuK1Q"
                alt="Milled UI Library keyboard components"
                width={500}
                height={500}
              />
            </div>
            <div className="px-2 mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  Next.js
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  Tailwind
                </span>
              </div>
              <h3 className="font-serif text-2xl mb-2">Milled UI Library</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                A design system for industrial applications, emphasizing
                high-contrast accessibility and tactile feedback.
              </p>
              <Link
                href="#"
                className="border-2 border-outline-variant/30 hover:bg-surface-container-highest transition-all text-center block py-3 rounded-full font-medium active:scale-95 duration-200"
              >
                View Case Study
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Project (Wide Reverse) */}
        <div className="md:col-span-8 group">
          <div className="bg-surface-container-high rounded-xl p-4 overflow-hidden h-full flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-8">
              <Image
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZTfKLCf6hx93IxMvc364rMHWZ4n5kt8XdNCJUVbn81R2bQDnSwXQx5RER2QcWFHwCtfcRCnYgcjm3K9KEcqL_ZMnsYB8B5lGUsEWeYo1LtIpu8Ank6feyIZM0KlWtaBhYGpDxVCyHAnr5RA2oDrnXR6W0_8IXuu4Cjpxux8Dwq2ZXUlPFmKcE1N5S8EGm7ytJOuQ0BKi0ETjv1HISxlAaTYtLvyZPELl8yl9OPGdvieIpOgBGdF2n-M1-4yxmLgWBak8WVQshQNxY"
                alt="Stone & Solder Platform architectural space"
                width={900}
                height={506}
              />
            </div>
            <div className="px-4 pb-4 mt-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  AWS
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  Python
                </span>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-label uppercase tracking-wider">
                  Terraform
                </span>
              </div>
              <h3 className="font-serif text-3xl mb-3">
                Stone &amp; Solder Platform
              </h3>
              <p className="text-on-surface-variant mb-8 max-w-xl">
                Cloud-native marketplace for independent hardware artisans,
                featuring complex inventory syncing and low-latency bidding.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  View Details{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-outline hover:text-on-surface transition-colors"
                >
                  GitHub Repo{" "}
                  <span className="material-symbols-outlined text-sm">
                    code
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination / Load More */}
      <div className="mt-32 flex justify-center">
        <button className="group flex flex-col items-center gap-4">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-outline group-hover:text-primary transition-colors">
            Show More Archive
          </span>
          <div className="w-px h-16 bg-outline-variant/30 group-hover:h-24 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
}
