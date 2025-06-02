import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React 엄격 모드 활성화
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 오류 무시
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/input",
        permanent: false, 
      },
    ];
  }
};

export default nextConfig;
