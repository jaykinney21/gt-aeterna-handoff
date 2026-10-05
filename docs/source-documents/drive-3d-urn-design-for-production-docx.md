# 3D Urn Design for Production

Historical extracted project source. Preserve its design and prompt details as source intent; current October 4 worksheets and the repository README govern later decisions. Dimensions, prices, product claims and suggested tolerances in this source are unverified until checked. Private sharing links and personal contact details are omitted.

Technical Integration and Optimization of Additive Manufacturing for Personalized Memorial Vessels: A Production Strategy for On-Demand Industrial Fabrication
The global memorial industry is currently navigating a significant paradigm shift, transitioning from traditional mass-produced urns toward hyper-personalized, on-demand additive manufacturing (AM) solutions. This evolution is driven by a convergence of maturing industrial 3D printing technologies and an increasing consumer demand for vessels that reflect the unique narrative of a life well-lived.1 For designers seeking to initiate production without the capital-intensive requirement of minimum order quantities (MOQ), digital manufacturing bureaus such as JawsTec and Sculpteo provide the necessary industrial infrastructure to transform complex digital assets into high-fidelity, permanent containers.3 The process of bringing conceptual designs, such as figurative sculptures or architectural book-style urns, into the physical realm requires a sophisticated synthesis of design for additive manufacturing (DfAM), material science, and mechanical engineering for secure containment.1
Industrial Infrastructure and the On-Demand Manufacturing Model
The core advantage of modern online 3D printing services lies in their ability to provide "production-of-one" capabilities. Traditional manufacturing methods, such as ceramic casting or injection molding, necessitate expensive tooling and molds, creating a financial barrier that often requires order volumes in the thousands to achieve ROI.2 Conversely, additive manufacturing operates on a digital-to-physical pipeline where the marginal cost of customization is negligible.3
Comparative Capabilities of Industrial Service Bureaus
The selection of a service provider is the foundational step in a production strategy. JawsTec and Sculpteo, while both operating within the industrial space, offer distinct advantages based on their technological focus and material portfolios. JawsTec is frequently recognized for its highly competitive pricing and specialized vapor polishing services for Multi Jet Fusion (MJF) parts, which are critical for achieving the high-gloss, liquid-tight surfaces often desired in premium urns.4 Sculpteo, as a subsidiary of the chemical giant BASF, offers one of the most extensive material libraries in the industry, including specialized high-performance polymers and advanced surface treatments like metal plating for plastic.10

Service Feature
JawsTec Specification
Sculpteo Specification
Core Technologies
MJF, SLS, SLA, FDM 8
SLS, MJF, SLA, DMLS, PolyJet 3
Minimum Order Quantity
No MOQ (1 part minimum) 4
No MOQ (1 to 100k parts) 3
Standard Lead Time
4-7 Business Days 4
2-15 Business Days 3
Max Build Size (MJF)
380 x 280 x 380 mm 13
370 x 274 x 380 mm 17
Specialized Finishes
Vapor Polishing, Bead Blasting 8
Chemical Smoothing, Metal Plating 12
The industrial landscape also includes aggregators like Craftcloud, which facilitate real-time price comparisons across hundreds of manufacturing partners globally, providing an entry point for designers to optimize their production costs without being tied to a single facility's constraints.20
Technical Foundations of Cremation Vessel Engineering
An urn is, at its most fundamental level, a protective container for irreplaceable remains. This functionality imposes strict engineering requirements on internal volume, wall thickness, and closure integrity that must be addressed at the modeling stage.1
Mathematical Determination of Internal Volume
The standard industry calculation for urn capacity is based on a 1:1 ratio between the individual's body weight in pounds and the required internal volume in cubic inches.22 While this provides a baseline, a more nuanced approach involves accounting for the specific cremation method. Fire-based cremation typically follows the standard ratio, but alkaline hydrolysis (often called hydro cremation) results in approximately 20% more ash volume, requiring a larger vessel for the same starting weight.25
In a professional CAD environment, calculating the volume of an irregular sculptural shape is achieved through advanced boolean operations. Designers use the "Boundary Fill" tool in Fusion 360 to create a physical body representing the internal air gap of the model; the properties of this body then provide the precise volume in cubic inches or liters.27 For organic meshes created in Blender, the "3D Print Toolbox" add-on serves a similar function, allowing the designer to verify volume and identify non-manifold geometry that would cause print failures.30
Wall Thickness and Structural Stress Management
The wall thickness of an urn dictates its resilience during post-processing and long-term display. In technologies like Selective Laser Sintering (SLS) and Multi Jet Fusion (MJF), the minimum allowable wall thickness for a successful print is approximately 1.0 mm.13 However, for a functional container of significant size, a wall thickness of 2.0 mm to 3.0 mm is recommended to provide structural rigidity and to resist warping during the cooling cycle.6

