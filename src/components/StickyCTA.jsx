import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, MessageCircle } from "lucide-react";

export default function StickyCTA({ onQuote, onAssistant }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4"
        >
          <div className="glass-strong flex w-full max-w-lg items-center gap-2 rounded-2xl p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="hidden flex-1 pl-3 sm:block">
              <p className="text-sm font-semibold leading-tight">
                Ready to build something real?
              </p>
              <p className="text-xs text-[var(--pm-mute)]">
                Instant estimate in under 60 seconds.
              </p>
            </div>

            <button
              onClick={onAssistant}
              className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={17} className="text-[var(--pm-flame)]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            <button
              onClick={onQuote}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-4 text-sm font-bold text-[#0a0a0f] transition-transform hover:scale-[1.02] sm:flex-none"
            >
              <Calculator size={17} />
              Instant Quote
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
