const placements = {
  mission: [
    "left-[26%] top-7 size-4",
    "right-[8%] top-12 size-6",
    "left-[2%] top-[65%] size-3",
    "bottom-0 left-[51%] size-5",
  ],
  courses: [
    "left-[12%] top-20 size-6",
    "right-[15%] top-10 size-4",
    "right-[2%] top-[47%] size-3",
    "bottom-5 left-[35%] size-4",
  ],
  community: [
    "left-[18%] top-7 size-4",
    "right-[29%] top-12 size-5",
    "right-[2%] bottom-[35%] size-4",
    "bottom-8 left-[23%] size-6",
  ],
};

/** Sparse, varied stars mark the open spaces between content groups. */
export default function SectionStars({ section }: { section: keyof typeof placements }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {placements[section].map((placement) => (
        <svg key={placement} focusable="false" viewBox="0 0 20 20"
          className={`absolute fill-navy opacity-[0.14] md:opacity-[0.22] ${placement}`}>
          <path d="M10 0 Q11 9 20 10 Q11 11 10 20 Q9 11 0 10 Q9 9 10 0Z" />
        </svg>
      ))}
    </div>
  );
}
