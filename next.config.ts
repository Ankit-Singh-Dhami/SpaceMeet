import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "lh3.googleusercontent.com", // Google / Kinde avatars
      "avatars.githubusercontent.com", // GitHub (optional)
    ],
  },
};

export default nextConfig;
