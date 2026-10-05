import type { Metadata } from "next";
import Link from "next/link";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { thankYou as C } from "@/lib/content/checkout";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6 text-[#2e3d33]">
      <div className="max-w-[560px] text-center">
        <MonoLabel className="mb-4 block !text-[11px] !tracking-[0.24em] text-sage">
          {C.kicker}
        </MonoLabel>
        <h1
          className="font-display font-light leading-[1.08]"
          style={{ fontSize: "clamp(34px, 5vw, 50px)" }}
        >
          {C.headline}
        </h1>
        <p className="mt-6 text-[15.5px] leading-[1.7] opacity-75">{C.body}</p>
        <Link
          href="/"
          className="gt-label mt-9 inline-flex items-center rounded-[40px] border border-[#2e3d33] px-7 py-[13px] !text-[11px] !tracking-[0.14em]"
        >
          {C.cta}
        </Link>
      </div>
    </main>
  );
}
