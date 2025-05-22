"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useSwipeable } from "react-swipeable";

export default function Mirijoonbi() {
  const [team, setTeam] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [miRiJoonBi, setMirijoonbi] = useState({ yunyum: 0, munyum: 0 });
  const [highlightedYunyum, setHighlightedYunyum] = useState(false);
  const [highlightedMunyum, setHighlightedMunyum] = useState(false);

  const getStorageKey = (date: string) => `mirijoonbi-data-${date}`;
  const getTeamKey = (date: string) => `mirijoonbi-team-${date}`;

  // 데이터 불러오기
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(getStorageKey(date));
    if (stored) {
      try {
        setMirijoonbi(JSON.parse(stored));
      } catch (e) {
        console.error("파싱 오류:", e);
      }
    }

    const storedTeam = localStorage.getItem(getTeamKey(date));
    if (storedTeam) setTeam(storedTeam);
  }, [date]);

  // 데이터 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(getStorageKey(date), JSON.stringify(miRiJoonBi));
  }, [miRiJoonBi, date]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(getTeamKey(date), team);
  }, [team, date]);

  // 증가/감소 함수
  const increment = (key: "yunyum" | "munyum") => {
    setMirijoonbi((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrement = (key: "yunyum" | "munyum") => {
    setMirijoonbi((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
  };

  // 스와이프 핸들러
  const swipeHandlersYunyum = useSwipeable({
    onSwipedLeft: () => {
      increment("yunyum");
      setHighlightedYunyum(true);
    },
    onSwipedRight: () => {
      decrement("yunyum");
      setHighlightedYunyum(true);
    },
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const swipeHandlersMunyum = useSwipeable({
    onSwipedLeft: () => {
      increment("munyum");
      setHighlightedMunyum(true);
    },
    onSwipedRight: () => {
      decrement("munyum");
      setHighlightedMunyum(true);
    },
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  // 하이라이트 초기화
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
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="block">미리준비</div>

          {/* 유념 */}
          <div {...swipeHandlersYunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mb-2 ${
                highlightedYunyum ? "bg-yellow-100" : ""
              }`}
            >
              <label className="text-sm font-medium">
                有念 ({miRiJoonBi.yunyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => increment("yunyum")}
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
                無念 ({miRiJoonBi.munyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => increment("munyum")}
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
