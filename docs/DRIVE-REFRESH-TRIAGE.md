# Expanded Drive intake — current triage

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

**Priority update:** Jay has selected three planning-only workstreams: original-five manufacturer quotes, Every Step Legacy CAD/STL, and a prompt-driven storyboard/catalog. See [the primary work plan](PRIMARY-WORK-PLAN.md). This supersedes the generic next-work sequence below; none of the three has been started.

**Task-three clarification:** Jay confirmed DOC NOTES is the intended generation guide: Section 3 collection/design descriptions, Section 4 companion keepsakes/jewelry, Section 5 AI visual templates, and Section 6 SKU naming. No separate prompt folder is needed. These inputs guide future catalog imagery; they are not an engineered image-to-CAD workflow. Tasks one and two are unchanged; generation remains unstarted.

September 17, 2026, Pacific. Refreshed FINAL STL FILES (private source omitted from public handoff) after Jay's additional uploads. This supersedes the earlier statement that only DOC NOTES and ten STLs were available. Original files remain unchanged.

## Intake completed

- Downloaded all **nine new ZIP archives**, checked their sizes against Drive metadata, and verified ZIP integrity.
- Extracted **88 Word documents** and their **159 embedded images**. All 88 documents and 159 images have distinct byte hashes within this intake. Distinct files do not necessarily mean distinct products or revisions.
- Created searchable text for every document, retained originals, and inspected all embedded images in six numbered contact sheets. Thumbnail inspection establishes visual themes and obvious differences; it is not a line-by-line validation of every image annotation.
- Re-read DOC NOTES: its text is unchanged. Re-listed all five STL folders: file IDs, sizes and modification timestamps are unchanged. Retained the existing downloaded STL copies and measurements; did not redundantly download unchanged binaries.
- No new STL, STEP, native CAD, DXF or accessory manufacturing files were found inside the nine archives: **all 88 archive members are DOCX files**. Their pictures and schematic illustrations do not constitute editable geometry.

Full provenance: [source index](source-documents/INDEX.md), content inventory (private source omitted from public handoff), root inventory (private source omitted from public handoff). Document numbers below refer to that source index and the image sheets.

| Archive group | Documents | Contents |
|---|---:|---|
| Original five specs / CAD files | 5 | Snake/basketball, baseball glove, Mom's Tough Love, floral urn, blue sneaker |
| Five updated specs / FOR CAD ILES | 5 | Home Run Legacy, Court Legend, Legacy Ascend, Black & Gold, Mom's Tough Love; multiple variants and accessory specifications |
| CAD URNS 3 | 18 | Design briefs and reference sheets |
| CAD file uns 2 | 16 | Design briefs and reference sheets |
| CAD urns 4 | 5 | Basketball and golf variants plus Twinkle Little Star |
| Non specific categories urns | 29 | Family, faith, cultural, occupational and other designs |
| Marketing info | 8 | Competing pricing/bundle drafts, filling instructions, packaging, press release and distribution ideas |
| Digital suite information | 1 | Activation, visitor view and private family dashboard |
| Manufacturer contacts | 1 | Thirteen proposed suppliers across printing, urn specialists and bronze casting |

## What is now resolved

**The five existing STL families now have much stronger reference-document candidates.** The blue sneaker should no longer be provisionally mapped to Bred Legacy simply because both are sneaker-themed. The incoming original and updated sheets depict a blue laced vessel. Images also establish a snake/basketball, a baseball glove, a maternal diorama and black/gold floral work as the relevant five families.

**Ten-inch requirements do exist in writing.** The missing deliverable is now validated geometry matching an agreed specification, not merely a missing description of the variant.

**The digital offer now has a defined proposed user flow**, rather than only a QR-code mention. **Bundle quantities also have explicit proposals**, although two versions conflict. Neither the software nor bundle economics is proven operational.

## Five-family reconciliation

These are strong reference matches, not certified mesh-to-drawing matches. File hashes identify the meshes; the documents do not tie their own revisions to those hashes.

