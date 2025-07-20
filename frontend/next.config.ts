import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Désactive l'optimisation automatique
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-legend-team.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
