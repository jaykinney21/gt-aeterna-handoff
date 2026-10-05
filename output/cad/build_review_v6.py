"""Build a local image review from actual Blender renders; no external assets."""
from pathlib import Path
from html import escape
import shutil

root = Path(__file__).resolve().parents[2]
out = root / 'output/cad/review-v6'
model = root / 'output/cad/refinement-v6'
out.mkdir(exist_ok=True)
shutil.copy2(root / 'references/source-documents/63/image1.png', out / 'reference.png')
view_order = ['front', 'rear', 'cap-top', 'top', 'detail', 'base-detail', 'side', 'front-reference', 'rear-reference']
views = sorted(model.glob('appearance-*.png'), key=lambda p: view_order.index(p.stem.removeprefix('appearance-')) if p.stem.removeprefix('appearance-') in view_order else 99)
assert views, 'Render the revised Blender model first'
cards = []
for path in views:
    shutil.copy2(path, out / path.name)
    if path.stem.endswith('-reference'):
        continue
    title = path.stem.removeprefix('appearance-').replace('-', ' ').title()
    cards.append(f'<article><h2>{escape(title)}</h2><a href="{path.name}"><img src="{path.name}" alt="Actual Blender render: {escape(title)}"></a></article>')
page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Every Step Legacy — revision 6</title><style>
body{margin:0;background:#f5f1e9;color:#292721;font:17px/1.6 system-ui,sans-serif}main{max-width:1250px;margin:auto;padding:32px}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:42px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}article{background:white;padding:20px}.grid:not(:last-of-type) svg{height:720px;max-height:85vh}img,svg{display:block;width:100%;height:auto}a{color:#79532f}.notice{padding:18px;border-left:4px solid #a47742;background:#e9e0d1}@media(max-width:720px){.grid{display:block}article{margin-bottom:20px}main{padding:16px}}</style>
<main><p>GRACEFUL TRIBUTE / AETERNA</p><h1>Every Step Legacy — revision 6</h1>
<p class="notice">Appearance review of the revised Blender model. These are actual 3D renders. The revised exterior has not been approved for manufacturing; the previous model’s capacity measurement does not apply to it. The provisional visual proportions inherited from v5 are not a dimensional approval.</p>
<p>This revision addresses your three refinements: move the football-style stitching farther right, make the cap a teardrop with a rounded point, and bring the base texture closer to the reference’s staggered rounded rows. The curved blade beneath the cap is retained. Front reads “before the crowds there was you”; rear reads “every step i took began beside you.”</p>
<p>Click any image to enlarge it. “Cap Top” isolates the actual cap and bronze rim so its silhouette is easy to judge; “Top” shows the complete model. No 3D software is needed.</p>
<h2>Original reference</h2><a href="reference.png"><img src="reference.png" alt="Original front, back and detail reference sheet"></a>
<h2>Front comparison</h2><div class="grid"><article><h2>Reference front</h2><svg viewBox="122 65 151 290" role="img" aria-label="Front urn enlarged from the original reference"><image href="reference.png" width="1024" height="682"/></svg></article><article><h2>Revised front</h2><svg viewBox="175 55 550 1035" role="img" aria-label="Revised model front"><image href="appearance-front-reference.png" width="900" height="1100"/></svg></article></div>
<h2>Rear comparison</h2><div class="grid"><article><h2>Reference rear</h2><svg viewBox="392 75 142 282" role="img" aria-label="Rear urn enlarged from the original reference"><image href="reference.png" width="1024" height="682"/></svg></article><article><h2>Revised rear</h2><svg viewBox="175 55 550 1035" role="img" aria-label="Revised model rear"><image href="appearance-rear-reference.png" width="900" height="1100"/></svg></article></div>
<h2>Remaining reference differences</h2><p>The underlying shoulder recess and hidden return remain the v5 interpretation. This pass focuses on the requested seam position, cap outline and base texture; it does not establish exact manufacturing geometry or physical finish.</p><h2>All rendered views</h2><div class="grid">''' + ''.join(cards) + '''</div><h2>Review order</h2><p>Compare the layered shape and shoulder first, then bronze borders, texture, lettering and plaques. Rear name and dates are demonstration placeholders. Hidden surfaces are a modeled interpretation of the concept sheet. The original concept image is low resolution and contains conflicting dimensions; exact physical dimensions must be reconciled after the appearance is accepted.</p></main></html>'''
(out / 'index.html').write_text(page)
print(out / 'index.html')
print(f'{len(views)} render files copied; {len(cards)} unique view cards')
