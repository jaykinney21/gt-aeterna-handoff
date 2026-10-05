# New Tripo STL intake and specification checklist

October 4, 2026. **Current handoff:** Mom is generating new models in Tripo and will provide the new files with revised specifications when ready. Hold the older specification/document package; do not distribute it as the next quote package. No new models are claimed received or reviewed in this checklist. No vendor email, disclosure, order or generation was performed.

This checklist is the next intake workflow. It supersedes any earlier suggestion to send the recovered updated sheets immediately. The old files, specifications and quotes remain historical comparison evidence. The new files need their own revision identity; an attractive Tripo preview does not establish an engineered urn.

Related local work: [manufacturing/materials review](modular-manufacturing-2026-10-04.md), [AI mesh workflow](ai-mesh-pilot-2026-10-04.md), [cemetery fit research](cemetery-fit-2026-10-04.md), [recovered-spec reconciliation](../DRIVE-REFRESH-TRIAGE.md), [original STL measurements](../FINAL-STL-FOLDER-TRIAGE.md).

## 1. What Mom should supply for each new design

One named folder or ZIP per design, with larger display and compact variants clearly separated:

- [ ] **New geometry:** the original downloaded STL, plus a separate STL per component if available. Label whether each part is artwork, ash vessel/base, lid/plate, mounting part or an unverified candidate. Preserve the original before repairing, hollowing or resizing it.
- [ ] **Appearance:** the GLB/OBJ or other available mesh export with required texture files, and front/back/side/top/bottom views. Standard STL does not preserve the intended portable color/texture appearance; the paint instructions and geometric relief must be specified separately.
- [ ] **Reference:** the actual images used in Tripo, intended design name, latest specification and which view/details govern if references disagree. Mark inferred/generated unseen views so they are not mistaken for original design evidence.
- [ ] **Scale:** explicit units and orientation, intended finished assembled height × width × depth, and the current exported size if known. “10-inch” refers to the entire finished assembly, including base, lid, feet and protrusions.
- [ ] **Storage intent:** which part or connected parts hold ashes, required usable capacity, filling opening and closure concept. Mark any generator-created capacity/wall/closure as unverified.
- [ ] **Revision:** export date, version label, source project identifier/link if available and a short list of changes from the previous quote. Include an editable Blender/source project if one exists; absence of it is not a reason to invent one.
- [ ] **Finish:** intended color zones, wood/leather/suede or metallic effects, geometric lettering versus paint/engraving, personalization area and whether use is indoor or potentially exposed.

The user need not complete an engineering specification before giving us the artwork. Missing details become a clear issue list or supplier engineering request rather than an assumed fact.

## 2. Provisional family map

These relationships connect historical names and themes; they do not automatically name or certify Mom's new exports. Confirm each new model against its images and specification before assigning the final SKU.

| Historical STL family | Original quoted design | Recovered updated design candidate | What to confirm on the new files |
|---|---|---|---|
| Basketball | Forever in the Game | Court Legend | Snake/basketball artwork, intended inscription, number/position of snake heads, size and new storage layout |
| Baseball | MVP glove | Home Run Legacy | Glove and three-ball composition, “Leave It All on the Field” versus alternate wording, new pedestal or full vessel |
| Sneaker | Legacy Lives On / blue sneaker | Legacy Ascend | Blue sneaker silhouette, rectangular versus circular support, wording, exact new footprint |
| Midnight Blossom | Timeless Elegance floral | Black & Gold / Love Blossoms Forever | Vase/lid silhouette, floral relief, whether upper now contains ashes or is decorative |
| Mom Tough Love Diorama | Mom's Tough Love | Mom's Tough Love / separate “Because I Said So” variant | Which figures/scene/saying is intended; keep different designs and 150/200 in³ proposals distinct |

Do not force new artwork into the original five if it represents a different design. Assign a new design record when appropriate.

## 3. Freeze storage architecture and size per variant

| Variant | Current direction | Required decisions |
|---|---|---|
| Larger display, tentatively 12 inches assembled | Decorative artwork plus a base may hold all ashes | Confirm whether 12 inches replaces the old 12–14-inch range; specify capacity and base W×D×H. Base-only remains conditional on actual usable volume |
| Compact, maximum 10 inches assembled | **200 in³ usable storage** in a full hollow vessel, or a connected upper-plus-short-base chamber; vase without separate base remains an option | Confirm width/depth, exact niche envelope, closure and connected fillable volume. Do not require the shallow base alone to hold 200 in³ |

