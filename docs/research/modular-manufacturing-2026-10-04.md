# Modular urn manufacturing triage — October 4, 2026

Scope: manufacturing/materials specialist review of Mom's new direction. No geometry was changed, vendor contacted, private file disclosed, order placed or paid API called during this review. Sources were checked October 4. This is a feasibility brief, not production approval.

**Latest handoff status:** Mom is creating new STL models in Tripo and will supply the files with revised specifications when ready. Hold the older document package. Assess the incoming files first; the recovered documents below are historical design references, not the next authorized vendor package. See the [new-file intake checklist](new-stl-intake-and-specification-checklist-2026-10-04.md) and [working RFQ worksheets](../specifications/ARCHITECTURE-AND-SPEC-MATRIX.md).

## Latest owner clarification — 10-inch variant

This clarification supersedes the earlier assumption that **every size** must store all ashes in its base. The 10-inch variant must retain **200 cubic inches of usable capacity**; “cubic feet” in the spoken update is treated as a transcription error, subject to owner correction. Mom is considering either a vase with no separate base or a short base with a hollow upper figurine. The larger display version may retain a base-only storage route, but its suggested 2–4-inch base height and roughly 7-inch width are aesthetic targets requiring reconciliation with capacity.

**Recommended 10-inch route:** engineer one fillable storage vessel with an integrated foot or minimal optional pedestal. Its exterior can be a vase, or artwork can wrap around the engineered inner reservoir. Set the full finished assembled envelope from the actual niche opening/interior dimensions, then establish the closure, clear chamber and artwork proportions. No specific existing mesh is yet proven to implement this route.

Hollow figurines do not automatically provide an accessible, usable 200 in³ chamber. Thin arms, laces, fingers, snakes, necks and separate bodies can create disconnected or difficult-to-fill cavities. Distinguish these choices explicitly:

- **Shared chamber:** base and upper communicate through a sufficiently large passage and jointly supply the required usable volume; the interface must retain ashes and the assembly must allow filling/emptying and cleaning. Measure the assembled connected cavity rather than adding disconnected CAD voids.
- **Independent sealed cavities:** choose which chamber holds ashes, how each is filled/closed and whether the customer must divide the remains. A hollow decorative upper that is sealed away from the base contributes zero capacity to the base's storage rating.
- **Separate display sculpture and urn:** a compact engineered vessel holds the ashes and the artwork is displayed separately. This preserves more artistic freedom but changes the offer and does not make the sculpture itself a 200 in³ urn.

The suggested larger base dimensions still cannot meet 200 in³ alone for these particular footprint assumptions:

| Entire outside base envelope | Gross solid-envelope ceiling | Before walls, hardware or closure |
|---|---:|---|
| Cylinder: 7-inch outside diameter × 4-inch outside height | 153.94 in³ | Cannot hold 200 in³ |
| Square: 7×7×4 inches outside | 196.00 in³ | Cannot hold 200 in³ |
| Rectangle: 7-inch outside width × 4-inch outside height; depth unspecified | Requires more than 7.14-inch depth even with zero wall thickness | Real depth must be greater after walls/features; rectangular depth remains a decision |

A fully utilized upper vessel creates more room than a shallow base. For illustration only, a clear cylindrical chamber of 6.5-inch internal diameter × 6.3-inch clear depth has approximately 209.05 in³ before feature deductions. This shows that a 10-inch overall target may be mathematically plausible; it does **not** prove fit, useful fill access, structural walls or compatibility with any artistic reference/niche. Sculptural taper and internal features can remove substantial volume.

For the eventual Sculpteo redesign assessment, request **both storage routes by size**: larger display/base-only where feasible, and 10-inch/full-vessel or connected base-plus-upper storage. Ask how much of the supplied artwork can be reused and what chamber/closure/mount work is required. Await Mom's new files and specifications; do not send the held older package. The separate base/artwork price routes below remain useful for display versions; they are not the only proposed architecture for the 10-inch variant.

## Earlier base-only architecture proposal — conditional display route

Develop an **ash-storage base plus a separately manufactured decorative sculpture**. Standardize the closure, mounting interface and hardware first; choose one base shape for the initial pilot. Circular, rectangular and square exterior families can follow if they share enough engineering to justify them. One identical inner container will not automatically fit all three shapes or a cemetery footprint.

For the base-only display route, the upper sculpture may still be hollow to save print material and enable washing/depowdering, but its cavity will not hold ashes or connect to the ash chamber. Hollowing for manufacture and hollowing for ash storage are different requirements. The latest 10-inch route above may instead intentionally use the upper as the storage vessel or as part of a connected chamber.

