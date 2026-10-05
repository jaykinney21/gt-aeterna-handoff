"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";
import * as A from "@/lib/content/variant-a";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Types the headline on once the section scrolls into view; instant under
 *  reduced motion. The caret fades out when the line completes. */
function useTypeOn(text: string, started: boolean) {
  const [count, setCount] = useState(() => text.length);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!started || armed) return;
    if (prefersReducedMotion()) return; // keep full text, no animation
    setArmed(true);
    setCount(0);
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, 34);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return { shown: text.slice(0, count), done: count >= text.length };
}

/**
 * "The process" — header row over a glass container holding five steps divided
 * by vertical lines (collapses to 1/2 columns on small screens).
 *
 * Motion: the headline types on quietly when the section enters the viewport,
 * and the five steps rise in one after another (data-reveal in globals.css).
 * Everything renders instantly under prefers-reduced-motion.
 */
export function Process() {
  const { ref: sectionRef, inView } = useReveal<HTMLElement>(0.25);
  const { shown, done } = useTypeOn(A.process.headline, inView);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Our process"
      className="border-y border-[var(--va-line)] bg-[var(--va-surface)] transition-colors duration-[550ms]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-16">
        <div className="mb-[46px] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <MonoLabel className="mb-[18px] block !text-[11px] text-[var(--va-gold)]">
              {A.process.kicker}
            </MonoLabel>
            <h2
              className="font-display font-light leading-[1.04] tracking-[-0.01em] text-[var(--va-ink)]"
              style={{ fontSize: "clamp(34px, 5vw, 50px)", minHeight: "1.04em" }}
              aria-label={A.process.headline}
            >
              <span aria-hidden>{shown}</span>
              {!done ? (
                <span
                  aria-hidden
                  data-motion
                  className="ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-[var(--va-gold)]"
                  style={{ animation: "gtCaret 1s step-end infinite" }}
                />
              ) : null}
            </h2>
          </div>
          <p className="max-w-[330px] text-[14.5px] leading-[1.65] text-[var(--va-muted)]">
            {A.process.intro}
          </p>
        </div>

        <GlassCard className="rounded-[20px] p-[14px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {A.process.steps.map((step, i) => (
              <div
                key={step.no}
                data-reveal={inView ? "in" : ""}
                style={{ "--reveal-delay": `${i * 130}ms` } as React.CSSProperties}
                className={cn(
                  "px-[22px] py-[30px]",
                  // row dividers when stacked/2-col; vertical dividers at the 5-col layout
                  i < A.process.steps.length - 1 &&
                    "border-b border-[var(--va-line)] lg:border-b-0 lg:border-r",
                )}
              >
                <div className="font-mono text-[12px] text-[var(--va-gold)]">
                  {step.no}
                </div>
                <div className="mt-[14px] font-display text-[20px] leading-[1.15] text-[var(--va-ink)]">
                  {step.title}
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.5] text-[var(--va-muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
