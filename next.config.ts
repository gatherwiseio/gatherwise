import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "5e364458276059f98e6f71fb28ad5255.cdn.bubble.io",
      },
    ],
  },
};

export default nextConfig;
