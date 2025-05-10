/**
 * @type {import('next').NextConfig}
 */

const isProd = process.env.NODE_ENV === 'production';
const repo = 'eshanized.github.io'; // Your repository name

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
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
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