import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GyoDangNaeWang, YooMooNyum } from "@/types";
import { useOnSaengChwiStore } from "stores/useOnSaengChwiStore";

// 스토어 상태와 액션 정의
interface GyoDangNaeWangState extends GyoDangNaeWang {
  updateYooMooNyum: (
    key: keyof Pick<GyoDangNaeWang, "gongBooMoonDap" | "gamGakGamJeong" | "euSimHaeOh">,
    delta: Partial<YooMooNyum>
  ) => void;
  toggleChecked: (
    key: keyof Pick<GyoDangNaeWang, "sonGiIpSon" | "yeHwoeJeonSim" | "soDeukBanJo">
  ) => void;
  resetAll: () => void;
  clearStorage: () => void;
}

export const useGyoDangNaeWangStore = create<GyoDangNaeWangState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      gongBooMoonDap: { yooNyum: 0, mooNyum: 0 },
      gamGakGamJeong: { yooNyum: 0, mooNyum: 0 },
      euSimHaeOh: { yooNyum: 0, mooNyum: 0 },
      sonGiIpSon: false,
      yeHwoeJeonSim: false,
      soDeukBanJo: false,

      // 유·무념 증감 및 온전 생각 취사에 합산
      updateYooMooNyum: (key, delta) => {
        set(
          state =>
            ({
              [key]: {
                yooNyum: state[key].yooNyum + (delta.yooNyum ?? 0),
                mooNyum: state[key].mooNyum + (delta.mooNyum ?? 0),
              },
            }) as Pick<GyoDangNaeWangState, typeof key>
        );
        // OnSaengChwi에 합산
        useOnSaengChwiStore.getState().updateYooMooNyum(delta);
      },

      // 체크 박스 토글
      toggleChecked: key =>
        set(state => ({ [key]: !state[key] }) as Pick<GyoDangNaeWangState, typeof key>),

      // 전체 초기화
      resetAll: () =>
        set({
          gongBooMoonDap: { yooNyum: 0, mooNyum: 0 },
          gamGakGamJeong: { yooNyum: 0, mooNyum: 0 },
          euSimHaeOh: { yooNyum: 0, mooNyum: 0 },
          sonGiIpSon: false,
          yeHwoeJeonSim: false,
          soDeukBanJo: false,
        }),

      // 로컬 스토리지 삭제 후 새로고침
      clearStorage: () => {
        localStorage.removeItem("gyoDangNaeWang");
        window.location.reload();
      },
    }),
    {
      name: "gyoDangNaeWang",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
