import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MATERIALS } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

function PropBar({ label, value, accent }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-[var(--pm-mute)]">{label}</span>
        <span className="font-mono text-xs text-[var(--pm-white)]">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Materials() {
  const [active, setActive] = useState(0);
  const mat = MATERIALS[active];

  return (
    <Section id="materials" className="py-24 sm:py-32">
      <Heading
        eyebrow="Material Explorer"
        title={
          <>
            The right matter
            <br />
            <span className="text-flame-gradient">for the mission.</span>
          </>
        }
        sub="Forty-plus certified materials, from vivid display polymers to full-density metal. Explore how each performs before you commit a single gram."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* selector list */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {MATERIALS.map((m, i) => {
            const on = active === i;
            return (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`glass edge-glow group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                  on ? "ring-1 ring-white/25" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span
                  className="absolute inset-x-0 bottom-0 h-1 origin-left transition-transform duration-300"
                  style={{
                    background: m.accent,
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                <div
                  className="mb-3 h-8 w-8 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${m.accent}, transparent 75%)`,
                    boxShadow: `0 0 20px -4px ${m.accent}`,
                  }}
                />
                <p className="font-display text-sm font-semibold">{m.name}</p>
                <p className="text-[11px] text-[var(--pm-faint)]">{m.family}</p>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[80px]"
              style={{ background: mat.accent, opacity: 0.25 }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.3em]"
                    style={{ color: mat.accent }}
                  >
                    {mat.family}
                  </p>
                  <h3 className="font-display mt-1 text-3xl font-bold">
                    {mat.name}
                  </h3>
                </div>
                <div
                  className="h-16 w-16 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${mat.accent}, #0a0a0f 80%)`,
                    boxShadow: `0 0 40px -8px ${mat.accent}`,
                  }}
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--pm-mute)]">
                {mat.blurb}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {mat.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--pm-mute)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {Object.entries(mat.props).map(([k, v]) => (
                  <PropBar key={k} label={k} value={v} accent={mat.accent} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
