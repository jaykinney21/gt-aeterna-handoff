"use client";

import { useState } from "react";
import { VariantSwitcher } from "@/components/shared/VariantSwitcher";
import { UrgencyBar } from "./UrgencyBar";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { PromiseSection } from "./PromiseSection";
import { Scheduler } from "./Scheduler";
import { Services } from "./Services";
import { PricingA } from "./PricingA";
import { ReportSection } from "./ReportSection";
import { UrnSection } from "./UrnSection";
import { Testimonials } from "./Testimonials";
import { Process } from "./Process";
import { AriaGuide } from "./AriaGuide";
import { Footer } from "./Footer";

/**
 * Variant A — "Jay": book-a-call, light/dark toggle, liquid glass, the urn.
 *
 * The whole page is scoped under `.va` with `data-theme`; globals.css swaps the
 * `--va-*` custom properties between light and dark, and every themeable surface
 * references those vars so the toggle re-themes instantly. Dark sections (hero,
 * urn, dark service card, footer) are fixed-dark in both themes.
 */
export function VariantA({
  faithLive = false,
  pricing = false,
}: {
  faithLive?: boolean;
  /** the "/ap" arm: A's room plus transparent pricing beside the scheduler */
  pricing?: boolean;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="va min-h-screen" data-theme={theme}>
      <UrgencyBar />
      <Nav
        theme={theme}
        onToggleTheme={() =>
          setTheme((t) => (t === "dark" ? "light" : "dark"))
        }
      />
      <main id="main">
        <Hero />
        <TrustStrip />
        <PromiseSection />
        {pricing ? <PricingA /> : null}
        <Scheduler />
        <Services />
        <UrnSection />
        <Testimonials />
        <Process />
        <ReportSection />
        <AriaGuide live={faithLive} />
      </main>
      <Footer />
      <VariantSwitcher current={pricing ? "ap" : "a"} />
    </div>
  );
}
