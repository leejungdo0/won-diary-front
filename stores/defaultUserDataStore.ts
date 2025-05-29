import { DefaultUserData } from "@/types";
import create from "zustand";
import { persist } from "zustand/middleware";

const initialData: DefaultUserData = {
  date: "2025-05-29",
  sangSiIlGi: {
    onSaengChwi: [
      { name: "집중호흡", yooNyum: 5, mooNyum: 2 },
      { name: "바디스캔", yooNyum: 3, mooNyum: 1 },
    ],
    miRiJoonBi: { yooNyum: 4, mooNyum: 0 },
    study: {
      gyungJeon: { minuteSpent: 30 },
      beopGyoo: { minuteSpent: 20 },
      gangYeon: { minuteSpent: 15 },
    },
    saRiYeonGoo: {
      hwoeHwa: { minuteSpent: 10 },
      euDoo: { minuteSpent: 5 },
      seongRi: { minuteSpent: 25 },
    },
    jungSinSooYang: {
      yeonBool: { minuteSpent: 12 },
      jwaSon: { minuteSpent: 40 },
      giDoh: { minuteSpent: 18 },
      chamHwoeBanSeong: { yooNyum: 2, mooNyum: 3 },
    },
  },
  gyoDangNaeWang: {
    gongBooMoonDap: { yooNyum: 6, mooNyum: 1 },
    gamGakGamJeong: { yooNyum: 2, mooNyum: 4 },
    euSimHaeOh: { yooNyum: 3, mooNyum: 2 },
    sonGiIpSon: { checked: true },
    yeHwoeJeonSim: { checked: false },
    soDeukBanJo: { checked: true },
  },
  gyemoon: {
    boTongGeup: [
      { name: "yeonGoSalSaeng", count: 1 },
      { name: "doDookJil", count: 0 },
      { name: "ganEum", count: 2 },
    ],
    teukSinGeup: [
      { name: "gongSaDanDok", count: 0 },
      { name: "taInGwa", count: 1 },
      { name: "noRaeChoom", count: 3 },
    ],
    beopMaSangJeonGeup: [
      { name: "ahManSim", count: 1 },
      { name: "yeonGoSaYook", count: 2 },
      { name: "tamSim", count: 2 },
    ],
  },
  jakEopSiGan: {
    hakSeup: { minuteSpent: 50 },
    bongGong: { minuteSpent: 30 },
    hyooSik: { minuteSpent: 20 },
    sooMyeon: { minuteSpent: 45 },
    heoSong: { minuteSpent: 10 },
  },
};

type State = {
  data: DefaultUserData;
  setData: (updater: (prev: DefaultUserData) => DefaultUserData) => void;
  reset: () => void;
};

export const useDefaultUserDataStore = create<State>()(
  persist(
    (set, get) => ({
      data: initialData,
      setData: updater => set(state => ({ data: updater(state.data) })),
      reset: () => set({ data: initialData }),
    }),
    {
      name: "default-user-data", // localStorage에 저장될 key
      getStorage: () => localStorage, // (기본값이 localStorage지만 명시해도 좋음)
      version: 1, // 나중에 스키마 변경 시 마이그레이트에 사용
      // migrate 등의 옵션을 추가로 설정할 수 있습니다.
    }
  )
);
