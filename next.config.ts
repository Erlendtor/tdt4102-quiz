import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "image.underdusken.no" },
    ],
  },
};

export default nextConfig;
