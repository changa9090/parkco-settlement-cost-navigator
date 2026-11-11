#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprehensive test suite for Park & Co Settlement Cost Navigator."""
from __future__ import annotations

import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SERVICE_FILE = Path("/home/cp/.config/systemd/user/settlement-cost-preview.service")
HANGUL_RE = re.compile(r"[가-힣ㄱ-ㅎㅏ-ㅣ]")


def test_counter_v3_and_zero_abacus():
    counter_js = (ROOT / "counter.js").read_text(encoding="utf-8")
    style_css = (ROOT / "style.css").read_text(encoding="utf-8")
    index_html = (ROOT / "index.html").read_text(encoding="utf-8")

    assert "https://faq.immispecialist.com/vc/" in counter_js
    assert "var BASE_P = 'settlement-cost';" in counter_js
    assert "abacus.jasoncameron.dev" not in counter_js
    assert "abacus.jasoncameron.dev" not in index_html
    assert ".visit-counter:not([hidden]) { display: flex !important;" in style_css


def test_editorial_email_and_seo():
    for fn in ("index.html", "app.js", "counter.js", "style.css"):
        txt = (ROOT / fn).read_text(encoding="utf-8")
        assert "cpark@parkcolawyers.com" not in txt
        assert "내무부" not in txt
        assert "가정법" not in txt

    index_html = (ROOT / "index.html").read_text(encoding="utf-8")
    assert "mailto:enquiry@parkcolawyers.com" in index_html
    assert (ROOT / "robots.txt").is_file()
    assert (ROOT / "sitemap.xml").is_file()
    assert "https://changa9090.github.io/parkco-settlement-cost-navigator/sitemap.xml" in (ROOT / "robots.txt").read_text(encoding="utf-8")


def test_systemd_preview_service_updated():
    svc = SERVICE_FILE.read_text(encoding="utf-8")
    assert "WorkingDirectory=/home/cp/ag/parkco-settlement-cost-navigator" in svc
    assert "--directory /home/cp/ag/parkco-settlement-cost-navigator" in svc
    assert "/home/cp/grok/RESEARCH/settlement-cost-preview" not in svc


def test_en_mode_zero_hangul_in_html_and_options():
    """Verify every [data-ko][data-en] element and <option> switches cleanly to English with zero Hangul."""
    html_txt = (ROOT / "index.html").read_text(encoding="utf-8")

    class EnSimulator(HTMLParser):
        def __init__(self):
            super().__init__()
            self.skip_depth = 0
            self.override_stack = []
            self.leaks = []

        def handle_starttag(self, tag, attrs):
            ad = dict(attrs)
            if tag in ("script", "style", "title"):
                self.skip_depth += 1
                return
            if "data-en" in ad and "data-ko" in ad:
                en_val = ad["data-en"]
                if HANGUL_RE.search(en_val):
                    self.leaks.append(f"attr data-en on <{tag}> has Hangul: {en_val}")
                self.override_stack.append(True)
            else:
                self.override_stack.append(False)

        def handle_endtag(self, tag):
            if tag in ("script", "style", "title"):
                self.skip_depth = max(0, self.skip_depth - 1)
                return
            if self.override_stack:
                self.override_stack.pop()

        def handle_data(self, data):
            if self.skip_depth > 0:
                return
            if any(self.override_stack):
                return
            # #visit-counter labels are translated by counter.js syncCounterLang()
            s = data.strip()
            if s in ("누적 방문", "오늘 방문", "방문자"):
                return
            if HANGUL_RE.search(s):
                self.leaks.append(f"untranslated text node: {s}")

    sim = EnSimulator()
    sim.feed(html_txt)
    assert not sim.leaks, f"Found Hangul leaks in EN mode: {sim.leaks}"


