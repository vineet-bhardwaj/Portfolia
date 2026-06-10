/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/decks/aigent-impact",
        destination: "/decks/aigent-impact.html",
      },
      {
        source: "/decks/aigent-impact-report",
        destination: "/decks/aigent-impact-report.html",
      },
    ];
  },
};

export default nextConfig;
