"""Fetch inventoried official assets into a private staging directory.

No question text is extracted, published, or sent to AI. This records acquisition
and PDF structure only; it does not certify completeness or answer correctness.
Run with Python 3 and pypdf. Existing downloaded bytes are reused and rechecked.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from datetime import datetime, timezone
import hashlib
import json
import argparse

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "sources"
CATALOG = "https://www.ceec.edu.tw/xmfile?quot=&xsmsid=0J052424829869345634"
PAPERS = {
    109: ("0k050359836694452838", "02-109學測英文試卷-定稿.pdf"),
    110: ("0l069608312283063557", "110學測英文試卷 .pdf"),
    111: ("0m053357638065462325", "02-111學測英文試卷.pdf"),
    112: ("0n045359274947649605", "02-112學測英文試卷.pdf"),
    113: ("0o051427482769341323", "02-113學測英文科定稿.pdf"),
    114: ("0p056425554473267580", "02-114學測英文試題.pdf"),
    115: ("0q054532302653501476", "02-115學測英文試卷.pdf"),
}

def ceec_url(folder, name):
    return "https://www.ceec.edu.tw/files/file_pool/1/" + folder + "/" + quote(name)

def asset(kind, url):
    return dict(kind=kind, original_url=url, acquisition_status="link_observed",
                downloaded_at=None, sha256=None, size_bytes=None, local_path=None,
                pdf_validation_status="pending", page_count=None,
                content_parsing_status="not_started", human_proofreading_status="not_started",
                rights_status="pending_scope_review", publish_ready=False)

def bundles():
    result = []
    for year in range(109, 116):
        for exam, subject, page in [
            ("GSAT", "ENG", CATALOG),
            ("TCTE", "COMMON-ENG", f"https://web1.tcte.edu.tw/EXAM/{year}_4y/"),
            ("TCTE", "SPECIALIST-ENG", f"https://web1.tcte.edu.tw/EXAM/{year}_4y/"),
            ("CAP", "ENG", f"https://cap.rcpet.edu.tw/exam/{year}/{year}exam.html"),
        ]:
            row = dict(bundle_id=f"TW-{exam}-{year}-MAIN-{subject}", exam=exam,
                       subject=subject, year_roc=year, year_ce=year+1911, session="main",
                       source_page=page, inventory_status="catalog_observed",
                       ingestion_status="not_started", expected_numbered_items=None,
                       verified_scoring_units=None, assets=[],
                       answer_key_status="pending_verification", reviewer_1=None,
                       reviewer_2=None, rights_status="pending_scope_review",
                       publish_ready=False, completeness_verified=False,
                       required_components=["question_paper", "final_answer_key", "scoring_rules", "errata_check"],
                       notes=[])
            if exam == "GSAT":
                row["assets"].append(asset("question_paper", ceec_url(*PAPERS[year])))
                row["required_components"] += ["nonchoice_rubric"]
                if year == 115:
                    row["assets"].append(asset("final_answer_key", ceec_url("0q040594609847120321", "02-115學測英文答案.pdf")))
                    row["assets"].append(asset("nonchoice_rubric", ceec_url("0q054335046832331817", "115學測英文考科非選擇題參考答案與評分原則.pdf")))
            if exam == "CAP":
                row["required_components"].append("annual_grade_thresholds")
                if year == 109:
                    row["listening_status"] = "not_administered"
                    row["notes"].append("109 年英聽取消；不是缺少音檔。補考另列待查，不含於 28 個 main 包。")
                else:
                    row["listening_status"] = "assets_pending"
                    row["required_components"] += ["listening_booklet", "official_audio"]
                if year == 110:
                    row["notes"].append("110 年有聽力；補考另列待查。")
            result.append(row)
    return result

def fetch_pdf(row, a):
    target = OUT / "private" / row["bundle_id"] / (a["kind"] + ".pdf")
    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        if not target.exists():
            req = Request(a["original_url"], headers={"User-Agent": "EnglishLearningSourceAudit/1.0"})
            with urlopen(req, timeout=45) as response:
                content = response.read(30 * 1024 * 1024 + 1)
                if len(content) > 30 * 1024 * 1024:
                    raise ValueError("Asset exceeds 30 MiB limit")
                if not content.startswith(b"%PDF-"):
                    raise ValueError("Response is not a PDF (signature mismatch)")
                a["resolved_url"] = response.url
                a["http_content_type"] = response.headers.get("Content-Type")
            target.write_bytes(content)
        content = target.read_bytes()
        if not content.startswith(b"%PDF-"):
            raise ValueError("Existing file does not have a PDF signature")
        a.update(acquisition_status="downloaded", downloaded_at=datetime.fromtimestamp(target.stat().st_mtime, timezone.utc).isoformat(),
                 sha256=hashlib.sha256(content).hexdigest(), size_bytes=len(content),
                 local_path=target.relative_to(ROOT).as_posix())
        try:
            from pypdf import PdfReader
            reader = PdfReader(target)
            a["page_count"] = len(reader.pages)
            a["pdf_validation_status"] = "structure_readable"
            a["pdf_encrypted"] = reader.is_encrypted
        except Exception as exc:
            a["pdf_validation_status"] = "validation_failed"
            a["validation_error"] = str(exc)
    except Exception as exc:
        a["acquisition_status"] = "download_failed"
        a["error"] = str(exc)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--download", action="store_true", help="Acquire inventoried CEEC PDFs; otherwise manifest only")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    rows = bundles()
    destination = OUT / "manifest.json"
    if destination.exists():
        if not args.download:
            raise SystemExit("Existing manifest retained. Use --download to update acquisition evidence.")
        previous = json.loads(destination.read_text(encoding="utf-8"))
        old_rows = {r["bundle_id"]: r for r in previous["bundles"]}
        for row in rows:
            old = old_rows.get(row["bundle_id"])
            if old:
                old_assets = {a["original_url"]: a for a in old["assets"]}
                new_assets = [old_assets.get(a["original_url"], a) for a in row["assets"]]
                seen = {a["original_url"] for a in new_assets}
                new_assets += [a for a in old["assets"] if a["original_url"] not in seen]
                row.update(old)
                row["assets"] = new_assets
    if args.download:
        for row in rows:
            for a in row["assets"]:
                fetch_pdf(row, a)
                print(row["bundle_id"], a["kind"], a["acquisition_status"], a["page_count"])
            if any(a["acquisition_status"] == "downloaded" for a in row["assets"]):
                row["ingestion_status"] = "partial_assets_acquired"
    manifest = dict(schema_version="1.0", generated_at=datetime.now(timezone.utc).isoformat(),
                    scope_years_roc=[109,115], target_bundle_count=28,
                    scope_note="Main annual subject bundles only; supplementary and accessible forms need separate inventory.",
                    public_question_text_included=False, bundles=rows)
    # Atomic replacement preserves a usable previous manifest if interrupted.
    pending = OUT / "manifest.json.tmp"
    pending.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    pending.replace(destination)
    print("Manifest:", destination)

if __name__ == "__main__":
    main()
