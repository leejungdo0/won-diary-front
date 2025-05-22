"use client";
import React, { useState, useEffect } from "react"; // Ensure useState and useEffect are imported
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useSwipeable } from "react-swipeable"; // Importing react-swipeable for swipe detection

// Existing items
const BO_TONG_GUP_ITEMS = [
  "연고살생", "도둑질", "간음", "연고음주", "잡기", "악한 말", "연고쟁투", "공금범용", "금전여수", "연고흡연",
];

const TUKSIN_GUP_ITEMS = [
  "공사단독", "타인과", "금은보패", "의복사치", "삿된 벗", "양인병설", "신용없음", "꾸미는 말", "연고 잠", "노래 춤",
];

const BEOMMA_SANGJEONG_ITEMS = [
  "아만심", "두아내", "연고사육", "나태", "한입두말", "망어", "시기심", "탐심", "진심", "치심",
];

export default function Gyemun() {
  const getTodayDateString = () => new Date().toISOString().split("T")[0];

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
  const [beommaSangjeong, setBeommaSangjeong] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = useState("bo");  // State for the active tab
  const [animating, setAnimating] = useState(false); // To trigger the animation
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null); // State for highlighting item

  const getKey = (prefix: string, date: string) => `${prefix}-${date}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const bo = localStorage.getItem(getKey("boTongGup", date));
    const tuk = localStorage.getItem(getKey("tukSinGup", date));
    const beomma = localStorage.getItem(getKey("beommaSangjeong", date));

    if (bo) {
      try {
        setBoTongGup(JSON.parse(bo));
      } catch (e) {
        console.error("보통급 로드 실패:", e);
      }
    } else {
      const init = Object.fromEntries(BO_TONG_GUP_ITEMS.map((item) => [item, 0]));
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
      const init = Object.fromEntries(TUKSIN_GUP_ITEMS.map((item) => [item, 0]));
      setTukSinGup(init);
      localStorage.setItem(getKey("tukSinGup", date), JSON.stringify(init));
    }

    if (beomma) {
      try {
        setBeommaSangjeong(JSON.parse(beomma));
      } catch (e) {
        console.error("법마상전급 로드 실패:", e);
      }
    } else {
      const init = Object.fromEntries(BEOMMA_SANGJEONG_ITEMS.map((item) => [item, 0]));
      setBeommaSangjeong(init);
      localStorage.setItem(getKey("beommaSangjeong", date), JSON.stringify(init));
    }
  }, [date]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(getKey("boTongGup", date), JSON.stringify(boTongGup));
  }, [boTongGup, date]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(getKey("tukSinGup", date), JSON.stringify(tukSinGup));
  }, [tukSinGup, date]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(getKey("beommaSangjeong", date), JSON.stringify(beommaSangjeong));
  }, [beommaSangjeong, date]);

  // Prevent the count from going below 0
  const increment = (type: "bo" | "tuk" | "beomma", item: string) => {
    setAnimating(true);  // Trigger animation when incremented
    if (type === "bo") {
      setBoTongGup((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    } else if (type === "tuk") {
      setTukSinGup((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    } else {
      setBeommaSangjeong((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
    }
    // Remove highlight after operation
    setTimeout(() => {
      setAnimating(false);
      setHighlightedItem(null); // Remove the highlight after animation
    }, 300);  // Reset animation and highlight after 300ms
  };

  const decrement = (type: "bo" | "tuk" | "beomma", item: string) => {
    setAnimating(true);  // Trigger animation when decremented
    if (type === "bo") {
      setBoTongGup((prev) => ({
        ...prev,
        [item]: Math.max(0, (prev[item] || 0) - 1),  // Prevent going below 0
      }));
    } else if (type === "tuk") {
      setTukSinGup((prev) => ({
        ...prev,
        [item]: Math.max(0, (prev[item] || 0) - 1),  // Prevent going below 0
      }));
    } else {
      setBeommaSangjeong((prev) => ({
        ...prev,
        [item]: Math.max(0, (prev[item] || 0) - 1),  // Prevent going below 0
      }));
    }
    // Remove highlight after operation
    setTimeout(() => {
      setAnimating(false);
      setHighlightedItem(null); // Remove the highlight after animation
    }, 300);  // Reset animation and highlight after 300ms
  };

  // Reverse the swipe direction: Right swipe -> Decrease count, Left swipe -> Increase count
  const swipeHandlers = (type: "bo" | "tuk" | "beomma", item: string) => useSwipeable({
    onSwipedLeft: () => increment(type, item),  // Left swipe -> Increase count
    onSwipedRight: () => decrement(type, item), // Right swipe -> Decrease count
    trackMouse: true,  // Enable mouse tracking for testing purposes
    onSwiped: () => setHighlightedItem(item),  // Highlight item when swiped
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bo" onClick={() => setActiveTab("bo")}>
            보통급
          </TabsTrigger>
          <TabsTrigger value="tuk" onClick={() => setActiveTab("tuk")}>
            특신급
          </TabsTrigger>
          <TabsTrigger value="beomma" onClick={() => setActiveTab("beomma")}>
            법마상전급
          </TabsTrigger>
        </TabsList>

        {/* Conditionally render each content */}
        {activeTab === "bo" && (
          <TabsContent value="bo">
            <Card>
              <CardContent className="pt-6 space-y-2">
                {BO_TONG_GUP_ITEMS.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between ${highlightedItem === item ? "bg-yellow-100" : ""}`}  // Highlight item
                    {...swipeHandlers("bo", item)}
                  >
                    <span className="text-sm">
                      {item} ({boTongGup[item] ?? 0})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("bo", item)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === "tuk" && (
          <TabsContent value="tuk">
            <Card>
              <CardContent className="pt-6 space-y-2">
                {TUKSIN_GUP_ITEMS.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between ${highlightedItem === item ? "bg-yellow-100" : ""}`}  // Highlight item
                    {...swipeHandlers("tuk", item)}
                  >
                    <span className="text-sm">
                      {item} ({tukSinGup[item] ?? 0})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("tuk", item)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === "beomma" && (
          <TabsContent value="beomma">
            <Card>
              <CardContent className="pt-6 space-y-2">
                {BEOMMA_SANGJEONG_ITEMS.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between ${highlightedItem === item ? "bg-yellow-100" : ""}`}  // Highlight item
                    {...swipeHandlers("beomma", item)}
                  >
                    <span className="text-sm">
                      {item} ({beommaSangjeong[item] ?? 0})
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("beomma", item)}
                    >
                      <PlusIcon className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
