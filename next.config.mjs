// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable the App Router (default in Next 14)
  experimental: {
    // future features can be added here
  },
  // Allow images from Cloudinary if needed
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**'
    }]
  }
};

export default nextConfig;
