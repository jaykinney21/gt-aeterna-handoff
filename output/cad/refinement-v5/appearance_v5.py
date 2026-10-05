"""Every Step Legacy v5: source-traced appearance, NOT engineering/capacity release."""
import bpy,bmesh,math,json,random,os
from pathlib import Path
import os
FONT_PATH = Path(os.environ.get('GT_AETERNA_FONT', '/System/Library/Fonts/Supplemental/Georgia.ttf'))
from mathutils import Vector,Matrix
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
black=material('Satin charcoal writing shells',(.018,.022,.022),.08,.44,True)
pebble=material('Fine black athletic pebble',(.012,.016,.017),.05,.5,True)
bronze=material('Warm brushed bronze',(.44,.205,.075),.72,.4)
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
B=[(53,-59.5),(133,-53.55),(191,-33.32),(231,11.9),(244,34.51)]
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
 t=max(0,min(1,(z-53)/167));return 56+9*math.sin(math.pi*t)+10*t,48+12*math.sin(math.pi*t)+4*t

def surface(x,z,offset=0):
 rx,ry=outer(z);return -ry*math.sqrt(max(.004,1-(x/rx)**2))-offset

def core(z):
 t=max(0,min(1,(z-53)/217));return -16,35+20*math.sin(math.pi*t/2),31+14*math.sin(math.pi*t/2)
# Tall rear core and exactly planar asymmetric oval cap.
N=160;R=100;vs=[];fs=[]
for k in range(R+1):
 t=k/R
 for j in range(N):
  a=2*math.pi*j/N;z=53+t*(206.5-17.6*math.cos(a));cx,rx,ry=core(z)
  if k==R:x=-16+55*math.cos(a);y=45*math.sin(a);z=259.5-.32*(x+16)
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
   u=j/A;z=53+167*t;rx,ry=outer(z)
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
  z=53+191*k/160;xb=interp(B,z);yb=surface(xb,z,.6)
  if z>220:
   q=(z-220)/24;w=q*q*(3-2*q);capy=-45*math.sqrt(max(.001,1-((xb+16)/55)**2));yb=yb*(1-w)+capy*w
  if z<=220:
   xk=interp(K,z);yk=surface(xk,z,.65);edge.append(mirror((xk,yk,z),back))
  else:
   q=(z-220)/24;ease=q*q*(3-2*q);xk=interp(K+[(230,63.07),(244,34.51)],z);yk=surface(xk,z,.65)*(1-ease)-14*ease
  for j in range(25):
   u=j/24;f=math.sin(math.pi*u/2);x=xb*(1-f)+xk*f;y=yb*(1-u)+yk*u-10*math.sin(math.pi*u)*math.sin(math.pi*k/160)
   vs.append(mirror((x,y,z),back))
  if k:
   for j in range(24):a=(k-1)*25+j;f=(a,a+1,a+26,a+25);fs.append(tuple(reversed(f)) if back else f)
  # Warm bronze band has restrained width and follows the first traced boundary.
  half=(3.5+2.0*math.sin(math.pi*k/160))*min(1,k/35)
  slope=max(-3,min(3,(yk-yb)/max(1,xk-xb)))
  for x in [xb-half,xb+half]:
   u=2/math.pi*math.asin(max(-.95,min(.95,(x-xb)/max(1,xk-xb))))
   yy=yb*(1-u)+yk*u-10*math.sin(math.pi*u)*math.sin(math.pi*k/160)-.9
   point=Vector((x,yy,z))
   if k>145:
    t=(k-145)/15;t=t*t*(3-2*t);angle=-math.acos((34.51+16)/55.5)
    rx,ry=(49,39) if x<xb else (55.5,45.5)
    tx=-16+rx*math.cos(angle);ty=ry*math.sin(angle);target=Vector((tx,ty,260-.32*(tx+16)))
    point=point.lerp(target,t)
   # Keep the widened lip outside the textured core until it rises above the cap plane.
   if k>135:
    cx,rx,ry=core(point.z);core_y=-ry*math.sqrt(max(.001,1-((point.x-cx)/rx)**2))-1.2
    clearance=point.z-(259.5-.32*(point.x+16));fade=max(0,min(1,clearance/1.5));fade=fade*fade*(3-2*fade)
    point.y=min(point.y,core_y)*(1-fade)+point.y*fade
   bronzevs.append(mirror(point,back))
  if k:bronzefs.append((2*k-2,2*k-1,2*k+1,2*k))
 blade=mesh(('Rear' if back else 'Front')+' full-height broad black curved blade',vs,fs,black)
 sub=blade.modifiers.new('Continuous rounded sculptural blade','SUBSURF');sub.levels=2;sub.render_levels=2
 solid=blade.modifiers.new('Black blade edge thickness','SOLIDIFY');solid.thickness=1.5;solid.offset=-1
 band=mesh(('Rear' if back else 'Front')+' source middle bronze curve',bronzevs,bronzefs,bronze)
 solid=band.modifiers.new('Bronze thickness','SOLIDIFY');solid.thickness=.7;solid.offset=0
 # The writing shell edge itself supplies the second black curve; no disconnected tube rim.
