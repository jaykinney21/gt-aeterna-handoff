# Every Step Legacy — artistic CAD refinement v2

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

**Superseded for appearance review by revision 3:** see `output/cad/review-v3/index.html` and `EVERY-STEP-V3-VISUAL-REVIEW.md`. V2 was rejected for visual fidelity. Its engineering measurements below remain specific to v2 and do not validate the rebuilt v3 exterior.

Scope: original 11-inch Every Step Legacy only. This is a digital review candidate, not an approved manufacturing design. Earlier artifacts remain unchanged.

The v2 source in `output/cad/refinement-v2/sculptural_candidate.py` preserves the connected cavity and provisional bottom hardware. Broad bronze sweep and the two lower rings are now integrated in the valid shell. The upper two rings each failed union validation (24 nonmanifold edges), and combined folded edge/athletic relief failed with 1,980 edges. Those operations were rolled back; these details remain separately editable review geometry, alongside projected curved inscriptions. They appear in renders but are absent from the shell STL. This is a design review improvement, not a fully fused artwork release. The proposed 160 mm body width still needs owner approval.

Measured cavity remains **205.10 in³**. Exported shell and plate each have one connected component and zero nonmanifold edges. Gasket route validation passed. Topology alone does not certify wall thickness, self-intersections or physical behavior. The GLB contains the validated shell/plate only; use the Blender file and PNGs to review all separate artistic details.

## Human review sequence

1. Compare the source reference with the front, rear, side and perspective views. Approve the silhouette, sweeping bronze divider, texture density, typography and base proportions separately.
2. Inspect the top, bottom and cutaway views. The top is fixed/decorative; bottom filling is the working assumption. The plate/fasteners remain placeholders.
3. Record requests by view and feature—for example, “front: make the inscription larger” or “side: soften the top slope.” Keep aesthetic approval separate from mechanical approval.
4. Revise and rerender until the owner approves the digital direction. Then obtain process-specific supplier review, finish/closure coupons and a full-size physical sample before manufacturing release.

## Outstanding decisions

The current loft approximates the source's layered sculpture. The deeper source folds and lid texture are not yet faithfully reproduced. No render proves achievable metallic finish, sealing, minimum wall, durability or physical capacity. Exact screws, inserts, gasket, tolerances and paint system depend on supplier process selection. Neither the 10-inch version nor companions/jewelry are included in this CAD revision.

Build and independent validation results are recorded alongside the new files; review them before using exported mesh parts for quotation. Do not place a production order from this candidate.

## Independent screen and final presentation

The independent saved-mesh check found zero nonmanifold edges, zero degenerate triangles at the stated threshold, and no nonadjacent BVH overlap pairs in the shell. Sampled normal wall values reached approximately 3.25 mm from inside and 2.99 mm from outside; these are samples, not an exhaustive minimum-thickness certification. Final review uses a bronze paint-mask overlay because boolean material assignment lost the intended ribbon color. The failed beaded folded-edge visual is hidden; individually editable tread/lacing source pieces remain visible. Run `sculptural_candidate.py`, then `render_review.py` to regenerate the final presentation.
