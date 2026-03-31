/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/ergonomics_app",
          destination: "https://ergonomicsapp.vercel.app/",
        },
        {
          source: "/ergonomics_app/:path*",
          destination: "https://ergonomicsapp.vercel.app/:path*",
        },
        {
          source: "/mathandling_app",
          destination: "https://mathandlingapp.vercel.app/",
        },
        {
          source: "/mathandling_app/:path*",
          destination: "https://mathandlingapp.vercel.app/:path*",
        },
      ],
    };
  },
};
module.exports = nextConfig;
