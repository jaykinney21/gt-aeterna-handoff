"""Every Step Legacy v4: source-traced appearance, NOT engineering/capacity release."""
import bpy,bmesh,math,json,random
from pathlib import Path
import os
FONT_PATH = Path(os.environ.get('GT_AETERNA_FONT', '/System/Library/Fonts/Supplemental/Georgia.ttf'))
from mathutils import Vector
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

# Source-derived front projected boundaries (reference x relative200, xscale1.19;
# z=53+(300-reference_y)). Source is conceptual, not a measured scan.
B=[(53,-59.5),(133,-53.55),(191,-33.32),(231,11.9),(260,34.51)]
K=[(53,-53.55),(133,-45.22),(177,-23.8),(203,17.85),(220,63.07)]
def interp(points,z):
 if z<=points[0][0]:return points[0][1]
 if z>=points[-1][0]:return points[-1][1]
 for i in range(len(points)-1):
  z0,x0=points[i];z1,x1=points[i+1]
  if z0<=z<=z1:
   a=points[max(0,i-1)];b=points[min(len(points)-1,i+2)]
   m0=(x1-a[1])/(z1-a[0]);m1=(b[1]-x0)/(b[0]-z0);t=(z-z0)/(z1-z0);h=z1-z0
   return (2*t**3-3*t*t+1)*x0+(t**3-2*t*t+t)*h*m0+(-2*t**3+3*t*t)*x1+(t**3-t*t)*h*m1
 return points[-1][1]
def mirror(v,back):return Vector((v[0],-v[1],v[2])) if back else Vector(v)
def outer(z):
 t=max(0,min(1,(z-53)/167));return 60+9*math.sin(math.pi*t)+15*t,48+12*math.sin(math.pi*t)+4*t

def surface(x,z,offset=0):
 rx,ry=outer(z);return -ry*math.sqrt(max(.004,1-(x/rx)**2))-offset

def core(z):
 t=max(0,min(1,(z-53)/217));return -16,43+12*math.sin(math.pi*t/2),36+9*math.sin(math.pi*t/2)
# Tall rear core and exactly planar asymmetric oval cap.
N=160;R=100;vs=[];fs=[]
for k in range(R+1):
 t=k/R
 for j in range(N):
  a=2*math.pi*j/N;z=53+t*(216.5-9.9*math.cos(a));cx,rx,ry=core(z)
  if k==R:x=-16+55*math.cos(a);y=45*math.sin(a);z=269.5-.18*(x+16)
  else:x=cx+rx*math.cos(a);y=ry*math.sin(a)
  vs.append((x,y,z))
for k in range(R):
 for j in range(N):a=k*N+j;b=k*N+(j+1)%N;fs.append((a,b,b+N,a+N))
mesh('Tall textured source blade',vs,fs,pebble)
# Independent second curve: the smooth writing shell starts RIGHT of black rim K.
A=100;R=100;vs=[];fs=[]
for back in [False,True]:
 start=len(vs)
 for k in range(R+1):
  t=k/R
  for j in range(A+1):
   u=j/A;z=53+167*t-12*math.sin(math.pi*u/2)**2*t**8;rx,ry=outer(z)
   x0=interp(K,z);a0=-math.acos(max(-1,min(1,x0/rx)));a=a0*(1-u)
   vs.append(mirror((rx*math.cos(a),ry*math.sin(a),z),back))
 for k in range(R):
  for j in range(A):
   a=start+k*(A+1)+j;f=(a,a+1,a+A+2,a+A+1);fs.append(tuple(reversed(f)) if back else f)