Technology
Min Feature Size (mm)
Recommended Wall (mm)
Post-Processing Impact
SLS (Nylon PA12)
0.6 - 0.8 34
1.5 - 2.5 6
Media tumbling requires thicker walls 35
MJF (Nylon PA12)
0.5 34
1.2 - 2.0 32
Isotropic properties improve strength 38
SLA (Resin)
0.4 32
1.0 - 2.0 32
High detail but brittle if too thin 39
Metal (DMLS)
0.4 33
1.0 - 2.0 6
Sharp edges must be filleted to avoid stress 33
Second-order insights into wall thickness reveal that nonuniform wall sections are a primary cause of warping and "sink marks." In MJF and SLS processes, thicker sections accumulate more thermal energy, leading to differential cooling rates across the part.38 Therefore, designers should aim for uniform wall thickness throughout the model or utilize internal ribbing to provide strength without excessive material accumulation.38
Design Suggestion 1: The Commemorative Figurative Sculpture Urn
As depicted in "Version 1" of the provided reference image, the commemorative figurative sculpture represents a high-detail artistic tribute, specifically showcasing a grandmother and child in a seated armchair pose. This design requires a hybrid modeling approach that bridges the gap between organic character sculpting and mechanical container engineering.42
Digital Sculpting and Asset Preparation
The production of a lifelike figurative urn typically begins with digital sculpting in a mesh-based environment like Blender or ZBrush. This allows the designer to capture nuanced emotional details—facial expressions, fabric textures, and posture—that are essential for a personal memorial.44 For maximum likeness, designers often utilize photo reference from multiple angles or AI-assisted face generation based on a single portrait to accelerate the initial modeling phase.44
Once the visual form is finalized, the model must be prepared for the specific constraints of additive manufacturing. The sculpture is traditionally hollowed to save on material costs and to prevent excessive thermal mass.30 This is achieved using a "Solidify" modifier in Blender, set to an offset of 2.5 mm, followed by a "Boolean Difference" to create the internal ash-containment cavity.30
Engineering the Secure Bottom Closure
To maintain the aesthetic integrity of a sculpture, the primary filling opening should be located at the base of the model.1 This requires the design of a screw-in plug or a bolted plate.
Threaded Interface: A coarse, modeled thread (e.g., M60x4) is integrated into the base of the sculpture. Modeled threads are preferred over tapped threads for 3D printing as they can be printed with the necessary clearance (0.2 mm to 0.4 mm) to avoid binding.51
Base Plug: The plug itself is modeled as a separate component with matching external threads. To facilitate easy sealing, a recess for a rubber O-ring or a printed TPU gasket is incorporated into the plug's flange.1
Powder Removal: Because figurative sculptures often contain deep undercuts or internal pockets, multiple escape holes (minimum 3.5 mm diameter) must be strategically placed in the base to ensure that all unsintered powder is removed during the cleaning stage.35
The choice of material for this design Suggestion is critical. Alumide—a composite of nylon and aluminum powder—is highly recommended for sculptural urns because it provides a premium metallic sheen and a tactile weight that mimics traditional bronze at a fraction of the cost.57
Design Suggestion 2: The Relief-Carved Book-Style Companion Urn
The architectural book-style urn, as seen in "Version 3" of the reference image, provides a sophisticated solution for companion memorials. This design allows for a large internal volume (approximately 400 cubic inches) and provides expansive surfaces for relief-carved scenes and high-legibility inscriptions.2
Relief Modeling and Text Legibility
Transforming a 2D illustration, such as the kitchen scene depicted in the reference image, into a 3D relief requires careful management of depth. For industrial SLS or MJF printing, embossed details should have a minimum height of 1.0 mm to remain clearly visible after media tumbling and surface finishing.35

