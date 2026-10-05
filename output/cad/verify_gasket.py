"""Independent saved-scene check of the provisional gasket route."""
import bpy,json,math
from pathlib import Path
from mathutils import Vector
p=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(p/'Every-Step-Legacy-sculptural-candidate.blend'))
shell=bpy.data.objects['Vessel shell candidate'];values=[]
for i in range(41):
 t=i/40
 for x,y in [(-38+76*t,-28),(-38+76*t,28),(-38,-28+56*t),(38,-28+56*t)]:
  hit,loc,normal,face=shell.ray_cast(shell.matrix_world.inverted()@Vector((x,y,-5)),Vector((0,0,1)))
  assert hit
  values.append((shell.matrix_world@loc).z)
assert all(abs(z-4)<.02 for z in values),[min(values),max(values)]
r=json.loads((p/'sculptural-validation.json').read_text());r['gasket_centerline_samples']=len(values);r['gasket_centerline_roof_z_mm']=[min(values),max(values)];r['pilot_to_groove_min_clearance_mm']=math.hypot(43-39,33-29)-2.5
r['limitations'][5]='Lacing, tread and base texture integrated in shell STL; folded ribbon, circumferential bronze bands and lettering remain visual guides'
(p/'sculptural-validation.json').write_text(json.dumps(r,indent=2)+'\n')
print('GASKET CENTERLINE PASS',len(values),min(values),max(values))
