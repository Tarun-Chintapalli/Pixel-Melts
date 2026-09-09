import React, { useRef, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { ButtonPrimary, ButtonGhost } from "./ui/primitives";

const ModelViewer = lazy(() => import("./ModelViewer"));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ onQuote, onAssistant }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yModel = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-backdrop" />
        <div className="animate-float-a absolute -left-40 top-10 h-[38rem] w-[38rem] rounded-full bg-[var(--pm-flame)]/20 blur-[130px]" />
        <div className="animate-float-b absolute -right-40 bottom-0 h-[42rem] w-[42rem] rounded-full bg-[var(--pm-violet)]/15 blur-[150px]" />
        <div className="animate-float-c absolute left-1/3 top-1/2 h-[26rem] w-[26rem] rounded-full bg-[var(--pm-ice)]/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--pm-void)] to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — copy */}
        <motion.div
          style={{ y: yText, opacity }}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[var(--pm-mute)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--pm-flame)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--pm-flame)]" />
              </span>
              <span className="hidden xs:inline">Now booking Q3 production slots</span>
              <span className="xs:hidden">Booking Q3 slots</span>
              <span className="text-[var(--pm-faint)]">·</span>
              <span className="text-[var(--pm-flame)]">3 left this week</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display mt-6 text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-chrome">We turn</span>
            <br />
            <span className="text-flame-gradient">imagination</span>
            <br />
            <span className="text-chrome">into matter.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--pm-mute)]"
          >
            Precision FDM 3D printing, rapid prototyping and small-batch
            production on a Bambu Lab P2S — dialed-in profiles, engineering-grade
            filaments, finished to be held, shown, and shipped.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonPrimary onClick={onQuote}>
              Get an instant quote
              <ArrowRight size={16} />
            </ButtonPrimary>
            <ButtonGhost onClick={onAssistant}>
              <Play size={14} className="text-[var(--pm-flame)]" />
              Ask the AI assistant
            </ButtonGhost>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--pm-mute)]"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--pm-flame)]" />
              Bambu Lab P2S
            </span>
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--pm-flame)]" />
              24h prototype turnaround
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--pm-flame)]" />
              0.08mm layers
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D model */}
        <motion.div
          style={{ y: yModel }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass relative overflow-hidden rounded-[2rem] p-2 glow-flame">
            {/* scanning line */}
            <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-24 bg-gradient-to-b from-[var(--pm-flame)]/25 to-transparent animate-scan" />

            <div className="relative overflow-hidden rounded-[1.6rem] bg-[radial-gradient(ellipse_at_center,_rgba(244,123,32,0.12),_transparent_70%)]">
              <Suspense
                fallback={
                  <div className="flex h-[460px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[var(--pm-flame)]" />
                  </div>
                }
              >
                <ModelViewer
                  src="/models/hero.stl"
                  color="#f47b20"
                  height={460}
                  enableZoom
                  pitch={0}
                  spin={0.007}
                />
              </Suspense>
            </div>

            {/* HUD chips */}
            <div className="pointer-events-none absolute left-5 top-5 z-20 glass rounded-xl px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--pm-faint)]">
                Live preview
              </p>
              <p className="text-sm font-semibold">Drag to rotate</p>
            </div>
            <div className="pointer-events-none absolute bottom-5 right-5 z-20 glass rounded-xl px-3 py-2 text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--pm-faint)]">
                Nozzle
              </p>
              <p className="text-sm font-semibold text-[var(--pm-flame)]">
                0.4mm
              </p>
            </div>
          </div>

          {/* floating spec cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-strong absolute -left-4 top-1/3 hidden rounded-2xl p-4 sm:block"
          >
            <p className="font-display text-2xl font-bold text-[var(--pm-flame)]">
              0.08mm
            </p>
            <p className="text-xs text-[var(--pm-mute)]">layer precision</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-max flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--pm-faint)]">
          Scroll to explore
        </span>
        <div className="flex h-8 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-[var(--pm-flame)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
