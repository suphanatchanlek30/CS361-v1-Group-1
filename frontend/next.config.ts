import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cs.sci.tu.ac.th',
      },
    ],
  },
};

export default nextConfig;