import Image from "next/image";

/** Learning and practical work help people shape AI's trajectory. */
export default function HeroChart() {
  return (
    <Image
      src="/illustrations/sain-learning-to-steering.svg"
      alt="An accelerating AI trajectory starts at the origin. Two people learn and practise while a third holds a short tether, guiding the curve away from its dashed continuation."
      width={720}
      height={500}
      className="h-auto w-full max-w-[560px]"
      priority
    />
  );
}
