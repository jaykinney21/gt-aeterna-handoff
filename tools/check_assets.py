"""Verify supplied repository assets and optional downloaded release ZIPs."""
from pathlib import Path
import argparse
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]

def sha256(data):
    return hashlib.sha256(data).hexdigest()

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--downloads', type=Path, help='Directory containing the three release ZIPs')
args = parser.parse_args()
manifest = json.loads((ROOT / 'output/ASSET-MANIFEST.json').read_text())
for row in manifest['files']:
    path = ROOT / row['path']
    data = path.read_bytes()
    assert len(data) == row['bytes'] and sha256(data) == row['sha256'], row['path']
print(f"Verified {len(manifest['files'])} repository assets")
if args.downloads:
    for path in sorted((ROOT / 'models').glob('*.manifest.json')):
        bundle = json.loads(path.read_text())
        download = args.downloads / bundle['bundle']
        assert download.stat().st_size == bundle['bytes'], download.name
        assert sha256(download.read_bytes()) == bundle['sha256'], download.name
        with zipfile.ZipFile(download) as archive:
            assert set(archive.namelist()) == {row['path'] for row in bundle['archive_members']}, download.name
            for row in bundle['members']:
                name = Path(row['path'])
                assert not name.is_absolute() and '..' not in name.parts, row['path']
                data = archive.read(row['path'])
                assert len(data) == row['bytes'] and sha256(data) == row['sha256'], row['path']
            assert archive.testzip() is None, download.name
        print(f"Verified {download.name}: {len(bundle['members'])} model files")
