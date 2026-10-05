"""Blender background script; mm. Review candidate, not production approved."""
import bpy, bmesh, math, json, struct
from pathlib import Path
from mathutils import Vector
O=Path(__file__).resolve().parent
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
s=bpy.context.scene;s.unit_settings.system='METRIC';s.unit_settings.scale_length=.001
P={'height':279.4,'base_height':50.8,'base_diameter':171.45,'body_width':160.0,'body_depth':127,'nominal_radial_wall':4,'base_floor':6.0,'plate_width':98,'plate_depth':78,'plate_thickness':3,'screw_clearance_diameter':4.5,'insert_pilot_diameter':5}
def mat(n,c,metal=0):
 m=bpy.data.materials.new(n);m.diffuse_color=(*c,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=.38;return m
black=mat('Matte black',(.022,.027,.029));bronze=mat('Bronze finish concept',(.40,.20,.075),.75);steel=mat('Plate metal concept',(.35,.37,.4),.7)
def finish(o,n,m):o.name=n;o.data.materials.append(m);return o
def cyl(n,r,z0,z1,m=black):
 bpy.ops.mesh.primitive_cylinder_add(vertices=128,radius=r,depth=z1-z0,location=(0,0,(z0+z1)/2));return finish(bpy.context.object,n,m)
def box(n,x,y,z,loc,m=black):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=finish(bpy.context.object,n,m);o.scale=(x,y,z);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);return o
def boolean(a,b,op):
 bpy.context.view_layer.objects.active=a;mod=a.modifiers.new(op,'BOOLEAN');mod.operation=op;mod.solver='EXACT';mod.use_self=True;mod.object=b;bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(b,do_unlink=True)
# ponytail: ring loft captures silhouette; measured reference tracing can replace profiles after design review.
profiles=[(47, .78,0),(65,.83,-1),(100,.94,-2),(145,1,0),(185,.99,3),(218,.89,6),(247,.77,8),(275.4,.72,6),(279.4,.70,5)]
def loft(n,inner=False):
 vs=[];fs=[];N=128
 rings=profiles[:-1] if inner else profiles
 for z,f,cx in rings:
  if inner and z==47:z=45
  rx=P['body_width']*f/2-(4 if inner else 0);ry=P['body_depth']*f/2-(4 if inner else 0)
  twist=0
  for j in range(N):
   a=2*math.pi*j/N;xx=rx*math.cos(a);yy=ry*math.sin(a)
   vs.append((cx+xx*math.cos(twist)-yy*math.sin(twist),xx*math.sin(twist)+yy*math.cos(twist),z - (10*(1+math.cos(a)) if z>=275 else 0)))
 for k in range(len(rings)-1):
  for j in range(N):a=k*N+j;b=k*N+(j+1)%N;fs.append((a,b,b+N,a+N))
 fs += [tuple(reversed(range(N))),tuple((len(rings)-1)*N+j for j in range(N))]
 me=bpy.data.meshes.new(n);me.from_pydata(vs,[],fs);me.update();o=bpy.data.objects.new(n,me);s.collection.objects.link(o);o.data.materials.append(black);return o
shell=cyl('Vessel shell candidate',84.5,0,50.8);boolean(shell,loft('Outer swept vessel'),'UNION')
cavity=cyl('EMPTY cavity measurement only',80.5,6,46.8);boolean(cavity,loft('Inner swept cavity',True),'UNION')
# Model an actual bottom access and four pilot bores; metal inserts/screw spec remains provisional.
cut=cavity.copy();cut.data=cavity.data.copy();s.collection.objects.link(cut);boolean(shell,cut,'DIFFERENCE')
boolean(shell,box('Plate pocket',98.6,78.6,3.2,(0,0,1.5)),'DIFFERENCE')
boolean(shell,box('Access opening',70,50,10,(0,0,1)),'DIFFERENCE')
plate=box('Bottom metal plate candidate',98,78,3,(0,0,1.5),steel)
for x in [-43,43]:
 for y in [-33,33]:
  boss=cyl('Insert boss',6,3,16);boss.location.x=x;boss.location.y=y;boolean(shell,boss,'UNION')
  pilot=cyl('Insert pilot',2.5,2.8,14);pilot.location.x=x;pilot.location.y=y;boolean(shell,pilot,'DIFFERENCE')
  drill=cyl('Screw clearance',2.25,-1,4);drill.location.x=x;drill.location.y=y;boolean(plate,drill,'DIFFERENCE')
  bpy.ops.mesh.primitive_cone_add(vertices=64,radius1=4.5,radius2=2.25,depth=2.25,location=(x,y,1.125));boolean(plate,bpy.context.object,'DIFFERENCE')
  intrusion=cyl('Hardware displacement conservative',6,4,16);intrusion.location.x=x;intrusion.location.y=y;boolean(cavity,intrusion,'DIFFERENCE')