Detail Type
Minimum Dimension
Best Orientation
Embossed Text
1.0 mm Height 35
Face Down (XY Plane) 41
Engraved Text
1.0 mm Depth / 1.0 mm Width 37
Face Up 41
Relief Carvings
0.5 mm - 1.0 mm Depth 33
Uniform across part 8
Font Size
14 pt / 2 mm Height 35
Sans-Serif for clarity 35
The narrative power of Version 3—"Baby, Can you help Grandma find her glasses?"—is carried by the text. To ensure longevity, the text should be modeled with a slight draft angle (1-2 degrees) to reinforce fine features like the dots on lowercase "i" characters, preventing them from snapping off during bead blasting.35
Managing Warping in Large-Format Box Designs
Large, flat panels—such as the covers of a book-shaped urn—are prone to warping due to the accumulation of thermal stresses in powder-bed processes.34 To mitigate this risk, a "stiffness-by-design" strategy is employed.
Ribbing and Fillets: Internal 3.0 mm fillets are applied to all corners to distribute stress.33 Internal ribbing is modeled in a honeycomb or grid pattern on the interior faces of the panels to increase the section modulus without substantially increasing the part's weight.38
Material Choice: For large box-style urns, Glass-Filled Nylon (PA12 GF) is the superior material. The addition of glass beads significantly increases stiffness and reduces the coefficient of thermal expansion, ensuring that the book urn remains dimensionally accurate and sits flat on a shelf.5
Mechanical Closure: Sliding Spine or Hinged Access
The closure mechanism for a companion urn must be secure and repeatable. A sliding compartment, where the book spine slides along a set of modeled rails, offers a discreet and reliable opening.65 This design requires a tolerance of 0.3 mm to 0.5 mm between the mating rails to account for the grainy surface texture of SLS/MJF parts.65 Neodymium magnets, recessed into modeled cavities and glued in place post-printing, provide a tactile "snap" that ensures the spine remains securely closed during handling.67
Design Suggestion 3: The Functional Ceramic-Style Jar Urn
The high-gloss jar urn, referenced as "Version 2" (Ceramic Cookie Jar), utilizes classic vessel geometry to create a familiar and comforting memorial object. This design emphasizes surface quality, parametric modeling, and advanced sealing technologies to provide a high-end consumer-grade finish.1
Parametric Modeling for Scaling and Customization
The use of parametric modeling software like Fusion 360 or Shapr3D is highly advantageous for jar designs. By establishing a set of global parameters—such as internal height, radius, and wall thickness—the designer can rapidly rescale the urn to meet various cubic inch requirements (e.g., adult vs. child sizes) while keeping the closure mechanism and wall thickness constant.72
One of the critical parameters is the thread diameter . For a jar urn, a custom thread based on standard SPI (Society of the Plastics Industry) bottle finishes is often used. This allows the 3D-printed urn to potentially interface with commercially available lids or internal sealing liners.71
Achieving a High-End Ceramic Finish
The "raw" finish of an MJF Nylon part is typically light gray and slightly porous.13 To replicate the glossy finish of the ceramic jar in Version 2, vapor polishing is the optimal post-processing solution.8
Mechanism: The part is exposed to acetone vapor in a controlled industrial chamber, which microscopically melts the surface layer of the nylon.8
Sealing: This process effectively seals the material's surface pores, making the vessel naturally watertight and preventing the ingress of moisture that could lead to internal degradation in cold or humid environments.8
Color: Vapor-polished parts can be dyed black or other dark colors before or after smoothing. The result is a deep, glossy, uniform finish that rivals traditional high-fire glazes.8
The "Shell and Insert" Containment Philosophy
For a jar-style urn, a sophisticated engineering approach involves a two-part containment system. The 3D-printed urn functions as an "outer shell," while the actual cremated remains are placed in a high-strength internal bag or a secondary containment vessel.1 This strategy ensures maximum security; if the urn is ever dropped or damaged, the remains remain undisturbed within the primary seal.1

