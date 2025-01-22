/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here if needed
    return config;
  },
  env: {
    NEXT_PUBLIC_REPLICATE_API_TOKEN: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
  },
};

// Change from ES modules export to CommonJS export
module.exports = nextConfig;
