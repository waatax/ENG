"""Check source manifest scope and downloaded asset integrity; not content QA."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "data/sources/manifest.json").read_text(encoding="utf-8"))
rows = manifest["bundles"]
assert len(rows) == 28
assert len({r["bundle_id"] for r in rows}) == 28
assert {r["year_roc"] for r in rows} == set(range(109,116))
assert all(sum(r["year_roc"] == y for r in rows) == 4 for y in range(109,116))
verified = 0
for row in rows:
    for asset in row["assets"]:
        if asset["acquisition_status"] != "downloaded":
            continue
        path = (root / asset["local_path"]).resolve()
        assert path.is_relative_to((root / "data/sources/private").resolve()), "Asset escapes private staging"
        content = path.read_bytes()
        assert content.startswith(b"%PDF-")
        assert len(content) == asset["size_bytes"]
        assert hashlib.sha256(content).hexdigest() == asset["sha256"]
        if asset["rights_status"] != "approved":
            assert not asset["publish_ready"]
        verified += 1
cap109 = next(r for r in rows if r["bundle_id"] == "TW-CAP-109-MAIN-ENG")
assert cap109["listening_status"] == "not_administered"
assert "official_audio" not in cap109["required_components"]
print(f"PASS: 28 unique annual bundles; {verified} PDF assets match recorded SHA-256 and size; CAP109 exception retained.")
