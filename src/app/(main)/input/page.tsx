"use client";

import GyeMoon from "@/components/GyeMoon";
import OnSaengChwi from "@/components/OnSaengChwi";
import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";
import TimeInput from "@/components/TimeInput";
import React from "react";

export default function Page() {
  return (
    <>
      <OnSaengChwi />
      <TimeInput />
      <GyeMoon />
      <ResetLocalStorageButton />
    </>
  );
}
