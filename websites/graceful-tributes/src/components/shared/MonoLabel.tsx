import { cn } from "@/lib/utils";

/** Tracked, uppercase Spline Sans Mono kicker/label. Color via className.
 *  Extra span attributes (style, data-reveal, …) pass straight through. */
export function MonoLabel({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & {
  [key: `data-${string}`]: string | undefined;
}) {
  return (
    <span className={cn("gt-label", className)} {...rest}>
      {children}
    </span>
  );
}
