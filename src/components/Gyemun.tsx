"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useSwipeable } from "react-swipeable";
import { getTodayDateString } from "@/lib/utils";

const BO_TONG_GUP_ITEMS = [
  "연고살생",
  "도둑질",
  "간음",
  "연고음주",
  "잡기",
  "악한 말",
  "연고쟁투",
  "공금범용",
  "금전여수",
  "연고흡연",
];

const TUKSIN_GUP_ITEMS = [
  "공사단독",
  "타인과",
  "금은보패",
  "의복사치",
  "삿된 벗",
  "양인병설",
  "신용없음",
  "꾸미는 말",
  "연고 잠",
  "노래 춤",
];

const beopma_SANGJEONG_ITEMS = [
  "아만심",
  "두아내",
  "연고사육",
  "나태",
  "한입두말",
  "망어",
  "시기심",
  "탐심",
  "진심",
  "치심",
];

export default function Gyemun() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lastClearDate = localStorage.getItem("lastClearDate");
    const today = getTodayDateString();
    if (lastClearDate !== today) {
      localStorage.clear();
      localStorage.setItem("lastClearDate", today);
    }
  }, []);

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [boTongGup, setBoTongGup] = useState<{ [key: string]: number }>({});
  const [tukSinGup, setTukSinGup] = useState<{ [key: string]: number }>({});
  const [beopmaSangjeong, setbeopmaSangjeong] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = useState("bo");

  const getKey = (prefix: string, date: string) => `${prefix}-${date}`;

  useEffect(() => {
    const bo = localStorage.getItem(getKey("boTongGup", date));
    const tuk = localStorage.getItem(getKey("tukSinGup", date));
    const beopma = localStorage.getItem(getKey("beopmaSangjeong", date));

    if (bo) {
      try {
        setBoTongGup(JSON.parse(bo));
      } catch (e) {
        console.error("보통급 로드 실패:", e);
      }
    } else {
      const init = Object.fromEntries(BO_TONG_GUP_ITEMS.map(item => [item, 0]));
      setBoTongGup(init);
      localStorage.setItem(getKey("boTongGup", date), JSON.stringify(init));
    }

    if (tuk) {
      try {
        setTukSinGup(JSON.parse(tuk));
      } catch (e) {
        console.error("특신급 로드 실패:", e);
      }
    } else {
      const init = Object.fromEntries(TUKSIN_GUP_ITEMS.map(item => [item, 0]));
      setTukSinGup(init);
      localStorage.setItem(getKey("tukSinGup", date), JSON.stringify(init));
    }

    if (beopma) {
      try {
        setbeopmaSangjeong(JSON.parse(beopma));
      } catch (e) {
        console.error("법마상전급 로드 실패:", e);
      }
    } else {
      const init = Object.fromEntries(beopma_SANGJEONG_ITEMS.map(item => [item, 0]));
      setbeopmaSangjeong(init);
      localStorage.setItem(getKey("beopmaSangjeong", date), JSON.stringify(init));
    }
  }, [date]);

  useEffect(() => {
    localStorage.setItem(getKey("boTongGup", date), JSON.stringify(boTongGup));
  }, [boTongGup, date]);

  useEffect(() => {
    localStorage.setItem(getKey("tukSinGup", date), JSON.stringify(tukSinGup));
  }, [tukSinGup, date]);

  useEffect(() => {
    localStorage.setItem(getKey("beopmaSangjeong", date), JSON.stringify(beopmaSangjeong));
  }, [beopmaSangjeong, date]);

  const increment = (type: "bo" | "tuk" | "beopma", item: string) => {
    if (type === "bo") {
      setBoTongGup(prev => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    } else if (type === "tuk") {
      setTukSinGup(prev => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    } else {
      setbeopmaSangjeong(prev => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    }
  };

  const renderItems = (
    items: string[],
    type: "bo" | "tuk" | "beopma",
    state: { [key: string]: number }
  ) => (
    <Card>
      <CardContent className="pt-6 space-y-2">
        {items.map(item => (
          <div key={item} className="flex items-center justify-between">
            <span className="text-sm">
              {item} ({state[item] ?? 0})
            </span>
            <Button variant="outline" size="icon" onClick={() => increment(type, item)}>
              <PlusIcon className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: e => {
      e.event.preventDefault();
      if (activeTab === "bo") setActiveTab("tuk");
      else if (activeTab === "tuk") setActiveTab("beopma");
    },
    onSwipedRight: e => {
      e.event.preventDefault();
      if (activeTab === "beopma") setActiveTab("tuk");
      else if (activeTab === "tuk") setActiveTab("bo");
    },
    // preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="w-full max-w-md mx-auto mt-10" {...swipeHandlers}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bo">보통급</TabsTrigger>
          <TabsTrigger value="tuk">특신급</TabsTrigger>
          <TabsTrigger value="beopma">법마상전급</TabsTrigger>
        </TabsList>

        <TabsContent value="bo">{renderItems(BO_TONG_GUP_ITEMS, "bo", boTongGup)}</TabsContent>
        <TabsContent value="tuk">{renderItems(TUKSIN_GUP_ITEMS, "tuk", tukSinGup)}</TabsContent>
        <TabsContent value="beopma">
          {renderItems(beopma_SANGJEONG_ITEMS, "beopma", beopmaSangjeong)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
