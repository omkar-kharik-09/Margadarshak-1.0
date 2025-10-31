import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Disable Next.js powered by header
  poweredByHeader: false,
  // Disable development indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;
