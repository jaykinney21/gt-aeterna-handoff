# New urn redesign — working RFQ specification matrix

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

October 4, 2026. **Status: CURRENT_USER_GENERATING_TRIPO.** Mom is preparing new Tripo models and revised specifications. Those new files have not been received or checked in this workstream. The older document package is held; this folder is a local, fillable planning package, not an exported old ZIP or a vendor submission.

## What the status labels mean

- **User intent:** direction given in the conversation; not evidence of accepted geometry or physical performance.
- **Historical source:** a value or appearance from recovered docs 46–50; conflicts must be resolved before it becomes an active specification.
- **Pending:** no chosen value, file or supplier agreement yet. A blank is not permission to assume a value.
- **Verified:** reserve for an actual file measurement, supplier agreement or documented sample test; no incoming-file geometry is verified yet.

All five worksheets currently remain **design intent**. A **budgetary quote package** can be assembled after new file identities/units, intended variants and engineering gaps are stated. A **firm manufacturing quote** needs an agreed revision, geometry and scope, or clearly priced contingent engineering. **Production release** follows engineered capacity/closure/walls/fit and accepted physical samples. Nothing here is production approved.

## Family/source matrix

Source selection below is for historical traceability. It is not owner approval of a new model's final name, reference view, size or SKU. The actual incoming design may differ.

