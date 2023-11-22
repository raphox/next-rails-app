/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: "../public",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
