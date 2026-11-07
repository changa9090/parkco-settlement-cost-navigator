/* Park & Co Lawyers — Settlement Cost Navigator Interactive Engine (KO/EN, 2026.11) */
(function () {
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

  function getSchoolRule(visa, state, stage, course) {
    if (visa === '189') {
      return {
        tone: 'ok',
        badgeKo: '수업료 면제 ($0)',
        badgeEn: 'Tuition Exempt ($0)',
        detailKo: '일반 내국인 공립학교 입학 기준이 적용됩니다 (학교별 자율 분담금 별도).',
        detailEn: 'Domestic public school enrolment applies (voluntary school contributions separate).',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
      };
    }

    if ((visa === '482' || visa === '485') && state === 'NSW') {
      var amt = stage === 'senior' ? 7600 : 6400;
      return {
        tone: 'fee',
        badgeKo: '연 $' + amt.toLocaleString('en-AU') + ' (자녀당)',
        badgeEn: 'A$' + amt.toLocaleString('en-AU') + '/yr per child',
        detailKo: '2026년 기준 초등·7–10학년 연 $6,400, 11–12학년 연 $7,600 및 신청비 $150 부과 (482 지방 적격지역 거주 시 수업료 면제 가능).',
        detailEn: '2026 rate: Primary/Yr 7–10 $6,400, Yr 11–12 $7,600 + $150 application fee (482 regional exemption available).',
        perPrimary: 6400, perMid: 6400, perSenior: 7600, appFee: 150, familyCap: null
      };
    }

    if ((visa === '491' || visa === '494' || visa === '820') && state === 'NSW') {
      return {
        tone: 'ok',
        badgeKo: '수업료 면제 ($0)',
        badgeEn: 'Tuition Exempt ($0)',
        detailKo: 'NSW 임시거주자 프로그램 수업료 면제 대상입니다 (입학 권한 신청 절차 적용).',
        detailEn: 'Exempt from NSW Temporary Residents Program tuition fee (Authority to Enrol applies).',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 150, familyCap: null
      };
    }

    if (visa === '500' && state === 'NSW') {
      if (course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '박사 연구과정 면제 ($0)',
          badgeEn: 'PhD Research Exempt ($0)',
          detailKo: 'NSW 메인 캠퍼스 박사과정 재학 중이며 별도 학비 장학금이 없는 경우 수업료가 면제됩니다 (신청비 $150 별도).',
          detailEn: 'Tuition exempt for eligible NSW main-campus PhD parents (A$150 application fee applies).',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 150, familyCap: null
        };
      }
      var isEli = course === 'elicos';
      var pAmt = isEli ? 11200 : 7800;
      var mAmt = isEli ? 12600 : 7800;
      var sAmt = isEli ? 14200 : 9000;
      var cur = stage === 'senior' ? sAmt : (stage === 'mid' ? mAmt : pAmt);
      return {
        tone: 'danger',
        badgeKo: '연 $' + cur.toLocaleString('en-AU') + ' (자녀당)',
        badgeEn: 'A$' + cur.toLocaleString('en-AU') + '/yr per child',
        detailKo: isEli
          ? '2026년 어학·VET·비학위 부모 기준: 초등 $11,200 · 중등 $12,600 · 고등 $14,200 (신청비 $150).'
          : '2026년 고등교육 학위 부모 기준: 초등·중등 $7,800 · 고등 $9,000 (신청비 $150).',
        detailEn: isEli
          ? '2026 ELICOS/VET parent rate: Primary $11,200, Jr Sec $12,600, Sr Sec $14,200 (+$150 fee).'
          : '2026 Higher Ed parent rate: Primary/Jr Sec $7,800, Sr Sec $9,000 (+$150 fee).',
        perPrimary: pAmt, perMid: mAmt, perSenior: sAmt, appFee: 150, familyCap: null
      };
    }

    if (state === 'VIC') {
      if (visa !== '500' || course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: visa === '500'
            ? '빅토리아 대학 연구 석사·박사 과정 부모의 동반 자녀는 국제학생 수업료가 면제됩니다.'
            : '빅토리아 국제학생 프로그램 수업료 부과 대상이 아닙니다.',
          detailEn: 'Exempt from Victoria International Student Program tuition fees.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
        };
      }
      var vicCur = stage === 'senior' ? 19635 : (stage === 'mid' ? 17493 : 14450);
      return {
        tone: 'danger',
        badgeKo: '연 $' + vicCur.toLocaleString('en-AU') + ' (2027 공시표)',
        badgeEn: 'A$' + vicCur.toLocaleString('en-AU') + '/yr (2027 schedule)',
        detailKo: 'VIC 공개 동반자녀 요금표(School Fees 2027): 초등 $14,450 · 7–10학년 $17,493 · 11–12학년 $19,635.',
        detailEn: 'Published VIC Dependant Fee Schedule (2027): Primary $14,450, Yr 7–10 $17,493, Yr 11–12 $19,635.',
        perPrimary: 14450, perMid: 17493, perSenior: 19635, appFee: 0, familyCap: null
      };
    }

    if (state === 'QLD') {
      if (visa !== '500') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: '퀸즐랜드 교육청 기준 국제학생 수업료 및 입학 신청비가 부과되지 않습니다.',
          detailEn: 'Exempt from EQI temporary resident tuition and application fees in Queensland.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
        };
      }
      if (course === 'research') {
        return {
          tone: 'ok',
          badgeKo: '박사(AQF 10) 면제 가능',
          badgeEn: 'PhD (AQF 10) Exempt',
          detailKo: '퀸즐랜드 대학 박사과정(AQF 10) 또는 지정 교육구 외 연구석사 조건 충족 시 면제됩니다.',
          detailEn: 'Exempt for QLD PhD (AQF 10) parents and eligible regional Masters by Research.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
        };
      }
      var qldP = 314 * 40, qldM = 330 * 40, qldS = 390 * 40;
      var qldW = stage === 'senior' ? '주당 $385~$396' : (stage === 'mid' ? '주당 $322~$340' : '주당 $314');
      return {
        tone: 'danger',
        badgeKo: qldW + ' (연 약 $12.5k~$15.8k)',
        badgeEn: 'A$314–$396/wk (~A$12.5k–$15.8k/yr)',
        detailKo: '2026년 동반자녀 주당 학비(40주 학기 환산 약 $12,560~$15,840) 및 신청비 $305가 부과됩니다.',
        detailEn: '2026 EQI dependant weekly tuition plus A$305 application fee.',
        perPrimary: qldP, perMid: qldM, perSenior: qldS, appFee: 305, familyCap: null
      };
    }

    if (state === 'WA') {
      if (visa === '482') {
        return {
          tone: 'fee',
          badgeKo: '가족당 연 $4,000 상한',
          badgeEn: 'A$4,000/yr per family',
          detailKo: '자녀 수와 무관하게 가구당 연 $4,000입니다 (첫째가 유치원인 경우 면제).',
          detailEn: 'Flat A$4,000 per family per year regardless of number of school-aged children.',
          perPrimary: 4000, perMid: 4000, perSenior: 4000, appFee: 0, familyCap: 4000
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
            perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
          };
        }
        var waCur = stage === 'senior' ? 18980 : (stage === 'mid' ? 17286 : 14575);
        return {
          tone: 'danger',
          badgeKo: '연 $' + waCur.toLocaleString('en-AU') + ' (TIWA 공시)',
          badgeEn: 'A$' + waCur.toLocaleString('en-AU') + '/yr (TIWA rate)',
          detailKo: '초등 $14,575 · 7–10학년 $17,286 · 11–12학년 $18,980 (교육부 2026·TIWA 2027 병기 요금표).',
          detailEn: 'Primary $14,575, Yr 7–10 $17,286, Yr 11–12 $18,980 per TIWA / WA Education schedule.',
          perPrimary: 14575, perMid: 17286, perSenior: 18980, appFee: 0, familyCap: null
        };
      }
      return {
        tone: 'ok',
        badgeKo: '일반 입학 적용 ($4,000 가구학비 비대상)',
        badgeEn: 'Local Enrolment (Outside $4,000 482 Fee)',
        detailKo: '482 가구당 $4,000 부과 대상이 아니며 일반 공립학교 입학 안내를 따릅니다 (학교별 확인 권장).',
        detailEn: 'Not subject to the Subclass 482 A$4,000 family tuition fee; standard school enrolment applies.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
      };
    }

    if (state === 'SA') {
      if (visa === '482') {
        var saCap = stage === 'primary' ? 7000 : 8200;
        return {
          tone: 'fee',
          badgeKo: '소득연동 (상한 연 $' + saCap.toLocaleString('en-AU') + ')',
          badgeEn: 'Means-Tested (Cap A$' + saCap.toLocaleString('en-AU') + ')',
          detailKo: '광역 애들레이드 기준 가구 세전소득 $78,000 이하 또는 지방 학교 입학 시 면제되며 상한은 초등 $7,000·중고등 $8,200(2027 공시, 둘째부터 10% 감면)입니다.',
          detailEn: 'Exempt if gross family income <= A$78,000 or regional SA school; max cap Primary $7,000 / Secondary $8,200.',
          perPrimary: 7000, perMid: 8200, perSenior: 8200, appFee: 0, familyCap: null
        };
      }
      if (visa === '500') {
        var sa500 = stage === 'primary' ? 7120 : 8400;
        return {
          tone: 'danger',
          badgeKo: '연 $' + sa500.toLocaleString('en-AU') + ' (고등교육 기준)',
          badgeEn: 'A$' + sa500.toLocaleString('en-AU') + '/yr (Higher Ed)',
          detailKo: '2026년 SA 동반자녀 일정표: 초등 $7,120 · 중고등 $8,400 및 첫해 가족 행정비 $720 (장학금 수혜 비율만큼 감면).',
          detailEn: '2026 SA dependant schedule: Primary $7,120, Secondary $8,400 + A$720 first-year family admin fee.',
          perPrimary: 7120, perMid: 8400, perSenior: 8400, appFee: 720, familyCap: null
        };
      }
      return {
        tone: 'ok',
        badgeKo: '일반 학교 분담금만 적용 (국제학비 면제)',
        badgeEn: 'Local School Fees Only (No ISP Tuition)',
        detailKo: '국제학생 동반 학비가 아닌 일반 내국인 학교 재료비·분담금(Materials & Services Charge) 기준이 적용됩니다.',
        detailEn: 'Standard local school Materials & Services Charges apply instead of international tuition.',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
      };
    }

    if (state === 'TAS') {
      if (visa === '485' || visa === '491' || visa === '494') {
        return {
          tone: 'fee',
          badgeKo: 'TRP 학비 50% 감면 (연 $3,800 추정)',
          badgeEn: '50% of TRP Fee (~A$3,800/yr)',
          detailKo: '태즈메이니아 Visas at a Glance 표기 기준 TRP 전액($7,600)의 50%가 부과됩니다 (신청비 $150 별도).',
          detailEn: 'Charged at 50% of the A$7,600 TRP full rate per Study Tasmania schedule (+A$150 fee).',
          perPrimary: 3800, perMid: 3800, perSenior: 3800, appFee: 150, familyCap: null
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
            perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
          };
        }
        return {
          tone: 'danger',
          badgeKo: '연 $7,600 (유치원 $3,800)',
          badgeEn: 'A$7,600/yr (Kinder A$3,800)',
          detailKo: '태즈메이니아 TRP 전액 기준 Prep–12학년 연 $7,600 및 신청비 $150이 부과됩니다.',
          detailEn: 'Tasmania TRP full fee: Prep–Yr 12 A$7,600/yr + A$150 application fee.',
          perPrimary: 7600, perMid: 7600, perSenior: 7600, appFee: 150, familyCap: null
        };
      }
      return {
        tone: 'ok',
        badgeKo: '수업료 면제 ($0)',
        badgeEn: 'Tuition Exempt ($0)',
        detailKo: '태즈메이니아 TRP 수업료 면제 대상입니다 (입학 권한 신청 및 학교 자체 부담금 별도).',
        detailEn: 'Exempt from Tasmania TRP tuition fees (school levies separate).',
        perPrimary: 0, perMid: 0, perSenior: 0, appFee: 150, familyCap: null
      };
    }

    if (state === 'ACT') {
      var actAmt = stage === 'senior' ? 16200 : (stage === 'mid' ? 14500 : (stage === 'kinder' ? 4200 : 11100));
      var canWaive = (visa === '482' || visa === '491' || visa === '494' || visa === '820' || (visa === '500' && course === 'research'));
      return {
        tone: canWaive ? 'fee' : 'danger',
        badgeKo: (canWaive ? '면제 신청 가능 · 기본 연 $' : '연 $') + actAmt.toLocaleString('en-AU'),
        badgeEn: (canWaive ? 'Waiver Eligible · Base A$' : 'A$') + actAmt.toLocaleString('en-AU') + '/yr',
        detailKo: (canWaive ? 'ACT 노미네이션·MLTSSL 고용계약·파트너·연구과정 등 요건 충족 시 개별 면제 신청이 가능합니다 (자동 면제 아님). ' : '면제 신청 비대상 구간입니다. ') +
          '기본 공시 학비는 유치원 $4,200 · 초등 $11,100 · 7–10학년 $14,500 · 11–12학년 $16,200 (신청비 $265)입니다.',
        detailEn: (canWaive ? 'Fee waiver application available (not automatic). ' : 'Standard fee applies. ') +
          'Base ACT tariff: Kinder $4,200, Primary $11,100, Yr 7–10 $14,500, Yr 11–12 $16,200 (+$265 fee).',
        perPrimary: 11100, perMid: 14500, perSenior: 16200, appFee: 265, familyCap: null
      };
    }

    if (state === 'NT') {
      if (visa !== '500') {
        return {
          tone: 'ok',
          badgeKo: '수업료 면제 ($0)',
          badgeEn: 'Tuition Exempt ($0)',
          detailKo: '노던준주 공립학교 국제학생 학비 부과 대상이 아닙니다.',
          detailEn: 'Exempt from Northern Territory international dependant tuition fees.',
          perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
        };
      }
      var ntCur = stage === 'senior' ? 8954 : (stage === 'mid' ? 8208 : (stage === 'kinder' ? 4371 : 7196));
      return {
        tone: 'danger',
        badgeKo: '연 $' + ntCur.toLocaleString('en-AU') + ' (관보 Part B)',
        badgeEn: 'A$' + ntCur.toLocaleString('en-AU') + '/yr (Gazette Part B)',
        detailKo: 'NT 관보 G23 동반자녀 요금표: 유치원 $4,371 · 초등 $7,196 · 7–9학년 $8,208 · 10–12학년 $8,954 (행정비 $240 별도).',
        detailEn: 'NT Gazette G23 Part B dependant rates: Kinder $4,371, Primary $7,196, Yr 7–9 $8,208, Yr 10–12 $8,954.',
        perPrimary: 7196, perMid: 8208, perSenior: 8954, appFee: 240, familyCap: null
      };
    }

    return {
      tone: 'muted',
      badgeKo: '주 교육청 개별 확인 필요',
      badgeEn: 'Verify with State Education',
      detailKo: '공식 요강 원문을 확인해 주십시오.',
      detailEn: 'Refer to official state education schedule.',
      perPrimary: 0, perMid: 0, perSenior: 0, appFee: 0, familyCap: null
    };
  }

  var state = {
    lang: 'ko',
    left: '482',
    right: '189',
    region: 'QLD',
    stage: 'primary',
    course: 'he',
    kidPrimary: 1,
    kidSenior: 0
  };

  function calcFamilyTotal(visa, stCode) {
    var r = getSchoolRule(visa, stCode, state.stage, state.course);
    var kids = state.kidPrimary + state.kidSenior;
    if (kids <= 0) return 0;
    if (r.familyCap != null) {
      return r.familyCap + r.appFee;
    }
    var tuition = (state.kidPrimary * r.perPrimary) + (state.kidSenior * r.perSenior);
    return tuition + (tuition > 0 || r.appFee > 0 ? r.appFee : 0);
  }

  function render() {
    var isEn = state.lang === 'en';
    var vLeft = VISAS[state.left];
    var vRight = VISAS[state.right];

    document.getElementById('course-field').hidden = (state.left !== '500' && state.right !== '500');

    // 1. Personalised 1-Line Summary Banner
    var sumBanner = document.getElementById('personal-summary-banner');
    var targetSt = state.region === 'ALL' ? 'QLD' : state.region;
    var stLabel = isEn ? STATE_NAMES[targetSt].en : STATE_NAMES[targetSt].ko;
    var schRule = getSchoolRule(state.left, targetSt, state.stage, state.course);
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

    // 2. Family Multi-Child Annual Tuition Calculator
    var calcBox = document.getElementById('family-calc-output');
    var totalKids = state.kidPrimary + state.kidSenior;
    if (totalKids === 0) {
      calcBox.textContent = isEn
        ? 'Enter 1 or more children to calculate estimated first-year public school tuition + application fees.'
        : '자녀 인원수를 1명 이상 입력하시면 주별 첫해 공립학비+신청비 추정 합계를 자동 계산합니다.';
    } else if (state.region !== 'ALL') {
      var totLeft = calcFamilyTotal(state.left, state.region);
      var totRight = calcFamilyTotal(state.right, state.region);
      calcBox.innerHTML = isEn
        ? ('<strong>' + state.region + ' (' + totalKids + ' child/ren) Est. 1st-Year Total:</strong> ' +
           vLeft.en + ' = <strong>A$' + totLeft.toLocaleString('en-AU') + '</strong> vs ' +
           vRight.en + ' = <strong>A$' + totRight.toLocaleString('en-AU') + '</strong>')
        : ('<strong>' + STATE_NAMES[state.region].ko + ' 자녀 ' + totalKids + '명 첫해 예상 합계(신청비 포함):</strong> ' +
           vLeft.ko + ' <strong>$' + totLeft.toLocaleString('en-AU') + '</strong> vs ' +
           vRight.ko + ' <strong>$' + totRight.toLocaleString('en-AU') + '</strong>');
    } else {
      var sampleStates = ['QLD', 'VIC', 'NSW', 'WA', 'ACT'].map(function (sc) {
        return sc + ' $' + calcFamilyTotal(state.left, sc).toLocaleString('en-AU');
      }).join(' · ');
      calcBox.innerHTML = isEn
        ? ('<strong>' + vLeft.en + ' (' + totalKids + ' child/ren) State Comparison:</strong> ' + sampleStates)
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
      var rL = getSchoolRule(state.left, st, state.stage, state.course);
      var rR = getSchoolRule(state.right, st, state.stage, state.course);
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

    // 4. Highlight chosen state in Housing Stamp Duty Grid
    document.querySelectorAll('.buy-grid article[data-state]').forEach(function (card) {
      card.classList.toggle('is-highlighted', card.getAttribute('data-state') === state.region);
    });
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
    var kidS = document.getElementById('kid-senior');

    selA.addEventListener('change', function () { state.left = selA.value; render(); });
    selB.addEventListener('change', function () { state.right = selB.value; render(); });
    selSt.addEventListener('change', function () { state.region = selSt.value; render(); });
    selStage.addEventListener('change', function () { state.stage = selStage.value; render(); });
    selCourse.addEventListener('change', function () { state.course = selCourse.value; render(); });

    function onKidInput() {
      state.kidPrimary = Math.max(0, Math.min(6, parseInt(kidP.value, 10) || 0));
      state.kidSenior = Math.max(0, Math.min(6, parseInt(kidS.value, 10) || 0));
      render();
    }
    kidP.addEventListener('input', onKidInput);
    kidS.addEventListener('input', onKidInput);

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
})();
