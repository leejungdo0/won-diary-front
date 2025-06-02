export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // 로그인/회원가입 페이지는 심플한 레이아웃
  // 필요하다면 common CSS만 적용하거나, 아무런 래퍼도 두지 않아도 됩니다.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
