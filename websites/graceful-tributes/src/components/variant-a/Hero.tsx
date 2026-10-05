"use client";

import { MonoLabel } from "@/components/shared/MonoLabel";
import { bookingHref, mailtoHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import * as A from "@/lib/content/variant-a";

/**
 * Cinematic dark hero band — fixed-dark in both themes. Layered drifting radial
 * gradients + shimmer + vignette behind a centered Newsreader headline, glass CTA,
 * and corner detail cards. The headline is the page's single <h1>.
 */
export function Hero() {
  const bookHref = bookingHref("#scheduler");
  const bookExternal = bookHref.startsWith("http");
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative h-[640px] overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg,#26352c 0%,#3b5147 46%,#6E8C96 132%)",
      }}
    >
      {/* Ambient drifting light */}
      <div
        aria-hidden
        data-motion
        className="absolute inset-[-25%]"
        style={{
          background:
            "radial-gradient(42% 48% at 32% 30%, rgba(246,241,231,.30), transparent 62%)",
          mixBlendMode: "screen",
          animation: "gtDrift 19s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        data-motion
        className="absolute inset-[-25%]"
        style={{
          background:
            "radial-gradient(36% 40% at 72% 62%, rgba(110,140,150,.55), transparent 60%)",
          mixBlendMode: "screen",
          animation: "gtDrift2 24s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        data-motion
        className="absolute bottom-[8%] left-[-10%] right-[-10%] h-[160px]"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(246,241,231,.16),transparent)",
          filter: "blur(8px)",
          animation: "gtShimmer 11s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 38%, transparent 38%, rgba(20,28,23,.6) 100%)",
        }}
      />

      {/* Corner eyebrows */}
      <div className="absolute left-0 right-0 top-0">
        <div className="mx-auto flex max-w-[1280px] justify-between px-6 py-7 md:px-16">
          {A.hero.eyebrows.map((e, i) => (
            <MonoLabel
              key={e}
              className="gt-enter !text-[11px] !tracking-[0.22em] text-[rgba(246,241,231,0.74)]"
              style={{ "--enter-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              {e}
            </MonoLabel>
          ))}
        </div>
      </div>

      {/* Centered headline — rises in a slow, once-only stagger on load. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-10">
        <h1
          className="gt-enter font-display font-light leading-[1.02] tracking-[-0.01em] text-[#F6F1E7]"
          style={
            {
              fontSize: "clamp(44px, 9vw, 94px)",
              "--enter-delay": "180ms",
            } as React.CSSProperties
          }
        >
          {A.hero.headline}
        </h1>
        <p
          className="gt-enter mt-[22px] max-w-[520px] text-[16px] leading-[1.6] text-[rgba(246,241,231,0.84)]"
          style={{ "--enter-delay": "360ms" } as React.CSSProperties}
        >
          {A.hero.sub}
        </p>
        <div
          className="gt-enter mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-4"
          style={{ "--enter-delay": "540ms" } as React.CSSProperties}
        >
          <a
            href={bookHref}
            {...(bookExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track("book_call_click", { variant: "a", placement: "hero" })}
            className="gt-glass gt-label gt-press inline-flex items-center gap-[11px] rounded-[40px] border border-white/50 px-[30px] py-4 !text-[12px] !tracking-[0.14em] text-[#F6F1E7] hover:border-white/80"
            style={{
              background: "rgba(255,255,255,.16)",
              boxShadow:
                "0 14px 34px -10px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.6)",
            }}
          >
            {A.hero.ctaPrimary}{" "}
            <span className="gt-arrow inline-block text-gold-light">→</span>
          </a>
          <a
            href={mailtoHref("Talk to us — Graceful Tributes")}
            onClick={() => track("email_click", { variant: "a", placement: "hero" })}
            className="gt-label !text-[12px] !tracking-[0.14em] text-[rgba(246,241,231,0.8)] transition-colors hover:text-[#F6F1E7]"
          >
            {A.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Film play card */}
      <div
        className="gt-glass gt-enter absolute bottom-[26px] left-6 hidden items-center gap-[14px] rounded-[16px] border border-white/40 py-3 pl-3 pr-4 sm:flex md:left-16"
        style={
          {
            background: "rgba(255,255,255,.14)",
            boxShadow:
              "0 18px 40px -14px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.5)",
            "--enter-delay": "720ms",
          } as React.CSSProperties
        }
      >
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-[12px] text-[#F6F1E7]"
          style={{ background: "rgba(255,255,255,.18)" }}
        >
          ▶
        </span>
        <span className="block">
          <MonoLabel className="block !text-[10px] !tracking-[0.18em] text-[rgba(246,241,231,0.7)]">
            {A.hero.filmKicker}
          </MonoLabel>
          <span className="block font-display text-[17px] italic text-[#F6F1E7]">
            {A.hero.filmTitle}
          </span>
        </span>
      </div>

      <div
        className="gt-enter absolute bottom-[34px] right-6 hidden font-display text-[18px] font-light italic text-[rgba(246,241,231,0.72)] sm:block md:right-16"
        style={{ "--enter-delay": "720ms" } as React.CSSProperties}
      >
        {A.hero.tag}
      </div>
    </section>
  );
}
