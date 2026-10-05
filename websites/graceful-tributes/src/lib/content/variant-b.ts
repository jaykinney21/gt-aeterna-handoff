/**
 * Variant B — "Mom": comfort-of-home · spinning words · buy-now & FAQ · live chat.
 * Copy transcribed verbatim from the Claude Design canvas (Graceful Tributes.dc.html).
 */

export const phone = "(805) 555‑0142";
export const phoneHref = "tel:+18055550142";
export const email = "hello@gracefultributes.com";
export const emailHref = "mailto:hello@gracefultributes.com";

export const nav = {
  brand: "Graceful Tributes",
  links: ["Services", "Pricing", "Urns", "FAQ", "Contact"],
  secondary: "Get info",
  portal: "Client portal",
  cta: "Buy now →",
};

export const hero = {
  eyebrow: "Family-led · 35 years · everything from home",
  headline: "In the comfort of your home.",
  spinPrefix: "Cared for with",
  spinWords: ["dignity.", "patience.", "honesty.", "no pressure."],
  sub: "No mortuary visits. No pressure. No surprises. We handle cremation, the paperwork, and a keepsake — all without you ever leaving home.",
  ctaPrimary: "See pricing ↓",
  ctaSecondary: "Get information",
  liveChat: "● Live chat",
  imageTag: "What flows, returns.",
};

export const audience = {
  kicker: "Why are you here today?",
  cards: [
    {
      id: "death",
      title: "Someone has passed",
      body: "We'll take it from here, gently — pickup within hours, everything handled from home.",
      cta: "Get help now →",
      dark: false,
    },
    {
      id: "art",
      title: "I'm drawn to the art",
      body: "Explore AETERNA keepsake urns — vessels made by hand, kept in the light of your home.",
      cta: "See the urns →",
      dark: true,
    },
  ],
};

export const founder = {
  kicker: "Why I built this",
  before:
    "After thirty-five years beside grieving families, I watched the prices climb out of reach. So I built the thing I always wished existed — ",
  emphasis: "honest, calm, and done from home.",
  name: "Grace Tribute",
  role: "Founder · 35 years in the field",
  portraitTag: "Portrait — the founder",
};

export const pricing = {
  kicker: "Pricing · no surprises",
  kickerRight: "All-inclusive · buy online today",
  headline: "Choose a plan, and you're done.",
  packages: [
    {
      name: "Direct Cremation",
      desc: "Coordination, transport, permits, cremation. Ashes returned home.",
      price: "1,295",
      from: false,
    },
    {
      name: "Cremation + Tribute",
      desc: "Everything above, plus a planned celebration-of-life gathering.",
      price: "2,450",
      from: false,
    },
    {
      name: "Full Care + AETERNA Urn",
      desc: "Full coordination, tribute, and a hand-made keepsake urn.",
      price: "3,200",
      from: true,
    },
  ],
  defaultPkg: 1,
  summary: {
    label: "Your selection",
    checks: [
      "Everything done from your home",
      "A dedicated coordinator, by name",
      "No hidden fees, ever",
    ],
    cta: "Buy now →",
    secondary: "or request a call back",
    secure: "🔒 Secure checkout · cancel anytime before service",
  },
  comparison: {
    includedTitle: "Always included with us",
    included: [
      "Transport & care of your loved one",
      "All permits & certified documents",
      "Insurance & pre-need filing, no charge",
      "No commission — we never upsell",
    ],
    elsewhereTitle: "Often billed separately elsewhere",
    elsewhere: [
      "“Basic services fee” — often $2,000+",
      "Refrigeration & storage, per day",
      "Document & permit “handling” fees",
      "Mandatory urn & container markups",
    ],
  },
};

export const faq = {
  kicker: "Most-asked questions",
  headline: "The questions families ask first.",
  subBefore: "Still unsure? ",
  subLink: "Start a live chat",
  subAfter: " — a real person, not a bot.",
  defaultOpen: 0,
  items: [
    {
      q: "Can I use insurance or a pre-need plan?",
      a: "Yes. Most life insurance and pre-need funeral plans apply directly, and we file the paperwork for you at no extra charge. If you're not sure what you have, we'll help you find out.",
    },
    {
      q: "Do I have to go to a mortuary or cemetery?",
      a: "No. Arrangements, paperwork, and decisions are all done from the comfort of your home — by phone, online, or with us coming to you. You never have to set foot in a funeral home unless you wish to.",
    },
    {
      q: "How quickly can you help right now?",
      a: "We can arrange a respectful pickup within hours, day or night. Call (805) 555‑0142 and a real person answers — no phone tree, no waiting.",
    },
    {
      q: "What does it really cost?",
      a: "Plain packages from $1,295, all-inclusive. No hidden “service fees,” no commission. The price you see is the price you pay, in writing, up front.",
    },
  ],
};

export const urn = {
  kicker: "AETERNA keepsakes",
  headline: "A piece worth keeping.",
  ctaPrimary: "Buy this urn →",
  ctaSecondary: "See all urns",
  caption: "⟲ turns slowly in the light",
};

export const liveChat = {
  kicker: "Live chat",
  headline: "Talk to a real person, right now.",
  body: "No bots, no hold music. A member of our family-led team is here to answer gently — and if you'd rather, just leave your name and we'll call you back.",
  ctaPrimary: "Start live chat",
  ctaSecondary: "Request a call back",
  chat: {
    name: "Maria, care team",
    status: "Real person · online now",
    avatar: "GT",
    messages: [
      { from: "them", text: "Hi, I'm Maria. Take your time — I'm right here. Are you looking for help today, or just gathering information?" },
      { from: "me", text: "Can everything really be done from home?" },
      { from: "them", text: "It truly can. You won't need to visit a mortuary or cemetery — we handle it all and keep you company through every step. 💛" },
    ] as { from: "them" | "me"; text: string }[],
    placeholder: "Type a message…",
    action: "Send",
  },
};

export const footer = {
  headline: "Reach out.",
  body: "Buy online in minutes, or leave your name and we'll call you back. Either way, everything is done from the comfort of your home.",
  ctaPrimary: "Buy now →",
  ctaSecondary: "Request a call back",
  accreditation: "Licensed & accredited · CANA · NFDA · BBB A+",
  bottom: ["© Graceful Tributes · AETERNA", "Family-led · California", "What flows, returns."],
};
