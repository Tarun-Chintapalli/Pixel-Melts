import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "../lib/site";

export default function Navbar({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "glass-strong shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
            <img
              src="/PIXEL Melts-2.png"
              alt="PIXEL Melts"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            PIXEL<span className="text-[var(--pm-flame)]">Melts</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--pm-mute)] transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onQuote}
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-5 py-2.5 text-sm font-semibold text-[#0a0a0f] transition-transform hover:scale-[1.04] sm:inline-flex"
          >
            Get a Quote
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-strong absolute inset-x-4 top-[72px] rounded-2xl p-3 lg:hidden"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-[var(--pm-mute)] transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onQuote?.();
              }}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-4 py-3 text-center text-base font-semibold text-[#0a0a0f]"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