# Provisional gasket seat: 2mm-wide rectangular annulus, 1mm above plate.
groove=box('Gasket groove',78,58,1.0,(0,0,3.5))
boolean(groove,box('Groove core',74,54,3,(0,0,3.5)),'DIFFERENCE');boolean(shell,groove,'DIFFERENCE')
# Decorative swept seam is a separate finish reference, deliberately excluded from manufacturing STL.
ribbon_vertices=[];ribbon_faces=[]
for k in range(45):
 z=54+k/44*212;f,cx=.75,5
 for (z0,f0,c0),(z1,f1,c1) in zip(profiles,profiles[1:]):
  if z0<=z<=z1:t=(z-z0)/(z1-z0);f=f0+(f1-f0)*t;cx=c0+(c1-c0)*t;break
 center=-2.25+(z-54)/212*1.8;half=.07+.09*k/44
 for angle in [center-half,center+half]:ribbon_vertices.append((cx+(P['body_width']*f/2+1.2)*math.cos(angle),(P['body_depth']*f/2+1.2)*math.sin(angle),z))
 if k:ribbon_faces.append((2*k-2,2*k-1,2*k+1,2*k))
ribbon_mesh=bpy.data.meshes.new('Broad swept finish guide');ribbon_mesh.from_pydata(ribbon_vertices,[],ribbon_faces);seam=bpy.data.objects.new('Bronze ribbon - visual guide only',ribbon_mesh);s.collection.objects.link(seam);ribbon_mesh.materials.append(bronze)
for poly in ribbon_mesh.polygons:poly.use_smooth=True
for z in [5,17,31,46]:
 bpy.ops.mesh.primitive_torus_add(major_radius=84.4,minor_radius=1.325,major_segments=128,minor_segments=12,location=(0,0,z));finish(bpy.context.object,'Base band - finish reference only',bronze)
# Editable typography references: not yet projected/engraved onto shell.
def lettering(name,body,loc,size,back=False):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.align_x='CENTER';c.size=size;c.space_line=1.1;c.extrude=.1;o=bpy.data.objects.new(name,c);s.collection.objects.link(o);o.location=loc;o.rotation_euler=(math.pi/2,0,math.pi if back else 0);c.materials.append(bronze)
lettering('Front inscription visual guide','before\nthe crowds\nthere was\nyou',(25,-66,135),6)
lettering('Rear inscription visual guide','every step\ni took\nbegan\nbeside you',(0,64,130),7,True)
lettering('Base inscription visual guide','FOREVER\nIN OUR HEARTS',(0,-85.4,25),4)
# Raised exterior detail is an editable, process-provisional source approximation.
# Union only adds exterior material, so the measured cavity remains conservative.
ribbon_solid=seam.copy();ribbon_solid.data=seam.data.copy();s.collection.objects.link(ribbon_solid)
bpy.context.view_layer.objects.active=ribbon_solid;mod=ribbon_solid.modifiers.new('Raised folded band','SOLIDIFY');mod.thickness=3.0;mod.offset=-1;bpy.ops.object.modifier_apply(modifier=mod.name)
bm=bmesh.new();bm.from_mesh(ribbon_solid.data);bmesh.ops.recalc_face_normals(bm,faces=bm.faces);bm.to_mesh(ribbon_solid.data);bm.free()
ribbon_solid.hide_render=True;ribbon_solid.hide_set(True)
relief=[]
def surface(z,a):
 f,cx=.75,5
 for (z0,f0,c0),(z1,f1,c1) in zip(profiles,profiles[1:]):
  if z0<=z<=z1:t=(z-z0)/(z1-z0);f=f0+(f1-f0)*t;cx=c0+(c1-c0)*t;break
 return Vector((cx+(P['body_width']*f/2+.1)*math.cos(a),(P['body_depth']*f/2+.1)*math.sin(a),z))
