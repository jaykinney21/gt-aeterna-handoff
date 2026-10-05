# Model release downloads

Large models and editable CAD are supplied as three GitHub release ZIP assets. Download the required bundle and extract it into the repository root. Its `MEMBERS.json` records every model's relative path, size, and SHA-256 hash. The matching `*.manifest.json` files in this folder record the complete ZIP hash.

| Bundle | Contents | Extracted location |
| --- | --- | --- |
| `GT-AETERNA-original-rfq-baseline.zip` | Ten untouched STLs: two components for each of the older five quoted designs | `models/original-rfq-baseline/` |
| `GT-AETERNA-editable-blender-cad.zip` | Ten Blender scenes: envelope study, mechanical baseline, sculptural candidates, appearance v3–v7, preserved v5 pass15 | `output/cad/` |
| `GT-AETERNA-legacy-mamba-models.zip` | Two historical user project designs, each as GLB and STL | `models/legacy-mamba/` |

The original RFQ and legacy exports retain their original bytes. Portable Blender copies change only fixed-width local path metadata; geometry, material, camera, and all other decompressed bytes are preserved. All ten copied scenes were opened in Blender 5.2.1 LTS. Appearance typography uses Georgia; the font is supplied by macOS and is not redistributed here.

These models are historical or provisional design studies. The older quote baseline is separate from the new Tripo files Mom is preparing. No model in this handoff is a manufacturing release.

The legacy HTML viewers require the legacy bundle's GLBs in this directory and an internet connection for pinned Three.js 0.160.0. The WebP preview can be viewed immediately. `legacy-vessel-render.txt` preserves an earlier failed-download response; no usable PNG was recovered for that item. Serve the repository with `python3 -m http.server 8000` and open the viewer through localhost after extraction.

Verify repository asset hashes with `python3 tools/check_assets.py`. Add `--downloads /path/to/downloaded/zips` to verify every release ZIP and its members.
