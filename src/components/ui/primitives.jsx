import React from "react";
import { motion } from "framer-motion";

/* Section wrapper with consistent max width + reveal */
export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`relative w-full px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

/* Eyebrow label — small monospace kicker */
export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--pm-flame)] ${className}`}
    >
      <span className="h-px w-6 bg-[var(--pm-flame)]/60" />
      {children}
    </span>
  );
}

/* Section heading block */
export function Heading({ eyebrow, title, sub, center = false, className = "" }) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={center ? "flex justify-center" : ""}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-5 text-base leading-relaxed text-[var(--pm-mute)] sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* Glass card */
export function GlassCard({ className = "", children, hover = true, ...rest }) {
  return (
    <div
      className={`glass rounded-3xl ${hover ? "edge-glow" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* Primary button — molten fill */
export function ButtonPrimary({ as = "button", className = "", children, ...rest }) {
  const Comp = as;
  return (
    <Comp
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-7 py-3.5 text-sm font-semibold text-[#0a0a0f] shadow-[0_10px_40px_-10px_rgba(244,123,32,0.7)] transition-transform duration-300 hover:scale-[1.03] active:scale-95 ${className}`}
      {...rest}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Comp>
  );
}

/* Secondary / ghost button */
export function ButtonGhost({ as = "button", className = "", children, ...rest }) {
  const Comp = as;
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-[var(--pm-white)] backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] active:scale-95 ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Reveal-on-scroll helper */
export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
