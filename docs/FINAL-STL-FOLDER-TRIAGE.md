# Five-design Drive package — triage

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

**Superseded intake scope:** the subsequent [expanded Drive refresh](DRIVE-REFRESH-TRIAGE.md) adds 88 documents and 159 embedded images. Its original/updated design mapping and requirements take precedence over the provisional mappings below. The binary STL measurements below remain applicable; the ten STL files have unchanged metadata.

September 17, 2026 (Pacific). Source: FINAL STL FILES (private source omitted from public handoff) and its [DOC NOTES](source-documents/DOC-NOTES.md). Source creation timestamps fall on September 18 UTC, which is September 17 locally.

## What this resolves

The folder contains one master notes document and five design folders, each with two STL files: **five identifiable design sets / ten component files**. This supersedes the previous missing-files finding. These are actual Drive file entries, not the five screenshots recovered earlier. The notes are a broad catalog and proposed operating specification; they are not a signed engineering release or a manufacturing quote.

No image files, native CAD/STEP, dimensioned drawings, separate 10-inch and 12–14-inch file sets, accessory meshes or supplier quotes appear in these six inspected folders. One pair per design cannot establish two manufactured size variants. Source files and folder names are preserved unchanged.

## Five-design register

| Design folder | Files supplied | Catalog mapping | Current status |
|---|---|---|---|
| Mom Tough Love Diaorama (private source omitted from public handoff) | Mom Tough Love Diorama Urn Body.stl.stl; Mom Tough Love Diorama Urn_Base_Plate.stl.stl | Likely Mom’s Tough Love Legacy Urn, but catalog describes gunmetal/floral bands; confirm against the actual diorama/reference | Components located; engineering and finish mapping pending |
| Sneaker (private source omitted from public handoff) | Sneaker.stl.stl; Sneaker_Base_Plate.stl.stl | “Breed Legacy Sneaker Urn / Rise Above” is a candidate; earlier materials say “Bred Legacy.” Do not assume equivalence | Components located; exact SKU/name/finish pending |
| Baseball (private source omitted from public handoff) | Baseball.stl.stl; Baseball_Base_Plate.stl.stl | Home Run Legacy is a candidate, not a verified mapping | Components located; exact SKU/finish pending |
| BasketBall (private source omitted from public handoff) | Basketball.stl.stl; Basketball_Base_Plate.stl.stl | Multiple basketball entries exist; folder name does not select one | Components located; do not automatically identify with the earlier Mamba RFQ |
| Midnight Blossom (private source omitted from public handoff) | Midnight Blossom_Body.stl.stl; Midnight Blossom_Lid.stl.stl.stl | No exact Midnight Blossom entry in DOC NOTES | Body/lid located; top-loading exception and finish specification unresolved |

**Quote classification:** all five can support a preliminary supplier review once file scale and quote assumptions are stated. None is yet demonstrated production-ready. Budgetary quotes can explicitly separate engineering repair from manufacture; we do not have to finish every engineering detail merely to ask what correction and production would cost.

## Completed file checks

All ten files downloaded successfully (214,917,040 bytes total). Binary STL lengths match their declared triangle counts and Drive sizes; all inspected vertex coordinates are finite. SHA-256 hashes and bounds are recorded in `research/drive-final-stls/stl-inspection.json` (historical private source; not bundled). Both Midnight Blossom files are byte-identical to the previously recovered Gmail versions.

| Main body | X × Y × Z in source coordinates | Z extent in inches **if millimeters** |
|---|---|---|
| Mom Tough Love Diorama | 176.138 × 179.942 × 270.644 | 10.655 |
| Sneaker | 164.571 × 170.271 × 310.887 | 12.240 |
| Baseball | 190.872 × 190.872 × 254.262 | 10.010 |
| Basketball | 232.430 × 216.220 × 293.760 | 11.565 |
| Midnight Blossom | 178.102 × 178.132 × 265.516 | 10.453 |

These are component bounding boxes, **not verified assembled dimensions**. STL does not encode units, and upright orientation has not been independently confirmed for each new model. If the assumed millimeter scale and Z-up orientation are correct, none of these body Z extents is at or below exactly 10 inches; even Baseball is slightly above 254 mm before any tolerance allowance. Do not label these files as verified 10-inch variants. The base-plate STLs have Z extents around 13–13.6 source units, so they should not automatically be interpreted as flat 2 mm cut-metal plates; their actual features need inspection.

The check did not measure cavity volume, wall thickness, intersections, topology, fit, seal or physical performance. Original geometry was not modified. A runnable parser self-check is included in `research/drive-final-stls/inspect_stl.py` (historical private source; not bundled).

## Requirements extracted from DOC NOTES

The document proposes resin printing and hand painting, nominal body walls 3–4 mm, bases 4–5 mm, internal fillets at least 2 mm, global ±0.15 mm print accuracy and +0.2 mm plate clearance. It specifies a metal bottom plate, four countersunk M3 screws, brass inserts and silicone seal channels. These are **requested design inputs**, not measurements of the supplied meshes or accepted supplier tolerances.

Accessory proposals are more concrete than before: a 3.5-inch miniature holding 4.5 cc; 1.25-inch pendants holding 0.15 cc; 1.75-inch keychain fobs with 0.30 cc chambers; bracelets at 0.10 cc; and women's necklace pendants at 0.12 cc. Hardware and closure concepts are described, but no corresponding CAD files or tested assemblies are supplied.

