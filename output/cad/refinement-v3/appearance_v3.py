"""Every Step Legacy v3 APPEARANCE STUDY. No capacity or manufacturing claims.
Run in Blender; millimeter geometry. Independent overlapping forms intentionally
remain editable; reconcile an approved appearance with engineering afterward.
"""
import bpy, bmesh, math, json
from pathlib import Path
import os
FONT_PATH = Path(os.environ.get('GT_AETERNA_FONT', '/System/Library/Fonts/Supplemental/Georgia.ttf'))
from mathutils import Vector, Matrix
O=Path(__file__).resolve().parent
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
s=bpy.context.scene;s.unit_settings.system='METRIC';s.unit_settings.scale_length=.001

def material(name,color,metal=0,rough=.42,texture=False):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 nt=m.node_tree;p=nt.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if texture:
  n=nt.nodes.new('ShaderNodeTexNoise');n.inputs['Scale'].default_value=180;n.inputs['Detail'].default_value=2
  b=nt.nodes.new('ShaderNodeBump');b.inputs['Strength'].default_value=.18;b.inputs['Distance'].default_value=.12;nt.links.new(n.outputs['Fac'],b.inputs['Height']);nt.links.new(b.outputs['Normal'],p.inputs['Normal'])
 return m
black=material('Satin charcoal writing shells',(.018,.022,.022),.08,.44)
pebble=material('Fine black athletic pebble',(.012,.016,.017),.05,.5,True)
bronze=material('Warm brushed bronze',(.52,.265,.105),.8,.3)
inset=material('Inset black cap',(.009,.013,.014),0,.82,True)
inset.node_tree.nodes['Principled BSDF'].inputs['Specular IOR Level'].default_value=.05
lettermetal=material('Legible warm bronze lettering',(.72,.40,.17),.55,.34)
plaque=material('Plaque satin black',(.008,.011,.011),.1,.35)

def mesh(name,verts,faces,mat,smooth=True):
 me=bpy.data.meshes.new(name);me.from_pydata(verts,[],faces);me.update();ob=bpy.data.objects.new(name,me);s.collection.objects.link(ob);me.materials.append(mat)
 if smooth:
  for p in me.polygons:p.use_smooth=True
 return ob

def cylinder(name,r,z0,z1,mat):
 bpy.ops.mesh.primitive_cylinder_add(vertices=128,radius=r,depth=z1-z0,location=(0,0,(z0+z1)/2));ob=bpy.context.object;ob.name=name;ob.data.materials.append(mat)
 bevel=ob.modifiers.new('Soft machined edge','BEVEL');bevel.width=.6;bevel.segments=3
 ob.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return ob

def curve(name,pts,r,mat,closed=False):
 cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.resolution_u=16;cu.bevel_depth=r;cu.bevel_resolution=4;cu.use_fill_caps=True
 sp=cu.splines.new('POLY');sp.points.add(len(pts)-1)
 for p,co in zip(sp.points,pts):p.co=(*co,1)
 sp.use_cyclic_u=closed;ob=bpy.data.objects.new(name,cu);s.collection.objects.link(ob);cu.materials.append(mat);return ob

def rot(v,back):return Vector((v[0],-v[1],v[2])) if back else Vector(v)
def shape(z):
 t=max(0,min(1,(z-53)/220));u=max(0,min(1,(z-180)/90));return (48+10*math.sin(math.pi*t))*(1-.16*u*u),(36+7*math.sin(math.pi*t))*(1-.08*u*u),-3+3*math.sin(math.pi*t)
def inner(z,a,off=0):
 rx,ry,cx=shape(z);return Vector((cx+(rx+off)*math.cos(a),(ry+off)*math.sin(a),z))
# Tall closed inner blade with a deliberately tilted oval cap.
N=160;R=80;vs=[];fs=[]
for k in range(R+1):
 t=k/R
 for j in range(N):
  a=2*math.pi*j/N;z=53+t*(216-9*math.cos(a))
  if k==R:
   x=-3+44*math.cos(a);vs.append((x,34*math.sin(a),269-.205*(x+3)))
  else:vs.append(inner(z,a))
for k in range(R):
 for j in range(N):a=k*N+j;b=k*N+(j+1)%N;fs.append((a,b,b+N,a+N))
fs.append(tuple(reversed(range(N))));mesh('Tall textured inner blade',vs,fs,pebble)
# Lower smooth shells are independent wraps with a rising shoulder and visible reveal.
# Each closes visually around the lower blade; the notch is genuine height separation.
def panel_radii(z):
 t=max(0,min(1,(z-54)/163));return 46+13*math.sin(math.pi*t)+14*t,43+8*math.sin(math.pi*t)
