import type { Metadata } from "next";
import { VariantA } from "@/components/variant-a/VariantA";

/**
 * Variant "A with pricing" — the second arm of the root-URL split
 * (src/middleware.ts): Variant A plus transparent pricing on the same page
 * as booking, for the visitor who wants the number before the call.
 */
export const metadata: Metadata = {
  title: "Embrace the moment.",
  description:
    "Calm, capable people to carry cremation, tribute, and remembrance — with plain, all-inclusive pricing. Book a 15-minute call, day or night.",
};

export default function Page() {
  // Faith live here too — same footing as /a (see a/page.tsx).
  return <VariantA pricing faithLive />;
}
