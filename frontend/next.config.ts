import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: process.argv[2] === "build" ? "../public" : ".next",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
