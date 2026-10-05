"use client";

import { CONTACT } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import * as A from "@/lib/content/variant-a";

/** Full-width gold urgency strip with a pulsing dark dot. */
export function UrgencyBar() {
  const [before, after] = A.urgencyBar.split(A.phone);
  return (
    <div className="bg-[var(--va-gold)] text-ink-deep">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-[14px] px-6 py-[11px] text-center md:px-16">
        <span
          aria-hidden
          data-motion
          className="hidden h-[7px] w-[7px] shrink-0 rounded-full bg-ink-deep sm:block"
          style={{ animation: "gtPulse 2s ease-in-out infinite" }}
        />
        <span className="font-mono text-[11.5px] tracking-[0.06em]">
          {before}
          <a
            href={CONTACT.phoneHref}
            className="underline"
            onClick={() => track("call_click", { variant: "a", placement: "urgency-bar" })}
          >
            {A.phone}
          </a>
          {after}
        </span>
      </div>
    </div>
  );
}