# Connect upper black blades around the side, avoiding crossed sheet overlap.
vs=[];fs=[]
for k in range(140,161):
 z=53+191*k/160;q=(z-220)/24;ease=q*q*(3-2*q);xk=interp(K+[(230,63.07),(244,34.51)],z);yk=surface(xk,z,.65)*(1-ease)-14*ease
 for j in range(25):
  u=j/24;vs.append((xk+2*math.sin(math.pi*u)**2*math.sin(math.pi*q),yk*(1-2*u),z))
 if k>140:
  for j in range(24):a=(k-141)*25+j;fs.append((a,a+1,a+26,a+25))
bridge=mesh('Continuous black side return between front and rear blades',vs,fs,black)
sub=bridge.modifiers.new('Smooth rolled side return','SUBSURF');sub.levels=2;sub.render_levels=2
# Weld blade and side-return raw boundaries before one shared smooth modifier.
parts=[o for o in s.objects if ('full-height broad black curved blade' in o.name or 'Continuous black side return' in o.name)]
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();unified=bpy.context.object;unified.name='Welded continuous broad black blade wrapping around rear'
bm=bmesh.new();bm.from_mesh(unified.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.001);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.0001);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(unified.data);bm.free();unified.data.update()
# Replace the gathered multi-sheet return with one continuous elliptical foil.
# Monotonic cross-sections avoid seam pinching and variable-boundary derivative jumps.
unified.hide_render=True
v=[];f=[]
for k in range(181):
 z=53+191*k/180;xb=interp(B,z)
 xk=interp(K[:4]+[(215,37),(225,44),(235,40),(244,34.51)],z)
 yb=surface(xb,z,.6)
 if z>210:
  q=min(1,(z-210)/34);w=q*q*(3-2*q);capy=-45*math.sqrt(max(.001,1-((xb+16)/55)**2));yb=yb*(1-w)+capy*w
 for j in range(81):
  a=math.pi*j/80;v.append((xb+(xk-xb)*math.sin(a),yb*math.cos(a),z))
 if k:
  for j in range(80):i=(k-1)*81+j;f.append((i,i+1,i+82,i+81))
foil=mesh('Continuous rigid rolled black foil',v,f,black)
sub=foil.modifiers.new('Smooth rigid foil','SUBSURF');sub.levels=2;sub.render_levels=2
sol=foil.modifiers.new('Rigid foil visual thickness','SOLIDIFY');sol.thickness=1.5;sol.offset=-1
# Shallow recessed shoulder floor closes the reveal behind the tighter upright foil.
z=218.5;xb=interp(B,z);xk=interp(K[:4]+[(215,37),(225,44),(235,40),(244,34.51)],z);yb=surface(xb,z,.6);rx,ry=outer(z)
floor_v=[];floor_f=[]
for j in range(161):
 y=-ry+2*ry*j/160;outer_x=rx*math.sqrt(max(0,1-(y/ry)**2));inner_x=xb+(xk-xb)*math.sqrt(max(0,1-(y/yb)**2))
 if outer_x<inner_x:continue
 floor_v.extend([(inner_x-.5,y,z),(outer_x+.2,y,z)])
 if len(floor_v)>2:i=len(floor_v)-4;floor_f.append((i,i+1,i+3,i+2))
