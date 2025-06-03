"use client";

import GyeMoon from "@/components/GyeMoon";
import OnSaengChwi from "@/components/OnSaengChwi";
import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";
import TimeInput from "@/components/TimeInput";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="p-4">
          <OnSaengChwi />
        </div>
        <div className="p-4">
          <TimeInput />
        </div>
        <div className="p-4">
          <GyeMoon />
          <ResetLocalStorageButton />
        </div>
      </div>
    </>
  );
}
