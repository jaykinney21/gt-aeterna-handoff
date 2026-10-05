import bpy,math
from pathlib import Path
from mathutils import Vector
O=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(O/'Every-Step-Legacy-sculptural-candidate.blend'))
s=bpy.context.scene;cam=s.camera
# Retain exact validated part meshes; show the intended paint mask for human review.
seam=bpy.data.objects.get('Bronze ribbon - visual guide only');seam.hide_render=False;seam.hide_set(False)
for v in seam.data.vertices:
 outward=Vector((v.co.x,v.co.y,0)).normalized();v.co+=outward*.25
for o in s.objects:
 if o.name.startswith('Exterior relief union'):o.hide_render=True;o.hide_set(True)
source=bpy.data.collections.get('Editable relief source - hidden')
for o in source.objects:
 if not o.name.startswith('Sculptural fold edge'):o.hide_render=False;o.hide_set(False)
bpy.data.materials['Matte black'].node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.58
for name,pos in [('front',(0,-700,150)),('side',(700,0,150)),('rear',(0,700,150)),('perspective',(400,-600,340)),('bottom',(0,-1,-600)),('top',(0,-1,700))]:
 cam.location=pos;cam.rotation_euler=(Vector((0,0,140))-cam.location).to_track_quat('-Z','Y').to_euler();s.render.filepath=str(O/f'candidate-{name}.png');bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-sculptural-candidate.blend'))
