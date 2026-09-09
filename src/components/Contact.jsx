import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CalendarClock,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { SERVICES, buildWhatsApp } from "../lib/site";
import { Section, Heading } from "./ui/primitives";

const SLOTS = ["Morning", "Afternoon", "Evening"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0].title,
    date: "",
    slot: "Morning",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email needed";
    if (form.phone && !/^[\d+\-\s()]{7,}$/.test(form.phone))
      e.phone = "Check this number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const msg = `New project enquiry — PIXEL Melts
Name: ${form.name}
Email: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}
Service: ${form.service}
Preferred consult: ${form.date || "flexible"} · ${form.slot}
Details: ${form.details || "—"}`;

    setSent(true);
    window.open(buildWhatsApp(msg), "_blank");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Section id="contact" className="py-24 sm:py-32">
      <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-6 sm:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--pm-flame)]/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--pm-violet)]/15 blur-[100px]" />

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* left — pitch + booking value props */}
          <div>
            <Heading
              eyebrow="Start a project"
              title={
                <>
                  Let's build
                  <br />
                  <span className="text-flame-gradient">something real.</span>
                </>
              }
              sub="Book a free 20-minute consult or drop your brief. An engineer — not a bot — replies within the hour on business days."
            />

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Clock,
                  title: "Reply within the hour",
                  desc: "Real engineers, business hours, no ticket queues.",
                },
                {
                  icon: CalendarClock,
                  title: "Free 20-min consult",
                  desc: "We scope feasibility before you spend a rupee.",
                },
                {
                  icon: ShieldCheck,
                  title: "Your IP is protected",
                  desc: "NDA on request. Your files stay yours, always.",
                },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--pm-flame)]">
                    <b.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="text-sm text-[var(--pm-mute)]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right — form / success */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass flex min-h-[400px] flex-col items-center justify-center rounded-3xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--pm-flame)] to-[var(--pm-ember)]"
                  >
                    <Check size={40} strokeWidth={3} className="text-[#0a0a0f]" />
                  </motion.div>
                  <h3 className="font-display mt-6 text-2xl font-bold">
                    Brief received.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[var(--pm-mute)]">
                    We've opened WhatsApp so you can hit send. An engineer will
                    take it from there — usually within the hour.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    <Sparkles size={15} className="text-[var(--pm-flame)]" />
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={submit}
                  className="glass rounded-3xl p-6 sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Name"
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      error={errors.name}
                      placeholder="Jane Maker"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      error={errors.email}
                      placeholder="jane@studio.com"
                    />
                    <Input
                      label="Phone (optional)"
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      error={errors.phone}
                      placeholder="+91 …"
                    />
                    <div>
                      <FieldLabel>Service</FieldLabel>
                      <select
                        value={form.service}
                        onChange={(e) => set("service", e.target.value)}
                        className="pm-input"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* booking */}
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel>
                        <CalendarClock size={12} className="mr-1 inline" />
                        Consult date
                      </FieldLabel>
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className="pm-input [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <FieldLabel>Preferred time</FieldLabel>
                      <div className="flex gap-2">
                        {SLOTS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => set("slot", s)}
                            className={`flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                              form.slot === s
                                ? "border-[var(--pm-flame)]/60 bg-[var(--pm-flame)]/12 text-white"
                                : "border-white/10 bg-white/[0.03] text-[var(--pm-mute)] hover:text-white"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <FieldLabel>Project details</FieldLabel>
                    <textarea
                      rows={3}
                      value={form.details}
                      onChange={(e) => set("details", e.target.value)}
                      placeholder="Materials, dimensions, quantity, deadline, or paste a link to your file…"
                      className="pm-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--pm-flame)] to-[var(--pm-ember)] px-6 py-4 text-sm font-bold text-[#0a0a0f] transition-transform hover:scale-[1.01]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-2">
                      Send brief &amp; book consult
                      <ArrowRight size={16} />
                    </span>
                  </button>
                  <p className="mt-3 text-center text-xs text-[var(--pm-faint)]">
                    No spam. No obligation. Just great parts.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .pm-input {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: var(--pm-white);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .pm-input::placeholder { color: var(--pm-faint); }
        .pm-input:focus {
          border-color: rgba(244,123,32,0.6);
          background: rgba(244,123,32,0.05);
        }
        .pm-input option { background: #14141c; }
      `}</style>
    </Section>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--pm-faint)]">
      {children}
    </label>
  );
}

function Input({ label, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pm-input ${error ? "!border-red-400/70" : ""}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
