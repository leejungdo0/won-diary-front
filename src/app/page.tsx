import Gyemun from "@/components/Gyemun";
import GyoDangNaeWang from "@/components/GyoDangNaeWang";
import Mirijoonbi from "@/components/Mirijoonbi";
import OnSaengChwi from "@/components/OnSaengChwi";
import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">상시일기</h1>
      <OnSaengChwi />
      <Mirijoonbi />
      <GyoDangNaeWang />
      <Gyemun />
      <ResetLocalStorageButton />
    </main>
  );
}