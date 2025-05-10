/**
 * @type {import('next').NextConfig}
 */

const isProd = process.env.NODE_ENV === 'production';
// For user pages (username.github.io), no repo name is needed in the path
const repo = '';

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // For username.github.io repos, basePath should be empty
  basePath: '',
  // For username.github.io repos, assetPrefix should be empty in production
  assetPrefix: '',
  distDir: 'out',
  trailingSlash: true,
  // Additional configuration
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    // Allow SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};