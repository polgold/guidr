import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy Airbnb links → new Next.js routes
      { source: "/115esp", destination: "/es/propiedades/115", permanent: true },
      { source: "/115eng", destination: "/en/propiedades/115", permanent: true },
      { source: "/115por", destination: "/pt/propiedades/115", permanent: true },
      { source: "/105esp", destination: "/es/propiedades/105", permanent: true },
      { source: "/105eng", destination: "/en/propiedades/105", permanent: true },
      { source: "/105por", destination: "/pt/propiedades/105", permanent: true },
    ];
  },
};

export default nextConfig;
