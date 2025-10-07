import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["phosphor-icons/react"] },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};
const withMDX = createMDX({});
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
