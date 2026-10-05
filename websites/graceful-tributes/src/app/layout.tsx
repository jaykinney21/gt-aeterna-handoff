import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://www.gracefultributes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Graceful Tributes — Family-led memorial care",
    template: "%s · Graceful Tributes",
  },
  description:
    "Calm, capable people to carry cremation, tribute, and remembrance — so your family can simply be together. Family-led, California, 35 years. A real person answers, day or night.",
  keywords: [
    "cremation coordination",
    "celebration of life",
    "memorial service",
    "custom urns",
    "AETERNA",
    "family-led funeral",
    "California cremation",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Graceful Tributes — Family-led memorial care",
    description:
      "Cremation, tribute, and remembrance — carried with calm. A real person answers, day or night.",
    siteName: "Graceful Tributes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graceful Tributes — Family-led memorial care",
    description: "Cremation, tribute, and remembrance — carried with calm.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="gt-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
