"use client";

import Link from "next/link";
import { UrnSculpture } from "@/components/shared/UrnSculpture";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { track } from "@/lib/analytics";
import { URNS, formatUsd } from "@/lib/pricing";
import { useReveal, revealAttr } from "@/lib/useReveal";
import { urnGallery as C } from "@/lib/content/checkout";

/**
 * The AETERNA collection — a reverent, fixed-dark gallery. Each colorway is
 * the same hand-built CSS sculpture in a different finish, resting on its own
 * glow. Cards rise on scroll (staggered), lift gently on hover, and each urn
 * rocks on its own slow phase so the room feels alive but never busy.
 * Reduced motion stills everything.
 */
export function UrnGallery() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(130% 110% at 50% 0%, #243029 0%, #131b16 62%, #0c120e 100%)",
        color: "#F6F1E7",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 pb-[110px] pt-[64px] md:px-16">
        <Link
          href="/a"
          className="gt-label !text-[11px] !tracking-[0.14em] text-[rgba(246,241,231,0.6)] transition-colors hover:text-gold-light"
        >
          {C.backHome}
        </Link>

        <div className="mt-10 max-w-[720px]">
          <MonoLabel className="mb-4 block !text-[11px] !tracking-[0.24em] text-gold">
            {C.kicker}
          </MonoLabel>
          <h1
            className="font-display font-light leading-[1.06]"
            style={{ fontSize: "clamp(38px, 5.6vw, 60px)" }}
          >
            {C.headline}
          </h1>
          <p className="mt-6 text-[15.5px] leading-[1.7] text-[rgba(246,241,231,0.72)]">
            {C.sub}
          </p>
        </div>

        <div
          ref={ref}
          className="mt-[70px] grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {URNS.map((urn, i) => (
            <article
              key={urn.id}
              data-reveal={revealAttr(inView)}
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              className="group flex flex-col rounded-[20px] border border-[rgba(230,199,154,0.18)] px-7 pb-8 pt-10 transition-all duration-500 hover:-translate-y-[6px] hover:border-[rgba(230,199,154,0.45)]"
              // each finish rests on its own faint field of light
            >
              <div
                className="pointer-events-none relative mx-auto flex h-[300px] items-center justify-center"
                style={{ filter: "saturate(1.02)" }}
              >
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${urn.palette.glow} 0%, transparent 62%)`,
                    mixBlendMode: "screen",
                  }}
                />
                <div
                  data-motion
                  style={{
                    animation: `gtTurn ${14 + i * 2}s ease-in-out ${i * 1.3}s infinite`,
                  }}
                >
                  <UrnSculpture compact turning={false} palette={urn.palette} />
                </div>
              </div>

              <h2 className="mt-6 font-display text-[24px] font-light leading-[1.15]">
                <span className="gt-underline-slide text-[#F6F1E7]">{urn.name}</span>
              </h2>
              <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[rgba(246,241,231,0.65)]">
                {urn.line}
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-[rgba(230,199,154,0.15)] pt-5">
                <span className="font-display text-[26px] font-light">
                  {formatUsd(urn.amountCents)}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href={`/checkout?urn=${urn.id}`}
                  onClick={() => track("buy_click", { variant: "urns", placement: "gallery", pkg: urn.id })}
                  className="gt-label gt-press inline-flex items-center justify-center rounded-[40px] border border-gold bg-gold px-6 py-[12px] !text-[11px] !tracking-[0.14em] text-ink hover:opacity-90"
                >
                  {C.standaloneCta}
                </Link>
                <Link
                  href={`/checkout?plan=full&urn=${urn.id}`}
                  className="gt-label gt-press inline-flex items-center justify-center rounded-[40px] border border-[rgba(230,199,154,0.4)] px-6 py-[12px] !text-[11px] !tracking-[0.14em] text-gold-light hover:border-gold-light"
                >
                  {C.withPlanCta}
                </Link>
              </div>
              <p className="mt-3 text-center font-mono text-[10px] tracking-[0.1em] text-[rgba(246,241,231,0.5)]">
                {C.fullCareNote}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-[13px] text-[rgba(246,241,231,0.55)]">
          {C.priceNote}
        </p>
      </div>
    </main>
  );
}
