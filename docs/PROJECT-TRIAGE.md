# Graceful Tributes / AETERNA / LTRFL — project triage

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

**Current update October 4, 2026:** [Urn redesign and vendor triage](URN-REDESIGN-AND-VENDOR-TRIAGE-2026-10-04.md) records the latest storage redesign, the newly found 3D Print Joy raw-price estimate, five verified vendor replies, and the handoff for Mom's new Tripo files. The older package is held; the 10-inch version may use full-vessel storage rather than a base-only chamber. The September 7 assessment below is historical.

**Checked September 7, 2026.** The project is recoverable, but it is not ready to sell a manufactured urn. There is substantial design, business, website, and agent work. The missing commercial proof is one approved physical product, a repeatable supplier/fulfillment path, and viable unit economics.

Jay confirmed in this session: **no physical prototypes and no Amazon Seller Central account**. The proposed next milestone is one original, tested urn SKU, then an Amazon listing and a capped advertising experiment.

**Gmail/Drive update:** [GMAIL-DRIVE-TRIAGE.md](GMAIL-DRIVE-TRIAGE.md) adds 50 original project attachments and 12 Drive documents. Midnight Blossom contains a hollow floral body and a separate threaded lid, bringing the recovered model set to four STL files across two design families. Xometry's March 16 reply requests individual component CAD files. Newer PDFs contain three capacity conflicts; the inherited target is at least 200 in³ with bottom loading, while Midnight Blossom is top-loading. These findings refine the manufacturing priorities below.

## What belongs together

