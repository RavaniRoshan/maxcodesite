/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  BRAND_IDENTITY,
  HERO_TRANSCRIPT,
  LONG_HORIZON_CARDS,
  TRAINING_TRANSCRIPT,
  ThemeMode,
  applyBrandCssVariables,
} from './data/brandConfig';
import { MaxMascotSvg, MotifSvg } from './components/BrandSvgs';
import {
  HeroAtmosphericBackdrop,
  TrainingAtmosphericBackdrop,
} from './components/AtmosphericBackdrops';
import { Header } from './components/Header';
import { HeroAnnouncement } from './components/HeroAnnouncement';
import { AgentTerminal } from './components/AgentTerminal';
import { LiveVerifierPlayground } from './components/LiveVerifierPlayground';
import { TelemetryStatsSection } from './components/TelemetryStatsSection';
import { CostShowcase } from './components/CostShowcase';
import { FaqSection } from './components/FaqSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { InteractiveModals } from './components/InteractiveModals';
import InkOrbitFeatures from './components/ui/ink-orbit-features';
import { gsap, useGSAP } from './lib/gsap';

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [modalMode, setModalMode] = useState<'try' | 'talk' | 'login' | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('maxcode-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Hero Entrance Timeline
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
          .from('.hero-motif', { y: -16, autoAlpha: 0, duration: 0.6 })
          .from('.hero-announcement', { y: -12, autoAlpha: 0, duration: 0.5 }, '-=0.35')
          .from('.hero-kicker', { y: -8, autoAlpha: 0, duration: 0.4 }, '-=0.25')
          .from(
            '.hero-heading-chunk',
            { y: 28, autoAlpha: 0, stagger: 0.12, duration: 0.8 },
            '-=0.2'
          )
          .from(
            '.hero-mascot-hop',
            { scale: 0.5, rotation: -12, autoAlpha: 0, duration: 0.7, ease: 'back.out(2.2)' },
            '-=0.6'
          )
          .from('.hero-subheading', { y: 18, autoAlpha: 0, duration: 0.6 }, '-=0.35')
          .from('.hero-cta-btn', { y: 16, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
          .from(
            '.hero-terminal-container',
            { y: 35, scale: 0.97, autoAlpha: 0, duration: 1, ease: 'power3.out' },
            '-=0.4'
          );

        // Continuous subtle mascot idle float
        gsap.to('.hero-mascot-idle', {
          y: -5,
          rotation: 1.5,
          duration: 2.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // 2. Section 2: Long Horizon
        gsap.fromTo(
          '.long-horizon-header',
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: '#long-horizon',
              start: 'top 95%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          '.long-horizon-card',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: '#long-horizon',
              start: 'top 92%',
              once: true,
            },
          }
        );

        // 3. Section 2.5: Orchestration & InkOrbit
        gsap.from('.orchestration-section', {
          scrollTrigger: {
            trigger: '#orchestration',
            start: 'top 82%',
          },
          y: 35,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power3.out',
        });

        // 4. Section 4: Training Dark Card
        gsap.from('.training-dark-card', {
          scrollTrigger: {
            trigger: '.training-dark-card',
            start: 'top 85%',
          },
          scale: 0.97,
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    },
    { scope: mainRef }
  );

  // Apply the warm red-orange ('maxcode-amber') brand CSS variables and Light/Dark mode across the entire design system
  useEffect(() => {
    applyBrandCssVariables('maxcode-amber', undefined, themeMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('maxcode-theme', themeMode);
      document.documentElement.classList.toggle('dark', themeMode === 'dark');
    }
  }, [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div id="top" ref={mainRef} className="min-h-screen bg-sf text-tx antialiased transition-colors duration-300">
      {/* Fixed Site Header with Mega-Menus & Dark Mode Toggle */}
      <Header
        onOpenModal={(mode) => setModalMode(mode)}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Container matching exact reference spacing */}
      <main className="flex flex-col gap-24 md:gap-32 pt-24 md:pt-32">
        {/* SECTION 1: HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="flex flex-col items-center mx-auto max-w-[920px] text-center">
              <div className="hero-motif flex justify-center mb-3">
                <MotifSvg className="w-auto h-7" />
              </div>

              <div className="hero-announcement">
                <HeroAnnouncement />
              </div>

              <span className="hero-kicker inline-block mb-4 font-mono font-normal text-tx-tertiary text-xs uppercase tracking-[1.5px]">
                {BRAND_IDENTITY.heroKicker}
              </span>

              <h1
                aria-label={BRAND_IDENTITY.heroHeading}
                className="inline-flex flex-wrap justify-center items-center gap-x-3 md:gap-x-3.5 gap-y-2 font-season text-tx text-4xl md:text-[52px] leading-[120%] tracking-[-1px]"
              >
                <span className="hero-heading-chunk">Longer sessions</span>
                <span
                  className="hero-mascot-hop inline-flex items-center self-center shrink-0 -translate-y-1 md:-translate-y-1.5"
                  title="Max — your maxcode coding buddy"
                >
                  <span className="hero-mascot-idle inline-block">
                    <MaxMascotSvg className="w-11 h-12 md:w-14 md:h-[60px] drop-shadow-[0_6px_14px_rgba(226,106,44,0.20)]" />
                  </span>
                </span>
                <span className="hero-heading-chunk">with better code</span>
              </h1>

              <p className="hero-subheading mt-5 max-w-[600px] font-normal text-tx-secondary text-base md:text-lg leading-relaxed">
                {BRAND_IDENTITY.heroSubheading}
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setModalMode('try')}
                  className="hero-cta-btn group inline-flex relative justify-center items-center gap-1 bg-sf-invert hover:bg-sf-invert/90 active:bg-sf-invert/80 px-5 py-3 rounded-full overflow-hidden font-semibold text-tx-invert text-base tracking-tight transition-all duration-300 cursor-pointer select-none"
                  style={{
                    boxShadow:
                      '0 6px 12px 0 rgba(0, 0, 0, 0.10), 0 2px 6px 0 rgba(255, 255, 255, 0.40) inset, 0 -2px 6px 0 rgba(255, 255, 255, 0.40) inset',
                  }}
                >
                  <span
                    className="inline-block top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-80 rounded-full w-3/4 aspect-square transition-all -translate-x-1/2 -translate-y-1/2 duration-500 ease-out pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(50% 50% at 50% 50%, #E1E7FE 0%, var(--sc-blue) 48.08%, rgba(251, 146, 60, 0.60) 100%)',
                      filter: 'blur(15px)',
                    }}
                  />
                  <span className="z-10 flex items-center gap-2">Try maxcode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalMode('talk')}
                  className="hero-cta-btn group inline-flex relative justify-center items-center gap-1 bg-sf-secondary hover:bg-sf-tertiary active:bg-sf-tertiary/80 px-5 py-3 rounded-full overflow-hidden font-semibold text-tx text-base tracking-tight transition-all duration-300 cursor-pointer select-none"
                  style={{
                    boxShadow:
                      '0 6px 12px 0 rgba(0, 0, 0, 0.01), 0 2px 6px 0 rgba(255, 255, 255, 0.60) inset, 0 -2px 6px 0 rgba(255, 255, 255, 0.60) inset',
                  }}
                >
                  <span
                    className="inline-block top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-60 rounded-full w-3/4 aspect-square transition-all -translate-x-1/2 -translate-y-1/2 duration-500 ease-out pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(50% 50% at 50% 50%, #E1E7FE 0%, var(--sc-blue) 48.08%, rgba(251, 146, 60, 0.60) 100%)',
                      filter: 'blur(25px)',
                    }}
                  />
                  <span className="z-10 flex items-center gap-2">Talk to us</span>
                </button>
              </div>
            </div>

            {/* Hero Visual Container with Live Looping Agent Terminal */}
            <div className="hero-terminal-container mt-10 md:mt-12">
              <div className="group relative rounded-[28px] lg:rounded-[40px] w-full overflow-hidden">
                <HeroAtmosphericBackdrop />

                <div className="relative flex justify-center items-center p-4 sm:p-8 md:p-10 lg:p-12">
                  <div className="w-full max-w-[760px]">
                    <AgentTerminal
                      transcript={HERO_TRANSCRIPT}
                      fadeMode="mobile"
                      className="shadow-[0_24px_60px_-20px_rgba(19,18,30,0.22)] w-full h-[380px] md:h-auto"
                      bodyClassName="flex-1 md:flex-initial min-h-0 overflow-hidden"
                    />
                  </div>
                </div>

                {/* Floating Bottom-Right Action Pill */}
                <button
                  type="button"
                  onClick={() => setModalMode('try')}
                  aria-label="Try maxcode"
                  className="right-5 bottom-5 z-10 absolute flex items-center gap-2 bg-sf/90 hover:bg-sf shadow-md backdrop-blur-md px-4 py-2 border border-st-secondary rounded-full font-medium text-tx text-xs tracking-wide transition-all duration-200 cursor-pointer"
                >
                  <span>Try maxcode</span>
                  <span aria-hidden="true" className="text-tx-secondary">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PILLAR 1 — LONG HORIZON */}
        <section id="long-horizon" className="scroll-mt-24">
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="long-horizon-header items-end gap-6 lg:gap-10 grid grid-cols-1 lg:grid-cols-12 mb-10 md:mb-14">
              <div className="lg:col-span-5">
                <h2 className="font-season text-tx text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
                  A visible plan for work across the codebase.
                </h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-7 text-tx-secondary text-base md:text-lg leading-relaxed">
                maxcode breaks the job into steps, writes and tests each change, and saves checkpoints as it goes. The plan stays visible throughout the run.
              </p>
            </div>

            <div className="gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-3">
              {LONG_HORIZON_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="long-horizon-card flex flex-col bg-(--color-card-surface,white) border border-st-secondary rounded-[28px] md:rounded-4xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="p-6 md:p-8 pb-5">
                    <h3 className="font-season text-tx text-xl md:text-2xl leading-[125%] tracking-[-0.4px]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-tx-secondary text-sm md:text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex flex-col flex-1 px-4 md:px-5 pb-4 md:pb-5">
                    <AgentTerminal
                      transcript={card.transcript}
                      fadeMode="always"
                      className="w-full h-[300px]"
                      bodyClassName="flex-1 min-h-0 overflow-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2.5: LIVE CHECKPOINT ORCHESTRATION, TOOLING HUB & CONVERGENCE TELEMETRY */}
        <section id="orchestration" className="scroll-mt-24">
          <div className="orchestration-section mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <InkOrbitFeatures
              theme={themeMode}
              brand="maxcode"
              tag="MAXM1 ORCHESTRATION · LIVE TELEMETRY"
              title={"Autonomous *Checkpoint*\n& Tooling Architecture"}
              collaboration={{
                title: 'Live Plan Steering & Sub-Agents',
                description:
                  'Engineers inspect, steer, and branch active maxcode runs in real time while maxm1 coordinates parallel sub-agents across services.',
              }}
              reports={{
                title: 'Continuous Checkpoint Verification',
                description:
                  'Every completed step emits a reproducible verification artifact — contract test results, AST diff bounds, and rollback hashes.',
              }}
              integrations={{
                title: 'Sandboxed Repo & Tooling Hub',
                description:
                  'Connect Git worktrees, test runners, LSP servers, and issue trackers into one unified maxm1 execution loop.',
                tools: ['Git & PRs', 'Pytest / CI', 'LSP & AST', 'Linear / Jira'],
              }}
              insights={{
                title: 'Long-Horizon Convergence Telemetry',
                description:
                  'Scrub multi-hour session telemetry to inspect how maxm1 compounds test pass rates and cuts retry overhead across checkpoints.',
                values: [38, 44, 49, 56, 61, 68, 72, 79, 84, 89, 93, 97],
                forecastFrom: 8,
              }}
            />
          </div>
        </section>

        {/* SECTION 2.75: INTERACTIVE LIVE VERIFIER & CHECKPOINT PLAYGROUND */}
        <LiveVerifierPlayground />

        {/* SECTION 3: PILLAR 2 — COST & MODEL ROUTING */}
        <section id="cost" className="scroll-mt-24">
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="mx-auto mb-10 md:mb-12 max-w-[680px] text-center">
              <h2 className="font-season text-tx text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
                Use expensive models only for the tasks that need them.
              </h2>
            </div>

            <CostShowcase />
          </div>
        </section>

        {/* SECTION 3.5: RUNTIME TELEMETRY & CONVERGENCE KPI BENCHMARKS */}
        <TelemetryStatsSection />

        {/* SECTION 4: SPECIALIZED MODEL TRAINING (DARK CARD) */}
        <section>
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="training-dark-card relative bg-sr-black border border-st-secondary rounded-[28px] md:rounded-[40px] overflow-hidden">
              <TrainingAtmosphericBackdrop />

              <div className="relative px-6 sm:px-10 md:px-16 pt-12 md:pt-20 pb-6 sm:pb-10 md:pb-14">
                <div className="mx-auto max-w-[640px] text-center">
                  <h2 className="font-season text-[#faf6f1] text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
                    Train a model for a specialised task.
                  </h2>
                  <p className="mt-4 text-[#faf6f1]/75 text-base md:text-lg leading-relaxed">
                    maxcode can train a task-specific maxm1 model during the run using your data and requirements, then apply it to the job. For underwriting, that can mean training on your risk parameters.
                  </p>
                </div>

                <div className="mx-auto mt-8 md:mt-12 max-w-[860px]">
                  <AgentTerminal
                    transcript={TRAINING_TRANSCRIPT}
                    fadeMode="always"
                    className="shadow-[0_24px_60px_-20px_rgba(19,18,30,0.45)] w-full h-[280px] md:h-[340px]"
                    bodyClassName="flex-1 min-h-0 overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQ & FINAL CTA */}
        <FaqSection />
        <FinalCtaAndFooter
          onOpenModal={(mode) => setModalMode(mode)}
          themeMode={themeMode}
        />
      </main>

      {/* Cookie Consent & Interactive Pilot/Try Modals */}
      <InteractiveModals
        modalMode={modalMode}
        onCloseModal={() => setModalMode(null)}
      />
    </div>
  );
}
