"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { supervisors } from "@/data/research";

function Person({ person, index }: { person: (typeof supervisors)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const open = hovered || focused || expanded;
  const id = `research-person-${index}`;
  return (
    <div className="relative flex flex-col items-center pb-20 last:col-span-2 last:md:col-span-1">
      <button type="button" className="flex flex-col items-center gap-4 text-white"
        onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setExpanded(false); }}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => { if (e.key === "Escape") { setHovered(false); setFocused(false); setExpanded(false); } }}
        aria-expanded={open} aria-controls={id}>
        <span className="block size-[88px] overflow-hidden rounded-full border border-white/25 md:size-[104px]">
          <Image src={person.image} alt="" width={208} height={208} sizes="104px" className="size-full object-cover" />
        </span>
        <span className="font-serif text-[18px] leading-6">{person.name}</span>
      </button>
      <motion.div id={id} aria-hidden={!open}
        className="pointer-events-none absolute top-[140px] max-w-[200px] px-2 text-center font-sans text-[13px] leading-5 text-white/75 md:top-[156px]"
        initial={false}
        animate={{ opacity: open ? 1 : 0, transform: open || reduce ? "translateY(0px) scale(1)" : "translateY(-8px) scale(0.96)" }}
        transition={reduce ? { duration: 0.15 } : { type: "spring", duration: 0.5, bounce: 0.22 }}>
        {person.positionShort}
      </motion.div>
    </div>
  );
}

export default function ResearchPeople() {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-5 md:gap-x-8">
    {supervisors.map((person, index) => <Person key={person.name} person={person} index={index} />)}
  </div>;
}