Define the product as two main modules, with a real bill of materials that also includes the ash-access plate/lid, gasket, inserts, fasteners, mounting hardware, plaque/QR and optional liner. A two-module product is not literally just two physical parts.

Ask for three separate cost routes: (1) all-resin, (2) SLA decorative upper plus MJF/SLS nylon functional base, and (3) SLA upper plus a separately sourced standard nonprinted wood/metal/other suitable storage base. Route 3 is an exploratory cost option, not an already located supplier or validated product. Avoid committing the functional chamber to a brittle prototyping resin merely to reduce print price.

## What exists locally

The redesigned briefs already exist. They were recovered September 17 and indexed in [SOURCE-INDEX](../source-documents/INDEX.md), entries 46–50; [DRIVE-REFRESH-TRIAGE](../DRIVE-REFRESH-TRIAGE.md) recorded their engineering conflicts. The upper artwork can potentially be reused, but no revised, validated base-only-storage manufacturing geometry was found in these source groups.

The source directory containing all five original DOCX briefs is:

`recovered/drive-refresh/extracted/FOR CAD ILES-20260918T001452Z-1-001/5 UPDATED SPECS-FOR CAD ILES/` (historical private source; not bundled)

Searchable copies are under the equivalent `research/drive-refresh/text/` (historical private source; not bundled) directory. The archived source is FOR CAD ILES (private source omitted from public handoff).

| Existing STL / original name | Updated document / design | Change or unresolved choice |
|---|---|---|
| Basketball / Forever in the Game | Doc 47; ` 9.5 _Court Legend_ Legacy urn design shown in the provided file image_9cb3aa.docx` | Ashes moved to circular pedestal; 10.75-inch and 10-inch briefs; capacity contradiction |
| Baseball / MVP glove | Doc 46; `74. Home Run Legacy_ urn design shown in image_9c4a6a.docx` | Circular ash base; 13.25-inch brief and two conflicting 10-inch versions; one component-height sum is 10.25 inches |
| Sneaker / Legacy Lives On | Doc 48; ` 71.  _Legacy Ascend Series_ urn design shown in image_f0d019.docx` | Original rectangular base becomes circular; 12-inch and 10-inch references; not a simple rename or scale |
| Midnight Blossom / Timeless Elegance | Doc 49; ` 72. _Black & Gold_ Legacy urn design shown in image_90f88b.docx` | Original top-loaded vessel/lid becomes decorative upper plus bottom-loaded base; lid and mounting need explicit decisions |
| Mom's Tough Love | Doc 50; `70.  _Mom_s Tough Love_ Legacy urn design shown in image_719ed0.docx` | Full-size top-and-bottom-loading language; 10×8-inch 200+ in³ and different 10×6.5-inch “Because I Said So” 150+ in³ proposals; current architecture must be selected separately for display and compact variants |

All five updated sheets also contain companion/keepsake/jewelry specifications. No accessory production STLs or native CAD were found in this recovered packet. The miniature's recurring **4.5 cc** is only **0.275 in³**; confirm that token capacity rather than quietly changing the unit. Doc 50 also contains a 15 cc keepsake. “Companion” needs to mean either a small matching keepsake or a two-person vessel; those are distinct products and capacities.

## Capacity: the gating issue

Retain 200 in³ (3,277.4 cm³) as the inherited adult design target pending owner confirmation; Legacy Lives On originally requested 210+ in³. Do not label an arbitrary 150 in³ chamber as suitable for every adult. Calculate **usable chamber volume with the closure installed**, subtracting insert bosses, seal ledges, mounting structure, fillets and any liner; theoretical volume is not guaranteed usable fill volume.

For a clear circular chamber, `V = π × internal_diameter² × clear_internal_depth / 4`. For a clear rectangular chamber, `V = internal_length × internal_width × clear_internal_depth` before feature deductions.

Using external diameter in place of unknown internal diameter deliberately overestimates capacity. The earlier written base dimensions fail even that generous check:

| Updated design | External diameter × listed clear depth | Impossible-to-exceed cylinder volume | Claimed |
|---|---|---:|---:|
| Court Legend | 8.5 × 2.35 in | 133.35 in³ | 203 in³ |
| Home Run Legacy | 8.75 × 2.35 in | 141.31 in³ | 200+ in³ |
| Legacy Ascend | 8.5 × 2.75 in | 156.05 in³ | 203 in³ |
| Black & Gold | 7.5 × 2.25 in | 99.40 in³ | 200+ in³ |
| Mom's Tough Love | 8 × 2.7 in | 135.72 in³ | 200+ in³ |