| STL family | Original specification | Updated reference | Decision or discrepancy |
|---|---|---|---|
| BasketBall | Doc 36, Forever in the Game, snake/basketball; SKU LN-SPT-COURTLEGENDBase; 12-inch overall, 200+ in³, connected upper/base cavity | Doc 47, Court Legend; 10.75-inch version plus 10 × 7-inch variant | Updated text describes base storage with a 203 in³ claim that the stated base cannot support. Existing body Z extent is 11.565 inches if mm, not the stated 10-inch variant |
| Baseball | Doc 37, MVP Baseball Glove; SKU LN-SPT-MVPGLOVE; 12-inch overall, 200+ in³, connected glove/base cavity | Doc 46, Home Run Legacy; 13.25-inch version and **two conflicting 10-inch versions** | First small version has 8.75-inch diameter and a 2.75-inch base; second has 7-inch diameter and 2.5-inch base. Existing body is about 10.010 inches high if mm; its relationship to either revised specification is unverified |
| Sneaker | Doc 40, Legacy Lives On / blue legacy; SKU LN-SPT-SNEAKERBLUE; 11.5 × 7.5 × 5 inches, rectangular base, 210+ in³ | Doc 48, Legacy Ascend; 12-inch and 10 × 7-inch versions, **circular base** | Major geometry change, not just a rename. Do not apply new circular-base dimensions to the existing mesh automatically. Existing body Z extent is 12.240 inches if mm |
| Midnight Blossom | Doc 39, Timeless Elegance; SKU HC-TRD-BLKGLDFLORAL; 12-inch, top loading, 200+ in³ | Doc 49, Black & Gold / Love Blossoms Forever; bottom-loading pedestal and 10 × 7-inch proposal | Strong visual family relationship but significant closure/base changes. Existing top-opening body and separate lid do not prove the proposed bottom-loading design is implemented |
| Mom Tough Love Diorama | Doc 38, Mom's Tough Love; SKU LN-FAM-TOUGHLOVE; 13-inch top-loading vessel | Doc 50 contains an 11-inch top-and-bottom-access proposal, a 10 × 8-inch 200+ in³ version, and a **different 10 × 6.5-inch “Because I Said So” 150+ in³ version** | Treat the two sayings/designs as separate variants. Existing pair is body plus base plate, not an independently supplied lid; don't assume functional top access from the pictures |

The earlier STL measurements remain in [the five-file-set triage](FINAL-STL-FOLDER-TRIAGE.md). Source coordinates do not establish millimeter units or assembled orientation. No physical samples, fit checks or cavity measurements were added by this intake.

## Engineering issues to resolve before a firm production quote

### Capacity and storage architecture

Several updated documents move storage from a connected upper/base cavity to the base alone while retaining a 200+ in³ claim. Using the **external diameter** and stated internal depth gives an intentionally generous cylindrical upper bound; actual usable volume will be smaller after walls, hardware and shape changes.

| Document | Stated base inputs | Generous volume ceiling | Claim / implication |
|---|---|---:|---|
| Court Legend, 47 | 8.5-inch diameter × 2.35-inch depth | 133.35 in³ | Cannot provide stated 203 in³ in that base alone |
| Home Run Legacy, 46 | 8.75-inch diameter × 2.35-inch depth | 141.31 in³ | Cannot provide 200+ in³ in that base alone |
| Legacy Ascend, 48 | 8.5-inch diameter × 2.75-inch depth | 156.05 in³ | Cannot provide stated 203 in³ in that base alone |
| Black & Gold, 49 | 7.5-inch diameter × 2.25-inch depth | 99.40 in³ | Cannot provide 200+ in³ in that base alone |

These are contradictions in the written requirements, not measured mesh capacities. A connected upper cavity may resolve them, but that must be designed and measured rather than inferred from the exterior art.

### Other concrete conflicts

- **Home Run Legacy (46):** one “10-inch” version lists 7.5-inch sculpture plus 2.75-inch base, totaling 10.25 inches without a defined overlap. The second version changes the base dimensions and inscription. Select one assembly drawing.
- **Cookie Jar (24):** its 10-inch variant lists base height 2.50 inches but internal base depth 2.70 inches. That is inconsistent if both refer to the same base.
- **All Star Tribute (6):** a section is labeled “And Still I Rise” despite the surrounding All Star content. This is a likely copied section requiring owner reconciliation, not an accepted new name.
- **150+ versus 200+ in³:** “Because I Said So” (17/50) and Can't Guard Me's 10-inch version (21) specify 150+ in³. They do not meet the inherited 200 in³ minimum and need explicit size-class treatment.
- **Sneaker process mismatch (40):** it names PLA or resin while also describing SLS/MJF manufacturing. Select a specific material/process pair rather than send that paragraph as an executable specification.
- **Closure changes:** some sheets call for top threads, some metal bottom plates, and Mom's updated full-size sheet includes both. Each SKU needs its own closure BOM and drawing.
- **“Niche-compatible” remains a proposed use.** A 10-inch height alone does not prove fit; the documents themselves include broad diameters and widths. Facility-specific opening and interior dimensions remain needed.
- **Small-part and packaging issues from the previous triage remain:** 4.5 cc miniature capacity, unspecified hardware compatibility, and the foam/carton mismatch are not resolved by more renders.

