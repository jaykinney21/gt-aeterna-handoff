from pathlib import Path
import json,html,hashlib
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image
P=Path(__file__).parent
rows=[
('P01','Forever in the Game','Purple and gold basketball, coiled black snake and a wood-look pedestal.','36','P01-hero-v3.png','LN-SPT-COURTLEGENDBase','Single-head snake correction applied. Inscription remains editable; no finished sample verified.'),
('P02','MVP - Baseball Glove','Weathered glove, baseball details and a wood-look tiered base.','37','P02-hero-v2.png','LN-SPT-MVPGLOVE','Rear support baseball is occluded in this front view. Placeholder dates omitted.'),
('P03',"Mom’s Tough Love",'A kitchen diorama with mother and child, framed by a wood-look lid and base.','38','P03-hero-v2.png','LN-FAM-TOUGHLOVE','Speech bubble and plaque lettering intentionally omitted for editorial review. Original closure and STL pairing unresolved.'),
('P04','Timeless Elegance','A black vessel with gold floral ornament, fine bands and a domed lid.','39','P04-hero-v2.png','HC-TRD-BLKGLDFLORAL','Ornamental rendering is an interpretation; confirm exact relief against CAD. Midnight Blossom file pairing remains provisional.'),
('P05','Legacy Lives On','Blue suede-look texture, sculpted white lacing and a rectangular pedestal.','40','P05-hero-v2.png','LN-SPT-SNEAKERBLUE','Original blue design preserved; inscription omitted. Dimensions await engineering reconciliation.'),
('P06','Every Step Legacy','An asymmetric black and bronze vessel with tread, stitching and a sweeping divider.','63','P06-hero-v2.png','LN-SPT-EVERYSTEP','Original athletic direction, separate from DOC NOTES trail concept. Generated texture is illustrative; CAD is being developed separately.'),
('D57','Infinite Loop','A restrained black cylinder wrapped by a sculptural ribbon.','DOC NOTES Sections 3 and 5','D57-infinite-loop-concept-v2.png','New concept - no production SKU','Flat lid revised. A mathematically correct Möbius half-twist is still not established by this image; resolve in future geometry.'),
('A06','Every Step - companion concepts','Miniature keepsake, infinity-path pendant and rectangular dog-tag keychain.','63 accessory specification','P06-accessories-concept-v1.png','Rose-gold accessory variant','Rose-gold tone is a distinct accessory proposal, not the original bronze finish. No verified scale, cavities, closures or working QR. Bracelets and heart necklace remain outside this pilot.')]
items=[]
for id,title,desc,source,asset,sku,note in rows:
 im=Image.open(P/'assets'/asset)
 items.append(dict(id=id,title=title,description=desc,source=source,asset='assets/'+asset,sku=sku,note=note,pixels=list(im.size),sha256=hashlib.sha256((P/'assets'/asset).read_bytes()).hexdigest(),status='Design concept - not yet manufactured'))
