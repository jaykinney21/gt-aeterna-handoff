# Every Step Legacy v5 — appearance revision record

September 22, 2026. **Appearance study for owner review, not a production CAD release.** V4 and the engineering candidate remain unchanged.

## Render–inspect–revise loop

1. Reduced the upper web height, narrowed the writing shell, tapered the textured core, increased cap visibility, and replaced round base rims with flat bands. Rendered and inspected front/rear.
2. Applied 0.85 horizontal/depth scaling to follow the reference picture's slender proportions, increased ribbon width and fold depth, moved text left/down and enlarged base beads. Render inspection caught incorrectly transformed text.
3. Corrected global rather than local-axis scaling, restored inscriptions, and tested a symmetric cap. Front/rear inspected; cap was still too edge-on.
4. Tried a crowned cap. **Rejected** after rendering: saddle/jagged-edge artifacts were worse than the planar cap.
5. Returned to a clean planar cap and raised the review camera. Side inspection exposed an inherited shoulder hole.
6. Closed the shoulder and smoothed the upper return. Front inspection still showed a triangular crease.
7. Used a continuous upper boundary interpolator and rendered all views at higher quality. **Rejected the multi-sheet foil**: side showed fabric-like gathering rather than a rigid sculpture.
8. Replaced the joined front/back/bridge construction with one monotonic elliptical foil surface. Added a flat copper cap annulus and 1.32× larger body lettering. Front/side inspection showed the crease was removed, with a remaining small shoulder dip.
9. Flattened the shoulder closure and cleared cap texture from the copper lip. Side inspection confirmed closure but showed disconnected trim endpoints.
10. Removed the separate tube trim and replaced oversized cap texture geometry with fine procedural black grain.
11. Applied the same fine black grain to the exposed base top and regenerated the complete review set. Independent review found two small cap-band intersections and grain that was too subtle.
12. Raised the cap annulus to clear the rolled return and added explicit Generated-coordinate noise/color variation and fine bump to the cap, base top and writing shell. Top inspection confirmed the two notches were removed.
13. Kept the copper ribbon broad through its upper segment (7 mm nominal terminal width instead of a hairline) and blended its terminal cross-section onto the cap annulus. Taper remains only at the foot. Inspection caught texture occlusion along the newly widened upper edge.
14. Enforced 1.2 mm clearance from the textured core for the widened upper band, releasing the clearance only after the band rises above the cap plane. Regenerated the full review set; the prior stair-step edge was removed.

15. Tucked the copper strip's terminal edge below the annulus rather than ending it coplanar with the lip. A close-up render confirmed both triangular cap cuts were removed; this candidate is preserved as `pass-15.blend` and `pass-15.py`.
16. Contracted only the upper black foil with an independent profile, leaving the outer writing shell unchanged. Front/side review confirmed a tighter upright blade closer to the source; it exposed a shoulder gap previously covered by the inflated collar.
17. Refined writing grain to finer, lower-contrast detail and made the core pebbles rounder with restrained highlights. Detail preview retained the clean cap lip.
18. Added a 1.5 mm recessed floor to close the shoulder reveal. Front/side preview revealed an overly bright shelf and overlap with a legacy shoulder face.
19. Removed the legacy overlapping face and gave the shallow recess a matte black finish. The floor is present geometrically; its dark appearance does not represent an open loading port.
20. Widened body inscriptions only by 1.23× before projection, preserving line height, centers, hearts and plaques. Checked for collisions, then regenerated all eight review views from the same scene.

Early front/rear pass images are retained for passes 1–3. Later rejected experiments were reviewed in place and are described here; the delivery images show the final revision only.

## Deliberate interpretation and limits

The supplied concept board's visual width/height proportions do not agree with its written 6.75-inch base diameter and 11-inch overall height. This appearance study prioritizes the picture and applies **0.85 XY scaling**; `appearance-status.json` records actual visual bounds separately from the source's written dimension. It must not replace engineering dimensions or inherit the earlier cavity capacity claim.

The source supplies conceptual front/rear/top imagery rather than a consistent orthographic scan. Side depth, the continuous rolled foil, the cap plane and hidden surfaces remain modeled interpretations. Front/rear review cameras are elevated product views, not engineering orthographic drawings.

Body inscriptions use editable Georgia source text at 12.3 mm with 1.23× width before XY proportion correction; larger type was requested. Rear base text is explicitly a personalization placeholder. Cap and base-top grain are material detail, not printable relief. Other textures remain appearance geometry and need process-specific simplification/integration for manufacturing.

## What this revision does not establish

No cavity, usable capacity, minimum wall, fastener fit, sealing, watertight mesh or printability approval is claimed. No manufacturing files from the earlier engineering lane were overwritten. The next decision is visual review of the current front, rear, side, top and details against the source; do not call it “perfect” or owner-approved without that review.
