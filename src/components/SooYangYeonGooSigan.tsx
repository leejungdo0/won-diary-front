"use client";

import React from "react";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";
import { formatTime, clampTime } from "../lib/utils";
import { MAX_TOTAL } from "@/constants";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";
import { Button } from "./ui/button";
import { SOO_YANG_YEON_GU_ITEMS } from "@/types";
import { Card, CardContent } from "./ui/card";

// 수양연구시간 키 배열
const SOOYANG_KEYS = [
  "gyungJeon",
  "beopGyoo",
  "gangYeon",
  "hwoeHwa",
  "euDoo",
  "seongRi",
  "yeomBool",
  "jwaSeon",
  "giDo",
] as const;

type SooYangKey = (typeof SOOYANG_KEYS)[number];

export default function SooYangSiGanTable() {
  // Zustand에서 수양연구시간 상태와 업데이트 함수를 가져옵니다
  const sooYang = useSangSiIlGiStore(state => state.sooYangYeonGooSiGan);
  const setSooYang = useSangSiIlGiStore(state => state.setSooYangTime);
  const setJakEop = useSangSiIlGiStore(state => state.setJakEopTime);
  const jakEop = useSangSiIlGiStore(state => state.jakEopSiGan);
  const tableMode = useSangSiIlGiStore(state => state.tableMode);
  const setTableMode = useSangSiIlGiStore(state => state.setTableMode);

  // Flatten minutes values for clampTime
  const extraTimes: Record<SooYangKey, number> = SOOYANG_KEYS.reduce(
    (acc, key) => ({
      ...acc,
      [key]: sooYang[key]?.minuteSpent || 0,
    }),
    {} as Record<SooYangKey, number>
  );

  // Calculate total minutes
  const rawTotal = SOOYANG_KEYS.reduce((sum, key) => sum + (sooYang[key]?.minuteSpent || 0), 0);
  const totalTime = Math.min(rawTotal, MAX_TOTAL);

  const handleChange = (key: SooYangKey, minutes: number) => {
    const prev = sooYang[key]?.minuteSpent || 0;
    const clamped = clampTime(key, minutes, extraTimes as Record<string, number>);
    setSooYang(key, clamped);

    // 변경량(delta) 계산: 음수면 감소, 양수면 증가
    const delta = clamped - prev;
    if (["gyungJeon", "beopGyoo", "gangYeon"].includes(key)) {
      const prevHakSeup = jakEop["hakSeup"].minuteSpent || 0;
      setJakEop("hakSeup", prevHakSeup + delta);
    }
  };

  const adjustMinute = (key: SooYangKey, delta: number) => {
    const current = sooYang[key]?.minuteSpent || 0;
    handleChange(key, current + delta);
  };

  return (
    <div className="w-full py-6 space-y-6">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex items-right justify-between">
          <div className="flex items-center gap-2">
            <span>수양연구시간</span> <span>{formatTime(totalTime)}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Label className="text-sm font-medium">테이블 입력</Label>
            <Switch checked={tableMode} onCheckedChange={setTableMode} />
          </div>
        </div>
        {tableMode ? (
          // Table mode
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
                {SOOYANG_KEYS.map(key => {
                  const base = sooYang[key]?.minuteSpent || 0;
                  const hours = Math.floor(base / 60);
                  const mins = base % 60;

                  const onHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const h = parseInt(e.target.value, 10) || 0;
                    handleChange(key, h * 60 + mins);
                  };

                  const onMinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const m = parseInt(e.target.value, 10) || 0;
                    handleChange(key, hours * 60 + m);
                  };

                  return (
                    <tr key={key} className="odd:bg-white even:bg-gray-50">
                      <td className="border p-2 capitalize">{SOO_YANG_YEON_GU_ITEMS[key]}</td>
                      <td className="border p-2 w-16">
                        <input
                          type="text"
                          min={0}
                          value={hours ? hours : ""}
                          onChange={onHoursChange}
                          className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="border p-2 w-16">
                        <input
                          type="text"
                          min={0}
                          max={59}
                          value={mins ? mins : ""}
                          onChange={onMinsChange}
                          className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="border p-2">{formatTime(base)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="border p-2 font-semibold" colSpan={3}>
                    합계
                  </td>
                  <td className="border p-2 font-semibold">{formatTime(totalTime)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          // Single row with buttons
          <div className="space-y-4">
            {SOOYANG_KEYS.map(key => {
              const base = sooYang[key]?.minuteSpent || 0;
              return (
                <Card key={key}>
                  <CardContent className="spaace-y-4">
                    <div key={key} className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-md font-semibold">{SOO_YANG_YEON_GU_ITEMS[key]}</span>
                        <span className="text-md font-semibold">{formatTime(base)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, -60)}
                          className="flex-1 px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          -1시간
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, -10)}
                          className="px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          -10분
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, -5)}
                          className="px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          -5분
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, 5)}
                          className="px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          +5분
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, 10)}
                          className="px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          +10분
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => adjustMinute(key, 60)}
                          className="flex-1 px-1 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                          +1시간
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <div className="pt-4 border-t border-gray-300">
              <div className="flex justify-between font-medium">
                <div>합계</div>
                <div className="text-lg font-semi-bold">{formatTime(totalTime)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
