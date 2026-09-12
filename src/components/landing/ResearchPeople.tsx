import Image from "next/image";
import { supervisors } from "@/data/research";

export default function ResearchPeople() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-4 md:grid-cols-5 md:gap-x-8">
      {supervisors.map((person) => (
        <div key={person.name} className="flex flex-col items-center text-center last:col-span-2 last:md:col-span-1">
          <span className="block size-[88px] overflow-hidden rounded-full border border-white/25 md:size-[104px]">
            <Image src={person.image} alt="" width={208} height={208} sizes="104px" className="size-full object-cover" />
          </span>
          <h4 className="mt-4 font-serif text-[18px] leading-6 text-white">{person.name}</h4>
          <p className="mb-4 mt-2 max-w-[200px] text-[13px] leading-5 text-white/70">{person.positionShort}</p>
          <a href={person.agenda} target="_blank" rel="noopener noreferrer"
            aria-label={`Research agenda for ${person.name} (opens in a new tab)`}
            className="mt-auto text-[13px] leading-5 text-white/85 underline decoration-white/35 underline-offset-4 transition-colors hover:text-orange focus-visible:text-orange">
            Research agenda ↗
          </a>
        </div>
      ))}
    </div>
  );
}
