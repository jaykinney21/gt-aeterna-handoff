/**
 * Variant A — "Jay": book-a-call · light/dark · liquid glass · the urn.
 * Copy transcribed verbatim from the Claude Design canvas (Graceful Tributes.dc.html).
 */

export const phone = "(805) 555‑0142";
export const phoneHref = "tel:+18055550142";
export const email = "hello@gracefultributes.com";
export const emailHref = "mailto:hello@gracefultributes.com";

export const urgencyBar =
  "Recently bereaved? We can arrange a respectful pickup within hours — call (805) 555‑0142, day or night.";

export const nav = {
  brand: "Graceful Tributes",
  links: ["Services", "Our Story", "Urns", "Contact"],
  portal: "Client portal",
  cta: "Book a call →",
};

export const hero = {
  eyebrows: ["Family-Led", "35 Years", "California"],
  headline: "Embrace the moment.",
  sub: "Calm, capable people to carry cremation, tribute, and remembrance — so your family can simply be together.",
  ctaPrimary: "Book a 15-min call",
  ctaSecondary: "Talk to us",
  filmKicker: "Film 01",
  filmTitle: "The Return",
  tag: "What flows, returns.",
};

export const scheduler = {
  kicker: "Book a call · no cost, no obligation",
  headline: "Talk to a real person, today.",
  body: "Pick a time that works. Fifteen quiet minutes — we'll answer your questions and, if you need us now, arrange same-day pickup before the call even ends.",
  // Honest presence line — never a fabricated availability count.
  availability: "Day or night, a real person answers.",
  dayLabel: "Choose a day",
  timeLabel: "Preferred time",
  slots: ["9:00", "10:30", "1:00", "3:30", "5:00"],
  contactLabel: "Where should we confirm it?",
  contactPlaceholder: "Your email",
  states: {
    idle: "Select a time",
    needsContact: "Add your email to request this time",
    ready: "Request this call",
    sending: "One moment…",
    requested: "Request received — a coordinator will confirm your time shortly.",
    error: "That didn't go through. You can try again, or simply call us.",
    pending:
      "Scheduling isn't connected yet. Call (805) 555-0142 and a real person will set the time with you.",
  },
  reassurance: "A real person, never a form.",
  chosenTemplate: "{day} {date} at {time} — held for you while you finish.",
};

export const services = {
  kicker: "How we help",
  headline: "We carry the parts that feel impossible to carry alone.",
  cards: [
    {
      no: "01",
      title: "Cremation Coordination",
      body: "Pickup, permits, and the cremation itself — with the licensed provider you choose. No upsells, no rush.",
      dark: false,
    },
    {
      no: "02",
      title: "Celebration-of-Life Tributes",
      body: "A gathering shaped around the person — words, music, place. We hold the logistics so you can hold each other.",
      dark: false,
    },
    {
      no: "03",
      title: "Custom Urns & Keepsakes",
      body: "Vessels made as art, by hand. A place for what remains that you'll be glad to keep in the light of your home.",
      dark: true,
      tag: "AETERNA",
    },
  ],
};

export const urn = {
  kicker: "The urn as art · AETERNA",
  headline: "Turn it in the light.",
  cta: "See all urns →",
  drag: "⟲ Drag to turn",
  caption: "lit by the same light that moved on the water.",
};

export const testimonialsBlock = {
  kicker: "Voices of families",
  items: [
    {
      q: "“They handled everything I couldn’t even think about. I never once felt like a transaction — only like someone’s daughter being looked after.”",
      n: "Diane M.",
      r: "For her mother",
      i: "DM",
    },
    {
      q: "“Every call was patient. The urn they made for my husband sits where the morning light reaches it, and it still takes my breath.”",
      n: "Rosa T.",
      r: "For her husband",
      i: "RT",
    },
    {
      q: "“Clear costs, no pressure, real people. They made an unbearable week feel survivable, and never once rushed me.”",
      n: "James K.",
      r: "For his father",
      i: "JK",
    },
  ],
};

