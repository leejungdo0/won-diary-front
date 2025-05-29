// 최상위 인터페이스
export interface DailyLog {
  date: string; // "YYYY-MM-DD" 형태의 날짜
  sangSiIlGi: SangSiIlGi; // 상시일기 (일별 활동 기록)
  gyoDangNaeWang: GyoDangNaeWang; // 교당내왕시주의사항
  gyemoon: GyeMoon; // 계문(각 종별 등급 정보)
  jakEopSiGan: JakEopSiGan; // 작업시간
}

// 상시일기 부분
export interface SangSiIlGi {
  onSaengChwi: OnSaengChwi[]; // 온생취(이름·유념·무념 리스트)
  miRiJoonBi: YooMooNyum; // 미리준비(유념·무념)
  gyungJeon: MinuteSpent; // 경전(분 단위)
  beopGyoo: MinuteSpent; // 법규(분 단위)
  gangYeon: MinuteSpent; // 강연(분 단위)
  hwoeHwa: MinuteSpent; // 회화(분 단위)
  euDoo: MinuteSpent; // 의두(분 단위)
  seongRi: MinuteSpent; // 성리
  yeonBool: MinuteSpent;
  jwaSon: MinuteSpent;
  giDoh: MinuteSpent;
  chamHwoeBanSeong: YooMooNyum;
}

// onSaengChwi 배열 아이템
export interface OnSaengChwi {
  name: string;
  yooNyum: number;
  mooNyum: number;
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
  sonGiIpSon: Checked;
  yeHwoeJeonSim: Checked;
  soDeukBanJo: Checked;
}
export interface Checked {
  checked: boolean;
}

// 작업시간
export interface JakEopSiGan {
  hakSeup: MinuteSpent;
  bongGong: MinuteSpent;
  hyooSik: MinuteSpent;
  sooMyeon: MinuteSpent;
  heoSong: MinuteSpent;
}

// 계문 부분
export type BoTongGeupItems =
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
export interface BoTongGeup {
  name: BoTongGeupItems;
  count: number;
}

export type TeukSinGeupItems =
  | "gongSaDanDok"
  | "taInGwa"
  | "geumEunBoPae"
  | "euBokSaChi"
  | "satDwoenBeot"
  | "akHanMal"
  | "yeonGoJaengToo"
  | "gongGeumBumYong"
  | "geumJeonYeoSoo"
  | "yeonGoHeupYeon";
export interface TeukSinGeup {
  name: TeukSinGeupItems;
  count: number;
}

export type BeopMaSangJeonGeupItems =
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
export interface BeopMaSangJeonGeup {
  name: BeopMaSangJeonGeupItems;
  count: number;
}

export interface GyeMoon {
  boTongGeup: BoTongGeup[];
  teukSinGeup: TeukSinGeup[];
  beopMaSangJeonGeup: BeopMaSangJeonGeup[];
}
