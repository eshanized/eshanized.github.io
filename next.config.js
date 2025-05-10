/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  basePath: process.env.NODE_ENV === 'production' ? '/eshanized_web' : '',
  // Remove custom webpack config as it may be causing issues
};

module.exports = nextConfig;