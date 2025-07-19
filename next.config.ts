import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cards.scryfall.io',
        port: '',
        pathname: '/**',
      },
    ],
    // Add additional configuration for better error handling
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    // Add loading timeout
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add experimental features that might help with stability
  experimental: {
    // This can help with image optimization issues
    optimizePackageImports: ['@supabase/supabase-js'],
  },
};

export default nextConfig;