def seam_angle(z):
 t=max(0,min(1,(z-54)/163));return -2.5+1.7*t**1.6
def panel_point(u,t,back=False,extra=0):
 # Shared lower-shell boundary and bronze edge; independent upper shoulder reveal.
 z=54+163*t-5*math.sin(math.pi*u)**2*t**8
 a=seam_angle(z)+( 0-seam_angle(z))*u
 rx,ry=panel_radii(z)
 return rot(((rx+extra)*math.cos(a),(ry+extra)*math.sin(a),z),back)
for back in [False,True]:
 vs=[];fs=[];A=100;B=70
 for k in range(B+1):
  for j in range(A+1):vs.append(panel_point(j/A,k/B,back))
 for k in range(B):
  for j in range(A):a=k*(A+1)+j;fs.append((a,a+1,a+A+2,a+A+1))
 if back:fs=[tuple(reversed(f)) for f in fs]
 ob=mesh(('Rear' if back else 'Front')+' overlapping writing shell',vs,fs,black)
 sol=ob.modifiers.new('Shell appearance thickness','SOLIDIFY');sol.thickness=2.6;sol.offset=-1

# Weld the shared outer-side boundary before the retained solidify modifier.
panels=[o for o in s.objects if 'overlapping writing shell' in o.name]
bpy.ops.object.select_all(action='DESELECT')
for o in panels:o.select_set(True)
bpy.context.view_layer.objects.active=panels[0];bpy.ops.object.join();wrap=bpy.context.object;wrap.name='Continuous welded front and rear writing shells'
bm=bmesh.new();bm.from_mesh(wrap.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.001);bm.to_mesh(wrap.data);bm.free();wrap.data.update()
curve('Continuous joined shoulder rolled lip',[panel_point(j/100,1,False,.2) for j in range(101)]+[panel_point(j/100,1,True,.2) for j in reversed(range(100))],1.0,black)
# Curving tapered metallic fold rises from the panel edge to the tall cap.
for back in [False,True]:
 vs=[];fs=[];foldvs=[];foldfs=[]
 for k in range(161):
  t=k/160;z=54+207*t
  width=.004+.082*math.sin(math.pi*t)**.75
  if z<=217:
   angle=seam_angle(z);rx,ry=panel_radii(z);cx=0
  else:
   q=(z-217)/44;angle=-.8+.76*q
   prx,pry=panel_radii(217);irx,iry,icx=shape(z)
   rx=prx*(1-q)+irx*q+6*math.sin(math.pi*q);ry=pry*(1-q)+iry*q+6*math.sin(math.pi*q);cx=icx*q
   width=.062*(1-q)+.004*q+.07*math.sin(math.pi*q)**.75
  for a in [angle-width,angle+width]:
   vs.append(rot((cx+(rx+.85)*math.cos(a),(ry+.85)*math.sin(a),z),back))
  if z>=217:
   foldvs.append(rot((cx+(rx+.15)*math.cos(angle-width),(ry+.15)*math.sin(angle-width),z),back))
   brx,bry,bcx=shape(z);a=angle+width*4
   foldvs.append(rot((bcx+(brx+.45)*math.cos(a),(bry+.45)*math.sin(a),z),back))
   n=len(foldvs)
   if n>2:foldfs.append((n-4,n-3,n-1,n-2))
  if k:fs.append((2*k-2,2*k-1,2*k+1,2*k))
 support=mesh(('Rear' if back else 'Front')+' black rolled upper blade beneath bronze',foldvs,foldfs,black)
 sub=support.modifiers.new('Smooth sculptural fold','SUBSURF');sub.levels=2;sub.render_levels=2
 sm=support.modifiers.new('Substantial rolled black lip','SOLIDIFY');sm.thickness=1.6;sm.offset=-1
 ob=mesh(('Rear' if back else 'Front')+' tapered sculptural bronze fold',vs,fs,bronze)
 sub=ob.modifiers.new('Smooth bronze fold','SUBSURF');sub.levels=2;sub.render_levels=2
 sol=ob.modifiers.new('Bronze border thickness','SOLIDIFY');sol.thickness=1.0;sol.offset=0
 bev=ob.modifiers.new('Rounded bronze edges','BEVEL');bev.width=.4;bev.segments=3
# Explicit inset cap with uninterrupted bronze perimeter, not an apparent opening.
cap=[]
for j in range(160):
 a=2*math.pi*j/160;x=-3+44*math.cos(a);y=34*math.sin(a);cap.append((x,y,269-.205*(x+3)+.5))
