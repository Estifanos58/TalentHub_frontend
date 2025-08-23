import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    // Warning: disables linting during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
