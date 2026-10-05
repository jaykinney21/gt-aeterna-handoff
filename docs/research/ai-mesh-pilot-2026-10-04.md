# Tripo and Meshy pilot for sculptural urn components

October 4, 2026. **Current direction:** the user is personally creating new models through Tripo and will provide the files and revised specifications when ready. Await that handoff, then review the supplied models. This supersedes starting an agent-run live API comparison now. Tripo availability is user-reported; its live connection, account tier and balance remain unverified. The agent performed research only: no account purchase, API generation, private design upload or physical print. No credentials were read. This note is saved locally in the AETERNA workspace.

The latest direction has **two storage routes by size**. The larger display version may use a decorative upper sculpture attached to an engineered ash-storage base. The 10-inch version must retain 200 in³ of usable capacity and may instead be a full storage vessel, such as a vase with an integrated foot, or an engineered connected chamber through base and hollow upper. Base-only storage is not assumed for that smaller version. Tripo and Meshy can help establish either exterior shape, but an STL export does not establish capacity, wall thickness, a sealed closure, stability or editable parametric CAD. Review the user's supplied models first; the bounded comparison below is a future option if additional generation would address a specific gap.

## Handoff checklist for the user created Tripo files

For each design, provide a small named folder or ZIP containing:

- **Geometry:** raw untextured STL geometry for the intended variant. Export display sculpture and storage base separately where they are distinct parts. For the 10-inch full-vessel or connected-chamber candidate, preserve its complete geometry and export assembly parts separately if available. Label generated storage parts as unverified candidates. Keep the original mesh before any repairs or hollowing.
- **Appearance:** a GLB showing the intended materials/appearance; include separate texture maps if the export needs them. Front/back/side screenshots are useful supporting references.
- **Editable work:** the saved Tripo project or source link if available, and a Blender source file if it was edited there. A GLB/STL remains a mesh; it is not automatically native parametric CAD.
- **Scale:** intended assembled height and width/depth for each variant, stated units, the sculpture-only height, and any dimension actually set during export. STL does not carry a reliable unit declaration, so record the unit separately.
- **Reference and revision:** the original images used as inputs, the revised specification document, design name, revision date and a short list of differences from the old quoted design.
- **Component roles:** label each file as display, 10-inch, keepsake or jewelry. Identify which part or connected chamber stores ashes, the desired usable capacity, access/closure concept and how assembly parts join. State whether a base/upper interface intentionally communicates or isolates the chambers. Mark generator-created hollowing, wall thickness or capacity as **unverified**.

The first review will compare the supplied mesh with the reference, check orientation/scale and component roles, and identify visual or engineering gaps. The tentative 12-inch display/base-only route and 10-inch full-vessel or shared-chamber route need separate dimension and capacity reconciliation. Good generated artwork alone does not resolve them. No additional API key or account setup is needed from the user while they prepare this handoff.

## What the APIs currently offer

| Question | Tripo | Meshy |
|---|---|---|
| Reference input | Single-image route; multiview route accepts labeled front/left/back/right images, with front plus at least one additional view | Single-image route; multi-image route accepts 1–4 images of the same object; Meshy 7.1 treats the first image as front |
| Initial test configuration | H-series `v3.1-20260211`; untextured geometry; explicitly set both `texture=false` and `pbr=false`; fix `model_seed` | `meshy-7.1`, standard geometry, `should_texture=false`, request GLB and STL; save the full request and returned task ID |
| Export for review | Generated GLB; format-conversion API supports STL and other mesh exchange formats | Requested outputs include GLB, OBJ, FBX, STL, USDZ and 3MF |
| Dimensions | Turn automatic sizing off; apply the approved dimensions locally | Turn `auto_size` off; it otherwise estimates height through AI vision |
| Part handling | Offers segmented mesh generation; these are mesh parts, not designed mechanical joints | Offers remeshing and printability tools; these do not define our closure or attachment |
| Engineering role | Exterior candidate for Blender cleanup | Exterior candidate for Blender cleanup |