def stroke(name,a,b,r,material):
 mid=(a+b)/2;bpy.ops.mesh.primitive_cylinder_add(vertices=12,radius=r,depth=(b-a).length,location=mid);o=finish(bpy.context.object,name,material);o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();relief.append(o)
for z in range(85,251,12):stroke('Raised lacing prototype',surface(z,-2.52),surface(z,-2.30),.8,bronze)
for z in range(85,241,15):
 for a in [.35,.75,1.15,1.95,2.35,2.75]:
  stroke('Rear athletic tread prototype',surface(z-2,a-.07),surface(z+2,a),.75,black)
  stroke('Rear athletic tread prototype',surface(z+2,a),surface(z-2,a+.07),.75,black)
for z in [10,24,39]:
 for j in range(40):
  angle=2*math.pi*j/40
  if abs(angle-1.5*math.pi)<.5:continue
  bpy.ops.mesh.primitive_uv_sphere_add(segments=8,ring_count=4,radius=.85,location=(84.3*math.cos(angle),84.3*math.sin(angle),z));o=finish(bpy.context.object,'Base athletic texture prototype',black);relief.append(o)
# Preserve the individually editable detail objects as hidden source geometry.
source=bpy.data.collections.new('Editable relief source - hidden');s.collection.children.link(source)
for o in relief:
 clone=o.copy();clone.data=o.data.copy();source.objects.link(clone);clone.hide_render=True;clone.hide_set(True)
bpy.ops.object.select_all(action='DESELECT')
for o in relief:o.select_set(True)
bpy.context.view_layer.objects.active=relief[0];bpy.ops.object.join();combined=bpy.context.object;combined.name='Exterior relief union';boolean(shell,combined,'UNION')
for poly in shell.data.polygons:poly.use_smooth=True

def metrics(o):
 bm=bmesh.new();bm.from_mesh(o.data);v=abs(bm.calc_volume(signed=True));bad=sum(not e.is_manifold for e in bm.edges);seen=set();components=0
 for vertex in bm.verts:
  if vertex in seen:continue
  components+=1;stack=[vertex];seen.add(vertex)
  while stack:
   for edge in stack.pop().link_edges:
    for other in edge.verts:
     if other not in seen:seen.add(other);stack.append(other)
 bm.free();return {'components':components,'volume_mm3':v,'nonmanifold_edges':bad,'vertices':len(o.data.vertices),'bounds_mm':list(o.dimensions)}
def stl(o,name):
 me=o.data;me.calc_loop_triangles();tri=me.loop_triangles
 with (O/name).open('wb') as f:
  f.write(b'MILLIMETERS PROTOTYPE CANDIDATE'.ljust(80,b' '));f.write(struct.pack('<I',len(tri)))
  for t in tri:
   a,b,c=[o.matrix_world@me.vertices[i].co for i in t.vertices];n=(b-a).cross(c-a).normalized();f.write(struct.pack('<12fH',*n,*a,*b,*c,0))
 # Independent binary re-read dimensional check.
 raw=(O/name).read_bytes();count=struct.unpack_from('<I',raw,80)[0];assert len(raw)==84+50*count
 coords=[struct.unpack_from('<9f',raw,84+50*i+12) for i in range(count)]
 bounds=[max(v[j] for row in coords for v in [row[0:3],row[3:6],row[6:9]])-min(v[j] for row in coords for v in [row[0:3],row[3:6],row[6:9]]) for j in range(3)]
 assert all(abs(bounds[j]-o.dimensions[j])<.01 for j in range(3));return {'triangles':count,'reimport_bounds_mm':bounds}
bpy.context.view_layer.update();record={'status':'SOURCE-INFORMED ENGINEERING CANDIDATE; NOT APPROVED TO MANUFACTURE','parameters_mm':P,'shell':metrics(shell),'plate':metrics(plate),'empty_cavity_after_conservative_hardware':metrics(cavity)}
# Verify the complete rectangular gasket centerline is not refilled by bosses.
seal_hits=[]
for i in range(41):
 t=i/40
 for x,y in [(-38+76*t,-28),(-38+76*t,28),(-38,-28+56*t),(38,-28+56*t)]:
  hit,loc,normal,face=shell.ray_cast(shell.matrix_world.inverted()@Vector((x,y,-5)),Vector((0,0,1)))
  assert hit,'Missing gasket seat roof'
  seal_hits.append((shell.matrix_world@loc).z)
