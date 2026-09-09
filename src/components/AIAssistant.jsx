import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, ArrowRight } from "lucide-react";
import { buildWhatsApp } from "../lib/site";

/**
 * Guided AI-style quote assistant.
 * Runs a scripted decision tree that feels conversational and ends in a
 * personalized recommendation + WhatsApp handoff. No backend required.
 */

const FLOW = {
  start: {
    bot: "Hey, I'm Melt — your quoting assistant. In under a minute I'll shape the right build for you. First up: what are you making?",
    options: [
      { label: "A functional prototype", next: "material", tag: "Rapid Prototyping" },
      { label: "A display / art piece", next: "material", tag: "Display Model" },
      { label: "End-use production parts", next: "material", tag: "Industrial Production" },
      { label: "Reverse-engineer a part", next: "material", tag: "Reverse Engineering" },
    ],
  },
  material: {
    bot: "Great choice. How tough does it need to be?",
    options: [
      { label: "Just needs to look good", next: "qty", rec: "PLA", accent: "#6ee7ff" },
      { label: "Everyday functional", next: "qty", rec: "PETG HF", accent: "#8b7cff" },
      { label: "Heat & UV resistant", next: "qty", rec: "ASA", accent: "#ff9d4d" },
      { label: "Flexible / rubbery", next: "qty", rec: "TPU 95A", accent: "#ff5e3a" },
      { label: "Maximum strength", next: "qty", rec: "PC / PA-CF", accent: "#f47b20" },
    ],
  },
  qty: {
    bot: "Understood. How many do you need?",
    options: [
      { label: "Just one", next: "done", qty: "1 unit" },
      { label: "A small batch (2–10)", next: "done", qty: "small batch" },
      { label: "Production volume (10+)", next: "done", qty: "production run" },
    ],
  },
};

export default function AIAssistant({ open, onClose }) {
  const [node, setNode] = useState("start");
  // Seed the greeting as initial state — the parent remounts this component
  // (via a changing key) each time it opens, so every session starts fresh
  // without any setState-in-effect churn.
  const [messages, setMessages] = useState([
    { from: "bot", text: FLOW.start.bot },
  ]);
  const [typing, setTyping] = useState(false);
  const [profile, setProfile] = useState({});
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);

  const pushBot = useCallback((text) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text }]);
      setTyping(false);
    }, 650);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const choose = (opt) => {
    setMessages((m) => [...m, { from: "user", text: opt.label }]);
    const nextProfile = { ...profile };
    if (opt.tag) nextProfile.tag = opt.tag;
    if (opt.rec) {
      nextProfile.rec = opt.rec;
      nextProfile.accent = opt.accent;
    }
    if (opt.qty) nextProfile.qty = opt.qty;
    setProfile(nextProfile);

    if (opt.next === "done") {
      setNode("done");
      setTimeout(() => {
        pushBot(
          `Perfect. For a ${nextProfile.tag?.toLowerCase() || "custom build"} at ${nextProfile.qty}, I'd recommend ${nextProfile.rec}. Here's your tailored recommendation 👇`
        );
        setTimeout(() => setDone(true), 900);
      }, 300);
    } else {
      setNode(opt.next);
      setTimeout(() => pushBot(FLOW[opt.next].bot), 300);
    }
  };

  const current = FLOW[node];

  const handoff = `Hi PIXEL Melts! Melt (your AI assistant) matched me with a build:
Project: ${profile.tag || "Custom"}
Recommended material: ${profile.rec || "TBD"}
Quantity: ${profile.qty || "TBD"}
I'd like a firm quote.`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[61] mx-auto flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[560px] sm:rounded-3xl glass-strong"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--pm-flame)] to-[var(--pm-ember)]">
                  <Sparkles size={18} className="text-[#0a0a0f]" />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--pm-slate)] bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Melt</p>
                  <p className="text-xs text-[var(--pm-faint)]">
                    AI quoting assistant · online
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[var(--pm-mute)] transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] text-[#0a0a0f]"
                        : "rounded-bl-md border border-white/10 bg-white/[0.04] text-[var(--pm-white)]"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[var(--pm-mute)]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* recommendation card */}
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass overflow-hidden rounded-2xl p-4"
                >
                  <div
                    className="mb-3 h-1 w-full rounded-full"
                    style={{ background: profile.accent || "var(--pm-flame)" }}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--pm-faint)]">
                    Your match
                  </p>
                  <p className="font-display mt-1 text-xl font-bold">
                    {profile.rec}
                  </p>
                  <p className="mt-1 text-xs text-[var(--pm-mute)]">
                    {profile.tag} · {profile.qty}
                  </p>
                  <a
                    href={buildWhatsApp(handoff)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-4 py-3 text-sm font-bold text-[#0a0a0f]"
                  >
                    Get my firm quote
                    <ArrowRight size={15} />
                  </a>
                </motion.div>
              )}
            </div>

            {/* options / footer */}
            <div className="border-t border-white/10 p-4">
              {!done && !typing && current?.options && (
                <div className="flex flex-wrap gap-2">
                  {current.options.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => choose(o)}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-left text-sm font-medium text-[var(--pm-white)] transition-all hover:border-[var(--pm-flame)]/50 hover:bg-[var(--pm-flame)]/10"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
              {done && (
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[var(--pm-faint)]">
                  <Send size={15} />
                  Chat handed off to our team on WhatsApp.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
