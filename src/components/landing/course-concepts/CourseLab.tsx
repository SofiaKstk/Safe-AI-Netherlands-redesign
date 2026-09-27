"use client";

import { useEffect, useState } from "react";

import CourseTabs from "@/components/landing/CourseTabs";
import ConceptC from "./ConceptC";
import ConceptD from "./ConceptD";

/* TEMPORARY design lab: switch course picker concepts with ?course=c|d.
   Remove once one is chosen. */
const OPTIONS = [
  { id: "", label: "Now" },
  { id: "c", label: "C · Sentence" },
  { id: "d", label: "D · Simple" },
];

export default function CourseLab() {
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(new URLSearchParams(window.location.search).get("course") ?? "");
  }, []);
  const pick = (id: string) => {
    setActive(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("course", id);
    else url.searchParams.delete("course");
    window.history.replaceState(null, "", url);
  };
  return (
    <>
      {active === "c" ? <ConceptC /> : active === "d" ? <ConceptD /> : <CourseTabs />}
      <div className="fixed bottom-4 left-4 z-[200] flex gap-1 border border-navy/15 bg-white p-1 font-sans text-caption shadow-[0_8px_24px_#021C4D29]">
        {OPTIONS.map((o) => (
          <button
            key={o.id || "now"}
            type="button"
            onClick={() => pick(o.id)}
            className={`px-3 py-1.5 ${active === o.id ? "bg-navy text-white" : "text-navy hover:bg-cream"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </>
  );
}
