"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useOnSaengChwiStore } from "stores/useOnSaengChwiStore";
import { useGyoDangNaeWangStore } from "stores/useGyoDangNaeWangStore";

export default function OnSaengChwi() {
  const today = format(new Date(), "yyyy-MM-dd");

  // 온전 생각 취사 & 미리준비 상태
  const {
    onSaengChwi,
    miRiJoonBi,
    updateYooMooNyum: updateOnSaeng,
    updateMiRiJoonBi,
  } = useOnSaengChwiStore();

  // 교당내왕
  const {
    gongBooMoonDap,
    gamGakGamJeong,
    euSimHaeOh,
    sonGiIpSon,
    yeHwoeJeonSim,
    soDeukBanJo,
    updateYooMooNyum: updateGyoDang,
    toggleChecked,
  } = useGyoDangNaeWangStore();

  return (
    <div className="w-full max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-xl text-center">{today}</h2>

      {/* 온전 생각 취사 */}
      <Card>
        <CardContent className="space-y-4">
          <div className="text-center font-semibold">온전 생각 취사</div>
          <div className="flex items-center justify-between">
            <span>有念 ({onSaengChwi.yooNyum})</span>
            <Button variant="outline" size="icon" onClick={() => updateOnSaeng({ yooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>無念 ({onSaengChwi.mooNyum})</span>
            <Button variant="outline" size="icon" onClick={() => updateOnSaeng({ mooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 미리준비 */}
      <Card>
        <CardContent className="space-y-4">
          <div className="text-center font-semibold">미리준비</div>
          <div className="flex items-center justify-between">
            <span>有念 ({miRiJoonBi.yooNyum})</span>
            <Button variant="outline" size="icon" onClick={() => updateMiRiJoonBi({ yooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>無念 ({miRiJoonBi.mooNyum})</span>
            <Button variant="outline" size="icon" onClick={() => updateMiRiJoonBi({ mooNyum: 1 })}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 교당내왕 */}
      <Card>
        <CardContent className="space-y-6">
          <div className="text-center font-semibold">교당내왕시 주의사항</div>

          <div className="flex flex-col space-y-4">
            {/* 공부문답 */}
            <div className="space-y-1">
              <div className="font-semibold">공부문답</div>
              <div className="flex items-center justify-between">
                <span>有念 ({gongBooMoonDap.yooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("gongBooMoonDap", { yooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>無念 ({gongBooMoonDap.mooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("gongBooMoonDap", { mooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>

            {/* 감각감정 */}
            <div className="space-y-1">
              <div className="font-semibold">감각감정</div>
              <div className="flex items-center justify-between">
                <span>有念 ({gamGakGamJeong.yooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("gamGakGamJeong", { yooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>無念 ({gamGakGamJeong.mooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("gamGakGamJeong", { mooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>

            {/* 의심해오 */}
            <div className="space-y-1">
              <div className="font-semibold">의심해오</div>
              <div className="flex items-center justify-between">
                <span>有念 ({euSimHaeOh.yooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("euSimHaeOh", { yooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>無念 ({euSimHaeOh.mooNyum})</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGyoDang("euSimHaeOh", { mooNyum: 1 })}
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* 체크 항목 */}
          <div className="mt-4 flex justify-around">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sonGiIpSon}
                onChange={() => toggleChecked("sonGiIpSon")}
                className="mr-2"
              />
              선기입선
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={yeHwoeJeonSim}
                onChange={() => toggleChecked("yeHwoeJeonSim")}
                className="mr-2"
              />
              예회전심
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={soDeukBanJo}
                onChange={() => toggleChecked("soDeukBanJo")}
                className="mr-2"
              />
              소득반조
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
