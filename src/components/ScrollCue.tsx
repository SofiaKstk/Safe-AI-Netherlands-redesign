import { CaretDown } from "@phosphor-icons/react/dist/ssr";
type ScrollCueProps = {
  href: string;
  label?: string;
  variant?: "light" | "dark";
};

export default function ScrollCue({
  href,
  label = "Scroll to next section",
  variant = "light",
}: ScrollCueProps) {
  const colorClass =
    variant === "dark"
      ? "border-white/25 text-white/70 hover:border-white/50 hover:text-white"
      : "border-navy-900/15 text-navy-900/45 hover:border-dutch-orange/50 hover:text-dutch-orange";

  return (
    <a
      href={href}
      aria-label={label}
      className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border p-3 transition-colors animate-bounce ${colorClass}`}
    >
      <CaretDown className="h-5 w-5" weight="light" aria-hidden="true" />
    </a>
  );
}
