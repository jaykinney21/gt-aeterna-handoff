import { cn } from "@/lib/utils";

/**
 * Floating A/B switcher pill — lets you (and test stakeholders) flip between the
 * two hypotheses, and back to the chooser. Each variant is its own shareable
 * site; this is the dev/review affordance to compare them. Hidden on phones so
 * it never covers mobile CTAs (the sticky buy bar, footer buttons).
 */
export function VariantSwitcher({ current }: { current: "a" | "ap" | "b" }) {
  const seg = (active: boolean) =>
    cn(
      "gt-label rounded-full px-4 py-2 !tracking-[0.12em] transition-colors",
      active ? "bg-gold text-ink-deep" : "text-paper/70 hover:text-paper",
    );

  return (
    <nav
      aria-label="Variant switcher"
      className="fixed bottom-6 left-1/2 z-[80] hidden -translate-x-1/2 items-center gap-1 rounded-full border border-paper/15 bg-ink/90 p-1.5 backdrop-blur-md sm:flex"
      style={{ boxShadow: "0 18px 40px -16px rgba(0,0,0,.6)" }}
    >
      <a href="/a" className={seg(current === "a")} aria-current={current === "a" ? "page" : undefined}>
        A · Jay
      </a>
      <a href="/ap" className={seg(current === "ap")} aria-current={current === "ap" ? "page" : undefined}>
        A · Pricing
      </a>
      <a href="/b" className={seg(current === "b")} aria-current={current === "b" ? "page" : undefined}>
        B · Mom
      </a>
      <span aria-hidden className="mx-0.5 h-3 w-px bg-paper/20" />
      <a href="/" className="gt-label rounded-full px-3 py-2 !tracking-[0.12em] text-paper/55 hover:text-paper">
        ↔
      </a>
    </nav>
  );
}