recess_finish=material('Dark matte recessed shoulder',(.0007,.001,.001),0,1);recess_finish.node_tree.nodes.get('Principled BSDF').inputs['Specular IOR Level'].default_value=0
floor=mesh('Shallow closed shoulder reveal floor',floor_v,floor_f,recess_finish,False);sol=floor.modifiers.new('Recess floor appearance thickness','SOLIDIFY');sol.thickness=1.2
# Rounded shallow shoulder joins front/back smooth shell at source height220.
pts=[]
for back in [False,True]:
 values=range(101) if not back else reversed(range(100))
 for j in values:
  u=j/100;z=220;rx,ry=outer(z);a0=-math.acos(interp(K,z)/rx);a=a0*(1-u);pts.append(mirror((rx*math.cos(a),ry*math.sin(a),z),back))
# Replaced by the continuous recessed floor, avoiding overlapping shoulder faces.
cap=[]
for j in range(160):
 a=2*math.pi*j/160;x=-16+55*math.cos(a);y=45*math.sin(a);cap.append((x,y,259.8-.32*(x+16)))
rimverts=[];rimfaces=[]
for j in range(160):
 a=2*math.pi*j/160
 for rx,ry in [(55.5,45.5),(49.0,39.0)]:
  x=-16+rx*math.cos(a);y=ry*math.sin(a);rimverts.append((x,y,261-.32*(x+16)))
 rimfaces.append((2*j,2*((j+1)%160),2*((j+1)%160)+1,2*j+1))
rim=mesh('Flat warm copper cap annulus',rimverts,rimfaces,bronze)
sol=rim.modifiers.new('Copper lip thickness','SOLIDIFY');sol.thickness=.8

mesh('Planar inset oval dark cap',[(-16,0,259.6)]+[(x,y,z-.2) for x,y,z in cap],[(0,j+1,(j+1)%160+1) for j in range(160)],inset,True)
# Dense irregular shallow nubbly texture, never a shiny regular stud grid.
rng=random.Random(63)
def nubbles(name,points,mat):
 verts=[];faces=[];S=10
 rounded='base band' in name
 for co,r,n in points:
  co=Vector(co);n=Vector(n).normalized();a=n.cross(Vector((0,0,1)))
  if a.length<.1:a=Vector((1,0,0))
  a.normalize();b=n.cross(a);start=len(verts);height=r*(.7 if rounded else (.48 if "core" in name else .3));verts.append(co+n*height)
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
  if zz>257.5-17.6*math.cos(a):continue
  cx,rx,ry=core(zz)
  if cx+(rx+.15)*math.cos(a)>interp(B,zz)-1.2:continue
  points.append(((cx+(rx+.15)*math.cos(a),(ry+.15)*math.sin(a),zz),rng.uniform(.65,1.0),(math.cos(a),math.sin(a),0)))
nubbles('Irregular fine black nubbly core surface',points,pebble)
points=[]
for ix in range(-29,30):
 for iy in range(-24,25):
  x=ix*1.8+rng.uniform(-.4,.4);y=iy*1.8+rng.uniform(-.4,.4)
  if (x/50.5)**2+(y/40.5)**2<1:points.append(((-16+x,y,259.82-.32*x),rng.uniform(.6,.9),(.18,0,1)))
# Fine procedural grain avoids oversized geometric fibers on the cap.
for node in inset.node_tree.nodes:
 if node.type=='BUMP':node.inputs['Strength'].default_value=.08;node.inputs['Distance'].default_value=.025
# Narrow connected ladder stitching confined to original front textured strip.
for a in [-2.43,-2.35]:
 curve('Fine double bronze stitched seam',[(core(z)[0]+(core(z)[1]+.45)*math.cos(a),(core(z)[2]+.45)*math.sin(a),z) for z in range(83,250,2)],.18,bronze)
