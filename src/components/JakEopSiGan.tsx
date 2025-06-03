"use client";

import React from "react";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";
import { formatTime, clampTime } from "../lib/utils";
import { MAX_TOTAL } from "@/constants";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";
import { JAK_EOP_SI_GAN_ITEMS } from "@/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// 작업시간 키 배열
const JAKEOP_KEYS = ["hakSeup", "bongGong", "hyooSik", "sooMyeon", "heoSong"] as const;

type JakEopKey = (typeof JAKEOP_KEYS)[number];

export default function JakEopSiGanTable() {
  // Zustand에서 작업시간 상태와 업데이트 함수를 가져옵니다
  const jakEop = useSangSiIlGiStore(state => state.jakEopSiGan);
  const setJakEop = useSangSiIlGiStore(state => state.setJakEopTime);
  const tableMode = useSangSiIlGiStore(state => state.tableMode);
  const setTableMode = useSangSiIlGiStore(state => state.setTableMode);

  // plain record of minutes for clampTime
  const extraTimes: Record<JakEopKey, number> = JAKEOP_KEYS.reduce(
    (acc, key) => ({
      ...acc,
      [key]: jakEop[key]?.minuteSpent || 0,
    }),
    {} as Record<JakEopKey, number>
  );

  // 전체 합계 계산
  const rawTotal = JAKEOP_KEYS.reduce((sum, key) => sum + (jakEop[key]?.minuteSpent || 0), 0);
  const totalTime = Math.min(rawTotal, MAX_TOTAL);

  const handleChange = (key: JakEopKey, minutes: number) => {
    const clamped = clampTime(key, minutes, extraTimes as Record<string, number>);
    setJakEop(key, clamped);
  };

  const adjustMinute = (key: JakEopKey, delta: number) => {
    const current = jakEop[key]?.minuteSpent || 0;
    handleChange(key, current + delta);
  };

  return (
    <div className="w-full py-6 space-y-6">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>작업시간</span> <span>{formatTime(totalTime)}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Label className="text-sm font-medium">테이블 입력</Label>
            <Switch checked={tableMode} onCheckedChange={setTableMode} />
          </div>
        </div>
        {tableMode ? (
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
                {JAKEOP_KEYS.map(key => {
                  const base = jakEop[key]?.minuteSpent || 0;
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
                      <td className="border p-2 capitalize">{JAK_EOP_SI_GAN_ITEMS[key]}</td>
                      <td className="border p-2 w-16">
                        <input
                          type="text"
                          min={0}
                          value={hours ? hours : ""}
                          onChange={onHoursChange}
                          className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2 w-16">
                        <input
                          type="text"
                          min={0}
                          max={59}
                          value={mins ? mins : ""}
                          onChange={onMinsChange}
                          className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2">{formatTime(base)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="border p-2 font-medium" colSpan={3}>
                    합계
                  </td>
                  <td className="border p-2 font-medium">{formatTime(totalTime)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            {JAKEOP_KEYS.map(key => {
              const base = jakEop[key]?.minuteSpent || 0;
              return (
                <Card key={key}>
                  <CardContent className="space-y-4">
                    <div key={key} className="flex flex-col spayce-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-md font-semibold">{JAK_EOP_SI_GAN_ITEMS[key]}</span>
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
