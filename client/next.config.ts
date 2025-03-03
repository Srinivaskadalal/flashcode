import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-preety"],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
      },
    ],
  },
};

export default nextConfig;
