export interface UserData {
  date: string; // "YYYY-MM-DD" 형태의 날짜
  settings: UserSettings; // 사용자 설정
}

export interface UserSettings {
  isTableMode: boolean; // 테이블 모드 여부
  lastOpenTab: "bo" | "tuk" | "beopma"; // 마지막으로 열린 탭
}

// 상시일기 부분
export interface SangSiIlGi {
  onSaengChwi: OnSaengChwi[]; // 온생취(이름·유념·무념 리스트)
  miRiJoonBi: YooMooNyum; // 미리준비(유념·무념)
  study: {
    gyungJeon: MinuteSpent; // 경전(분 단위)
    beopGyoo: MinuteSpent; // 법규(분 단위)
    gangYeon: MinuteSpent; // 강연(분 단위)
  };
  saRiYeonGoo: {
    hwoeHwa: MinuteSpent; // 회화(분 단위)
    euDoo: MinuteSpent; // 의두(분 단위)
    seongRi: MinuteSpent; // 성리
  };
  jungSinSooYang: {
    yeonBool: MinuteSpent; // 염불
    jwaSon: MinuteSpent; // 좌선
    giDoh: MinuteSpent; // 기도
    chamHwoeBanSeong: YooMooNyum; // 참회반성
  };
}

// onSaengChwi 배열 아이템
export interface OnSaengChwi extends YooMooNyum {
  name: string;
}

// 유념·무념 공통 타입
export interface YooMooNyum {
  yooNyum: number;
  mooNyum: number;
}

// 분 단위 활동 타입
export interface MinuteSpent {
  minuteSpent: number;
}

// 교당내왕시주의사항 부분
export interface GyoDangNaeWang {
  gongBooMoonDap: YooMooNyum;
  gamGakGamJeong: YooMooNyum;
  euSimHaeOh: YooMooNyum;
  sonGiIpSon: boolean;
  yeHwoeJeonSim: boolean;
  soDeukBanJo: boolean;
}

// 작업시간
export interface JakEopSiGan {
  hakSeup: MinuteSpent;
  bongGong: MinuteSpent;
  hyooSik: MinuteSpent;
  sooMyeon: MinuteSpent;
  heoSong: MinuteSpent;
}

// 계문
export type BoTongGeupItem =
  | "yeonGoSalSaeng"
  | "doDookJil"
  | "ganEum"
  | "yeonGoEumJoo"
  | "japGi"
  | "akHanMal"
  | "yeonGoJaengToo"
  | "gongGeumBumYong"
  | "geumJeonYeoSoo"
  | "yeonGoHeupYeon";

export const BO_TONG_GEUP_ITEMS: BoTongGeupItem[] = [
  "yeonGoSalSaeng",
  "doDookJil",
  "ganEum",
  "yeonGoEumJoo",
  "japGi",
  "akHanMal",
  "yeonGoJaengToo",
  "gongGeumBumYong",
  "geumJeonYeoSoo",
  "yeonGoHeupYeon",
];

export const BoTongGeupObj = {
  yeonGoSalSaeng: "연고살생",
  doDookJil: "도둑질",
  ganEum: "간음",
  yeonGoEumJoo: "연고음주",
  japGi: "잡기",
  akHanMal: "악한 말",
  yeonGoJaengToo: "연고쟁투",
  gongGeumBumYong: "공금범용",
  geumJeonYeoSoo: "금전여수",
  yeonGoHeupYeon: "연고흡연",
};

export interface BoTongGeupCounts {
  name: BoTongGeupItem;
  count: number;
}

export type TeukSinGeupItem =
  | "gongSaDanDok"
  | "taInGwa"
  | "geumEunBoPae"
  | "euBokSaChi"
  | "satDwoenBeot"
  | "yangInByungSeol"
  | "sinYongEopEum"
  | "ggooMiNeunMal"
  | "yeonGoJam"
  | "noRaeChoom";

export const TEUK_SIN_GEUP_ITEMS: TeukSinGeupItem[] = [
  "gongSaDanDok",
  "taInGwa",
  "geumEunBoPae",
  "euBokSaChi",
  "satDwoenBeot",
  "yangInByungSeol",
  "sinYongEopEum",
  "ggooMiNeunMal",
  "yeonGoJam",
  "noRaeChoom",
];

export const TeukSinGeupObj = {
  gongSaDanDok: "공사단독",
  taInGwa: "타인과",
  geumEunBoPae: "금은보패",
  euBokSaChi: "의복사치",
  satDwoenBeot: "삿된 벗",
  yangInByungSeol: "양인병설",
  sinYongEopEum: "신용없음",
  ggooMiNeunMal: "꾸미는 말",
  yeonGoJam: "연고 잠",
  noRaeChoom: "노래 춤",
};

export interface TeukSinGeupCounts {
  name: TeukSinGeupItem;
  count: number;
}

export type BeopMaSangJeonGeupItem =
  | "ahManSim"
  | "dooAhNae"
  | "yeonGoSaYook"
  | "naTae"
  | "hanIpDooMal"
  | "mangEo"
  | "siGiSim"
  | "tamSim"
  | "jinSim"
  | "chiSim";

export const BEOP_MA_SANG_JEON_GEUP_ITEMS: BeopMaSangJeonGeupItem[] = [
  "ahManSim",
  "dooAhNae",
  "yeonGoSaYook",
  "naTae",
  "hanIpDooMal",
  "mangEo",
  "siGiSim",
  "tamSim",
  "jinSim",
  "chiSim",
];

export const BeopMaSangJeonGeupObj = {
  ahManSim: "아만심",
  dooAhNae: "두아내",
  yeonGoSaYook: "연고사육",
  naTae: "나태",
  hanIpDooMal: "한입두말",
  mangEo: "망어",
  siGiSim: "시기심",
  tamSim: "탐심",
  jinSim: "진심",
  chiSim: "치심",
};

export interface BeopMaSangJeonGeupCounts {
  name: BeopMaSangJeonGeupItem;
  count: number;
}

export interface GyeMoon {
  boTongGeup: BoTongGeupCounts[];
  teukSinGeup: TeukSinGeupCounts[];
  beopMaSangJeonGeup: BeopMaSangJeonGeupCounts[];
}
