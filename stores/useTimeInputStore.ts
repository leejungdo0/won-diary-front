import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 입력 항목 목록 (TimeInput.tsx와 별개 정의하여 순환 참조 방지)
const TIME_INPUT_ITEMS = [
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
];

interface ExtraTimeState {
  extraTimes: Record<string, number>;
  tableMode: boolean;
  setTime: (item: string, minutes: number) => void;
  setTableMode: (mode: boolean) => void;
  resetTimes: () => void;
}

export const useExtraTimeStore = create<ExtraTimeState>()(
  persist(
    set => ({
      // 초기화: 모든 항목을 0으로 세팅
      extraTimes: TIME_INPUT_ITEMS.reduce(
        (acc, item) => ({ ...acc, [item]: 0 }),
        {} as Record<string, number>
      ),
      tableMode: false,

      setTime: (item, minutes) =>
        set(state => ({
          extraTimes: { ...state.extraTimes, [item]: minutes },
        })),

      setTableMode: mode => set(() => ({ tableMode: mode })),

      resetTimes: () =>
        set(() => ({
          extraTimes: TIME_INPUT_ITEMS.reduce(
            (acc, item) => ({ ...acc, [item]: 0 }),
            {} as Record<string, number>
          ),
        })),
    }),
    {
      name: "extra-times",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
