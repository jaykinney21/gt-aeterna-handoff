import type { Metadata } from "next";
import { VariantA } from "@/components/variant-a/VariantA";

export const metadata: Metadata = {
  title: "Embrace the moment.",
  description:
    "Calm, capable people to carry cremation, tribute, and remembrance — so your family can simply be together. Book a 15-minute call, day or night.",
};

export default function Page() {
  // Faith is live on the A family (Jay, 2026-07-17): visitors type, she
  // answers — scripted service until her model key lands, crisis path
  // unchanged. Never on /b, which promises "a real person, not a bot".
  return <VariantA faithLive />;
}
