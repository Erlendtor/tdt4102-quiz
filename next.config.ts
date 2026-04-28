import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "image.underdusken.no" },
    ],
  },
};

export default nextConfig;
