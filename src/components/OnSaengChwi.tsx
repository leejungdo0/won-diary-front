"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useSwipeable } from "react-swipeable";

export default function OnSaengChwi() {
  const getTodayDateString = () => new Date().toISOString().split("T")[0];

  const [team, setTeam] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [onSaengchwi, setOnSaengchwi] = useState({ yunyum: 0, munyum: 0 });
  const [highlightedYunyum, setHighlightedYunyum] = useState(false);
  const [highlightedMunyum, setHighlightedMunyum] = useState(false);

  const getStorageKey = (date: string) => `onSaengchwi-${date}`;
  const getTeamKey = (date: string) => `team-${date}`;

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(date));
    if (stored) {
      try {
        setOnSaengchwi(JSON.parse(stored));
      } catch (e) {
        console.error("파싱 오류:", e);
      }
    }

    const storedTeam = localStorage.getItem(getTeamKey(date));
    if (storedTeam) setTeam(storedTeam);
  }, [date]);

  // Save data
  useEffect(() => {
    localStorage.setItem(getStorageKey(date), JSON.stringify(onSaengchwi));
  }, [onSaengchwi, date]);

  useEffect(() => {
    localStorage.setItem(getTeamKey(date), team);
  }, [team, date]);

  // 유념 swipe
  const handleSwipeLeftYunyum = () => {
    setOnSaengchwi((prev) => ({ ...prev, yunyum: prev.yunyum + 1 }));
    setHighlightedYunyum(true);
  };

  const handleSwipeRightYunyum = () => {
    setOnSaengchwi((prev) => ({ ...prev, yunyum: Math.max(0, prev.yunyum - 1) }));
    setHighlightedYunyum(true);
  };

  // 무념 swipe
  const handleSwipeLeftMunyum = () => {
    setOnSaengchwi((prev) => ({ ...prev, munyum: prev.munyum + 1 }));
    setHighlightedMunyum(true);
  };

  const handleSwipeRightMunyum = () => {
    setOnSaengchwi((prev) => ({ ...prev, munyum: Math.max(0, prev.munyum - 1) }));
    setHighlightedMunyum(true);
  };

  // Swipe handlers
  const swipeHandlersYunyum = useSwipeable({
    onSwipedLeft: handleSwipeLeftYunyum,
    onSwipedRight: handleSwipeRightYunyum,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  const swipeHandlersMunyum = useSwipeable({
    onSwipedLeft: handleSwipeLeftMunyum,
    onSwipedRight: handleSwipeRightMunyum,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  // Reset highlight
  useEffect(() => {
    if (highlightedYunyum || highlightedMunyum) {
      const timer = setTimeout(() => {
        setHighlightedYunyum(false);
        setHighlightedMunyum(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [highlightedYunyum, highlightedMunyum]);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-xl font-semibold text-center">{date}</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="block">온생취</div>

          {/* 유념 */}
          <div {...swipeHandlersYunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mb-2 ${
                highlightedYunyum ? "bg-yellow-100" : ""
              }`}
            >
              <label className="text-sm font-medium">
                有念 ({onSaengchwi.yunyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setOnSaengchwi((prev) => ({
                    ...prev,
                    yunyum: prev.yunyum + 1,
                  }))
                }
              >
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          </div>

          {/* 무념 */}
          <div {...swipeHandlersMunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mt-4 mb-2 ${
                highlightedMunyum ? "bg-yellow-100" : ""
              }`}
            >
              <label className="text-sm font-medium">
                無念 ({onSaengchwi.munyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setOnSaengchwi((prev) => ({
                    ...prev,
                    munyum: prev.munyum + 1,
                  }))
                }
              >
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
