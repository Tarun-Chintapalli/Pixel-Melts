import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowUpRight, Lightbulb, Repeat, Sparkles } from "lucide-react";
import { PORTFOLIO } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

function CompareCard({ p }) {
  // `on` = alt image showing (lights on / "after").
  const [on, setOn] = useState(false);
  const isLight = p.mode === "light";

  const labelOff = isLight ? "Lights off" : "Before";
  const labelOn = isLight ? "Lights on" : "After";
  const ToggleIcon = isLight ? Lightbulb : Repeat;

  return (
    <div
      className="glass edge-glow group relative flex h-full flex-col overflow-hidden rounded-3xl"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <div className={`relative overflow-hidden ${p.featured ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {/* Base (resting) image */}
        <img
          src={p.image}
          alt={`${p.title} — ${labelOff}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Revealed image — fades in on hover / tap */}
        <img
          src={p.altImage}
          alt={`${p.title} — ${labelOn}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            on ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* glow wash when "lights on" */}
        {isLight && (
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              on ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${p.accent}33, transparent 70%)`,
            }}
          />
        )}

        {/* featured ribbon */}
        {p.featured && (
          <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-3 py-1 text-[11px] font-bold text-[#0a0a0f]">
            <Sparkles size={12} />
            Most loved
          </span>
        )}

        {/* state label pill */}
        <span
          className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md transition-colors"
          style={on ? { borderColor: `${p.accent}99`, color: p.accent } : undefined}
        >
          {on ? labelOn : labelOff}
        </span>

        {/* gradient scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--pm-void)] via-transparent to-transparent" />

        {/* explicit toggle — essential for touch (no hover) */}
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:border-[var(--pm-flame)]/60 hover:bg-[var(--pm-flame)]/20"
        >
          <ToggleIcon size={13} className="text-[var(--pm-flame)]" />
          {isLight ? (on ? "Off" : "Light it") : on ? "Before" : "After"}
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: p.accent }}
        >
          {p.category}
        </span>
        <h3 className="font-display mt-1 text-lg font-semibold">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--pm-mute)]">
          <Eye size={12} />
          {p.stat}
        </p>
      </div>
    </div>
  );
}

function PlainCard({ p }) {
  return (
    <a
      href="#quote"
      className="glass edge-glow group relative block h-full overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--pm-void)] via-transparent to-transparent" />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[var(--pm-flame)]/60 group-hover:bg-[var(--pm-flame)]/20">
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: p.accent }}
        >
          {p.category}
        </span>
        <h3 className="font-display mt-1 text-lg font-semibold">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--pm-mute)]">
          <Eye size={12} />
          {p.stat}
        </p>
      </div>
    </a>
  );
}

export default function Portfolio() {
  return (
    <Section id="work" className="py-24 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <Heading
          eyebrow="Selected Work"
          title={
            <>
              Held. Shown.
              <br />
              <span className="text-flame-gradient">Shipped.</span>
            </>
          }
        />
        <p className="max-w-sm text-sm leading-relaxed text-[var(--pm-mute)]">
          Real pieces off our floor — hover or tap the lamps to switch the lights
          on, and see the couple go from photo to Funko.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className={p.featured ? "sm:col-span-2" : ""}
          >
            {p.compare ? <CompareCard p={p} /> : <PlainCard p={p} />}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
