import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the workspace root to frontend/ so Turbopack doesn't guess it from a
  // lockfile outside this folder (source of the "inferred your workspace root" warning)
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Kept for any page that uses next/image — faculty cards use <img> directly
    // instead, since cs.sci.tu.ac.th blocks hotlinking through the image optimizer
    remotePatterns: [{ protocol: 'https', hostname: 'cs.sci.tu.ac.th' }],
  },
};

export default nextConfig;
