# Every Step Legacy — modeling brief and first feasibility study

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 19, 2026. CAD lane started. This is an editable engineering-envelope experiment, not an artistic model, printable product or verified capacity claim.

## Source and product identity

Use document 63, SKU **LN-SPT-EVERYSTEP**, the original 11-inch Every Step Legacy. Do not substitute Legacy Step, Legacy Ascend or the conflicting DOC NOTES interpretation.

- [Recovered specification](source-documents/63-1-every-step-legacy-urn-10-keepsake-jewelry.md)
- [Original reference board](../references/source-documents/63/image1.png), visually inspected for this study.
- [Existing tool research](CAD-TOOL-READINESS.md).

## Source dimensions versus assumptions

| Item | Source requirement | Experiment treatment |
|---|---|---|
| Height | 11 inches overall, 9-inch sculpture above 2-inch base | 279.4 mm overall; base 50.8 mm. Top included in total height. |
| Maximum size | Base 6.75-inch diameter; sculpture depth 5 inches | Base diameter 171.45 mm; body depth 127 mm. |
| Body width | Not explicitly dimensioned | **Assumed 5.5 inches / 139.7 mm**, with sensitivity study from 4.5–6.75 inches. This is not inferred as an exact measurement from the picture. |
| Shape | Asymmetrical sweeping athletic vessel | Straight elliptical body for capacity screening only; original silhouette still to be modeled. |
| Walls | Thick structural polymer walls; no thickness supplied | **Assumed 4 mm** walls, top and base floor. Requires supplier/material review. |
| Capacity | Minimum 200 cubic inches spanning connected base and upper vessel | Closed connected empty-volume model; hardware intrusions and sculptural narrowing not yet deducted. |
| Access | Flush rectangular metal bottom plate, four countersunk screws and brass inserts | Location/intent recorded; plate, aperture, bosses and sealing system not modeled. |
| Top | Pill-shaped lid, confusing 6.75-inch “diameter” dimensions | Fixed/decorative top is the working interpretation; functional opening remains unresolved. |
| Finish | Matte black, bronze divider/lacing/text/rims; modeled athletic texture | No finish or decorative geometry in the engineering study. |

The reference board misleadingly places a 200-cubic-inch statement beneath the base compartment. Even the **entire solid exterior of a 6.75-inch-diameter, 2-inch-high cylindrical base is only 71.57 cubic inches**. Its actual empty capacity must be smaller. The written specification's connected upper-and-base cavity is essential.

The 10-inch proposal is a separate 150+ cubic-inch variant; 7.5-inch body plus 2-inch base leaves 0.5 inch unallocated. It and the miniature/jewelry parts are deferred from this first envelope experiment. No cemetery-fit or adult-capacity marketing claim has been validated.

## Work completed

- Confirmed installed **Blender 5.2.1 LTS** and successfully ran its Python engine locally. Sandboxed background startup crashed; the same factory-startup command succeeded through approved execution outside the sandbox.
- Created [editable Blender envelope (large model download)](../README.md), [regenerating source](../output/cad/envelope_study.py) and [measurement record](../output/cad/feasibility.json).
- The scene contains wireframe outer base/body envelopes and one solid representation of the **empty connected cavity**. The solid is empty space, not material to print. Scene units are millimeters, with 0.001 meter unit scale.
- Measured the boolean-unioned cavity using its mesh volume. It is closed, has zero nonmanifold edges, and agrees with the independent analytic cylinder/ellipse calculation within 0.1 cubic inch.
- `build123d` and `cadquery` are absent from the checked system Python environment. No packages, extensions, APIs or subscriptions were installed or purchased. These checks do not inventory every possible virtual environment.

### Capacity result

The provisional 5.5 × 5-inch straight body with 4 mm walls yields **226.49 cubic inches / 3.712 liters** of modeled empty volume, about 26.49 cubic inches above the target **before** sculptural contour changes, closure hardware, bosses and manufacturing details.

This establishes only that one simplified envelope can accommodate the target. It does not establish that the illustrated design does. With all other assumptions unchanged:

| Assumed body width | Analytic cavity, cubic inches |
|---|---:|
| 4.5 inches | 193.40 — below target even before hardware |
| 5.0 inches | 209.96 — little room for contour and hardware losses |
| 5.5 inches | 226.51 |
| 6.0 inches | 243.07 |
| 6.75 inches | 267.91 |

The real silhouette has substantial taper and asymmetry; it may consume much of this margin. Do not send this study as a print-ready urn or use its volume as a catalog specification.

## Next modeling steps

1. Produce measured front/side/back silhouette views using the original board, reserving a connected cavity. Retain the 11-inch original and provisional 5.5-inch body width until the design owner changes them. Resolve whether the pictured pill top is decorative or functional before detailing it.
2. Replace the straight upper envelope with the curved sculpture, repeatedly measure cavity volume, and report losses against the 200-cubic-inch target. Keep all relief outside the required cavity envelope where practical.
3. Select manufacturing process from supplier feedback. Then dimension access aperture, metal plate, recess, seal, screws and insert bosses with process-specific allowances. A seal is not established by the words “tamper-resistant” or by using screws.
4. Introduce build123d or FreeCAD only for the mechanical geometry and STEP exchange when closure dimensions are defined; Blender is sufficient for this first capacity and shape work. No paid image-to-CAD API is needed now. Tripo remains an optional bounded comparison, not a dependency.
5. Preserve front “before the crowds there was you,” rear “every step i took began beside you,” base “FOREVER IN OUR HEARTS,” and rear personalization. Add texture, bronze divider and typography after envelope and closure review.
6. Export separate candidate print parts only after mechanical integration. Verify scale, geometry, usable cavity and closure fit digitally, then obtain a closure coupon and physical sample before selling.

**Current deliverable:** reproducible preliminary geometry and measured capacity sensitivity. **Not yet delivered:** artistic silhouette, closure, printable STL, mechanical STEP, physical fit or manufacturing validation.
