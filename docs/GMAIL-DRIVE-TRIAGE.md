# Gmail and Google Drive project recovery

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

**September 7, 2026.** Priscilla's messages were found under **[private contact omitted]**, addressed to Jay's Flip-Tech mailbox. This recovery adds actual body/lid STL files, newer product specifications, manufacturing correspondence, and the shared project documents to the earlier GitHub/Susan assessment.

**The most useful next step is an engineering review of Midnight Blossom, while resolving whether its top-loading design is acceptable for the first product.** If bottom-loading is essential, commission that change explicitly. Manufacturing is not starting from zero: Xometry already reviewed a prior submission and requested separate component files.

## Recovered material

| Source | Saved evidence | Meaning for the project |
|---|---|---|
| September 1 — Midnight Blossom (private source omitted from public handoff) | Original 21,071,479-byte ZIP; separate body and lid STL files | Best newly recovered geometry candidate; still unqualified for production |
| September 1 — Urns (private source omitted from public handoff) | Blue Legacy, Bred Legacy, Can't Guard Me PDFs | Detailed visual references and SKU names, with material/capacity conflicts below |
| April 29 — Legacy Lives On (private source omitted from public handoff) | Sneaker urn specification DOCX | 200 in³ target, bottom-loading plate, personalization and finish intent |
| May 28 — These have STL Files (private source omitted from public handoff) | Five reference screenshots | Email claims underlying STLs exist; this message contains screenshots only. Separate manufacturing files for these images were not recovered |
| Other January–May design messages | 42 PNG reference images across the recovered design emails, including the five above | Design archive; screenshots and AI illustrations do not prove physical samples |
| May 6 — CAD file,upwork (private source omitted from public handoff) and companion message | Three mesh-view screenshots included in the 42 images | Evidence of modeling work, not editable CAD delivery or an accepted contractor handoff |
| Vessel Keepers logo (private source omitted from public handoff) | PDF | Another historical brand asset, not evidence of brand registration |
| After death process (private source omitted from public handoff) | DOCX | Original service vision; retain as historical business context |
| Graceful Tributes — Master (private source omitted from public handoff) | Nine project Google Docs exported as DOCX | CAD/tolerance guidance, production research, QC checklist, warranty draft, venue lists and outreach scripts |
| Separate emailed Drive links | Three additional DOCX files | Event/vendor intake form, crematories list, and questions to ask |
| Xometry correspondence (private source omitted from public handoff) | Message text plus March 15 RFQ PDF | Actual vendor response identifies the blocking deliverable |

Local originals: `recovered/gmail/` (historical private source; not bundled) and `recovered/google-drive/` (historical private source; not bundled). The Gmail recovery contains **50 original attachments**: 42 images, five PDFs, two DOCX files and one ZIP. The ZIP also yields two STL meshes. Drive recovery contains **12 DOCX exports/downloads**. Extracted text, OCR for searching images, hashes and indexes are under `research/gmail-drive/` (historical private source; not bundled) or beside the originals. OCR is a search aid, not a verified specification.

The Master folder's current recursive inventory exposed nine project documents and one unrelated PDF; no product image files appeared in its numerous collection folders. The unrelated PDF was excluded. This describes the accessible current folder contents, not proof that designs never existed elsewhere. Three emailed Docs links show Google's explicit deleted-file page; see the missing-material table below.

## The real manufacturing blocker

On March 15, Jay sent Xometry an RFQ for a Mamba basketball sample and batch quantities 10/25/50, attaching the combined STL and a three-page specification. Support acknowledged ticket **05186745**. A separate manual-quote conversation is **Q75-8453-9981**.

On March 16, Jay described the request as budgeting/product QA, with no target price, and said he was open to both domestic and international manufacturing. Fred Pinasco then requested **individual CAD files for each component**. No subsequent priced quotation or completed-part delivery was found in the searched Xometry correspondence. Latest substantive reply (private source omitted from public handoff).

The RFQ itself is inconsistent: page 2 describes two main components; page 3 lists three printed components—basketball shell, serpent and base—plus a separately sourced metal plate. Before resubmission, establish one bill of materials and supply each manufactured component separately with a common revision, scale and assembly drawing. Do not simply resend the combined mesh. No supplier message was sent during this triage.

## Midnight Blossom geometry assessment

| Part | Triangles | Extents in native STL coordinates | Limited mesh check |
|---|---:|---|---|
| Body | 525,802 | 178.102 × 178.132 × 265.516 | Complete binary STL; zero boundary edges, nonmanifold edges or zero-area triangles in exact-coordinate check |
| Lid | 64,074 | 126.976 × 126.976 × 41.998 | Same limited checks passed |

Rendered geometry shows a floral vessel with a hollow interior and a threaded top opening, plus a separate threaded lid. The parts occupy different positions in the source coordinate system; they are not supplied as a verified assembled fit. If the intended units are millimeters, the body is approximately 7.01 × 7.01 × 10.45 inches and the lid is 5.00 × 5.00 × 1.65 inches. **STL does not establish those units**, and these part heights must not simply be added to infer assembled height.

The edge checks establish closed mesh surfaces, not a leakproof finished urn. They do not establish usable cavity volume, wall thickness, self-intersections, thread clearance, seal performance, printability, durability or rights to commercial manufacture. No STEP/native CAD, dimensional drawing, material assignment or acceptance record came with the ZIP.

Keep both source filenames unchanged in the archive despite their repeated `.stl` extensions. Hashes and measurements are in `research/gmail-drive/midnight-stl-inspection.json` (historical private source; not bundled); geometry previews are in `research/gmail-drive/previews/` (historical private source; not bundled).

