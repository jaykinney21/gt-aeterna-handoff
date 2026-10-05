/**
 * lib/pricing.ts — the ONE canonical price table.
 *
 * The checkout API builds Stripe line items from THIS table only; nothing
 * client-supplied ever sets an amount. Display copy elsewhere (variant-b
 * content, PricingA) mirrors these numbers — if a price changes, it changes
 * here first.
 *
 * Urn prices are PROVISIONAL pending Jay's word-for-word/price approval
 * (specs/2026-07-18-checkout-urns-copy.md) — anchored to the Full Care
 * package ($3,200 incl. urn vs $2,450 without → urn value ≈ $750+).
 */

export type PlanId = "direct" | "tribute" | "full";

export interface Plan {
  id: PlanId;
  name: string;
  desc: string;
  amountCents: number;
  from: boolean;
}

export const PLANS: Record<PlanId, Plan> = {
  direct: {
    id: "direct",
    name: "Direct Cremation",
    desc: "Coordination, transport, permits, cremation. Ashes returned home.",
    amountCents: 129_500,
    from: false,
  },
  tribute: {
    id: "tribute",
    name: "Cremation + Tribute",
    desc: "Everything above, plus a planned celebration-of-life gathering.",
    amountCents: 245_000,
    from: false,
  },
  full: {
    id: "full",
    name: "Full Care + AETERNA Urn",
    desc: "Full coordination, tribute, and a hand-made keepsake urn.",
    amountCents: 320_000,
    from: true,
  },
};

export interface UrnPalette {
  /** lid gradient */
  lid: string;
  /** neck gradient */
  neck: string;
  /** body radial */
  body: string;
  /** base gradient */
  base: string;
  /** floor glow color */
  glow: string;
  /** inset body shading (keeps the highlight/shadow balance per colorway) */
  bodyShadow: string;
}

export interface Urn {
  id: string;
  name: string;
  line: string;
  amountCents: number;
  palette: UrnPalette;
}

const goldShadow =
  "inset -32px -15px 66px rgba(0,0,0,.55), inset 24px 11px 52px rgba(246,241,231,.3)";

export const URNS: Urn[] = [
  {
    id: "the-return",
    name: "The Return",
    line: "The original — gilded, warm, the one the light finds first.",
    amountCents: 145_000,
    palette: {
      lid: "linear-gradient(100deg,#f0d6a8,#B98E54 55%,#6b5326)",
      neck: "linear-gradient(100deg,#caa873,#7a5e34)",
      body: "radial-gradient(58% 46% at 32% 28%, #f2dcb2 0%, #c79a5e 42%, #7a5a2e 78%, #4a3719 100%)",
      base: "linear-gradient(100deg,#caa873,#5e4622)",
      glow: "rgba(185,142,84,.4)",
      bodyShadow: goldShadow,
    },
  },
  {
    id: "morning-light",
    name: "Morning Light",
    line: "Porcelain white with a breath of dawn — quiet, luminous.",
    amountCents: 115_000,
    palette: {
      lid: "linear-gradient(100deg,#ffffff,#e9e2d4 55%,#b3aa88)",
      neck: "linear-gradient(100deg,#f2ede2,#c9c0ad)",
      body: "radial-gradient(58% 46% at 32% 28%, #ffffff 0%, #efe7d6 42%, #c7bba1 78%, #948a72 100%)",
      base: "linear-gradient(100deg,#e9e2d4,#a99e86)",
      glow: "rgba(233,226,212,.45)",
      bodyShadow:
        "inset -32px -15px 66px rgba(90,82,64,.4), inset 24px 11px 52px rgba(255,255,255,.55)",
    },
  },
  {
    id: "riverbed",
    name: "Riverbed",
    line: "Verdigris and moss — for a life lived close to the water.",
    amountCents: 125_000,
    palette: {
      lid: "linear-gradient(100deg,#a7c4ab,#5f8266 55%,#2e4a36)",
      neck: "linear-gradient(100deg,#8fb096,#43604c)",
      body: "radial-gradient(58% 46% at 32% 28%, #c4dcc6 0%, #7ba184 42%, #3d5c48 78%, #22392c 100%)",
      base: "linear-gradient(100deg,#8fb096,#31493a)",
      glow: "rgba(143,176,150,.4)",
      bodyShadow:
        "inset -32px -15px 66px rgba(10,25,16,.55), inset 24px 11px 52px rgba(228,240,229,.3)",
    },
  },
  {
    id: "nightfall",
    name: "Nightfall",
    line: "Deep indigo, near-black — steady as the evening sky.",
    amountCents: 125_000,
    palette: {
      lid: "linear-gradient(100deg,#5a6b95,#2c3a5e 55%,#141d33)",
      neck: "linear-gradient(100deg,#48587f,#1e2a47)",
      body: "radial-gradient(58% 46% at 32% 28%, #7c8db5 0%, #3c4c74 42%, #1c2845 78%, #0d1425 100%)",
      base: "linear-gradient(100deg,#48587f,#16203a)",
      glow: "rgba(90,107,149,.4)",
      bodyShadow:
        "inset -32px -15px 66px rgba(0,0,10,.6), inset 24px 11px 52px rgba(200,212,240,.25)",
    },
  },
  {
    id: "hearth",
    name: "Hearth",
    line: "Terracotta warmed through — the color of a kept home.",
    amountCents: 115_000,
    palette: {
      lid: "linear-gradient(100deg,#e0a184,#b0603f 55%,#6e3520)",
      neck: "linear-gradient(100deg,#cd8a6a,#8a4a2e)",
      body: "radial-gradient(58% 46% at 32% 28%, #ecb99d 0%, #c17851 42%, #7d4028 78%, #4a2415 100%)",
      base: "linear-gradient(100deg,#cd8a6a,#5e3018)",
      glow: "rgba(192,120,81,.4)",
      bodyShadow:
        "inset -32px -15px 66px rgba(30,8,2,.55), inset 24px 11px 52px rgba(250,230,215,.3)",
    },
  },
  {
    id: "quarry",
    name: "Quarry",
    line: "Cool slate with silver veining — plain-spoken, permanent.",
    amountCents: 105_000,
    palette: {
      lid: "linear-gradient(100deg,#aeb4bc,#6c757f 55%,#3a4149)",
      neck: "linear-gradient(100deg,#98a0a9,#525a63)",
      body: "radial-gradient(58% 46% at 32% 28%, #ccd2d9 0%, #848d97 42%, #49525b 78%, #292f36 100%)",
      base: "linear-gradient(100deg,#98a0a9,#3a4149)",
      glow: "rgba(150,158,167,.38)",
      bodyShadow:
        "inset -32px -15px 66px rgba(5,8,12,.55), inset 24px 11px 52px rgba(230,236,242,.3)",
    },
  },
];

export function urnById(id: string | null | undefined): Urn | null {
  if (!id) return null;
  return URNS.find((u) => u.id === id) ?? null;
}

export function planById(id: string | null | undefined): Plan | null {
  if (!id) return null;
  return (Object.values(PLANS) as Plan[]).find((p) => p.id === id) ?? null;
}

export function formatUsd(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US")}`;
}