| Theme family / worksheet | Original quoted family | Exact recovered updated source | Historical assembly size | Material/spec status |
|---|---|---|---|---|
| [Glove / Home Run](HOME-RUN-WORKING-SPEC.md) | MVP / Baseball | Doc 46, `74. Home Run Legacy_ urn design shown in image_9c4a6a.docx` | 13.25 H × 8.75 diameter in; two conflicting compact versions | Resin/hand paint in source; exact material, new geometry and closure pending |
| [Snake/basketball / Court Legend](COURT-LEGEND-WORKING-SPEC.md) | Forever in the Game / Basketball | Doc 47, ` 9.5 _Court Legend_ Legacy urn design shown in the provided file image_9cb3aa.docx` | 10.75 H × 8.5 diameter in | Resin/hand paint in source; 203 in³ base claim conflicts with dimensions |
| [Blue sneaker / Legacy Ascend](LEGACY-ASCEND-WORKING-SPEC.md) | Legacy Lives On / Sneaker | Doc 48, ` 71.  _Legacy Ascend Series_ urn design shown in image_f0d019.docx` | 12 H × 8.5 diameter in | New circular base differs from original rectangle; resin/process and capacity pending |
| [Floral vessel / Black & Gold](BLACK-AND-GOLD-WORKING-SPEC.md) | Timeless Elegance / Midnight Blossom | Doc 49, ` 72. _Black & Gold_ Legacy urn design shown in image_90f88b.docx` | 10.75 H × 7.5 diameter in | Vase/lid plus base; original and updated loading differ; exact new closure pending |
| [Maternal diorama / Mom's Tough Love](MOMS-TOUGH-LOVE-WORKING-SPEC.md) | Mom's Tough Love / Diorama | Doc 50, `70.  _Mom_s Tough Love_ Legacy urn design shown in image_719ed0.docx` | 11 H × 8 diameter in; distinct 10-inch/8-inch-wide and “Because I Said So” alternatives | Top-and-bottom access in source; 150/200 in³ alternatives are not interchangeable |

## Shared architecture decisions to fill in

| Field | Display version | Compact version | Acceptance status |
|---|---|---|---|
| Finished overall height | Roughly 12 in desired; confirm whether larger designs remain | ≤10 in desired, including every component/finish | User intent; final envelope not approved |
| Finished maximum width × depth | ___ × ___ in/mm | ___ × ___ in/mm | Pending; historical diameters are not new limits |
| Usable ash capacity | 200 in³ inherited general target; original blue-sneaker request was 210+ | 200 in³ user target (~3.28 L) | Target only; not measured or production approved |
| Storage architecture | Base-only may be selected if volume works; other route ___ | Full engineered vessel/integrated foot recommended, or connected hollow upper + short base; chosen route ___ | Recommendation is not owner approval |
| Base shape and outside W×D×H | ___ | ___ or none | Pending; 7-inch width/2–4-inch height is an aesthetic wish |
| Fill access and closure | Top/bottom/other ___; part ___ | Top/bottom/other ___; part ___ | Pending; recovered closures are proposals |
| Artwork attachment / shared passage | ___ | ___ | Pending; select independent chamber versus communicating chamber |
| Specific resin/process | Ask supplier to nominate suitable SLA resin and compare MJF PA12 S where relevant | Same; exact selection ___ | Inquiry intent; material not approved |
| Walls, fit, seal and hardware tolerances | Supplier engineering proposal ___ | Supplier engineering proposal ___ | No new tolerance approved in these worksheets |
| Appearance / chosen reference view | ___ | ___ | Pending new user files and reference selection |
| New filenames, units and orientation | ___ | ___ | No new files received; unitless STL needs separate unit record |
| Quantity by design/variant | ___ | ___ | Quote request only; no order committed |
| Target cemetery/property and allowed envelope | If relevant ___ | Exact property, opening and interior ___ | No universal cemetery fit approval |

## Capacity conflict that must be resolved

For base-only storage, a 7-inch outside-diameter × 4-inch outside-height cylinder has at most **153.94 in³**; a 7×7×4-inch outside square has at most **196 in³**. Neither can hold 200 in³ after walls/hardware. A rectangle 7 inches wide and 4 high needs more than 7.14 inches depth even before walls. Do not preserve a shallow base and copy the old 200+ in³ label.

For compact storage, engineering a full hollow vessel or a connected upper-plus-base chamber can provide more volume. Hollow decorative voids, thin fingers/laces or disconnected parts are not automatically fillable. Measure the closed usable chamber and loading access. If a separate base and sculpture are used, define the exact interface and whether it communicates with the ashes.

## Incoming component record — duplicate rows as needed

| Part role / variant | New filename / revision | Unit / orientation | Measured bounds | Contains ashes? | Cavity/wall/mesh status | Editable source available? |
|---|---|---|---|---|---|---|
| Artwork or full vessel / ___ | Awaiting | Pending | Not measured | Pending | Not checked | Pending |
| Base / ___, if selected | Awaiting | Pending | Not measured | Pending | Not checked | Pending |
| Lid/plate / ___ | Awaiting or engineering needed | Pending | Not measured | Closure part | Not checked | Pending |
| Mount/interface / ___ | Awaiting or engineering needed | Pending | Not measured | Pending interface | Not checked | Pending |

Preserve raw Tripo mesh, appearance export/textures and input references. Record hashes and keep later repairs separate. Tripo STL is editable mesh artwork; it does not certify native mechanical CAD, walls, capacity, closure, printable detail or final colors.

## Release gates

| Gate | Minimum evidence | Current status |
|---|---|---|
| Design-intent review | New artwork/reference, chosen variant and explicit target values/unknowns | Waiting for user handoff |
| Budgetary RFQ | Named new files + units, intended finished envelope/storage/capacity, quantities and finish; list any engineering gaps to be priced | Not assembled; old package held |
| Firm print quote | Supplier-agreed actual revision/parts/material/process, build limits, engineering scope and inclusions/exclusions | Pending |
| Production | Connected usable capacity, accepted walls/closure/interface/fit tolerances, physical sample and finish/handling checks | Not started/approved in this package |

Ask the vendor to itemize engineering, each component's printing, supports/cleaning/curing, surface preparation, artistic finishing, hardware, assembly, personalization, packaging and freight. Confirm who delivers mechanical CAD, printable exports, assembly/section drawings and revised bill of materials. Keep keepsakes/jewelry as separate scoped packages; tiny chambers and cast-metal workflows cannot be inferred from a reduced adult STL.

Related checklist: [new-file intake and quote/production requirements](../research/new-stl-intake-and-specification-checklist-2026-10-04.md). This working package remains local; no old ZIP was regenerated, shared or sent.
