import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  allowedDevOrigins: [
    "192.168.1.45",
    "192.168.1.45:3000",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for assets
  },
};

export default nextConfig;
