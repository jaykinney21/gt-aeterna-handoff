import { MonoLabel } from "@/components/shared/MonoLabel";
import { VariantA } from "@/components/variant-a/VariantA";
import { VariantB } from "@/components/variant-b/VariantB";

/**
 * Root entry. The per-port dev servers (`npm run dev:a` / `dev:b`) set
 * NEXT_PUBLIC_VARIANT, so `/` IS that variant — each port is its own site.
 * Unset (the default + the static export) renders the chooser.
 */
export default function Home() {
  const v = process.env.NEXT_PUBLIC_VARIANT;
  if (v === "a") return <VariantA />;
  if (v === "b") return <VariantB />;
  return <Chooser />;
}

/**
 * Chooser — flip between the two hypotheses. Each card links to a standalone,
 * separately-shareable variant site.
 */
function Chooser() {
  const cards = [
    {
      href: "/a",
      tag: "Variant A · Jay",
      title: "Embrace the moment.",
      blurb:
        "Premium and cinematic. Book-a-call scheduler, light/dark, liquid glass, and the AETERNA urn turning in the light.",
      bullets: ["Book a 15-min call", "Light / dark theme", "Faith AI care guide"],
      gradient: "linear-gradient(165deg,#26352c 0%,#3b5147 46%,#6E8C96 132%)",
      cta: "Enter Variant A →",
    },
    {
      href: "/b",
      tag: "Variant B · Mom",
      title: "In the comfort of your home.",
      blurb:
        "Warm and direct. Transparent pricing with buy-now, an FAQ, and live chat — everything handled from home.",
      bullets: ["Plans from $1,295", "Buy online today", "Live chat with a person"],
      gradient: "linear-gradient(160deg,#8FA08E 0%,#6E8C96 58%,#2E3D33 130%)",
      cta: "Enter Variant B →",
    },
  ];

  return (
    <main className="min-h-screen bg-paper px-6 py-16 md:px-12 md:py-20">
      <header className="mx-auto mb-12 max-w-6xl md:mb-16">
        <MonoLabel className="text-gold">Graceful Tributes · A/B</MonoLabel>
        <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.01em] text-ink">
          Two hypotheses, two sites.
        </h1>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink/65">
          The same family-led care, framed two ways. Open either to test it on its own — or
          flip between them with the switcher in the corner.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-transform duration-300 hover:-translate-y-1.5"
            style={{ boxShadow: "0 30px 70px -34px rgba(46,61,51,.5)" }}
          >
            <div className="relative h-44 overflow-hidden md:h-52" style={{ background: c.gradient }}>
              <div
                data-motion
                className="absolute inset-[-25%]"
                style={{
                  background:
                    "radial-gradient(42% 48% at 32% 30%, rgba(246,241,231,.30), transparent 62%)",
                  mixBlendMode: "screen",
                  animation: "gtDrift 19s ease-in-out infinite",
                }}
              />
              <span className="absolute bottom-4 left-5 font-display text-[19px] italic text-paper/85">
                What flows, returns.
              </span>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <MonoLabel className="text-gold">{c.tag}</MonoLabel>
              <h2 className="mt-4 font-display text-[32px] font-light leading-[1.05] tracking-[-0.01em] text-ink">
                {c.title}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{c.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="gt-label rounded-full border border-ink/15 px-3 py-1.5 text-ink/55"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <span className="gt-label mt-8 inline-flex items-center gap-2 text-ink transition-all group-hover:gap-3">
                {c.cta}
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
