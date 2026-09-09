import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

export default function Services({ onQuote }) {
  return (
    <Section id="services" className="py-24 sm:py-32">
      <Heading
        eyebrow="Capabilities"
        title={
          <>
            One studio.
            <br />
            <span className="text-flame-gradient">Every discipline.</span>
          </>
        }
        sub="From a single overnight prototype to a ten-thousand-part production run, every service is delivered under one roof by engineers who obsess over the details."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={onQuote}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="glass edge-glow group relative flex flex-col items-start overflow-hidden rounded-3xl p-6 text-left transition-transform duration-300 hover:-translate-y-1.5"
          >
            {/* metric watermark */}
            <span className="pointer-events-none absolute -right-2 -top-3 font-display text-6xl font-bold text-white/[0.04] transition-colors duration-500 group-hover:text-[var(--pm-flame)]/10">
              {s.metric}
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--pm-flame)]">
              {s.tag}
            </span>
            <h3 className="font-display mt-3 text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--pm-mute)]">
              {s.desc}
            </p>

            <div className="mt-5 flex w-full items-center justify-between">
              <div>
                <span className="font-display text-lg font-bold text-[var(--pm-flame)]">
                  {s.metric}
                </span>
                <span className="ml-1.5 text-xs text-[var(--pm-faint)]">
                  {s.metricLabel}
                </span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--pm-mute)] transition-all duration-300 group-hover:border-[var(--pm-flame)]/50 group-hover:bg-[var(--pm-flame)]/10 group-hover:text-[var(--pm-flame)]">
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}
