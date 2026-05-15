import { spawnSync } from "node:child_process";

process.env.GITHUB_PAGES = "true";
process.env.NEXT_PUBLIC_BASE_PATH = "/sonocritico-companion";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
