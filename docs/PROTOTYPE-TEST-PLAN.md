# AETERNA prototype experiments

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 16, 2026. Proposed tests; not manufacturing instructions or completed results. Preserve recovered originals. Use surrogate contents only during development.

## 1. Establish the existing design's scale and capacity

Input: Midnight Blossom body and lid under `recovered/gmail/midnight-blossom/Midnight Blossom/` (historical private source; not bundled). Existing measurement record: `research/gmail-drive/midnight-stl-inspection.json` (historical private source; not bundled).

| Existing observation | Result | What remains unknown |
|---|---|---|
| Body bounding box in STL coordinates | 178.102 × 178.132 × 265.516 | Units are absent from STL; confirm with creator/drawing |
| Lid bounding box | 126.976 × 126.976 × 41.998 | Assembled position and engaged depth |
| Exact-coordinate edge check | Zero boundary/nonmanifold edges in prior inspection | Intersections, thin walls, fit and strength |
| Inherited adult capacity minimum | 200 in³ = 3,277,412.8 mm³ = 3.2774128 L | Actual usable cavity after lid/liner intrusion |

The correct capacity measurement is a separate closed solid representing the usable empty interior with the closure engaged. The solid volume of the body's material is not capacity. Document the fill boundary, inaccessible spaces and any liner allowance. Cross-check that cavity independently using section integration or another CAD tool, then verify the physical sample with a calibrated method appropriate for the material.

Inspect wall thickness across the floral details, neck, base and transitions. Locate self-intersections and trapped volumes. Reposition body/lid into a documented assembly without changing their geometry. Record the source hash, units, orientation, transformations and revision. Stop before manufacturing if units, capacity or closure assembly remain ambiguous.

## 2. Compare two editable-CAD workflows on a controlled task

Run build123d and Zoo on the same deliberately simple test vessel before spending time reproducing the flowers. No API subscription, upload or install was performed in this research pass.

Use this benchmark brief:

> Create an engineering test vessel in millimeters, not a saleable urn. Use a cylindrical empty cavity 150 mm in diameter and 190 mm usable height. Add a nominal 3 mm wall and 4 mm closed base. Keep the closure outside the defined usable cavity or explicitly subtract any intrusion. Export the cavity as a separate reference solid. Supply separate body and closure components, editable parameter source, STEP, STL and a section drawing. Name all dimensions. Do not invent a validated thread or gasket specification. Mark the closure interface as provisional. Report cavity volume and body volume separately. Regenerate after increasing cavity height to 200 mm, without manual mesh scaling.

Analytical reference: π × 75² × 190 = approximately 3.358 L, or 204.89 in³, **before any intrusion**. This deliberately has little margin; it is a CAD measurement test, not the selected production design. At 200 mm height it becomes approximately 3.534 L / 215.68 in³. These values provide an independent check on the CAD output.

Acceptance criteria for the benchmark:

- Editable named dimensions and successful regeneration at both heights.
- Separate valid body, closure and cavity solids; correct millimeter scale on re-import.
- Cavity volume within 0.1% of the analytic value for this simple cylinder. This is a software benchmark threshold, not a production tolerance.
- STEP and print-mesh exports agree within the declared tessellation tolerance; no unintentional filled cavity or missing component.
- Sections show wall/base and closure intrusion; no claim that a provisional interface is manufacture-ready.

Record elapsed work, manual repairs, API costs if any, exports, screenshots and defects. Prefer the workflow that reliably produces maintainable geometry. Neither visual appeal nor a successful export alone is a pass.

## 3. Print interface and finish coupons

Have the selected designer/supplier propose a closure with process-specific tolerances. Compare a threaded option with an off-the-shelf threaded insert or bottom plate if appropriate. Ask how coatings and finishing affect the mating surfaces.

Order a short neck-and-closure coupon with at least three supplier-approved clearance variants, clearly marked, in the intended process/material. Request masking of functional surfaces if appropriate. Include representative floral relief and a flat finish panel, with an approved color/gloss reference. Coupon dimensions should reproduce the actual interface diameter; a tiny scaled thread is not an equivalent test.

Proposed screening record: dimensions before/after finish; hand assembly without forcing; cross-threading; looseness; debris; visible damage; and behavior over 50 opening/closing cycles. Fifty cycles is our proposed development screen, not a certification standard or proof of service life. Agree torque and fit limits with the designer before judging pass/fail.

Ask the supplier to distinguish raw print, smoothing, primer, base color, detail painting, clear coat and labor. Retain an approved finish sample. Record odor, tackiness, paint transfer and cleaning compatibility under the supplier's stated cure/use conditions.

## 4. Full-size prototype

Use the accepted interface revision and finish. Check actual usable capacity after assembly, wall/base consistency, stable support, interior cleanliness, lid retention and handling. Verify the opening can accept the intended liner/bag and loading method. Record empty weight and filled test weight; agree rated fill mass with the engineer rather than deriving it from volume alone.

Use a contained, benign dry surrogate to inspect leakage at the closure. Do not assume a water test represents fine-particle containment, or immerse an unapproved material. If using water for volume measurement, use a suitable liner and account for it. Do not label the product airtight, waterproof, biodegradable, ceramic or metal unless the actual product supports that claim.

Photograph all sides, underside, interior, closure and defects against the drawing revision. A cosmetic sample and a functional sample may initially be different materials; do not confuse which properties each has demonstrated.

## 5. Packaging and release

After the sample passes, obtain a packaging specification and choose a transit test protocol with the packaging supplier or lab for the actual packed dimensions and weight. A casual drop is exploratory, not certified shipping performance. Record breakage, abrasion, lid movement and cosmetic damage after testing.

Production release requires a frozen file/drawing revision, approved physical sample, agreed measurable tolerances and cosmetic standard, usable capacity evidence, inspection plan, packaging, landed cost and defect/replacement terms. The sample is not evidence that every batch will match; define incoming inspection and batch traceability.

## Quote comparison sheet fields

Record supplier, date, currency, exact revision, process/material grade, quantity (1/10/25/50), CAD work, tooling, body/lid, hardware, finish, assembly, inspection, packaging, freight, duties/taxes assumptions, delivery term, lead time, payment terms, defect remedy, sample-credit policy and total landed cost. Separate nonrecurring engineering/tooling from recurring unit cost. Ask for delivered pricing to a confirmed postal code; do not invent one.

Gate decisions: top-loading prototype exception; verified scale and capacity; selected material; approved coupon; approved finish; authorized full sample budget; accepted sample; authorized production quantity. No purchases are authorized by this document.
