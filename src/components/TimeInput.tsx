"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";

export const EXTRA_ITEMS = [
  "경전", "법규", "강연", "회화", "의두", "성리", "염불", "좌선", "기도",
  "학습", "봉공", "휴식", "수면", "허송"
];

const getInitialTimes = () => {
  const initial: Record<string, number> = {};
  EXTRA_ITEMS.forEach(item => initial[item] = 0);
  return initial;
};

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  if (m === 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

// Table mode component
interface TableProps {
  extraTimes: Record<string, number>;
  onTableChange: (item: string, total: number) => void;
}
const ExtraTimeTable: React.FC<TableProps> = ({ extraTimes, onTableChange }) => {
  const studyKeys = ["경전", "법규", "강연"];
  const studyExtra = studyKeys.reduce((sum, key) => sum + (extraTimes[key] || 0), 0);
  const totalTime = Object.values(extraTimes).reduce((sum, t) => sum + t, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">항목</th>
            <th className="border p-2 text-left">시간(시)</th>
            <th className="border p-2 text-left">시간(분)</th>
            <th className="border p-2 text-left">총합</th>
          </tr>
        </thead>
        <tbody>
          {EXTRA_ITEMS.map(item => {
            const base = extraTimes[item] || 0;
            const total = item === "학습" ? base + studyExtra : base;
            const hours = Math.floor(total / 60);
            const mins = total % 60;
            return (
              <tr key={item}>
                <td className="border p-2">{item}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    min={0}
                    max={12}
                    value={hours}
                    onChange={e => {
                      const newTotal = (parseInt(e.target.value, 10) || 0) * 60 + mins;
                      const newBase = item === "학습" ? newTotal - studyExtra : newTotal;
                      onTableChange(item, Math.min(Math.max(newBase, 0), 720));
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={mins}
                    onChange={e => {
                      const newM = parseInt(e.target.value, 10) || 0;
                      const newTotal = hours * 60 + newM;
                      const newBase = item === "학습" ? newTotal - studyExtra : newTotal;
                      onTableChange(item, Math.min(Math.max(newBase, 0), 720));
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">{formatTime(total)}</td>
              </tr>
            );
          })}
          <tr>
            <td className="border p-2 font-medium" colSpan={3}>전체 합계</td>
            <td className="border p-2 font-medium">{formatTime(totalTime)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Slider mode component
interface SliderProps {
  extraTimes: Record<string, number>;
  onSliderChange: (item: string, total: number) => void;
}
const ExtraTimeSlider: React.FC<SliderProps> = ({ extraTimes, onSliderChange }) => {
  const studyKeys = ["경전", "법규", "강연"];
  const studyExtra = studyKeys.reduce((sum, key) => sum + (extraTimes[key] || 0), 0);

  return (
    <div className="space-y-4">
      {EXTRA_ITEMS.map(item => {
        const base = extraTimes[item] || 0;
        const total = item === "학습" ? base + studyExtra : base;
        return (
          <div key={item} className="rounded-xl bg-white shadow-sm p-4 space-y-2 border border-gray-200">
            <div className="flex items-center justify-between">
              <Label htmlFor={item} className="text-base font-medium">
                {item}
              </Label>
              <span className="text-sm text-muted-foreground">
                {formatTime(total)}
              </span>
            </div>
            <input
              id={item}
              type="range"
              min={0}
              max={item === "학습" ? 720 + studyExtra : 720}
              step={5}
              value={item === "학습" ? total : base}
              onChange={e => {
                const newTotal = parseInt(e.target.value, 10);
                const newBase = item === "학습" ? newTotal - studyExtra : newTotal;
                onSliderChange(item, Math.min(Math.max(newBase, 0), 720));
              }}
              className="w-full h-8 accent-blue-500"
            />
          </div>
        );
      })}
    </div>
  );
};

// Main component
export default function ExtraTimeInputCard() {
  const [extraTimes, setExtraTimes] = useState<Record<string, number>>(getInitialTimes);
  const [tableMode, setTableMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("extraTimes");
    const mode = localStorage.getItem("tableMode");
    if (stored) setExtraTimes(JSON.parse(stored));
    if (mode) setTableMode(JSON.parse(mode));
  }, []);

  useEffect(() => {
    localStorage.setItem("extraTimes", JSON.stringify(extraTimes));
  }, [extraTimes]);

  useEffect(() => {
    localStorage.setItem("tableMode", JSON.stringify(tableMode));
  }, [tableMode]);

  const handleTableChange = (item: string, base: number) => {
    setExtraTimes(prev => ({ ...prev, [item]: base }));
  };
  const handleSliderChange = (item: string, base: number) => {
    setExtraTimes(prev => ({ ...prev, [item]: base }));
  };

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">표에서 입력 모드</span>
          <Switch checked={tableMode} onCheckedChange={setTableMode} />
        </div>
        {tableMode ? (
          <ExtraTimeTable
            extraTimes={extraTimes}
            onTableChange={handleTableChange}
          />
        ) : (
          <ExtraTimeSlider
            extraTimes={extraTimes}
            onSliderChange={handleSliderChange}
          />
        )}
      </div>
    </div>
  );
}