wrap=mesh('Separate broad writing shell wrapping continuously around rear',vs,fs,black)
bm=bmesh.new();bm.from_mesh(wrap.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.001);bm.to_mesh(wrap.data);bm.free()
sol=wrap.modifiers.new('Writing shell thickness appearance','SOLIDIFY');sol.thickness=2.4;sol.offset=-1
# Full-height broad black blade BETWEEN literal independent bronze and black curves.
for back in [False,True]:
 vs=[];fs=[];bronzevs=[];bronzefs=[];edge=[]
 for k in range(161):
  z=53+207*k/160;xb=interp(B,z);yb=surface(xb,z,.6)
  if z>220:
   q=(z-220)/40;w=q*q*(3-2*q);capy=-45*math.sqrt(max(.001,1-((xb+16)/55)**2));yb=yb*(1-w)+capy*w
  if z<=220:
   xk=interp(K,z);yk=surface(xk,z,.65);edge.append(mirror((xk,yk,z),back))
  else:
   q=(z-220)/40;xk=63.07*(1-q)+34.51*q;yk=surface(63.07,220)*(1-q)**2-8*q*q
  for j in range(25):
   u=j/24;f=math.sin(math.pi*u/2);x=xb*(1-f)+xk*f;y=yb*(1-u)+yk*u-3.5*math.sin(math.pi*u)*math.sin(math.pi*k/160)
   vs.append(mirror((x,y,z),back))
  if k:
   for j in range(24):a=(k-1)*25+j;f=(a,a+1,a+26,a+25);fs.append(tuple(reversed(f)) if back else f)
  # Warm bronze band has restrained width and follows the first traced boundary.
  half=.9+4.2*math.sin(math.pi*k/160)**.7
  slope=max(-3,min(3,(yk-yb)/max(1,xk-xb)))
  for x in [xb-half,xb+half]:
   u=2/math.pi*math.asin(max(-.95,min(.95,(x-xb)/max(1,xk-xb))))
   yy=yb*(1-u)+yk*u-3.5*math.sin(math.pi*u)*math.sin(math.pi*k/160)-.9
   bronzevs.append(mirror((x,yy,z),back))
  if k:bronzefs.append((2*k-2,2*k-1,2*k+1,2*k))
 blade=mesh(('Rear' if back else 'Front')+' full-height broad black curved blade',vs,fs,black)
 sub=blade.modifiers.new('Continuous rounded sculptural blade','SUBSURF');sub.levels=2;sub.render_levels=2
 solid=blade.modifiers.new('Black blade edge thickness','SOLIDIFY');solid.thickness=1.5;solid.offset=-1
 band=mesh(('Rear' if back else 'Front')+' source middle bronze curve',bronzevs,bronzefs,bronze)
 solid=band.modifiers.new('Bronze thickness','SOLIDIFY');solid.thickness=.7;solid.offset=0
 curve(('Rear' if back else 'Front')+' distinct second black curved rim',edge,1.15,black)
# Connect upper black blades around the side, avoiding crossed sheet overlap.
vs=[];fs=[]
for k in range(130,161):
 z=53+207*k/160;q=(z-220)/40;xk=63.07*(1-q)+34.51*q;yk=surface(63.07,220)*(1-q)**2-8*q*q
 for j in range(25):
  u=j/24;vs.append((xk+2*math.sin(math.pi*u)**2*math.sin(math.pi*q),yk*(1-2*u),z))
 if k>130:
  for j in range(24):a=(k-131)*25+j;fs.append((a,a+1,a+26,a+25))
bridge=mesh('Continuous black side return between front and rear blades',vs,fs,black)
sub=bridge.modifiers.new('Smooth rolled side return','SUBSURF');sub.levels=2;sub.render_levels=2
# Weld blade and side-return raw boundaries before one shared smooth modifier.
parts=[o for o in s.objects if ('full-height broad black curved blade' in o.name or 'Continuous black side return' in o.name)]
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();unified=bpy.context.object;unified.name='Welded continuous broad black blade wrapping around rear'
bm=bmesh.new();bm.from_mesh(unified.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.001);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.0001);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(unified.data);bm.free();unified.data.update()
# Rounded shallow shoulder joins front/back smooth shell at source height220.
pts=[]
for back in [False,True]:
 values=range(101) if not back else reversed(range(100))
 for j in values:
  u=j/100;z=220-12*math.sin(math.pi*u/2)**2;rx,ry=outer(z);a0=-math.acos(interp(K,z)/rx);a=a0*(1-u);pts.append(mirror((rx*math.cos(a),ry*math.sin(a),z),back))
curve('Continuous rounded writing-shell shoulder',pts,1.1,black)
cap=[]
for j in range(160):
 a=2*math.pi*j/160;x=-16+55*math.cos(a);y=45*math.sin(a);cap.append((x,y,269.8-.18*(x+16)))
curve('Original oval tilted cap bronze perimeter',cap,1.65,bronze,True)
mesh('Single planar textured dark cap',[(-16,0,269.6)]+[(x,y,z-.2) for x,y,z in cap],[(0,j+1,(j+1)%160+1) for j in range(160)],inset,False)
# Dense irregular shallow nubbly texture, never a shiny regular stud grid.
rng=random.Random(63)
def nubbles(name,points,mat):
 verts=[];faces=[];S=10
 rounded='base band' in name
 for co,r,n in points:
  co=Vector(co);n=Vector(n).normalized();a=n.cross(Vector((0,0,1)))
  if a.length<.1:a=Vector((1,0,0))
  a.normalize();b=n.cross(a);start=len(verts);height=r*(.7 if rounded else .3);verts.append(co+n*height)
  for ring in [0,1]:
   for j in range(S):
    angle=2*math.pi*j/S;rr=r*(1 if rounded else rng.uniform(.85,1.13))*(.72 if ring==0 else 1)
    verts.append(co+a*math.cos(angle)*rr+b*math.sin(angle)*rr+n*(height*.65 if ring==0 else 0))
  for j in range(S):
   faces.append((start,start+1+j,start+1+(j+1)%S));faces.append((start+1+j,start+1+S+j,start+1+S+(j+1)%S,start+1+(j+1)%S))
 return mesh(name,verts,faces,mat)
