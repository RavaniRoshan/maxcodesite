/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  BRAND_IDENTITY,
  BrandPaletteKey,
  HERO_TRANSCRIPT,
  LONG_HORIZON_CARDS,
  TRAINING_TRANSCRIPT,
  applyBrandCssVariables,
} from './data/brandConfig';
import { MaxMascotSvg, MotifSvg } from './components/BrandSvgs';
import {
  HeroAtmosphericBackdrop,
  TrainingAtmosphericBackdrop,
} from './components/AtmosphericBackdrops';
import { Header } from './components/Header';
import { AgentTerminal } from './components/AgentTerminal';
import { CostShowcase } from './components/CostShowcase';
import { FaqSection } from './components/FaqSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { InteractiveModals } from './components/InteractiveModals';

export default function App() {
  const [modalMode, setModalMode] = useState<'try' | 'talk' | 'login' | null>(null);

  // Apply the warm red-orange ('maxcode-amber') brand CSS variables across the entire design system
  useEffect(() => {
    applyBrandCssVariables('maxcode-amber');
  }, []);

  return (
    <div id="top" className="min-h-screen bg-sf text-tx antialiased">
      {/* Fixed Site Header with Mega-Menus */}
      <Header onOpenModal={(mode) => setModalMode(mode)} />

      {/* Main Content Container matching exact reference spacing */}
      <main className="flex flex-col gap-24 md:gap-32 pt-24 md:pt-32">
        {/* SECTION 1: HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="flex flex-col items-center mx-auto max-w-[920px] text-center">
              <div className="flex justify-center mb-3">
                <MotifSvg className="w-auto h-7" />
              </div>

              <span className="inline-block mb-4 font-mono font-normal text-tx-tertiary text-xs uppercase tracking-[1.5px]">
                {BRAND_IDENTITY.heroKicker}
              </span>

              <h1
                aria-label={BRAND_IDENTITY.heroHeading}
                className="inline-flex flex-wrap justify-center items-center gap-x-3 md:gap-x-3.5 gap-y-2 font-season text-tx text-4xl md:text-[52px] leading-[120%] tracking-[-1px]"
              >
                <span>Longer sessions</span>
                <span
                  className="inline-flex items-center self-center shrink-0 -translate-y-1 md:-translate-y-1.5"
                  title="Max — your maxcode coding buddy"
                >
                  <MaxMascotSvg className="w-11 h-12 md:w-14 md:h-[60px] drop-shadow-[0_6px_14px_rgba(226,106,44,0.20)]" />
                </span>
                <span>with better code</span>
              </h1>

              <p className="mt-5 max-w-[600px] font-normal text-tx-secondary text-base md:text-lg leading-relaxed">
                {BRAND_IDENTITY.heroSubheading}
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setModalMode('try')}
                  className="group inline-flex relative justify-center items-center gap-1 bg-sf-invert hover:bg-sf-invert/90 active:bg-sf-invert/80 px-5 py-3 rounded-full overflow-hidden font-semibold text-tx-invert text-base tracking-tight transition-all duration-300 cursor-pointer select-none"
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
                  className="group inline-flex relative justify-center items-center gap-1 bg-sf-secondary hover:bg-sf-tertiary active:bg-sf-tertiary/80 px-5 py-3 rounded-full overflow-hidden font-semibold text-tx text-base tracking-tight transition-all duration-300 cursor-pointer select-none"
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
            <div className="mt-10 md:mt-12">
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
            <div className="items-end gap-6 lg:gap-10 grid grid-cols-1 lg:grid-cols-12 mb-10 md:mb-14">
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
                  className="flex flex-col bg-white border border-st-secondary rounded-[28px] md:rounded-4xl overflow-hidden"
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

        {/* SECTION 4: SPECIALIZED MODEL TRAINING (DARK CARD) */}
        <section>
          <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
            <div className="relative bg-sr-black rounded-[28px] md:rounded-[40px] overflow-hidden">
              <TrainingAtmosphericBackdrop />

              <div className="relative px-6 sm:px-10 md:px-16 pt-12 md:pt-20 pb-6 sm:pb-10 md:pb-14">
                <div className="mx-auto max-w-[640px] text-center">
                  <h2 className="font-season text-tx-invert text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
                    Train a model for a specialised task.
                  </h2>
                  <p className="mt-4 text-tx-invert/75 text-base md:text-lg leading-relaxed">
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
        <FinalCtaAndFooter onOpenModal={(mode) => setModalMode(mode)} />
      </main>

      {/* Cookie Consent & Interactive Pilot/Try Modals */}
      <InteractiveModals
        modalMode={modalMode}
        onCloseModal={() => setModalMode(null)}
      />
    </div>
  );
}
