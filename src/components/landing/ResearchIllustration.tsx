"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function ResearchIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const transform = useTransform(scrollYProgress, [0, 1], ["translateY(12px)", "translateY(-12px)"]);
  return (
    <motion.div ref={ref} style={{ transform: reduce ? "none" : transform }} className="mx-auto w-full max-w-[380px]">
      <svg viewBox="0 0 420 290" fill="none" role="img" aria-label="Two researchers examining evidence together at a shared workbench">
        <g stroke="#F7F5F2" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M45 217 Q205 214 374 217 M80 219 L73 272 M345 218 L351 272" />
          <path d="M95 159 Q68 160 65 189 L65 214 M129 158 Q148 161 157 187 L183 193" />
          <path d="M96 158 L108 171 L122 156 M89 122 Q88 149 105 153 Q125 155 129 124" fill="#021C4D" />
          <path d="M88 127 Q78 98 104 95 Q132 93 134 120 L118 111 Q106 126 88 127Z" fill="#F7F5F2" />
          <path d="M105 135 L106 136 M119 132 L120 133 M108 143 Q115 146 119 140" />
          <path d="M86 182 Q84 199 107 198 L146 202 M108 173 L104 187" />
          <path d="M292 158 Q274 161 262 186 L235 193 M324 156 Q348 163 351 193 L350 214" />
          <path d="M293 153 L306 169 L319 155 M288 120 Q285 146 304 153 Q324 157 330 127" fill="#021C4D" />
          <path d="M287 127 Q278 97 308 96 Q336 99 334 130 L322 114 Q305 124 287 127Z" fill="#F7F5F2" />
          <path d="M296 134 L297 135 M312 137 L313 138 M299 144 Q306 150 313 144 M326 180 Q336 201 311 201 L276 202" />
          <path d="M158 181 L209 188 L209 214 L151 206Z M209 188 L254 181 L264 206 L209 214" fill="#021C4D" />
          <path d="M167 192 L194 196 M166 199 L189 202 M222 196 L244 191 M224 203 L248 199" strokeOpacity=".5" />
          <path d="M178 60 L178 136 L251 136 L251 59Z" fill="#021C4D" />
          <path d="M191 78 L235 78 M191 88 L223 88" strokeOpacity=".4" />
          <path d="M195 120 L208 107 L221 115 L237 99" stroke="#FF6025" />
          <path d="M204 48 Q212 31 226 43 M205 151 L202 163 M226 151 L230 162" strokeOpacity=".35" />
        </g>
        <circle cx="237" cy="99" r="3.5" fill="#FF6025" />
        <path d="M355 66 Q356 75 364 76 Q356 77 355 86 Q354 77 346 76 Q354 75 355 66Z" fill="#FF6025" />
      </svg>
    </motion.div>
  );
}
