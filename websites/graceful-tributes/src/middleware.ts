import { NextResponse, type NextRequest } from "next/server";

/**
 * Sticky 50/50 split at the root URL: every new visitor is assigned Variant A
 * or Variant A-with-pricing, sees it AT "/" (rewrite, same address for
 * everyone), and keeps that assignment on every return visit via cookie.
 * Direct routes (/a, /b, /ap, /a2) are untouched, so nothing here hides a
 * variant from review.
 *
 * Per-port dev servers that pin NEXT_PUBLIC_VARIANT keep their pinned
 * variant — the splitter only runs when no variant is forced.
 */
const COOKIE = "gt_split";
const ARMS = ["a", "ap"] as const;
type Arm = (typeof ARMS)[number];

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_VARIANT) return NextResponse.next();

  const existing = req.cookies.get(COOKIE)?.value;
  const arm: Arm = ARMS.includes(existing as Arm)
    ? (existing as Arm)
    : Math.random() < 0.5
      ? "a"
      : "ap";

  const url = req.nextUrl.clone();
  url.pathname = `/${arm}`;
  const res = NextResponse.rewrite(url);
  if (existing !== arm) {
    res.cookies.set(COOKIE, arm, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
  }
  return res;
}

export const config = {
  matcher: "/",
};