The packet repeatedly says “engineered,” “airtight,” “outdoor,” “zero MOQ,” or “production-ready.” These are draft assertions until tied to actual CAD checks, supplier terms and physical testing. Images are useful reference sheets, not evidence of tested manufacture.

## Digital memorial suite: clarified scope

Doc 51 describes first-scan activation, email/password or social login, pairing a unique QR identifier to a memorial, portrait/name/date setup, public biography/photos/videos, a moderated tribute wall, family editing/media management, public or four-digit-PIN viewing, and a tracker for linked physical keepsakes.

This is enough to draft software requirements. It is **not a deployed product, cost estimate, architecture or tested security model**. Before promising it in a bundle, define activation ownership, replacement/lost QR handling, admin recovery, access controls and abuse limits, media limits, backups/export/deletion, service duration, domain continuity, support ownership and the cost per memorial. “Lifetime” and “unlimited” appear elsewhere in the marketing packet without an operating commitment or budget.

## Bundle and price versions

| Proposal | $595 tier | $950 tier | $1,495 tier |
|---|---|---|---|
| Product Tier pricing, doc 52 | 10-inch urn; no keepsakes; standard biography | Choice of 2 keepsakes; premium suite | 1 miniature + 2 keychains + 2 jewelry pieces = 5; lifetime suite |
| Adjusted Value-Driven Pricing Matrix, doc 53 | Same basic structure | 1 miniature + 2 other pieces = 3 | Up to 2 miniatures + 4 other pieces = 6; lifetime suite |

Doc 53 calls itself adjusted, so it is a plausible later proposal, **not owner approval**. Preserve both until the chosen bundle is confirmed and costed. DOC NOTES separately lists $295–$495 urn MSRPs, another note proposes $500–$1,500 bundles, and the draft press release says $425–$595. These are different documents/offers, not interchangeable prices.

Cost print, hand finish, metal parts, each accessory, QR production, presentation box, filling kit, transit packaging, shipping, marketplace/fulfillment, returns and ongoing software separately. The documents' “zero inventory risk” and protected-margin claims are not supported by accepted quotes. No actual manufacturer quote was found in this new packet.

## Manufacturer, fulfillment and marketing notes

Doc 1 adds a 13-company prospect list: JawsTec, Sculpteo, Xometry, WeNext, FacFox, Protolabs Network, Shapeways, PrintAWorld, Foreverence, In The Light Urns, Pulvis, Cremation Solutions and Firebird Bronze. Its distinction between a print bureau, a custom-urn designer and a casting foundry is useful. Its claimed verified contacts, certifications, lead times, materials and prices were **not independently reverified in this intake**. Confirm current scope and whether custom STL files are accepted before outreach. In particular, don't copy its claim that we have STEP files ready: none were supplied.

The filling-kit and packaging drafts (55/58) specify a micro-funnel, tools and thread-locking fluid, then promise a permanent waterproof seal and a 24-hour cure. Treat those as unvalidated product instructions: select the actual adhesive, hardware and materials, obtain manufacturer instructions, and test the assembled product before publishing. The proposed 5–7-day fabrication, 24-hour dispatch, white-label fulfillment and API tracking are desired supplier terms, not established capabilities.

The press release (57) contains placeholders, a February 1 launch date and “available starting today.” It is not evidence of a launch and must not be published as-is. Distribution notes are proposed tactics, not cemetery approvals or signed relationships. No outreach, posting, orders or changes to connected accounts occurred during this refresh.

## What to do next

1. **Freeze a five-design revision map:** original reference, chosen updated visual, intended size, minimum capacity, closure and finish, each linked to the actual component hashes. Keep larger display and 10-inch variants as distinct records.
2. **Commission or perform the geometry review against that map:** section/cavity measurement, minimum walls, closure details, assembly dimensions, and the extent of any redesign. Review the existing STL before recreating it with AI.
3. **Prepare comparable budgetary RFQs:** quote each existing design as supplied, explicitly list unresolved assumptions, and request CAD correction and 10-inch redesign as separate line items. Add chosen accessory/finish options separately. Do not mix conflicting versions into a single quote request.
4. **Keep the remaining catalog as a design backlog:** these 78 product documents include alternates and repeats, not 78 verified saleable SKUs. Use a bounded image-to-CAD test on one selected missing model once its specification is reconciled.
5. **Cost the selected bundle and digital scope before pricing/listing.** Amazon remains the selling objective; no listing is ready solely because the reference catalog is extensive.

All nine archives, extracted originals, text, images and source links are retained locally. Every document was indexed and its extracted requirements screened; the detailed reconciliation prioritizes the five existing mesh families, pricing/digital scope and explicit conflicts. This is not an engineering sign-off on the full catalog.
