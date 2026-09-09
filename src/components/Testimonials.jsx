import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d) => {
    setDir(d);
    setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <Section className="py-24 sm:py-32">
      <Heading
        eyebrow="Trusted by builders"
        center
        title={
          <>
            Proof, from people
            <br />
            <span className="text-flame-gradient">who ship.</span>
          </>
        }
      />

      <div className="relative mx-auto mt-14 max-w-3xl">
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <Quote
            size={64}
            className="absolute -left-2 -top-2 text-white/[0.05]"
          />
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[var(--pm-flame)]/15 blur-[80px]" />

          <div className="relative min-h-[220px] sm:min-h-[190px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className="fill-[var(--pm-flame)] text-[var(--pm-flame)]"
                    />
                  ))}
                </div>
                <p className="font-display mt-5 text-xl font-medium leading-relaxed sm:text-2xl">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--pm-flame)] to-[var(--pm-ember)] font-display text-sm font-bold text-[#0a0a0f]">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[var(--pm-mute)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--pm-mute)] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                onClick={() => {
                  setDir(d > i ? 1 : -1);
                  setI(d);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  d === i ? "w-8 bg-[var(--pm-flame)]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--pm-mute)] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}
