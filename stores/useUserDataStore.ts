import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserData, UserSettings } from "@/types";

// 초기값 정의
const initialData: UserData = {
  date: new Date().toISOString().slice(0, 10), // 오늘 날짜 YYYY-MM-DD
  settings: {
    isTableMode: false,
    lastOpenTab: "bo",
  } as UserSettings,
};

type UserDataState = UserData & {
  /** UserData 전체를 업데이트합니다 */
  updateData: (updater: (prev: UserData) => UserData) => void;
  /** lastOpenTab만 변경합니다 */
  setLastOpenTab: (tab: UserSettings["lastOpenTab"]) => void;
  /** 모든 값을 초기값으로 되돌립니다 */
  reset: () => void;
};

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set, get) => ({
      ...initialData,

      updateData: updater =>
        set(state => {
          const next = updater({
            date: state.date,
            settings: state.settings,
          });
          return next;
        }),

      setLastOpenTab: tab =>
        set(state => ({
          settings: { ...state.settings, lastOpenTab: tab },
        })),

      reset: () => set(() => ({ ...initialData })),
    }),
    {
      name: "user-data", // localStorage key
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);