## Specifications that need reconciliation

| Priority | Evidence | Required correction |
|---|---|---|
| High | Blue Legacy states a 7.25 × 7.25 × 3.75-inch cavity and 210+ in³ | Those rectangular dimensions multiply to **197.11 in³** before intrusions. A 7.25-inch square also has a 10.25-inch diagonal, exceeding the stated 8.5-inch exterior circular base. If 7.25 inches means internal diameter instead, the cylinder is about **154.81 in³**. Redraw the actual cavity |
| High | Bred Legacy's illustrated base calculation is about 86.59 in³, yet the illustration calls it above 200 | **86.59 is below 200**. The text proposes extending the cavity into the upper vessel; prove that connected usable volume in a section drawing and remove the contradictory base-only claim |
| High | Can't Guard Me says the 7.2-inch diameter × 2.8-inch base is the urn and holds 200+ in³ | Even its complete exterior cylinder is only **114.00 in³**. A base-only internal cavity cannot meet that claim. Enlarge it or engineer a connected upper cavity |
| High | January master brief and newer sneaker specifications require concealed bottom access; Midnight Blossom has threaded top access | Decide whether Midnight Blossom is an approved first-SKU exception or needs redesign |
| High | Can't Guard Me specifies “3D Printed Resin” but also MJF/SLS; other docs mix PLA, SLA resin and PA12 | Select one material/process pairing and have the manufacturer approve thickness, inserts and finishing for it. Sculpteo distinguishes powder-based PA12 processes from SLA resin; these are not interchangeable recipes. [Sculpteo materials](https://www.sculpteo.com/en/materials/) |
| Medium | Master guidelines prescribe common clearances, gasket compression and heated inserts across materials | Treat as preliminary design inputs. Obtain hardware-specific hole dimensions and process-specific tolerances from the engineer/manufacturer |
| Medium | QC draft suggests a 48-hour sunlight observation and then calls the catalog “Business Ready” | Retain the checklist structure but agree measurable acceptance limits. A short observation and completed paperwork do not prove long-term performance or production readiness |
| Medium | Warranty draft promises one-year structural coverage, 72-hour damage reporting, restricted refunds and disposal of broken urns | Unapproved draft. Reconcile with actual supplier/carrier terms and marketplace requirements before use; remove any blanket disposal instruction where remains could be present |
| Medium | Several sneaker/sports references contain recognizable branding graphics or athlete-related treatments | Keep as references pending an original commercial design and rights review. An AI-generated image or renamed SKU does not establish clearance |

These calculations use the dimensions in the documents; they are not measurements of a manufactured object. The January minimum **200 in³** (about 3.277 L) and repeated bottom-loading requirement are established design intent. Individual products may need larger capacity, and no recovered physical sample has validated any claim.

## Business direction and Amazon notes

The August 31 messages explicitly discuss an **AETERNA urn-product pivot**, with artistic finishes and premium pricing aspirations. This supports making the urn the immediate deliverable. The older venue, crematory and service-coordination documents remain useful background but are not a prerequisite for an Amazon product pilot. Supplier directories, projected referrals, prices and “no MOQ” assertions in the notes are leads/assumptions, not confirmed commercial terms.

The “amazon homemade” note is too certain that this manufacturing model qualifies. Amazon requires an application and review of the actual maker/product/process. Its current page lists hand-designed and other classifications, waives the monthly Professional plan fee for approved Handmade sellers after the first month, and allows a product ID **or an exemption request**. Therefore the other note's blanket “UPC required” assertion is also too strong. Follow the verified sequence in `AMAZON-LAUNCH.md`; budget on actual approval and fees. [Amazon Handmade](https://sell.amazon.com/programs/handmade).

Do not carry speculative premium prices, bundles of five keepsakes, fountains, clocks, sound features or digital memorial promises into the first listing until costed and deliverable. Jay confirmed no Seller Central account and no physical prototype.

## Missing material and operational risk

| Item | Verified status / action |
|---|---|
| February 25 document A (private source omitted from public handoff) | Google reports deleted; recover from owner-held copies/Trash if available |
| February 25 document B (private source omitted from public handoff) | Google reports deleted; original title unknown from the email |
| February 10 service logos (private source omitted from public handoff) | Google reports deleted; separate Vessel Keepers PDF was recovered |
| Five May 28 designs described as having STLs | Only screenshot attachments in that message; actual source models remain unlocated |
| February ChatGPT shared concept links | Indexed as references; not recovered as native files or treated as engineering evidence |

To recover the ZIP after the direct browser download stalled, one copy of **Midnight Blossom.zip** was saved from Gmail into Jay's My Drive, then downloaded locally. Existing Drive files, sharing permissions and mailbox messages were not moved or deleted. Opening a Gmail message may mark it read. Private source material is excluded from Git.

## Next work in order

1. Preserve access: address Workspace billing and retain these local copies.
2. Select first product: evaluate Midnight Blossom as the shortest recovered route; explicitly settle its top-loading exception versus the established bottom-loading requirement.
3. Give a CAD engineer the selected reference, minimum usable capacity, actual scale, material/process, closure requirements and the component-file request from Xometry. Require native source plus appropriate manufacturing exports, section/capacity report, hardware list and an assembled drawing.
4. Quote one full sample and a small closure-fit test, with finishing and packaging identified. Use the existing Xometry contact after the package is corrected; also obtain a comparable quote against the same revision.
5. Inspect the physical sample, establish costs, then finish Seller Central, one truthful listing and the capped ads test. Update site/agent product facts only from the approved SKU record.
