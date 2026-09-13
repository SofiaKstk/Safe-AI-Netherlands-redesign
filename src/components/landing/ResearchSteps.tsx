import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, FileText, Globe, NumberCircleOne, NumberCircleTwo, NumberCircleThree, UsersThree } from "@phosphor-icons/react/dist/ssr";
import ResearchPeople from "./ResearchPeople";
import FeaturedPublications from "./FeaturedPublications";
import { RESEARCH_EMAIL, RESEARCH_INTEREST_FORM_URL } from "@/data/research";

const researchBenefits = [
  {
    title: "Supervised matching",
    icon: UsersThree,
    description: "Connect with PhD+ supervisors for structured, mentored AI Safety research.",
  },
  {
    title: "Compute & support",
    icon: Cpu,
    description: "Access compute and logistical support for your project or open collaboration.",
  },
  {
    title: "National network",
    icon: Globe,
    description: "Work with researchers, advisors, and practitioners across SAIN’s Dutch chapters.",
  },
  {
    title: "Publication track",
    icon: FileText,
    description: "Build your research track record in a community with work at NeurIPS, ICLR, and other leading venues.",
  },
];

// Copy follows docs/research_hub_handbook.md: scope, programme modes,
// applications, assignment, deliverables, and project-specific resources.
function ResearchStep({ icon: StepIcon, title, id, children }: {
  icon: typeof NumberCircleOne;
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <li id={id} className="relative scroll-mt-36 pb-12 before:absolute before:bottom-0 before:left-[12px] before:top-8 before:w-px before:bg-white/[0.08] last:pb-0 last:before:hidden md:pb-16">
      <div className="grid grid-cols-[26px_minmax(0,1fr)] gap-x-3">
        <StepIcon size={26} weight="regular" aria-hidden="true" className="mt-1 text-orange" />
        <div className="min-w-0">
          <h3 id={`${id}-heading`} className="font-serif text-heading-sm">{title}</h3>
          {children}
        </div>
      </div>
    </li>
  );
}

export default function ResearchSteps() {
  return (
    <ol role="list" aria-label="Your research journey" className="mt-8 md:mt-10">
      <ResearchStep icon={NumberCircleOne} id="research-project" title="Choose a research project">
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          Join a project or bring your own question. Put your academic expertise to work on AI Safety, with the people and resources to take it further.
        </p>
        <dl className="mt-8 lg:mt-10 lg:grid lg:grid-cols-4">
          {researchBenefits.map(({ title, description, icon: BenefitIcon }) => (
            <div key={title} className="py-4 first:pt-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0 xl:px-8">
              <dt className="flex items-center gap-3 font-serif text-title text-white lg:block">
                <BenefitIcon size={28} weight="regular" aria-hidden="true" className="shrink-0 text-orange lg:mb-5" />
                <span className="lg:block lg:min-h-[52px] lg:max-w-[160px]">{title}</span>
              </dt>
              <dd className="mt-3 text-kicker-sm leading-6 text-white/75 lg:mt-4">{description}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 lg:mt-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
          <p className="text-label leading-6 text-white/65">
            Apply any time. Agree your commitment per project. Remote participation welcome.
          </p>
          <Link href="/research/handbook" className="inline-flex shrink-0 items-center gap-3 self-start text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
            Read the research handbook <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </ResearchStep>

      <ResearchStep icon={NumberCircleTwo} id="research-support" title="Work with support">
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          Develop your work with supervisor feedback or independent collaborators. SAIN helps coordinate research and arrange compute according to project needs.
        </p>
        <div className="mt-6">
          <p className="mb-5 text-label text-white/65">Explore our supervisors’ research agendas</p>
          <ResearchPeople />
          <a href={`mailto:${RESEARCH_EMAIL}?subject=Becoming a SAIN research supervisor`} className="mt-4 inline-flex items-center gap-3 text-label text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
            Become a supervisor <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </ResearchStep>

      <ResearchStep icon={NumberCircleThree} id="output" title="Publish your findings">
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          Turn your findings into a paper, policy brief, or research tool. Get feedback on drafts, with potential support for conference travel.
        </p>
        <FeaturedPublications />
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/research#publications" className="inline-flex items-center gap-3 text-label text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
            View all publications <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={RESEARCH_INTEREST_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-accent">
            Join as a researcher<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </ResearchStep>
    </ol>
  );
}
