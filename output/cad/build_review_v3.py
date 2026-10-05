"""Build a local image review from actual Blender renders; no external assets."""
from pathlib import Path
from html import escape
import shutil

root = Path(__file__).resolve().parents[2]
out = root / 'output/cad/review-v3'
model = root / 'output/cad/refinement-v3'
out.mkdir(exist_ok=True)
shutil.copy2(root / 'references/source-documents/63/image1.png', out / 'reference.png')
views = sorted(model.glob('appearance-*.png'))
assert views, 'Render the revised Blender model first'
cards = []
for path in views:
    shutil.copy2(path, out / path.name)
    title = path.stem.removeprefix('appearance-').replace('-', ' ').title()
    cards.append(f'<article><h2>{escape(title)}</h2><a href="{path.name}"><img src="{path.name}" alt="Actual Blender render: {escape(title)}"></a></article>')
page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Every Step Legacy — revision 3</title><style>
body{margin:0;background:#f5f1e9;color:#292721;font:17px/1.6 system-ui,sans-serif}main{max-width:1250px;margin:auto;padding:32px}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:42px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}article{background:white;padding:20px}img{display:block;width:100%;height:auto}a{color:#79532f}.notice{padding:18px;border-left:4px solid #a47742;background:#e9e0d1}@media(max-width:720px){.grid{display:block}article{margin-bottom:20px}main{padding:16px}}</style>
<main><p>GRACEFUL TRIBUTE / AETERNA</p><h1>Every Step Legacy — revision 3</h1>
<p class="notice">Appearance review of the revised Blender model. These are actual 3D renders. The revised exterior has not been approved for manufacturing; the previous model’s capacity measurement does not apply to it.</p>
<p>Click any image to enlarge it. Send the view name and what to change or preserve. No 3D software is needed.</p>
<h2>Original reference</h2><a href="reference.png"><img src="reference.png" alt="Original front, back and detail reference sheet"></a>
<h2>Front comparison</h2><div class="grid"><article><h2>Reference front</h2><svg viewBox="120 65 160 290" role="img" aria-label="Front urn enlarged from the original reference"><image href="reference.png" width="1024" height="682"/></svg></article><article><h2>Revised front</h2><img src="appearance-front.png" alt="Revised model front"></article></div>
<h2>Rear comparison</h2><div class="grid"><article><h2>Reference rear</h2><svg viewBox="405 77 140 280" role="img" aria-label="Rear urn enlarged from the original reference"><image href="reference.png" width="1024" height="682"/></svg></article><article><h2>Revised rear</h2><img src="appearance-rear.png" alt="Revised model rear"></article></div>
<h2>All rendered views</h2><div class="grid">''' + ''.join(cards) + '''</div><h2>Review order</h2><p>Compare the layered shape and shoulder first, then bronze borders, texture, lettering and plaques. Rear name and dates are demonstration placeholders. Hidden surfaces are a modeled interpretation of the concept sheet.</p></main></html>'''
(out / 'index.html').write_text(page)
print(out / 'index.html')
print(f'{len(views)} rendered views included')