for z in range(85,250,3):
 pts=[]
 for a,zz in [(-2.46,z),(-2.39,z+.45),(-2.32,z)]:cx,rx,ry=core(zz);pts.append((cx+(rx+.6)*math.cos(a),(ry+.6)*math.sin(a),zz))
 curve('Fine connected ladder cross stitch',pts,.2,bronze)
# Original base proportions: 171.45mm diameter, ~50.8mm tall, three dark bands.
cylinder('Original proportion round base',84.2,0,49.5,black)
for z0,z1 in [(7,18),(20,31),(33,44)]:
 cylinder('Dense dark base band backing',84.35,z0,z1,pebble);pts=[]
 for row in range(3):
  zz=z0+1.5+row*3.5
  for j in range(160):
   a=(j+(row%2)*.5+rng.uniform(-.2,.2))*2*math.pi/160;z=zz+rng.uniform(-.25,.25)
   if abs(84.5*math.cos(a))<48 and abs(math.sin(a))>.8 and 10<z<40:continue
   pts.append(((84.5*math.cos(a),84.5*math.sin(a),z),rng.uniform(1.4,1.65),(math.cos(a),math.sin(a),0)))
 nubbles('Dense irregular base band',pts,pebble)
for z in [3.5,47.5]:cylinder('Flat copper outer base band',85.1,z-1.1,z+1.1,bronze)
cylinder('Flush dark upper base surface',83,49,50.8,inset)
seat=cylinder('Seated black vessel foot',60,50.6,53.2,black);seat.scale.y=.8
pts=[]
for ix in range(-46,47):
 for iy in range(-46,47):
  x=ix*1.8+rng.uniform(-.3,.3);y=iy*1.8+rng.uniform(-.3,.3);r2=x*x+y*y
  if 54**2<r2<82.5**2:pts.append(((x,y,50.87),rng.uniform(.6,.85),(0,0,1)))
# Exposed base top uses the same fine procedural grain as the cap.
# Intentional significantly larger serif inscriptions, projected to smooth panel.
def text(name,body,loc,size,back=False):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.font=bpy.data.fonts.load(str(FONT_PATH)) if FONT_PATH.is_file() else bpy.data.fonts[0];c.align_x='CENTER';c.align_y='CENTER';c.size=size;c.space_line=1.18;c.extrude=.055;c.bevel_depth=.012
 ob=bpy.data.objects.new(name,c);s.collection.objects.link(ob);ob.location=mirror(loc,back);ob.rotation_euler=(math.pi/2,0,math.pi if back else 0);c.materials.append(lettermetal);return ob
for back,words in [(False,'before\nthe crowds\nthere was\nyou'),(True,'every step\ni took\nbegan\nbeside you')]:
 inscription=text(('Rear' if back else 'Front')+' body inscription',words,(17,-64,137),12.3,back);inscription.scale.x=1.23
 coords=[]
 for j in range(80):
  a=2*math.pi*j/80;x=17+16*math.sin(a)**3*.34;z=88+(13*math.cos(a)-5*math.cos(2*a)-2*math.cos(3*a)-math.cos(4*a))*.34;coords.append(mirror((x,surface(x,z,.25),z),back))
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
# Appearance-only proportional correction: source illustration is more slender than its written dimensions.
for ob in s.objects:
 ob.matrix_world=Matrix.Diagonal((.85,.85,1,1))@ob.matrix_world
# Explicit fine-grain shaders: visible stipple, no geometric fibers.
for mat,scale,strength,dist in [(inset,95,.3,.2),(black,260,.15,.065)]:
 nt=mat.node_tree;bs=nt.nodes.get('Principled BSDF');bs.inputs['Specular IOR Level'].default_value=.05
 coord=nt.nodes.new('ShaderNodeTexCoord');noise=nt.nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=scale;noise.inputs['Detail'].default_value=2
 nt.links.new(coord.outputs['Generated'],noise.inputs['Vector']);ramp=nt.nodes.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.2;ramp.color_ramp.elements[0].color=(.002,.003,.003,1);ramp.color_ramp.elements[1].position=.8;ramp.color_ramp.elements[1].color=(.012,.016,.016,1)
 if mat==black:
  ramp.color_ramp.elements[0].color=(.004,.006,.006,1);ramp.color_ramp.elements[1].color=(.009,.012,.012,1)
 nt.links.new(noise.outputs['Fac'],ramp.inputs[0]);nt.links.new(ramp.outputs['Color'],bs.inputs['Base Color'])
 bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=strength;bump.inputs['Distance'].default_value=dist;nt.links.new(noise.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs['Normal'],bs.inputs['Normal'])
