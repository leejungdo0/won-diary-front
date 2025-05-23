// components/ExtraTimeInputCard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";

export const EXTRA_ITEMS = [
  "경전", "법규", "강연", "회화", "의두", "성리", "염불", "좌선", "기도"
];

const getInitialTimes = () => {
  const initial: { [key: string]: string } = {};
  EXTRA_ITEMS.forEach(item => {
    initial[item] = "0";
  });
  return initial;
};

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  if (m === 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const formatTimeOnly = (minutes: number) => {
  const hours = (minutes / 60).toFixed(2);
  return `${hours}시간`;
};

export default function ExtraTimeInputCard() {
  const [extraTimes, setExtraTimes] = useState<{ [key: string]: string }>(getInitialTimes());
  const [timeOnlyMode, setTimeOnlyMode] = useState(false);

  const handleChange = (item: string, value: string) => {
    setExtraTimes((prev) => ({ ...prev, [item]: value }));
  };

  const increment = (item: string, step: number) => {
    const current = parseInt(extraTimes[item], 10) || 0;
    const next = Math.min(Math.max(current + step, 0), 720);
    setExtraTimes((prev) => ({ ...prev, [item]: String(next) }));
  };

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">시간만 보기 모드</span>
          <Switch checked={timeOnlyMode} onCheckedChange={setTimeOnlyMode} />
        </div>

        {EXTRA_ITEMS.map((item) => {
          const minutes = parseInt(extraTimes[item], 10) || 0;

          return (
            <div
              key={item}
              className="rounded-xl bg-white shadow-sm p-4 space-y-3 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <Label htmlFor={item} className="text-base font-medium">
                  {item}
                </Label>
                <span className="text-sm text-muted-foreground">
                  {minutes}분 ({timeOnlyMode ? formatTimeOnly(minutes) : formatTime(minutes)})
                </span>
              </div>

              <input
                id={item}
                type="range"
                min="0"
                max="720"
                step="5"
                value={minutes}
                onChange={(e) => handleChange(item, e.target.value)}
                className="w-full h-8 accent-blue-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 text-sm rounded bg-gray-100"
                  onClick={() => increment(item, -5)}
                >
                  -5분
                </button>
                <button
                  className="px-3 py-1 text-sm rounded bg-gray-100"
                  onClick={() => increment(item, 5)}
                >
                  +5분
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