Containment Component
Material Suggestion
Function
Decorative Outer Shell
MJF Nylon PA12 (Vapor Polished)
Aesthetic appeal and narrative symbolism 1
Internal Ash Insert
Standardized Plastic Jar or Bag
Primary containment and moisture barrier 1
Threaded Lid
PA12 with Gasket Recess
Secondary seal and mechanical security 1
Material Science and Technology Selection for Permanence
The longevity of a memorial product is its most critical functional requirement. The material must resist environmental factors such as UV degradation, humidity, and temperature cycles.1
Polyamides vs. Resins for Long-Term Memorials
Nylon PA12 and PA11 (printed via SLS or MJF) are the preferred choices for functional memorial vessels. They offer high tensile strength (approximately 48-50 MPa) and exceptional chemical resistance.64 MJF Nylon is particularly noted for its isotropic properties, meaning its strength is consistent across the X, Y, and Z axes, which is crucial for structural containers.38

Material Property
Nylon PA12 (MJF)
Nylon PA12 GF (SLS)
Alumide (SLS)
Tensile Strength (MPa)
48 64
51 17
48 34
Elastic Modulus (MPa)
1700 64
3200 17
3800 64
Elongation at Break
20% 64
9% 17
4% 57
Heat Deflection Temp
175°C 64
185°C 17
172°C 57
While resins (SLA) provide superior surface resolution, they are generally more susceptible to "aging" and can become brittle when exposed to sunlight over several years.39 If resin is used for a figurative sculpture, it must be finished with a high-quality UV-resistant paint or clear coat to ensure its permanence.21
Biocompatibility and Environmental Impact
For urns intended for traditional burial, biodegradable materials represent a growing market segment. 3D-printed bio-urns are typically manufactured using materials like "BioFila silk," which decomposes in the soil over approximately one year, returning the remains to nature without leaving toxic residues.78 Conversely, for home display, Nylon PA11 offers a sustainable, bio-based option derived from renewable resources while maintaining the strength and longevity of traditional petroleum-based plastics.5
Professional Outsourcing for Production-Ready CAD Assets
The transition from a conceptual image to a production-ready file often involves the collaboration of specialized 3D artists. The memorial industry has seen the emergence of agencies that specialize in "Image to 3D" conversion, turning cherished family photographs into fully realized digital sculptures.44
Briefing a 3D Artist for DfAM Compliance
When commissioning a file from a professional through platforms like Cad Crowd or Upwork, the designer must provide a detailed technical brief to ensure the asset is functional for additive manufacturing.82
Specify the Target Technology: Explicitly state if the part will be printed in SLS, MJF, or SLA. This informs the artist's decisions on hollowing and support removal.44
Define Mechanical Clearances: If the design includes a threaded lid, the artist must incorporate specific clearances (e.g., 0.3 mm) into the CAD model. Failure to do so will result in a part where the lid and body are fused or cannot be assembled.37
Provide Volume Requirements: Calculate the required internal capacity (e.g., "The internal void must measure exactly 210 cubic inches") so the artist can adjust the wall offset accordingly.21
Escape Hole Strategy: Instruct the artist on where to place holes for powder removal to ensure they are hidden but effective.35

