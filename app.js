const visas = {
  "482": {
    label: "482",
    blurb: "기술이민 임시 비자입니다. 수업료는 주 교육 당국 문서를 그대로 옮겼습니다.",
    rows: [
      ["NSW", "2026년 초등·7–10학년 연 6,400달러, 11–12학년 연 7,600달러. 신청비 150달러.", "2027년은 초등 6,600달러, 7–10학년 6,700달러, 11–12학년 7,800달러입니다. 자녀마다 붙습니다. 적격 지역이면 2025년 1월 1일부터 수업료가 면제됩니다. 신청비와 브리징 010–070은 그 면제 밖입니다."],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", "비자표의 납부 칸이 No입니다. School Fees 2027의 의존 학생 금액은 이 줄이 아닙니다."],
      ["QLD", "수업료를 내지 않습니다.", "입학 권한과 신청비 칸도 No입니다. 학교 자체의 비용은 남을 수 있습니다."],
      ["WA", "가족당 연 4,000달러.", "457과 482 문장입니다. 가장 큰 자녀가 킨더가튼이면 없습니다. 485·491·494로 옮기지 않습니다. 페이지는 2027년 1월 1일 갱신 예정이라고 적습니다."],
      ["SA", "2027년 상한은 초등 7,000달러, 중고등 8,200달러.", "광역 애들레이드 공립학교이고, 세전 가구 소득이 78,000달러 이하면 없습니다. 지방 학교 목록과 유치원은 이 수수료 밖입니다. 2026년 상한은 페이지에 없습니다. 둘째부터 10%이고, 네 명 이상이면 가장 어린 세 명만 냅니다. 세전 소득이 자녀 1명 105,000달러, 2명 125,000달러, 3명 이상 145,000달러보다 낮으면 수수료가 줄어든다고 적혀 있고, 줄어든 금액은 그 문장에 없습니다."],
      ["TAS", "TRP 수업료 칸은 No입니다.", "입학 권한과 신청비는 Yes입니다. 학교 부담금은 학교에 냅니다. 전액표의 3,800달러·7,600달러는 482 줄이 아닙니다."],
      ["ACT", "유치원 4,200달러, 초등 11,100달러, 7–10학년 14,500달러, 11–12학년 16,200달러.", "연도 칸은 없습니다. 신청비 265달러. 면제는 신청이며 자동이 아닙니다. 서류 문구는 ACT Employment Contract (MLTSSL) or Labour Agreement입니다."],
      ["NT", "수업료 칸이 No입니다.", "500 줄과 다릅니다."]
    ],
    aside: "자녀가 둘이면 뉴사우스웨일스는 아이마다 연액이 붙고, 서호주는 가족당 4,000달러라 머리수로 늘지 않습니다. 뉴사우스웨일스 저소득 면제는 건별로 보고, 가처분소득은 기준이 아니며 달러로 된 소득 기준은 열린 문서에 없습니다. 482는 그 면제 신청 불가 목록에 없습니다."
  },
  "485": {
    label: "485",
    blurb: "졸업 임시 비자입니다.",
    rows: [
      ["NSW", "Table 1 전액입니다.", "2026년 6,400달러와 7,600달러, 신청비 150달러가 482와 같은 표입니다."],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", ""],
      ["QLD", "수업료를 내지 않습니다.", ""],
      ["WA", "4,000달러 문장에 이름이 없습니다.", "일반 입학 안내에는 이름이 있습니다. 가족 수업료 문장은 457·482입니다."],
      ["SA", "달러가 없습니다.", "조회 파일은 local school fees apply라고만 적습니다."],
      ["TAS", "TRP 수업료의 50%입니다.", "문서 표기는 Yes^ – 50% of TRP fee입니다. 절반을 달러로 계산해 두지 않았습니다."],
      ["ACT", "면제 신청 칸이 No입니다.", "등록이 안 되는 목록과는 다른 칸입니다."],
      ["NT", "수업료 칸이 No입니다.", ""]
    ]
  },
  "491": {
    label: "491",
    blurb: "지역 기술이민 임시 비자입니다.",
    rows: [
      ["NSW", "수업료 칸은 No입니다.", "입학 권한과 신청비는 Yes입니다."],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", ""],
      ["QLD", "수업료를 내지 않습니다.", ""],
      ["WA", "4,000달러 문장에 넣지 않습니다.", "일반 입학 안내에 이름이 있습니다."],
      ["SA", "달러가 없습니다.", "local school fees apply입니다."],
      ["TAS", "TRP 수업료의 50%입니다.", "Yes^ – 50% of TRP fee. 달러로 환산하지 않았습니다."],
      ["ACT", "면제를 신청할 수 있습니다.", "노미네이션 서한과 ACT Employment Contract (MLTSSL) 문구가 있습니다. 자동 면제가 아닙니다."],
      ["NT", "수업료 칸이 No입니다.", ""]
    ]
  },
  "494": {
    label: "494",
    blurb: "지역 고용주 스폰서 임시 비자입니다. 491과 방향이 같은 주가 많습니다.",
    rows: [
      ["NSW", "수업료 칸은 No입니다.", "입학 권한과 신청비는 Yes입니다."],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", ""],
      ["QLD", "수업료를 내지 않습니다.", ""],
      ["WA", "4,000달러 문장에 넣지 않습니다.", "일반 입학 안내에 이름이 있습니다."],
      ["SA", "달러가 없습니다.", "local school fees apply입니다."],
      ["TAS", "TRP 수업료의 50%입니다.", "윗첨자 없이 Yes – 50% of TRP fee입니다. 달러로 환산하지 않았습니다."],
      ["ACT", "면제를 신청할 수 있습니다.", "MLTSSL 고용계약 문구가 남아 있습니다."],
      ["NT", "수업료 칸이 No입니다.", ""]
    ]
  },
  "820": {
    label: "820·309",
    blurb: "파트너 임시 비자입니다.",
    rows: [
      ["NSW", "수업료 칸은 No입니다.", "2024년 1월 1일부터 입학 권한과 신청비는 Yes입니다."],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", ""],
      ["QLD", "수업료를 내지 않습니다.", ""],
      ["WA", "이 페이지의 4,000달러 문장에는 없습니다.", ""],
      ["SA", "이 조회에서 482 페이지 밖입니다.", ""],
      ["TAS", "수업료 칸은 No입니다.", "입학 권한과 신청비는 Yes입니다."],
      ["ACT", "면제를 신청할 수 있습니다.", "820과 309 모두 해당합니다."],
      ["NT", "둘 다 수업료 칸이 No입니다.", ""]
    ]
  },
  "189": {
    label: "189·190",
    blurb: "영주 비자입니다. 아래는 수업료가 없다는 문장을 확인한 주입니다.",
    rows: [
      ["NSW", "수업료를 내지 않습니다.", ""],
      ["VIC", "국제학생 프로그램 수업료 대상이 아닙니다.", ""],
      ["QLD", "수업료를 내지 않습니다.", ""],
      ["WA", "확인한 영주 수업료 문장이 없습니다.", "482 가족 수업료와 같은 줄로 적지 않습니다."],
      ["SA", "확인한 영주 수업료 문장이 없습니다.", ""],
      ["TAS", "수업료를 내지 않습니다.", ""],
      ["ACT", "일반 공립 입학이고 수업료가 없습니다.", ""],
      ["NT", "확인한 영주 수업료 문장이 없습니다.", ""]
    ]
  },
  "500": {
    label: "500",
    blurb: "부모가 주신청인 학생 비자입니다. 부모 과정에 따라 갈라지고, 자녀 본인 비자와도 다릅니다.",
    rows: [
      ["NSW", "부모 과정별로 금액이 다릅니다.", "아래 카드에 2026년 금액을 적었습니다."],
      ["VIC", "부모 과정에 따라 국제학생 프로그램 대상이 갈립니다.", "연구과정은 면제입니다. 공개 요금 제목은 School Fees 2027입니다."],
      ["QLD", "주신청 부모의 500은 수업료 칸이 Yes입니다.", "주당 금액은 아래 카드입니다."],
      ["WA", "연도 표기가 페이지마다 다릅니다.", "교육부는 2026년, TIWA는 2027년이라고 적습니다. 의존 자녀 요금의 해는 그 문장만으로 정하지 않습니다."],
      ["SA", "전액 유학 고등교육 과정과 그 밖이 다릅니다.", "접미사별로 문구가 갈립니다."],
      ["TAS", "고등교육·VET·ELICOS는 수업료 Yes입니다.", "연구과정과 외교·국방은 No입니다."],
      ["ACT", "연구 석사·박사만 면제를 신청할 수 있습니다.", ""],
      ["NT", "웹페이지는 500을 납부 대상으로만 적습니다.", "어느 표인지는 2025년 11월 13일 관보가 나눕니다."]
    ],
    cards: [
      { state: "NSW", text: "2026년, 부모 과정이 고등교육·석사·일반 박사이면 초등 7,800달러, 중학 7,800달러, 고등 9,000달러입니다. ELICOS·VET·Non-award는 11,200달러, 12,600달러, 14,200달러입니다. 뉴사우스웨일스 메인 캠퍼스 박사이고 자녀 학비 장학금이 없으면 수업료는 면제되고 신청비 150달러는 남습니다." },
      { state: "VIC", text: "고등교육·VET·ELICOS·Non-award는 국제학생 프로그램 납부입니다. 연구 석사·박사와 외교·국방은 납부 대상이 아닙니다. 빅토리아 대학에서 연구 목적으로 공부하는 부모의 자녀는 수수료가 면제되고 학교에 직접 신청합니다. 같은 문단에 500 연구과정과 AusAID·국방이 들어 있습니다. 요금 페이지의 의존 학생 연액은 Prep–6학년 14,450달러, 7–10학년 17,493달러, 11–12학년 19,635달러입니다. Standard 표는 17,000달러, 20,580달러, 23,100달러입니다. 2026년 의존 학생 금액은 그 페이지에 없습니다." },
      { state: "QLD", text: "2026년 의존 학생 주당 금액은 신청 305달러(GST 포함), State Kindergarten 158달러, Prep–6학년 314달러, 7–9학년 322달러, 10학년 340달러, 11학년 385달러, 12학년 396달러입니다. 문서 표기는 October 2026입니다. 관광 비자 Prep–6학년 주당 379달러는 다른 표입니다. 비자 일정표에는 인쇄된 발행일이 없고, 정책 version 2.0의 2026년 10월 6일은 정책 날짜입니다. 2026년 6월 문서의 추가 면제는 퀸즐랜드 대학 AQF 10 연구과정 부모의 자녀, Australia Awards, Defence Cooperation, 퀸즐랜드 대학 장학금입니다. 연구석사는 Metropolitan North, Metropolitan South, North Coast, South East 교육구 밖이어야 하고, 본국 정부가 자녀 수업료를 대면 빠집니다." },
      { state: "SA", text: "전액 유학 고등교육 과정의 500입니다. 2026년은 초등 자녀 1인 7,120달러, 7–12학년 8,400달러입니다. 첫해 가족 신청·행정은 720달러, 이후 자녀 1인 행정은 370달러, 재료비는 110달러에서 920달러입니다. 2027년은 7,400달러와 8,720달러, 가족 740달러, 행정 380달러입니다. 500H·500V는 student dependant and local school fees, 500P는 local school fees에 student dependant fees may apply가 붙고, 500S는 local school fees입니다. 장학 면제는 같은 비율로 자녀에게 넘어갑니다." },
      { state: "TAS", text: "전액은 연도 칸 없이 Prep–12학년 연 7,600달러입니다. 신청비 150달러, 킨더가튼 연 3,800달러는 공개 표의 다른 칸입니다. 링크 파일명은 V19이고 바닥글은 Version 18 – 22/08/2025입니다." },
      { state: "NT", text: "Gazette No. G23, 2025년 11월 13일입니다. Part B의 500 의존 자녀는 유치원 4,371달러, Transition–6학년 7,196달러, 7–9학년 8,208달러, 10–12학년 8,954달러입니다. Part A 주신청은 12,047달러, 13,646달러, 14,818달러입니다. 웹페이지의 240달러는 학생 행정 수수료이고, 관보의 240달러는 숙소 배정입니다. 홈스테이 주당 348달러는 별도입니다." }
    ],
    wa: {
      title: "서호주, 연도가 페이지마다 다릅니다",
      paragraphs: [
        "교육부 국제 페이지는 제목을 2026년 학생비자(서브클래스 500) 수업료라고 적습니다. 예비반과 초등 14,575달러, 7–10학년 17,286달러, 11–12학년 18,980달러입니다. 이 제목은 의존 자녀가 아닙니다.",
        "TIWA 요금 페이지(2026년 10월 28일 표기)는 같은 금액 줄에 2027년 수업료라고 캡션을 답니다. 킨더가튼은 7,809달러로 TIWA 표에 있습니다. 영어 집중 과정은 연 3,000달러, EALD는 연 1,500달러를 더한다고 적고, 수업과 지원을 합쳐 연 25,000달러까지라는 문장도 있습니다. 25,000달러는 표의 칸이 아닙니다.",
        "TIWA는 석사·박사·Temporary Skills Shortage·Temporary Work Skilled가 아닌 비자의 의존 자녀에게 그 표를 적용한다고 적습니다. 500·570·572·573(수업석사 포함) 자녀는 전액 해외학생으로 그 요금 페이지를 냅니다. 박사와 연구석사는 인정된 서호주 대학 재학 중 그 수업료가 면제됩니다. 2027년 1월 1일부터 수업석사 부모의 면제는 끝납니다. 이미 면제가 있거나 2026년 11월 30일 이전에 Confirmation of Placement를 받은 가족은 예외입니다.",
        "지금 공개된 프레임워크는 Masters or PhD라고 쓰고, 아직 시행 전인 v4.0은 Masters by Research 또는 PhD로 좁혀 적습니다. 자녀 본인이 500을 갖는 신청 경로는 의존 자녀와 따로이고, 그 페이지에는 수업료 금액이 없습니다."
      ]
    }
  }
};

