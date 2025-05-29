import create from "zustand";
import { persist } from "zustand/middleware";
import { EXTRA_ITEMS } from "@/components/TimeInput"; // 실제 경로 조정
import { clampTime } from "@/lib/utils";

// 초깃값 생성 함수
const getInitialTimes = (): Record<string, number> => {
  const o: Record<string, number> = {};
  EXTRA_ITEMS.forEach(item => {
    o[item] = 0;
  });
  return o;
};

type ExtraTimeState = {
  extraTimes: Record<string, number>;
  tableMode: boolean;
  setTime: (item: string, value: number) => void;
  setTableMode: (mode: boolean) => void;
  resetTimes: () => void;
};

export const useExtraTimeStore = create<ExtraTimeState>()(
  persist(
    (set, get) => ({
      extraTimes: getInitialTimes(),
      tableMode: false,

      setTime: (item, value) => {
        const prev = get().extraTimes;
        const clamped = clampTime(item, value, prev);
        set({ extraTimes: { ...prev, [item]: clamped } });
      },

      setTableMode: mode => set({ tableMode: mode }),

      resetTimes: () => set({ extraTimes: getInitialTimes() }),
    }),
    {
      name: "extra-time-storage", // localStorage 키
      getStorage: () => localStorage,
    }
  )
);
