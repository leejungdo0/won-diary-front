"use client";

import React from "react";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";
import { formatTime, getTodayDateString } from "../lib/utils";
import { MAX_TOTAL } from "@/constants";
import { clampTime } from "@/lib/utils";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";

// EXTRA_ITEMS와 그 타입 정의
export const EXTRA_ITEMS = [
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
export type ExtraItem = (typeof EXTRA_ITEMS)[number];

interface TableProps {
  extraTimes: Record<ExtraItem, number>;
  onTableChange: (item: ExtraItem, total: number) => void;
}
const ExtraTimeTable: React.FC<TableProps> = ({ extraTimes, onTableChange }) => {
  const studyKeys: ExtraItem[] = ["경전", "법규", "강연"];
  const studyExtra = studyKeys.reduce((sum, key) => sum + (extraTimes[key] || 0), 0);
  const rawTotal = Object.values(extraTimes).reduce((sum, t) => sum + t, 0);
  const totalTime = Math.min(rawTotal, MAX_TOTAL);
  const sleepTime = extraTimes["수면"] || 0;
  const netTime = Math.max(totalTime - sleepTime, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left w-50">항목</th>
            <th className="border p-2 text-left w-30">시간(시)</th>
            <th className="border p-2 text-left w-30">시간(분)</th>
            <th className="border p-2 text-left w-50">총합</th>
          </tr>
        </thead>
        <tbody>
          {EXTRA_ITEMS.map(item => {
            const base = extraTimes[item] || 0;
            const total = item === "학습" ? base + studyExtra : base;
            const hours = Math.floor(total / 60);
            const mins = total % 60;
            return (
              <tr key={item} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{item}</td>
                <td className="border p-2 w-16">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={hours === 0 ? "" : hours}
                    onChange={e => {
                      const h = parseInt(e.target.value, 10) || 0;
                      const newTotal = h * 60 + mins;
                      const newBase = item === "학습" ? newTotal - studyExtra : newTotal;
                      onTableChange(item, clampTime(item, newBase, extraTimes));
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2 w-16">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={mins === 0 ? "" : mins}
                    onChange={e => {
                      const m = parseInt(e.target.value, 10) || 0;
                      const newTotal = hours * 60 + m;
                      const newBase = item === "학습" ? newTotal - studyExtra : newTotal;
                      onTableChange(item, clampTime(item, newBase, extraTimes));
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">{formatTime(total)}</td>
              </tr>
            );
          })}
          <tr>
            <td className="border p-2 font-medium" colSpan={3}>
              전체 합계
            </td>
            <td className="border p-2 font-medium">{formatTime(totalTime)}</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium" colSpan={3}>
              전체 합계 - 수면
            </td>
            <td className="border p-2 font-medium">{formatTime(netTime)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface SliderProps {
  extraTimes: Record<ExtraItem, number>;
  onSliderChange: (item: ExtraItem, total: number) => void;
}
const ExtraTimeSlider: React.FC<SliderProps> = ({ extraTimes, onSliderChange }) => {
  const studyKeys: ExtraItem[] = ["경전", "법규", "강연"];
  const studyExtra = studyKeys.reduce((sum, key) => sum + (extraTimes[key] || 0), 0);
  const rawTotal = Object.values(extraTimes).reduce((sum, t) => sum + t, 0);
  const totalTime = Math.min(rawTotal, MAX_TOTAL);
  const sleepTime = extraTimes["수면"] || 0;
  const netTime = Math.max(totalTime - sleepTime, 0);

  const adjust = (item: ExtraItem, delta: number) => {
    const base = extraTimes[item] || 0;
    const newBase = clampTime(item, base + delta, extraTimes);
    onSliderChange(item, newBase);
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      {EXTRA_ITEMS.map(item => {
        const base = extraTimes[item] || 0;
        const total = item === "학습" ? base + studyExtra : base;
        return (
          <div key={item} className="rounded-xl bg-white shadow-sm p-4 border border-gray-200">
            <div className="flex justify-between mb-2">
              <Label className="text-base font-medium">{item}</Label>
              <span className="text-sm text-muted-foreground">{formatTime(total)}</span>
            </div>
            <input
              id={item}
              type="range"
              min={0}
              max={item === "학습" ? 720 + studyExtra : 720}
              step={5}
              value={item === "학습" ? base + studyExtra : base}
              onChange={e => adjust(item, parseInt(e.target.value, 10))}
              className="w-full h-8 accent-blue-500"
            />
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => adjust(item, -60)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                -1시간
              </button>
              <button
                onClick={() => adjust(item, -10)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                -10분
              </button>
              <button
                onClick={() => adjust(item, -5)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                -5분
              </button>
              <button
                onClick={() => adjust(item, 5)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                +5분
              </button>
              <button
                onClick={() => adjust(item, 10)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                +10분
              </button>
              <button
                onClick={() => adjust(item, 60)}
                className="px-3 py-1 text-sm bg-gray-100 rounded"
              >
                +1시간
              </button>
            </div>
          </div>
        );
      })}
      <div className="pt-4 border-t mt-4 space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>전체 합계</span>
          <span>{formatTime(totalTime)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span>전체 합계 - 수면</span>
          <span>{formatTime(netTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default function TimeInput() {
  // Zustand store에서 상태를 가져옵니다.
  const extraTimes = useSangSiIlGiStore(state => state.extraTimes);
  const tableMode = useSangSiIlGiStore(state => state.tableMode);
  const setExtraTime = useSangSiIlGiStore(state => state.setTime);
  const setTableMode = useSangSiIlGiStore(state => state.setTableMode);

  // 초기화 로직: 날짜 변경 시 store 내 값을 초기화합니다.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const lastClearDate = localStorage.getItem("lastClearDate");
    const today = getTodayDateString();
    if (lastClearDate !== today) {
      useSangSiIlGiStore.getState().resetTimes();
      localStorage.setItem("lastClearDate", today);
    }
  }, []);

  const handleTableChange = (item: ExtraItem, base: number) => {
    const newBase = clampTime(item, base, extraTimes);
    setExtraTime(item, newBase);
  };

  const handleSliderChange = (item: ExtraItem, base: number) => {
    const newBase = clampTime(item, base, extraTimes);
    setExtraTime(item, newBase);
  };

  return (
    <div className="w-full py-6 space-y-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">표에서 입력 모드</Label>
          <Switch checked={tableMode} onCheckedChange={setTableMode} />
        </div>
        {tableMode ? (
          <ExtraTimeTable extraTimes={extraTimes} onTableChange={handleTableChange} />
        ) : (
          <ExtraTimeSlider extraTimes={extraTimes} onSliderChange={handleSliderChange} />
        )}
      </div>
    </div>
  );
}
