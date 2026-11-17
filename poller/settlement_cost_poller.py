#!/usr/bin/env python3
"""
Park & Co Settlement Cost Navigator — Primary-Source Live Poller.
Verifies the 9 official state education, state revenue, Services Australia, and ATO FIRB
sources via live HTTP + SHA-256 content hashing and writes data/polling_status.json.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
STATUS_FILE = DATA_DIR / "polling_status.json"

AG_SRC = ROOT.parent / "src"
if str(AG_SRC) not in sys.path:
    sys.path.insert(0, str(AG_SRC))

from primary_source_poller_core import (  # noqa: E402
    fetch_live_source,
    now_aest_iso,
    secure_deploy_to_github_pages,
)

SOURCES = [
    {
        "id": "nsw_revenue_surcharge_duty",
        "authority_ko": "뉴사우스웨일스 주 세무청 · 교육청 (Revenue NSW & DE International)",
        "authority_en": "Revenue NSW & NSW Department of Education",
        "title_ko": "NSW 외국인 취득세 할증(9%) · 일반/프리미엄 취득세 및 TRP 학비 기준",
        "title_en": "NSW Surcharge Purchaser Duty (9%), Premium Property Duty & TRP Tuition",
        "url": "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty/surcharge-purchaser-duty/individuals",
    },
    {
        "id": "vic_study_school_fees",
        "authority_ko": "빅토리아 주 교육청 · 세무청 (Study Victoria & SRO VIC)",
        "authority_en": "Study Victoria (Department of Education) & SRO Victoria",
        "title_ko": "VIC 국제학생 동반자녀 학비 요금표 및 FPAD 8% 배우자 실거주 면제",
        "title_en": "Victoria International Student Program School Fees & FPAD 8% Rules",
        "url": "https://www.study.vic.gov.au/en/international-student-program/support-and-payments/school-fees",
    },
    {
        "id": "qld_qro_afad_duty",
        "authority_ko": "퀸즐랜드 주 세무청 · 교육청 (Queensland Revenue Office & EQI)",
        "authority_en": "Queensland Revenue Office (QRO) & Education Queensland International",
        "title_ko": "QLD 외국인 추가 취득세(AFAD 8%) 계약일 기준 및 EQI 동반자녀 학비",
        "title_en": "QLD Additional Foreign Acquirer Duty (AFAD 8%) & EQI Tuition Schedule",
        "url": "https://qro.qld.gov.au/duties/investors/afad/",
    },
    {
        "id": "wa_tiwa_school_fees",
        "authority_ko": "서호주 주정부 교육·훈련청 (TIWA & WA Education)",
        "authority_en": "TAFE International Western Australia (TIWA) & WA Dept of Education",
        "title_ko": "WA 482 가구당 연 $4,000 학비 상한(유치원 면제 · $90,000 이하 감면) 및 500 학비",
        "title_en": "WA Government School Fees (482 $4,000 Family Cap, <=$90k Hardship Waiver & 500 Rates)",
        "url": "https://www.tafeinternational.wa.edu.au/wa-government-schools/school-fees-charges",
    },
    {
        "id": "sa_edu_482_fees",
        "authority_ko": "남호주 교육청 · 세무청 (SA Department for Education & RevenueSA)",
        "authority_en": "SA Department for Education & RevenueSA",
        "title_ko": "SA 482·485 소득연동($78,000 이하 면제) 공립학비 및 외국인 취득세 할증(7%)",
        "title_en": "SA Subclass 482/485 Means-Tested School Fees & Foreign Ownership Surcharge (7%)",
        "url": "https://www.education.sa.gov.au/parents-and-families/enrol-school-or-preschool/families-482-visas/student-fees-enrolment",
    },
    {
        "id": "tas_study_trp",
        "authority_ko": "태즈메이니아 교육청 · 세무청 (Study Tasmania & SRO TAS)",
        "authority_en": "Study Tasmania & Tasmanian State Revenue Office",
        "title_ko": "TAS 임시거주자 프로그램(TRP 50% 감면 $3,800) 및 FIDS 8% 할증",
        "title_en": "Tasmania Temporary Resident Program (TRP) Fees & 8% FIDS Surcharge",
        "url": "https://study.tas.gov.au/study/trp/",
    },
    {
        "id": "act_nt_dependant_education",
        "authority_ko": "호주수도준주 · 노던준주 교육청 (ACT Education & NT Education)",
        "authority_en": "ACT Education Directorate (IEU) & NT Department of Education",
        "title_ko": "ACT 동반자녀 학비 면제 심사(IEU) · 연 0.75% 토지세 및 NT 공립학비 요강",
        "title_en": "ACT Dependant Enrolment & Fee Waiver Rules + NT Government School Fees",
        "url": "https://www.act.gov.au/education-and-training/international-students-and-temporary-visa-holders/enrol-a-child-dependant-of-a-temporary-resident",
    },
    {
        "id": "services_au_medicare_narwp",
        "authority_ko": "호주 서비스청 (Services Australia)",
        "authority_en": "Services Australia",
        "title_ko": "비자별 메디케어 가입 자격(491·494·820/309·영주권) 및 신규거주자 대기기간(NARWP)",
        "title_en": "Enrolling in Medicare & Newly Arrived Resident's Waiting Period (NARWP)",
        "url": "https://www.servicesaustralia.gov.au/enrolling-medicare",
    },
    {
        "id": "ato_firb_residential_fees",
        "authority_ko": "호주 국세청 · 외국인투자심의위원회 (ATO & Treasury FIRB)",
        "authority_en": "Australian Taxation Office (ATO) & Foreign Investment Review Board",
        "title_ko": "FY2026–27 외국인 주거용 부동산 투자 신청 수수료(+$31,300/$1M 선형 구간) 및 기존주택 금지",
        "title_en": "ATO FY2026–27 Residential Foreign Investment Fees & 2025–2029 Established Dwelling Ban",
        "url": "https://www.ato.gov.au/individuals-and-families/investments-and-assets/foreign-resident-investments/foreign-investment-in-australia/fees-for-foreign-residential-investors",
    },
]


def run_poller(deploy: bool = False) -> dict[str, Any]:
    now_iso = now_aest_iso()
    today_str = now_iso[:10]
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    prev_map: dict[str, dict[str, Any]] = {}
    if STATUS_FILE.exists():
        try:
            prev_json = json.loads(STATUS_FILE.read_text(encoding="utf-8"))
            for item in prev_json.get("sources", []):
                if isinstance(item, dict) and item.get("id"):
                    prev_map[item["id"]] = item
        except Exception:
            prev_map = {}

    out_sources: list[dict[str, Any]] = []
    live_cnt = 0
    cached_cnt = 0
    failed_cnt = 0

    for src in SOURCES:
        res = fetch_live_source(src["url"])
        if res.get("status") == "verified_ok" and res.get("sha256"):
            live_cnt += 1
            out_sources.append({
                "id": src["id"],
                "authority_ko": src["authority_ko"],
                "authority_en": src["authority_en"],
                "title_ko": src["title_ko"],
                "title_en": src["title_en"],
                "url": src["url"],
                "status": "verified_ok",
                "http_status": res.get("http_status", 200),
                "bytes": res.get("bytes", 0),
                "sha256": res["sha256"],
                "sha256_prefix": res.get("sha256_prefix") or res["sha256"][:16],
                "method": res.get("method", "https-direct-live"),
                "dollars": res.get("dollars", []),
                "checked_at": now_iso,
            })
        elif src["id"] in prev_map and prev_map[src["id"]].get("sha256"):
            prev = prev_map[src["id"]]
            cached_cnt += 1
            out_sources.append({
                **prev,
                "status": "cached_last_good",
                "checked_at": now_iso,
            })
        else:
            failed_cnt += 1
            out_sources.append({
                "id": src["id"],
                "authority_ko": src["authority_ko"],
                "authority_en": src["authority_en"],
                "title_ko": src["title_ko"],
                "title_en": src["title_en"],
                "url": src["url"],
                "status": "degraded",
                "http_status": res.get("http_status", 0),
                "bytes": 0,
                "sha256": "",
                "sha256_prefix": "",
                "method": res.get("method", "failed"),
                "checked_at": now_iso,
            })

    overall_status = (
        "degraded" if failed_cnt > 0 else ("cached_fallback" if cached_cnt > 0 and live_cnt == 0 else "verified_ok")
    )
    payload = {
        "navigator": "parkco-settlement-cost-navigator",
        "status": overall_status,
        "last_polled_iso": now_iso,
        "last_polled_at": now_iso,
        "last_polled_date": today_str,
        "official_email": "enquiry@parkcolawyers.com",
        "total_sources": len(SOURCES),
        "verified_ok_count": live_cnt + cached_cnt,
        "live_verified_count": live_cnt,
        "live_verified_sources": live_cnt,
        "cached_last_good_count": cached_cnt,
        "failed_count": failed_cnt,
        "sources": out_sources,
    }
    STATUS_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"[settlement-cost-poller] {live_cnt}/{len(SOURCES)} live verified at {now_iso}")

    if deploy and (live_cnt + cached_cnt) > 0:
        secure_deploy_to_github_pages(
            dist_dir=ROOT,
            repo_name="parkco-settlement-cost-navigator",
            description="Park & Co Lawyers · Australian Visa School Fees, Medicare & Foreign Buyer Stamp Duty Navigator",
            commit_msg=f"Settlement Cost Navigator audit remediation & live primary-source sync ({today_str})",
        )
    return payload


def main() -> None:
    parser = argparse.ArgumentParser(description="Park & Co Settlement Cost Navigator Primary-Source Poller")
    parser.add_argument("--deploy", action="store_true", help="Commit & push updated bundle to GitHub Pages")
    args = parser.parse_args()
    run_poller(deploy=args.deploy)


if __name__ == "__main__":
    main()