def test_js_engine_per_mid_concessions_and_property_duty():
    node_script = """
    const calc = require('./app.js');

    // 1. Middle school (perMid, Years 7-10) calculation bug fix
    const vicMid = calc.calcFamilyBreakdown('500', 'VIC', { primary: 0, mid: 1, senior: 0 }, 'mid', 'he', {});
    const vicPri = calc.calcFamilyBreakdown('500', 'VIC', { primary: 1, mid: 0, senior: 0 }, 'primary', 'he', {});
    if (vicMid.tuition !== 17493 || vicPri.tuition !== 14450) {
      throw new Error('VIC perMid mismatch: ' + JSON.stringify({ vicMid, vicPri }));
    }

    const waMid = calc.calcFamilyBreakdown('500', 'WA', { primary: 1, mid: 1, senior: 1 }, 'mid', 'he', {});
    if (waMid.tuition !== (14575 + 17286 + 18980)) {
      throw new Error('WA 3-child sum mismatch: ' + JSON.stringify(waMid));
    }

    // 2. $0 tuition vs $150/$290 admin fee clarity
    const nsw820 = calc.getSchoolRule('820', 'NSW', 'primary', 'he', {});
    if (nsw820.perPrimary !== 0 || nsw820.appFee !== 150 || !nsw820.badgeEn.includes('150')) {
      throw new Error('NSW 820 badge clarity failed: ' + JSON.stringify(nsw820));
    }
    const nsw500Phd = calc.getSchoolRule('500', 'NSW', 'primary', 'research', {});
    if (nsw500Phd.perPrimary !== 0 || nsw500Phd.appFee !== 290 || !nsw500Phd.badgeEn.includes('290')) {
      throw new Error('NSW 500 PhD $290 badge clarity failed: ' + JSON.stringify(nsw500Phd));
    }

    // 3. WA Kindergarten exemption note & Kinder-only $0 cap
    const waKinder = calc.getSchoolRule('482', 'WA', 'kinder', 'he', {});
    if (waKinder.familyCap !== 0 || !waKinder.detailEn.includes('Kindergarten')) {
      throw new Error('WA Kindergarten rule failed: ' + JSON.stringify(waKinder));
    }

    // 4. SA 482/485 means-tested toggle & ACT 485/bridging waiver toggle
    const sa485Std = calc.getSchoolRule('485', 'SA', 'mid', 'he', { saConcession: false });
    const sa485Conc = calc.getSchoolRule('485', 'SA', 'mid', 'he', { saConcession: true });
    if (sa485Std.perMid !== 8200 || sa485Conc.perMid !== 0) {
      throw new Error('SA 485 concession toggle failed: ' + JSON.stringify({ sa485Std, sa485Conc }));
    }

    const act485Std = calc.getSchoolRule('485', 'ACT', 'mid', 'he', { actWaiver: false });
    const act485Waive = calc.getSchoolRule('485', 'ACT', 'mid', 'he', { actWaiver: true });
    if (act485Std.perMid !== 14500 || act485Waive.perMid !== 0 || act485Waive.appFee !== 265) {
      throw new Error('ACT 485 waiver toggle failed: ' + JSON.stringify({ act485Std, act485Waive }));
    }

    // 5. Property Transfer Duty + AFAD (7%-9%) + FIRB Tier Calculator
    const qld850k = calc.calcPropertyComparison({
      price: 850000,
      state: 'QLD',
      dwelling: 'new',
      purpose: 'oo',
      ownership: 'sole',
      tempVisa: '482'
    });
    // QLD Home Concession on $850k: $10,150 + (($850k - $540k)/100)*4.5 = $10,150 + $13,950 = $24,100
    // QLD AFAD 8% on $850k = $68,000; FIRB ($75k-$1M new) = $15,600 => extraPenalty = $83,600
    if (qld850k.baseDutyPR !== 24100 || qld850k.surchargeAmt !== 68000 || qld850k.firb.fee !== 15600 || qld850k.extraPenalty !== 83600) {
      throw new Error('QLD $850k property calc mismatch: ' + JSON.stringify(qld850k));
    }

    const nsw1500kEst = calc.calcPropertyComparison({
      price: 1500000,
      state: 'NSW',
      dwelling: 'established',
      purpose: 'oo',
      ownership: 'sole',
      tempVisa: '482'
    });
    // NSW 9% surcharge = $135,000; Established FIRB banned = true, tripled $31,300 * 3 = $93,900
    if (nsw1500kEst.surchargeAmt !== 135000 || !nsw1500kEst.firb.banned || nsw1500kEst.firb.fee !== 93900) {
      throw new Error('NSW $1.5M established mismatch: ' + JSON.stringify(nsw1500kEst));
    }

    const vicSpouseJoint = calc.calcPropertyComparison({
      price: 900000,
      state: 'VIC',
      dwelling: 'established',
      purpose: 'oo',
      ownership: 'spouse50',
      tempVisa: '820'
    });
    // Joint Tenants with Citizen/PR spouse: FIRB reg 38(3) exempt ($0) + VIC spouse residence surcharge exempt ($0)
    if (vicSpouseJoint.firb.fee !== 0 || !vicSpouseJoint.firb.exempt || vicSpouseJoint.surchargeAmt !== 0) {
      throw new Error('VIC spouse50 exemption mismatch: ' + JSON.stringify(vicSpouseJoint));
    }

    console.log(JSON.stringify({ ok: true }));
    """
    res = subprocess.run(
        ["node", "-e", node_script],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        check=True,
    )
    assert json.loads(res.stdout.strip())["ok"] is True
