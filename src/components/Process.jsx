import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { PROCESS_STEPS } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <Section id="process" className="py-24 sm:py-32">
      <Heading
        eyebrow="The Journey"
        center
        title={
          <>
            From spark to
            <span className="text-flame-gradient"> shipped</span>.
          </>
        }
        sub="Six deliberate stages. Complete visibility at every one. This is what engineering discipline feels like."
      />

      <div className="mt-16 grid gap-4 lg:grid-cols-2">
        {PROCESS_STEPS.map((step, i) => {
          const open = active === i;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <button
                onClick={() => setActive(open ? -1 : i)}
                className={`glass edge-glow group relative w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 ${
                  open ? "ring-1 ring-[var(--pm-flame)]/40" : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`font-mono text-2xl font-bold transition-colors duration-300 ${
                      open ? "text-[var(--pm-flame)]" : "text-white/20"
                    }`}
                  >
                    {step.n}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold">
                        {step.title}
                      </h3>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
                          open
                            ? "rotate-45 border-[var(--pm-flame)]/50 bg-[var(--pm-flame)]/10 text-[var(--pm-flame)]"
                            : "text-[var(--pm-mute)]"
                        }`}
                      >
                        <Plus size={15} />
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--pm-mute)]">
                      {step.desc}
                    </p>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 border-t border-white/10 pt-4 font-mono text-xs leading-relaxed text-[var(--pm-flame)]/90">
                            {step.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* progress bar */}
                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((i + 1) / PROCESS_STEPS.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
