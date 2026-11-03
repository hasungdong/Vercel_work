import type { Metadata } from "next";
import Link from "next/link";
import { pdfs } from "@/lib/pdfs";

export const metadata: Metadata = {
  title: "PDF Viewer | HSD Resume Portal",
};

export default function PdfListPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-cyan-300 hover:underline">
          ← Home
        </Link>
        <p className="mt-6 text-sm tracking-[0.25em] text-cyan-300 uppercase">Documents</p>
        <h1 className="mt-2 text-3xl font-bold">PDF Viewer</h1>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {pdfs.map((pdf) => (
            <li key={pdf.slug}>
              <Link
                href={`/pdf-viewer/${pdf.slug}`}
                className="block rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-6 transition hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <div className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
                  View
                </div>
                <div className="mt-3 text-2xl font-semibold">{pdf.title}</div>
                <div className="mt-2 text-sm text-slate-400">/pdf-viewer/{pdf.slug}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
