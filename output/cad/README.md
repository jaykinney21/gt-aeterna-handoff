# Every Step Legacy CAD studies

The current appearance review is [v7](review-v7/index.html). It is still awaiting owner visual approval and has no engineered cavity, closure, capacity, wall-thickness, or printability approval. Review documents retain the limitations of each earlier revision.

| Work | Review and evidence | Status |
| --- | --- | --- |
| Envelope study | `feasibility.json`, `envelope_study.py` | Dimensional feasibility study; not a print part |
| Mechanical baseline / sculptural v1 | Root `sculptural-validation*.json`, `sculptural_candidate.py`, candidate images and exported STLs | Provisional candidate; modeled cavity results include failed early targets and a later 205.10 in³ result. Physical capacity and seal remain untested |
| Sculptural v2 | [Gallery](review/index.html), [PDF](review/Every-Step-Legacy-review-v2.pdf), `refinement-v2/sculptural-validation.json`, STL/GLB exports | Provisional source-informed engineering candidate; appearance and functional acceptance outstanding |
| Appearance v3 | [Gallery](review-v3/index.html), `refinement-v3/appearance-status.json` | Appearance-only overlapping forms; earlier capacity does not apply |
| Appearance v4 | [Gallery](review-v4/index.html), `refinement-v4/appearance-status.json` | Source-traced appearance draft; no engineering release |
| Appearance v5 | [Gallery](review-v5/index.html), iteration images and `refinement-v5/ITERATION-REVIEW.md` | Appearance refinement and preserved pass15; no manufacturing release |
| Appearance v6 | [Gallery](review-v6/index.html), `refinement-v6/ITERATION-REVIEW.md` | Appearance revision; provisional proportions |
| Appearance v7 | [Gallery](review-v7/index.html), `refinement-v7/ITERATION-REVIEW.md`, `appearance-status.json` | Latest appearance draft; ten final rendered views preserved |

The supplied galleries contain the actual saved renders. Generated catalogue illustrations are separate from these Blender renders. Historical engineering evidence does not establish the capacity or performance of later appearance revisions.

Editable scenes are in the [CAD release bundle](../../models/README.md). Extract the ZIP into the repository root to restore each `.blend` beside its Python source. Scripts use Blender's `bpy`, `bmesh`, and `mathutils`; run a build script with `blender --background --python <script.py>`. Rendering may be expensive and regenerates that revision's local outputs.

Exact lettering requires Georgia. The portable scripts accept `GT_AETERNA_FONT=/path/to/Georgia.ttf`; otherwise they use macOS Georgia when available and Blender's built-in font as a fallback. A fallback changes typography. The font itself is not included.

The HTML review builders use Python's standard library. `build_review.py` additionally uses ReportLab to rebuild the PDF. The source reference is included at `references/source-documents/63/image1.png` from the repository root. Independent scene and gasket scripts preserve their documented sampling limits.
