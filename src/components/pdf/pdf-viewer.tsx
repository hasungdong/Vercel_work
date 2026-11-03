"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// workerSrc 는 react-pdf 컴포넌트를 렌더링하는 같은 모듈에서 설정해야 합니다.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// 인쇄용 페이지 최대 크기(px). @page 여백은 globals.css (10mm).
// 너비: A4 기준 인쇄 가능 영역(190mm ≈ 718px)
// 높이: Letter 기준 인쇄 가능 영역(약 980px)보다 작게 잡아 A4/Letter 모두 한 장에 들어가게 합니다.
const PRINT_MAX_WIDTH = 718;
const PRINT_MAX_HEIGHT = 940;

/** 페이지 비율을 유지하면서 최대 너비/높이 안에 들어가는 너비를 계산합니다. */
function fitPrintWidth(width: number, height: number) {
  return Math.min(PRINT_MAX_WIDTH, (PRINT_MAX_HEIGHT * width) / height);
}

const buttonClass =
  "rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40";

export default function PdfViewer({ file, title }: { file: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  // 인쇄용 페이지가 모두 그려졌는지 추적합니다.
  const [printRendered, setPrintRendered] = useState(0);
  // 페이지별 인쇄 너비. 모든 페이지 크기를 알고 난 뒤에 인쇄용 페이지를 그립니다.
  const [printWidths, setPrintWidths] = useState<number[]>([]);
  const printReady = numPages > 0 && printWidths.length === numPages && printRendered >= numPages;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setPageNumber((page) => Math.max(1, page - 1));
      if (event.key === "ArrowRight") setPageNumber((page) => Math.min(numPages || 1, page + 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [numPages]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={buttonClass}
            onClick={() => setPageNumber((page) => page - 1)}
            disabled={pageNumber <= 1}
          >
            이전
          </button>
          <span className="min-w-20 text-center text-sm text-slate-300">
            {numPages ? `${pageNumber} / ${numPages}` : "-"}
          </span>
          <button
            type="button"
            className={buttonClass}
            onClick={() => setPageNumber((page) => page + 1)}
            disabled={pageNumber >= numPages}
          >
            다음
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={buttonClass}
            onClick={() => window.print()}
            disabled={!printReady}
          >
            {printReady ? "인쇄" : "인쇄 준비 중..."}
          </button>
          {/* 버튼을 눌렀을 때만 저장됩니다. (페이지 진입/링크로는 자동 다운로드되지 않음) */}
          <a href={file} download={file.split("/").pop()} className={buttonClass}>
            다운로드
          </a>
        </div>
      </div>

      <div
        ref={containerRef}
        // 우클릭 메뉴(이미지 저장 등)를 막습니다. 저장은 "다운로드" 버튼으로 합니다.
        onContextMenu={(event) => event.preventDefault()}
        className="overflow-auto rounded-2xl border border-slate-800 bg-slate-900 p-2 sm:p-4 print:overflow-visible print:rounded-none print:border-0 print:bg-transparent print:p-0"
      >
        <Document
          file={file}
          onLoadSuccess={async (pdf) => {
            const total = pdf.numPages;
            setPrintRendered(0);
            setPrintWidths([]);
            setNumPages(total);
            setPageNumber(1);
            const widths = await Promise.all(
              Array.from({ length: total }, async (_, index) => {
                const { width, height } = (await pdf.getPage(index + 1)).getViewport({ scale: 1 });
                return fitPrintWidth(width, height);
              }),
            );
            setPrintWidths(widths);
          }}
          loading={
            <p className="animate-pulse p-8 text-center text-slate-400">PDF 불러오는 중...</p>
          }
          error={
            <p className="p-8 text-center text-red-300">
              &quot;{title}&quot; 문서를 불러오지 못했습니다.
            </p>
          }
        >
          {/* 화면 표시용: 인쇄 시에는 숨깁니다. */}
          <div className="flex justify-center print:hidden">
            {containerWidth ? (
              <Page
                pageNumber={pageNumber}
                width={Math.max(0, containerWidth - 32)}
                className="shadow-lg shadow-slate-950/60"
              />
            ) : null}
          </div>

          {/* 인쇄 전용: 화면에서는 숨기고, 인쇄할 때만 전체 페이지를 순서대로 출력합니다. */}
          <div className="hidden print:block">
            {printWidths.map((printWidth, index) => (
              <div
                key={index}
                className="break-inside-avoid break-after-page last:break-after-auto"
              >
                <Page
                  pageNumber={index + 1}
                  width={printWidth}
                  devicePixelRatio={2}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onRenderSuccess={() => setPrintRendered((count) => count + 1)}
                />
              </div>
            ))}
          </div>
        </Document>
      </div>
    </div>
  );
}
