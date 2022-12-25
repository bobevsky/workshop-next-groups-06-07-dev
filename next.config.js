/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.sndimg.com", "upload.wikimedia.org", "elanaspantry.com"],
  },
};

module.exports = nextConfig;