The 10-inch sheets frequently propose a 7-inch outside-diameter × 2.5-inch **outside-height** base. Its entire solid envelope holds at most 96.21 in³; subtracting walls reduces it further. Mom's 8×2.5-inch external base is at most 125.66 in³; the 6.5×2.5-inch one is at most 82.96 in³. Base-only storage therefore requires a larger footprint, taller base, smaller capacity class, or a revised visual proportion. Changing printing material does not fix this geometry.

Constructive arithmetic examples, **not finished designs**:

| Clear inner chamber | Gross chamber volume | Consequence |
|---|---:|---|
| Cylinder, 7-inch internal diameter × 5.2-inch clear depth | 200.12 in³ | Almost no feature allowance; exterior base must be taller and wider |
| Cylinder, 8-inch internal diameter × 4.05-inch clear depth | 203.58 in³ | Needs deductions and design margin; wide footprint |
| Box, 7×7×4.2 inches internally | 205.8 in³ | Square footprint plus wall/closure allowance |
| Box, 8×6×4.3 inches internally | 206.4 in³ | Rectangular footprint plus wall/closure allowance |

A 10-inch assembled urn with a roughly 4.5–5.5-inch outside-height base leaves roughly 4.5–5.5 inches for exposed artwork, depending on mounting overlap. That conflicts with the existing 7.5-inch-upper + 2.5-inch-base render proportions. Put an accurate section drawing beside the artwork before deciding which proportions to preserve. Do not promise 200 in³ at a narrow 7-inch footprint and shallow base.

Uniformly shrinking a 200 in³ 12-inch design to 10 inches would reduce volume to approximately 115.74 in³; shrinking from 14 to 10 gives 72.89 in³. Keeping a common adult base and scaling only the artwork could avoid that volume loss, if the finished width/depth and visual proportion work.

## SLA versus MJF: what can be concluded

**SLA and MJF are processes, not material names.** Existing Sculpteo quotes selected **MJF PA12 S nylon**. An alternative request must name the actual photopolymer resin or ask Sculpteo to nominate one.

