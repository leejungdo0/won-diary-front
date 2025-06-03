import type { YooMooNyum } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 온전 생각 취사 및 미리준비 상태 타입
interface OnSaengChwiState {
  onSaengChwi: YooMooNyum;
  miRiJoonBi: YooMooNyum;
  updateYooMooNyum: (delta: Partial<YooMooNyum>) => void;
  updateMiRiJoonBi: (delta: Partial<YooMooNyum>) => void;
  resetAll: () => void;
  clearStorage: () => void;
}

// Zustand 스토어 생성 및 로컬 스토리지에 영구 저장
export const useOnSaengChwiStore = create<OnSaengChwiState>()(
  persist(
    set => ({
      // 초기 상태
      onSaengChwi: { yooNyum: 0, mooNyum: 0 },
      miRiJoonBi: { yooNyum: 0, mooNyum: 0 },

      // 온전 생각 취사 유·무념 증감
      updateYooMooNyum: delta =>
        set(state => ({
          onSaengChwi: {
            yooNyum: state.onSaengChwi.yooNyum + (delta.yooNyum ?? 0),
            mooNyum: state.onSaengChwi.mooNyum + (delta.mooNyum ?? 0),
          },
        })),

      // 미리준비 유·무념 증감 및 온전 생각에 합산
      updateMiRiJoonBi: delta =>
        set(state => ({
          miRiJoonBi: {
            yooNyum: state.miRiJoonBi.yooNyum + (delta.yooNyum ?? 0),
            mooNyum: state.miRiJoonBi.mooNyum + (delta.mooNyum ?? 0),
          },
          onSaengChwi: {
            yooNyum: state.onSaengChwi.yooNyum + (delta.yooNyum ?? 0),
            mooNyum: state.onSaengChwi.mooNyum + (delta.mooNyum ?? 0),
          },
        })),

      // 전체 초기화
      resetAll: () =>
        set({
          onSaengChwi: { yooNyum: 0, mooNyum: 0 },
          miRiJoonBi: { yooNyum: 0, mooNyum: 0 },
        }),

      // 로컬 스토리지 삭제 후 새로고침
      clearStorage: () => {
        localStorage.removeItem("onSaengChwi");
        window.location.reload();
      },
    }),
    {
      name: "onSaengChwi",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
