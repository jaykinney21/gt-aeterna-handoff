import type { Metadata } from "next";
import { VariantB } from "@/components/variant-b/VariantB";

export const metadata: Metadata = {
  title: "In the comfort of your home.",
  description:
    "Family-led cremation care, all-inclusive from $1,295. No mortuary visits, no surprises — handled from the comfort of your home. Buy online or talk to a real person.",
};

export default function Page() {
  return <VariantB />;
}
