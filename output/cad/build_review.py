from pathlib import Path
import html
import json
import shutil
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[2]
CAD = ROOT / 'output/cad'
MODEL = CAD / 'refinement-v2'
OUT = CAD / 'review'
OUT.mkdir(exist_ok=True)
views = [('perspective', '01 / Overall shape'), ('front', '02 / Front'),
         ('rear', '03 / Rear'), ('side', '04 / Side'), ('top', '05 / Top'),
         ('bottom', '06 / Bottom closure'), ('section', '07 / Cavity cutaway')]
source = ROOT / 'references/source-documents/63/image1.png'
shutil.copy2(source, OUT / 'original-reference.png')
questions = [
    'Shape: does it capture the original folded, athletic character? What should be taller, softer or more pronounced?',
    'Bronze accents: is the divider broad enough, and are the rims balanced?',
    'Texture and lettering: are the tread, stitching, wording and placement right?',
    'Closure: is bottom loading with a fixed top the desired experience?',
    'Priority: name the three most important changes before the next revision.'
]
cards = []
for key, title in views:
    asset = MODEL / f'candidate-{key}.png'
    assert asset.exists(), f'Missing required rendered view: {asset}'
    shutil.copy2(asset, OUT / asset.name)
    cards.append((title, asset.name))
intro = ('These views are rendered from the actual editable CAD, not generated catalog imagery. '
         'This is a design-review candidate, not a production-approved urn. '
         'Some upper rims, folded detail and lettering remain separate visual geometry rather than part of the printable shell. '
         'Compare the geometry with the original reference, then send feedback using the view numbers. '
         'The reference sheet contains unverified capacity and hardware statements; it records intent, not test results.')
style = '''body{margin:0;background:#f3f0e9;color:#292b28;font:16px/1.6 system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:40px}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:48px}a{color:#70502c}nav{display:flex;gap:20px;flex-wrap:wrap}.notice{border-left:3px solid #987145;padding:18px;background:#e7e0d5}.grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}article{background:white;padding:22px;break-inside:avoid}img{display:block;width:100%;height:auto}.reference{margin:24px 0}.note{font-size:14px;color:#625c53}textarea{width:100%;box-sizing:border-box;min-height:180px;font:inherit;padding:16px;border:1px solid #aaa}footer{font-size:13px;margin-top:35px}@media(max-width:700px){main{padding:18px}.grid{grid-template-columns:1fr}h1{font-size:34px}}@media print{textarea{display:none}article{break-inside:avoid}.grid{display:block}nav{display:none}}'''
page = f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Every Step Legacy - CAD review v2</title><style>{style}</style><main><p>GRACEFUL TRIBUTE / AETERNA · CAD REVIEW V2</p><h1>Every Step Legacy</h1><p class="notice">{intro}</p><nav><a href="Every-Step-Legacy-review-v2.pdf">Download review PDF</a><a href="../refinement-v2/">Model files</a><a href="#feedback">How to give feedback</a></nav><section class="reference"><h2>Original design reference</h2><a href="original-reference.png"><img src="original-reference.png" alt="Original Every Step Legacy specification illustration"></a></section><div class="grid">'
for title, name in cards:
    page += f'<article><h2>{title}</h2><a href="{name}" target="_blank"><img src="{name}" alt="CAD rendered view: {html.escape(title)}"></a><p class="note">Open image for a closer look. Reference your feedback to {title[:2]}.</p></article>'
page += '</div><section id="feedback"><h2>Your review</h2><p>Review shape and appearance first; supplier tolerances and physical performance are separate checks.</p><ol>' + ''.join(f'<li>{html.escape(q)}</li>' for q in questions) + '</ol><label for="notes">Draft feedback here, then copy it into our conversation. This box is not saved automatically.</label><textarea id="notes" placeholder="View 02: ...&#10;View 04: ...&#10;Keep: ...&#10;Change first: ..."></textarea><p>You can also annotate the PDF in Preview and share the annotated copy. No CAD software is required to review these views.</p></section><footer>Revision v2. Rendered CAD and original reference are intentionally separate. Prototype required to judge real weight, texture, finish, filling access and closure. Physical samples and manufacturing orders have not been commissioned.</footer></main></html>'
(OUT / 'index.html').write_text(page)

c = canvas.Canvas(str(OUT / 'Every-Step-Legacy-review-v2.pdf'), pagesize=(792,612))
c.setTitle('Every Step Legacy - Human CAD Review v2')
ps = ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=14)
all_pages = [('Original reference / compare with CAD', 'original-reference.png')] + cards
for i,(title,name) in enumerate(all_pages,1):
    c.setFillColor(HexColor('#f3f0e9'));c.rect(0,0,792,612,fill=1,stroke=0)
    c.setFillColor(HexColor('#292b28'));c.setFont('Times-Roman',24);c.drawString(30,571,title)
    c.setFont('Helvetica',9);c.drawString(30,548,'EVERY STEP LEGACY / REVISION V2 / DESIGN REVIEW - NOT APPROVED FOR PRODUCTION')
    im=ImageReader(str(OUT/name));iw,ih=im.getSize();factor=min(732/iw,440/ih)
    w,h=iw*factor,ih*factor;c.drawImage(im,(792-w)/2,90+(440-h)/2,width=w,height=h)
    c.setFont('Helvetica',9);c.drawString(30,58,'Feedback: shape / bronze divider / texture / lettering / closure. Refer to this page or view number.')
    c.drawString(30,40,'Some upper details/text are separate visual geometry. Appearance is not proof of printability or physical performance.')
    c.drawRightString(762,24,str(i));c.showPage()
c.setFillColor(HexColor('#f3f0e9'));c.rect(0,0,792,612,fill=1,stroke=0)
c.setFillColor(HexColor('#292b28'));c.setFont('Times-Roman',28);c.drawString(40,555,'Human review / decision notes')
y=515
for i,q in enumerate(questions,1):
    p=Paragraph(f'{i}. {html.escape(q)}',ps);_,h=p.wrap(710,100);p.drawOn(c,40,y-h);y-=h+22
    c.setStrokeColor(HexColor('#c7bfb0'));c.line(40,y,750,y);y-=34
c.setFont('Helvetica',9);c.drawString(40,35,'Send page/view number + requested change. Mark anything you want preserved.');c.showPage();c.save()
assert len(cards)==7
print(f'Created {OUT / "index.html"} and 9-page review PDF')
