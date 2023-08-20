/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'images.pexels.com'],
  },
};

module.exports = nextConfig;
