import type { NextConfig } from "next";

const APP = "https://app.gatherwise.io";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "5e364458276059f98e6f71fb28ad5255.cdn.bubble.io",
      },
    ],
  },
  // 301s for paths that used to live on the root domain (Bubble app) and now
  // answer on the app subdomain. Query strings are forwarded automatically.
  async redirects() {
    return [
      { source: "/docs", destination: `${APP}/docs`, statusCode: 301 },
      // preserve any deep-link path segments under /docs
      { source: "/docs/:path*", destination: `${APP}/docs/:path*`, statusCode: 301 },
      { source: "/legal", destination: `${APP}/legal`, statusCode: 301 },
      { source: "/privacypolicy", destination: `${APP}/privacypolicy`, statusCode: 301 },
    ];
  },
};

export default nextConfig;
