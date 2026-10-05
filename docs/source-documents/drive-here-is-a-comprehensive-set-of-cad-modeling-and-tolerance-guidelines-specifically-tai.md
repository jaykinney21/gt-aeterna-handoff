# Here is a comprehensive set of CAD modeling and tolerance guidelines specifically tailored for producing your memorial urns through on-demand, zero-MOQ 3D printing services like JawsTec or Sculpteo

Historical extracted project source. Preserve its design and prompt details as source intent; current October 4 worksheets and the repository README govern later decisions. Dimensions, prices, product claims and suggested tolerances in this source are unverified until checked. Private sharing links and personal contact details are omitted.

Here is a comprehensive set of CAD modeling and tolerance guidelines specifically tailored for producing your memorial urns through on-demand, zero-MOQ 3D printing services like JawsTec or Sculpteo.
Providing this master specification sheet to your 3D designers will ensure every file is optimized for structural integrity, cost-effective printing, and perfect assembly right out of the box.
Master CAD & Tolerance Guidelines: 3D-Printed Urns
1. Global Volumetric & Scaling Standards
The core function of these vessels requires strict adherence to internal volume capabilities.
Standard Adult Capacity: The internal hollow cavity MUST yield a minimum volume of 200 cubic inches (approx. 3,277 cubic centimeters or 3.27 liters).
Companion Capacity: For dual-urn designs (like "The Union"), the combined internal volume must reach 400 cubic inches.
Verification: Designers must run a bounding box and volume analysis on the negative space (the hollow interior) of the CAD file prior to export to guarantee capacity is met.
2. Wall Thickness & Hollowing (Cost & Strength Optimization)
Since online printing bureaus charge primarily by material volume, hollowing your models correctly is critical for keeping your margins healthy without compromising strength.
Minimum Wall Thickness: Maintain a uniform wall thickness of 2.5mm to 3.5mm across the primary vessel body.
Base Weighting: The bottom 10% of the vessel (or the pedestal base) should have a thicker wall—4.0mm to 5.0mm—to lower the center of gravity and prevent tipping.
Escape Holes: If printing via SLA (Resin) or SLS (Nylon Powder), the hollowed CAD files MUST include escape holes to drain excess uncured material.
Placement: Position a primary escape hole (minimum 10mm diameter) at the absolute lowest point of the internal cavity. For bottom-loading designs, the primary access port naturally serves this function. For top-loading designs, ensure the lid opening is wide enough for drainage.
3. Tolerances for Closures, Lids, and Base Plates
3D printers have a margin of error. If you design a 100mm lid for an exactly 100mm opening, it will not fit. You must design "clearance" (empty space) between mating parts.
Slip-Fit Lids (Top Loading): For lids designed to slide in and be sealed with adhesive, design a 0.3mm to 0.4mm offset (gap) between the outer wall of the lid's lip and the inner wall of the vessel's neck.
Threaded Closures: If utilizing screw-on lids or baseplates, use coarse, rounded threads rather than fine, sharp threads. Allow a 0.4mm to 0.5mm clearance between the male and female threads to prevent binding from print friction.
Gasket Channels: If a silicone O-ring or gasket is used for an airtight seal, model a recessed channel into the baseplate or lid lip. The channel depth should be roughly 70% of the gasket's thickness to ensure the rubber compresses correctly when closed.
Hardware Inserts: For bottom-loading plates secured with screws, do not print the threads directly into the plastic (they will strip). Instead, model a pilot hole to accommodate a heated brass threaded insert. Model the hole 0.1mm smaller than the outer diameter of the brass insert so it bites into the plastic when melted in.
4. Sculptural Detailing & Minimum Feature Size
Your catalog features complex dioramas (e.g., the Nurse's IV pole, the Firefighter's hose, the Musician's saxophone keys).
Unsupported Details: Any protruding or freestanding element (like the tip of a syringe or the edge of an angel wing) must have a minimum thickness of 1.5mm to 2.0mm. Anything thinner risks snapping off during post-processing, shipping, or final handling.
Embossed/Engraved Text: For text (like the plaques on the bases) to read clearly after printing and painting, recessed text should be at least 0.5mm deep, and raised text should be 0.5mm high. Font strokes must be at least 0.8mm thick.
5. File Export Specifications
Format: Export final manufacturing files as STEP (.stp) files for the highest geometric accuracy, or high-resolution STL (.stl) files.
Mesh Integrity: The CAD software must output a "manifold" or "watertight" mesh. There can be no inverted normals, open edges, or intersecting internal geometry, which will cause the slicing software at the print bureau to fail.
