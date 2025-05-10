/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable basePath in development but set it for production GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/eshanized_web' : '',
  // Increase memory limit for the build process
  webpack: (config) => {
    // Optimize webpack performance settings
    config.performance = {
      ...config.performance,
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };
    
    return config;
  },
};

module.exports = nextConfig;
