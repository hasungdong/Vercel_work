import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur">
        <p className="mb-3 text-sm tracking-[0.25em] text-cyan-300 uppercase">
          Next.js portfolio demo
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">HSD Resume Portal</h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          View resume PDFs in your browser from a single lightweight portfolio experience.
        </p>

        <div className="mt-8 grid gap-4">
          <Link
            href="/pdf-viewer"
            className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-6 transition hover:border-cyan-400 hover:bg-cyan-500/20"
          >
            <div className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">Open</div>
            <div className="mt-3 text-2xl font-semibold">PDF Viewer</div>
            <div className="mt-2 text-sm text-slate-300">Browse uploaded resumes in-browser.</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