export const process = {
  kicker: "The process",
  headline: "A calm, guided process.",
  intro:
    "No part of this should be a mystery. Here is exactly what happens — every step held by a real person.",
  steps: [
    { no: "01", title: "Reach out & talk", body: "A call or message. We listen first." },
    { no: "02", title: "Pickup & permits", body: "Transport & every document." },
    { no: "03", title: "Cremation, your provider", body: "Licensed and transparent." },
    { no: "04", title: "Tribute & keepsake", body: "A gathering and a vessel." },
    { no: "05", title: "Remembrance", body: "We stay reachable, long after." },
  ],
};

// The care guide is Faith — one name across the site, the /a2 live chat, and
// the workspace. (Renamed from the placeholder "Aria", 2026-07-17; strings
// queued for Jay's word-for-word review in specs/2026-07-17-copy-review-queue.md.)
export const aria = {
  kicker: "Care guide",
  headline: "Not ready to call? Ask Faith anything.",
  body: "Faith is our AI care guide — calm, patient, and clear that she's not a person. She'll answer your questions any hour, and hand you to a real coordinator the moment you want one.",
  chat: {
    name: "Faith",
    status: "AI care guide · here now",
    avatar: "F",
    messages: [
      { from: "them", text: "Hello — I'm Faith. I'm an AI, here to help gently. Has someone passed, or are you planning ahead?" },
      { from: "me", text: "My father passed last night. I don't know where to start." },
      { from: "them", text: "I'm so sorry. You don't have to figure it out alone. I can arrange a pickup right now, or connect you to a coordinator in under a minute. Which feels easier?" },
    ] as { from: "them" | "me"; text: string }[],
    placeholder: "Type a message…",
    action: "Talk to a person",
  },
};

export const footer = {
  headline: "Reach out.",
  body: "Whenever you're ready — today, or while you plan ahead. A real person answers.",
  cta: "Book a 15-min call →",
  bottom: ["© Graceful Tributes · AETERNA", "Family-led · California", "What flows, returns."],
};

// ── 2026-07-17 wave additions (all copy queued for Jay's word-for-word review
//    in specs/2026-07-17-copy-review-queue.md) ─────────────────────────────────

/** Slow scrolling reassurance strip under the hero. Only facts already on the
 *  site — no invented badges, no logos we don't have. */
export const trustStrip = {
  ariaLabel: "What families can count on",
  items: [
    "Family-led, always",
    "35 years beside families",
    "California, statewide",
    "All-inclusive pricing, in writing",
    "A real person, day or night",
    "Everything from your home",
    "Licensed providers only",
  ],
};

/** Problem → promise. The founder's story, told once, plainly. */
export const promiseBlock = {
  kicker: "Why we exist",
  problemHeadline: "The hardest week shouldn't come with a sales process.",
  problemBody:
    "When someone dies, the phone calls start — and too often, so do the upsells. Unfamiliar fees, rushed decisions, showrooms when you'd rather be with your family.",
  solutionHeadline: "So we built the calm alternative.",
  solutionBody:
    "After thirty-five years beside grieving families, our founder watched the prices climb out of reach — and built the thing he always wished existed. One coordinator, known by name. One written price. Everything handled from your home.",
  cta: "See how we help",
};

/** Variant "A with pricing" — A's room, B's transparency. Packages mirror
 *  variant-b's pricing verbatim; only the framing copy is new. */
export const pricingA = {
  kicker: "Pricing · plainly",
  headline: "The price you see is the price you pay.",
  intro:
    "Three plans, all-inclusive, in writing. If you'd rather talk it through first, the call below is fifteen quiet minutes — no cost, no obligation.",
  note: "Every plan: everything handled from your home, a dedicated coordinator by name, no hidden fees.",
  cta: "Begin this arrangement",
};

/** Free guide + email delivery (Resend). Guide content itself is PENDING —
 *  the section renders honestly until the guide and the key exist. */
export const reportBlock = {
  kicker: "A quiet guide",
  headline: "The questions families wish they'd asked.",
  body: "A short, plain-language guide to arranging a cremation without pressure — what things cost, what's legally required, and what can wait. Yours free, by email.",
  emailLabel: "Your email",
  emailPlaceholder: "you@example.com",
  submit: "Send me the guide",
  pendingNote:
    "The guide is being finished. Leave your email and we'll send it the day it's ready — or call us and we'll walk you through the same questions today.",
  successNote: "It's on its way. Take your time with it.",
  errorNote: "That didn't go through. You can try again, or simply call us.",
};
