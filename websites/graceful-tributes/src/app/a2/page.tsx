import type { Metadata } from "next";
import { VariantA } from "@/components/variant-a/VariantA";

/**
 * /a2 — Variant A with Faith LIVE (the ported Porter chat surface speaking
 * GT copy). A preview page for review, not a test arm: noindexed so it never
 * contaminates the /a vs /b comparison.
 */
export const metadata: Metadata = {
  title: "Embrace the moment. (Faith preview)",
  description:
    "Calm, capable people to carry cremation, tribute, and remembrance — so your family can simply be together. Book a 15-minute call, day or night.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VariantA faithLive />;
}