The spoken “200 cubic feet” is treated as a transcription error for **200 cubic inches**, approximately **3.28 liters**, subject to owner correction. The old blue-sneaker brief requested 210+ in³; confirm the new display target instead of silently copying or lowering it.

Record one storage choice per variant:

- [ ] **Base only:** upper is decorative. Its hollow void contributes no ash capacity.
- [ ] **Full vessel:** the vase or figurine is itself the engineered ash chamber, with an integrated foot or optional minimal pedestal.
- [ ] **Connected upper and base:** a usable connecting passage joins the ash-storage spaces; its seal/interface, access and fillability are engineered.
- [ ] **Independent compartments:** define separate access and whether remains must be divided. Do not add an inaccessible decorative void to the advertised capacity.
- [ ] **Separate display and ash vessel:** identify which item actually stores ashes and whether the base/vessel alone is intended for cemetery placement.

The suggested larger base aesthetic—roughly 7 inches wide and 2–4 inches high—cannot promise 200 in³ without further dimensions. A **7-inch outside-diameter × 4-inch-high cylinder** has a gross ceiling of **153.94 in³**. A **7×7×4-inch outside square** has a ceiling of **196 in³**. Both are too small even before walls and closure. A 7-inch-wide rectangular base needs its depth defined; with 4-inch height, even a zero-wall box requires depth greater than 7.14 inches for 200 in³. These are envelope calculations, not validated cavity capacities. See the manufacturing review for corrected proportions and options.

## 4. Initial file inspection after receipt

Keep the raw export and any repaired version separately. Record filenames, byte hashes, units, revision and inspection result in a component manifest.

| Check | What we establish | How unresolved issues are handled |
|---|---|---|
| Identity and appearance | New mesh matches the selected front/rear/side references and component roles | Record missing/extra forms, asymmetry and conflicting source views for owner review |
| Units and orientation | Known intended scale; upright direction; component and assembled bounds | Do not silently scale a unitless STL or call a body-only height assembled height |
| Mesh condition | Closed/oriented surfaces where required; holes, nonmanifold edges, duplicate/internal faces, self-intersections, detached fragments and overlapping shells identified | Preserve original; cost/perform specific repairs only after their effect is clear |
| Geometry versus texture | Relief, seams and lettering actually exist in the mesh where expected | Paint-only detail does not become printed geometry; define how each feature will be produced |
| Hollowing and fillability | Actual connected ash cavity, access opening and manufacturing drain/cleaning paths identified | A solid artwork, trapped uncured resin, unremovable powder or disconnected void requires engineering, not a capacity claim |
| Walls and support | Wall-thickness distribution, thin features and weight-bearing sculpture joints identified | Apply the selected supplier's actual process/material rules; no tolerance or wall dimension is approved by this checklist |
| Assembly | Part separation, overlap, mounting footprint, closure engagement and assembled envelope understood | A slice or scaled file does not automatically create an engineered joint |

Tripo supplies mesh geometry. It can be an efficient starting point for the artistic surface; STL export alone is not parametric CAD or proof of a functioning urn. Keep useful artwork editable as mesh, and use engineered CAD for chambers, closures, insert bosses, gasket seats and controlled interfaces where appropriate. An automatic mesh-to-STEP conversion does not create a meaningful feature history.

## 5. Minimum package before requesting a budgetary quote

This stage can proceed with clearly disclosed engineering gaps. We do not need to pretend the model is production-ready to ask a supplier for manufacturing and CAD-assistance pricing.

- [ ] Selected new revision and exact files to assess, with units, component roles and a manifest.
- [ ] Reference images and revised **design-intent** sheet reflecting the actual storage route and selected variant.
- [ ] Intended finished W×D×H, required capacity and measured versus target values clearly distinguished.
- [ ] As-supplied status: solid/hollow/unknown; mesh repairs, closure, capacity, wall and mounting work listed as unresolved where applicable.
- [ ] Quantities stated exactly by design and variant; sample and repeat-unit/batch prices separated. A quote quantity is not an order commitment.
- [ ] Ask for a named suitable SLA resin comparison against MJF PA12 S where relevant, with limitations if the material or machine is unsuitable. Confirm actual build size and split/assembly requirements.
- [ ] Ask whether they can reuse the new artwork and supply engineering/CAD corrections; itemize one-time design cost separately from printing.
- [ ] Specify needed output: printable component files, editable mechanical CAD where commissioned, dimensioned assembly/section drawings and a change list. Confirm ownership/delivery of paid design work in the proposed scope.
- [ ] Itemize print, supports/removal, wash/cure or depowdering, surface preparation, artistic finishing, closure/mount hardware, assembly, personalization, packaging and freight to the sample destination. State exclusions and outside-finisher handoff.
- [ ] Quote lead time, engineering dependencies, sample review stages, manufacturing location and whether repeat production uses the same material/process.
- [ ] Verify recipient and authorized package before disclosure; use this new revision instead of resending the held older document package.

