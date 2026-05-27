import { spawnSync } from "node:child_process";

process.env.GITHUB_PAGES = "true";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
