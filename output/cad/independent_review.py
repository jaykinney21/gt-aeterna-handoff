import bpy,bmesh,json,sys,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
bpy.ops.wm.open_mainfile(filepath=sys.argv[sys.argv.index('--')+1])
out={}
for o in bpy.data.objects:
 if o.type!='MESH' or o.name not in {'Vessel shell candidate','Bottom metal plate candidate','EMPTY cavity measurement only'}:continue
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.triangulate(bm,faces=list(bm.faces));bm.normal_update();bm.faces.ensure_lookup_table();bm.verts.ensure_lookup_table()
 seen=set();components=0
 for v in bm.verts:
  if v in seen:continue
  components+=1;stack=[v];seen.add(v)
  while stack:
   for e in stack.pop().link_edges:
    for w in e.verts:
     if w not in seen:seen.add(w);stack.append(w)
 r={'vertices':len(bm.verts),'triangles':len(bm.faces),'components':components,'nonmanifold_edges':sum(not e.is_manifold for e in bm.edges),'degenerate_triangles_area_below_1e-10_mm2':sum(f.calc_area()<1e-10 for f in bm.faces),'volume_in3':abs(bm.calc_volume())/25.4**3,'bounds_mm':list(o.dimensions)}
 if 'shell' in o.name.lower():
  tree=BVHTree.FromBMesh(bm);thickness=[];misses=0
  # Sampling outer radial-normal faces excludes base, hardware and decorative tangents.
  for f in bm.faces:
   c=f.calc_center_median();rad=Vector((c.x,c.y,0))
   if not (60<c.z<245) or f.normal.dot(rad.normalized())<.85:continue
   loc,n,index,d=tree.ray_cast(c-f.normal*.001,-f.normal,20)
   if d is not None:thickness.append(d+.001)
   else:misses+=1
  r['sampled_outer_normal_wall_mm']={'count':len(thickness),'minimum':min(thickness) if thickness else None,'maximum':max(thickness) if thickness else None,'no_hit_within_20mm':misses,'scope':'Selected outward sidewall triangle-center normal rays; not exhaustive minimum thickness proof.'}
  # BVH overlap is a screening only: coplanar/touching faces may be false positives.
  overlaps=tree.overlap(tree);pairs=[]
  for a,b in overlaps:
   if a>=b:continue
   if set(bm.faces[a].verts).intersection(bm.faces[b].verts):continue
   pairs.append([a,b])
  r['nonadjacent_triangle_overlap_screen_count']=len(pairs);r['overlap_screen_first_pairs']=pairs[:10]
  roof=[]
  for i in range(41):
   t=i/40
   for x,y in [(-38+76*t,-28),(-38+76*t,28),(-38,-28+56*t),(38,-28+56*t)]:
    hit,loc,n,face=o.ray_cast(o.matrix_world.inverted()@Vector((x,y,-5)),Vector((0,0,1)))
    if hit:roof.append((o.matrix_world@loc).z)
  r['gasket_roof']={'sample_count':len(roof),'minimum_z':min(roof),'maximum_z':max(roof),'pass':len(roof)==164 and all(abs(z-4)<.02 for z in roof)}
 out[o.name]=r;bm.free()
shell=bpy.data.objects['Vessel shell candidate']
cavity=next(o for o in bpy.data.objects if o.type=='MESH' and 'empty cavity' in o.name.lower())
hits=[];cb=bmesh.new();cb.from_mesh(cavity.data);bmesh.ops.triangulate(cb,faces=list(cb.faces));cb.normal_update()
for f in cb.faces:
 c=shell.matrix_world.inverted()@(cavity.matrix_world@f.calc_center_median());n=f.normal
 if not 60<c.z<245:continue
 hit,loc,normal,index=shell.ray_cast(c+n*.2,n, distance=20)
 if hit:hits.append((float((loc-c).length),list(c)))
hits.sort()
cb.free()
out['inner_cavity_sidewall_normal_sample']={'samples':len(hits),'minimum_mm':hits[0][0],'maximum_mm':hits[-1][0],'five_smallest':hits[:5],'scope':'Normal rays from cavity side faces z60..245mm through shell; not exhaustive minimum.'}
print('INDEPENDENT_REVIEW_JSON',json.dumps(out,indent=2))
