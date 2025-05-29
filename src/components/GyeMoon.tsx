"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import {
  BoTongGeupItem,
  TeukSinGeupItem,
  BeopMaSangJeonGeupItem,
  TeukSinGeupObj,
  BeopMaSangJeonGeupObj,
  BO_TONG_GEUP_ITEMS,
  BoTongGeupObj,
} from "@/types";
import { useGyeMoonStore } from "stores/useGyeMoonStore";

export default function GyeMoon() {
  const boTong = useGyeMoonStore(s => s.boTongGeup);
  const teukSin = useGyeMoonStore(s => s.teukSinGeup);
  const beopMa = useGyeMoonStore(s => s.beopMaSangJeonGeup);
  const setBoTong = useGyeMoonStore(s => s.setBoTongCount);
  const setTeukSin = useGyeMoonStore(s => s.setTeukSinCount);
  const setBeopMa = useGyeMoonStore(s => s.setBeopMaCount);
  const resetAll = useGyeMoonStore(s => s.reset);

  const [activeTab, setActiveTab] = useState<"bo" | "tuk" | "beopma">("bo");

  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeTab === "bo") setActiveTab("tuk");
      else if (activeTab === "tuk") setActiveTab("beopma");
    },
    onSwipedRight: () => {
      if (activeTab === "beopma") setActiveTab("tuk");
      else if (activeTab === "tuk") setActiveTab("bo");
    },
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="w-full max-w-md mx-auto mt-10" {...swipeHandlers}>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">계문</h2>
        <Button size="sm" variant="outline" onClick={resetAll}>
          초기화
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={value => setActiveTab(value as "bo" | "tuk" | "beopma")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bo">보통급</TabsTrigger>
          <TabsTrigger value="tuk">특신급</TabsTrigger>
          <TabsTrigger value="beopma">법마상전급</TabsTrigger>
        </TabsList>

        <TabsContent value="bo">
          <Card>
            <CardContent className="pt-6 space-y-2">
              {BO_TONG_GEUP_ITEMS.map(item => {
                const name = BoTongGeupObj[item as keyof typeof BoTongGeupObj];
                const count = (boTong[item as keyof typeof boTong] as number) ?? 0;
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm">
                      {name} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBoTong(item as BoTongGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
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
              {Object.values(TeukSinGeupObj).map(item => {
                const name = TeukSinGeupObj[item as keyof typeof TeukSinGeupObj];
                const count = (teukSin[item as keyof typeof teukSin] as number) ?? 0;
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm">
                      {name} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTeukSin(item as TeukSinGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
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
              {Object.values(BeopMaSangJeonGeupObj).map(item => {
                const name = BeopMaSangJeonGeupObj[item as keyof typeof BeopMaSangJeonGeupObj];
                const count = (beopMa[item as keyof typeof beopMa] as number) ?? 0;
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm">
                      {name} ({count})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBeopMa(item as BeopMaSangJeonGeupItem, count + 1)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
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