curve('Continuous bronze cap perimeter',cap,1.6,bronze,True)
center=Vector((-3,0,269.35))
cv=[tuple(center)]+[(p[0],p[1],269.35-.205*(p[0]+3)) for p in cap]
mesh('Textured inset decorative fixed cap',cv,[(0,j+1,(j+1)%160+1) for j in range(160)],inset,False)
# Dense pebble geometry is generated as one mesh; no image textures required.
def pebbles(name,points,mat):
 vs=[];fs=[];S=8
 for co,r,norm in points:
  co=Vector(co);normal=Vector(norm).normalized();tangent=normal.cross(Vector((0,0,1)))
  if tangent.length<.1:tangent=Vector((1,0,0))
  tangent.normalize();second=normal.cross(tangent).normalized();start=len(vs)
  vs.append(co+normal*r*.45)
  for j in range(S):a=j*2*math.pi/S;vs.append(co+tangent*math.cos(a)*r+second*math.sin(a)*r)
  for j in range(S):fs.append((start,start+1+j,start+1+(j+1)%S))
 return mesh(name,vs,fs,mat)
points=[]
for row in range(76):
 z=58+row*2.8
 for j in range(100):
  a=(j+.5*(row%2))*2*math.pi/100
  if z>267-9*math.cos(a):continue
  p=inner(z,a,.35);points.append((p,.75,(math.cos(a),math.sin(a),0)))
pebbles('Dense fine athletic pebble field',points,pebble)
# Cap pebbles respect inset outline and tilt.
pts=[]
for ix in range(-18,19):
 for iy in range(-13,14):
  x=ix*2.6;y=iy*2.6
  if (x/41.8)**2+(y/32.2)**2<.99:pts.append(((-3+x,y,269.55-.205*x),.75,(.205,0,1)))
pebbles('Fine textured cap inset relief',pts,inset)
# Connected vertical seam and close-spaced stitches, front/rear.
for back in [False]:
 a=-2.31
 curve(('Rear' if back else 'Front')+' continuous bronze lace seam',[rot(inner(z,a,.95),back) for z in range(90,262,2)],.30,bronze)
 for z in range(94,261,5):
  curve('Fine cross stitch',[rot(inner(z,a-.072,1.05),back),rot(inner(z+1,a+.072,1.05),back)],.27,bronze)
# Three densely textured base bands with a quiet trim hierarchy.
cylinder('Substantial round base',70,0,49,black)
for z0,z1 in [(6,17),(20,31),(34,45)]:
 cylinder('Three-band black texture backing',70.25,z0,z1,pebble)
 pts=[]
 for row in range(4):
  z=z0+1.3+row*2.65
  for j in range(155):
   a=(j+(row%2)*.5)*2*math.pi/155;pts.append(((70.45*math.cos(a),70.45*math.sin(a),z),.85,(math.cos(a),math.sin(a),0)))
 pebbles('Dense base pebble band',pts,pebble)
for z,r in [(3,1.15),(18.5,.55),(32.5,.55),(47.5,1.15)]:
 curve('Bronze base framing',[(70*math.cos(j*2*math.pi/160),70*math.sin(j*2*math.pi/160),z) for j in range(160)],r,bronze,True)
cylinder('Black textured base upper inset',67,49,51,inset)
curve('Bronze base top inset rim',[(65*math.cos(j*2*math.pi/160),65*math.sin(j*2*math.pi/160),51) for j in range(160)],.85,bronze,True)
# Curved text and heart placements are appearance meshes, not fused print geometry.
def text(name,body,loc,size,back=False):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.font=bpy.data.fonts.load(str(FONT_PATH)) if FONT_PATH.is_file() else bpy.data.fonts[0];c.align_x='CENTER';c.align_y='CENTER';c.size=size;c.space_line=1.18;c.extrude=.05;c.bevel_depth=.018;c.bevel_resolution=2
 o=bpy.data.objects.new(name,c);s.collection.objects.link(o);o.location=rot(loc,back);o.rotation_euler=(math.pi/2,0,math.pi if back else 0);c.materials.append(lettermetal);return o
for back,phrase in [(False,'before\nthe crowds\nthere was\nyou'),(True,'every step\ni took\nbegan\nbeside you')]:
 text(('Rear' if back else 'Front')+' reserved-panel inscription',phrase,(17,-52.5,143),6.2,back)
 # Actual heart silhouette; no font fallback dependence.
 coords=[]
 for j in range(80):
  a=j*2*math.pi/80;x=16*math.sin(a)**3;z=13*math.cos(a)-5*math.cos(2*a)-2*math.cos(3*a)-math.cos(4*a)
  coords.append(rot((17+x*.22,-49.4,114+z*.22),back))
 mesh(('Rear' if back else 'Front')+' bronze heart',coords,[tuple(range(80))],bronze,False)