const order = ["482", "485", "491", "494", "500", "820", "189"];
const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const actFee = {
  kinder: "유치원 4,200달러. 연도 칸은 없습니다.",
  primary: "초등 11,100달러. 연도 칸은 없습니다.",
  mid: "7–10학년 14,500달러. 연도 칸은 없습니다.",
  senior: "11–12학년 16,200달러. 연도 칸은 없습니다."
};

const benefits = {
  "482": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다.",
    med: "2025년 12월 17일 장관 명령 목록에 482는 없습니다. 다른 가입 경로까지 닫지는 않습니다.",
    pay: "4년 뒤에 JobSeeker를 받는 문장은 아닙니다."
  },
  "485": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다.",
    med: "2025년 12월 17일 장관 명령 목록에 485는 없습니다. 다른 가입 경로까지 닫지는 않습니다.",
    pay: "4년 뒤에 JobSeeker를 받는 문장은 아닙니다."
  },
  "491": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다.",
    med: "2025년 12월 17일 장관 명령 목록에 491이 있습니다.",
    pay: "이 대기 표의 영주 문장이 아닙니다. 4년 뒤에 JobSeeker를 받는 문장도 아닙니다."
  },
  "494": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다.",
    med: "2025년 12월 17일 장관 명령 목록에 494가 있습니다.",
    pay: "이 대기 표의 영주 문장이 아닙니다. 4년 뒤에 JobSeeker를 받는 문장도 아닙니다."
  },
  "500": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다. 배우자나 성인 자녀도 같습니다.",
    med: "2025년 12월 17일 장관 명령 목록에 500은 없습니다. 다른 가입 경로까지 닫지는 않습니다.",
    pay: "4년 뒤에 JobSeeker를 받는 문장은 아닙니다."
  },
  "820": {
    uni: "CSP 없음, HELP 없음. full fee-paying place입니다.",
    med: "820/801 결합 신청이 영주 가입 페이지에 들어갑니다. 기산점은 영주 신청일이고, 해외 신청이면 입국일입니다.",
    pay: "대기 페이지가 연 급여의 일부입니다. Low Income Health Care Card, Special Benefit, Parental Leave Pay, Family Tax Benefit Part A입니다. 대기는 신청일과 도착일 중 늦은 날부터입니다."
  },
  "189": {
    uni: "CSP는 있습니다. HELP는 브리징 스터디만입니다. 일반 학위는 그 문장에 있습니다.",
    med: "영주 비자 소지자는 영주 가입 페이지의 대상입니다. 최종 수정 2025년 7월 11일입니다.",
    pay: "2019년 1월 1일 이후 영주 비자는 최대 4년입니다. 2026년 9월 20일 편집본의 JobSeeker 대기는 208주입니다."
  }
};