Sources: [Tripo multiview API](https://developers.tripo3d.ai/en/docs/generation-multiview-to-model/standard), [Tripo conversion API](https://developers.tripo3d.ai/en/docs/models-convert), [Meshy multi-image API](https://docs.meshy.ai/en/api/multi-image-to-3d). Pin the documented model versions rather than `latest`, and recheck availability when executing. Tripo's default PBR setting can force textures back on, so disabling texture alone is insufficient for a geometry-only test.

## Proposed use for each product component

| Component | Proposed authoring route | Required evidence before release |
|---|---|---|
| Display upper artwork | AI exterior candidate, cleaned and deliberately edited in Blender; preserve the raw output | Reference-matched silhouette and real geometric detail; print-process review; deliberate attachment geometry; stability/handling checks; decorative hollowing does not contribute storage capacity |
| Display ash base, circular/square/rectangular | Parametric CAD with controlled mounting and closure | Actual empty cavity volume after hardware intrusions, walls, opening, gasket, inserts/screws, assembly dimensions and supplier tolerances; proposed base dimensions still need capacity correction |
| 10-inch full storage vessel or connected base/upper | AI may supply the exterior; engineer the reservoir, walls, fill opening, closure and any communicating interface deliberately | 200 in³ of accessible usable connected volume with closure/hardware installed; no inaccessible or disconnected voids counted; finished height/width/depth and niche clearance; assembly interfaces retain ashes |
| Companion urn | AI can supply ornamental exterior; engineer its small ash chamber and closure separately | Its own capacity and dimensions; closure access; walls and legible detail at finished size |
| Keepsake jewelry | AI can inform appearance; a jewelry-capable modeler/CAD workflow defines the finished body | Ash cavity if intended, sealed access, chain/bail or clasp, material/process and small-feature manufacturability |

These are project engineering recommendations, not claims that a generator already provides those checks. A mesh converted to STEP would not automatically acquire a useful feature history. Keep the artistic mesh editable in Blender and preserve native parametric source for the mechanical parts.

## Optional comparison after the supplied models are reviewed

**Proposed first appearance subject:** the Home Run Legacy glove-and-ball artwork, corresponding to the old MVP family. The recovered sheets show a distinct pedestal and upper sculpture; their base-only storage assumption is superseded for the 10-inch variant by the latest owner clarification. The glove, held baseball and two lower baseballs form a useful exterior-detail benchmark, not a validated 10-inch storage vessel. Preserve the old mesh for review; do not assume its hollow-body design already supplies the revised chamber. Every Step Legacy can be a later visual benchmark; this pilot does not reopen its prior modeling work automatically.

1. **Freeze the input packet.** Identify the revised design and revision date; approved front/back/side views; chosen size and storage architecture; assembled bounds; sculpture-only bounds where applicable; which detail must be modeled versus painted; and must-preserve features. A display artwork comparison can isolate the upper; a 10-inch whole-vessel exterior test must preserve that vessel's intended complete envelope. Upload only that design's selected artwork. Remove specification collage annotations from input images. Record original filenames and hashes.
2. **Use equivalent inputs.** Supply the same clean front/back/side views to both services. A generated unseen view is an interpretation, so label it and obtain approval before using it as target evidence. If only one trustworthy view exists, compare single-image routes rather than manufacturing false multiview evidence.
3. **Generate two geometry candidates per service.** Use the pinned models above; no texture, estimated sizing, segmentation or automatic repair. Record topology settings and retain the Meshy pre-remesh GLB when available so decimation does not hide lost detail. Preserve raw downloads, request parameters, task IDs, actual credit deductions and timestamps. Check for an existing task before retrying an ambiguous submission so we do not purchase duplicate runs. Meshy's reviewed endpoint does not expose a seed; its recorded inputs can reproduce the procedure, but identical regenerated geometry is not promised.
4. **Review before adding another attempt.** Import both into the existing Blender workflow; normalize orientation and scale using the brief; make front/back/both-side and three-quarter comparison stills under the same plain material, camera and lighting. Render a texture-free turntable if helpful. This reveals geometric defects that polished textures can hide.
5. **Allow one refinement per service only if justified.** Correct the input or try the higher geometry option to address a named gap. Do not loop indefinitely. Preserve the reason and result. Add texture only to the best geometry candidate for a separate appearance review.
6. **Record a decision.** Select the better starting mesh or retain manual modeling if neither is useful. Deliver the reference comparison images, raw GLB/STL, edited `.blend`, issue list, usage ledger and estimated cleanup time. Do not label the chosen mesh production ready.

### Review scorecard

This rubric is a proposed decision aid, not a manufacturing standard. Score each item 0–5: front/back/side silhouette (30%), recognizable major forms and depth (25%), printable geometric detail rather than painted illusion (20%), cleanup effort and editability (15%), correct orientation and controllable scale (10%). Any major missing feature requires correction regardless of aggregate score. Record added geometry, holes, self-intersections, detached fragments and ambiguous underside features separately.

After appearance selection, the manufacturing pass must independently check watertightness/manifoldness, intersections, process-specific walls/features, attachment, support/removal access, loaded stability and the finished assembly envelope. For a display/base-only route, measure the engineered base's usable cavity; any isolated hollow decorative upper contributes zero storage. For the 10-inch route, deliberately engineer and measure the full fillable vessel or connected base-plus-upper chamber, including passage access, seals and closure/hardware deductions. Adding disconnected void volumes cannot establish usable capacity. AI hollowing is not evidence that 200 in³ is accessible or sealable. Physical closure/detail samples and a full assembly remain later validation steps.

## Proposed limits and current prices

These are proposed limits, not spending authorization or a claim that either account currently has credits.

| Pilot | Published task costs | Proposed allowance |
|---|---|---|
| Tripo H-series | Image or multiview mesh: 20 credits; HD geometry adds 20; basic conversion 5; standard texture 10. One credit is $0.01 | Two standard candidates (40), one optional HD candidate (40), three basic conversions (15), optional winner texture/export (15): approximately 110 credits. **Hard stop at 150 credits, or $1.50 metered usage.** |
| Meshy 7.1 | Image or multi-image mesh: 20 credits; Ultra 2K geometry adds 5; ordinary texture adds 10; conversion 1 | Two standard candidates (40), one optional Ultra candidate (25), optional winner texture (10): approximately 75 credits. **Hard stop at 100 credits.** |

Sources: [Tripo developer pricing](https://developers.tripo3d.ai/en/pricing), [Meshy API pricing](https://docs.meshy.ai/en/api/pricing). Different quality add-ons, repeated failed/ambiguous requests, repair and generated input images can change usage; log actual deductions. The Tripo estimate applies to the stated H-series route, not P-series pricing.

Tripo is prepaid API usage. A Studio/web subscription should not be assumed to fund the API. Meshy requires Pro or higher for normal API access and spends credits according to task configuration. Meshy's official public pricing text confirms 1,000 monthly Pro credits, but its current dollar-priced plan cards were not returned in the research view; **the exact regional checkout price and available existing plan must be checked**. Do not equate 100 Meshy credits with $1.00. [Meshy API access](https://www.meshy.ai/api), [Meshy plan information](https://www.meshy.ai/pricing/).

**Proposed acquisition ceiling:** at most $25 total in new credit purchases or one monthly subscription for this comparison, with no annual purchase or automatic recharge. If the available checkout exceeds that ceiling, use an already funded account or revisit the proposal. This cap is separate from metered generation and excludes prints, modeling labor and manufacturing. No purchase has been made.

## Access and rights inputs

If an agent-run API experiment is later selected, it needs a working account with the needed API tier, a securely installed API key, confirmation of available credits, the chosen reference packet and confirmation that AETERNA may submit the artwork. These are future setup inputs, not requests for the current user-led handoff. No API key should be pasted into the research document. Keep customer personal information and unrelated project files out of the generation packet.

For Tripo, developer terms distinguish free and paid users. Paid-user §5.2.2 describes rights in inputs/outputs and states that inputs/outputs will not be used to train, validate, test or improve AI technology. Free-user rights differ. Confirm that the actual API account qualifies for the intended paid/private route; do not infer commercial exclusivity from trial credits alone. [Tripo developer terms](https://developers.tripo3d.ai/en/terms).

For Meshy, paid users can keep content private and own outputs to the extent permitted by applicable law; free outputs use CC BY 4.0. **Published guidance is inconsistent on training:** the API FAQ says API inputs/outputs are never used for training, while Terms §2.9 permits training with non-Enterprise inputs/outputs unless otherwise agreed. Confirm the applicable API/account commitment before submitting unreleased design references. Avoid Community publication, which has separate public licensing. [Meshy API FAQ](https://www.meshy.ai/api), [Meshy terms §§2.9, 3.2 and 3.3](https://www.meshy.ai/terms-of-use).

Meshy's API FAQ says non-Enterprise generated assets are retained for at most three days. Download all raw models and required textures immediately after successful generation. Local retained files are our evidence; a vendor-hosted preview link is not a permanent archive. [Meshy API asset retention](https://www.meshy.ai/api).

## Local readiness and the next concrete step

On October 4, `/Applications/Blender.app` exists. FreeCAD and MeshLab were not found at their standard `/Applications/*.app` paths; this is not an exhaustive installation inventory. Earlier [CAD tool readiness](../CAD-TOOL-READINESS.md) recommends Blender for art and a parametric route such as build123d/FreeCAD for mechanical geometry. Tripo availability is user-reported. Blender version/extensions, API keys, account tiers and credit balances were not checked in this research. There is no demonstrated live Tripo/Meshy test result yet.

### Existing revised artwork references

These embedded source images were visually inspected. **All five are annotated collages, not ready-to-upload single-object images.** No image was cropped, edited or generated during this inspection.

| Local image | What it contains | Pilot use |
|---|---|---|
| [Home Run image 1](../../references/source-documents/46/image1.png) — 1024 × 683 | Original revised 13.25-inch assembly; front/back glove views, pedestal, hardware and dimension panels | Best initial upper-sculpture reference once the front artwork is isolated; matching rear available on same sheet |
| [Home Run image 2](../../references/source-documents/46/image2.png) — 1024 × 935 | First 10-inch sheet with front/back, a 2.75-inch base, dimensions, hardware and jewelry | Same glove/three-baseball concept; sculpture region is useful, but its conflicting height labels are not engineering evidence |
| [Home Run image 3](../../references/source-documents/46/image3.png) — 1024 × 935 | Alternate 10-inch sheet, 2.50-inch base/7-inch diameter, different inscription and rear badge, accessories | Keep this alternate separate; do not mix its base/badge with image 1 without a design decision |
| [Court Legend image 1](../../references/source-documents/47/image1.png) — 1024 × 682 | Snake/basketball front/back, ball top view, base and closure panels | Possible later benchmark; first reconcile the apparent extra snake head in the front artwork |
| [Court Legend image 2](../../references/source-documents/47/image2.png) — 1024 × 935 | Ten-inch snake/basketball sheet with front/back, base and accessories | Current revised art; front also appears to show two snake heads while back shows one. Do not assume those views define consistent geometry |

Source mapping: [updated-five source index entries 46 and 47](../source-documents/INDEX.md). The embedded images are already extracted from the corresponding local DOCX files. No cleaner single-object source was found among those embedded images or by matching the referenced image identifiers in recovered filenames.

The storage labels in these earlier collages are historical design intent. They do not supersede the current 10-inch full-vessel/shared-chamber direction or establish the claimed capacity. See [the current modular manufacturing clarification](modular-manufacturing-2026-10-04.md).

For the initial appearance test, isolate the **Home Run image 1 front upper sculpture** from its title, arrows, plaques and pedestal, preserving the glove, held ball and both lower balls. The existing sheet cannot simply be sent as a single image: the generator may combine repeated views, hardware and accessories. A crop can supply the intended object without inventing new artwork; its limited source resolution should be recorded. A higher-resolution original would improve the comparison if available. The rear crop can be used later only after front/rear consistency review.

The current next step is to receive the user's new Tripo exports, references and revised specifications using the checklist above. Review those files before proposing further generation. The comparison protocol and spending caps remain an optional future plan if a specific visual gap remains. Engineer the display storage base and the 10-inch full-vessel/shared-chamber route separately, preserving approved artwork where feasible. Resolve usable capacity, fill access, closure, attachment and assembled dimensions for each route. The companion urn and jewelry follow as distinct engineering parts rather than scaled copies of the main urn.
