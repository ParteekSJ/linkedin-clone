/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rb.gy", "lh3.googleusercontent"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
