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
    tone: 'orange',
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
  const [stats, setStats] = useState<Stat[]>(() =>
    BASE_BENCHMARK_STATS.map((s, idx) => ({
      ...s,
      value: idx === 0 ? '0.0%' : idx === 1 ? '$0.00' : idx === 2 ? '0%' : '1.0x',
    }))
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Reduced motion: show target values directly
        setStats(BASE_BENCHMARK_STATS);
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counters = {
          passRate: 0,
          cost: 0,
          restores: 0,
          speed: 1,
        };

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

        // Cards stagger & numerical count-up
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.from('.telemetry-cards-wrap section', {
              y: 35,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            });

            gsap.to(counters, {
              passRate: 98.4,
              cost: 0.18,
              restores: 100,
              speed: 1.8,
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: () => {
                setStats([
                  {
                    ...BASE_BENCHMARK_STATS[0],
                    value: `${counters.passRate.toFixed(1)}%`,
                  },
                  {
                    ...BASE_BENCHMARK_STATS[1],
                    value: `$${counters.cost.toFixed(2)}`,
                  },
                  {
                    ...BASE_BENCHMARK_STATS[2],
                    value: `${Math.round(counters.restores)}%`,
                  },
                  {
                    ...BASE_BENCHMARK_STATS[3],
                    value: `${counters.speed.toFixed(1)}x`,
                  },
                ]);
              },
            });
          },
        });
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
