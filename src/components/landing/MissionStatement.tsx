"use client";

import type { Icon } from "@phosphor-icons/react";
import { GraduationCap, Path, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";

/**
 * What SAIN is for, said once, before the landing starts offering doors.
 *
 * The problem, then SAIN's answer to it. The problem is the skill gap in
 * docs/theory_of_change.md ("Too few people have the knowledge to work on AI
 * safety, in research, policy, industry, or public discourse"); the answer's
 * three verbs are bold, each led by a glyph, and they arrive in turn as the
 * sentence comes into view: the word inks in from faint, its glyph settles,
 * and an orange rule draws under it. Once, on intersection, not on scroll
 * position. The words are bold from the first paint so nothing reflows, and
 * the rest state is readable (faint, never hidden) for anyone the animation
 * never reaches. Reduced motion shows the end state. Set on the navy
 * mission band, so the inks are white.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Beat({
  icon: Icon,
  step,
  children,
}: {
  icon: Icon;
  step: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const delay = 0.25 + step * 0.35;
  const on = { opacity: 1, scale: 1, y: 0, scaleX: 1 };
  return (
    <motion.span
      className="whitespace-nowrap"
      initial={reduce ? false : "off"}
      whileInView="on"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.span
        aria-hidden="true"
        className="mx-[0.08em] inline-block align-middle"
        variants={{
          off: { opacity: 0, scale: 0.6, y: 6 },
          on: { opacity: on.opacity, scale: on.scale, y: on.y },
        }}
        transition={{ duration: 0.5, delay, ease: EASE }}
      >
        <Icon size="0.95em" weight="light" className="-translate-y-[0.06em] text-orange" />
      </motion.span>{" "}
      <span className="relative inline-block">
        <motion.span
          className="font-semibold"
          variants={{ off: { opacity: 0.28 }, on: { opacity: 1 } }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE }}
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-[0.06em] h-[3px] origin-left bg-orange"
          variants={{ off: { scaleX: 0 }, on: { scaleX: on.scaleX } }}
          transition={{ duration: 0.55, delay: delay + 0.2, ease: EASE }}
        />
      </span>
    </motion.span>
  );
}

export default function MissionStatement() {
  return (
    /* Set above the heading role on purpose: this is the landing's one
       statement band, and it has to carry the band on its own. */
    <p className="mx-auto max-w-[1000px] text-balance text-center font-serif text-[clamp(1.75rem,1.6vw+1.35rem,2.625rem)] leading-[1.3] tracking-[-0.018em] text-white">
      <span className="text-white/50">
        Too few people know how to work on AI safety, in research, in policy, or
        in public debate.
      </span>{" "}
      SAIN <Beat icon={GraduationCap} step={0}>trains</Beat> more of them,{" "}
      <Beat icon={UsersThree} step={1}>connects</Beat> them, and{" "}
      gets them <Beat icon={Path} step={2}>started</Beat>.
    </p>
  );
}