record['gasket_centerline_samples']=len(seal_hits)
record['gasket_centerline_roof_z_mm']=[min(seal_hits),max(seal_hits)]
assert all(abs(z-4)<.02 for z in seal_hits),'Gasket groove obstructed or inconsistent'
record['pilot_to_groove_min_clearance_mm']=math.hypot(43-39,33-29)-2.5
record['capacity_in3']=record['empty_cavity_after_conservative_hardware']['volume_mm3']/25.4**3;record['capacity_target_in3']=200;record['capacity_target_pass']=record['capacity_in3']>=200
for o,n in [(shell,'Every-Step-Legacy-shell-CANDIDATE-mm.stl'),(plate,'Every-Step-Legacy-plate-CANDIDATE-mm.stl')]:
 print(o.name, metrics(o));assert metrics(o)['nonmanifold_edges']==0 and metrics(o)['components']==1;record[n]=stl(o,n)
record['limitations']=['Ring loft approximates reference; not traced or owner-approved','4mm is radial construction allowance, not verified minimum normal thickness','Top is fixed; bottom plate baseline provisional','90-degree countersinks and 2mm-wide x1mm gasket seat are provisional; screws, inserts and gasket not selected','No leak, load, fit, heat, finish or packaging tests','Lacing, tread and base texture integrated in shell STL; folded ribbon, circumferential bronze bands and lettering remain visual guides','Cavity excludes access opening volume and conservatively deducts full boss cylinders','6mm base floor leaves2mm above provisional gasket groove; minimum normal shell thickness not validated']
visual_points=[]
for obj in s.objects:
 if obj != cavity and not obj.hide_render and obj.type in {'MESH','FONT','CURVE'}:
  evaluated=obj.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=evaluated.to_mesh()
  visual_points.extend(obj.matrix_world@v.co for v in mesh.vertices);evaluated.to_mesh_clear()
record['assembled_visual_bounds_mm']=[max(v[i] for v in visual_points)-min(v[i] for v in visual_points) for i in range(3)]
(O/'sculptural-validation.json').write_text(json.dumps(record,indent=2)+'\n');cavity.hide_render=True;cavity.hide_set(True)
world=s.world or bpy.data.worlds.new('World');s.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.12,.12,.12,1)
for pos,power in [((250,-350,450),1500000),((-250,-150,280),900000),((50,250,400),1800000)]:
 bpy.ops.object.light_add(type='AREA',location=pos);l=bpy.context.object;l.data.energy=power;l.data.shape='DISK';l.data.size=250;l.rotation_euler=(Vector((0,0,145))-l.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;s.camera=cam;cam.data.type='ORTHO';cam.data.ortho_scale=360
s.render.engine='CYCLES';s.cycles.samples=24;s.render.resolution_x=750;s.render.resolution_y=900;s.render.resolution_percentage=100
for name,pos in [('front',(0,-700,150)),('side',(700,0,150)),('rear',(0,700,150)),('perspective',(400,-600,340)),('bottom',(0,-1,-600))]:
 cam.location=pos;cam.rotation_euler=(Vector((0,0,140))-cam.location).to_track_quat('-Z','Y').to_euler();s.render.filepath=str(O/f'candidate-{name}.png');bpy.ops.render.render(write_still=True)
# Section is a review render only; keep authoritative part uncut.
section=shell.copy();section.data=shell.data.copy();s.collection.objects.link(section)
boolean(section,box('Section cutter',400,200,400,(0,-100,150)),'DIFFERENCE')
visible=[o for o in s.objects if o.type in {'MESH','FONT','CURVE'} and o not in {section,cavity} and not o.hide_render]
for o in visible:o.hide_render=True
cam.location=(180,-700,260);cam.rotation_euler=(Vector((0,0,140))-cam.location).to_track_quat('-Z','Y').to_euler();s.render.filepath=str(O/'candidate-section.png');bpy.ops.render.render(write_still=True)
for o in visible:o.hide_render=False
bpy.data.objects.remove(section,do_unlink=True)
s['review_status']=record['status'];s['capacity_in3']=record['capacity_in3'];bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-sculptural-candidate.blend'));print(json.dumps(record,indent=2))
