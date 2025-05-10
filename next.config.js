/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add basePath for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  // Increase memory limit for webpack
  webpack: (config, { isServer }) => {
    // Increase memory limit for the build process
    config.performance = {
      ...config.performance,
      hints: false, // Disable webpack performance hints
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };
    
    return config;
  },
};

module.exports = nextConfig;
