"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { cn } from "@/lib/utils";
import * as A from "@/lib/content/variant-a";

/**
 * "Voices of families" — initials chips (DM / RT / JK) switch the active quote
 * shown in the surface card. Active chip is ink-filled and scaled.
 *
 * The voices now turn on their own — a slow, unhurried rotation that pauses
 * while the pointer rests on the section and stops for good once a reader
 * chooses a voice themselves. Respects prefers-reduced-motion.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const items = A.testimonialsBlock.items;
  const active = items[index];

  useEffect(() => {
    if (pinned || hovering) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      7000,
    );
    return () => clearInterval(timer);
  }, [pinned, hovering, items.length]);

  return (
    <section
      aria-label="Testimonials"
      className="bg-[var(--va-paper)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-16">
        <div className="mb-[42px] flex items-end justify-between">
          <MonoLabel className="!text-[11px] text-sage">
            {A.testimonialsBlock.kicker}
          </MonoLabel>
          <div className="flex gap-[10px]" role="radiogroup" aria-label="Choose a testimonial">
            {items.map((t, i) => (
              <button
                type="button"
                key={t.i}
                role="radio"
                onClick={() => {
                  setIndex(i);
                  setPinned(true);
                }}
                aria-checked={i === index}
                aria-label={`Show testimonial from ${t.n}`}
                className={cn(
                  "flex h-[42px] w-[42px] items-center justify-center rounded-full font-mono text-[12px] transition-all duration-[250ms]",
                  i === index
                    ? "scale-[1.08] bg-[var(--va-ink)] text-[var(--va-paper)]"
                    : "border border-[var(--va-line)] bg-[var(--va-surface)] text-[var(--va-muted)]",
                )}
                style={
                  i === index
                    ? { boxShadow: "0 10px 22px -10px rgba(46,61,51,.7)" }
                    : undefined
                }
              >
                {t.i}
              </button>
            ))}
          </div>
        </div>

        <figure
          className="rounded-[18px] border border-[var(--va-line)] bg-[var(--va-surface)] px-8 py-[54px] transition-colors duration-[550ms] md:px-[60px]"
          style={{
            boxShadow:
              "0 30px 64px -30px rgba(46,61,51,.55), inset 0 1px 0 rgba(255,255,255,.4)",
          }}
        >
          {/* All quotes stack in one grid cell so the card always reserves
              the tallest quote's height — the auto-rotate never shifts the
              page (the old fixed minHeight caused CLS on phones). */}
          <div className="grid">
            {items.map((t) => (
              <blockquote
                key={t.i}
                aria-hidden
                className="invisible col-start-1 row-start-1 font-display font-light leading-[1.34] tracking-[-0.005em]"
                style={{ fontSize: "clamp(24px, 3.4vw, 34px)" }}
              >
                {t.q}
              </blockquote>
            ))}
            <blockquote
              key={active.i}
              data-motion
              className="col-start-1 row-start-1 font-display font-light leading-[1.34] tracking-[-0.005em] text-[var(--va-ink)]"
              style={{
                fontSize: "clamp(24px, 3.4vw, 34px)",
                animation: "gtWordIn 0.6s ease both",
              }}
            >
              {active.q}
            </blockquote>
          </div>
          <figcaption className="mt-[30px] flex items-center gap-[14px] border-t border-[var(--va-line)] pt-[26px]">
            <span
              aria-hidden
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-stone font-mono text-[13px] text-ink"
            >
              {active.i}
            </span>
            <span className="block">
              <span className="block text-[15px] font-semibold text-[var(--va-ink)]">
                {active.n}
              </span>
              <span className="gt-label block !text-[10.5px] !tracking-[0.1em] text-[var(--va-muted)]">
                {active.r}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
