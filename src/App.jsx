import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Process from "./components/Process";
import Materials from "./components/Materials";
import Portfolio from "./components/Portfolio";
import QuoteCalculator from "./components/QuoteCalculator";
import Testimonials from "./components/Testimonials";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantKey, setAssistantKey] = useState(0);

  const scrollToQuote = useCallback(() => {
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openAssistant = useCallback(() => {
    setAssistantKey((k) => k + 1); // remount for a fresh conversation
    setAssistantOpen(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--pm-void)] text-[var(--pm-white)]">
      <div className="noise" aria-hidden />

      <Navbar onQuote={scrollToQuote} />

      <main className="relative z-[2]">
        <Hero onQuote={scrollToQuote} onAssistant={openAssistant} />
        <Stats />
        <Services onQuote={scrollToQuote} />
        <Process />
        <Materials />
        <Portfolio />
        <QuoteCalculator />
        <Testimonials />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      <StickyCTA onQuote={scrollToQuote} onAssistant={openAssistant} />
      <AIAssistant
        key={assistantKey}
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
}
