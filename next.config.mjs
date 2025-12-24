/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [20, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary images
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com", // Cloudinary images
      },
    ],
  },
};

export default nextConfig;
