const isGithubActions =
  (process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_ACTIONS === true) &&
  !process.env.VERCEL;
const isVercel = Boolean(process.env.VERCEL);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? "/Prabhusah" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export on GitHub Actions; Vercel natively builds Next.js
  ...(isGithubActions ? { output: "export" } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
