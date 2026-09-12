"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({ children, className, delay = 0, hero = false }: {
  children: ReactNode; className?: string; delay?: number; hero?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(16px)" }}
      animate={hero ? { opacity: 1, transform: "translateY(0px)" } : undefined}
      whileInView={hero ? undefined : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0.15 : 0.5, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}
