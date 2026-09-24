import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Cloudflare Workers cannot run the sharp binary that next/image uses
  // for on-demand optimization. Serving the original files is fine for a
  // landing page with a small number of curated images.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
        pathname: "/image-search-mcp/**",
      },
    ],
  },
  // Cloudflare Workers runtime is not Node.js; the OpenNext adapter
  // bridges the gap, but we still need to be honest about server
  // external packages that should not be bundled.
  serverExternalPackages: ["nodemailer"],
  experimental: {
    // Reduce the worker bundle size by minimising what gets bundled.
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // OpenNext expects the React runtime to be externalised so it can
  // share it across requests inside the Worker.
  // (No-op for now; flagged here for future maintainers.)
  reactStrictMode: false,
};

export default nextConfig;
