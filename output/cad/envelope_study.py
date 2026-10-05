"""Run with Blender --background --python this_file.py. Units are millimeters.
Feasibility envelope only; no printable part or manufacturing approval implied.
"""
import bpy
import bmesh
import json
import math
from pathlib import Path

OUT = Path(__file__).resolve().parent
P = dict(height=279.4, base_height=50.8, base_diameter=171.45,
         body_width=139.7, body_depth=127.0, wall=4.0)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 0.001
scene.unit_settings.length_unit = 'MILLIMETERS'

def cylinder(name, width, depth, bottom, top):
    bpy.ops.mesh.primitive_cylinder_add(vertices=256, radius=1, depth=1,
                                       location=(0, 0, (bottom+top)/2))
    obj = bpy.context.object
    obj.name = name
    obj.scale = (width/2, depth/2, top-bottom)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return obj

base = cylinder('OUTER base envelope', P['base_diameter'], P['base_diameter'], 0, P['base_height'])
body = cylinder('OUTER body envelope - provisional 5.5in width', P['body_width'], P['body_depth'], P['base_height'], P['height'])
for obj in (base, body):
    obj.display_type = 'WIRE'
    obj.hide_render = True

w = P['wall']
cavity = cylinder('EMPTY connected cavity - excludes hardware', P['base_diameter']-2*w,
                  P['base_diameter']-2*w, w, P['base_height']-w)
upper = cylinder('temporary upper cavity', P['body_width']-2*w, P['body_depth']-2*w,
                 P['base_height']-w-1, P['height']-w)
bpy.context.view_layer.objects.active = cavity
mod = cavity.modifiers.new('Connected upper and base volume', 'BOOLEAN')
mod.operation = 'UNION'
mod.solver = 'EXACT'
mod.object = upper
bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.data.objects.remove(upper, do_unlink=True)
bm = bmesh.new()
bm.from_mesh(cavity.data)
volume = abs(bm.calc_volume(signed=True))
nonmanifold = sum(not e.is_manifold for e in bm.edges)
bm.free()

def analytic(width):
    base_v = math.pi/4*(P['base_diameter']-2*w)**2*(P['base_height']-2*w)
    upper_v = math.pi/4*(width-2*w)*(P['body_depth']-2*w)*(P['height']-P['base_height'])
    return (base_v+upper_v)/25.4**3

assert nonmanifold == 0, 'Cavity must be a closed measurable volume'
assert abs(volume/25.4**3-analytic(P['body_width'])) < 0.1
record = dict(status='PROVISIONAL ENVELOPE STUDY, NOT A PRINT PART', parameters_mm=P,
              assumptions=['Elliptical straight body, not sculptural reference silhouette',
                           '5.5in body width is an assumption, not a source dimension',
                           '4mm provisional walls; no screw bosses, seal, closure or finish geometry'],
              cavity_volume_in3=volume/25.4**3, cavity_volume_liters=volume/1e6,
              cavity_nonmanifold_edges=nonmanifold,
              analytic_sensitivity_in3={str(width): analytic(width*25.4) for width in [4.5,5,5.5,6,6.75]},
              base_only_gross_upper_bound_in3=math.pi/4*6.75**2*2,
              validation='Mesh cavity is closed and agrees with analytic volume within 0.1 cubic inch; product capacity not validated')
(OUT/'feasibility.json').write_text(json.dumps(record, indent=2)+'\n')
scene['study_status'] = record['status']
scene['parameters_mm'] = json.dumps(P)
scene['cavity_volume_in3'] = volume/25.4**3
bpy.ops.object.select_all(action='DESELECT')
cavity.select_set(True)
bpy.context.view_layer.objects.active = cavity
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Every-Step-Legacy-envelope-study.blend'))
print(json.dumps(record, indent=2))
