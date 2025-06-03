"use client";

import { Button } from "@/components/ui/button";

export default function ResetLocalStorageButton() {
  const handleReset = () => {
    if (confirm("정말로 모든 데이터를 삭제하시겠습니까?")) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <Button variant="destructive" className="mt-3" onClick={handleReset}>
      전체 초기화
    </Button>
  );
}
