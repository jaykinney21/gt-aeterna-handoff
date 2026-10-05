# Downloads and review

Get the files from [the handoff release](https://github.com/jaykinney21/gt-aeterna-handoff/releases/tag/handoff-2026-10-04). No GitHub account is required for public downloads.

## Choose a download

| Download | What you get |
|---|---|
| `GT-AETERNA-complete-handoff.zip` | Repository files plus all three larger model bundles already arranged in their folders. Easiest full transfer to another Mac. |
| GitHub **Code → Download ZIP** | Documentation, reference images, catalog, CAD renders/scripts/exports and website source. Add the model bundles below if needed. |
| `GT-AETERNA-original-rfq-baseline.zip` | Ten unchanged original STL exports covering the five older quote designs. Historical geometry, not the new Tripo revision. |
| `GT-AETERNA-editable-blender-cad.zip` | Ten editable Every Step Legacy Blender scenes across the mechanical and appearance iterations. |
| `GT-AETERNA-legacy-mamba-models.zip` | Two earlier artwork studies, each as GLB and STL, for the included legacy viewers. |

Checksums for the ZIP downloads are published with the release as `SHA256SUMS.txt`. Per-model filenames, roles and checksums are in the JSON manifests under `models/`. STL does not carry the textured appearance of the product; use the references and renders alongside the geometry.

## Put the files together

The complete ZIP needs only one extraction. Open its `GT-AETERNA-handoff` folder in Codex.

If using separate downloads, first unzip the repository. Extract the chosen model bundle into that repository folder, merging its `models/` or `output/` folders with the folders already present. Preserve the bundle's internal paths. On macOS, Finder may create an extra wrapper folder when unzipping; move that wrapper's contents into the repository root instead of nesting an additional `output` or `models` folder.

Original baseline models belong under `models/original-rfq-baseline/`; the legacy GLB/STL files belong under `models/legacy-mamba/`; native Blender scenes belong under their matching `output/cad/` revision directories. The manifests list the exact paths.

## View the work

- Catalog: open `output/catalog/index.html` in a browser, or open the supplied catalog PDF in the same folder.
- Latest Every Step comparison: open `output/cad/review-v7/index.html`. Earlier review folders preserve the revision history. These are appearance studies, not a new visual approval.
- 3D editing: after extracting the Blender bundle, open the desired `.blend` in Blender. The scene copies remove original-machine path metadata; supplied scripts provide a configurable font fallback. Exact lettering can depend on the Georgia system font.
- Legacy interactive model studies: use `models/legacy-mamba/index.html` or `compare.html` after extracting the GLBs. Serve the repository locally if browser file restrictions prevent loading models; viewers use the original pinned public Three.js CDN.
- Website concepts: see `websites/README.md`.

No production validation is implied. New artwork intake, usable capacity, closure and stability engineering, material/finish selection, cemetery fit and physical prototype review remain pending.
