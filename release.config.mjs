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
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/changelog",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "package-lock.json"],
        message: "chore(release): ${nextRelease.version}",
      },
    ],
  ],
};
