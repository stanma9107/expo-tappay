/**
 * @type {import('semantic-release').GlobalConfig}
 */

export default {
  branches: [
    "main",
    {
      name: "dev",
      prerelease: true,
    },
  ],
  tagFormat: "v${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "docs", release: "patch" },
        ],
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "package-lock.json"],
        message: "chore(release): ${nextRelease.version}",
      },
    ],
  ],
};
