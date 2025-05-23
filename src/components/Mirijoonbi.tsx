"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useSwipeable } from "react-swipeable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Mirijoonbi({
  miRiJoonBi,
  increment,
  decrement,
}: {
  miRiJoonBi: { yunyum: number; munyum: number };
  increment: (key: "yunyum" | "munyum") => void;
  decrement: (key: "yunyum" | "munyum") => void;
}) {
  const [highlightedYunyum, setHighlightedYunyum] = useState(false);
  const [highlightedMunyum, setHighlightedMunyum] = useState(false);

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

  // 하이라이트 리셋
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
          <div className="block font-semibold">미리준비</div>

          {/* 유념 */}
          <div {...swipeHandlersYunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mb-2 ${
                highlightedYunyum ? "bg-yellow-100" : ""
              }`}
            >
              <label>
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

          {/* 무念 */}
          <div {...swipeHandlersMunyum} className="cursor-pointer">
            <div
              className={`flex items-center justify-between mt-4 mb-2 ${
                highlightedMunyum ? "bg-yellow-100" : ""
              }`}
            >
              <label>
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
