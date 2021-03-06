/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.npr.org"],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/saved",
        destination: "/saved/favorites",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
