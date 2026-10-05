/**
 * Faith — live care-guide chat, UI copy (Variant A, /a2 preview).
 *
 * ALL copy here is queued for Jay's tone review (flip-tech-docs JAYS-QUEUE
 * 2026-07-09, K6 batch). The register is a product requirement: this audience
 * may be grieving. Server-side copy (Faith's replies, crisis/cap/gate
 * messages) lives in service/faith/persona.mjs.
 */

export const faith = {
  /** Section copy when the care-guide section runs the LIVE chat. */
  section: {
    kicker: "Care guide",
    headline: "Not ready to call? Ask Faith anything.",
    body: "Faith is our AI care guide — calm, patient, and clear that she's not a person. She'll answer your questions any hour, and hand you to a real coordinator the moment you want one.",
  },

  chat: {
    name: "Faith",
    status: "AI care guide · here now",
    avatar: "F",
    intro:
      "Hi, I'm Faith. I'm an AI care guide, here at any hour, and a real person is always one step away. Take whatever time you need. What can I help with?",
    placeholder: "Write to Faith…",
    send: "Send",
    presets: [
      "Someone has passed and I don't know where to start",
      "What does cremation cost?",
      "I'm planning ahead for myself",
      "Tell me about the AETERNA urns",
    ],
    /** Small print under the panel — consent + disclosure. */
    consent:
      "Faith is an AI. Conversations may be reviewed by our care team so a coordinator can follow up gently.",
    /** Inline contact form (appears on the gate, or via the quiet link). */
    contact: {
      lead: "So a real person can pick this up with you:",
      emailPlaceholder: "Email",
      phonePlaceholder: "Phone (optional)",
      submit: "Stay in touch",
      saved: "A coordinator will follow up gently.",
      invalid: "An email or a phone number — whichever you prefer.",
    },
    /** Quiet always-available line under the composer. */
    humanLine: "Prefer a person? Call (805) 555-0142 — day or night.",
    humanHref: "tel:+18055550142",
    /** Client-side failure surface (network, service down, unset endpoint). */
    error:
      "Faith lost the thread for a moment. Try again, or call (805) 555-0142 and a real person will pick it up.",
    /** Composer state after the conversation cap. */
    capped: "Faith has handed this to the care team",
  },
} as const;
