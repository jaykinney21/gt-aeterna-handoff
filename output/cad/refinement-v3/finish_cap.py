import bpy
from pathlib import Path
from mathutils import Vector
O=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v3.blend'))
s=bpy.context.scene;cam=s.camera
p=bpy.data.materials['Inset black cap'].node_tree.nodes['Principled BSDF'];p.inputs['Specular IOR Level'].default_value=.05;p.inputs['Roughness'].default_value=.82;p.inputs['Base Color'].default_value=(.009,.013,.014,1)
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v3.blend'))
views=[('front',(0,-700,160),(0,0,140),315),('rear',(0,700,160),(0,0,140),315),('side',(700,0,160),(0,0,140),315),('left',(-700,0,160),(0,0,140),315),('top',(0,-1,700),(0,0,140),230),('perspective',(300,-650,330),(0,0,140),320),('detail',(170,-650,250),(0,0,210),170),('base-detail',(0,-650,190),(0,0,30),220),('front-reference',(60,-700,240),(0,0,145),320),('rear-reference',(-60,700,240),(0,0,145),320)]
for name,pos,target,scale in views:
 cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale;s.render.filepath=str(O/f'appearance-{name}.png');bpy.ops.render.render(write_still=True)
