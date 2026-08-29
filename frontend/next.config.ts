import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cs.sci.tu.ac.th",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