SLA deserves a quote comparison for the fine artwork, but there is no verified universal rule that it is cheaper for these five large designs. Sculpteo describes size, material consumption, machine occupancy, labor, finish and quantity as cost inputs; an exact comparison needs the same geometry, quantities and quote assumptions. Compare cost after support removal, cleaning, curing, seams, painting preparation and shipping, not raw resin prices. [Sculpteo pricing explanation](https://learn.sculpteo.com/en/how-are-prices-calculated)

Sculpteo's public **Prototyping Resin** is presented for detailed art/prototypes, is UV-sensitive and is explicitly described as unsuitable for production/functional prototyping because of low impact strength. Its material page lists a 200×125×210 mm size limit; the public comparison table instead lists 144×144×174 mm for Prototyping Resin. Obtain written confirmation of the actual resin, machine and limit. These public entries do not establish availability of a suitable large-format end-use resin. [Prototyping Resin](https://pro.sculpteo.com/en/materials/stereolithography/prototyping-resin/), [material comparison](https://pro.sculpteo.com/en/materials/compare/)

PA12 S is a thermoplastic option for functional parts. Sculpteo publishes 370×274×380 mm maximum size, 90 μm layers, and position-dependent accuracy; it also lists depowdering/clearance and wall constraints. Its listed 0.8 mm minimum is not a recommended adult-urn structural wall. Confirm load-bearing walls, insert installation and closure tolerances for this assembly. Generic painting on its catalog page does not contradict Robert's specific statement that **our artistic painting requires an outside supplier**. [PA12 S material guide](https://pro.sculpteo.com/en/materials/jet-fusion-material/pa12s/)

Resin parts need the maker's washing, curing and preparation process. Formlabs describes sanding, cleaning and priming before painting; this supports a sample of the full finish stack. [Post-processing FAQ](https://formlabs.com/global/support/3d-printing-post-processing-faqs/). Its sunlight guidance warns about brittleness/color change and extended UV exposure for functional/load-bearing SLA parts; ask the actual resin supplier about indoor display, transit heat and any claimed outdoor/niche use. [Sunlight guidance](https://formlabs.com/support/What-happens-to-prints-that-are-left-out-in-the-sun/)

Original body extents under the existing millimeter assumption are approximately 232×216×294 mm, 191×191×254 mm, 176×180×271 mm, 178×178×266 mm and 165×170×311 mm. Their current upright envelopes exceed the published SLA limits; a split, alternate orientation or other machine requires supplier assessment. Separate artwork/base construction may help machine fit, but does not guarantee it. STL units/orientation remain unverified.

## Engineering workflow after receiving the new files

1. Preserve original R0 meshes/hashes and raw incoming Tripo exports separately; create a distinct redesign revision map. Old quotes are baseline costs for old geometry.
2. Inspect each incoming mesh to locate artwork/pedestal joins, connected cavities, thin details and overlaps. Compare the new art to its selected reference; old meshes may be useful comparison/reuse material, but no automatic restoration or regeneration is planned.
3. Engineer the selected **ash vessel**, closure and interfaces for each variant: a base chamber for a base-only display route, or a full-vessel/connected chamber for the compact route. Preserve editable mechanical CAD and provide component exports with units, part names, revision and an assembly/section drawing.
4. Retain the artwork as an edited mesh where that is the most faithful route. Native mesh source is editable art but does not become parametric solid CAD merely by exporting STL or automatically converting to STEP. A compact artwork-vessel still needs deliberate walls, filling access and closure geometry.
5. Keep mounting fasteners from opening an unintended path into the ash chamber; verify sculpture load, tipping and transport. For a base-only display route, consider filling/closing the base before mounting fragile artwork. For a connected compact chamber, deliberately design and test the communicating passage and sealed interface.
6. Validate usable capacity, walls, support/drain access, dimensions, attachment fit and seal compression. Then make an inexpensive closure/mount coupon and one representative finished sample before duplicating the whole family.

Mom is already generating the new artwork. Its quality and engineering scope remain unknown until receipt. Expected engineering is **variant-specific storage chambers and closures plus any needed artwork separation, mounting and resize/rework**; new bases are not assumed for every variant. Existing paid art may still help where useful, without overruling Mom's current handoff.

## Exact Sculpteo questions

- After the new files/specifications are received and scoped for disclosure, quote the selected revision in a named suitable SLA resin beside MJF PA12 S where relevant; identify detail level, build-size limits, needed cuts/supports, preparation and exclusions. If SLA is unsuitable, nominate an economical end-use resin/process. Keep old R0 prices labeled historical rather than implying equivalent geometry.
- Review the new **design-intent** sheets with architecture defined by variant: display/base-only where feasible, compact/full-vessel or connected base-plus-upper. Can the supplied artwork be retained, and which chamber, closure, mounting or mesh changes are required? Quote engineering separately from print cost.
- Can they supply or coordinate editable mechanical CAD/STEP for the ash vessel and closure, revised meshes and assembly drawings; what does their design service include and cost?
- Itemize the actual parts for each route. Separate artwork/base pricing and mixed-process or standard-base alternatives apply where the chosen architecture uses those modules; compact full-vessel pricing needs its own chamber/closure scope. Combine common base quantities only where a compatible standard base is actually selected.
- Assess two **finished assembled** variants: tentative 12-inch display and maximum-10-inch niche candidate. Owner must still choose confirmed width/depth/capacity per variant; ceiling plus process/finish tolerance requires clearance margin rather than nominal exactly 10 inches.
- Do not repeat unsupported 200+ in³ base claims. Ask which corrected base dimensions can meet the selected usable volume and retain acceptable appearance.
- Separate miniature keepsake and jewelry development quotes; include actual cavity, closure, casting/metal process and whether print files alone or cast patterns are required.

## Decisions needed to complete the brief

1. Confirm 12-inch display size as the new standard or retain larger art selectively. Establish finished width/depth for both size variants and select storage architecture separately for the 10-inch and display versions; base-only is no longer assumed for both.
2. Confirm 200 in³, 210 in³ or a deliberately smaller size class **per SKU**, and whether an inner bag/liner is part of the product.
3. Choose the first base shape and allowable height/footprint; approve revised proportions after capacity is reconciled.
4. Select which updated inscription/design variant of Home Run and Mom's Tough Love is intended.
5. Confirm companion/keepsake meanings and actual capacities, especially 4.5 cc miniatures and the two-person option.
6. Obtain exact opening/interior dimensions and policies for the intended Inglewood, Rose Hills and Forest Lawn niches. Mom's 10-inch research is recorded as rationale; this review has not verified a universal rule or a particular niche. Compatibility requires height, width, depth and access clearance.

This specialist report stays local in `output/research/modular-manufacturing-2026-10-04.md`; no GitHub push was performed.
