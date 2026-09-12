import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import MarkdownDocument from "@/components/MarkdownDocument";

export const metadata: Metadata = {
  title: "Research Hub Handbook",
  description:
    "The SAIN Research Hub handbook for participants, supervisors, and collaborators.",
};

export default async function ResearchHubHandbookPage() {
  const markdown = await readFile(
    path.join(process.cwd(), "docs", "research_hub_handbook.md"),
    "utf8",
  );

  return (
    <>
      <section className="pb-16 pt-16 md:pb-20 md:pt-20 bg-slate-50">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link
                href="/research"
                className="font-medium text-slate-500 hover:text-dutch-orange transition-colors"
              >
                Research Hub
              </Link>
              <span className="text-slate-400">/</span>
              <span className="font-medium text-dutch-orange">Handbook</span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
              Handbook
            </p>
            <h1 className="heading-xl text-navy-900 mb-6">
              SAIN Research Hub Handbook
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              A clear reference for how the Research Hub works, who it is for,
              and what participants and supervisors can expect.
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
