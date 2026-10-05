import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a CTA label's trailing "→" off so the arrow can live in its own
 * `.gt-arrow` span (hover-nudge) without changing the reviewed copy string.
 */
export function splitTrailingArrow(label: string): {
  text: string;
  arrow: boolean;
} {
  if (label.endsWith("→")) {
    return { text: label.slice(0, -1).trimEnd(), arrow: true };
  }
  return { text: label, arrow: false };
}
