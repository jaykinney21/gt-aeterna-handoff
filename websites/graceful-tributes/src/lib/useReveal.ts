"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared scroll-reveal hook — the one seam behind every `data-reveal` on the
 * site. Attach `ref` to the section (or any ancestor of the revealed nodes)
 * and spread `data-reveal={inView ? "in" : ""}` + an optional
 * `--reveal-delay` on each child that should rise.
 *
 * The CSS lives in globals.css: elements start hidden ONLY when motion is
 * allowed (prefers-reduced-motion: no-preference), so reduced-motion visitors
 * and no-CSS crawlers always see content. Fires once, then disconnects —
 * a reveal is a settling-in, never a repeat performance.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.18,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** `data-reveal` attribute value for the current state. */
export function revealAttr(inView: boolean): string {
  return inView ? "in" : "";
}
