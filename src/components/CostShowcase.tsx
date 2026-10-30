import React, { useEffect, useRef, useState } from 'react';
import { COST_TABS, calculateTabProgress } from '../data/brandConfig';
import { AgentTerminal } from './AgentTerminal';
import { HeroAtmosphericBackdrop } from './AtmosphericBackdrops';
import { gsap, useGSAP } from '@/lib/gsap';

export const CostShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const DURATION_MS = 10000;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.cost-tabs-wrap', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.from('.cost-terminal-wrap', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 35,
          autoAlpha: 0,
          duration: 0.9,
          delay: 0.1,
          ease: 'power3.out',
        });
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsedMs((prev) => {
        if (prev + 100 >= DURATION_MS) {
          setActiveIndex((idx) => (idx + 1) % COST_TABS.length);
          return 0;
        }
        return prev + 100;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  const handleSelectTab = (idx: number) => {
    setActiveIndex(idx);
    setElapsedMs(0);
  };

  const progressPct = calculateTabProgress(elapsedMs, DURATION_MS);

  return (
    <div id="cost-showcase" ref={containerRef}>
      {/* Two-Column Tab Selector with Progress Bars */}
      <div
        role="tablist"
        aria-label="Cost items"
        className="cost-tabs-wrap gap-6 md:gap-10 grid grid-cols-2 mx-auto mb-8 md:mb-10 max-w-[760px]"
      >
        {COST_TABS.map((tab, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`cost-showcase-panel-${idx}`}
              onClick={() => handleSelectTab(idx)}
              className="group text-left cursor-pointer"
            >
              <div className="bg-st-secondary mb-4 md:mb-5 rounded-full w-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sr-indigo-200 to-sr-indigo-600 rounded-full h-full transition-[width] duration-100 ease-linear"
                  style={{
                    width: isSelected ? `${progressPct}%` : '0%',
                  }}
                />
              </div>
              <h3
                className={`font-season text-lg md:text-2xl tracking-[-0.3px] leading-[125%] transition-colors duration-200 ${
                  isSelected
                    ? 'text-tx font-bold'
                    : 'text-[#A9B4C4] group-hover:text-tx'
                }`}
              >
                {tab.title}
              </h3>
              <p
                className={`hidden md:block mt-1.5 text-sm md:text-base leading-relaxed transition-colors duration-200 ${
                  isSelected ? 'text-tx-secondary' : 'text-[#8D99AB] group-hover:text-[#A9B4C4]'
                }`}
              >
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Mobile Active Tab Description */}
      <p className="md:hidden -mt-4 mb-6 text-[#A9B4C4] text-sm leading-relaxed">
        {COST_TABS[activeIndex].description}
      </p>

      {/* Atmospheric Backdrop with Dual Overlapping Terminals */}
      <div className="cost-terminal-wrap relative rounded-[28px] lg:rounded-[40px] w-full overflow-hidden">
        <HeroAtmosphericBackdrop />
        <div className="relative flex justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 w-full max-w-[880px]">
            {COST_TABS.map((tab, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={tab.id}
                  id={`cost-showcase-panel-${idx}`}
                  role="tabpanel"
                  aria-hidden={!isSelected}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                    isSelected
                      ? 'opacity-100 z-10'
                      : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <AgentTerminal
                    transcript={tab.transcript}
                    isActive={isSelected}
                    fadeMode="mobile"
                    className="shadow-[0_24px_60px_-20px_rgba(19,18,30,0.22)] w-full h-[380px] md:h-auto"
                    bodyClassName="flex-1 md:flex-initial min-h-0 overflow-hidden"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
