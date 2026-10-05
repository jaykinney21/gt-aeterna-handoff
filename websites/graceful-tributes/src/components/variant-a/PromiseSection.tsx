"use client";

import { MonoLabel } from "@/components/shared/MonoLabel";
import { promiseBlock } from "@/lib/content/variant-a";
import { useReveal, revealAttr } from "@/lib/useReveal";

/**
 * Problem → promise, side by side: the industry's failure mode on the left,
 * the founder's answer on the right. Sits between the trust strip and the
 * scheduler so the "why" lands before the ask. The problem half settles in
 * first; the promise answers it a beat later.
 */
export function PromiseSection() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <section
      id="story"
      aria-label="Why Graceful Tributes exists"
      className="bg-[var(--va-paper)] transition-colors duration-[550ms]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-16">
        <MonoLabel className="mb-[18px] block !text-[11px] text-sage">
          {promiseBlock.kicker}
        </MonoLabel>
        <div ref={ref} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[72px]">
          <div data-reveal={revealAttr(inView)}>
            <h2
              className="font-display font-light leading-[1.08] tracking-[-0.01em] text-[var(--va-ink)]"
              style={{ fontSize: "clamp(30px, 4.2vw, 44px)" }}
            >
              {promiseBlock.problemHeadline}
            </h2>
            <p className="mt-6 max-w-[460px] text-[15.5px] leading-[1.7] text-[var(--va-muted)]">
              {promiseBlock.problemBody}
            </p>
          </div>
          <div
            data-reveal={revealAttr(inView)}
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="border-t border-[var(--va-line)] pt-10 lg:border-l lg:border-t-0 lg:pl-[72px] lg:pt-0"
          >
            <h2
              className="font-display font-light leading-[1.08] tracking-[-0.01em] text-[var(--va-ink)]"
              style={{ fontSize: "clamp(30px, 4.2vw, 44px)" }}
            >
              {promiseBlock.solutionHeadline}
            </h2>
            <p className="mt-6 max-w-[460px] text-[15.5px] leading-[1.7] text-[var(--va-muted)]">
              {promiseBlock.solutionBody}
            </p>
            <a
              href="#services"
              className="gt-label gt-press mt-8 inline-flex items-center gap-[10px] rounded-[40px] border border-[var(--va-line)] px-6 py-[13px] !text-[11px] !tracking-[0.14em] text-[var(--va-ink)] hover:border-[var(--va-gold)]"
            >
              {promiseBlock.cta}
              <span aria-hidden className="gt-arrow inline-block text-[var(--va-gold)]">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
