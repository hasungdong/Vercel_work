"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // TODO: Sentry 등 에러 리포팅 서비스 연동
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-semibold">문제가 발생했습니다</h2>
      <p className="text-sm opacity-70">잠시 후 다시 시도해 주세요.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-md border border-current px-4 py-2 text-sm"
      >
        다시 시도
      </button>
    </main>
  );
}