Give the vendor explicit instructions to identify missing inputs and quote the cost to resolve them. **A budgetary quote for an unverified art mesh is not a firm quote for a functional 200 in³ urn.** Compare old and new prices only after recording geometry, component count, size, finish, quantity and inclusion differences.

## 6. Required before a firm manufacturing quote and production release

For a **firm manufacturing quote**, supplier and owner need agreed geometry/revision, dimensions, component/material/process choices, actual scope, quantities and finish assumptions. Any remaining engineering can be priced as a separate staged service, with the final print price contingent on the approved revised geometry. Do not attach “production-ready” to a candidate merely because a supplier can upload or quote it.

Before **production release**, complete and retain the following:

- [ ] **Usable capacity:** measure the closed connected chamber with hardware and liner intrusions accounted for; validate filling through the actual opening. Solid bounding-box volume and disconnected CAD voids do not count.
- [ ] **Closure:** defined access direction, plate/lid shape, thread or fastener details, chosen insert and screw sizes/engagement, gasket geometry/material, and assembly method. Hardware clearances and torque depend on the chosen components/process; no new value in this checklist is an approved tolerance.
- [ ] **Mounting:** secure attachment, antirotation and loading provisions where needed; removable artwork must not accidentally open the ash chamber. Any intentional chamber penetration or shared interface needs a designed seal.
- [ ] **Printable engineering:** supplier accepts minimum walls, thin details, orientation, supports, drains, cleaning access, fit allowances and maximum build size for the exact resin/powder and finish. A watertight mesh means closed geometry, not proof of a physically airtight or waterproof product.
- [ ] **Assembly and physical samples:** closure/mount test pieces, then a representative complete sample in the selected production material and finish; review capacity/fill access, fit, repeatable closure, loaded stability, handling and transport. Agree the actual test method and pass criteria before testing.
- [ ] **Finished appearance:** owner reviews front/back/both sides/top/base and text legibility; colors/textures, surface defects, seam locations and personalization are accepted on the physical sample.
- [ ] **Cemetery fit where claimed:** exact property/opening/internal W×D×H and material/placement rules confirmed; include finish thickness, production variation and insertion clearance agreed with cemetery/manufacturer. Nominal exactly 10 inches is not sufficient evidence of fit.
- [ ] **Released package:** revision-controlled component files and drawings, materials/finishes, hardware bill of materials, agreed tolerances, assembly/filling instructions and sample approval. Any production change affecting capacity, fit, strength or finish requires review.

No universal cemetery acceptance, exterior exposure durability, airtightness, waterproofness or permanent seal is established by the current documents or this checklist.

## 7. Keepsakes and jewelry are separate quote packages

- [ ] Clarify “companion urn”: matching small keepsake versus a two-person vessel; name and specify capacity separately.
- [ ] Create a separate model/specification per miniature, pendant, bracelet component and keychain; preserve design-family linkage without treating them as scaled full-size urns.
- [ ] Confirm ash volume and unit. Existing 4.5 cc miniature proposals mean approximately 0.275 in³, while some older “companion” guidance refers to hundreds of cubic inches. These are different products.
- [ ] Specify fill opening, access/plug/thread, seal, bail/chain/clasp and load-bearing attachment. Readability and wall thickness need checks at the small finished size.
- [ ] Ask the jewelry supplier whether the needed file is a cast pattern or direct-manufacturing geometry and who applies shrinkage/tooling allowances. Keep final metal, plating, resin and finishing quotes distinct.
- [ ] Include QR/personalization requirements separately; aesthetic artwork is not proof that a tiny printed or engraved code will scan after finishing.

## 8. Immediate next handoff

**Now:** await Mom's new Tripo files and revised specifications; no extra API account/key is needed to prepare that handoff. **On receipt:** preserve and inventory the files, reconcile the family/variant map, render texture-free comparison views, inspect the geometry and issue a short design/engineering gap list. **Then:** assemble the new scoped RFQ package or request explicitly itemized engineering assistance for what is missing. Firm production decisions follow geometry and physical-sample review.

This document is local at `output/research/new-stl-intake-and-specification-checklist-2026-10-04.md`. No GitHub push was performed.
