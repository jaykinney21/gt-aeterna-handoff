# Every Step Legacy — completion checklist

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

Updated September 19, 2026. **Digital review candidate delivered; not a finished artistic design or manufacturing release.** This checklist covers the original 11-inch Every Step Legacy only. The 10-inch, keepsake and jewelry variants need separate engineering.

## Delivered this pass

- Editable [Blender candidate (large model download)](../README.md) and [reproducible Blender Python source](../output/cad/sculptural_candidate.py). No additional application or paid API needed.
- Separate millimeter [shell STL (large model download)](../README.md) and [metal plate geometry STL (large model download)](../README.md). These are review geometry, not approved print or metal fabrication orders.
- [Measured validation record](../output/cad/sculptural-validation.json), including cavity, topology and independently re-read STL bounds.
- Front, side, rear, perspective, bottom and cutaway-section review PNGs in `output/cad/`.
- Tapered asymmetrical vessel with sloping fixed top, connected upper/base cavity, 70 × 50 mm bottom opening, 98 × 78 × 3 mm plate, four provisional 4.5 mm screw clearance holes, 90-degree countersinks, insert bosses/pilot holes, and provisional gasket seat.
- Rear athletic tread, vertical lacing and base texture are now integrated raised geometry in the shell STL, with editable hidden source objects retained. Broad bronze ribbon, base bands and inscriptions remain visual guides outside the shell STL. All require artistic refinement and process-specific detail sizing.

## Capacity and dimensional decisions

The first 5.5-inch body assumption produced only **192.46 in³** after taper/hardware: failed. A 6-inch body with a sloped cap produced **199.76 in³**: failed. Those measurements are retained as JSON history.

The current proposed **160 mm / 6.299-inch body width** produces **205.10 in³ / 3.361 L** conservative modeled empty volume after deducting boss cylinders, with 11-inch overall height and 5-inch body depth. Width was not dimensioned in the source, so this is a new explicit assumption requiring design review. The capacity allowance is only about 2.6%; do not spend it casually on later inward detail. No catalog capacity claim is approved by this model.

Plain base shell is 169 mm diameter, with shallow integrated exterior texture; visual bands bring the overall width to 171.45 mm / 6.75 inches. Base floor is 6 mm, body radial wall allowance is 4 mm. The bottom plate pocket is 98.6 × 78.6 mm, giving nominal 0.3 mm clearance per edge; that allowance has not been validated for any process. Gasket seat is a 78 × 58 outer / 74 × 54 inner rectangular annulus, 1 mm deep above the plate, leaving nominal 2 mm floor above it. Bolt centers are ±43 × ±33 mm, clear of the gasket route; the annular groove is cut after the bosses so they cannot refill it. Nearest pilot-to-groove distance is approximately 3.16 mm. An independent check of the saved mesh sampled 164 points around the entire gasket centerline: every underside ray reached the groove roof at 4.000 mm (within 0.000002 mm), confirming the modeled route was not refilled by bosses. This verifies geometry, not sealing performance. Hardware and seal are placeholders for supplier dimensioning.

## Gate A — finish the digital design

- [x] Source document 63 identified; source reference board visually inspected.
- [x] Fixed/decorative top and functional bottom chosen as provisional baseline; do not add a second opening silently.
- [x] Height/depth preserved and body-width assumption recorded.
- [x] Connected cavity explicitly modeled and measured after conservative hardware displacement.
- [x] Separate shell/plate files exported; manifold-edge and STL dimensional checks pass; shell, plate and measured cavity each have one connected mesh component.
- [ ] Owner reviews silhouette against original: current loft approximates the reference's layered/folded sculptural shell; initial tread and lacing are present but their scale/style need review. It is a capacity/mechanical candidate, not a source-faithful finished artwork.
- [ ] Integrate broad ribbon, athletic texture, lacing, cap pattern and bronze rims at actual manufacturing detail sizes.
- [ ] Project/engrave front/rear/base text, add personalization region and inspect all text at physical size. Current flat text guides are not manufacturing geometry; rear text is not final placement.
- [ ] Check actual minimum normal wall thickness, self-intersections, thin triangles, screw/boss ligament thickness, fastener engagement and powder/support evacuation path. Zero nonmanifold edges alone does not pass these tests.
- [ ] Select exact screw, insert, gasket and metal stock; verify countersink diameter/depth against actual screw heads, finite corner radii and compression. Check gasket sealing path around fasteners.
- [ ] Re-measure cavity after final detail, retain 200+ in³ minimum with margin, and recalculate assembled bounds including all relief/finish.
- [ ] Produce dimensioned assembly/section drawing, BOM and mechanical BREP/STEP solids when dimensions are settled. Do not relabel triangulated STL as editable engineering CAD.

**Gate A exit:** editable source, final separate mesh parts, mechanical exchange/drawings, stated material/process assumptions and a complete validation report. No production-ready label until subsequent gates pass.

## Gate B — supplier process review

- [ ] Supplier selects material/process and confirms wall thickness, supported overhangs, access for depowdering/draining and surface preparation.
- [ ] Supplier approves tolerances, compensated fit, threaded-insert method, fasteners, gasket and a documented sealing procedure.
- [ ] Confirm paint/finish durability, internal cleanliness and hardware corrosion compatibility.
- [ ] Quote closure/insert coupon plus texture/finish coupon before committing to full assembly; record revision identifier and drawing.
- [ ] Receive DFM approval or document changes; regenerate all files and repeat Gate A checks.

**Gate B exit:** supplier-approved process-specific prototype package and separately priced tests. No sample order has been placed.

## Gate C — physical validation

- [ ] Test screw fit, insert retention, repeated assembly and seal compression on coupon.
- [ ] Evaluate actual texture, relief and text legibility, finish adhesion and handling/scuff resistance.
- [ ] Full-size prototype: fit and filling access, weighed/measured usable capacity, stability, seams and handling.
- [ ] Define/test containment under intended use; do not promise waterproofing from a gasket drawing.
- [ ] Packaged shipment/drop evaluation, arrival inspection and repair/replacement protocol.
- [ ] Approve physical golden sample, photos, revision-controlled files and QC acceptance criteria before listing.

**Gate C exit:** physically validated product specification. Only then use verified capacity/dimensions and real product photos in the catalog or Amazon listing.

## Current next action

Review the widened silhouette and broad ribbon against the original, then refine the artistic layers while preserving the measured cavity. Supplier responses should determine mechanical tolerances before any paid full-size prototype. Additional paid image-to-3D software would not resolve these engineering decisions.
