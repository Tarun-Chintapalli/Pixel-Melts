import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ArrowRight, Info } from "lucide-react";
import {
  QUOTE_MATERIALS,
  QUOTE_NOZZLES,
  QUOTE_FINISH,
  buildWhatsApp,
} from "../lib/site";
import { Section, Heading } from "./ui/primitives";

const SERVICE_TYPES = [
  "3D Printing",
  "Rapid Prototyping",
  "CAD Design",
  "Reverse Engineering",
  "Architecture Model",
  "Custom Production",
];

function Segmented({ options, value, onChange, getKey, getLabel }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const key = getKey(o);
        const on = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
              on
                ? "border-[var(--pm-flame)]/60 bg-[var(--pm-flame)]/12 text-white"
                : "border-white/10 bg-white/[0.03] text-[var(--pm-mute)] hover:border-white/20 hover:text-white"
            }`}
          >
            {getLabel(o)}
          </button>
        );
      })}
    </div>
  );
}

export default function QuoteCalculator() {
  const [service, setService] = useState(SERVICE_TYPES[0]);
  const [material, setMaterial] = useState(QUOTE_MATERIALS[0].id);
  // Default to the 0.4mm nozzle — the everyday all-rounder.
  const [nozzle, setNozzle] = useState("n04");
  const [finish, setFinish] = useState(QUOTE_FINISH[0].id);
  const [volume, setVolume] = useState(120); // cm3
  const [qty, setQty] = useState(1);
  const [rush, setRush] = useState(false);

  const estimate = useMemo(() => {
    const mat = QUOTE_MATERIALS.find((m) => m.id === material);
    const noz = QUOTE_NOZZLES.find((n) => n.id === nozzle);
    const fin = QUOTE_FINISH.find((f) => f.id === finish);

    const base = 350; // setup + handling
    const materialCost = volume * mat.rate * mat.mult;
    const nozzleCost = materialCost * (noz.mult - 1);
    const unit = base + materialCost + nozzleCost + fin.add;

    let total = unit * qty;
    // volume discount
    if (qty >= 10) total *= 0.85;
    else if (qty >= 5) total *= 0.92;
    if (rush) total *= 1.35;

    const low = Math.round((total * 0.92) / 10) * 10;
    const high = Math.round((total * 1.12) / 10) * 10;
    return { low, high, unit: Math.round(unit) };
  }, [material, nozzle, finish, volume, qty, rush]);

  const summary = `Hi PIXEL Melts! I'd like a quote.
