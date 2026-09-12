import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarkdownDocument from "@/components/MarkdownDocument";
import { getSainDocument, sainDocuments } from "@/data/sainDocuments";

type DocumentPageProps = {
  params: {
    document: string;
  };
};

async function readDocumentMarkdown(fileName: string) {
  return readFile(path.join(process.cwd(), "docs", fileName), "utf8");
}

export function generateStaticParams() {
  return sainDocuments.map((document) => ({
    document: document.slug,
  }));
}

export function generateMetadata({ params }: DocumentPageProps): Metadata {
  const document = getSainDocument(params.document);

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = getSainDocument(params.document);

  if (!document) {
    notFound();
  }

  const markdown = await readDocumentMarkdown(document.fileName);

  return (
    <>
      <section className="pb-16 pt-16 md:pb-20 md:pt-20 bg-slate-50">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link
                href="/about"
                className="font-medium text-slate-500 hover:text-dutch-orange transition-colors"
              >
                About
              </Link>
              <span className="text-slate-400">/</span>
              <span className="font-medium text-dutch-orange">
                {document.title}
              </span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
              {document.eyebrow}
            </p>
            <h1 className="heading-xl text-navy-900 mb-6">
              {document.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {document.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <MarkdownDocument markdown={markdown} />
          </div>
        </div>
      </section>
    </>
  );
}
