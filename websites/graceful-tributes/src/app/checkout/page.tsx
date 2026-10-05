import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { planById, urnById } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Your arrangement",
  description:
    "A few details and we take it from here. Plain, all-inclusive pricing; nothing is binding until you say so.",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; urn?: string }>;
}) {
  const params = await searchParams;
  const plan = planById(params.plan);
  const urn = urnById(params.urn);
  return <CheckoutClient plan={plan} urn={urn} />;
}
