"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import { useUserDataStore } from "stores/useUserDataStore";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";
import {
  BEOP_MA_SANG_JEON_GEUP_ITEMS,
  BeopMaSangJeonGeupItem,
  BeopMaSangJeonGeupObj,
  BO_TONG_GEUP_ITEMS,
  BoTongGeupItem,
  BoTongGeupObj,
  TEUK_SIN_GEUP_ITEMS,
  TeukSinGeupItem,
  TeukSinGeupObj,
} from "@/types";

export default function GyeMoon() {
  // Zustand store에서 계문 배열과 액션 불러오기
  const boTongArr = useSangSiIlGiStore(s => s.gyeMoon.boTongGeup);
  const teukSinArr = useSangSiIlGiStore(s => s.gyeMoon.teukSinGeup);
  const beopMaArr = useSangSiIlGiStore(s => s.gyeMoon.beopMaSangJeonGeup);

  const setBoTong = useSangSiIlGiStore(s => s.setBoTongCount);
  const setTeukSin = useSangSiIlGiStore(s => s.setTeukSinCount);
  const setBeopMa = useSangSiIlGiStore(s => s.setBeopMaCount);

  // 탭 상태는 UserDataStore에 저장
  const lastOpenTab = useUserDataStore(s => s.settings.lastOpenTab);
  const setLastOpenTab = useUserDataStore(s => s.setLastOpenTab);

  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (lastOpenTab === "bo") setLastOpenTab("tuk");
      else if (lastOpenTab === "tuk") setLastOpenTab("beopma");
    },
    onSwipedRight: () => {
      if (lastOpenTab === "beopma") setLastOpenTab("tuk");
      else if (lastOpenTab === "tuk") setLastOpenTab("bo");
    },
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="w-full max-w-md mx-auto mt-10" {...swipeHandlers}>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg">계문</h2>
      </div>

      <Tabs
        value={lastOpenTab}
        onValueChange={value => setLastOpenTab(value as "bo" | "tuk" | "beopma")}
        className="max-w-sm"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bo">보통급</TabsTrigger>
          <TabsTrigger value="tuk">특신급</TabsTrigger>
          <TabsTrigger value="beopma">법마상전급</TabsTrigger>
        </TabsList>

        <TabsContent value="bo">
          <Card>
            <CardContent className="pt-6 space-y-2">
              {BO_TONG_GEUP_ITEMS.map(name => {
                const label = BoTongGeupObj[name];
                const item = boTongArr.find(i => i.name === name);
                const count = item?.count ?? 0;
                return (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm">
                      {label} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBoTong(name as BoTongGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tuk">
          <Card>
            <CardContent className="pt-6 space-y-2">
              {TEUK_SIN_GEUP_ITEMS.map(name => {
                const label = TeukSinGeupObj[name];
                const item = teukSinArr.find(i => i.name === name);
                const count = item?.count ?? 0;
                return (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm">
                      {label} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTeukSin(name as TeukSinGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beopma">
          <Card>
            <CardContent className="pt-6 space-y-2">
              {BEOP_MA_SANG_JEON_GEUP_ITEMS.map(name => {
                const label = BeopMaSangJeonGeupObj[name];
                const item = beopMaArr.find(i => i.name === name);
                const count = item?.count ?? 0;
                return (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm">
                      {label} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBeopMa(name as BeopMaSangJeonGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
