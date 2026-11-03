import type { NextConfig } from "next";
// 빌드/dev 시작 시점에 환경변수를 검증합니다. (next.config 에서는 @/ alias 사용 불가)
import "./src/env";

/**
 * 모든 경로에 적용하는 기본 보안 헤더.
 * CSP 는 nonce 기반 설정이 필요해(페이지 동적 렌더링) 별도 단계에서 proxy 로 적용합니다.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HTTPS 로 서비스하는 환경에서만 의미가 있음 (브라우저는 http 응답의 HSTS 를 무시)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // 개발 서버에 localhost 가 아닌 IP 로 접속할 때 필요 (호스트명만, 포트 제외)
  allowedDevOrigins: ["192.168.200.244"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
