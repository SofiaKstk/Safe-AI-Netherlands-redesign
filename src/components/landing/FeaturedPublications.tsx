import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { publications } from "@/data/research";

export default function FeaturedPublications() {
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-3">
      {publications.flatMap((paper) => paper.featured ? [
        <a
          key={paper.link}
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          title={paper.title}
          className="group flex min-w-0 flex-col bg-cream text-navy outline-offset-4 transition-colors hover:bg-white focus-visible:bg-white"
        >
          <div className="bg-navy/[0.04] px-6 pt-3">
            <Image
              src={`/landing/research/${paper.featured.illustration}.svg`}
              alt=""
              width={360}
              height={190}
              className="mx-auto h-[170px] w-full max-w-[360px] object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col items-start px-6 pb-6 pt-5">
            <p className="text-footnote text-orange-ink lg:min-h-9">{paper.featured.venueLabel}</p>
            <h4 className="mt-3 font-serif text-title group-hover:underline group-focus-visible:underline underline-offset-4 lg:min-h-[52px]">{paper.chipTitle}</h4>
            <p className="mb-6 mt-3 text-kicker-sm leading-6 text-navy/75">{paper.featured.summary}</p>
            <span className="mt-auto inline-flex items-center gap-2 text-label">
              Read paper <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </div>
        </a>,
      ] : [])}
    </div>
  );
}
