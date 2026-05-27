import type { NextConfig } from "next";

const forGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(forGithubPages
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