(P/'pilot-v2-manifest.json').write_text(json.dumps({'version':2,'date':'2026-09-19','tool':'built-in image_gen','scope':'seven vessel concepts and one sourced accessory panel','items':items},indent=2))
old=(P/'index-v1.html').read_text(); style=old.split('<style>')[1].split('</style>')[0]
style+='article img{height:auto;aspect-ratio:4/5;object-fit:contain;background:#151615}.accessory img{aspect-ratio:16/9}.badge{font-size:12px;color:#775f3f}.body p{margin:12px 0}nav a{margin-right:18px}.grid{align-items:start}.sku{overflow-wrap:anywhere}'
head='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aeterna - concept catalog pilot</title><style>'''+style+'''</style><header><div class="eyebrow">Graceful Tribute / Aeterna · Concept review · September 19, 2026</div><h1>A life, expressed.</h1><p>Seven vessel directions. One companion collection study. A visual pilot for discussing form, texture and the memories each design can hold.</p><div class="notice"><b>Design concepts — not yet manufactured.</b> AI-generated interpretations of supplied design references, not photographs of finished products. This review contains no approved prices, capacities, materials, fit, seals or availability claims.</div><p class="toolbar"><button onclick="saveCopy()">Save edited HTML copy</button><button onclick="window.print()">Print / save PDF</button></p><nav><a href="catalog-review-v2.pdf">Review PDF</a><a href="index-v1.html">Original storyboard</a><a href="pilot-v2-prompts.json">Prompt records</a><a href="pilot-v2-manifest.json">Source manifest</a></nav><p><small>Titles, descriptions and editorial notes are editable. Save the edited HTML into this same catalog folder so image links remain intact. HTML edits do not automatically update the supplied PDF.</small></p></header><main><div class="grid">'''
cards=[]
for x in items:
 e=lambda k:html.escape(str(x[k])); source=f'<a href="assets/{x["id"]}-source-doc-{x["source"]}.png">Original reference sheet</a>' if x['id'].startswith('P') else '<a href="../../docs/source-documents/DOC-NOTES.md">Guiding DOC NOTES</a>'
 if x['id']=='A06':source='<a href="assets/P06-source-doc-63.png">Primary vessel reference</a>'
 cards.append(f'''<article class="{'accessory' if x['id']=='A06' else ''}"><div class="cardhead"><span>{e('id')} · CONCEPT</span><span>REV B</span></div><img src="{e('asset')}" alt="Concept visualization: {e('title')}"><div class="body"><p class="badge">Design concept — not yet manufactured</p><p class="sku">{e('sku')}</p><h3 contenteditable="true">{e('title')}</h3><p contenteditable="true">{e('description')}</p><p class="status" contenteditable="true">{e('note')}</p><details><summary>Source and production notes</summary><p>Source: {e('source')}. {source}. Original source-sheet specifications remain unverified targets.</p><p>Built-in image generation; {x['pixels'][0]} × {x['pixels'][1]} pixels. No generated image is a CAD deliverable.</p></details></div></article>''')
tail='''</div><h2>What this pilot establishes</h2><p>A consistent studio direction and seven separately identified vessel concepts. Every Step has one sourced accessory study. The other designs have no approved accessory bundle in this pilot; generic Section 4 targets remain starting briefs, not finished matching products.</p><p>The full DOC NOTES inventory contains 72 entries. This pilot does not represent completion of that entire inventory. Next batches should follow design selection and source review, then hero, supported detail views, accessory brief, visual checks and catalog assembly.</p></main><footer>Internal visual review. Editorial IDs are not new production SKUs. Existing design references take precedence over conflicting DOC NOTES descriptions. No publication or sales release.</footer><script>function saveCopy(){const data='<!doctype html>\\n'+document.documentElement.outerHTML;const u=URL.createObjectURL(new Blob([data],{type:'text/html'}));const a=document.createElement('a');a.href=u;a.download='catalog-pilot-edited.html';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}</script></html>'''
(P/'index.html').write_text(head+''.join(cards)+tail)
c=canvas.Canvas(str(P/'catalog-review-v2.pdf'),pagesize=(612,792));c.setTitle('Aeterna - Concept Catalog Pilot')
stylep=ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=15,textColor=HexColor('#494740'))
def para(text,x,y,w=504):
 p=Paragraph(text,stylep);_,h=p.wrap(w,700);p.drawOn(c,x,y-h);return y-h-14
for i,x in enumerate(items,1):
 c.setFillColor(HexColor('#f4f1eb'));c.rect(0,0,612,792,fill=1,stroke=0)
 c.setFillColor(HexColor('#776045'));c.setFont('Helvetica',9);c.drawString(42,756,'GRACEFUL TRIBUTE / AETERNA     |     CONCEPT REVIEW')
 c.setFillColor(HexColor('#252622'));c.setFont('Times-Roman',26);c.drawString(42,718,x['title'].replace('’',"'"))
 c.setFont('Helvetica',10);c.drawString(42,695,'Design concept - not yet manufactured')
 iw,ih=x['pixels']; maxw,maxh=528,465; factor=min(maxw/iw,maxh/ih);w,h=iw*factor,ih*factor
 c.drawImage(str(P/x['asset']),(612-w)/2,218+(465-h)/2,width=w,height=h)
 y=197;y=para(html.escape(x['description']),42,y,528);y=para(html.escape(x['note']),42,y,528)
 c.setFont('Helvetica',8);c.setFillColor(HexColor('#686055'));c.drawString(42,52,f"{x['id']} | Source: {x['source']} | AI-generated visual interpretation")
 c.drawString(42,36,'No approved price, capacity, fit, seal or availability claims. Internal review only.');c.drawRightString(570,36,str(i));c.showPage()
c.save()
assert len(items)==8 and all((P/x['asset']).is_file() for x in items)
print('Wrote eight-page review PDF, editable HTML and manifest')
