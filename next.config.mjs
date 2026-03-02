/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Critical for Railway: ensure public folder is included in standalone build
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./public/**/*'],
    },
  },
}

export default nextConfig
