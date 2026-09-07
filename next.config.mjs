const isGithubActions = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_ACTIONS === true;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? '/Prabhusah' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
