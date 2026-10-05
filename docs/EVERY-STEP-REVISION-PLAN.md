# Every Step Legacy — reset after visual review

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 19, 2026. Current v2 is not visually approved. No new model was made in this audit. See EVERY-STEP-VISUAL-AUDIT-INDEPENDENT.md for twelve specific reference/render gaps.

## Opening the actual model

The PDF contains still renders, not an interactive model. In Blender choose File → Open and select:

`output/cad/refinement-v2/Every-Step-Legacy-sculptural-candidate.blend`

This is the complete editable appearance scene. Orbit using the viewport navigation gizmo and use Material Preview to see materials. The existing GLB only contains the shell and plate; it omits some artistic details and should not be the primary appearance review. STL also does not preserve the intended colors/materials. An attempted automatic Blender opening timed out; opening was not confirmed.

## Next revision sequence

1. Rebuild the exterior as controlled overlapping sculptural surfaces, with a tall inner/rear blade and lower outer writing panel. Match reference contours and shoulder notch before adding ornaments. Preserve v2 as a mechanical study.
2. Review front and rear at matched scale beside the original, plus both sides and three-quarter views. The rear must have its own faithful bronze/panel relationship. Show the interpretation of unseen surfaces explicitly.
3. Fit tapered bronze borders to those surfaces, including the textured cap perimeter. Avoid a flat strap with square ends. Remove unintended pinches and facets.
4. Test dense athletic texture, fine connected lacing, framed plaques, text and hearts as detail samples. Front line breaks: “before / the crowds / there was / you.” Rear: “every step / I took / began / beside you.” Reference-matched placement and readable contrast matter as much as wording.
5. Provide the complete appearance scene for rotation, close-ups and comparison renders. Check the actual exported review model contains every visible feature; do not substitute an incomplete engineering GLB.
6. Reconcile cavity, minimum walls and closure with the revised shape. The existing 205.10 in³ estimate applies to v2 only. Report any capacity-driven change to the exterior rather than silently broadening it.

## Tool decision

Blender remains suitable for deliberately rebuilding the layered exterior. The previous result reflects the modeling approach, not evidence that Blender cannot make the design. Mesh cleanup alone will not invent the missing sculpture.

Tripo is worth a bounded comparison experiment if desired: its official multiview endpoint accepts labeled front/back/right images and produces a model. Use clean object-only views derived from the original reference, with annotations removed; do not submit the whole specification collage or invent a side view and treat it as evidence. Compare an untextured output with a Blender blockout before selecting either. Add precise lettering, cavity and closure separately and validate all geometry. This is our proposed workflow, not a guarantee of vendor fidelity or print readiness.

Official reference: https://developers.tripo3d.ai/en/docs/generation-multiview-to-model/standard

Meshy offers another multi-image route, but purchasing both is unnecessary before a first comparison: https://docs.meshy.ai/en/api/multi-image-to-3d

No API purchase, upload or generation was performed. An API is optional, not the prerequisite for correcting the identified problems.
