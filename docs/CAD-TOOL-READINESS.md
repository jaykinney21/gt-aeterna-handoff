# Every Step Legacy — CAD tool readiness

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

Updated September 19, 2026. Research and setup plan only: no installation, paid generation, model creation or prototype purchase performed. This is workstream two; the five existing STL families remain a separate quoting task.

## Recommendation

Start with **Blender plus one parametric CAD authoring route**. Use Blender for the sculptural exterior and presentation; use build123d for repeatable, dimension-controlled cavity and closure geometry. Add FreeCAD as a visual engineering review tool when exchanging the first solids, or use it instead of build123d if interactive feature-tree editing is preferred. We do not need a paid AI CAD API to begin.

The first obstacle is a consistent product brief: extra software cannot resolve conflicting dimensions or determine what the lid is supposed to do. The recommendation above is our workflow judgment, not evidence that a model has already passed manufacturing checks.

## Tools and actual readiness

| Tool | Job in this project | Readiness / acquisition decision |
|---|---|---|
| Blender | Exterior silhouette, sweeping divider, modeled tread/mesh relief and lettering; editable `.blend` source and render views | `/Applications/Blender.app` exists, rechecked today. Version and extension compatibility still need checking at setup. No new download requested now. |
| Blender 3D Print Toolbox | Screen meshes for intersections, nonmanifold geometry and thin regions | Useful extension; installation not checked. Its diagnostics support review, not physical certification. [Official extension](https://extensions.blender.org/add-ons/print3d-toolbox/), [documented checks](https://docs.blender.org/manual/sr/3.3/addons/mesh/3d_print_toolbox.html). The latter is an older manual; use the installed extension's current UI at setup. |
| build123d | Parameterized cavity envelope, plate, screw/inserts layout and closure interfaces; scripted repeatable exports | Recommended engineering authoring route for agent-assisted work. Availability not yet checked; use an isolated, pinned stable environment when implementation begins. Official docs describe Python parametric BREP modeling and CAD exchange. [Overview](https://build123d.readthedocs.io/en/latest/), [exports](https://build123d.readthedocs.io/en/latest/import_export.html). |
| FreeCAD | Visual inspection, sections and native parametric authoring if preferred over code | Not found at `/Applications/FreeCAD.app`; this is a location check, not an exhaustive installation audit. Optional reviewer for build123d, or substitute authoring route. FreeCAD supports constrained sketches, real-world units, Python, native FCStd and STEP/STL exchange. [Official features](https://www.freecad.org/features.php). |
| Tripo | Optional image-to-mesh exterior experiment | Optional, after baseline geometry and reference brief. It offers image/text mesh generation and printable mesh exports; this does not establish our cavity, dimensions or closure. [Official product](https://www.tripo3d.ai/). A web account is sufficient for a small experiment; no API integration needed. |
| MeshLab | Particular mesh-cleaning or simplification jobs if Blender encounters a concrete problem | Not found at `/Applications/MeshLab.app`. Defer: overlaps the immediate mesh-work needs. [Official project](https://www.meshlab.net/). |

Do not install multiple competing CAD systems at once. For Jay, the practical answer is: **keep the installed Blender; no paid service or API key is required now**. The engineering setup can be completed with the selected local CAD route when model development starts.

Tripo's current commercial-use guide distinguishes paid from free users; its pricing page also describes free models as public/noncommercial and paid models as private/commercial. Before using our unreleased references, select an appropriate plan and check the current account terms. A free trial should not be assumed suitable for production assets. Its web app and API use different pricing. No Tripo purchase is recommended until the local baseline establishes what help is needed. [Commercial-use guide](https://www.tripo3d.ai/help/privacy-policy/how-to-use-tripo-models-commercially), [pricing](https://www.tripo3d.ai/es/pricing), [API FAQ](https://platform.tripo3d.ai/docs/faq).

## Brief to resolve before detailed modeling

Source: document 63, `_1. Every Step Legacy_ Urn+10_keepsake&jewelry.docx`, listed in [source index](source-documents/INDEX.md). SKU LN-SPT-EVERYSTEP; do not substitute Legacy Step or Legacy Ascend.

| Issue | Working baseline and unresolved detail |
|---|---|
| First variant | Recommend the original 11-inch overall / 6.75-inch maximum / 200+ in³ target. This remains a proposed baseline, not a verified product. |
| Usable capacity | 200 in³ equals approximately 3.277 L. Measure the actual empty cavity after subtracting all inward hardware/closure features; exterior or solid-material volume is not capacity. |
| Envelope | Source body is 9 inches high with a 2-inch base. Reconcile lid contribution, body depth and pill-shaped cross-section in dimensioned orthographic views. A maximum diameter does not specify both pill axes. |
| Access | Source calls for a flush rectangular bottom metal plate with four screws and brass inserts, while also describing a pill-shaped lid. Decide fixed/decorative top versus a second functional opening. Bottom access is the proposed functional baseline. |
| Smaller version | Ten-inch proposal targets 150+ in³, approximately 2.458 L. Body 7.5 inches + base 2 inches leaves 0.5 inch unexplained. It is not a scaled-down version that can automatically retain 200 in³. Defer it for the first experiment. |
| Finish | Original black/bronze and accessory rose-gold are distinct directions. Use black/bronze for the original concept unless revised. Keep finishing and geometric relief separately specified. |
| Process | Wall thickness, insert bosses, seal geometry, print allowances and finish allowance depend on the selected supplier/material. Keep them parameters until a manufacturing route is agreed. |

Preserve front “before the crowds there was you,” rear “every step i took began beside you,” base “FOREVER IN OUR HEARTS,” and rear personalization in the visual brief. Legibility, minimum strokes and relief depth must be evaluated at physical size rather than inferred from a render.

## Bounded development sequence

1. **Brief and reference sheet:** reconcile the table above into named dimensions and front/side/back views. Record any provisional assumptions explicitly. Deliver one modeling brief, not another collection of contradictory prompts.
2. **Plain engineering blockout:** construct the envelope, an explicitly modeled empty cavity and proposed access location before surface detail. Check that the target capacity can physically fit with provisional walls and hardware. Stop and revise the envelope if it cannot.
3. **Exterior comparison:** make one direct Blender blockout. Only if useful, compare it with at most three Tripo candidates using the same references and a separately agreed spending ceiling. Score front/side/back silhouette, real geometric detail, source editability and cleanup effort. A photorealistic texture is not a successful CAD result.
4. **Detailed candidate:** retain the stronger exterior and integrate the dimensional mechanical design. Preserve sculptural source plus parametric source; carry out booleans on working copies. Do not force a highly faceted decorative surface into STEP solely to obtain that extension.
5. **Digital validation:** record assembled dimensions, actual empty-cavity volume, scale, minimum-wall concerns, intersections, open/nonmanifold edges, closure clearances and component naming. Reimport exports and compare their bounds to source. Native source remains authoritative because an imported STEP does not recreate the original feature history.
6. **Supplier review and small physical tests:** obtain process-specific feedback; test a closure/insert coupon and finish/detail sample before a complete urn. Then assess full-size assembly, measured capacity, handling and packaging. These physical purchases are later commitments.

**Exit package:** editable `.blend`; engineering source (`.py` with pinned dependencies or native `.FCStd`); appropriate STEP mechanical solids; separate STL print parts; dimensioned section/assembly sheet; parameter list; and a validation record distinguishing passed checks from provisional assumptions. The design stays a prototype candidate until physical checks pass.

## Specialist division

- Design/CAD specialist: references, artistic shell and editable source.
- Mechanical/DFM review: capacity, wall strategy, closure, insert/seal details and supplier feedback. This can be an independent review stage rather than a separate software purchase.
- Coordinator: keep the original-five quote files separate, track decisions and ensure catalog artwork is not represented as manufactured evidence.

Next useful deliverable is the resolved modeling brief and tool setup check. No need to ask Jay to buy an API before that work is complete.
