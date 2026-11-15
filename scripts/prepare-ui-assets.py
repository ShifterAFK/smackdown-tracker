from pathlib import Path
from io import BytesIO
import json
from PIL import Image, features

assert features.check('webp'), 'Pillow needs WebP support'
root = Path(__file__).resolve().parents[1]
source = root / 'assets/img/source'
target = root / 'assets/img/ui'
items = {'solise asistant.png': 'solise-assistant.webp', 'VS.png': 'vs.webp', 'coins_blue.png': 'coins-blue.webp', 'coins_red.png': 'coins-red.webp'}
prepared = []
for original, name in items.items():
    path = source / original
    with Image.open(path) as raw:
        assert raw.format == 'PNG', f'Not PNG: {original}'
        image = raw.convert('RGBA')
    candidates = []
    for options in ({'lossless': True}, {'quality': 88, 'alpha_quality': 100, 'exact': True}):
        buffer = BytesIO()
        image.save(buffer, format='WEBP', method=6, **options)
        blob = buffer.getvalue()
        with Image.open(BytesIO(blob)) as check:
            assert check.size == image.size
            assert check.convert('RGBA').getchannel('A').tobytes() == image.getchannel('A').tobytes(), f'Alpha changed: {original}'
        candidates.append(blob)
    blob = min(candidates, key=len)
    prepared.append((name, blob, {'source': original, 'width': image.width, 'height': image.height, 'png_bytes': path.stat().st_size, 'webp_bytes': len(blob), 'has_transparency': image.getchannel('A').getextrema()[0] < 255}))
target.mkdir(parents=True, exist_ok=True)
for name, blob, info in prepared:
    (target / name).write_bytes(blob)
report = json.dumps([item[2] for item in prepared], indent=2)
(target / 'manifest.json').write_text(report + '\n', encoding='utf-8')
index = root / 'index.html'
html = index.read_text(encoding='utf-8')
css = '<link rel="stylesheet" href="assets/css/ui-assets.css?v=1">'
js = '<script src="assets/js/ui-assets.js?v=1"></script>'
if 'assets/css/ui-assets.css' not in html:
    assert '</head>' in html
    html = html.replace('</head>', css + '\n</head>', 1)
if 'assets/js/ui-assets.js' not in html:
    assert '</body>' in html
    html = html.replace('</body>', js + '\n</body>', 1)
index.write_text(html, encoding='utf-8')
print(report)
