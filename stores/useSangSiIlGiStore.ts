import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type SangSiIlGi,
  type OnSaengChwi,
  type YooMooNyum,
  type GyoDangNaeWang,
  type BoTongGeupItem,
  type TeukSinGeupItem,
  type BeopMaSangJeonGeupItem,
  BoTongGeupObj,
  TeukSinGeupObj,
  BeopMaSangJeonGeupObj,
  BoTongGeupCounts,
  TeukSinGeupCounts,
  BeopMaSangJeonGeupCounts,
} from "@/types";
import { ExtraItem } from "@/components/TimeInput";
import { ChartPoint } from "@/components/ChartInsideSheet";

// Extra Time 입력 항목 (TimeInput.tsx와 순환 참조 방지 위해 별도 정의)
export const TIME_INPUT_ITEMS = [
  "경전",
  "법규",
  "강연",
  "회화",
  "의두",
  "성리",
  "염불",
  "좌선",
  "기도",
  "학습",
  "봉공",
  "휴식",
  "수면",
  "허송",
] as const;

// 예시 초기값 (mock 데이터)
export const exampleChartData: Record<ExtraItem, ChartPoint[]> = {
  경전: [
    { date: "2025-05-25", value: 120 },
    { date: "2025-05-26", value: 150 },
    { date: "2025-05-27", value: 90 },
    { date: "2025-05-28", value: 180 },
    { date: "2025-05-29", value: 200 },
    { date: "2025-05-30", value: 160 },
    { date: "2025-05-31", value: 140 },
  ],
  법규: [
    { date: "2025-05-25", value: 60 },
    { date: "2025-05-26", value: 80 },
    { date: "2025-05-27", value: 100 },
    { date: "2025-05-28", value: 120 },
    { date: "2025-05-29", value: 110 },
    { date: "2025-05-30", value: 130 },
    { date: "2025-05-31", value: 90 },
  ],
  강연: [
    { date: "2025-05-25", value: 30 },
    { date: "2025-05-26", value: 45 },
    { date: "2025-05-27", value: 50 },
    { date: "2025-05-28", value: 70 },
    { date: "2025-05-29", value: 60 },
    { date: "2025-05-30", value: 55 },
    { date: "2025-05-31", value: 65 },
  ],
  회화: [
    { date: "2025-05-25", value: 20 },
    { date: "2025-05-26", value: 25 },
    { date: "2025-05-27", value: 30 },
    { date: "2025-05-28", value: 35 },
    { date: "2025-05-29", value: 40 },
    { date: "2025-05-30", value: 45 },
    { date: "2025-05-31", value: 50 },
  ],
  의두: [
    { date: "2025-05-25", value: 10 },
    { date: "2025-05-26", value: 15 },
    { date: "2025-05-27", value: 20 },
    { date: "2025-05-28", value: 25 },
    { date: "2025-05-29", value: 30 },
    { date: "2025-05-30", value: 35 },
    { date: "2025-05-31", value: 40 },
  ],
  성리: [], // 데이터가 없으면 빈 배열 가능
  염불: [],
  좌선: [],
  기도: [],
  학습: [],
  봉공: [],
  휴식: [],
  수면: [],
  허송: [],
};

export type TimeInputItem = (typeof TIME_INPUT_ITEMS)[number];

interface SangSiIlGiStore extends SangSiIlGi {
  newName: string;
  setNewName: (name: string) => void;
  addOnSaengChwi: () => void;
  removeOnSaengChwi: (index: number) => void;
  updateOnSaengChwi: (index: number, delta: Partial<OnSaengChwi>) => void;
  updateOnSaengChwiName: (index: number, newName: string) => void;
  updateMiRiJoonBi: (delta: Partial<YooMooNyum>) => void;
  updateGyoDangNaeWang: (newVal: GyoDangNaeWang) => void;
  setBoTongCount: (name: BoTongGeupItem, count: number) => void;
  setTeukSinCount: (name: TeukSinGeupItem, count: number) => void;
  setBeopMaCount: (name: BeopMaSangJeonGeupItem, count: number) => void;
  resetGyeMoon: () => void;
  // Extra Time 관련 상태 및 액션
  extraTimes: Record<TimeInputItem, number>;
  tableMode: boolean;
  setTime: (item: TimeInputItem, minutes: number) => void;
  setTableMode: (mode: boolean) => void;
  resetTimes: () => void;
  chartData?: Record<ExtraItem, ChartPoint[]>;
}

