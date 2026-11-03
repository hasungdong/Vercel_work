import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="text-sm opacity-70">요청하신 주소가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className="rounded-md border border-current px-4 py-2 text-sm">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
