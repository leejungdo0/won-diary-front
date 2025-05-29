// stores/useGyeMoonStore.ts
import {
  BeopMaSangJeonGeupCounts,
  BeopMaSangJeonGeupItem,
  BeopMaSangJeonGeupObj,
  BoTongGeupCounts,
  BoTongGeupItem,
  BoTongGeupObj,
  TeukSinGeupCounts,
  TeukSinGeupItem,
  TeukSinGeupObj,
} from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 아이템 리스트 상수 (타입 정의에 맞춰 작성)
const BOTONG_ITEMS = Object.keys(BoTongGeupObj) as BoTongGeupItem[];
const TEUKSIN_ITEMS = Object.keys(TeukSinGeupObj) as TeukSinGeupItem[];
const BEOPMA_ITEMS = Object.keys(BeopMaSangJeonGeupObj) as BeopMaSangJeonGeupItem[];

type GyeMoonState = {
  boTongGeup: BoTongGeupCounts;
  teukSinGeup: TeukSinGeupCounts;
  beopMaSangJeonGeup: BeopMaSangJeonGeupCounts;

  // 각 아이템의 카운트를 설정하는 함수들
  setBoTongCount: (name: BoTongGeupItem, count: number) => void;
  setTeukSinCount: (name: TeukSinGeupItem, count: number) => void;
  setBeopMaCount: (name: BeopMaSangJeonGeupItem, count: number) => void;
  reset: () => void;
};

export const useGyeMoonStore = create<GyeMoonState>()(
  persist(
    set => ({
      boTongGeup: BOTONG_ITEMS.reduce((acc, k) => ({ ...acc, [k]: 0 }), {} as BoTongGeupCounts),
      teukSinGeup: TEUKSIN_ITEMS.reduce((acc, k) => ({ ...acc, [k]: 0 }), {} as TeukSinGeupCounts),
      beopMaSangJeonGeup: BEOPMA_ITEMS.reduce(
        (acc, k) => ({ ...acc, [k]: 0 }),
        {} as BeopMaSangJeonGeupCounts
      ),

      setBoTongCount: (name, count) =>
        set(s => ({ boTongGeup: { ...s.boTongGeup, [name]: count } })),

      setTeukSinCount: (name, count) =>
        set(s => ({ teukSinGeup: { ...s.teukSinGeup, [name]: count } })),

      setBeopMaCount: (name, count) =>
        set(s => ({
          beopMaSangJeonGeup: { ...s.beopMaSangJeonGeup, [name]: count },
        })),

      reset: () =>
        set({
          boTongGeup: BOTONG_ITEMS.reduce((acc, k) => ({ ...acc, [k]: 0 }), {} as BoTongGeupCounts),
          teukSinGeup: TEUKSIN_ITEMS.reduce(
            (acc, k) => ({ ...acc, [k]: 0 }),
            {} as TeukSinGeupCounts
          ),
          beopMaSangJeonGeup: BEOPMA_ITEMS.reduce(
            (acc, k) => ({ ...acc, [k]: 0 }),
            {} as BeopMaSangJeonGeupCounts
          ),
        }),
    }),
    {
      name: "gye-moon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
