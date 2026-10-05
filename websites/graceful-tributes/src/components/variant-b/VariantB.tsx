"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { UrnSculpture } from "@/components/shared/UrnSculpture";
import { ChatPanel } from "@/components/shared/ChatPanel";
import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { LeadForm } from "@/components/shared/LeadForm";
import { INTEGRATIONS, buyHref, mailtoHref, portalHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import {
  nav,
  hero,
  audience,
  founder,
  pricing,
  faq,
  urn,
  liveChat,
  footer,
  email,
  emailHref,
  phone,
  phoneHref,
} from "@/lib/content/variant-b";

const WRAP = "mx-auto max-w-[1280px] px-6 md:px-16";
const SPIN_INTERVAL = 2300;

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-ink/[0.12]">
      <div className={cn(WRAP, "flex items-center justify-between gap-4 py-[18px] md:py-[22px]")}>
        <a
          href="#top"
          className="font-mono text-[12px] uppercase tracking-[0.24em] text-ink"
        >
          {nav.brand}
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-[30px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/[0.66] lg:flex"
        >
          {nav.links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="transition-colors hover:text-ink">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-ink/[0.66] transition-colors hover:text-ink sm:inline"
          >
            {nav.secondary}
          </a>
          <a
            href={portalHref()}
            onClick={() => track("portal_click", { variant: "b", placement: "nav" })}
            className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-ink/[0.66] transition-colors hover:text-ink sm:inline"
          >
            {nav.portal}
          </a>
          <a
            href="#pricing"
            onClick={() => track("buy_click", { variant: "b", placement: "nav" })}
            className="hidden items-center gap-2 rounded-[30px] bg-gold px-5 py-[10px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-deep sm:inline-flex"
          >
            {nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="vb-mobile-menu"
            className="inline-flex items-center gap-2 rounded-[30px] border border-ink/[0.16] px-[14px] py-[9px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink/[0.66] transition-colors hover:text-ink lg:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="vb-mobile-menu"
          aria-label="Primary, mobile"
          className="border-t border-ink/[0.1] px-6 pb-5 pt-2 lg:hidden"
        >
          {nav.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/[0.1] py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/[0.6]"
          >
            {nav.secondary}
          </a>
          <a
            href={portalHref()}
            onClick={() => {
              setOpen(false);
              track("portal_click", { variant: "b", placement: "mobile-nav" });
            }}
            className="block py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/[0.6]"
          >
            {nav.portal}
          </a>
          <a
            href="#pricing"
            onClick={() => {
              setOpen(false);
              track("buy_click", { variant: "b", placement: "mobile-menu" });
            }}
            className="mt-2 flex items-center justify-center gap-2 rounded-[30px] bg-gold px-5 py-[13px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-deep"
          >
            {nav.cta}
          </a>
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    // The word rotation is motion too — hold on the first word for
    // prefers-reduced-motion users instead of swapping under them.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setSpin((s) => (s + 1) % hero.spinWords.length),
      SPIN_INTERVAL,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className={cn(WRAP, "grid grid-cols-1 items-center gap-12 pb-16 pt-[72px] md:grid-cols-[1.05fr_0.95fr]")}>
      <div>
        <MonoLabel className="mb-[22px] block text-sage">{hero.eyebrow}</MonoLabel>
        <h1
          className="font-display font-light leading-[1.02] tracking-[-0.015em]"
          style={{ fontSize: "clamp(44px, 7vw, 74px)" }}
        >
          {hero.headline}
        </h1>
        <p className="mt-[18px] font-display text-[30px] font-light text-ink/[0.85]">
          {hero.spinPrefix}{" "}
          <span
            key={spin}
            data-motion
            className="inline-block italic text-gold"
            style={{ animation: "gtWordIn .7s cubic-bezier(.2,.7,.2,1) both" }}
          >
            {hero.spinWords[spin]}
          </span>
        </p>
        <p className="mt-6 max-w-[460px] text-[16px] leading-[1.7] text-ink/[0.72]">
          {hero.sub}
        </p>
        <div className="mt-[34px] flex flex-wrap items-center gap-[14px]">
          <a
            href="#pricing"
            className="inline-flex items-center gap-[10px] rounded-[40px] bg-gold px-7 py-[15px] font-mono text-[12px] uppercase tracking-[0.14em] text-ink-deep"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-[10px] rounded-[40px] border border-ink/30 px-[26px] py-[15px] font-mono text-[12px] uppercase tracking-[0.14em] text-ink"
          >
            {hero.ctaSecondary}
          </a>
          <a
            href={INTEGRATIONS.chatUrl || "#contact"}
            {...(INTEGRATIONS.chatUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() => track("chat_open", { variant: "b", placement: "hero" })}
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-sage"
          >
            {hero.liveChat}
          </a>
        </div>
      </div>
      <div
        className="relative h-[300px] overflow-hidden rounded-[18px] md:h-[440px]"
        style={{
          background: "linear-gradient(160deg,#8FA08E 0%,#6E8C96 58%,#2E3D33 130%)",
          boxShadow: "0 30px 70px -28px rgba(46,61,51,.6)",
        }}
      >
        <div
          data-motion
          className="absolute inset-[-20%]"
          style={{
            background:
              "radial-gradient(40% 44% at 38% 32%, rgba(246,241,231,.34), transparent 60%)",
            mixBlendMode: "screen",
            animation: "gtDrift 21s ease-in-out infinite",
          }}
        />
        <div
          data-motion
          className="absolute bottom-[14%] left-[-10%] right-[-10%] h-[120px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(246,241,231,.2),transparent)",
            filter: "blur(10px)",
            animation: "gtShimmer 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 60%, transparent 45%, rgba(28,38,32,.5))",
          }}
        />
        <div className="absolute bottom-6 left-[26px] font-display text-[18px] font-light italic text-[rgba(246,241,231,.82)]">
          {hero.imageTag}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Audience split                                                      */
/* ------------------------------------------------------------------ */

function Audience() {
  // The design's two cards are clickable paths (no selected state) — route each
  // to the relevant section rather than holding dead local state.
  const target: Record<string, string> = { death: "#pricing", art: "#urns" };

  return (
    <section id="services" className={cn(WRAP, "pb-[88px] pt-5")}>
      <MonoLabel className="mb-[22px] block text-ink/50">{audience.kicker}</MonoLabel>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {audience.cards.map((card) => (
          <a
            key={card.id}
            href={target[card.id] ?? "#contact"}
            className={cn(
              "flex flex-col items-start gap-4 rounded-[12px] px-7 py-7 text-left transition-transform duration-300 hover:-translate-y-[5px] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-9 sm:py-[34px]",
              card.dark
                ? "bg-ink text-paper"
                : "border border-ink/[0.12] bg-white",
            )}
            style={{
              boxShadow: card.dark
                ? "0 18px 44px -20px rgba(20,28,23,.6)"
                : "0 18px 44px -22px rgba(46,61,51,.4)",
            }}
          >
            <span className="block">
              <span className="block font-display text-[26px]">{card.title}</span>
              <span
                className={cn(
                  "mt-2 block max-w-[330px] text-[14px] leading-[1.55]",
                  card.dark ? "text-paper/[0.72]" : "text-ink/[0.66]",
                )}
              >
                {card.body}
              </span>
            </span>
            <span
              className={cn(
                "whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em]",
                card.dark ? "text-gold-light" : "text-gold",
              )}
            >
              {card.cta}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Founder story                                                       */
/* ------------------------------------------------------------------ */

function Founder() {
  return (
    <section className="border-y border-ink/[0.1] bg-surface py-24">
      <div className={cn(WRAP, "grid grid-cols-1 items-center gap-14 md:grid-cols-[1.4fr_0.85fr]")}>
        <div>
          <MonoLabel className="mb-[22px] block text-gold">{founder.kicker}</MonoLabel>
          <p
            className="font-display font-light leading-[1.2] tracking-[-0.005em]"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            {founder.before}
            <span className="italic text-gold">{founder.emphasis}</span>
          </p>
          <div className="mt-[30px] flex flex-wrap items-center gap-4">
            <span className="font-display text-[26px] italic text-ink">{founder.name}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/[0.55]">
              {founder.role}
            </span>
          </div>
        </div>
        <div
          aria-hidden
          className="relative h-[360px] overflow-hidden rounded-[14px]"
          style={{
            background: "linear-gradient(150deg,#C9BBA8,#8FA08E 130%)",
            boxShadow: "0 24px 56px -26px rgba(46,61,51,.5)",
          }}
        >
          <div
            data-motion
            className="absolute inset-[-20%]"
            style={{
              background:
                "radial-gradient(45% 50% at 60% 40%, rgba(246,241,231,.35), transparent 60%)",
              mixBlendMode: "screen",
              animation: "gtDrift2 20s ease-in-out infinite",
            }}
          />
          <div className="absolute bottom-5 left-[22px] font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,241,231,.8)]">
            {founder.portraitTag}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

function Pricing() {
  const [pkg, setPkg] = useState(pricing.defaultPkg);
  const selected = pricing.packages[pkg];

  return (
    <section id="pricing" className={cn(WRAP, "pb-[90px] pt-[104px]")}>
      <div className="mb-[14px] flex items-end justify-between gap-4">
        <MonoLabel className="text-gold">{pricing.kicker}</MonoLabel>
        <MonoLabel className="hidden !tracking-[0.12em] text-ink/50 sm:inline">
          {pricing.kickerRight}
        </MonoLabel>
      </div>
      <h2
        className="max-w-[740px] font-display font-light leading-[1.03] tracking-[-0.015em]"
        style={{ fontSize: "clamp(34px, 5vw, 52px)" }}
      >
        {pricing.headline}
      </h2>

      <div className="mt-[54px] grid grid-cols-1 items-start gap-8 md:grid-cols-[1.1fr_0.9fr]">
        {/* Package rows */}
        <div className="flex flex-col gap-4">
          {pricing.packages.map((p, i) => {
            const active = pkg === i;
            return (
              <button
                key={p.name}
                type="button"
                aria-pressed={active}
                onClick={() => setPkg(i)}
                className={cn(
                  "flex items-center gap-5 rounded-[12px] border-[1.5px] p-7 text-left transition-all duration-[250ms]",
                  active
                    ? "border-gold bg-white"
                    : "border-ink/[0.16] bg-transparent",
                )}
                style={
                  active
                    ? { boxShadow: "0 16px 36px -18px rgba(46,61,51,.4)" }
                    : undefined
                }
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-5 w-5 shrink-0 rounded-full border-2 transition-all duration-[250ms]",
                    active ? "border-gold bg-gold" : "border-ink/30 bg-transparent",
                  )}
                />
                <span className="flex-1">
                  <span className="block font-display text-[24px]">{p.name}</span>
                  <span className="mt-1 block text-[13.5px] text-ink/[0.65]">{p.desc}</span>
                </span>
                <span className="font-display text-[30px]">
                  {p.from && (
                    <span className="font-mono text-[12px] text-ink/50">from </span>
                  )}
                  <span className="font-mono text-[14px] text-gold">$</span>
                  {p.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky summary */}
        <div
          className="rounded-[16px] bg-ink p-[34px] text-paper md:sticky md:top-5"
          style={{ boxShadow: "0 30px 70px -28px rgba(20,28,23,.7)" }}
        >
          <MonoLabel className="!tracking-[0.16em] text-paper/[0.55]">
            {pricing.summary.label}
          </MonoLabel>
          <div className="mt-[14px] font-display text-[30px] font-light leading-[1.1]">
            {selected.name}
          </div>
          <div className="mt-[14px] flex items-baseline gap-[6px]">
            {selected.from && (
              <span className="font-mono text-[13px] text-paper/[0.55]">from</span>
            )}
            <span className="font-mono text-[16px] text-gold-light">$</span>
            <span className="font-display text-[52px] font-light leading-none">
              {selected.price}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-[10px] border-t border-paper/[0.18] pt-5">
            {pricing.summary.checks.map((check) => (
              <div key={check} className="flex gap-[10px] text-[13.5px] text-paper/[0.82]">
                <span className="text-sage">✓</span> {check}
              </div>
            ))}
          </div>
          <a
            href={buyHref(pkg, "#contact")}
            {...(buyHref(pkg, "#contact").startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() =>
              track("buy_click", { variant: "b", placement: "summary", pkg: selected.name })
            }
            className="mt-[26px] block rounded-[12px] bg-gold p-4 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-ink-deep"
            style={{ boxShadow: "0 14px 30px -12px rgba(185,142,84,.8)" }}
          >
            {pricing.summary.cta}
          </a>
          <a
            href="#contact"
            className="mt-[14px] block text-center font-mono text-[11px] tracking-[0.08em] text-paper/60"
          >
            {pricing.summary.secondary}
          </a>
          <div className="mt-4 text-center font-mono text-[10px] tracking-[0.08em] text-paper/[0.45]">
            {pricing.summary.secure}
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[12px] border border-ink/[0.16] md:grid-cols-2">
        <div className="bg-surface p-9 md:px-10">
          <MonoLabel className="mb-[22px] block !tracking-[0.16em] text-ink">
            {pricing.comparison.includedTitle}
          </MonoLabel>
          <div className="flex flex-col gap-[13px]">
            {pricing.comparison.included.map((item, i, arr) => (
              <div
                key={item}
                className={cn(
                  "flex gap-[13px]",
                  i < arr.length - 1 && "border-b border-ink/[0.1] pb-3",
                )}
              >
                <span className="text-sage">✓</span>
                <span className="text-[14px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-ink p-9 text-paper md:px-10">
          <MonoLabel className="mb-[22px] block !tracking-[0.16em] text-paper/60">
            {pricing.comparison.elsewhereTitle}
          </MonoLabel>
          <div className="flex flex-col gap-[13px]">
            {pricing.comparison.elsewhere.map((item, i, arr) => (
              <div
                key={item}
                className={cn(
                  "flex gap-[13px]",
                  i < arr.length - 1 && "border-b border-paper/[0.14] pb-3",
                )}
              >
                <span className="text-paper/40">+</span>
                <span className="text-[14px] text-paper/[0.78]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile buy bar — pins to the viewport bottom while the pricing
          section is on screen, so the selected plan + Buy stay one tap away. */}
      <div className="sticky bottom-0 z-30 -mx-6 mt-10 md:hidden">
        <div
          className="flex items-center justify-between gap-4 border-t border-paper/[0.12] bg-ink px-6 py-3 text-paper"
          style={{
            paddingBottom: "max(12px, env(safe-area-inset-bottom))",
            boxShadow: "0 -14px 34px -18px rgba(20,28,23,.55)",
          }}
        >
          <span className="min-w-0">
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/[0.55]">
              {pricing.summary.label}
            </span>
            <span className="block truncate font-display text-[17px] leading-tight">
              {selected.name} · {selected.from && <span className="text-[13px]">from </span>}
              <span className="text-gold-light">${selected.price}</span>
            </span>
          </span>
          <a
            href={buyHref(pkg, "#contact")}
            {...(buyHref(pkg, "#contact").startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() =>
              track("buy_click", { variant: "b", placement: "mobile-bar", pkg: selected.name })
            }
            className="shrink-0 rounded-full bg-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-deep"
          >
            {pricing.summary.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(faq.defaultOpen);

  return (
    <section id="faq" className="border-t border-ink/[0.1] bg-surface py-[100px]">
      <div className={cn(WRAP, "grid grid-cols-1 items-start gap-14 md:grid-cols-[0.8fr_1.2fr]")}>
        <div>
          <MonoLabel className="mb-5 block text-gold">{faq.kicker}</MonoLabel>
          <h2
            className="font-display font-light leading-[1.08]"
            style={{ fontSize: "clamp(32px, 4.5vw, 44px)" }}
          >
            {faq.headline}
          </h2>
          <p className="mt-[22px] max-w-[300px] text-[14.5px] leading-[1.7] text-ink/[0.7]">
            {faq.subBefore}
            <a
              href={INTEGRATIONS.chatUrl || "#contact"}
              {...(INTEGRATIONS.chatUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-gold"
            >
              {faq.subLink}
            </a>
            {faq.subAfter}
          </p>
        </div>
        <div className="flex flex-col">
          {faq.items.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className={cn(
                  "border-t border-ink/20",
                  i === faq.items.length - 1 && "border-b",
                )}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                  className="flex w-full items-center justify-between gap-4 px-1 py-[26px] text-left"
                >
                  <span className="font-display text-[24px]">{item.q}</span>
                  <span className="font-mono text-[22px] text-gold" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="max-w-[560px] px-1 pb-[26px] text-[15px] leading-[1.7] text-ink/[0.72]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Urn                                                                 */
/* ------------------------------------------------------------------ */

function UrnSection() {
  return (
    <section
      id="urns"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(130% 110% at 50% 0%, #243029 0%, #131b16 62%, #0c120e 100%)",
      }}
    >
      <div className={cn(WRAP, "pb-[92px] pt-[84px]")}>
        <div className="relative z-[2] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <MonoLabel className="mb-4 block !tracking-[0.24em] text-gold">
              {urn.kicker}
            </MonoLabel>
            <h2
              className="font-display font-light leading-[1.04] text-paper"
              style={{ fontSize: "clamp(34px, 5vw, 50px)" }}
            >
              {urn.headline}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#pricing"
              onClick={() => track("buy_click", { variant: "b", placement: "urns" })}
              className="inline-flex items-center gap-[10px] rounded-[40px] bg-gold px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink-deep"
            >
              {urn.ctaPrimary}
            </a>
            <a
              href={mailtoHref("AETERNA urns enquiry")}
              onClick={() => track("email_click", { variant: "b", placement: "urns" })}
              className="inline-flex items-center gap-[10px] rounded-[40px] border border-gold-light/50 px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.14em] text-gold-light transition-colors hover:border-gold-light"
            >
              {urn.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="relative mt-[6px] flex h-[380px] items-center justify-center">
          <div
            data-motion
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(185,142,84,.4) 0%, rgba(185,142,84,.08) 40%, transparent 66%)",
              mixBlendMode: "screen",
              animation: "gtDrift2 18s ease-in-out infinite",
            }}
          />
          <UrnSculpture turning compact />
          <div
            data-motion
            className="absolute bottom-[6px] font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(230,199,154,.7)]"
            style={{ animation: "gtFloat 4s ease-in-out infinite" }}
          >
            {urn.caption}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Live chat                                                           */
/* ------------------------------------------------------------------ */

function LiveChat() {
  return (
    <section className={cn(WRAP, "py-[90px]")}>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <MonoLabel className="mb-[18px] block text-sage">{liveChat.kicker}</MonoLabel>
          <h2
            className="font-display font-light leading-[1.08]"
            style={{ fontSize: "clamp(32px, 4.5vw, 44px)" }}
          >
            {liveChat.headline}
          </h2>
          <p className="mt-[18px] max-w-[360px] text-[15px] leading-[1.7] text-ink/[0.7]">
            {liveChat.body}
          </p>
          <div className="mt-[26px] flex flex-wrap gap-3">
            <a
              href={INTEGRATIONS.chatUrl || "#contact"}
              {...(INTEGRATIONS.chatUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => track("chat_open", { variant: "b", placement: "live-chat" })}
              className="inline-flex items-center gap-[9px] rounded-[40px] bg-gold px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-deep"
            >
              {liveChat.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-[9px] rounded-[40px] border border-ink/30 px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink"
            >
              {liveChat.ctaSecondary}
            </a>
          </div>
        </div>
        <ChatPanel
          tone="light"
          avatarVariant="human"
          name={liveChat.chat.name}
          status={liveChat.chat.status}
          avatar={liveChat.chat.avatar}
          messages={liveChat.chat.messages}
          placeholder={liveChat.chat.placeholder}
          action={liveChat.chat.action}
          actionHref={INTEGRATIONS.chatUrl || "#contact"}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className={cn(WRAP, "pb-11 pt-20")}>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2
              className="font-display font-light leading-[1.02]"
              style={{ fontSize: "clamp(40px, 6vw, 54px)" }}
            >
              {footer.headline}
            </h2>
            <p className="mt-5 max-w-[400px] text-[15px] leading-[1.65] text-paper/[0.74]">
              {footer.body}
            </p>
            <div className="mt-[26px] flex flex-wrap gap-3">
              <a
                href="#pricing"
                onClick={() => track("buy_click", { variant: "b", placement: "footer" })}
                className="inline-flex items-center gap-[9px] rounded-[40px] bg-gold px-[26px] py-[13px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-deep"
              >
                {footer.ctaPrimary}
              </a>
              <a
                href={phoneHref}
                onClick={() => track("call_click", { variant: "b", placement: "footer" })}
                className="inline-flex items-center gap-[9px] rounded-[40px] border border-paper/30 px-[26px] py-[13px] font-mono text-[11px] uppercase tracking-[0.12em] text-paper"
              >
                {footer.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-[18px] pt-2">
            <a
              href={emailHref}
              className="flex justify-between gap-4 border-b border-paper/20 pb-[14px]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/[0.55]">
                Email
              </span>
              <span className="text-[15px]">{email}</span>
            </a>
            <a
              href={phoneHref}
              className="flex justify-between gap-4 border-b border-paper/20 pb-[14px]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/[0.55]">
                Phone, day or night
              </span>
              <span className="text-[15px]">{phone}</span>
            </a>
            <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-paper/50">
              {footer.accreditation}
            </div>
          </div>
        </div>
        <div className="mt-12 rounded-[16px] bg-paper p-7 text-ink md:p-9">
          <LeadForm
            tone="light"
            context="Request a call back"
            submitLabel="Request a call back"
          />
        </div>
        <div className="mt-[60px] flex flex-col gap-3 border-t border-paper/[0.16] pt-6 font-mono text-[11px] tracking-[0.1em] text-paper/50 sm:flex-row sm:justify-between">
          {footer.bottom.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Entry                                                               */
/* ------------------------------------------------------------------ */

export function VariantB() {
  return (
    <div id="top" className="bg-paper text-ink">
      <Nav />
      <main id="main">
        <Hero />
        <Audience />
        <Founder />
        <Pricing />
        <Faq />
        <UrnSection />
        <LiveChat />
      </main>
      <Footer />
      <VariantSwitcher current="b" />
    </div>
  );
}