The document provides a useful category/design/size/finish/item SKU convention and a component/material/revision filename convention. Its example STEP/DXF names are examples only; those files are not in the folder. The existing ten STLs do not follow that revision schema yet.

## Conflicts and missing requirements

| Priority | Finding | Required resolution |
|---|---|---|
| High | No adult usable-capacity requirement appears in this master document, despite the earlier 200 in³ minimum | Carry the earlier minimum as an unresolved inherited requirement until confirmed for each SKU; measure the cavity with the closure engaged |
| High | No per-design assembled dimensions or explicit model units; 10-inch wording is in packaging and an image prompt | Confirm units, assembly orientation and intended overall height/width/depth for each supplied pair. Create distinct variant records rather than scaling blindly |
| High | All-urn metal bottom-plate language conflicts with Midnight Blossom's lid and earlier observed top opening | Define closure per design. A base-plate STL also does not establish material, screw engagement, insert specification or seal fit |
| High | 12 × 12 × 15-inch outer carton plus 2.5-inch foam on all sides | Leaves no more than 7 × 7 × 10 inches before carton wall thickness. A 10-inch product has no additional vertical allowance; verify actual product envelope and revise the packaging |
| High | 3.5 × 3.5 × 1.5-inch keepsake presentation box for a 3.5-inch miniature | No stated allowance along a 3.5-inch dimension; width/depth and orientation are absent. Do not assume the keepsake and protective foam fit |
| High | Uniform ±0.15 mm tolerance and +0.2 mm clearance prescribed for every part | Have the supplier accept critical feature tolerances by process, size, orientation and post-finish condition; specify whether clearances are radial, diametral or per side |
| Medium | A 3.5-inch miniature is assigned only 4.5 cc capacity | That is approximately 0.275 in³, not 4.5 in³. Confirm this small token capacity is intentional, rather than silently correcting units |
| Medium | “Companion” describes keepsakes/jewelry and also a large companion/oversized price tier | Separate a small matching keepsake from a dual-person vessel. Bundle contents and quantities remain unspecified |
| Medium | Digital suite appears as a keychain QR-code surface, without a service specification | Define destination, customer setup, hosting duration, privacy/support responsibility and ongoing cost; no working digital service is established by these notes |
| Medium | Promotional copy claims expert precision, flawless integrity, hand finishing and airtight permanent protection | Treat as draft intent until manufacturing and test evidence supports the actual product. A draft catalog is not proof these processes have occurred |
| Medium | “Ceramic”/metallic/gold descriptions mix material names with finish effects while process says resin | Specify actual substrate, paint/plating/leaf and hardware separately for each quote and later listing |

## Pricing reconciliation

DOC NOTES proposes urn COGS of $45–$125 across tiers and MSRP of $295–$495, substantially below the older $500–$1,500 positioning. Neither schedule is supported here by manufacturer quotes. Do not blend them or treat the newer numbers as an approved selling price.

The reported gross-margin figures generally resemble using the upper cost estimate, not a demonstrated margin on the full bundle. For example, $295 revenue and $65 cost gives 78.0% before all other uncounted costs. If that same $295 offer included an $18 keepsake and $12 pendant, counted product cost would rise to $95 and this margin would be 67.8% before marketplace fees, fulfillment, returns, advertising and digital service. This is an illustrative calculation using the document's estimates, not a suggested bundle or price.

Quote core urn, closure/hardware, painting, accessories, presentation packaging, shipping packaging and delivery separately. Record nonrecurring CAD/tooling separately from unit cost. Price each size independently. The bundle should be evaluated on total contribution, not perceived value alone.

## AI/CAD prompt assessment

Only two sample prompt templates are present: commercial urn photography and macro jewelry photography, including lighting, background and aspect ratio. They can guide visual concepts, but do not specify closed geometry, cavity subtraction, wall thickness, closure tolerances, separate parts, scale or CAD exports. The promised complete image-to-3D/CAD workflow is not actually in this document.

For new designs, prepare an engineering brief alongside front/side/rear references: exact envelope, minimum usable cavity, material/process, wall/base constraints, closure/hardware, ornament limits, assembly and revision. Require editable source and suitable component exports; check the resulting geometry independently. The existing [CAD research](HARDWARE-RESTART-RESEARCH.md) and [benchmark](PROTOTYPE-TEST-PLAN.md) remain useful, but no AI service has been run on these files during this triage.

## Next work

1. Confirm one reference image/catalog name and intended size for each of the five located pairs. The 10-inch and 12–14-inch variants need explicit mappings or separate redesign scope.
2. Produce per-design geometry checks: assembly, units, cavity, wall thickness and closure, then prepare annotated previews. Basic STL bounds alone do not answer these questions.
3. Prepare one comparable five-design RFQ: as-supplied budgetary manufacture plus separately itemized engineering corrections, two size variants where requested, finish and accessory options. Keep quantity and delivery assumptions consistent across suppliers.
4. Revise the previous Midnight-focused outreach around this five-design scope before requesting authorization to send. No supplier has received this folder from us.

Evidence retained locally: `research/drive-final-stls/inventory.json` (historical private source; not bundled), `DOC-NOTES.txt`, and the binary inspection record in that folder. Recovered files reside under `recovered/drive-final-stls/` (historical private source; not bundled). Drive originals, organization and sharing were not changed.