// 계문 초기 배열 생성
const initialBoTong: BoTongGeupCounts[] = Object.keys(BoTongGeupObj).map(name => ({
  name: name as BoTongGeupItem,
  count: 0,
}));
const initialTeukSin: TeukSinGeupCounts[] = Object.keys(TeukSinGeupObj).map(name => ({
  name: name as TeukSinGeupItem,
  count: 0,
}));
const initialBeopMa: BeopMaSangJeonGeupCounts[] = Object.keys(BeopMaSangJeonGeupObj).map(name => ({
  name: name as BeopMaSangJeonGeupItem,
  count: 0,
}));

// Extra Time 초기값
const initialExtraTimes: Record<TimeInputItem, number> = TIME_INPUT_ITEMS.reduce(
  (acc, item) => ({ ...acc, [item]: 0 }),
  {} as Record<TimeInputItem, number>
);

export const useSangSiIlGiStore = create<SangSiIlGiStore>()(
  persist(
    (set, get) => ({
      // 온생취
      onSaengChwi: [{ name: "default", yooNyum: 0, mooNyum: 0 }],
      miRiJoonBi: { yooNyum: 0, mooNyum: 0 },
      study: {
        gyungJeon: { minuteSpent: 0 },
        beopGyoo: { minuteSpent: 0 },
        gangYeon: { minuteSpent: 0 },
      },
      saRiYeonGoo: {
        hwoeHwa: { minuteSpent: 0 },
        euDoo: { minuteSpent: 0 },
        seongRi: { minuteSpent: 0 },
      },
      jungSinSooYang: {
        yeonBool: { minuteSpent: 0 },
        jwaSon: { minuteSpent: 0 },
        giDoh: { minuteSpent: 0 },
        chamHwoeBanSeong: { yooNyum: 0, mooNyum: 0 },
      },
      gyoDangNaeWang: {
        gongBooMoonDap: { yooNyum: 0, mooNyum: 0 },
        gamGakGamJeong: { yooNyum: 0, mooNyum: 0 },
        euSimHaeOh: { yooNyum: 0, mooNyum: 0 },
        sonGiIpSeon: false,
        yeHwoeJeonSim: false,
        soDeukBanJo: false,
      },
      jakEopSiGan: {
        hakSeup: { minuteSpent: 0 },
        bongGong: { minuteSpent: 0 },
        hyooSik: { minuteSpent: 0 },
        sooMyeon: { minuteSpent: 0 },
        heoSong: { minuteSpent: 0 },
      },
      // 계문
      gyeMoon: {
        boTongGeup: initialBoTong,
        teukSinGeup: initialTeukSin,
        beopMaSangJeonGeup: initialBeopMa,
      },
      // Extra Time
      extraTimes: initialExtraTimes,
      tableMode: false,

      // 온생취 이름
      newName: "",
      setNewName: name => set({ newName: name }),
      addOnSaengChwi: () => {
        const name = get().newName.trim();
        if (!name) return;
        set(state => ({
          onSaengChwi: [
            state.onSaengChwi[0],
            ...state.onSaengChwi.slice(1).filter(item => item.name),
            { name, yooNyum: 0, mooNyum: 0 },
          ],
          newName: "",
        }));
      },
      removeOnSaengChwi: index =>
        set(state => {
          if (index === 0) return state;
          const list = state.onSaengChwi.filter((_, i) => i !== index);
          return { onSaengChwi: list.length ? list : [state.onSaengChwi[0]] };
        }),
      updateOnSaengChwi: (index, delta) =>
        set(state => ({
          onSaengChwi: state.onSaengChwi.map((item, i) =>
            i === index
              ? {
                  ...item,
                  yooNyum: item.yooNyum + (delta.yooNyum ?? 0),
                  mooNyum: item.mooNyum + (delta.mooNyum ?? 0),
                }
              : item
          ),
        })),
      updateOnSaengChwiName: (index, newName) =>
        set(state => ({
          onSaengChwi: state.onSaengChwi.map((item, i) =>
            i === index
              ? {
                  // 이름만 바꿀 수 있도록, 기존 name → 새 name
                  name: newName,
                  yooNyum: item.yooNyum,
                  mooNyum: item.mooNyum,
                }
              : item
          ),
        })),
      updateMiRiJoonBi: delta =>
        set(state => {
          const newMi = {
            yooNyum: state.miRiJoonBi.yooNyum + (delta.yooNyum ?? 0),
            mooNyum: state.miRiJoonBi.mooNyum + (delta.mooNyum ?? 0),
          };
          return {
            miRiJoonBi: newMi,
            onSaengChwi: state.onSaengChwi.map((item, i) =>
              i === 0
                ? {
                    ...item,
                    yooNyum: item.yooNyum + (delta.yooNyum ?? 0),
                    mooNyum: item.mooNyum + (delta.mooNyum ?? 0),
                  }
                : item
            ),
          };
        }),
      updateGyoDangNaeWang: newVal =>
        set(state => {
          const old = state.gyoDangNaeWang;
          const dy =
            newVal.gongBooMoonDap.yooNyum -
            old.gongBooMoonDap.yooNyum +
            newVal.gamGakGamJeong.yooNyum -
            old.gamGakGamJeong.yooNyum +
            newVal.euSimHaeOh.yooNyum -
            old.euSimHaeOh.yooNyum;
          const dm =
            newVal.gongBooMoonDap.mooNyum -
            old.gongBooMoonDap.mooNyum +
            newVal.gamGakGamJeong.mooNyum -
            old.gamGakGamJeong.mooNyum +
            newVal.euSimHaeOh.mooNyum -
            old.euSimHaeOh.mooNyum;
          return {
            gyoDangNaeWang: newVal,
            onSaengChwi: state.onSaengChwi.map((it, idx) =>
              idx === 0 ? { ...it, yooNyum: it.yooNyum + dy, mooNyum: it.mooNyum + dm } : it
            ),
          };
        }),
      setBoTongCount: (name, count) =>
        set(state => ({
          gyeMoon: {
            ...state.gyeMoon,
            boTongGeup: state.gyeMoon.boTongGeup.map(item =>
              item.name === name ? { ...item, count } : item
            ),
          },
        })),
      setTeukSinCount: (name, count) =>
        set(state => ({
          gyeMoon: {
            ...state.gyeMoon,
            teukSinGeup: state.gyeMoon.teukSinGeup.map(item =>
              item.name === name ? { ...item, count } : item
            ),
          },
        })),
      setBeopMaCount: (name, count) =>
        set(state => ({
          gyeMoon: {
            ...state.gyeMoon,
            beopMaSangJeonGeup: state.gyeMoon.beopMaSangJeonGeup.map(item =>
              item.name === name ? { ...item, count } : item
            ),
          },
        })),
      resetGyeMoon: () =>
        set(() => ({
          gyeMoon: {
            boTongGeup: initialBoTong,
            teukSinGeup: initialTeukSin,
            beopMaSangJeonGeup: initialBeopMa,
          },
        })),
      setTime: (item, minutes) =>
        set(state => ({ extraTimes: { ...state.extraTimes, [item]: minutes } })),
      setTableMode: mode => set(() => ({ tableMode: mode })),
      resetTimes: () => set(() => ({ extraTimes: initialExtraTimes })),
    }),
    { name: "sangSiIlGi", storage: createJSONStorage(() => localStorage) }
  )
);
