// OnSaengChwi.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSwipeable } from "react-swipeable";
import { format } from "date-fns";

export default function OnSaengChwi({ synced }: { synced: { yunyum: number; munyum: number } }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [onSaengchwi, setOnSaengchwi] = useState({ yunyum: 0, munyum: 0 });
  const [highlightedYunyum, setHighlightedYunyum] = useState(false);
  const [highlightedMunyum, setHighlightedMunyum] = useState(false);

  const getStorageKey = (date: string) => `onSaengchwi-${date}`;

  // 외부에서 전달된 값으로 단방향 동기화
  useEffect(() => {
    setOnSaengchwi(synced);
  }, [synced]);

  // 로컬 저장
  useEffect(() => {
    localStorage.setItem(getStorageKey(today), JSON.stringify(onSaengchwi));
  }, [onSaengchwi, today]);

  const increment = (key: "yunyum" | "munyum") => {
    setOnSaengchwi(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrement = (key: "yunyum" | "munyum") => {
    setOnSaengchwi(prev => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
  };

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
      <h2 className="text-xl font-semibold text-center">{today}</h2>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="block font-semibold">온전 생각 취사</div>

          {/* 유념 */}
          <div {...swipeHandlersYunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mb-2 ${highlightedYunyum ? "bg-yellow-100" : ""
                }`}
            >
              <label>有念 ({onSaengchwi.yunyum})</label>
              <Button variant="outline" size="icon" onClick={() => increment("yunyum")}>
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          </div>

          {/* 무념 */}
          <div {...swipeHandlersMunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mt-4 mb-2 ${highlightedMunyum ? "bg-yellow-100" : ""
                }`}
            >
              <label>無念 ({onSaengchwi.munyum})</label>
              <Button variant="outline" size="icon" onClick={() => increment("munyum")}>
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
