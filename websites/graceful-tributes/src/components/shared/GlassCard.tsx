import { cn } from "@/lib/utils";

/**
 * Liquid-glass surface (Variant A). Uses the themeable --va-glass / --va-glassbrd
 * custom properties, so it adapts to light/dark. Pass extra classes/style to tune
 * radius, padding, shadow per usage.
 */
export function GlassCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "gt-glass border bg-[var(--va-glass)] border-[var(--va-glassbrd)]",
        className,
      )}
      style={{
        boxShadow:
          "0 26px 60px -24px rgba(46,61,51,.5), inset 0 1px 0 rgba(255,255,255,.6)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