Service: ${service}
Material: ${QUOTE_MATERIALS.find((m) => m.id === material).name}
Nozzle: ${QUOTE_NOZZLES.find((n) => n.id === nozzle).name}
Finish: ${QUOTE_FINISH.find((f) => f.id === finish).name}
Volume: ~${volume} cm³
Quantity: ${qty}
${rush ? "Rush: Yes (48h)\n" : ""}Estimated range: ₹${estimate.low.toLocaleString()} – ₹${estimate.high.toLocaleString()}`;

  return (
    <Section id="quote" className="py-24 sm:py-32">
      <Heading
        eyebrow="Instant Quote"
        center
        title={
          <>
            Price it in
            <span className="text-flame-gradient"> 60 seconds.</span>
          </>
        }
        sub="Move the sliders, pick your material, watch your estimate update live. No emails, no waiting — just numbers you can act on."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* configurator */}
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="space-y-7">
            <Field label="Service">
              <Segmented
                options={SERVICE_TYPES}
                value={service}
                onChange={setService}
                getKey={(o) => o}
                getLabel={(o) => o}
              />
            </Field>

            <Field label="Material">
              <Segmented
                options={QUOTE_MATERIALS}
                value={material}
                onChange={setMaterial}
                getKey={(o) => o.id}
                getLabel={(o) => o.name}
              />
            </Field>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Nozzle">
                <Segmented
                  options={QUOTE_NOZZLES}
                  value={nozzle}
                  onChange={setNozzle}
                  getKey={(o) => o.id}
                  getLabel={(o) => o.name}
                />
              </Field>
              <Field label="Finish">
                <Segmented
                  options={QUOTE_FINISH}
                  value={finish}
                  onChange={setFinish}
                  getKey={(o) => o.id}
                  getLabel={(o) => o.name}
                />
              </Field>
            </div>

            <Field
              label="Part volume"
              hint={`~${volume} cm³`}
            >
              <input
                type="range"
                min="10"
                max="1500"
                step="10"
                value={volume}
                onChange={(e) => setVolume(+e.target.value)}
                className="pm-range w-full"
                style={{ "--fill": `${((volume - 10) / (1500 - 10)) * 100}%` }}
              />
            </Field>

            <div className="grid items-end gap-7 sm:grid-cols-2">
              <Field label="Quantity" hint={qty >= 5 ? "Volume discount applied" : ""}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-lg font-bold transition-colors hover:bg-white/10"
                  >
                    –
                  </button>
                  <span className="font-display w-12 text-center text-2xl font-bold">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(999, q + 1))}
                    className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-lg font-bold transition-colors hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </Field>

              <button
                type="button"
                role="switch"
                aria-checked={rush}
                onClick={() => setRush((r) => !r)}
                className={`flex h-[52px] items-center justify-between gap-3 rounded-xl border px-4 transition-colors ${
                  rush
                    ? "border-[var(--pm-flame)]/60 bg-[var(--pm-flame)]/12"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                  <Zap
                    size={16}
                    className={`shrink-0 ${rush ? "text-[var(--pm-flame)]" : "text-[var(--pm-mute)]"}`}
                  />
                  <span className="truncate">Rush · 48h (+35%)</span>
                </span>
                <span
                  className={`relative block h-6 w-11 shrink-0 rounded-full transition-colors ${
                    rush ? "bg-[var(--pm-flame)]" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform duration-200 ${
                      rush ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* live estimate */}
        <div className="glass-strong relative flex flex-col overflow-hidden rounded-3xl p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[var(--pm-flame)]/25 blur-[80px]" />
          <div className="relative flex-1">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--pm-faint)]">
              <Sparkles size={13} className="text-[var(--pm-flame)]" />
              Estimated range
            </span>

            <div className="mt-4 min-h-[68px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${estimate.low}-${estimate.high}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-display text-4xl font-bold leading-none">
                    ₹{estimate.low.toLocaleString()}
                    <span className="text-[var(--pm-faint)]"> – </span>
                    ₹{estimate.high.toLocaleString()}
                  </p>
                </motion.div>
              </AnimatePresence>
              <p className="mt-2 text-sm text-[var(--pm-mute)]">
                ≈ ₹{estimate.unit.toLocaleString()} per unit · {qty}{" "}
                {qty > 1 ? "units" : "unit"}
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
              <Row label="Service" value={service} />
              <Row
                label="Material"
                value={QUOTE_MATERIALS.find((m) => m.id === material).name}
              />
              <Row
                label="Finish"
                value={QUOTE_FINISH.find((f) => f.id === finish).name}
              />
              {rush && (
                <Row label="Priority" value="48h rush" accent />
              )}
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[var(--pm-faint)]">
              <Info size={13} className="mt-0.5 shrink-0" />
              Indicative only. Send your file for a firm quote — usually within
              the hour during business days.
            </p>
          </div>

          <a
            href={buildWhatsApp(summary)}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-7 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-6 py-4 text-sm font-bold text-[#0a0a0f] transition-transform hover:scale-[1.02]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              Lock in this quote
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .pm-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--pm-flame), var(--pm-ember)) no-repeat;
          background-size: var(--fill, 40%) 100%;
          background-color: rgba(255,255,255,0.08);
          cursor: pointer;
        }
        .pm-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 22px; width: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--pm-flame);
          box-shadow: 0 0 16px -2px var(--pm-flame);
          cursor: grab;
        }
        .pm-range::-moz-range-thumb {
          height: 22px; width: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--pm-flame);
          box-shadow: 0 0 16px -2px var(--pm-flame);
          cursor: grab;
        }
      `}</style>
    </Section>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--pm-faint)]">
          {label}
        </label>
        {hint && (
          <span className="text-xs font-medium text-[var(--pm-flame)]">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--pm-mute)]">{label}</span>
      <span
        className={`font-medium ${accent ? "text-[var(--pm-flame)]" : "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}
