import React, { useRef, useState } from 'react';
import {
  RiShieldCheckFill,
  RiCoinsFill,
  RiGitBranchFill,
  RiSpeedUpFill,
  RiArrowRightLine,
} from '@remixicon/react';
import { StatCards, type Stat } from '@/components/application/dashboard/stat-cards';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { docUrl } from '@/lib/utils';

const BASE_BENCHMARK_STATS: Stat[] = [
  {
    icon: RiShieldCheckFill,
    label: 'Verification Pass Rate',
    value: '98.4%',
    delta: '+14.2%',
    deltaColor: 'lime',
    tone: 'emerald',
    caption: 'vs raw LLM completions',
    hint: 'Strict verifier loop runs unit tests, contract checks, and AST bounding before any checkpoint is promoted to git master.',
  },
  {
    icon: RiCoinsFill,
    label: 'Inference Cost / 100k LoC',
    value: '$0.18',
    delta: '-73.2%',
    deltaColor: 'lime',
    tone: 'sky',
    caption: 'vs frontier-only routing',
    hint: 'Fast local/lightweight verifiers inspect syntax, types, and lints, reserving expensive reasoning models only for high-entropy architectural planning.',
  },
  {
    icon: RiGitBranchFill,
    label: 'Clean Checkpoint Restores',
    value: '100%',
    delta: '0 leaks',
    deltaColor: 'neutral',
    tone: 'blue',
    caption: 'instant atomic git reset',
    hint: 'Every step writes an atomic git checkpoint. Failing test runs or broken invariants immediately roll back cleanly with zero dirty state.',
  },
  {
    icon: RiSpeedUpFill,
    label: 'Convergence Acceleration',
    value: '1.8x',
    delta: '+80%',
    deltaColor: 'lime',
    tone: 'sky',
    caption: 'parallel git worktrees',
    hint: 'Sub-agents explore solution candidates in parallel git worktree sandboxes, converging on verified implementations in almost half the wall-clock time.',
  },
];

export const TelemetryStatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats] = useState<Stat[]>(BASE_BENCHMARK_STATS);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Header entrance
        gsap.from('.telemetry-header', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        // Cards entrance with clearProps: 'all' so cards are always crisp
        gsap.fromTo(
          '.telemetry-cards-wrap section',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="telemetry" ref={containerRef} className="scroll-mt-24">
      <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
        <div className="telemetry-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.5px] text-accent-600 dark:text-accent-400 font-semibold">
              PROVEN RUNTIME TELEMETRY
            </span>
            <h2 className="mt-2 font-season text-tx text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
              Measurable reliability at every checkpoint.
            </h2>
          </div>
          <a
            href={docUrl('/docs/reference/benchmarks')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 transition-colors shrink-0 group"
          >
            <span>Explore full benchmark methodology</span>
            <RiArrowRightLine className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* BoardUI StatCards Component */}
        <div className="telemetry-cards-wrap">
          <StatCards stats={stats} variant="footer" className="w-full" />
        </div>
      </div>
    </section>
  );
};
