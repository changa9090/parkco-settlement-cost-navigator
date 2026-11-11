/* Park & Co Lawyers — Settlement Cost Navigator Interactive Engine (KO/EN, v12) */
(function (root) {
  'use strict';

  var STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
  var STATE_NAMES = {
    NSW: { ko: '뉴사우스웨일스 (NSW)', en: 'New South Wales (NSW)' },
    VIC: { ko: '빅토리아 (VIC)', en: 'Victoria (VIC)' },
    QLD: { ko: '퀸즐랜드 (QLD)', en: 'Queensland (QLD)' },
    WA: { ko: '서호주 (WA)', en: 'Western Australia (WA)' },
    SA: { ko: '남호주 (SA)', en: 'South Australia (SA)' },
    TAS: { ko: '태즈메이니아 (TAS)', en: 'Tasmania (TAS)' },
    ACT: { ko: '호주수도준주 (ACT)', en: 'ACT (Canberra)' },
    NT: { ko: '노던준주 (NT)', en: 'Northern Territory (NT)' }
  };

  var VISAS = {
    '482': {
      ko: '482 (고용주 스폰서 SID/TSS)',
      en: 'Subclass 482 (Skills in Demand)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (국제학생 등록금 적용)',
      uniEn: 'Not eligible for CSP/HELP (international tuition)',
      medKo: '일반 비대상 (상호의료협정국 또는 영주권 신청 시 예외)',
      medEn: 'Generally ineligible (unless RHCA or PR applied)',
      payKo: '대상 아님 (영주권 취득 후 208주 대기기간 기산)',
      payEn: 'Not eligible (208-week NARWP starts only after PR)',
      stampRate: { NSW: '+9%', VIC: '+8%', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음 (연 0.75% 토지세 별도)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% surcharge', VIC: '+8% surcharge', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty (+0.75% p.a. land tax)', NT: '0% surcharge' }
    },
    '485': {
      ko: '485 (졸업생 임시 비자)',
      en: 'Subclass 485 (Temporary Graduate)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (국제학생 등록금 적용)',
      uniEn: 'Not eligible for CSP/HELP (international tuition)',
      medKo: '일반 비대상 (상호의료협정국 또는 영주권 신청 시 예외)',
      medEn: 'Generally ineligible (unless RHCA or PR applied)',
      payKo: '대상 아님 (영주권 취득 후 208주 대기기간 기산)',
      payEn: 'Not eligible (208-week NARWP starts only after PR)',
      stampRate: { NSW: '+9%', VIC: '+8%', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음 (연 0.75% 토지세 별도)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% surcharge', VIC: '+8% surcharge', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty (+0.75% p.a. land tax)', NT: '0% surcharge' }
    },
    '491': {
      ko: '491 (지방 기술이민 임시)',
      en: 'Subclass 491 (Skilled Work Regional)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (국제학생 등록금 적용)',
      uniEn: 'Not eligible for CSP/HELP (international tuition)',
      medKo: '가입 가능 (장관 명령 지정 임시비자 대상)',
      medEn: 'Eligible under Ministerial Order',
      payKo: '실업급여 비대상 (영주 전환 후 대기기간 기산)',
      payEn: 'JobSeeker ineligible until PR & waiting period',
      stampRate: { NSW: '+9%', VIC: '+8%', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음 (연 0.75% 토지세 별도)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% surcharge', VIC: '+8% surcharge', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty (+0.75% p.a. land tax)', NT: '0% surcharge' }
    },
    '494': {
      ko: '494 (지방 고용주 스폰서)',
      en: 'Subclass 494 (Employer Sponsored Regional)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (국제학생 등록금 적용)',
      uniEn: 'Not eligible for CSP/HELP (international tuition)',
      medKo: '가입 가능 (장관 명령 지정 임시비자 대상)',
      medEn: 'Eligible under Ministerial Order',
      payKo: '실업급여 비대상 (영주 전환 후 대기기간 기산)',
      payEn: 'JobSeeker ineligible until PR & waiting period',
      stampRate: { NSW: '+9%', VIC: '+8%', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음 (연 0.75% 토지세 별도)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% surcharge', VIC: '+8% surcharge', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty (+0.75% p.a. land tax)', NT: '0% surcharge' }
    },
    '500': {
      ko: '500 (학생 비자 · 동반 자녀)',
      en: 'Subclass 500 (Student Dependant)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (국제학생 전액 등록금)',
      uniEn: 'Not eligible for CSP/HELP (international tuition)',
      medKo: '비대상 (OSHC 유학생 건강보험 의무 가입)',
      medEn: 'Ineligible (OSHC mandatory)',
      payKo: '대상 아님 (임시 학생비자)',
      payEn: 'Not eligible (Temporary Student Visa)',
      stampRate: { NSW: '+9%', VIC: '+8%', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음 (연 0.75% 토지세 별도)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% surcharge', VIC: '+8% surcharge', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty (+0.75% p.a. land tax)', NT: '0% surcharge' }
    },
    '820': {
      ko: '820 · 309 (파트너 임시 비자)',
      en: 'Subclass 820 / 309 (Partner Temporary)',
      isPR: false,
      uniKo: 'CSP·HELP 비대상 (801/100 영주 승인 전까지 임시 기준)',
      uniEn: 'Not eligible for CSP/HELP until 801/100 PR grant',
      medKo: '가입 가능 (820/801 · 309/100 영주 결합 신청일 또는 입국일 기준)',
      medEn: 'Eligible from combined PR application / arrival date',
      payKo: '일부 급여 대기 기산 (FTB Part A 1년 · 유급육아휴직 2년 등)',
      payEn: 'Partial eligibility after waiting period (FTB-A 1y, PLP 2y)',
      stampRate: { NSW: '+9% (200일 실거주 시 면제 가능)', VIC: '+8% (시민·영주 배우자 공동구매 실거주 시 면제 가능)', QLD: '+8%', WA: '+7%', SA: '+7%', TAS: '+8%', ACT: '취득세 할증 없음', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '+9% (200-day residence exemption available)', VIC: '+8% (Spouse joint residence exemption available)', QLD: '+8% surcharge', WA: '+7% surcharge', SA: '+7% surcharge', TAS: '+8% surcharge', ACT: '0% duty', NT: '0% surcharge' }
    },
    '189': {
      ko: '189 · 190 · 186 (영주권 PR)',
      en: 'Subclass 189 / 190 / 186 (Permanent Resident)',
      isPR: true,
      uniKo: 'CSP 정부보조 학석 대상 (연 $4,738~$17,399 · 일반학위 HELP 대출은 시민권부터)',
      uniEn: 'CSP eligible ($4,738–$17,399/yr; HECS-HELP requires citizenship)',
      medKo: '영주권자 정식 메디케어 가입 대상',
      medEn: 'Full Medicare enrolment eligible',
      payKo: '신규 거주자 대기기간 적용 (JobSeeker 4년/208주 · FTB-A 1년 · CCS 대기 없음)',
      payEn: 'NARWP applies (JobSeeker 4y/208w; CCS 0w)',
      stampRate: { NSW: '할증 면제 (200일 거주 요건 확인)', VIC: '할증 없음 (0%)', QLD: '할증 없음 (0% · 홈 콘세션 가능)', WA: '할증 없음 (0%)', SA: '할증 없음 (0%)', TAS: '할증 없음 (0%)', ACT: '할증 없음 (0%)', NT: '할증 없음 (0%)' },
      stampRateEn: { NSW: '0% (subject to 200-day residence)', VIC: '0% surcharge', QLD: '0% surcharge', WA: '0% surcharge', SA: '0% surcharge', TAS: '0% surcharge', ACT: '0% surcharge', NT: '0% surcharge' }
    }
  };

  function getSchoolRule(visa, stateCode, stage, course, opts) {
    var options = opts || {};
    var saConc = !!options.saConcession;
    var actWaive = !!options.actWaiver;

    if (visa === '189') {
      return {
        tone: 'ok',
        badgeKo: '수업료 면제 ($0)',
        badgeEn: 'Tuition Exempt ($0)',
        detailKo: '일반 내국인 공립학교 입학 기준이 적용됩니다 (학교별 자율 분담금 별도).',
        detailEn: 'Domestic public school enrolment applies (voluntary school contributions separate).',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
      };
    }

    if ((visa === '482' || visa === '485') && stateCode === 'NSW') {
      var amt = stage === 'senior' ? 7600 : 6400;
      return {
        tone: 'fee',
        badgeKo: '연 $' + amt.toLocaleString('en-AU') + ' (+신청비 $150)',
        badgeEn: 'A$' + amt.toLocaleString('en-AU') + '/yr (+A$150 app fee)',
        detailKo: '2026년 NSW TRP 기준 초등·7–10학년 연 $6,400 · 11–12학년 연 $7,600 및 입학권한 신청비 $150 부과 (482 지정 지방 거주 시 수업료 면제 가능).',
        detailEn: '2026 NSW TRP rate: Primary & Yr 7–10 A$6,400, Yr 11–12 A$7,600 + A$150 TRP application fee (482 regional exemption available).',
        perPrimary: 6400, perMid: 6400, perSenior: 7600, appFee: 150, familyCap: null, saSiblingDiscount: false
      };
    }

    if ((visa === '491' || visa === '494' || visa === '820') && stateCode === 'NSW') {
      return {
        tone: 'ok',
        badgeKo: '수업료 $0 (입학신청비 $150 별도)',
        badgeEn: 'Tuition $0 (+A$150 app fee)',
        detailKo: 'NSW 임시거주자 프로그램(TRP) 수업료($0) 면제 대상이나 입학 권한(Authority to Enrol) 행정 신청비 $150은 별도 부과됩니다.',
        detailEn: 'Exempt from NSW TRP annual tuition ($0), subject to the one-off A$150 Authority to Enrol processing fee.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 150, familyCap: null, saSiblingDiscount: false
      };
    }

    if (visa === '500' && stateCode === 'NSW') {
      if (course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '박사 수업료 $0 (행정비 $290 별도)',
          badgeEn: 'PhD Tuition $0 (+A$290 admin fee)',
          detailKo: 'NSW 대학 박사과정 재학 중(별도 학비 장학금 미수혜)인 부모의 동반 자녀는 수업료($0)가 면제되며 DE International 행정 신청비 $290만 부과됩니다.',
          detailEn: 'Annual tuition ($0) waived for eligible NSW PhD research parents; one-off A$290 DE International dependant processing fee applies.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 290, familyCap: null, saSiblingDiscount: false
        };
      }
      var isEli = course === 'elicos';
      var pAmt = isEli ? 11200 : 7800;
      var mAmt = isEli ? 12600 : 7800;
      var sAmt = isEli ? 14200 : 9000;
      var cur = stage === 'senior' ? sAmt : (stage === 'mid' ? mAmt : pAmt);
      return {
        tone: 'danger',
        badgeKo: '연 $' + cur.toLocaleString('en-AU') + ' (+행정비 $290)',
        badgeEn: 'A$' + cur.toLocaleString('en-AU') + '/yr (+A$290 fee)',
        detailKo: isEli
          ? '2026년 어학·VET·비학위 부모 기준: 초등 $11,200 · 중등(7–10학년) $12,600 · 고등(11–12학년) $14,200 (행정 신청비 $290 별도).'
          : '2026년 고등교육 학위 부모 기준: 초등·중등(7–10학년) $7,800 · 고등(11–12학년) $9,000 (행정 신청비 $290 별도).',
        detailEn: isEli
          ? '2026 ELICOS/VET parent rate: Primary A$11,200, Yr 7–10 A$12,600, Yr 11–12 A$14,200 (+A$290 admin fee).'
          : '2026 Higher Ed parent rate: Primary & Yr 7–10 A$7,800, Yr 11–12 A$9,000 (+A$290 admin fee).',
        perPrimary: pAmt, perMid: mAmt, perSenior: sAmt, appFee: 290, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'VIC') {
      if (visa !== '500' || course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: visa === '500'
            ? '빅토리아 대학 연구 석사·박사 과정 부모의 동반 자녀는 국제학생 수업료가 면제됩니다.'
            : '빅토리아 국제학생 프로그램 수업료 부과 대상이 아닙니다.',
          detailEn: 'Exempt from Victoria International Student Program tuition fees.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
        };
      }
      var vicCur = stage === 'senior' ? 19635 : (stage === 'mid' ? 17493 : 14450);
      return {
        tone: 'danger',
        badgeKo: '연 $' + vicCur.toLocaleString('en-AU') + ' (2027 공시표)',
        badgeEn: 'A$' + vicCur.toLocaleString('en-AU') + '/yr (2027 schedule)',
        detailKo: 'VIC 공개 동반자녀 요금표(School Fees 2027): 초등 $14,450 · 중등(7–10학년) $17,493 · 고등(11–12학년) $19,635.',
        detailEn: 'Published VIC Dependant Fee Schedule (2027): Primary A$14,450, Yr 7–10 A$17,493, Yr 11–12 A$19,635.',
        perPrimary: 14450, perMid: 17493, perSenior: 19635, appFee: 0, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'QLD') {
      if (visa !== '500') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: '퀸즐랜드 교육청 기준 국제학생 수업료 및 입학 신청비가 부과되지 않습니다.',
          detailEn: 'Exempt from EQI temporary resident tuition and application fees in Queensland.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
        };
      }
      if (course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '박사(AQF 10) 면제 ($0)',
          badgeEn: 'PhD (AQF 10) Exempt ($0)',
          detailKo: '퀸즐랜드 대학 박사과정(AQF 10) 또는 지정 교육구 외 연구석사 조건 충족 시 면제됩니다.',
          detailEn: 'Exempt for QLD PhD (AQF 10) parents and eligible regional Masters by Research.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
        };
      }
      var qldP = 314 * 40, qldM = 330 * 40, qldS = 390 * 40;
      var qldCur = stage === 'senior' ? qldS : (stage === 'mid' ? qldM : qldP);
      return {
        tone: 'danger',
        badgeKo: '연 약 $' + qldCur.toLocaleString('en-AU') + ' (+신청비 $305)',
        badgeEn: '~A$' + qldCur.toLocaleString('en-AU') + '/yr (+A$305 fee)',
        detailKo: '2026년 EQI 동반자녀 40주 학기 환산: 초등 약 $12,560 · 중등(7–10학년) 약 $13,200 · 고등(11–12학년) 약 $15,600 및 신청비 $305 부과.',
        detailEn: '2026 EQI 40-week dependant tuition: Primary ~A$12,560, Yr 7–10 ~A$13,200, Yr 11–12 ~A$15,600 + A$305 application fee.',
        perPrimary: qldP, perMid: qldM, perSenior: qldS, appFee: 305, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'WA') {
      if (visa === '482') {
        var isKinderOnly = (stage === 'kinder');
        return {
          tone: isKinderOnly ? 'ok' : 'fee',
          badgeKo: isKinderOnly ? '유치원 단독 재학 면제 ($0) · P–12 가구 $4,000' : '가구당 연 $4,000 상한 (유치원 단독 시 $0)',
          badgeEn: isKinderOnly ? 'Kinder-Only Exempt ($0) · P–12 A$4,000/family' : 'A$4,000/yr Family Cap (Kinder-only $0)',
          detailKo: '서호주 482 특별 규정: 첫째·단독 자녀가 유치원(Kindergarten)만 재학하는 해에는 $4,000 학비가 전액 면제($0)되며 Pre-primary~12학년 재학 시 자녀 수와 무관하게 가구당 연 $4,000 상한이 적용됩니다.',
          detailEn: 'WA 482 rule: Exempt ($0) if the eldest/only enrolled child is in Kindergarten; once any child enrols in Pre-primary to Year 12, a flat A$4,000 per family/year cap applies regardless of child count.',
          perPrimary: 4000, perMid: 4000, perSenior: 4000, appFee: 0, familyCap: isKinderOnly ? 0 : 4000, saSiblingDiscount: false
        };
      }
      if (visa === '500') {
        if (course === 'research') {
          return {
            tone: 'ok',
            badgeKo: '연구 석사·박사 면제 ($0)',
            badgeEn: 'Research Masters/PhD Exempt ($0)',
            detailKo: '인정된 서호주 대학 박사·연구석사 재학 부모의 동반 자녀는 면제됩니다 (수업석사 면제는 2027년부터 종료).',
            detailEn: 'Exempt for recognized WA PhD and Masters by Research parents (coursework Masters exemption ends Jan 2027).',
            perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
          };
        }
        var waCur = stage === 'senior' ? 18980 : (stage === 'mid' ? 17286 : 14575);
        return {
          tone: 'danger',
          badgeKo: '연 $' + waCur.toLocaleString('en-AU') + ' (TIWA 공시)',
          badgeEn: 'A$' + waCur.toLocaleString('en-AU') + '/yr (TIWA rate)',
          detailKo: '초등 $14,575 · 중등(7–10학년) $17,286 · 고등(11–12학년) $18,980 (WA 교육부·TIWA 공시 요금표).',
          detailEn: 'Primary A$14,575, Yr 7–10 A$17,286, Yr 11–12 A$18,980 per TIWA / WA Education schedule.',
          perPrimary: 14575, perMid: 17286, perSenior: 18980, appFee: 0, familyCap: null, saSiblingDiscount: false
        };
      }
      return {
        tone: 'ok',
        badgeKo: '일반 입학 적용 ($4,000 가구학비 비대상)',
        badgeEn: 'Local Enrolment (Outside A$4,000 482 Fee)',
        detailKo: '482 가구당 $4,000 부과 대상이 아니며 일반 공립학교 입학 안내를 따릅니다 (학교별 확인 권장).',
        detailEn: 'Not subject to the Subclass 482 A$4,000 family tuition fee; standard school enrolment applies.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'SA') {
      if (visa === '482' || visa === '485') {
        if (saConc) {
          return {
            tone: 'ok',
            badgeKo: '소득연동·지방학교 면제 적용 ($0)',
            badgeEn: 'Exempt ($0 · Means-Tested / Regional)',
            detailKo: 'SA 소득연동 감면(가구 세전소득 $78,000 이하) 또는 SA 지정 지방 공립학교 재학 면제가 적용되어 수업료가 $0으로 계산되었습니다.',
            detailEn: 'SA means-tested waiver (gross family income <= A$78,000) or designated regional SA school exemption applied ($0 tuition).',
            perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
          };
        }
        var saCap = (stage === 'primary' || stage === 'kinder') ? 7000 : 8200;
        return {
          tone: 'fee',
          badgeKo: '소득연동 (상한 연 $' + saCap.toLocaleString('en-AU') + ')',
          badgeEn: 'Means-Tested (Cap A$' + saCap.toLocaleString('en-AU') + ')',
          detailKo: '광역 애들레이드 482·485 기준: 가구 세전소득 $78,000 이하 또는 지방 학교 입학 시 면제(상단 토글 선택 가능)되며 상한은 초등 $7,000 · 중고등(7–12학년) $8,200(둘째 자녀부터 10% 감면)입니다.',
          detailEn: 'Greater Adelaide 482/485 means-tested rate: Exempt if gross family income <= A$78,000 or regional SA school (use toggle above); max cap Primary A$7,000 / Yr 7–12 A$8,200 (10% sibling discount from 2nd child).',
          perPrimary: 7000, perMid: 8200, perSenior: 8200, appFee: 0, familyCap: null, saSiblingDiscount: true
        };
      }
      if (visa === '500') {
        var sa500 = (stage === 'primary' || stage === 'kinder') ? 7120 : 8400;
        return {
          tone: 'danger',
          badgeKo: '연 $' + sa500.toLocaleString('en-AU') + ' (+첫해 행정비 $720)',
          badgeEn: 'A$' + sa500.toLocaleString('en-AU') + '/yr (+A$720 1st-yr fee)',
          detailKo: '2026년 SA 동반자녀 일정표: 초등 $7,120 · 중고등(7–12학년) $8,400 및 첫해 가족 행정비 $720 (장학금 수혜 시 감면).',
          detailEn: '2026 SA dependant schedule: Primary A$7,120, Yr 7–12 A$8,400 + A$720 first-year family admin fee.',
          perPrimary: 7120, perMid: 8400, perSenior: 8400, appFee: 720, familyCap: null, saSiblingDiscount: false
        };
      }
      return {
        tone: 'ok',
        badgeKo: '일반 학교 분담금만 적용 (국제학비 $0)',
        badgeEn: 'Local School Fees Only (No ISP Tuition)',
        detailKo: '국제학생 동반 학비가 아닌 일반 내국인 학교 재료비·분담금(Materials & Services Charge) 기준이 적용됩니다.',
        detailEn: 'Standard local school Materials & Services Charges apply instead of international tuition.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'TAS') {
      if (visa === '485' || visa === '491' || visa === '494') {
        return {
          tone: 'fee',
          badgeKo: 'TRP 50% 감면 연 $3,800 (+신청비 $150)',
          badgeEn: '50% TRP Fee A$3,800/yr (+A$150 fee)',
          detailKo: '태즈메이니아 Visas at a Glance 기준 TRP 전액($7,600)의 50%인 연 $3,800 및 신청비 $150이 부과됩니다.',
          detailEn: 'Charged at 50% of the A$7,600 TRP full rate (A$3,800/yr) per Study Tasmania schedule (+A$150 app fee).',
          perPrimary: 3800, perMid: 3800, perSenior: 3800, appFee: 150, familyCap: null, saSiblingDiscount: false
        };
      }
      if (visa === '500') {
        if (course === 'research') {
          return {
            tone: 'ok',
            badgeKo: '연구과정 면제 ($0)',
            badgeEn: 'Research Exempt ($0)',
            detailKo: '연구 석사·박사 및 외교·국방 장학생 동반 자녀는 TRP 수업료가 면제됩니다.',
            detailEn: 'Exempt for postgraduate research and Defence/DFAT sponsored students.',
            perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
          };
        }
        return {
          tone: 'danger',
          badgeKo: '연 $7,600 (+신청비 $150)',
          badgeEn: 'A$7,600/yr (+A$150 app fee)',
          detailKo: '태즈메이니아 TRP 전액 기준 Prep–12학년 연 $7,600(유치원 $3,800) 및 신청비 $150이 부과됩니다.',
          detailEn: 'Tasmania TRP full fee: Prep–Yr 12 A$7,600/yr (Kinder A$3,800) + A$150 application fee.',
          perPrimary: 7600, perMid: 7600, perSenior: 7600, appFee: 150, familyCap: null, saSiblingDiscount: false
        };
      }
      return {
        tone: 'ok',
        badgeKo: '수업료 $0 (입학신청비 $150 별도)',
        badgeEn: 'Tuition $0 (+A$150 app fee)',
        detailKo: '태즈메이니아 TRP 연간 수업료($0) 면제 대상이나 입학 권한 신청 행정비 $150 및 학교 자체 부담금은 별도입니다.',
        detailEn: 'Exempt from Tasmania TRP annual tuition ($0), subject to the A$150 TRP application fee and local school levies.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 150, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'ACT') {
      var actAmt = stage === 'senior' ? 16200 : (stage === 'mid' ? 14500 : (stage === 'kinder' ? 4200 : 11100));
      var canWaive = (visa === '482' || visa === '485' || visa === '491' || visa === '494' || visa === '820' || (visa === '500' && course === 'research'));
      if (canWaive && actWaive) {
        return {
          tone: 'ok',
          badgeKo: '면제 승인 시 수업료 $0 (+신청비 $265)',
          badgeEn: 'Waiver Approved: $0 (+A$265 app fee)',
          detailKo: 'ACT 교육청(IEU) 개별 학비 면제(ACT 노미네이션·직업군·브리징 전환·재정사유 등) 승인 시 연간 수업료는 $0이며 입학 신청비 $265만 납부합니다.',
          detailEn: 'With an approved ACT IEU fee waiver (ACT nomination, eligible occupation, bridging transition, or hardship), annual tuition is $0 (+A$265 IEU application fee).',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 265, familyCap: null, saSiblingDiscount: false
        };
      }
      return {
        tone: canWaive ? 'fee' : 'danger',
        badgeKo: (canWaive ? '면제 신청 가능 · 기본 연 $' : '연 $') + actAmt.toLocaleString('en-AU') + ' (+$265)',
        badgeEn: (canWaive ? 'Waiver Eligible · Base A$' : 'A$') + actAmt.toLocaleString('en-AU') + '/yr (+A$265)',
        detailKo: (canWaive ? '482·485·491·494·820·박사·적격 브리징 소지자는 ACT IEU 개별 면제 신청이 가능합니다(자동 면제 아님 · 상단 토글로 시뮬레이션 가능). ' : '일반 면제 비대상 구간입니다. ') +
          '기본 공시 학비는 유치원 $4,200 · 초등 $11,100 · 중등(7–10학년) $14,500 · 고등(11–12학년) $16,200 (신청비 $265 별도)입니다.',
        detailEn: (canWaive ? '482/485/491/494/820/PhD and eligible Bridging visa holders may apply for an ACT IEU fee waiver (not automatic; toggle above to simulate). ' : 'Standard fee applies. ') +
          'Base ACT tariff: Kinder A$4,200, Primary A$11,100, Yr 7–10 A$14,500, Yr 11–12 A$16,200 (+A$265 IEU fee).',
        perPrimary: 11100, perMid: 14500, perSenior: 16200, appFee: 265, familyCap: null, saSiblingDiscount: false
      };
    }

    if (stateCode === 'NT') {
      if (visa !== '500') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: '노던준주 공립학교 국제학생 학비 부과 대상이 아닙니다.',
          detailEn: 'Exempt from Northern Territory international dependant tuition fees.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
        };
      }
      var ntCur = stage === 'senior' ? 8954 : (stage === 'mid' ? 8208 : (stage === 'kinder' ? 4371 : 7196));
      return {
        tone: 'danger',
        badgeKo: '연 $' + ntCur.toLocaleString('en-AU') + ' (+행정비 $240)',
        badgeEn: 'A$' + ntCur.toLocaleString('en-AU') + '/yr (+A$240 fee)',
        detailKo: 'NT 관보 G23 동반자녀 요금표: 유치원 $4,371 · 초등 $7,196 · 중등(7–9학년) $8,208 · 고등(10–12학년) $8,954 (행정비 $240 별도).',
        detailEn: 'NT Gazette G23 Part B dependant rates: Kinder A$4,371, Primary A$7,196, Jr Sec A$8,208, Sr Sec A$8,954 (+A$240 admin fee).',
        perPrimary: 7196, perMid: 8208, perSenior: 8954, appFee: 240, familyCap: null, saSiblingDiscount: false
      };
    }

    return {
      tone: 'muted',
      badgeKo: '주 교육청 개별 확인 필요',
      badgeEn: 'Verify with State Education',
      detailKo: '공식 요강 원문을 확인해 주십시오.',
      detailEn: 'Refer to official state education schedule.',
      perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null, saSiblingDiscount: false
    };
  }

  function calcFamilyBreakdown(visa, stCode, counts, stage, course, opts) {
    var kP = Math.max(0, Number(counts && counts.primary) || 0);
    var kM = Math.max(0, Number(counts && counts.mid) || 0);
    var kS = Math.max(0, Number(counts && counts.senior) || 0);
    var totalKids = kP + kM + kS;
    var r = getSchoolRule(visa, stCode, stage || 'primary', course || 'he', opts);
    if (totalKids <= 0) {
      return { tuition: 0, appFee: 0, total: 0, kids: 0 };
    }
    var tuition = 0;
    if (r.familyCap != null) {
      // In WA 482, any Pre-primary to Yr 12 child triggers flat $4,000 family cap
      tuition = 4000;
    } else if (r.saSiblingDiscount) {
      var perChildRates = [];
      var i;
      for (i = 0; i < kS; i++) perChildRates.push(r.perSenior);
      for (i = 0; i < kM; i++) perChildRates.push(r.perMid);
      for (i = 0; i < kP; i++) perChildRates.push(r.perPrimary);
      for (i = 0; i < perChildRates.length; i++) {
        tuition += (i === 0) ? perChildRates[i] : Math.round(perChildRates[i] * 0.9);
      }
    } else {
      tuition = (kP * r.perPrimary) + (kM * r.perMid) + (kS * r.perSenior);
    }
    var appFee = r.appFee || 0;
    return {
      tuition: tuition,
      appFee: appFee,
      total: tuition + appFee,
      kids: totalKids
    };
  }

  /* ============================================================================
   * Property Transfer (Stamp) Duty + Foreign Buyer Surcharge (AFAD) + FIRB Tiers
   * ========================================================================== */
  var FOREIGN_SURCHARGE_RATES = {
    NSW: 0.09,
    VIC: 0.08,
    QLD: 0.08,
    WA: 0.07,
    SA: 0.07,
    TAS: 0.08,
    ACT: 0.00,
    NT: 0.00
  };

  function calcBaseStampDuty(price, st, isOwnerOccupier) {
    var v = Math.max(0, Number(price) || 0);
    if (v <= 0) return 0;

    if (st === 'QLD') {
      if (isOwnerOccupier) {
        // QRO Home Concession scale
        if (v <= 350000) return Math.ceil(v / 100) * 1.0;
        if (v <= 540000) return 3500 + Math.ceil((v - 350000) / 100) * 3.5;
        if (v <= 1000000) return 10150 + Math.ceil((v - 540000) / 100) * 4.5;
        return 30850 + Math.ceil((v - 1000000) / 100) * 5.75;
      }
      // QRO General Transfer Duty scale
      if (v <= 5000) return 0;
      if (v <= 75000) return Math.ceil((v - 5000) / 100) * 1.5;
      if (v <= 540000) return 1050 + Math.ceil((v - 75000) / 100) * 3.5;
      if (v <= 1000000) return 17325 + Math.ceil((v - 540000) / 100) * 4.5;
      return 38025 + Math.ceil((v - 1000000) / 100) * 5.75;
    }

    if (st === 'NSW') {
      // Revenue NSW FY 2026-27 standard residential scale
      if (v <= 18000) return Math.max(20, Math.ceil(v / 100) * 1.25);
      if (v <= 38000) return 225 + Math.ceil((v - 18000) / 100) * 1.5;
      if (v <= 103000) return 525 + Math.ceil((v - 38000) / 100) * 1.75;
      if (v <= 387000) return 1662 + Math.ceil((v - 103000) / 100) * 3.5;
      if (v <= 1290000) return 11602 + Math.ceil((v - 387000) / 100) * 4.5;
      return 52237 + Math.ceil((v - 1290000) / 100) * 5.5;
    }

    if (st === 'VIC') {
      if (isOwnerOccupier && v > 130000 && v <= 550000) {
        // SRO VIC Principal Place of Residence (PPR) concessional scale ($130k-$550k)
        if (v <= 440000) return 2870 + Math.round((v - 130000) * 0.05);
        return 18370 + Math.round((v - 440000) * 0.06);
      }
      if (v <= 25000) return Math.round(v * 0.014);
      if (v <= 130000) return 350 + Math.round((v - 25000) * 0.024);
      if (v <= 960000) return 2870 + Math.round((v - 130000) * 0.06);
      if (v <= 2000000) return Math.round(v * 0.055);
      return 110000 + Math.round((v - 2000000) * 0.065);
    }

    if (st === 'WA') {
      if (v <= 120000) return Math.ceil(v / 100) * 1.9;
      if (v <= 150000) return 2280 + Math.ceil((v - 120000) / 100) * 2.85;
      if (v <= 360000) return 3135 + Math.ceil((v - 150000) / 100) * 3.8;
      if (v <= 725000) return 11115 + Math.ceil((v - 360000) / 100) * 4.75;
      return 28453 + Math.ceil((v - 725000) / 100) * 5.15;
    }

    if (st === 'SA') {
      if (v <= 12000) return Math.ceil(v / 100) * 1.0;
      if (v <= 30000) return 120 + Math.ceil((v - 12000) / 100) * 2.0;
      if (v <= 50000) return 480 + Math.ceil((v - 30000) / 100) * 3.0;
      if (v <= 100000) return 1080 + Math.ceil((v - 50000) / 100) * 3.5;
      if (v <= 200000) return 2830 + Math.ceil((v - 100000) / 100) * 4.0;
      if (v <= 250000) return 6830 + Math.ceil((v - 200000) / 100) * 4.25;
      if (v <= 300000) return 8955 + Math.ceil((v - 250000) / 100) * 4.75;
      if (v <= 500000) return 11330 + Math.ceil((v - 300000) / 100) * 5.0;
      return 21330 + Math.ceil((v - 500000) / 100) * 5.5;
    }

    if (st === 'TAS') {
      if (v <= 3000) return 50;
      if (v <= 25000) return 50 + Math.ceil((v - 3000) / 100) * 1.75;
      if (v <= 75000) return 435 + Math.ceil((v - 25000) / 100) * 2.25;
      if (v <= 200000) return 1560 + Math.ceil((v - 75000) / 100) * 3.5;
      if (v <= 375000) return 5935 + Math.ceil((v - 200000) / 100) * 4.0;
      if (v <= 725000) return 12935 + Math.ceil((v - 375000) / 100) * 4.25;
      return 27810 + Math.ceil((v - 725000) / 100) * 4.5;
    }

    if (st === 'ACT') {
      if (isOwnerOccupier) {
        if (v <= 260000) return Math.ceil(v / 100) * 0.28;
        if (v <= 300000) return 728 + Math.ceil((v - 260000) / 100) * 2.2;
        if (v <= 500000) return 1608 + Math.ceil((v - 300000) / 100) * 3.4;
        if (v <= 750000) return 8408 + Math.ceil((v - 500000) / 100) * 4.32;
        if (v <= 1000000) return 19208 + Math.ceil((v - 750000) / 100) * 5.9;
        if (v <= 1455000) return 33958 + Math.ceil((v - 1000000) / 100) * 6.4;
        return Math.round(v * 0.0454);
      }
      if (v <= 200000) return Math.ceil(v / 100) * 1.2;
      if (v <= 300000) return 2400 + Math.ceil((v - 200000) / 100) * 2.2;
      if (v <= 500000) return 4600 + Math.ceil((v - 300000) / 100) * 3.4;
      if (v <= 750000) return 11400 + Math.ceil((v - 500000) / 100) * 4.32;
      if (v <= 1000000) return 22200 + Math.ceil((v - 750000) / 100) * 5.9;
      if (v <= 1455000) return 36950 + Math.ceil((v - 1000000) / 100) * 6.4;
      return Math.round(v * 0.0454);
    }

    if (st === 'NT') {
      if (v <= 525000) {
        var vk = v / 1000;
        return Math.round((0.06571441 * vk * vk) + (15 * vk));
      }
      if (v < 3000000) return Math.round(v * 0.0495);
      if (v < 5000000) return Math.round(v * 0.0575);
      return Math.round(v * 0.0595);
    }

    return 0;
  }

  function calcFirbFee(price, dwellingType, ownershipMode) {
    var v = Math.max(0, Number(price) || 0);
    if (v <= 0) return { fee: 0, tierKo: '-', tierEn: '-', banned: false, exempt: false };

    // FATR 2015 reg 38(3): Joint Tenants with AU Citizen / PR / NZ 444 spouse is FIRB-exempt
    if (ownershipMode === 'spouse50') {
      return {
        fee: 0,
        tierKo: '$0 (시민·영주 배우자 합유 reg 38(3) FIRB 면제)',
        tierEn: '$0 (Exempt under FATR reg 38(3) Joint Tenants with AU/PR spouse)',
        banned: false,
        exempt: true
      };
    }

    // ATO FY 2026-27 New Dwelling / Vacant Residential Land standard fee tiers
    var stdFee = 0;
    var tierLblKo = '';
    var tierLblEn = '';
    if (v <= 75000) {
      stdFee = 4600;
      tierLblKo = '$75k 이하 구간';
      tierLblEn = '<= A$75k tier';
    } else if (v <= 1000000) {
      stdFee = 15600;
      tierLblKo = '$75k 초과~$1M 이하 구간';
      tierLblEn = 'A$75k–A$1M tier';
    } else if (v <= 2000000) {
      stdFee = 31300;
      tierLblKo = '$1M 초과~$2M 이하 구간';
      tierLblEn = 'A$1M–A$2M tier';
    } else if (v <= 3000000) {
      stdFee = 62600;
      tierLblKo = '$2M 초과~$3M 이하 구간';
      tierLblEn = 'A$2M–A$3M tier';
    } else {
      var extraMillions = Math.min(4, Math.ceil((v - 3000000) / 1000000));
      stdFee = 62600 * Math.pow(2, extraMillions);
      tierLblKo = '$3M 초과 고액 구간';
      tierLblEn = '> A$3M high-value tier';
    }

    if (dwellingType === 'established') {
      var tripled = stdFee * 3;
      return {
        fee: tripled,
        tierKo: '원칙 매수 금지 (예외 재개발 등 승인 시 3배 수수료 $' + tripled.toLocaleString('en-AU') + ')',
        tierEn: 'Banned 2025–2029 (3x fee A$' + tripled.toLocaleString('en-AU') + ' if rare redevelopment exception)',
        banned: true,
        exempt: false
      };
    }

    return {
      fee: stdFee,
      tierKo: tierLblKo,
      tierEn: tierLblEn,
      banned: false,
      exempt: false
    };
  }

  function calcPropertyComparison(params) {
    var price = Math.max(0, Number(params.price) || 0);
    var st = params.state || 'QLD';
    var dwelling = params.dwelling || 'new';
    var isOO = (params.purpose !== 'inv');
    var ownership = params.ownership || 'sole';
    var tempVisa = params.tempVisa || '482';
    if (tempVisa === '189') tempVisa = '482';

    // Foreign purchaser share: 100% if sole/temp couple, 50% if Joint Tenants with AU Citizen/PR spouse
    var foreignShare = (ownership === 'spouse50') ? 0.5 : 1.0;
    var rate = FOREIGN_SURCHARGE_RATES[st] || 0;

    // Special statutory exemptions on foreign surcharge:
    // 1. NSW: Subclass 820/309 exempt if 200-day continuous principal residence requirement met
    // 2. VIC: Joint purchase with AU Citizen/PR spouse as principal residence for 12 continuous months exempts foreign share
    var surchargeExemptReasonKo = null;
    var surchargeExemptReasonEn = null;
    var surchargeAmt = Math.round(price * foreignShare * rate);

    if (st === 'NSW' && tempVisa === '820' && isOO) {
      surchargeAmt = 0;
      surchargeExemptReasonKo = 'NSW 820/309 연속 200일 실거주 요건 충족 시 할증 면제';
      surchargeExemptReasonEn = 'NSW 820/309 200-day principal residence surcharge exemption';
    } else if (st === 'VIC' && ownership === 'spouse50' && isOO) {
      surchargeAmt = 0;
      surchargeExemptReasonKo = 'VIC 시민·영주권 배우자 공동 매수 12개월 실거주 할증 면제';
      surchargeExemptReasonEn = 'VIC spouse joint-purchase 12-month residence exemption';
    }

    // Note on QLD Home Concession when foreign person buys 50/50 vs 100%:
    // Temporary resident buying 100% still gets QLD Home Concession on base transfer duty if occupying as home, plus 8% AFAD on foreign share.
    var baseDutyTemp = calcBaseStampDuty(price, st, isOO);
    var baseDutyPR = calcBaseStampDuty(price, st, isOO);
    var firb = calcFirbFee(price, dwelling, ownership);

    var tempTotal = baseDutyTemp + surchargeAmt + firb.fee;
    var prTotal = baseDutyPR;

    return {
      price: price,
      state: st,
      tempVisa: tempVisa,
      surchargeRatePct: Math.round(rate * 100),
      foreignSharePct: Math.round(foreignShare * 100),
      baseDutyTemp: baseDutyTemp,
      surchargeAmt: surchargeAmt,
      surchargeExemptReasonKo: surchargeExemptReasonKo,
      surchargeExemptReasonEn: surchargeExemptReasonEn,
      firb: firb,
      tempTotal: tempTotal,
      baseDutyPR: baseDutyPR,
      prTotal: prTotal,
      extraPenalty: tempTotal - prTotal
    };
  }

  var api = {
    STATES: STATES,
    STATE_NAMES: STATE_NAMES,
    VISAS: VISAS,
    FOREIGN_SURCHARGE_RATES: FOREIGN_SURCHARGE_RATES,
    getSchoolRule: getSchoolRule,
    calcFamilyBreakdown: calcFamilyBreakdown,
    calcBaseStampDuty: calcBaseStampDuty,
    calcFirbFee: calcFirbFee,
    calcPropertyComparison: calcPropertyComparison
  };
  root.ParkCoSettlementCalc = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (typeof document === 'undefined' || !document.getElementById('sel-visa-a')) {
    return;
  }

  var state = {
    lang: 'ko',
    left: '482',
    right: '189',
    region: 'QLD',
    stage: 'primary',
    course: 'he',
    kidPrimary: 1,
    kidMid: 0,
    kidSenior: 0,
    saConcession: false,
    actWaiver: false,
    propPrice: 850000,
    propState: 'QLD',
    propDwelling: 'new',
    propPurpose: 'oo',
    propJoint: 'sole'
  };

  function fmtAud(n) {
    return '$' + Math.round(Number(n) || 0).toLocaleString('en-AU');
  }

  function renderPropertySection() {
    var box = document.getElementById('prop-calc-output');
    if (!box) return;
    var isEn = state.lang === 'en';
    var cmpVisaKey = (state.left !== '189') ? state.left : (state.right !== '189' ? state.right : '482');
    var vTemp = VISAS[cmpVisaKey];
    var res = calcPropertyComparison({
      price: state.propPrice,
      state: state.propState,
      dwelling: state.propDwelling,
      purpose: state.propPurpose,
      ownership: state.propJoint,
      tempVisa: cmpVisaKey
    });

    var stName = isEn ? STATE_NAMES[res.state].en : STATE_NAMES[res.state].ko;
    var surchargeLabel = isEn
      ? ('Foreign Buyer Surcharge (' + res.surchargeRatePct + '% x ' + res.foreignSharePct + '% share)')
      : ('외국인 취득세 할증 (' + res.surchargeRatePct + '% × 지분 ' + res.foreignSharePct + '%)');
    if (res.surchargeExemptReasonKo) {
      surchargeLabel += ' — ' + (isEn ? res.surchargeExemptReasonEn : res.surchargeExemptReasonKo);
    }

    var banHtml = '';
    if (res.firb.banned) {
      banHtml = '<div class="sc-prop-ban-alert">' +
        (isEn
          ? 'Federal Established Dwelling Ban (1 Apr 2025 – 30 Jun 2029): Foreign temporary visa holders cannot purchase established homes on their own unless buying as Joint Tenants with an Australian Citizen / PR / Subclass 444 spouse (FATR reg 38(3)) or qualifying for a narrow housing-supply redevelopment exception (3x FIRB fee).'
          : '연방 기존 주택(Established Dwelling) 외국인 매수 금지 주의 (2025.4.1~2029.6.30): 임시비자 소지자 단독·부부는 기존 중고 주택 매수가 원칙적으로 금지됩니다. 호주 시민·영주권자·444 배우자와 합유(Joint Tenants · reg 38(3))로 취득하거나 주택 공급 확대 재개발 등 극소수 예외(FIRB 수수료 3배)에 해당해야만 진행할 수 있습니다.') +
        '</div>';
    } else if (res.state === 'ACT') {
      banHtml = '<div class="sc-prop-delta" style="margin-top:10px;">' +
        (isEn
          ? 'ACT Note: While ACT charges 0% foreign stamp duty surcharge at purchase, foreign owners of non-principal or non-exempt residential land may face an ongoing 0.75% p.a. Foreign Ownership Land Tax Surcharge on Average Unimproved Value (AUV).'
          : 'ACT 유의사항: 매수 시 외국인 취득세(Stamp Duty) 할증은 0%이나 보유 중 실거주 면제 비대상 주거지에는 평균 미개량가액(AUV)의 연 0.75% 외국인 토지세 할증이 부과될 수 있습니다.') +
        '</div>';
    }

    box.innerHTML =
      '<div class="sc-prop-compare">' +
        '<div class="sc-prop-col sc-prop-col--temp">' +
          '<div class="sc-prop-col__title">' +
            '<span>' + (isEn ? ('Temporary Resident (' + vTemp.en + ')') : ('임시비자 매수 (' + vTemp.ko + ')')) + '</span>' +
            '<span class="sc-pill sc-pill--danger">' + stName + '</span>' +
          '</div>' +
          '<div class="sc-prop-line"><span>' + (isEn ? '1. State Transfer (Stamp) Duty' : '1. 기본 주 취득세 (Transfer Duty)') + '</span><strong>' + fmtAud(res.baseDutyTemp) + '</strong></div>' +
          '<div class="sc-prop-line"><span>2. ' + surchargeLabel + '</span><strong>' + fmtAud(res.surchargeAmt) + '</strong></div>' +
          '<div class="sc-prop-line"><span>' + (isEn ? ('3. Federal FIRB Fee (' + res.firb.tierEn + ')') : ('3. 연방 FIRB 신청 수수료 (' + res.firb.tierKo + ')')) + '</span><strong>' + fmtAud(res.firb.fee) + '</strong></div>' +
          '<div class="sc-prop-total"><span>' + (isEn ? 'Total Gov. Duty & FIRB Fees' : '임시비자 세금·수수료 합계') + '</span><strong style="color:var(--pk-danger);">' + fmtAud(res.tempTotal) + '</strong></div>' +
        '</div>' +
        '<div class="sc-prop-col sc-prop-col--pr">' +
          '<div class="sc-prop-col__title">' +
            '<span>' + (isEn ? 'Permanent Resident / Citizen (PR)' : '영주권자 · 호주 시민권자 (PR/Citizen)') + '</span>' +
            '<span class="sc-pill sc-pill--ok">' + (isEn ? 'FIRB & AFAD Exempt' : '할증·FIRB 면제') + '</span>' +
          '</div>' +
          '<div class="sc-prop-line"><span>' + (isEn ? '1. State Transfer (Stamp) Duty' : '1. 기본 주 취득세 (Transfer Duty)') + '</span><strong>' + fmtAud(res.baseDutyPR) + '</strong></div>' +
          '<div class="sc-prop-line"><span>' + (isEn ? '2. Foreign Buyer Surcharge (AFAD)' : '2. 외국인 취득세 할증 (AFAD)') + '</span><strong>$0</strong></div>' +
          '<div class="sc-prop-line"><span>' + (isEn ? '3. Federal FIRB Application Fee' : '3. 연방 FIRB 신청 수수료') + '</span><strong>$0</strong></div>' +
          '<div class="sc-prop-total"><span>' + (isEn ? 'Total Gov. Duty & Fees' : '영주권·시민권 세금 합계') + '</span><strong style="color:var(--pk-ok);">' + fmtAud(res.prTotal) + '</strong></div>' +
        '</div>' +
      '</div>' +
      '<div class="sc-prop-delta">' +
        (isEn
          ? ('<strong>PR Conversion Savings on ' + fmtAud(res.price) + ' (' + res.state + '):</strong> Waiting until PR grant (or qualifying exemption) saves <strong>' + fmtAud(res.extraPenalty) + '</strong> in upfront non-recoverable foreign surcharge + FIRB fees (First Home Buyer concessions may reduce PR duty even further).')
          : ('<strong>매매가 ' + fmtAud(res.price) + ' (' + res.state + ') 영주권 전환 시 절감액:</strong> 임시비자 상태에서 매수할 때보다 영주권 취득 후 매수하면 외국인 취득세 할증과 FIRB 수수료 <strong>' + fmtAud(res.extraPenalty) + '</strong>을 즉시 아낄 수 있습니다 (생애최초 주택 FHB 감면 해당 시 영주권 취득세는 추가 감면 가능).')) +
      '</div>' +
      banHtml;
  }

  function render() {
    var isEn = state.lang === 'en';
    var vLeft = VISAS[state.left];
    var vRight = VISAS[state.right];
    var ruleOpts = { saConcession: state.saConcession, actWaiver: state.actWaiver };

    document.getElementById('course-field').hidden = (state.left !== '500' && state.right !== '500');

    // 1. Personalised 1-Line Summary Banner
    var sumBanner = document.getElementById('personal-summary-banner');
    var targetSt = state.region === 'ALL' ? 'QLD' : state.region;
    var stLabel = isEn ? STATE_NAMES[targetSt].en : STATE_NAMES[targetSt].ko;
    var schRule = getSchoolRule(state.left, targetSt, state.stage, state.course, ruleOpts);
    var stampTxt = isEn ? vLeft.stampRateEn[targetSt] : vLeft.stampRate[targetSt];

    sumBanner.innerHTML =
      '<div class="sc-summary-banner__title">' +
        (isEn
          ? ('Personalised Snapshot: ' + vLeft.en + ' · ' + stLabel + (state.region === 'ALL' ? ' (Default benchmark; select a state above)' : ''))
          : ('내 조건 한줄 요약: ' + vLeft.ko + ' · ' + stLabel + (state.region === 'ALL' ? ' (전체 선택 중 · 대표 예시 QLD 기준)' : ''))) +
      '</div>' +
      '<div class="sc-summary-chips">' +
        '<div class="sc-sum-item"><span>' + (isEn ? '1. Public School Tuition' : '1. 자녀 공립학비 결론') + '</span><strong>' + (isEn ? schRule.badgeEn : schRule.badgeKo) + '</strong></div>' +
        '<div class="sc-sum-item"><span>' + (isEn ? '2. University (CSP / HELP)' : '2. 대학 학비 지원 (CSP·HELP)') + '</span><strong>' + (isEn ? vLeft.uniEn : vLeft.uniKo) + '</strong></div>' +
        '<div class="sc-sum-item"><span>' + (isEn ? '3. Medicare Eligibility' : '3. 메디케어 가입 자격') + '</span><strong>' + (isEn ? vLeft.medEn : vLeft.medKo) + '</strong></div>' +
        '<div class="sc-sum-item"><span>' + (isEn ? '4. Foreign Buyer Stamp Duty' : '4. 주택 외국인 취득세 할증') + '</span><strong>' + stampTxt + '</strong></div>' +
      '</div>';

    // 2. Family Multi-Child Annual Tuition Calculator (including Years 7-10 perMid!)
    var calcBox = document.getElementById('family-calc-output');
    var counts = { primary: state.kidPrimary, mid: state.kidMid, senior: state.kidSenior };
    var totalKids = state.kidPrimary + state.kidMid + state.kidSenior;

    function fmtBk(bk) {
      if (bk.total === 0) return '$0';
      if (bk.tuition === 0 && bk.appFee > 0) {
        return isEn
          ? ('A$' + bk.appFee.toLocaleString('en-AU') + ' ($0 tuition + A$' + bk.appFee.toLocaleString('en-AU') + ' app/admin fee)')
          : ('$' + bk.appFee.toLocaleString('en-AU') + ' (수업료 $0 + 신청·행정비 $' + bk.appFee.toLocaleString('en-AU') + ')');
      }
      if (bk.appFee > 0) {
        return (isEn ? 'A$' : '$') + bk.total.toLocaleString('en-AU') +
          (isEn ? (' (tuition A$' + bk.tuition.toLocaleString('en-AU') + ' + A$' + bk.appFee.toLocaleString('en-AU') + ' fee)') : (' (학비 $' + bk.tuition.toLocaleString('en-AU') + ' + 신청비 $' + bk.appFee.toLocaleString('en-AU') + ')'));
      }
      return (isEn ? 'A$' : '$') + bk.total.toLocaleString('en-AU');
    }

    if (totalKids === 0) {
      calcBox.textContent = isEn
        ? 'Enter 1 or more children (Primary P–6, Jr Sec Yr 7–10, or Senior Yr 11–12) to calculate exact first-year tuition + admin fees.'
        : '초등(P–6)·중등(7–10)·고등(11–12) 자녀 인원수를 1명 이상 입력하시면 주별 첫해 학비와 입학신청비를 정확히 합산합니다.';
    } else if (state.region !== 'ALL') {
      var bkLeft = calcFamilyBreakdown(state.left, state.region, counts, state.stage, state.course, ruleOpts);
      var bkRight = calcFamilyBreakdown(state.right, state.region, counts, state.stage, state.course, ruleOpts);
      calcBox.innerHTML = isEn
        ? ('<strong>' + state.region + ' (' + totalKids + ' child/ren) Est. 1st-Year Total:</strong> ' +
           vLeft.en + ' = <strong>' + fmtBk(bkLeft) + '</strong> vs ' +
           vRight.en + ' = <strong>' + fmtBk(bkRight) + '</strong>')
        : ('<strong>' + STATE_NAMES[state.region].ko + ' 자녀 ' + totalKids + '명 첫해 예상 합계:</strong> ' +
           vLeft.ko + ' <strong>' + fmtBk(bkLeft) + '</strong> vs ' +
           vRight.ko + ' <strong>' + fmtBk(bkRight) + '</strong>');
    } else {
      var sampleStates = ['QLD', 'VIC', 'NSW', 'WA', 'SA', 'ACT'].map(function (sc) {
        var b = calcFamilyBreakdown(state.left, sc, counts, state.stage, state.course, ruleOpts);
        return sc + ' $' + b.total.toLocaleString('en-AU');
      }).join(' · ');
      calcBox.innerHTML = isEn
        ? ('<strong>' + vLeft.en + ' (' + totalKids + ' child/ren) State 1st-Year Comparison:</strong> ' + sampleStates)
        : ('<strong>' + vLeft.ko + ' 자녀 ' + totalKids + '명 주별 첫해 합계 비교:</strong> ' + sampleStates);
    }

    // 3. Side-by-side School Fee Scan & Detail Table
    var head = document.getElementById('cmp-head');
    head.innerHTML = '<span>' + (isEn ? 'State' : '주(State)') + '</span>' +
      '<span>' + (isEn ? vLeft.en : vLeft.ko) + '</span>' +
      '<span>' + (isEn ? vRight.en : vRight.ko) + '</span>';

    var scan = document.getElementById('scan');
    var tbody = document.getElementById('fee-body');
    scan.innerHTML = '';
    tbody.innerHTML = '';

    STATES.forEach(function (st) {
      var rL = getSchoolRule(state.left, st, state.stage, state.course, ruleOpts);
      var rR = getSchoolRule(state.right, st, state.stage, state.course, ruleOpts);
      var isHi = (state.region === st);

      var row = document.createElement('div');
      row.className = 'crow' + (isHi ? ' is-highlighted' : '');
      row.innerHTML =
        '<p class="st">' + st + '<a href="#desk-' + st + '">' + (isEn ? 'Sources' : '원문·문의') + '</a></p>' +
        '<p class="amt"><span class="sc-pill sc-pill--' + rL.tone + '">' + (isEn ? rL.badgeEn : rL.badgeKo) + '</span></p>' +
        '<p class="amt"><span class="sc-pill sc-pill--' + rR.tone + '">' + (isEn ? rR.badgeEn : rR.badgeKo) + '</span></p>';
      scan.appendChild(row);

      var tr = document.createElement('tr');
      if (isHi) tr.className = 'is-highlighted';
      tr.innerHTML =
        '<td><strong>' + (isEn ? STATE_NAMES[st].en : STATE_NAMES[st].ko) + '</strong></td>' +
        '<td><span class="sc-pill sc-pill--' + rL.tone + '">' + (isEn ? rL.badgeEn : rL.badgeKo) + '</span></td>' +
        '<td>' + (isEn ? rL.detailEn : rL.detailKo) + '</td>';
      tbody.appendChild(tr);
    });

    // 4. Highlight chosen state in Housing Stamp Duty Grid & Render Property Calculator
    document.querySelectorAll('.buy-grid article[data-state]').forEach(function (card) {
      var ds = card.getAttribute('data-state');
      card.classList.toggle('is-highlighted', ds === (state.region === 'ALL' ? state.propState : state.region));
    });

    renderPropertySection();
  }

  function applyLang(lang) {
    state.lang = lang === 'en' ? 'en' : 'ko';
    document.documentElement.lang = state.lang;
    document.body.setAttribute('data-ui-lang', state.lang);
    document.title = state.lang === 'en'
      ? 'Australian Visa School Fees, Medicare & Stamp Duty Navigator | Park & Co Lawyers'
      : '호주 비자별 공립학비 · 메디케어 · 주택 취득세 비교기 | 법무법인 박앤코';

    document.querySelectorAll('[data-ko][data-en]').forEach(function (el) {
      el.textContent = state.lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ko');
    });

    document.querySelectorAll('a[data-ko-href][data-en-href]').forEach(function (a) {
      a.setAttribute('href', state.lang === 'en' ? a.getAttribute('data-en-href') : a.getAttribute('data-ko-href'));
    });

    document.getElementById('sc-lang-ko').classList.toggle('active', state.lang === 'ko');
    document.getElementById('sc-lang-en').classList.toggle('active', state.lang === 'en');

    try {
      localStorage.setItem('parkco_lang', state.lang);
      var u = new URL(window.location.href);
      if (state.lang === 'en') u.searchParams.set('lang', 'en');
      else u.searchParams.delete('lang');
      window.history.replaceState({}, '', u.toString());
    } catch (e) {}

    render();
  }

  function bindControls() {
    var selA = document.getElementById('sel-visa-a');
    var selB = document.getElementById('sel-visa-b');
    var selSt = document.getElementById('sel-state');
    var selStage = document.getElementById('sel-stage');
    var selCourse = document.getElementById('sel-course');
    var kidP = document.getElementById('kid-primary');
    var kidM = document.getElementById('kid-mid');
    var kidS = document.getElementById('kid-senior');
    var chkSa = document.getElementById('chk-sa-concession');
    var chkAct = document.getElementById('chk-act-waiver');

    var propPrice = document.getElementById('prop-price');
    var propState = document.getElementById('prop-state');
    var propDwelling = document.getElementById('prop-dwelling');
    var propPurpose = document.getElementById('prop-purpose');
    var propJoint = document.getElementById('prop-joint');

    selA.addEventListener('change', function () { state.left = selA.value; render(); });
    selB.addEventListener('change', function () { state.right = selB.value; render(); });
    selSt.addEventListener('change', function () {
      state.region = selSt.value;
      if (selSt.value !== 'ALL' && propState) {
        state.propState = selSt.value;
        propState.value = selSt.value;
      }
      render();
    });
    selStage.addEventListener('change', function () { state.stage = selStage.value; render(); });
    selCourse.addEventListener('change', function () { state.course = selCourse.value; render(); });

    function onKidInput() {
      state.kidPrimary = Math.max(0, Math.min(6, parseInt(kidP.value, 10) || 0));
      state.kidMid = Math.max(0, Math.min(6, parseInt(kidM.value, 10) || 0));
      state.kidSenior = Math.max(0, Math.min(6, parseInt(kidS.value, 10) || 0));
      render();
    }
    kidP.addEventListener('input', onKidInput);
    kidM.addEventListener('input', onKidInput);
    kidS.addEventListener('input', onKidInput);

    if (chkSa) {
      chkSa.addEventListener('change', function () {
        state.saConcession = !!chkSa.checked;
        render();
      });
    }
    if (chkAct) {
      chkAct.addEventListener('change', function () {
        state.actWaiver = !!chkAct.checked;
        render();
      });
    }

    if (propPrice) {
      propPrice.addEventListener('input', function () {
        state.propPrice = Math.max(0, parseInt(propPrice.value, 10) || 0);
        renderPropertySection();
      });
    }
    if (propState) {
      propState.addEventListener('change', function () {
        state.propState = propState.value;
        render();
      });
    }
    if (propDwelling) {
      propDwelling.addEventListener('change', function () {
        state.propDwelling = propDwelling.value;
        renderPropertySection();
      });
    }
    if (propPurpose) {
      propPurpose.addEventListener('change', function () {
        state.propPurpose = propPurpose.value;
        renderPropertySection();
      });
    }
    if (propJoint) {
      propJoint.addEventListener('change', function () {
        state.propJoint = propJoint.value;
        renderPropertySection();
      });
    }

    document.getElementById('sc-lang-ko').addEventListener('click', function () { applyLang('ko'); });
    document.getElementById('sc-lang-en').addEventListener('click', function () { applyLang('en'); });
  }

  bindControls();
  var initLang = 'ko';
  try {
    var q = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('parkco_lang');
    if (q === 'en') initLang = 'en';
  } catch (e) {}
  applyLang(initLang);
})(typeof window !== 'undefined' ? window : globalThis);
