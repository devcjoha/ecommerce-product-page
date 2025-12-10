import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: "/ecommerce-product-page",
  assetPrefix: "/ecommerce-product-page/",
  reactStrictMode: true,
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
