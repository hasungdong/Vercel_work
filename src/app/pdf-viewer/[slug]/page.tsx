import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PdfViewerLoader from "@/components/pdf/pdf-viewer-loader";
import { getPdf, pdfs } from "@/lib/pdfs";

export function generateStaticParams() {
  return pdfs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/pdf-viewer/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pdf = getPdf(slug);
  return { title: pdf ? `${pdf.title} | PDF Viewer` : "PDF Viewer" };
}

export default async function PdfViewerPage({ params }: PageProps<"/pdf-viewer/[slug]">) {
  const { slug } = await params;
  const pdf = getPdf(slug);
  if (!pdf) notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto max-w-4xl">
        <Link href="/pdf-viewer" className="text-sm text-cyan-300 hover:underline print:hidden">
          ← 목록으로
        </Link>
        <h1 className="mt-4 mb-6 text-2xl font-bold print:hidden">{pdf.title}</h1>
        <PdfViewerLoader file={pdf.file} title={pdf.title} />
      </div>
    </main>
  );
}
