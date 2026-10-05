# AETERNA: CAD and manufacturing restart

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

Research date: September 16, 2026. Recommendations below are proposals, not supplier quotations or engineering approval. No new supplier has received our files, no outreach has been sent, and no sample has been ordered.

## Recommendation

Use Midnight Blossom to learn whether we can make an attractive, reliably closing adult urn. First establish its scale, cavity capacity and wall thickness; then print a closure test and a finish sample; only then order the complete urn. Compare JLC3DP and PCBWay against our existing Xometry relationship using the same specification. Keep the sculptural exterior, but make the cavity and closure dimensionally controlled and editable.

The useful idea in the pasted post is that we can buy individual services without owning a factory. It does not remove engineering, quality control, customer research, or working capital. Our immediate bottleneck is a verified product, not robots or an Amazon advertising campaign.

## Where we left off

The September 7 recovery found four STLs, concept images, specifications, website repositories, supplier notes and running droplet agents. It recovered 50 Gmail attachments and 12 Drive documents. Jay confirmed no physical prototypes and no Seller Central account. These are historical findings, not a fresh audit of inbox, servers or accounts today. See [recovery record](GMAIL-DRIVE-TRIAGE.md) and [project triage](PROJECT-TRIAGE.md).

Midnight Blossom has separate body and lid meshes and a visibly hollow body. Earlier checks found no boundary or nonmanifold edges using exact-coordinate matching. That does not establish minimum wall thickness, self-intersection freedom, closure fit, strength or usable capacity. Native CAD/STEP was not recovered. The inherited requirement is at least **200 in³ / 3.2774128 L after closure intrusions** and concealed bottom access. Midnight Blossom is top-loading, so it requires an explicit exception or redesign.

Xometry's Fred Pinasco requested individual component CAD files in March for manual quote Q75-8453-9981. That was the basketball design, not Midnight Blossom. No completed price quote was found in the prior recovery. Reopening this conversation should acknowledge the change of design rather than silently substitute files. Original reply (private source omitted from public handoff).

## What accurate AI-assisted CAD would mean for us

An attractive render, a watertight STL, and editable engineering CAD are different deliverables. A faceted STL saved inside a STEP file does not recover design intent or a useful feature tree. For the urn we need explicit units, named dimensions, separate components, a measurable cavity, section drawings, material-dependent tolerances, and repeatable exports.

| Tool / approach | Useful role | Limitation and decision |
|---|---|---|
| build123d + Python | Parameterized cavity, neck, base, plate, gasket seat and test coupons; reproducible dimensions and STEP/STL exports | Best first code-driven experiment for controlled geometry. Organic flowers still need a sculpture workflow. Pin the library version and inspect exports independently. |
| FreeCAD | Human-editable solid model, sections and engineering review; a route for a CAD contractor to maintain the design | Ask for the native model and named parameters, not just a final export. Mesh-to-solid recovery may be substantial work. |
| Blender | Preserve and edit the sculptural mesh, inspect cross-sections, repair mesh and prepare decorative geometry | Its print tools help inspect a mesh; reported solid volume must not be mistaken for the empty cavity's capacity. |
| Zoo Design Studio / Zookeeper / API | Compare prompt-driven, editable parametric geometry with the code approach | Suitable for a bounded benchmark before buying API usage. It does not guarantee manufacturability or substitute for physical validation. |
| Mechanical CAD contractor | Rebuild critical interfaces, review tolerance stack and produce a supplier-ready pack | Buy a defined deliverable and ownership of source files. Ask the supplier whether this service is included or separately quoted. |

build123d documents solid modeling and STEP/STL export workflows. FreeCAD documents scriptable parametric objects. Blender's 3D Print Toolbox offers geometry checks. [build123d examples](https://build123d.readthedocs.io/en/latest/introductory_examples.html), [FreeCAD parametric objects](https://github.com/FreeCAD/FreeCAD-documentation-docusaurus/blob/Stable/docs/python-scripting/parametric-objects.md), [Blender print tools](https://extensions.blender.org/add-ons/print3d-toolbox/).

