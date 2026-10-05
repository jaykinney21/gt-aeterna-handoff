/** @type {import('next').NextConfig} */
const nextConfig = {
  // 2026-07-17: static export retired — the sticky A/AP traffic splitter
  // (src/middleware.ts) and /api/report need the standard Vercel build.
  // Per-port dev servers use distinct build dirs so two `next dev` instances
  // (dev:a / dev:b) don't clobber each other's .next cache.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Required when output: "export" — no Image Optimization server at runtime.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
