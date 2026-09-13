/* The course outline row from design.md, reused for the things a reader has to
   assemble before they apply: a top hairline per row, the number in a 22px
   column set in orange-ink (the letterform orange, which clears AA on white
   and on cream), the line itself in Archivo at 14.5/20.

   An index is two digits doing wayfinding. If a number here ever has to carry
   a sentence, this is the wrong component. */
export default function OutlineRows({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ol role="list" className={className}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-3 border-t border-navy/10 py-[7px] last:border-b last:border-navy/10"
        >
          <span
            aria-hidden="true"
            className="w-[22px] shrink-0 font-sans text-[12px] leading-5 text-orange-ink"
          >
            {i + 1}
          </span>
          <span className="min-w-0 font-sans text-ui text-navy">{item}</span>
        </li>
      ))}
    </ol>
  );
}