function quoted(text, blank) {
  return { text: text, blank: !!blank };
}

function stageFee(id, state, stage, course) {
  const noFee = quoted("수업료가 없습니다.", false);
  const missing = quoted("확인한 영주 수업료 문장이 없습니다.", true);
  if (id === "189") {
    if (state === "WA" || state === "SA" || state === "NT") return missing;
    if (state === "ACT") return quoted("일반 공립 입학이고 수업료가 없습니다.", false);
    if (state === "VIC") return quoted("국제학생 프로그램 수업료 대상이 아닙니다.", false);
    return noFee;
  }
  if (id === "482" && state === "NSW") {
    if (stage === "senior") return quoted("2026년 연 7,600달러.", false);
    return quoted("2026년 연 6,400달러.", false);
  }
  if (id === "485" && state === "NSW") {
    if (stage === "senior") return quoted("2026년 연 7,600달러.", false);
    return quoted("2026년 연 6,400달러.", false);
  }
  if ((id === "491" || id === "494" || id === "820") && state === "NSW") return noFee;
  if (id === "500" && state === "NSW") {
    if (course === "research") return quoted("메인 캠퍼스 박사이고 자녀 학비 장학금이 없으면 수업료는 면제됩니다. 신청비 150달러는 남습니다.", false);
    if (stage === "kinder") return quoted("킨더가튼 금액은 초등과 따로 적혀 있지 않습니다.", true);
    if (course === "elicos") {
      if (stage === "primary") return quoted("2026년 연 11,200달러.", false);
      if (stage === "mid") return quoted("2026년 연 12,600달러.", false);
      return quoted("2026년 연 14,200달러.", false);
    }
    if (stage === "senior") return quoted("2026년 연 9,000달러.", false);
    return quoted("2026년 연 7,800달러.", false);
  }
  if (state === "VIC" && id !== "500") return quoted("국제학생 프로그램 수업료 대상이 아닙니다.", false);
  if (state === "VIC" && id === "500") {
    if (course === "research") return quoted("연구 석사·박사와 외교·국방은 납부 대상이 아닙니다.", false);
    return quoted("2026년 의존 학생 금액은 이 페이지에 없습니다.", true);
  }
  if (state === "QLD" && id !== "500") return noFee;
  if (state === "QLD" && id === "500") {
    if (stage === "kinder") return quoted("2026년 주당 158달러.", false);
    if (stage === "primary") return quoted("2026년 주당 314달러.", false);
    if (stage === "mid") return quoted("2026년 7–9학년 주당 322달러, 10학년 주당 340달러.", false);
    return quoted("2026년 11학년 주당 385달러, 12학년 주당 396달러.", false);
  }
  if (state === "WA" && id === "482") {
    if (stage === "kinder") return quoted("가장 큰 자녀가 킨더가튼이면 없습니다.", false);
    return quoted("가족당 연 4,000달러.", false);
  }
  if (state === "WA" && id === "500") return quoted("두 페이지의 연도가 달라 이 칸의 금액을 정하지 않습니다.", true);
  if (state === "WA") return quoted("4,000달러 문장에 이 비자는 없습니다.", true);
  if (state === "SA" && id === "482") return quoted("2026년 상한은 이 페이지에 없습니다.", true);
  if (state === "SA" && id === "500") {
    if (course !== "he") return quoted("전액 유학 고등교육 과정의 금액이 아니라 이 칸에 넣지 않습니다.", true);
    if (stage === "kinder") return quoted("이 일정에 유치원 칸이 없습니다.", true);
    if (stage === "primary") return quoted("2026년 자녀 1인 7,120달러.", false);
    return quoted("2026년 자녀 1인 8,400달러.", false);
  }
  if (state === "SA" && id === "820") return quoted("이 조회에서 482 페이지 밖입니다.", true);
  if (state === "SA") return quoted("달러가 이 문서에 없습니다.", true);
  if (state === "TAS" && (id === "485" || id === "491" || id === "494")) {
    return quoted("TRP 수업료의 50%입니다. 달러로 계산하지 않았습니다.", true);
  }
  if (state === "TAS" && id === "500") {
    if (course === "research") return quoted("연구과정과 외교·국방은 수업료가 없습니다.", false);
    if (stage === "kinder") return quoted("연 3,800달러. 연도 칸은 없습니다.", false);
    return quoted("연 7,600달러. 연도 칸은 없습니다.", false);
  }
  if (state === "TAS") return noFee;
  if (state === "ACT" && (id === "482" || id === "485" || id === "491" || id === "494" || id === "500" || id === "820")) {
    return quoted(actFee[stage], false);
  }
  if (state === "NT" && id === "500") {
    if (stage === "kinder") return quoted("관보 Part B, 2026년 4,371달러.", false);
    if (stage === "primary") return quoted("관보 Part B, 2026년 7,196달러.", false);
    if (stage === "mid") return quoted("관보 Part B, 7–9학년 8,208달러. 10학년은 10–12학년 칸 8,954달러입니다.", false);
    return quoted("관보 Part B, 2026년 8,954달러.", false);
  }
  if (state === "NT") return noFee;
  return quoted("이 칸의 문장이 없습니다.", true);
}

