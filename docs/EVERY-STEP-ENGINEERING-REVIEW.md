# Every Step Legacy — independent engineering review

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 19, 2026. Scope: original 11-inch urn only. This is digital design review, not manufacturing approval.

## Source requirements and decisions

Source document 63 explicitly specifies bottom loading, a flush rectangular metal plate with four countersunk machine screws and brass inserts, a connected upper/base cavity, 11-inch height, 6.75-inch widest diameter and 200+ cubic inches. The top is described as a pill-shaped lid but no second filling opening is specified; the current fixed decorative top is the documented working interpretation. The source does not dimension the body width. The proposed 160 mm body width therefore needs owner approval.

The 10-inch version specifies 150+ cubic inches and is a separate future design. Neither it nor the keepsake/jewelry variants is included in this model review.

## Independent baseline checks

Read-only checks were run in Blender against the saved sculptural-candidate file, separately from its generation script:

| Check | Result |
|---|---|
| Measured conservative cavity | 205.1025 in³; only 2.55% above the 200 in³ target |
| Shell, plate, cavity connected components | One each |
| Nonmanifold edges | Zero for all three |
| Plate dimensions | 98 × 78 × 3 mm |
| Shell bounds excluding visual-only objects | 170.300 × 169.650 × 279.400 mm |
| Gasket centerline | All 164 underside rays reached z=4.000 mm within 0.000002 mm |
| Degenerate triangle screen | 12 shell triangles below 1e-10 mm² after triangulation; plate/cavity zero |
| Nonadjacent triangle BVH overlap screen | Seven shell pairs flagged; this screen includes possible touching/coplanar numerical artifacts and is not a conclusive self-intersection test |
| Inner sidewall normal-ray sampling | 1,493 samples from triangulated cavity faces; minimum 3.254 mm, maximum 4.845 mm in the sampled sidewall region |

The tiny triangle/overlap findings were sent to the modeling specialist for cleanup and repeat inspection. Outer relief ray sampling encounters tangencies and is unsuitable for a minimum wall claim. Inner cavity normals, with cavity and shell transformed into the same coordinate frame, give a useful sampled sidewall minimum of 3.254 mm. This is not exhaustive and excludes the base, hardware and top. The nominal 4 mm radial construction allowance must not be published as a verified 4 mm minimum wall.

## Required engineering work after visual approval

1. Select the supplier process and exact resin/polymer. Recheck minimum normal wall, relief size, support or powder removal, and finish allowance for that process.
2. Select real screw, insert, plate stock and gasket specifications. Current pilots, countersinks, clearances and groove are provisional. Check insert engagement, remaining ligament, gasket compression and finite groove/plate corner radii against actual components.
3. Validate the 70 × 50 mm filling opening with the intended filling method and removable cremains bag, if one is intended. A clear geometric opening does not prove convenient filling or cleaning.
4. Recalculate usable cavity and assembled bounds after all geometry, inserts and finish allowance are fixed. Retain margin above the target; validate physical usable volume later.
5. Confirm the access path permits complete support removal, depowdering or resin draining and cleaning. Bottom access alone does not prove process feasibility.
6. Supply dimensioned closure/section drawings and a bill of materials. Mesh STL is a printing exchange format; the editable Blender model is not a mechanical BREP/STEP source.
7. Test a closure/finish coupon, then a full-size prototype for fit, insert retention, repeated assembly, containment, fill access, capacity, stability, handling and packaging. Approve a physical golden sample before production claims.

Useful closure dimensions for that supplier review: the modeled floor above the groove is nominally 2 mm; the rectangular access opening to the inner edge of the groove leaves a nominal 2 mm land on each side; 9 mm countersink outer diameter at bolt centers ±43 × ±33 mm leaves only 1.5 mm to the 98 × 78 mm plate edge. These are design arithmetic, not strength or seal validation. Confirm whether a fabricated rectangular gasket, a formed cord gasket or a revised groove is appropriate; do not assume a standard circular O-ring fits the current sharp rectangular route.

## Human review priorities

First review silhouette, layering, texture density, typography and bronze placement against the source image. Review the rear personalization region and bottom assembly separately. Feedback can reference numbered views and identify a location/change: “Front view: make the divider narrower above the text,” or “Rear view: reduce tread density.” Physical finish realism and touch cannot be approved from renders alone.

## Refinement v2

Read-only inspection of [the saved v2 Blender file (large model download)](../README.md) completed. Reproducible checker: [independent_review.py](../output/cad/independent_review.py); raw results: independent-review.log (private source omitted from public handoff).

| Independent v2 check | Result |
|---|---|
| Authoritative shell, plate and cavity | One component and zero nonmanifold edges each |
| Degenerate triangle screen | Zero below 1e-10 mm² on all three |
| Shell nonadjacent BVH overlap screen | Zero flagged pairs |
| Conservative cavity after triangulation | 205.1025 in³; generator's 205.1041 in³ differs slightly by triangulation/numerical evaluation |
| Shell exported envelope | 171.45 × 171.45 × 279.40 mm (6.75 × 6.75 × 11 in) |
| Plate | 98 × 78 × 3 mm |
| Independent binary STL reread | Shell 15,900 triangles; plate 2,596; exact binary byte lengths and finite coordinates pass; measured bounds match the values above |
| Gasket roof | 164/164 rays pass; z=4.000 mm within 0.000002 mm |
| Inner sidewall normal sample | 1,493 rays; minimum 3.254 mm |
| Outer sidewall normal sample | 1,683 rays; minimum 2.992 mm |

The two wall samples use different directions and positions; neither proves a global minimum, nor covers all hardware, floor and cap regions. Supplier review must account for walls thinner than the nominal radial 4 mm. These checks support a digital review candidate, not strength, sealing or production approval.

**Actual integration scope:** the sweeping ribbon and lower two bronze rim rings are part of the validated shell. Upper rings, folded/athletic relief and projected lettering remain separate visual geometry after their union attempts failed the nonmanifold-edge gate. Those failed unions were rolled back rather than included in the exported shell. Therefore the rendered design is more detailed than its current manufacturing STL. Integrating and checking those details is still required after the owner approves their appearance. The v2 validated shell also does not include the baseline candidate's integrated athletic detail; do not treat v2 as a fully detailed successor ready to print.

The baseline's tiny-triangle and overlap flags are absent from the validated v2 shell. Final physical/process gates above remain open.
