"use client";

import React from "react";
import { useSangSiIlGiStore } from "stores/useSangSiIlGiStore";

/**
 * onChange 이벤트에서 updateGyoDangNaeWang 함수를 사용하는 예시
 */
export default function GyoDangCheckboxGroup() {
  const { gyoDangNaeWang, updateGyoDangNaeWang } = useSangSiIlGiStore();

  /**
   * 체크박스 상태 변경 시 호출
   * 변경된 필드만 새로운 객체로 전달하여 상태를 업데이트
   */
  const handleChange =
    (field: keyof typeof gyoDangNaeWang) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      // 기존 gyoDangNaeWang 객체를 복사해 첫 상태 유지 후, 해당 필드만 변경
      updateGyoDangNaeWang({
        ...gyoDangNaeWang,
        [field]: isChecked,
      });
    };

  return (
    <div className="flex justify-between items-center">
      {/* 부모 컨테이너에 flex와 justify-between을 사용하여 자식 요소 3개를 균등 배치 */}
      <label className="flex flex-col items-center">
        <input
          type="checkbox"
          checked={gyoDangNaeWang.sonGiIpSeon}
          onChange={handleChange("sonGiIpSeon")}
          className="checkbox mb-1"
        />
        <span className="text-sm">선기입선</span>
      </label>

      <label className="flex flex-col items-center">
        <input
          type="checkbox"
          checked={gyoDangNaeWang.yeHwoeJeonSim}
          onChange={handleChange("yeHwoeJeonSim")}
          className="checkbox mb-1"
        />
        <span className="text-sm">예회전심</span>
      </label>

      <label className="flex flex-col items-center">
        <input
          type="checkbox"
          checked={gyoDangNaeWang.soDeukBanJo}
          onChange={handleChange("soDeukBanJo")}
          className="checkbox mb-1"
        />
        <span className="text-sm">소득반조</span>
      </label>
    </div>
  );
}