# Curved black plaques with contrasting rectangular rounded bronze frames.
for back in [False,True]:
 w=65;h=20;vs=[];fs=[]
 for z in [24-h/2,24+h/2]:
  for j in range(33):
   x=-w/2+w*j/32;vs.append(rot((x,-math.sqrt(71.6**2-x*x),z),back))
 for j in range(32):fs.append((j,j+1,j+34,j+33))
 mesh(('Rear' if back else 'Front')+' dedicated black presentation plaque',vs,fs,plaque)
 border=[]
 for j in range(33):x=-w/2+w*j/32;border.append(rot((x,-math.sqrt(71.7**2-x*x),24-h/2),back))
 for j in reversed(range(33)):x=-w/2+w*j/32;border.append(rot((x,-math.sqrt(71.7**2-x*x),24+h/2),back))
 curve('Fine bronze plaque frame',border,.6,bronze,True)
 if not back:text('Front base dedication','FOREVER\nIN OUR HEARTS',(0,-72.1,24),4.0)
 else:
  text('Rear personalization name placeholder','YOUR LOVED ONE',(0,-72.1,27),3.55,True)
  text('Rear personalization dates placeholder','MONTH DAY, YEAR – MONTH DAY, YEAR',(0,-72.1,19),1.95,True)
for ob in list(s.objects):
 if ob.type=='FONT':
  original=ob.copy();original.data=ob.data.copy();s.collection.objects.link(original);original.hide_render=True;original.hide_set(True)
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;bpy.ops.object.convert(target='MESH')
  for v in ob.data.vertices:
   world=ob.matrix_world@v.co;sign=1 if ob.location.y>0 else -1
   if 'inscription' in ob.name:
    rx,ry=panel_radii(world.z);y=ry*math.sqrt(max(.01,1-(world.x/rx)**2))+.2
   else:y=math.sqrt(max(1,71.9**2-world.x**2))+.2
   world.y=sign*(y+v.co.z);v.co=ob.matrix_world.inverted()@world
for ob in list(s.objects):
 if ob.type=='MESH' and 'bronze heart' in ob.name:
  sign=1 if ob.name.startswith('Rear') else -1
  for v in ob.data.vertices:
   rx,ry=panel_radii(v.co.z);v.co.y=sign*(ry*math.sqrt(max(.01,1-(v.co.x/rx)**2))+.2)
 ob.matrix_world=Matrix.Diagonal((1.2,1.2,1.0,1.0))@ob.matrix_world
# Neutral studio lighting exposes form from each side.
world=bpy.data.worlds.new('Neutral studio');s.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.085,.09,.10,1)
for name,pos,power,size in [('Key',(180,-280,370),1400000,230),('Fill',(-220,-150,230),950000,220),('Edge',(50,220,370),1750000,180)]:
 bpy.ops.object.light_add(type='AREA',location=pos);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,150))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;s.camera=cam;cam.data.type='ORTHO';cam.data.ortho_scale=315
s.render.engine='CYCLES';s.cycles.samples=32;s.render.resolution_x=900;s.render.resolution_y=1100;s.render.resolution_percentage=100;s.view_settings.view_transform='AgX'
s['status']='APPEARANCE V3: separate artistic meshes, no engineered cavity, no capacity claim.'
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v3.blend'))
views=[('front',(0,-700,160),(0,0,140),315),('rear',(0,700,160),(0,0,140),315),('side',(700,0,160),(0,0,140),315),('left',(-700,0,160),(0,0,140),315),('top',(0,-1,700),(0,0,140),230),('perspective',(300,-650,330),(0,0,140),320),('detail',(170,-650,250),(0,0,210),170),('base-detail',(0,-650,190),(0,0,30),220),('front-reference',(60,-700,240),(0,0,145),320),('rear-reference',(-60,700,240),(0,0,145),320)]
for name,pos,target,scale in views:
 cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale;s.render.filepath=str(O/f'appearance-{name}.png');bpy.ops.render.render(write_still=True)
(O/'appearance-status.json').write_text(json.dumps({'scope':'Original Every Step Legacy appearance only','engineering_status':'Not engineered; no capacity or STL manufacturing claim','features':['two overlapping masses','slender silhouette','front/rear tapered bronze folds','textured inset cap and bronze rim','smooth front/rear writing panels','dense fine pebble field','connected lace seam','three dense base bands','front/rear framed plaques','source-case phrases and heart motifs','smooth independently editable surfaces','warm bronze neutral lighting'],'interpretations':['Rear mirrors composition across Y, with no duplicated front lace seam','Placeholder personalization reads YOUR LOVED ONE and generic dates','Appearance base approximately171mm; broadened tapered body for source proportions; not production dimensions','Fixed decorative cap; bottom loading to be engineered afterward']},indent=2)+'\n')
