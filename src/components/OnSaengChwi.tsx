"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";
import type { OnSaengChwi, GyoDangNaeWang, YooMooNyum } from "@/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ChartInsideSheet from "./ChartInsideSheet";
import { fakeLineChartData, fakeYooMooNyumData } from "public/data/FakeChartData";
import ChartSheet from "./ChartSheet";

export default function OnSaengChwi() {
  const today = format(new Date(), "yyyy-MM-dd");
  const {
    onSaengChwi,
    newName,
    setNewName,
    addOnSaengChwi,
    removeOnSaengChwi,
    updateOnSaengChwi,
    updateOnSaengChwiName, // 새로 추가된 이름 변경 메서드
    miRiJoonBi,
    updateMiRiJoonBi,
    gyoDangNaeWang,
    updateGyoDangNaeWang,
  } = useSangSiIlGiStore();

  // 신규 추가용 드로어 열림 여부
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  // 이름 변경용 드로어 열림 여부 + 변경 대상 인덱스
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const gyoKeys: Array<
    keyof Pick<GyoDangNaeWang, "gongBooMoonDap" | "gamGakGamJeong" | "euSimHaeOh">
  > = ["gongBooMoonDap", "gamGakGamJeong", "euSimHaeOh"];
  const gyoLabels: Record<(typeof gyoKeys)[number], string> = {
    gongBooMoonDap: "공부문답",
    gamGakGamJeong: "감각감정",
    euSimHaeOh: "의심해오",
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-xl text-center">{today}</h2>

      {/* 온생취 카드 */}
      <Card>
        <CardContent className="space-y-4">
          <div className="text-center font-semibold">
            <ChartSheet label="온생취" data={fakeLineChartData} />
          </div>
          {onSaengChwi.map((entry: OnSaengChwi, idx: number) => (
            <div key={idx} className="flex items-center justify-between">
              {/* 이름 또는 기본 레이블 */}
              <span className="min-w-[3rem] font-medium text-left">
                {idx > 0 ? entry.name : "기본"}
              </span>

              {/* 유념/무념 및 메뉴 버튼 그룹 */}
              <div className="flex items-center space-x-2">
                <span className="min-w-[4rem] text-right">有念 {entry.yooNyum}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    // 항상 해당 항목을 +1 한다.
                    updateOnSaengChwi(idx, { yooNyum: 1 });
                    // 만약 기본(idx=0)이 아니라면, 기본에도 +1 추가
                    if (idx !== 0) {
                      updateOnSaengChwi(0, { yooNyum: 1 });
                    }
                  }}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>

                <span className="min-w-[4rem] text-right">無念 {entry.mooNyum}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    // 항상 해당 항목을 +1 한다.
                    updateOnSaengChwi(idx, { yooNyum: 1 });
                    // 만약 기본(idx=0)이 아니라면, 기본에도 +1 추가
                    if (idx !== 0) {
                      updateOnSaengChwi(0, { mooNyum: 1 });
                    }
                  }}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>

                {/* Kebab 메뉴(⋮) : 삭제/변경 옵션 제공 */}
                {idx > 0 ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <DotsVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* 이름 변경 */}
                      <DropdownMenuItem
                        onSelect={() => {
                          setEditIndex(idx);
                          setIsEditDrawerOpen(true);
                        }}
                      >
                        변경
                      </DropdownMenuItem>
                      {/* 삭제 */}
                      <DropdownMenuItem onSelect={() => removeOnSaengChwi(idx)}>
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span className="w-10" />
                )}
              </div>
            </div>
          ))}

          {/* ──────────────────────────────── */}
          {/* “신규 추가” Drawer */}
          <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
            <div className="flex justify-center">
              <DrawerTrigger asChild>
                <Button size="sm" variant="outline">
                  추가
                </Button>
              </DrawerTrigger>
            </div>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-lg font-semibold">새 온생취 추가</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <Input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && newName.trim()) {
                      addOnSaengChwi();
                      setIsAddDrawerOpen(false);
                    }
                  }}
                  placeholder="이름 입력"
                  className="w-full"
                />
              </div>
              <DrawerFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    addOnSaengChwi();
                    setIsAddDrawerOpen(false);
                  }}
                  disabled={!newName.trim()}
                >
                  저장
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {/* ──────────────────────────────── */}

          {/* ──────────────────────────────── */}
          {/* “이름 변경” Drawer */}
          {editIndex !== null && (
            <Drawer
              open={isEditDrawerOpen}
              onOpenChange={open => {
                setIsEditDrawerOpen(open);
                if (!open) setEditIndex(null);
              }}
            >
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-lg font-semibold">이름 변경</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <Input
                    type="text"
                    value={onSaengChwi[editIndex].name}
                    onChange={e => updateOnSaengChwiName(editIndex, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        setIsEditDrawerOpen(false);
                        setEditIndex(null);
                      }
                    }}
                    placeholder="새 이름 입력"
                    className="w-full"
                  />
                </div>
                <DrawerFooter>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsEditDrawerOpen(false);
                      setEditIndex(null);
                    }}
                  >
                    저장
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          {/* ──────────────────────────────── */}
        </CardContent>
      </Card>

      {/* 미리준비 카드 */}
      <Card>
        <CardContent className="space-y-4">
          <div className="text-center font-semibold">
            <ChartSheet label="미리준비" data={fakeLineChartData} />
          </div>
          <div className="flex items-center justify-between">
            <span>有念 {miRiJoonBi.yooNyum}</span>
            <Button size="icon" variant="outline" onClick={() => updateMiRiJoonBi({ yooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>無念 {miRiJoonBi.mooNyum}</span>
            <Button size="icon" variant="outline" onClick={() => updateMiRiJoonBi({ mooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 교당내왕 카드 */}

      <Card>
        <CardContent className="space-y-6">
          <div className="text-center font-semibold">
            <ChartSheet label="교당내왕시 주의사항" data={fakeLineChartData} />
          </div>
          {gyoKeys.map(key => {
            const val = gyoDangNaeWang[key] as YooMooNyum;
            return (
              <div key={key} className="flex items-center justify-between">
                <span>{gyoLabels[key]}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      updateGyoDangNaeWang({
                        ...gyoDangNaeWang,
                        [key]: { yooNyum: val.yooNyum + 1, mooNyum: val.mooNyum },
                      })
                    }
                  >
                    <PlusIcon className="h-4 w-4 text-green-600" />
                  </Button>
                  <span>有念 {val.yooNyum}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      updateGyoDangNaeWang({
                        ...gyoDangNaeWang,
                        [key]: { yooNyum: val.yooNyum, mooNyum: val.mooNyum + 1 },
                      })
                    }
                  >
                    <PlusIcon className="h-4 w-4 text-green-600" />
                  </Button>
                  <span>無念 {val.mooNyum}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