Zoo supports editable KCL-based models, geometry analysis and CAD workflows, but its own FAQ distinguishes assistance from guarantees of physical performance. Its cloud modeling services and plan/API costs should be evaluated before uploading private designs. Recent surface-modeling additions mean it should not be dismissed as exclusively a simple-primitives tool. [Zoo FAQ](https://docs.zoo.dev/docs/faq), [February 2026 update](https://docs.zoo.dev/blog/whats-new-feb-2026), [API documentation](https://docs.zoo.dev/docs/developer-tools/api).

The pasted post does not identify a particular Claude CAD plugin or provide reproducible evidence for its Astra workflow. We have not verified those specific integrations here. They are optional interfaces; the acceptance criteria should be independent of which model or plugin generates the geometry.

### Proposed architecture

Preserve the original meshes unchanged. Work on revisioned copies. Engineer a simple cavity and closure first, then combine them with the sculptural envelope. A separate functional inner vessel and decorative shell is another option to quote: it can isolate the seal from the ornament, but costs space, assembly work and money. It is not automatically the best design.

For additive manufacture, the final sculpted body may legitimately remain a high-quality mesh while the closure and other mechanical components have native solid CAD. Do not force a huge ornamental mesh into an unusable faceted STEP solely to satisfy a file-extension checklist. Agree the deliverables with the manufacturer. Request native editable sculpture files as well as parametric mechanical source where feasible.

## Manufacturer shortlist

These are verified service capabilities, not proof that a supplier will deliver our finish, accept this design, or meet a particular price.

| Supplier | Why approach them | What to ask / unresolved issue |
|---|---|---|
| **JLC3DP — first comparison** | SLA, SLS and MJF options; published size, feature and fit guidance; painting/dyeing and other finishing | Quote a closure coupon and full-size body/lid separately. Ask which resin or PA12 grade, orientation, cleanup and finish achieve the specification. Decorative hand-painted flowers are not established by a generic spray-paint service. |
| **PCBWay — first comparison** | Industrial additive services, assembly and finish options; contact route for custom requirements | Request separate appearance and functional routes; ask whether they supply engineering, inserts, finish samples and multicolor hand detailing. Their guidance requests drawings for threads, inserts and assembly. |
| **Xometry — existing relationship** | Existing manual quote and broad process network | Reopen Q75-8453-9981, explain the design change, resolve component count, and ask for design-service support before uploading an ambiguous package. |
| **JawsTec — reserve functional quote** | Nylon printing / vapor smoothing route | Ask for full-size build feasibility, tolerances after smoothing, and whether the desired decorative finish is subcontracted. |
| **Sculpteo — reserve comparison** | Multiple print materials and finishing options | Compare landed price for the exact revision. Its published small-order minimum charge is separate from a minimum quantity; tiny test parts are not necessarily billed at raw material cost. |
| **Protolabs — reserve engineering/process comparison** | Additive manufacturing and process-specific secondary operations | Ask whether their finishing and engineering scope fits a premium decorative consumer object. |
| **Pietra / Sourcify — later sourcing support** | Supplier discovery or managed sourcing, with different service scopes | Useful once the product, finish, quantities and target cost are defined. Confirm fees, minimum project size, sample ownership, QC and responsibility for defects. |
| **Alibaba RFQ — later batch competition** | Broader factory discovery after a validated sample | Compare the same drawings, finish standard, quantity and delivery basis. Inspect the factory/sample and put measurable acceptance terms in the order. |

Capability sources: [JLC3DP services](https://jlc3dp.com/capabilities/3d-printing-service), [PCBWay SLS and custom contact](https://www.pcbway.com/rapid-prototyping/3D-Printing/3D-Printing-SLS.html), [PCBWay drawing guidance](https://www.pcbway.com/blog/3D_Printing/3D_Printing_Inquiry_Failure_Problem_69124e6c.html), [Xometry design services](https://www.xometry.com/xometry-design-services/), [JawsTec smoothing](https://www.jawstec.com/vapor-smoothing-services/), [Sculpteo pricing explanation](https://learn.sculpteo.com/en/how-are-prices-calculated-1), [Protolabs secondary operations](https://www.protolabs.com/services/secondary-operations/), [Pietra sourcing](https://www.pietrastudio.com/sourcing), [Sourcify scope](https://sourcify.com/how-it-works/), [Alibaba Trade Assurance](https://tradeassurance.alibaba.com/).

### Which process to test

| Route | What the first sample would teach us | What it would not establish |
|---|---|---|
| SLA resin, finished | Floral detail, surface appearance and paint feasibility | Long-term impact resistance or production suitability without the actual resin's data and testing |
| MJF/SLS PA12, finished | Closure function, handling and a nylon production candidate | That texture and painted appearance meet a premium retail standard |
| FDM PLA | Cheap local dimensions, ergonomics and early interface iteration | A saleable urn finish or equivalence to resin/nylon production tolerances |
| Urethane casting from a master | An alternative batch process after geometry is frozen | An automatic cost saving; tooling, undercuts, hollow construction and finishing need a quote |
| Ceramic, wood or metal | A different final product/material proposition | That the same plastic design, wall thickness or closure translates directly |

[JLC3DP material/process guidance](https://jlc3dp.com/capabilities/3d-printing-service), [Sculpteo materials](https://www.sculpteo.com/en/materials/), [Xometry urethane casting](https://www.xometry.com/capabilities/urethane-casting/).

JLC3DP's design guidance gives different clearances and tolerances by process. It also lists build envelopes large enough for the recovered body's bounding box in selected SLA/MJF/SLS configurations, **assuming the STL coordinates are millimeters**. This is only an envelope check; orientation, supports, warpage, drainage and finish allowances remain supplier decisions. Its generic minimum clearances are not a validated urn-thread specification. [Design guidelines](https://jlc3dp.com/help/article/3d-printing-design-guideline).

## Practical checks on the post

| Claim | Finding / implication for AETERNA |
|---|---|
| A mailed prototype costs about $20 | Possible for some small parts; not an evidenced quote for our approximately 178 × 178 × 266 mm body, lid, finishing, tax and freight. Obtain actual itemized quotes. |
| Buy an A1 mini or P1S | A1 mini has a 180 mm cube build volume; P1S 256 mm. Our body would exceed both upright heights at the assumed millimeter scale. A P1S might permit another orientation, subject to slicing and support review. Do not shrink an adult urn merely to fit a printer. |
| Text-to-CAD makes manufacturing accurate | It can generate editable geometry. Accuracy must be demonstrated with dimensions, sections, cavity measurement, export checks and a physical fit test. |
| Take the third-cheapest supplier and a $50 sample | Neither is a quality-control method or a universal price. Select against the same specification, evidence and total landed cost. |
| Check 1688 for the real factory cost | Domestic prices may differ in quantity, finish, tax, export service and delivery terms. They are negotiation context, not directly comparable landed quotes. |
| Several Etsy sellers with hundreds of reviews validate our market | They indicate activity in an adjacent category. They do not prove demand for our design, price or material. Reviews may cover other products or an entire shop. |
| Price at 5× COGS | That is 80% gross margin only on the costs counted as COGS. It says nothing by itself about marketplace fees, fulfillment, returns, acquisition or fixed costs. |
| Kickstarter supplies money before building | Product-design campaigns require a working prototype and honest presentation. It is not a substitute for the first physical sample. |
| ShipBob / FBA solve fulfillment immediately | Fulfillment still needs packaging, dimensions, demand and cost comparisons. ShipBob states minimum monthly spend/order-volume requirements; request the applicable offer rather than assume economical single-unit service. |
| A $399 Hugging Face biped | Confirmed as Pollen Robotics' Microduck introductory preorder, before taxes/shipping; first deliveries targeted before Christmas 2026. It is a small learning platform, not evidence of an urn factory robot at that price. |
| Go2 with full SDK for about $2,500 | The official page separates models/features. The post's price-plus-development-access combination is not established here; obtain an exact SKU quote if ever relevant. |
| Film a job for two weeks and fine-tune π0 | Open robot models and tooling exist, but training/deployment require compatible robot data, actions/state, setup and evaluation. Human first-person footage alone is not a turnkey robot-control dataset. |
| Five times as many founders in 18 months | A prediction in the post, not established research. It is unnecessary to the urn business case. |

Sources: [A1 mini](https://us.store.bambulab.com/products/a1-mini), [P1S](https://us.store.bambulab.com/products/p1s), [Kickstarter prototype rules](https://help.kickstarter.com/en-us/articles/16236428-what-are-the-rules-for-hardware-and-product-design-projects), [ShipBob minimums](https://www.shipbob.com/affordable-fulfillment-services/), [Microduck announcement](https://pollen-robotics.com/microduck/blog/introducing-microduck/), [Unitree Go2](https://www.unitree.com/go2/), [LeRobot workflow](https://huggingface.co/docs/lerobot/main/index), [Physical Intelligence openpi](https://github.com/Physical-Intelligence/openpi).

Electronics, KiCad, ESP32/Raspberry Pi, MuJoCo and Isaac Lab are optional future research. No recovered first-urn requirement needs a powered mechanism. Adding those now would add integration work without resolving capacity, finish or closure. This report did not independently validate every electronics price in the pasted post.

## Commercial experiments alongside engineering

1. Compare original sculptural-urn listings in the intended price band. Record product-level evidence: material, capacity, dimensions, closure, reviews about breakage/finish, delivery and actual price. Treat storefront review totals cautiously. Do not infer our conversion rate from competitors.
2. Conduct five exploratory conversations with funeral professionals and five with people voluntarily interested in memorial products. Ask about existing purchase decisions and what makes a vessel trustworthy; do not solicit recently bereaved people indiscriminately or present a render as an available product.
3. Show two clearly labeled concepts and a realistic proposed price range after supplier costing. Measure requests for a sample or a follow-up, not just compliments. This is qualitative learning, not statistically validated demand.
4. Film the genuine design and prototype process. Distinguish concept renders, prototype material and final product in captions. Social connection setup is recorded in SOCIAL-ACCESS.md (private source omitted from public handoff); no posting has occurred as part of this research.
5. After sample acceptance, use [AMAZON-LAUNCH.md](AMAZON-LAUNCH.md) to plan seller setup, listing evidence and ads. Calculate contribution before ads as selling price minus landed product cost, marketplace charges, fulfillment and expected returns. That contribution is the ceiling for break-even acquisition cost, before fixed overhead; calculate advertising targets from the chosen margin objective.

## Sequence and decisions

**First:** decide whether top-loading Midnight Blossom is acceptable as an engineering prototype, confirm units, and measure the cavity. **Second:** benchmark editable CAD and request comparable coupon/sample quotes. **Third:** choose a material/finish and test physical parts. **Fourth:** order a full sample only after the interface and finish are credible. **Fifth:** validate packaging and costs before inventory, listings and paid ads.

Budget remains unset. Separate CAD/rebuild cost, coupon cost, full sample cost, shipping and later production. Nothing in this report assumes approval to spend. Manufacturer inquiries can ask for cost ranges and required inputs before a fixed budget exists.

Ready-to-use next documents: [experiment and acceptance plan](PROTOTYPE-TEST-PLAN.md), [manufacturer outreach drafts](MANUFACTURER-OUTREACH-DRAFTS.md). The experiments are proposed; no new CAD model or physical test was completed in this research pass.