function cell(text, head) {
  const el = document.createElement(head ? "th" : "td");
  el.textContent = text;
  return el;
}

const view = { left: "482", right: "189", stage: "primary", course: "he" };

function render() {
  const left = visas[view.left];
  const right = visas[view.right];
  const body = document.getElementById("fee-body");
  const scan = document.getElementById("scan");
  const caption = document.getElementById("fee-caption");
  const blurb = document.getElementById("visa-blurb");
  const more = document.getElementById("visa-more");
  const head = document.getElementById("cmp-head");
  body.replaceChildren();
  scan.replaceChildren();
  head.replaceChildren();
  const corner = document.createElement("span");
  const leftName = document.createElement("span");
  const rightName = document.createElement("span");
  leftName.textContent = left.label;
  rightName.textContent = right.label;
  head.append(corner, leftName, rightName);
  states.forEach((state) => {
    const row = document.createElement("div");
    row.className = "crow";
    const name = document.createElement("p");
    name.className = "st";
    name.append(document.createTextNode(state));
    const src = document.createElement("a");
    src.href = "#desk-" + state;
    src.textContent = "원문·문의";
    name.append(src);
    ["left", "right"].forEach((side) => {
      const id = side === "left" ? view.left : view.right;
      const got = stageFee(id, state, view.stage, view.course);
      const amt = document.createElement("p");
      amt.className = got.blank ? "amt blank" : "amt";
      amt.dataset.side = side;
      amt.dataset.state = state;
      amt.textContent = got.text;
      row.append(amt);
    });
    row.prepend(name);
    scan.append(row);
  });
  ["uni", "med", "pay"].forEach((key) => {
    const box = document.getElementById("cmp-" + key);
    box.replaceChildren();
    [view.left, view.right].forEach((id) => {
      const p = document.createElement("p");
      const b = document.createElement("b");
      b.textContent = visas[id].label;
      p.append(b, document.createTextNode(" " + benefits[id][key]));
      box.append(p);
    });
  });
  left.rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((value) => tr.append(cell(value)));
    body.append(tr);
  });
  caption.textContent = left.label + "의 조건 · 2026년 11월 3일 공개 문서";
  blurb.textContent = left.blurb + " 오른쪽은 " + right.blurb;
  more.replaceChildren();
  document.querySelectorAll("#picker-a button, #picker-b button").forEach((btn) => {
    const side = btn.closest(".picker").id === "picker-a" ? view.left : view.right;
    btn.setAttribute("aria-pressed", btn.dataset.visa === side ? "true" : "false");
  });
  document.querySelectorAll("#stage button").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.stage === view.stage ? "true" : "false");
  });
  document.querySelectorAll("#course button").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.course === view.course ? "true" : "false");
  });
  document.getElementById("course-wrap").hidden = view.left !== "500" && view.right !== "500";
  if (view.left === "482" || view.right === "482") {
    const box = document.createElement("div");
    box.className = "aside";
    const p = document.createElement("p");
    p.textContent = visas["482"].aside;
    box.append(p);
    more.append(box);
  }
  if (view.left === "500" || view.right === "500") {
    const box = document.createElement("div");
    box.className = "notice";
    box.id = "wa-note";
    const h = document.createElement("h3");
    h.textContent = visas["500"].wa.title;
    box.append(h);
    visas["500"].wa.paragraphs.forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      box.append(p);
    });
    more.append(box);
    const grid = document.createElement("div");
    grid.className = "state-grid";
    visas["500"].cards.forEach((card) => {
      const article = document.createElement("article");
      article.className = "state-card";
      const h = document.createElement("h3");
      h.textContent = card.state;
      const p = document.createElement("p");
      p.textContent = card.text;
      article.append(h, p);
      grid.append(article);
    });
    more.append(grid);
  }
}

document.getElementById("controls").addEventListener("click", (event) => {
  const preset = event.target.closest("button[data-left]");
  if (preset) {
    view.left = preset.dataset.left;
    view.right = preset.dataset.right;
    render();
    return;
  }
  const visaBtn = event.target.closest("button[data-visa]");
  if (visaBtn) {
    const side = visaBtn.closest(".picker").id === "picker-a" ? "left" : "right";
    view[side] = visaBtn.dataset.visa;
    render();
    return;
  }
  const stageBtn = event.target.closest("button[data-stage]");
  if (stageBtn) {
    view.stage = stageBtn.dataset.stage;
    render();
    return;
  }
  const courseBtn = event.target.closest("button[data-course]");
  if (courseBtn) {
    view.course = courseBtn.dataset.course;
    render();
  }
});

render();