Platform
Recommended Use Case
Estimated Asset Cost
3dactions
Bespoke Figurative Sculptures 44
$500 - $2,000+
Cad Crowd
Engineering and Mechanical Design 82
$200 - $800
Etsy
Stylized Characters and Miniature Portraits 86
$50 - $250
Meshy.ai
AI-Generated Rough Concept Meshes 88
Low/Credit-based
The Convergence of Craft and Digital: A Future Outlook
As additive manufacturing becomes more integrated into the memorial sector, the industry is seeing a hybridization of digital and traditional craftsmanship. High-end providers like Foreverence and In The Light Urns combine 3D-printed base forms with hand-applied patinas, gold leaf, and manual sanding.2 This "digital artisan" model satisfies the consumer's desire for the accuracy of a likeness with the soul of a handcrafted object.1
The closure of designer marketplaces by companies like Sculpteo signals a move toward the professionalization of the industry.11 Service bureaus are increasingly focusing on becoming B2B production partners for memorial entrepreneurs, offering optimized pipelines for the secure, rapid production of one-of-a-kind tributes.3
Actionable Production Recommendations
To successfully launch the production of the 3D-printed urn designs suggested, the following steps are recommended:
Prototype the Closure Mechanism: Before printing a full-size urn, order a "test coupon" from JawsTec or Sculpteo consisting of just the threaded interface or hinge. This allows for the verification of mechanical fit and surface finish at a minimal cost.51
Optimize for Vapor Smoothing: For designs like Suggestion 3 (The Jar), ensure the geometry is optimized for uniform cooling and finishing by avoiding sharp internal corners and maintaining consistent wall thickness.8
Select PA12 Smooth for Functional Threads: JawsTec's "PA12 Smooth" material provides an excellent balance of durability and low-friction surface, making it the ideal choice for high-diameter screw closures.94
Verify Volume Post-Hollowing: Always perform a final boolean verification in CAD after the artist delivers the file. Even minor scaling adjustments can have a significant impact on the volume-to-weight capacity.29
Utilize 3MF File Formats: When exporting from CAD to the manufacturing bureau, use the 3MF format rather than STL. 3MF includes metadata about material units and part relationships, reducing the risk of scaling errors during the production intake.41
By integrating these industrial standards and technical guidelines, the memorial entrepreneur can leverage the transformative power of additive manufacturing to provide dignified, secure, and deeply personal vessels that truly honor the legacy of those they are designed to contain..1
Works cited
3D‑Printed Urns: DIY Files, Material Choices, and How to Make a Secure - Funeral.com, accessed January 27, 2026, https://funeral.com/blogs/the-journal/3d-printed-urns-diy-files-material-choices-and-how-to-make-a-secure-dignified-container
3D Printing For Urns Means No Limits, accessed January 27, 2026, https://inthelighturns.com/blog/3d-printing-for-urns-means-no-limits
Sculpteo: Online 3D Printing Service | Instant Quotes, accessed January 27, 2026, https://www.sculpteo.com/en/
A Strong Alternative to Sculpteo for 3D Printing - JawsTec, accessed January 27, 2026, https://www.jawstec.com/jawstec-a-strong-alternative-to-sculpteo-for-3d-printing/
Guide to Plastic 3D Printing Materials - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/3d-learning-hub/3d-printing-materials-guide/plastic-3d-printing-materials/
Wall thickness 3D print: guidelines for strong, reliable parts - Sinterit – Professional SLS 3D Printers & Accessories, accessed January 27, 2026, https://sinterit.com/3d-printing-guide/design-for-3d-printing/wall-thickness-3d-print/
Additive Manufacturing: Make Cremation Urns More Custom, accessed January 27, 2026, https://inthelighturns.com/blog/additive-manufacturing-make-cremation-urns-more-custom
Vapor smoothing services - JawsTec, accessed January 27, 2026, https://www.jawstec.com/vapor-smoothing-services/
5 Ways to Make Your 3D Printed Parts Look Better - JawsTec, accessed January 27, 2026, https://www.jawstec.com/5-ways-to-make-your-3d-printed-parts-look-better/
Make and design your own material sample kit - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/sample-kit/
Sculpteo Shuts down Online 3D Printing Marketplace - 3DPrint.com | Additive Manufacturing Business, accessed January 27, 2026, https://3dprint.com/304058/basf-to-shut-down-sculpteos-online-3d-printing-marketplace/
Metal finishing for your 3D printed plastic parts - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/materials/finishes/metalization/
3D Printing in Nylon | JawsTec, accessed January 27, 2026, https://www.jawstec.com/nylon-3d-printing-service/
3D Printing Materials: Plastic, Resin, Metal - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/materials/
Polishing Finishes for 3D Printed Materials - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/materials/finishes/polishing/
3D Printing Capabilities - JawsTec, accessed January 27, 2026, https://www.jawstec.com/3d-printing-capabilities/
3D Printing Materials Technical Specifications - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/materials/compare/
Surface finishes - JawsTec, accessed January 27, 2026, https://www.jawstec.com/surface-finishes/
Chemical Smoothing 3D Printing Finish - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/materials/finishes/smoothing-beautifier/
Craftcloud® | The Streamlined 3D Printing Service, accessed January 27, 2026, https://craftcloud3d.com/
Custom 3D-Printed Urns: Design Process, Materials, Lead Times, and Wha - Funeral.com, accessed January 27, 2026, https://funeral.com/blogs/the-journal/custom-3d-printed-urns-design-process-materials-lead-times-and-what-they-cost
What Size Cremation Urn Do I Need? - OneWorld Memorials, accessed January 27, 2026, https://www.oneworldmemorials.com/pages/select-right-size-urn
What Size Urn Do I Need? | Memorials.com Info Center, accessed January 27, 2026, https://www.memorials.com/info/what-size-urn-do-i-need
Urn Size Calculation - Urns Northwest, accessed January 27, 2026, https://urnsnw.com/pages/urn-size-calculator
Easy To Use Calculator to Estimate Urn Capacity for Cremation Ashes, accessed January 27, 2026, https://www.artisurn.com/pages/ashes-urn-size-calculator
Urn-Size-Calculator - Dakota Bones, accessed January 27, 2026, https://dakotabones.com/urn-size-calculator
Quick Tip: Find Internal Volume - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=7yWWLiMmmHQ
Find Internal Volume in Fusion 360 | Do This before 3D-Printing - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=BLYSpxTQjt4
Calculating the Fill Volume of Containers & Molds | Fusion 360 Tips & Tricks - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=_DiKgqX29cI
How to fine grain hollow a model in Blender for 3d printing - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=mAIEIy3kLr4
Blender Tutorial Calculate the Volume or Area - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=26cx0Bi9n3E
Wall Thickness in 3D Printing: Recommendations, Minimum and Maximum Values, accessed January 27, 2026, https://www.raise3d.com/blog/3d-printing-wall-thickness/
Design Guidelines for Aluminum (AlSi₁₀Mg) | Metal 3D Printing - Materialise, accessed January 27, 2026, https://www.materialise.com/en/academy/industrial/design-am/aluminum
MJF vs SLS: 3D Printing Technologies Compared | Xometry Pro, accessed January 27, 2026, https://xometry.pro/en/articles/3d-printing-mjf-vs-sls/
8 Essential Design Tips for SLS 3D Printing | Xometry Pro, accessed January 27, 2026, https://xometry.pro/en-uk/articles/3d-printing-sls-design-tips/
MJF vs. SLS: Key Differences and Similarities - Protolabs, accessed January 27, 2026, https://www.protolabs.com/resources/blog/comparing-multi-jet-fusion-to-selective-laser-sintering/
3D Printing Design Guideline - JLC3DP, accessed January 27, 2026, https://jlc3dp.com/help/article/3D-Printing-Design-Guideline
Nylon 3D Printing Design Guide: SLS and MFJ - Protolabs, accessed January 27, 2026, https://www.protolabs.com/resources/design-tips/how-to-design-for-nylon-3d-printing/
Resin 3D printing service - JawsTec, accessed January 27, 2026, https://www.jawstec.com/resin-3d-printing-service/
SLS vs FDM vs SLA vs MJF: What to Choose for End‑Use Parts - TPM3D, accessed January 27, 2026, https://english.tpm3d.com/sls-fdm-sla-mjf-what-to-choose-for-end-use-parts/
Design and printing guidelines, accessed January 27, 2026, https://www.jawstec.com/wp-content/uploads/2022/03/Design-and-Printing-guidelines-3D-Printer-Series.pdf
Blender and Fusion 360 for 3d modeling combining : r/3Dprinting - Reddit, accessed January 27, 2026, https://www.reddit.com/r/3Dprinting/comments/1qculg5/blender_and_fusion_360_for_3d_modeling_combining/
Fusion 360 to Blender 3 0 for Sculpting - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=YbcNZElMEOM
Order unique bespoke 3D printed sculpture or figurine from images! - 3D actions, accessed January 27, 2026, https://3dactions.com/blog/bespoke-3d-printed-sculpture/
Turn any 2D image into a real life 3D creation, accessed January 27, 2026, https://3dactions.com/services/2d-to-3d/
AI 3D statue maker – Create 3D statues from single photo - ThreeDee design, accessed January 27, 2026, https://www.threedee.design/products/3d-statue-maker/
Artmellows 3D: Your Story shaped into Luxurious 3D Art, accessed January 27, 2026, https://artmellowsculpts.com/
Create a Unique Burial Urn : 6 Steps (with Pictures) - Instructables, accessed January 27, 2026, https://www.instructables.com/Create-A-Unique-Burial-Urn/
Blender How To Hollow Out An Object - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=NXxlN_aHhIA
Blender tutorial to make object solid and hollow for 3D printing - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=NJrgti09c6o
Mastering Thread Measurements for 3D Printing Caps: A Step-by-Step Guide - Bryan King, accessed January 27, 2026, https://bdking71.wordpress.com/2025/01/03/mastering-thread-measurements-for-3d-printing-caps-a-step-by-step-guide/
Adding internal threads for 3D printing that work with standard machine screw fasteners, accessed January 27, 2026, https://forums.autodesk.com/t5/fusion-design-validate-document/adding-internal-threads-for-3d-printing-that-work-with-standard/td-p/12511676
3D printable screw lid for 82mm container in Fusion 360 – threads always too fine / won't print - Autodesk Community, accessed January 27, 2026, https://forums.autodesk.com/t5/fusion-design-validate-document/3d-printable-screw-lid-for-82mm-container-in-fusion-360-threads/td-p/13981170
How to design a threaded, screw-on cap? - See Comment- : r/3Dprinting - Reddit, accessed January 27, 2026, https://www.reddit.com/r/3Dprinting/comments/u25w2p/how_to_design_a_threaded_screwon_cap_see_comment/
Guide to Watertight 3D Printing: Comparing FDM, SLA, and SLS Technologies | Formlabs, accessed January 27, 2026, https://formlabs.com/blog/watertight-3d-printing/
Printing a solid air tight and water tight print - MakerWorld - Bambu Lab Community Forum, accessed January 27, 2026, https://forum.bambulab.com/t/printing-a-solid-air-tight-and-water-tight-print/189426
All You Need to Know About Alumide 3D Printing - 3Dnatives, accessed January 27, 2026, https://www.3dnatives.com/en/all-about-alumide-3d-printing-240620254/
Faster Alumide 3D Printing: New Sizes & Colors - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/blog/2017/04/10/news-on-our-alumide-3d-printing-material-faster-just-as-colorful/
Materials used in 3D printing - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/blog/2019/08/28/materials-used-in-3d-printing/
Urn Sizes: What You Need to Know to Choose the Right Urn for Ashes, accessed January 27, 2026, https://urnsnw.com/blogs/default-blog/articles-urn-sizes-what-you-need-to-know-to-choose-the-right-urn-for-ashes
Design Guide: SLS 3D Printing | Selective Laser Sintering - HLH Rapid, accessed January 27, 2026, https://hlhrapid.com/knowledge/design-guide-sls-3d-printing/
Design Tips for 3D Printing Materials in Cold Weather - JawsTec, accessed January 27, 2026, https://www.jawstec.com/design-tips-for-3d-printing-materials-in-cold-weather/
3D printing plastic: Which material should you choose? - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/blog/2018/07/10/3d-printing-plastic-which-material-should-you-choose/
What is the difference between Selective Laser Sintering (SLS) and Multi Jet Fusion (MJF) 3D printing? | Protolabs Network, accessed January 27, 2026, https://www.hubs.com/knowledge-base/hp-mjf-vs-sls-3d-printing-technology-comparison/
How to Make a Simple Sliding Box in Tinkercad | 3D Printing Tutorial - YouTube, accessed January 27, 2026, https://www.youtube.com/watch?v=5I303zC3ss0
How do I print sliding lid box? : r/3Dprinting - Reddit, accessed January 27, 2026, https://www.reddit.com/r/3Dprinting/comments/af8ib4/how_do_i_print_sliding_lid_box/
Sizing a lid for a box – General discussion, announcements and releases - Prusa3D Forum, accessed January 27, 2026, https://forum.prusa3d.com/forum/english-forum-general-discussion-announcements-and-releases/sizing-a-lid-for-a-box/
How to Design and 3D Print Snap-Fit Joints for Enclosures, Boxes, Lids, and More, accessed January 27, 2026, https://formlabs.com/blog/designing-3d-printed-snap-fit-enclosures/
3D Printing an Urn : r/prusa3d - Reddit, accessed January 27, 2026, https://www.reddit.com/r/prusa3d/comments/1abaslr/3d_printing_an_urn/
Designing this slide-lock box. This the 5th time I print the lid and finally get the mechanism to work only to realise I put the lift handle on the wrong side : r/3Dprinting - Reddit, accessed January 27, 2026, https://www.reddit.com/r/3Dprinting/comments/uclne2/designing_this_slidelock_box_this_the_5th_time_i/
I made a mason jar thread you can use to make your designs : r/3Dprinting - Reddit, accessed January 27, 2026, https://www.reddit.com/r/3Dprinting/comments/1lpnjun/i_made_a_mason_jar_thread_you_can_use_to_make/
Parametric Stackable Container with Screw Lid - Free 3D Print Model - MakerWorld, accessed January 27, 2026, https://makerworld.com/en/models/476420-parametric-stackable-container-with-screw-lid
Day #3: 3D Printable Print-In-Place Hinged Box - Learn Shapr3D in 10 Days for Beginners, accessed January 27, 2026, https://www.youtube.com/watch?v=_qCXfPby75Y
Parametric Lid and Container - Threaded - Free 3D Print Model - MakerWorld, accessed January 27, 2026, https://makerworld.com/en/models/42815-parametric-lid-and-container-threaded
All About Vapor Polishing - JawsTec, accessed January 27, 2026, https://www.jawstec.com/vapor-polishing/
SLA vs SLS vs MJF: Which 3D Printing Process is Right for You? - GD Prototyping, accessed January 27, 2026, https://www.gd-prototyping.com/sla-vs-sls-vs-mjf/
THE COMPLETE SURFACE FINISH GUIDE FOR 3D PRINTING - Sculpteo, accessed January 27, 2026, https://info.sculpteo.com/hubfs/downloads/The%20Complete%20Surface%20Finish%20Guide%20For%203D%20Printing.pdf
3D Printed Biodegradable Cremation Ashes Urn 'Cross' | legendURN US, accessed January 27, 2026, https://www.legendurn.com/3d-printed-bio-urn-2.html
Food-safe 3D printing: Which materials are compatible? - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/3d-learning-hub/3d-printing-materials-guide/food-safe-3d-printing-materials/
Biocompatible 3D Printing Materials: PA11 & PA12 Guide - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/en/3d-learning-hub/3d-printing-materials-guide/3d-printing-biocompatible-materials/
3D Print & 3D Printing Service. Where Art, Tech & Storytelling meet!, accessed January 27, 2026, https://3dactions.com/
Hire Freelance 2D to 3D Conversion Services for Your Company | Cad Crowd, accessed January 27, 2026, https://www.cadcrowd.com/cad-drafting-and-design/2d-3d-conversion
Hire Freelance 3D Artists for 3D Printing & 3D Modeling Service Companies - Cad Crowd, accessed January 27, 2026, https://www.cadcrowd.com/consumer-products/art-design
Best Freelance 3D Printing Experts for Hire (Jan 2026) - Upwork, accessed January 27, 2026, https://www.upwork.com/hire/3d-printers/
How to Measure Urn Capacity: Interior Volume, Shape, and Why Size Char - Funeral.com, accessed January 27, 2026, https://funeral.com/blogs/the-journal/how-to-measure-urn-capacity-interior-volume-shape-and-why-size-charts-differ
Custom 2D to 3D Model Service: Character & Mascot Design (digital File) - Etsy, accessed January 27, 2026, https://www.etsy.com/listing/1761020526/custom-2d-to-3d-model-service-character
CUSTOM 3D Model for Printing | 3D Model for 3D Printing, Convert 2D Image to 3D Model, Custom 3D Model for STL - Etsy, accessed January 27, 2026, https://www.etsy.com/listing/1638965690/custom-3d-model-for-printing-3d-model
Instantly from 2D Sketch to 3D Model: Effortless 3D Printing Design with AI - Blog - Meshy, accessed January 27, 2026, https://www.meshy.ai/blog/sketch-to-3d
Generate 3D Models from Images - Image to 3D - Meshy AI, accessed January 27, 2026, https://www.meshy.ai/features/image-to-3d
Customized Cremation Urns in Minnesota by Foreverence, accessed January 27, 2026, https://foreverence.com/blogs/news/truly-custom-cremation-urns
Cremation Urn for Ashes | Our Process | Shop Foreverence, accessed January 27, 2026, https://foreverence.com/pages/process
Exciting News from Sculpteo: Our Return to Handcrafted Excellence, accessed January 27, 2026, https://www.sculpteo.com/blog/2025/04/01/our-return-to-handcrafted-excellence/
The Marketplace closure will have no impact on our activities - Sculpteo, accessed January 27, 2026, https://www.sculpteo.com/blog/2023/10/13/the-marketplace-closure-will-have-no-impact-on-our-activities/
3D printing in Nylon | JawsTec, accessed January 27, 2026, https://www.jawstec.com/nylon-material/
