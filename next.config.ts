import type { NextConfig } from "next";

const repo = "sonocritico-companion";
const forGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(forGithubPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
