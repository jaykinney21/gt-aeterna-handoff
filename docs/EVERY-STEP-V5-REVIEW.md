# Every Step Legacy — revision 5 review

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 22, 2026. The user rejected the previous appearance and requested repeated correction against the original. This review replaces the prior feature-presence checklist with a visual comparison of actual Blender renders.

## Source and scope

Target: document 63, original athletic Every Step Legacy reference, `research/drive-refresh/images/63/image1.png` (historical private source; not bundled). The catalog trail concept and original-five supplier files are separate.

This is an exterior appearance study. The original 11-inch design is the starting reference; visual narrowing and camera changes do not establish compliance with every stated source dimension. The reference board is not a consistent engineering drawing. V2 cavity measurements do not transfer.

## Visual correction targets

- Silhouette: narrower body and base relative to height. The reference body has an approximate image width/height ratio of 0.55, while v4 was approximately 0.63–0.65. These are image proportions, not measured physical dimensions.
- Top: a visible clean oval face with a flat bronze border; no jagged crown, spikes or near-vertical textured wall.
- Two curves: broader bronze S border and independent smooth black return, with a rounded foil between them. Eliminate triangular shading creases and shoulder hooks.
- Body finish: dense fine athletic texture, distinct from the smoother inscription face; continuous front stitching.
- Base: rounded texture grouped into bands, flat bronze outer trim, framed plaques.
- Inscriptions: larger readable words, balanced positioning and hearts. Correct text on each face; rear personalization remains placeholder copy.

## Iteration evidence

Native source and model: `output/cad/refinement-v5/appearance_v5.py` and `Every-Step-Legacy-appearance-v5.blend`. Selected early and later pass images, preserved intermediate source/model files, and `ITERATION-REVIEW.md` are retained in that folder. Final inspection and remaining differences are recorded separately in `EVERY-STEP-V5-INDEPENDENT-REVIEW.md`.

Repeated modeling/render passes were used to test and reject visible defects. Passes 1–3 front/rear images are retained as intermediate evidence; later passes revised the working model. A crowned cap was rejected after it introduced edge artifacts. A planar cap and revised camera were retained. The upper fold was then rebuilt as one continuous elliptical surface after the earlier joined sheets produced triangular creases and a pinched side return. Body type increased from 9.3 to 12.3 mm in the source model, was moved upward, and was widened 23% to better match the reference’s line width without changing line spacing. Subsequent passes added visible fine grain to the dark surfaces, cleaned the cap annulus, and retained the bronze sweep’s width into the top instead of tapering it to a hairline. A further contour comparison showed the upper blade protruded too close to the outside of the writing wall. An independent upper profile now keeps that blade closer to the cap, with the writing rim outside it, matching the reference arrangement more closely. The width change is an explicit visual interpretation rather than a hidden engineering claim.

## Review and next gate

Open `output/cad/review-v5/index.html` for original-versus-revised comparisons and rendered detail views. The page contains real Blender renders, not generated concept imagery. Appearance acceptance must precede reconciling exact dimensions, storage cavity, wall thickness, closure, printable meshes and a physical prototype.
