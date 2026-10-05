# Catalog pilot - revision B

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

September 19, 2026. The bounded visual pilot now contains **seven individual vessel concept images and one Every Step accessory panel**. It is an internal review, not a published sales catalog or the complete 72-entry collection.

## Deliverables

- `output/catalog/index.html`: editable catalog, eight cards, source links and review notes.
- `output/catalog/catalog-review-v2.pdf`: eight-page review snapshot.
- `output/catalog/index-v1.html`: previous source-sheet storyboard preserved.
- `output/catalog/pilot-v2-prompts.json`: eight initial generation jobs and references; P01 correction linked separately.
- `output/catalog/pilot-v2-manifest.json`: selected assets, source document IDs, dimensions and SHA256 hashes.
- `CATALOG-COMPLETION-CHECKLIST.md`: completed steps, pilot acceptance, remaining accessory/detail work and full-catalog expansion.

All imagery uses built-in image_gen. Nine calls total in this pass: six original-reference heroes, Infinite Loop revision, one accessory panel, and one targeted basketball snake correction. No external paid API, publishing or software purchase.

## Visual and factual review

Source sheets 36-40 and 63 were viewed before generation. Every generated image was inspected full-size. All six original directions retain their distinctive subject, colors and base family. This does not imply exact CAD correspondence: ornament, texture and fine sculptural details remain artistic interpretations. Mom's speech bubble and all plaque wording were omitted for separate editorial review. Basketball revision B generated a second snake head; selected revision C replaces it with a tapered tail. Original source sheet ambiguity is not treated as a reason to retain an obvious extra head.

Infinite Loop now has a flat lid. Its ribbon remains a visual loop interpretation: a correct Möbius half-twist is not demonstrated. This unresolved issue is visible on its catalog card and PDF page.

Every Step accessory study uses document 63: miniature keepsake, infinity-path pendant and dog-tag keychain. Rose-gold is explicitly a separate accessory variant from the original bronze vessel. Scale, ash cavities, threading, seal and QR functionality are not established. Bracelets and heart necklace are not illustrated yet. Other designs have no approved matching bundle in this pilot.

No unverified dimensions/capacities, prices, durability, fit, inventory or active digital-service claims appear in the catalog. Source sheets remain linked for internal reference only.

## Validation

- All eight selected assets load and have recorded hashes/dimensions.
- Parent browser review at desktop width 1280 confirmed all eight images loaded, no horizontal overflow, and editable heading behavior (test restored).
- HTML download button was invoked, but the browser's download wait timed out; saved-copy reopen/persistence is **not verified**. Save copies into the same catalog folder to preserve relative image links. Native browser Save As is an alternative.
- PDF has eight pages; extracted text includes the concept label on every page. All eight pages rendered with Poppler and were visually inspected together; accessory page inspected full-size. No clipping/overlap found. Local fontconfig file resolves bundled Poppler's default configuration issue.
- PDF is a snapshot, not linked live to browser edits. `build_pilot.py` reproduces original revision B outputs; preserve manually edited copies before rerunning it.

Next creative acceptance is owner review of the hero directions, especially inscription wording and generated sculptural interpretation. Final sales use still requires sample/engineering validation and approved copy. Full 72-entry image expansion is not represented as complete.
