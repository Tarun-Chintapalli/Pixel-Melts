import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../lib/site";
import { Section } from "./ui/primitives";

export default function Certifications() {
  // duplicate for seamless marquee
  const strip = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <Section className="py-16">
      <div className="glass overflow-hidden rounded-3xl px-6 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--pm-flame)]">
            <BadgeCheck size={14} />
            Certified &amp; Compliant
          </span>
          <p className="max-w-xl text-sm text-[var(--pm-mute)]">
            Audited to the standards that regulated industries demand — so your
            parts pass inspection the first time.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {strip.map((c, idx) => (
              <div
                key={idx}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4"
              >
                <BadgeCheck size={20} className="text-[var(--pm-flame)]" />
                <div>
                  <p className="font-display text-sm font-bold leading-tight">
                    {c.code}
                  </p>
                  <p className="text-xs text-[var(--pm-faint)]">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
