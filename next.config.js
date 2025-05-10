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
  // Simplified basePath configuration
  basePath: process.env.NODE_ENV === 'production' ? '/eshanized_web' : '',
  // Add distDir to ensure build output is consistent
  distDir: 'out',
  // Add trailing slash configuration
  trailingSlash: true,
};

module.exports = nextConfig;