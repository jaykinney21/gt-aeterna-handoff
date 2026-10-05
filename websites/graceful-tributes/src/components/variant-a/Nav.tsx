"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { cn, splitTrailingArrow } from "@/lib/utils";
import { bookingHref, portalHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import * as A from "@/lib/content/variant-a";

/** Maps each nav label to its in-page anchor. */
const NAV_ANCHORS: Record<string, string> = {
  Services: "#services",
  "Our Story": "#process",
  Urns: "#urns",
  Contact: "#contact",
};

/** Watches the anchored sections and reports which one the reader is in.
 *  Quiet wayfinding — a small gold dot under the active link. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      // A band around the reader's eyeline: a section is "active" while it
      // occupies the middle of the viewport.
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/**
 * Variant A top nav: brand wordmark, link list, theme toggle pill, and a
 * glass "Book a call" CTA. Light surfaces are var-driven so they react to the
 * theme toggle. Below md the links collapse into a disclosure menu behind a
 * "Menu" pill; the Book CTA stays visible in the bar.
 *
 * The bar is sticky (scroll-padding-top in globals.css already assumed it):
 * at the top of the page it sits flat on the paper; once you scroll, the
 * glass deepens and a hairline settles under it. A gold dot marks the
 * section you're reading.
 */
export function Nav({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(Object.values(NAV_ANCHORS));
  const bookHref = bookingHref("#scheduler");
  const bookExternal = bookHref.startsWith("http");
  const bookLabel = splitTrailingArrow(A.nav.cta);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeToggle = (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
      className="gt-label gt-press inline-flex items-center gap-2 rounded-[30px] border border-[var(--va-line)] px-[15px] py-2 !text-[11px] !tracking-[0.1em] text-[var(--va-muted)] hover:border-[var(--va-gold)] hover:text-[var(--va-ink)]"
    >
      ◑ {theme === "dark" ? "Light" : "Dark"}
    </button>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] border-b transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "gt-glass border-[var(--va-line)] bg-[var(--va-glass)]"
          : "border-transparent bg-[var(--va-paper)]",
      )}
      style={
        scrolled
          ? { boxShadow: "0 10px 30px -18px rgba(46,61,51,.35)" }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-[18px] md:px-16 md:py-[22px]">
        <a href="#top">
          <MonoLabel className="!text-[12px] !tracking-[0.24em] text-[var(--va-ink)]">
            Graceful&nbsp;Tributes
          </MonoLabel>
        </a>

        <nav aria-label="Primary" className="hidden gap-x-8 lg:flex">
          {A.nav.links.map((link) => {
            const href = NAV_ANCHORS[link] ?? "#top";
            const current = active === href;
            return (
              <a
                key={link}
                href={href}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "gt-label relative !text-[11.5px] !tracking-[0.14em] transition-colors",
                  current
                    ? "text-[var(--va-ink)]"
                    : "text-[var(--va-muted)] hover:text-[var(--va-ink)]",
                )}
              >
                {link}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-[9px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--va-gold)] transition-opacity duration-500",
                    current ? "opacity-100" : "opacity-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-[10px] md:gap-[14px]">
          <span className="hidden lg:inline-flex">{themeToggle}</span>
          <a
            href={portalHref()}
            onClick={() => track("portal_click", { variant: "a", placement: "nav" })}
            className="gt-glass gt-label gt-press hidden items-center gap-[9px] rounded-[30px] border border-[var(--va-glassbrd)] bg-[var(--va-glass)] px-5 py-[10px] !text-[11px] !tracking-[0.12em] text-[var(--va-ink)] hover:border-[var(--va-gold)] sm:inline-flex"
            style={{
              boxShadow:
                "0 8px 22px -8px rgba(46,61,51,.4), inset 0 1px 0 rgba(255,255,255,.6)",
            }}
          >
            {A.nav.portal}
          </a>
          <a
            href={bookHref}
            {...(bookExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track("book_call_click", { variant: "a", placement: "nav" })}
            className="gt-glass gt-label gt-press hidden items-center gap-[9px] rounded-[30px] border border-[var(--va-glassbrd)] bg-[var(--va-glass)] px-5 py-[10px] !text-[11px] !tracking-[0.12em] text-[var(--va-ink)] hover:border-[var(--va-gold)] sm:inline-flex"
            style={{
              boxShadow:
                "0 8px 22px -8px rgba(46,61,51,.4), inset 0 1px 0 rgba(255,255,255,.6)",
            }}
          >
            {bookLabel.text}
            {bookLabel.arrow ? (
              <span aria-hidden className="gt-arrow inline-block">
                →
              </span>
            ) : null}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="va-mobile-menu"
            className="gt-label gt-press inline-flex items-center gap-2 rounded-[30px] border border-[var(--va-line)] px-[14px] py-[9px] !text-[11px] !tracking-[0.1em] text-[var(--va-muted)] hover:border-[var(--va-gold)] hover:text-[var(--va-ink)] lg:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="va-mobile-menu"
          aria-label="Primary, mobile"
          className={cn(
            "border-t border-[var(--va-line)] px-6 pb-5 pt-2 lg:hidden",
            // the disclosure needs its own solid paper when the bar is glass
            scrolled ? "bg-[var(--va-paper)]" : "",
          )}
        >
          {A.nav.links.map((link) => (
            <a
              key={link}
              href={NAV_ANCHORS[link] ?? "#top"}
              onClick={() => setOpen(false)}
              className="gt-label block border-b border-[var(--va-line)] py-4 !text-[12px] !tracking-[0.16em] text-[var(--va-ink)]"
            >
              {link}
            </a>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={portalHref()}
              onClick={() => {
                setOpen(false);
                track("portal_click", { variant: "a", placement: "mobile-menu" });
              }}
              className="gt-glass gt-label gt-press flex items-center justify-center gap-[9px] rounded-[30px] border border-[var(--va-glassbrd)] bg-[var(--va-glass)] px-5 py-[13px] !text-[11px] !tracking-[0.12em] text-[var(--va-ink)]"
              style={{
                boxShadow:
                  "0 8px 22px -8px rgba(46,61,51,.4), inset 0 1px 0 rgba(255,255,255,.6)",
              }}
            >
              {A.nav.portal}
            </a>
            <a
              href={bookHref}
              {...(bookExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                setOpen(false);
                track("book_call_click", { variant: "a", placement: "mobile-menu" });
              }}
              className="gt-label gt-press flex items-center justify-center gap-[9px] rounded-[30px] bg-[var(--va-gold)] px-5 py-[13px] !text-[11px] !tracking-[0.12em] text-ink-deep hover:opacity-90"
            >
              {A.nav.cta}
            </a>
          </div>
          <div className="pt-4">{themeToggle}</div>
        </nav>
      )}
    </header>
  );
}
