import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS, SERVICES, buildWhatsApp } from "../lib/site";
import { Section } from "./ui/primitives";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 pb-10 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--pm-flame)]/50 to-transparent" />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                <img
                  src="/PIXEL Melts-2.png"
                  alt="PIXEL Melts"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                PIXEL<span className="text-[var(--pm-flame)]">Melts</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--pm-mute)]">
              Precision additive manufacturing for teams who refuse to compromise.
              From first sketch to shipped part — engineered to be held.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-[var(--pm-mute)]">
              <a
                href="mailto:hello@pixelmelts.studio"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-[var(--pm-flame)]" />
                hello@pixelmelts.studio
              </a>
              <a
                href={buildWhatsApp("Hi PIXEL Melts, I have a project in mind.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone size={15} className="text-[var(--pm-flame)]" />
                +91 70902 80497
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[var(--pm-flame)]" />
                Bengaluru · Serving worldwide
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--pm-faint)]">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--pm-mute)] transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--pm-faint)]">
              Capabilities
            </h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-[var(--pm-mute)] transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--pm-faint)]">
              Start a project
            </h4>
            <p className="mt-5 text-sm text-[var(--pm-mute)]">
              Have a file ready? Send it over and get a quote within the hour.
            </p>
            <a
              href="#quote"
              className="group mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-[var(--pm-flame)]/50 hover:bg-white/[0.06]"
            >
              Request Quote
              <ArrowUpRight
                size={15}
                className="text-[var(--pm-flame)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[var(--pm-faint)]">
            © {new Date().getFullYear()} PIXEL Melts. Engineered with obsession.
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--pm-faint)]">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <span className="font-mono">Bambu Lab P1S · FDM</span>
          </div>
        </div>
      </Section>
    </footer>
  );
}