points=[]
for row in range(118):
 z=56+row*1.85
 for j in range(150):
  a=(j+.5*(row%2)+rng.uniform(-.25,.25))*2*math.pi/150;zz=z+rng.uniform(-.35,.35)
  if zz>267.5-9.9*math.cos(a):continue
  cx,rx,ry=core(zz)
  if cx+(rx+.15)*math.cos(a)>interp(B,zz)-1.2:continue
  points.append(((cx+(rx+.15)*math.cos(a),(ry+.15)*math.sin(a),zz),rng.uniform(.65,1.0),(math.cos(a),math.sin(a),0)))
nubbles('Irregular fine black nubbly core surface',points,pebble)
points=[]
for ix in range(-29,30):
 for iy in range(-24,25):
  x=ix*1.8+rng.uniform(-.4,.4);y=iy*1.8+rng.uniform(-.4,.4)
  if (x/52.5)**2+(y/42.5)**2<1:points.append(((-16+x,y,269.82-.18*x),rng.uniform(.6,.9),(.18,0,1)))
nubbles('Irregular fine inset cap texture',points,inset)
# Narrow connected ladder stitching confined to original front textured strip.
for a in [-2.43,-2.35]:
 curve('Fine double bronze stitched seam',[(core(z)[0]+(core(z)[1]+.45)*math.cos(a),(core(z)[2]+.45)*math.sin(a),z) for z in range(83,267,2)],.18,bronze)
for z in range(85,266,3):
 pts=[]
 for a,zz in [(-2.46,z),(-2.39,z+.45),(-2.32,z)]:cx,rx,ry=core(zz);pts.append((cx+(rx+.6)*math.cos(a),(ry+.6)*math.sin(a),zz))
 curve('Fine connected ladder cross stitch',pts,.2,bronze)
# Original base proportions: 171.45mm diameter, ~50.8mm tall, three dark bands.
cylinder('Original proportion round base',84.2,0,49.5,black)
for z0,z1 in [(7,18),(20,31),(33,44)]:
 cylinder('Dense dark base band backing',84.35,z0,z1,pebble);pts=[]
 for row in range(6):
  zz=z0+.8+row*1.8
  for j in range(230):
   a=(j+(row%2)*.5+rng.uniform(-.2,.2))*2*math.pi/230;z=zz+rng.uniform(-.25,.25)
   if abs(84.5*math.cos(a))<48 and abs(math.sin(a))>.8 and 10<z<40:continue
   pts.append(((84.5*math.cos(a),84.5*math.sin(a),z),rng.uniform(.9,1.1),(math.cos(a),math.sin(a),0)))
 nubbles('Dense irregular base band',pts,pebble)
for z in [3.5,47.5]:curve('Only dominant outer bronze base rim',[(84.3*math.cos(j*2*math.pi/160),84.3*math.sin(j*2*math.pi/160),z) for j in range(160)],1.4,bronze,True)
cylinder('Flush dark upper base surface',83,49,50.8,inset)
seat=cylinder('Seated black vessel foot',60,50.6,53.2,black);seat.scale.y=.8
pts=[]
for ix in range(-46,47):
 for iy in range(-46,47):
  x=ix*1.8+rng.uniform(-.3,.3);y=iy*1.8+rng.uniform(-.3,.3);r2=x*x+y*y
  if 54**2<r2<82.5**2:pts.append(((x,y,50.87),rng.uniform(.6,.85),(0,0,1)))
nubbles('Fine exposed base top annulus texture',pts,inset)
# Intentional significantly larger serif inscriptions, projected to smooth panel.
def text(name,body,loc,size,back=False):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.font=bpy.data.fonts.load(str(FONT_PATH)) if FONT_PATH.is_file() else bpy.data.fonts[0];c.align_x='CENTER';c.align_y='CENTER';c.size=size;c.space_line=1.18;c.extrude=.055;c.bevel_depth=.012
 ob=bpy.data.objects.new(name,c);s.collection.objects.link(ob);ob.location=mirror(loc,back);ob.rotation_euler=(math.pi/2,0,math.pi if back else 0);c.materials.append(lettermetal);return ob
