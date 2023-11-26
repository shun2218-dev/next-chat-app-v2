/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/start',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  staticPageGenerationTimeout: 2000,
};

module.exports = nextConfig;
