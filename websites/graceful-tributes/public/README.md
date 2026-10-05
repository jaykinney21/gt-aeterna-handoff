# Asset slots

Drop real assets here to replace the CSS-gradient placeholders. Copy lives in
`src/lib/content/variant-a.ts` / `variant-b.ts`; the components render whatever
those files point at.

## Variant A ("Jay")
- `images/hero-atmosphere.jpg` — the dark hero band's background plate
  (`variant-a/Hero.tsx`; today it's layered CSS gradients).
- `films/the-return.mp4` — the "Film 01 · The Return" piece behind the hero's
  play card (a lightbox/player is not wired yet — the card is decorative until
  this exists).

## Variant B ("Mom")
- `images/hero-home.jpg` — the hero's right-hand visual (`VariantB.tsx` Hero).
- `images/founder.jpg` — the founder portrait (Founder section).

## Both
- `images/urn-*.jpg` — AETERNA urn beauty shots. `UrnSculpture.tsx` (the CSS
  urn) is also the seam where a real react-three-fiber urn can drop in.

Recommended: JPG/WebP ≤ 300 KB for images; H.264 MP4, ~1080p, muted, 8–15 s
loop, < 4 MB for film. Use `next/image` with `unoptimized` in mind — the site
is a static export.
