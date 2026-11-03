"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

// 루트 레이아웃에서 발생한 에러를 처리합니다. 루트 레이아웃을 대체하므로 html/body 가 필요합니다.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // TODO: Sentry 등 에러 리포팅 서비스 연동
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <title>오류가 발생했습니다</title>
        <h2>문제가 발생했습니다</h2>
        <button type="button" onClick={() => retry()}>
          다시 시도
        </button>
      </body>
    </html>
  );
}