| Name / location | Role and evidence |
|---|---|
| Graceful Tributes | Memorial-service brand and website. Current source: [jaykinney21/graceful-tributes](https://github.com/jaykinney21/graceful-tributes). |
| AETERNA | Product/urn brand in the current sites. Source: [aeterna-site](https://github.com/jaykinney21/aeterna-site), plus `/urns` in Graceful Tributes. |
| Laid to Rest for Less / LTRFL | Earlier umbrella and urn-design studio. Explicit expansion appears in `main/src/app/wireframes/gt-ltrfl/page.tsx`; substantial source assets remain on Susan. |
| From Dust Co. / Vessel | Earlier product-brand names in the February business plan and [vessel-shop](https://github.com/jaykinney21/vessel-shop). Treat as historical names pending a single product-brand decision. |
| Aterna / Utterna / Eterna | Additional spellings in agent and planning history. Search aliases, not evidence of separate businesses. |
| Old ClawDash | [jaykinney21/main](https://github.com/jaykinney21/main): LTRFL concepts, CAD records, image generation, Tripo conversion, agent personas. Useful recovered code; not the recommended new storefront platform. |

Recommendation: use **AETERNA provisionally for product planning** and Graceful Tributes for services. Jay still needs to settle the public product name before packaging, seller identity, and brand registration. Do not rebuild all historical brands.

## Live verification

| Surface | Observed result |
|---|---|
| `https://graceful-tributes.com` | HTTP 200; live HTML contains `[phone omitted; check official contact page]`. |
| `https://graceful-tributes.com/urns` | HTTP 200. |
| `https://graceful-tributes.com/api/checkout` | HTTP 200; `{"payments":false}`. |
| `https://graceful-tributes-portal.vercel.app` | HTTP 200 after redirect to `/preview/tenant/gt`; reachability only, not authenticated workflow verification. |
| `https://portal.graceful-tributes.com` | DNS resolution failed from this machine. |
| `https://aeterna-site.vercel.app` | HTTP 200; page title is AETERNA — Art That Holds Everything. |
| Core GitHub open work | No open issues or PRs returned for graceful-tributes or aeterna-site at check time. This does not mean the backlog is empty. |

## Recovered designs and manufacturing evidence

The droplet contained **two real STL files**, their GLB counterparts, an existing render, and five concept collections: relationship figurines, eternal embrace/mothers, sneaker culture, sports legends, and snack nostalgia. Copies now live in `recovered/susan/ltrfl-designs/` (historical private source; not bundled).

| File | Triangles | Bounding box in unspecified STL units |
|---|---:|---|
| `kobe-mamba-tripo3d.stl` | 351,762 | 0.3603 × 0.3900 × 1.0000 |
| `kobe-mamba-mentality.stl` | 244,796 | 0.7796 × 1.9567 × 0.7315 |

The local STL SHA-256 hashes match the originals on Susan. Both parse as complete binary STL meshes. Exact-coordinate edge inspection found zero boundary edges and zero edges shared by more than two triangles. **That is not manufacturing approval.** STL carries no declared units, and this inspection did not validate self-intersections, interior capacity, wall thickness, separate lid, screws, seals, or material performance. Do not upload these as supposedly finished adult urns without specifying scale and engineering the cavity/closure.

The revised spec calls the basketball design **“The Legacy”**, requests bottom loading with four screws, and says review is pending. Its displayed date is inconsistent with surrounding records. The recovered preview still uses the earlier visual treatment. Preserve the originals; do not assume the later brief was incorporated into the mesh. Branded/celebrity concept references need an original-design/rights review before commercialization; the old document’s proposed renaming is not proof of clearance.

The old ClawDash code really implements image generation → Tripo3D GLB → optional Zoo STEP conversion. But it inserts `status: "Ready"` with **dimensions and material null**. Its “manufacturing specification” leaves material and access method undecided. This is concept-generation infrastructure, not a verified engineering release process. Source: `main/src/lib/mission-control/space-actions.ts`, approximately lines 1747–1965.

There were no STL/STEP/3MF manufacturing files in the seven downloaded GitHub snapshots. The important files were on the droplet. Supabase CAD records/storage and every historical branch were not exhaustively searched, so additional designs may still exist.

## Priority findings and closure checks

| Priority | Finding | Required closure |
|---|---|---|
| P0 — before traffic | Live GT contact/fallback paths display the placeholder phone number. Source: `graceful-tributes/src/lib/site-config.ts`, plus copy/service strings. | Jay supplies the real staffed contact; update all relevant strings; verify live phone and email destinations and actual handoff. |
| P0 — before taking requests | GT checkout’s held path returns `{held:true}` when inbound config is absent; it ignores non-2xx upstream replies and swallows network failure. No durable local receipt is created there. | A request receives success only after durable intake, or clearly fails. Test missing config, upstream rejection, timeout, and successful receipt. Do not place a synthetic request into production without coordinating its handling. |
| P0 — before payments | No confirmed manufacturable SKU, sample, supplier commitment, or Amazon account. Payments currently off. | Approved physical sample, verified capacity/closure/finish, actual quote, delivery terms, and fulfillment plan before accepting orders. |
| P1 | AETERNA `cart.js` keeps cart data in `window._aeternaStore`; its checkout button has no handler in the inspected storefront scripts. `imagine.js` claims save/request success via alerts. | Choose the selling path. For the first Amazon launch, replace misleading web CTAs with truthful product information/links when approved; a second custom checkout is unnecessary. |
| P1 | Catalog conflict: AETERNA’s 12 entries span $95–$1,450 and several materials; GT’s six urn finishes are provisionally $1,050–$1,450. | One SKU register with exact dimensions, material, cost, price, evidence photo, supplier, capacity, and approval. Current numbers are proposals, not validated economics. |
| P1 | Jessica’s product-DNA file now exists and the content skill is installed, superseding the old “missing file” report. However, **zero confirmed SKUs** are listed. | Confirm one SKU and its real reference photos. Do not treat installation as content readiness. |
| P1 | Branded portal DNS fails. | Resolve DNS/host mapping and verify GT login before advertising that URL. Working Vercel address is the temporary operational reference. |
| P1 | GT source has analytics hooks but no provider script in inspected layout. | Verify the intended provider and conversion reporting; Amazon Ads measurement is a separate system. |
| P2 | AETERNA repo contains unrelated fitness/app/backend work; latest repo activity is not evidence of urn progress. | Keep initial product recovery separate from unrelated application refactors. |
| P2 | Historical vendor and manufacturer research contains estimated costs and unsupported broad claims. | Request current quotes against the same specification; do not use old margins, ratings, or delivery estimates as promises. |

The February plan’s estimated 85–95% product margins and projected revenue are unvalidated assumptions. The manufacturing report also equates accepting STL with a working pipeline and infers an exterior size from capacity alone. Neither establishes a hollow, closable, appropriately sized urn. Its environmental claims likewise need evidence before reuse.

## Recovery sequence

1. **Make the existing front door honest.** Fix contact details and request-delivery behavior; retain payment-off status until the product is fulfillable. No production change was made during this assessment.
2. **Release one prototype brief.** Choose one shape, size class, finish, and closure. A simple original design is the shortest path; the recovered basketball models are useful concept references, with extra engineering and rights questions.
3. **Get comparable quotes.** Ask Xometry and Protolabs for prototype/process feedback, and a specialist maker if the intended final material is ceramic, wood, glass, or cast metal. Quote 1 / 10 / 50 units, including finishing, packaging, and rejected-part handling.
4. **Test the physical sample.** Verify usable interior capacity, fit, repeated closure, stability, finish, cleanability, packaging, and transit damage. Keep a measured acceptance record and real photos.
5. **Open the Amazon seller account and assemble the listing.** Resolve the brand, product identifiers, category/eligibility, fulfillment, price, and returns. Account creation/identity steps have not been started.
6. **Run a measured ad pilot.** Start with one SKU and controlled Sponsored Products discovery. Optimize from actual conversion and contribution margin, not clicks alone.

## Remaining unknowns

Jay’s decisions: first design, adult/pet/keepsake capacity, intended material, target retail price, sample budget, real customer contact, and final product brand. Existing research offers options but does not settle those decisions.

Still unverified: additional design/CAD inventory; signed vendor relationships; full backup coverage; current supplier quotations; Amazon product/category and ad eligibility; trademark/branding status. No outreach is authorized by this triage.

Scope: searched live accessible GitHub defaults, local DevOps documentation, and relevant Susan directories; recovered 51 files; indexed 299 related text files. This is a substantiated recovery assessment, not a claim to have read every binary, database row, archived branch, or agent conversation.
