"use client";

import { useRef, useState } from "react";
import { UrnSculpture } from "@/components/shared/UrnSculpture";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { mailtoHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { splitTrailingArrow } from "@/lib/utils";
import { useReveal, revealAttr } from "@/lib/useReveal";
import * as A from "@/lib/content/variant-a";

/**
 * Fixed-dark AETERNA showcase: header row, the turning CSS urn over a gold glow
 * blob + light streak, then a "drag to turn" pill and an italic caption.
 *
 * "Drag to turn" is real: pointer-dragging the urn rocks it under your hand
 * (same axis as its resting gtTurn sway) and it settles back gently on release.
 * The idle sway pauses while you hold it. Discoverability: the first time the
 * section enters view the urn gives one gentle sway (as if a hand just left
 * it), and the gold glow drifts a few pixels after the pointer — candlelight
 * noticing someone walk past. Reduced motion stills all of it.
 */
export function UrnSection() {
  const [deg, setDeg] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const start = useRef({ x: 0, deg: 0 });
  const glowRef = useRef<HTMLDivElement | null>(null);
  const { ref: sectionRef, inView } = useReveal<HTMLElement>(0.25);
  const viewCollection = splitTrailingArrow("View the collection →");
  const seeAll = splitTrailingArrow(A.urn.cta);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, deg };
    setDragging(true);
    setHasDragged(true);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const next = start.current.deg + (e.clientX - start.current.x) / 6;
    setDeg(Math.max(-24, Math.min(24, next)));
  }
  function endDrag() {
    setDragging(false);
    setDeg(0); // settle back to rest
  }

  /** Very low-amplitude glow drift after the pointer (±14px, slow). */
  function onSectionPointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    el.style.transform = `translateX(${(ratio * 28).toFixed(1)}px)`;
  }

  return (
    <section
      ref={sectionRef}
      id="urns"
      aria-label="AETERNA urns"
      className="relative overflow-hidden"
      onPointerMove={onSectionPointerMove}
      style={{
        background:
          "radial-gradient(130% 110% at 50% 0%, #243029 0%, #131b16 62%, #0c120e 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 pb-[96px] pt-[80px] md:px-16">
        <div className="relative z-[2] flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal={revealAttr(inView)}>
            <MonoLabel className="mb-4 block !text-[11px] !tracking-[0.24em] text-gold">
              {A.urn.kicker}
            </MonoLabel>
            <h2
              className="font-display font-light leading-[1.04] text-[#F6F1E7]"
              style={{ fontSize: "clamp(36px, 5.2vw, 54px)" }}
            >
              {A.urn.headline}
            </h2>
          </div>
          <div
            data-reveal={revealAttr(inView)}
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="flex shrink-0 flex-col gap-3 self-start sm:flex-row sm:items-center sm:self-auto"
          >
            <a
              href="/urns"
              className="gt-label gt-press inline-flex items-center gap-[10px] rounded-[40px] border border-gold bg-gold px-6 py-[13px] !text-[11px] !tracking-[0.14em] text-ink hover:opacity-90"
            >
              {viewCollection.text}
              {viewCollection.arrow ? (
                <span aria-hidden className="gt-arrow inline-block">
                  →
                </span>
              ) : null}
            </a>
            <a
              href={mailtoHref("AETERNA urns enquiry")}
              onClick={() => track("email_click", { variant: "a", placement: "urns" })}
              className="gt-label gt-press inline-flex items-center gap-[10px] rounded-[40px] border border-[rgba(230,199,154,0.5)] px-6 py-[13px] !text-[11px] !tracking-[0.14em] text-gold-light hover:border-gold-light"
            >
              {seeAll.text}
              {seeAll.arrow ? (
                <span aria-hidden className="gt-arrow inline-block">
                  →
                </span>
              ) : null}
            </a>
          </div>
        </div>

        <div className="relative mt-[10px] flex h-[430px] items-center justify-center">
          {/* Pointer-follow wrapper; the drift animation lives on the child so
              the two transforms never fight. */}
          <div
            ref={glowRef}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[540px] w-[540px]"
            style={{
              marginLeft: -270,
              marginTop: -270,
              transition: "transform 1.4s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div
              data-motion
              className="h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(185,142,84,.4) 0%, rgba(185,142,84,.08) 40%, transparent 66%)",
                mixBlendMode: "screen",
                animation: "gtDrift2 18s ease-in-out infinite",
              }}
            />
          </div>
          <div
            aria-hidden
            data-motion
            className="absolute left-[32%] top-[6%] h-[280px] w-[3px]"
            style={{
              background:
                "linear-gradient(180deg,rgba(246,241,231,.55),transparent)",
              filter: "blur(3px)",
              transform: "rotate(14deg)",
              animation: "gtShimmer 9s ease-in-out infinite alternate",
            }}
          />
          <div
            role="img"
            aria-label="AETERNA urn — drag to turn it gently"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={
              // One quiet sway when first seen — unless the reader already
              // found the drag themselves.
              inView && !hasDragged ? "gt-sway-hint" : undefined
            }
            style={{
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "pan-y",
              transform: `rotate(${deg}deg)`,
              transition: dragging ? "none" : "transform 0.9s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <UrnSculpture turning={!dragging && deg === 0} />
          </div>
        </div>

        <div className="relative z-[2] flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-[16px]">
          <span
            className="gt-glass gt-label inline-flex items-center gap-[9px] rounded-[40px] border border-[rgba(230,199,154,0.4)] px-[22px] py-[11px] !text-[11px] !tracking-[0.14em] text-gold-light"
            style={{ background: "rgba(246,241,231,.08)", cursor: "grab" }}
          >
            {A.urn.drag}
          </span>
          <span className="font-display text-[16px] font-light italic text-[rgba(246,241,231,0.7)]">
            {A.urn.caption}
          </span>
        </div>
      </div>
    </section>
  );
}
