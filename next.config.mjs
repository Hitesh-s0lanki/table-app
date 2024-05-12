/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "files.edgestore.dev",
      "res.cloudinary.com",
      "files.oaiusercontent.com",
    ],
  },
};

export default nextConfig;
