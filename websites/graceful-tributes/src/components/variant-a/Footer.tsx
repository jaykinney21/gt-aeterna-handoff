"use client";

import { MonoLabel } from "@/components/shared/MonoLabel";
import { CONTACT, bookingHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { splitTrailingArrow } from "@/lib/utils";
import { useReveal, revealAttr } from "@/lib/useReveal";
import * as A from "@/lib/content/variant-a";

/**
 * Fixed-dark footer: "Reach out." with the gold CTA, email/phone rows, and a
 * bottom meta row. A warm gold hairline sits along its top edge, and the two
 * columns settle in as the reader arrives.
 */
export function Footer() {
  const bookHref = bookingHref("#scheduler");
  const bookExternal = bookHref.startsWith("http");
  const cta = splitTrailingArrow(A.footer.cta);
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  return (
    <footer id="contact" className="relative bg-ink text-[#F6F1E7]">
      {/* Warm hairline — a thread of candlelight along the footer's edge. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 4%, rgba(216,177,120,.55) 50%, transparent 96%)",
        }}
      />
      <div ref={ref} className="mx-auto max-w-[1280px] px-6 pb-[44px] pt-[80px] md:px-16">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.3fr_1fr]">
          <div data-reveal={revealAttr(inView)}>
            <h2
              className="font-display font-light leading-[1.02]"
              style={{ fontSize: "clamp(40px, 5.4vw, 54px)" }}
            >
              {A.footer.headline}
            </h2>
            <p className="mt-5 max-w-[380px] text-[15px] leading-[1.65] text-[rgba(246,241,231,0.74)]">
              {A.footer.body}
            </p>
          </div>

          <div
            data-reveal={revealAttr(inView)}
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="flex flex-col gap-[18px] pt-2"
          >
            <div className="flex items-center justify-between border-b border-[rgba(246,241,231,0.2)] pb-[14px]">
              <MonoLabel className="!text-[11px] !tracking-[0.16em] text-[rgba(246,241,231,0.55)]">
                Email
              </MonoLabel>
              <a
                href={"mailto:" + CONTACT.email}
                onClick={() => track("email_click", { variant: "a", placement: "footer" })}
                className="text-[15px] transition-colors hover:text-gold-light"
              >
                {A.email}
              </a>
            </div>
            <div className="flex items-center justify-between border-b border-[rgba(246,241,231,0.2)] pb-[14px]">
              <MonoLabel className="!text-[11px] !tracking-[0.16em] text-[rgba(246,241,231,0.55)]">
                Phone
              </MonoLabel>
              <a
                href={CONTACT.phoneHref}
                onClick={() => track("call_click", { variant: "a", placement: "footer" })}
                className="text-[15px] transition-colors hover:text-gold-light"
              >
                {A.phone}
              </a>
            </div>
            <a
              href={bookHref}
              {...(bookExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => track("book_call_click", { variant: "a", placement: "footer" })}
              className="gt-label gt-press mt-2 inline-flex items-center gap-[10px] self-start rounded-[40px] bg-gold px-7 py-[14px] !text-[12px] !tracking-[0.14em] text-ink-deep hover:brightness-[1.05]"
            >
              {cta.text}
              {cta.arrow ? (
                <span aria-hidden className="gt-arrow inline-block">
                  →
                </span>
              ) : null}
            </a>
          </div>
        </div>

        <div className="mt-[60px] flex flex-col gap-3 border-t border-[rgba(246,241,231,0.16)] pt-6 font-mono text-[11px] tracking-[0.1em] text-[rgba(246,241,231,0.5)] sm:flex-row sm:justify-between">
          {A.footer.bottom.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
