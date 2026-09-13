/* A person in a role, on the light ground. The same device the research band
 * ships on inverse (ResearchPeople): a square tile in a wrapping row, the
 * frame holding still while the portrait moves inside it, an orange rule
 * drawing under the serif name from the left. Square because everything in
 * this system is square; never a circle, never an initial avatar.
 *
 * The ink flips for the ground: hairlines are navy at low opacity instead of
 * white, the name is navy, the role sits at navy/70. Hover cues repeat on
 * focus-visible because a keyboard never fires :hover, and both transforms
 * sit behind motion-safe.
 *
 * Photographs are served as plain <img>: `output: "export"` ships next/image
 * unoptimized anyway, and the team and advisory portraits have no responsive
 * rungs yet (see scripts/generate-responsive-images.mjs).
 */
export default function Portrait({
  name,
  meta,
  href,
  image,
  width = "w-[140px]",
}: {
  name: string;
  /** Role or affiliation, set in footnote tone under the name. */
  meta: string;
  href: string;
  image: string;
  /** Tailwind width class for the tile column. */
  width?: string;
}) {
  return (
    <li className={width}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block outline-offset-4"
      >
        {/* isolate: a scaled child under a clip needs its own stacking
            context or Safari lets the corners through. */}
        <span className="block isolate overflow-hidden border border-navy/15 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-navy/45 group-focus-visible:border-navy/45">
          <img
            src={image}
            alt=""
            width={336}
            height={336}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]"
          />
        </span>

        <p className="mt-3.5 font-serif text-title-sm leading-6 text-navy">
          {/* inline-block so the rule hugs the name rather than the column. */}
          <span className="relative inline-block">
            {name}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </span>
        </p>

        <p className="mt-1.5 font-sans text-footnote leading-5 text-navy/70">{meta}</p>
        {/* The whole tile is the link, so the destination is named for anyone
            who cannot see the hover state. */}
        <span className="sr-only">Profile (opens in a new tab)</span>
      </a>
    </li>
  );
}