for back,words in [(False,'before\nthe crowds\nthere was\nyou'),(True,'every step\ni took\nbegan\nbeside you')]:
 text(('Rear' if back else 'Front')+' body inscription',words,(24,-64,132),9.3,back)
 coords=[]
 for j in range(80):
  a=2*math.pi*j/80;x=24+16*math.sin(a)**3*.30;z=94+(13*math.cos(a)-5*math.cos(2*a)-2*math.cos(3*a)-math.cos(4*a))*.30;coords.append(mirror((x,surface(x,z,.25),z),back))
 mesh(('Rear' if back else 'Front')+' source bronze heart',coords,[tuple(range(80))],lettermetal,False)
# Low, wide framed plaques, front dedication and explicit rear sample placeholders.
for back in [False,True]:
 w=93;h=27;verts=[];faces=[]
 for z in [25-h/2,25+h/2]:
  for j in range(41):x=-w/2+w*j/40;verts.append(mirror((x,-math.sqrt(85**2-x*x),z),back))
 for j in range(40):faces.append((j,j+1,j+42,j+41))
 mesh(('Rear' if back else 'Front')+' original-style framed plaque',verts,faces,plaque)
 pts=[]
 for j in range(41):x=-w/2+w*j/40;pts.append(mirror((x,-math.sqrt(85.2**2-x*x),11.5),back))
 for j in reversed(range(41)):x=-w/2+w*j/40;pts.append(mirror((x,-math.sqrt(85.2**2-x*x),38.5),back))
 curve('Bronze plaque perimeter',pts,.75,bronze,True)
 if back:
  text('Rear plaque name placeholder','YOUR LOVED ONE',(0,-86,29),5.2,True);text('Rear plaque date placeholder','MONTH DAY, YEAR – MONTH DAY, YEAR',(0,-86,20),2.8,True)
 else:text('Front plaque dedication','FOREVER\nIN OUR HEARTS',(0,-86,25),5.5)
for ob in list(s.objects):
 if ob.type=='FONT':
  clone=ob.copy();clone.data=ob.data.copy();s.collection.objects.link(clone);clone.hide_render=True;clone.hide_set(True)
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;bpy.ops.object.convert(target='MESH')
  for v in ob.data.vertices:
   p=ob.matrix_world@v.co;sign=1 if ob.location.y>0 else -1;depth=v.co.z
   y=-surface(p.x,p.z,.3) if 'body inscription' in ob.name else math.sqrt(max(1,85.5**2-p.x**2))+.2
   p.y=sign*(y+depth);v.co=ob.matrix_world.inverted()@p
# Lower specular response makes texture read as black leather-like material, not metal studs.
for m in [black,pebble,inset]:
 p=m.node_tree.nodes['Principled BSDF'];p.inputs['Metallic'].default_value=0;p.inputs['Specular IOR Level'].default_value=.15;p.inputs['Roughness'].default_value=.58 if m==black else .78
world=bpy.data.worlds.new('Neutral consistent studio');s.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.07,.075,.08,1)
for name,pos,power,size in [('Key',(180,-280,370),1300000,250),('Fill',(-220,-150,230),800000,220),('Edge',(50,220,370),1300000,180)]:
 bpy.ops.object.light_add(type='AREA',location=pos);ob=bpy.context.object;ob.name=name;ob.data.energy=power;ob.data.shape='DISK';ob.data.size=size;ob.rotation_euler=(Vector((0,0,150))-ob.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;s.camera=cam;cam.data.type='ORTHO'
s.render.engine='CYCLES';s.cycles.samples=32;s.render.resolution_x=900;s.render.resolution_y=1100;s.render.resolution_percentage=100;s.view_settings.view_transform='AgX'
s['status']='V4 APPEARANCE ONLY. Source-traced independent curves. No engineered capacity.'
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v4.blend'))
views=[('front',(0,-700,160),(0,0,140),320),('rear',(0,700,160),(0,0,140),320),('side',(700,0,160),(0,0,140),320),('left',(-700,0,160),(0,0,140),320),('top',(0,-1,700),(0,0,140),230),('perspective',(270,-650,320),(0,0,140),325),('detail',(130,-650,250),(0,0,210),190),('base-detail',(0,-650,160),(0,0,28),225),('front-reference',(40,-700,225),(0,0,145),325),('rear-reference',(-40,700,225),(0,0,145),325)]
for name,pos,target,scale in views:
 cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale;s.render.filepath=str(O/f'appearance-{name}.png');bpy.ops.render.render(write_still=True)
(O/'appearance-status.json').write_text(json.dumps({'scope':'Source-traced V4 appearance only, not engineering release','bronze_front_trace_mm':B,'black_second_trace_mm':K,'body_font_mm':9.3,'base_diameter_target_mm':171.45,'source':'document63/image1.png','limitations':['Reference is a concept board, not measured orthographic drawings','Rear depth and hidden surfaces are interpretations','No cavity, capacity, closure, tolerance or printability approval']},indent=2)+'\n')
