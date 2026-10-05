import { trustStrip } from "@/lib/content/variant-a";

/**
 * Slow scrolling reassurance strip under the hero — the fliptechpro
 * "trusted by" pattern in GT's register: no logos, only the promises the
 * site already makes, drifting past at a reading pace. The row is duplicated
 * for a seamless loop; [data-motion] stills it under reduced motion.
 */
export function TrustStrip() {
  const row = trustStrip.items;
  return (
    <section
      aria-label={trustStrip.ariaLabel}
      className="overflow-hidden border-y border-[var(--va-line)] bg-[var(--va-surface)] transition-colors duration-[550ms]"
    >
      <div
        data-motion
        className="flex w-max items-center gap-[56px] py-[18px]"
        style={{ animation: "gtMarquee 46s linear infinite" }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-[56px]"
          >
            {row.map((item) => (
              <li
                key={item}
                className="gt-label flex items-center gap-[14px] whitespace-nowrap !text-[11px] !tracking-[0.18em] text-[var(--va-muted)]"
              >
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] rounded-full bg-[var(--va-gold)]"
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
