"use client";

import dynamic from "next/dynamic";

// pdf.js 는 브라우저 API 에 의존하므로 SSR 을 끄고 클라이언트에서만 로드합니다.
// (ssr: false 는 Client Component 안에서만 사용할 수 있습니다.)
const PdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <p className="animate-pulse p-8 text-center text-slate-400">뷰어 로딩 중...</p>,
});

export default function PdfViewerLoader({ file, title }: { file: string; title: string }) {
  return <PdfViewer file={file} title={title} />;
}