core_finish=pebble.copy();core_finish.name='Rounded athletic pebble core finish';cp=core_finish.node_tree.nodes.get('Principled BSDF');cp.inputs['Roughness'].default_value=.60;cp.inputs['Specular IOR Level'].default_value=.25
for ob in s.objects:
 if ob.name in {'Tall textured source blade','Irregular fine black nubbly core surface'}:ob.data.materials.clear();ob.data.materials.append(core_finish)
world=bpy.data.worlds.new('Neutral consistent studio');s.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.07,.075,.08,1)
for name,pos,power,size in [('Key',(180,-280,370),1300000,250),('Fill',(-220,-150,230),800000,220),('Edge',(50,220,370),1300000,180)]:
 bpy.ops.object.light_add(type='AREA',location=pos);ob=bpy.context.object;ob.name=name;ob.data.energy=power;ob.data.shape='DISK';ob.data.size=size;ob.rotation_euler=(Vector((0,0,150))-ob.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;s.camera=cam;cam.data.type='ORTHO'
s.render.engine='CYCLES';s.cycles.samples=64;s.render.resolution_x=900;s.render.resolution_y=1100;s.render.resolution_percentage=100;s.view_settings.view_transform='AgX'
s['status']='V5 APPEARANCE ONLY. Source-traced independent curves. No engineered capacity.'
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v5.blend'))
views=[('front',(0,-700,370),(0,0,140),320),('rear',(0,700,370),(0,0,140),320),('side',(700,0,245),(0,0,140),320),('top',(0,-1,700),(0,0,140),210),('detail',(70,-700,370),(0,0,215),185),('base-detail',(0,-700,170),(0,0,27),205),('front-reference',(0,-700,370),(0,0,140),320),('rear-reference',(0,700,370),(0,0,140),320)]
if os.environ.get("V5_DETAIL_ONLY"):views=[v for v in views if v[0]=="detail"]
if os.environ.get("V5_SHAPE_ONLY"):views=[v for v in views if v[0] in {"front","side"}]
for name,pos,target,scale in views:
 cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale;s.render.filepath=str(O/f'appearance-{name}.png');bpy.ops.render.render(write_still=True)
bounds=[]
for ob in s.objects:
 if ob.type in {'MESH','CURVE','FONT'} and not ob.hide_render:
  evaluated=ob.evaluated_get(bpy.context.evaluated_depsgraph_get());me=evaluated.to_mesh();bounds.extend(ob.matrix_world@v.co for v in me.vertices);evaluated.to_mesh_clear()
(O/'appearance-status.json').write_text(json.dumps({'scope':'V5 appearance revision only, not engineering release','iterations':20,'source':'document63/image1.png','actual_appearance_bounds_mm':[max(v[i] for v in bounds)-min(v[i] for v in bounds) for i in range(3)],'source_written_base_diameter_mm':171.45,'appearance_xy_scale':.85,'proportion_decision':'Source picture is narrower than its written dimensions; appearance intentionally follows picture proportions. No capacity or manufacturing-size claim.','body_font_mm_before_xy_scale':12.3,'body_text_width_multiplier':1.23,'render_resolution':[900,1100],'cycles_samples':64,'review_views':['front','rear','side','top','detail','base-detail','front-reference','rear-reference'],'limitations':['Source front/rear perspectives are conceptual and do not uniquely determine a consistent solid','Hidden depth and rolled return remain interpretations','No cavity, capacity, closure, tolerance or printability approval','Owner visual approval remains outstanding']},indent=2)+'\n')
# Save a useful front review camera in the editable scene as well.
cam.location=(0,-700,370);cam.rotation_euler=(Vector((0,0,140))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=320
bpy.ops.wm.save_as_mainfile(filepath=str(O/'Every-Step-Legacy-appearance-v5.blend'))
