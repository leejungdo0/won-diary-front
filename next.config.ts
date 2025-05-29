import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React 엄격 모드 활성화
  swcMinify: true, // SWF 파일 최소화
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 오류 무시
  },
};

export default nextConfig;
