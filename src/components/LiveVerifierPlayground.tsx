'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  RiPlayFill,
  RiRestartLine,
  RiGitCommitLine,
  RiCheckLine,
  RiTerminalBoxLine,
  RiCompass3Line,
  RiShieldCheckLine,
  RiSendPlane2Fill,
  RiSparklingFill,
} from '@remixicon/react';
import { AgentThinking, type AgentThinkingVariant } from '@/components/application/agent-thinking/agent-thinking';
import { ComposerLoader } from '@/components/application/composer-loader/composer-loader';
import { StatusDot } from '@/components/base/badges/status-dot';
import { Badge } from '@/components/base/badges/badge';
import { Kbd } from '@/components/base/kbd/kbd';
import { Button } from '@/components/base/buttons/button';
import { gsap, useGSAP } from '@/lib/gsap';

interface Scenario {
  id: string;
  title: string;
  file: string;
  targetTest: string;
  steps: {
    label: string;
    action: string;
    diff: string[];
    testOutput: string;
    commitHash: string;
    status: 'pending' | 'verifying' | 'passed';
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'socket-leak',
    title: 'Resolve session socket leak in pool',
    file: 'src/net/session_pool.ts',
    targetTest: 'tests/test_session_pool.py',
    steps: [
      {
        label: 'Step 1: AST Analysis & Protected Path Check',
        action: 'Scanning workspace AST and protected boundary configuration...',
        diff: [
          '// verifying boundaries against .maxcode/config.json',
          '// protected: .env*, migrations/*, prod.tf',
          '+ import { SocketDrainGuard } from "./guards";',
        ],
        testOutput: 'ast_bounds: OK (0 protected files touched)',
        commitHash: 'checkpoint/a1b8c4d',
        status: 'passed',
      },
      {
        label: 'Step 2: Synthesize patch with SocketDrainGuard',
        action: 'Injecting timeout release callback into pool disconnect listener...',
        diff: [
          '  async function release(conn: Socket) {',
          '-   conn.close();',
          '+   await conn.drain(TIMEOUT_MS);',
          '+   conn.destroySoon();',
          '  }',
        ],
        testOutput: 'PASS tests/test_session_pool.py::test_socket_drain (28ms)',
        commitHash: 'checkpoint/f4e290a',
        status: 'passed',
      },
      {
        label: 'Step 3: Verification Gate & Atomic Checkpoint Commit',
        action: 'Running full regression suite across isolated git worktree...',
        diff: [
          '// verifier hook: pytest tests/ -k "session" && npm run lint',
          '+ test_session_lifecycle_under_load ... OK',
          '+ test_zero_dangling_descriptors ... OK',
        ],
        testOutput: '14 tests passed, 0 failed in 0.42s · 0 regressions',
        commitHash: 'checkpoint/c93b17e',
        status: 'passed',
      },
    ],
  },
  {
    id: 'auth-jwt',
    title: 'Enforce JWT Bearer auth across private routes',
    file: 'src/middleware/auth.ts',
    targetTest: 'tests/test_auth_guard.py',
    steps: [
      {
        label: 'Step 1: Inspect route AST & identify open endpoints',
        action: 'Extracting route handlers matching /api/v1/private/*',
        diff: [
          '- router.use("/api/v1/private", legacyHeaderCheck);',
          '+ router.use("/api/v1/private", requireBearerToken);',
        ],
        testOutput: 'ast_bounds: OK (1 route middleware touched)',
        commitHash: 'checkpoint/d201ab4',
        status: 'passed',
      },
      {
        label: 'Step 2: Add cryptographic claim validation',
        action: 'Verifying token exp, iss, and aud claims with clock skew leeway...',
        diff: [
          '+ const payload = await verifyJwt(token, {',
          '+   audience: "maxcode.internal",',
          '+   maxAge: "15m"',
          '+ });',
        ],
        testOutput: 'PASS tests/test_auth_guard.py::test_expired_token_rejected (12ms)',
        commitHash: 'checkpoint/b890fa1',
        status: 'passed',
      },
      {
        label: 'Step 3: Test replay attack rejection & commit checkpoint',
        action: 'Simulating nonce reuse across concurrent requests in worktree sandbox...',
        diff: [
          '+ await nonceStore.record(payload.jti, payload.exp);',
        ],
        testOutput: '8 tests passed, 0 failed in 0.28s · zero security leaks',
        commitHash: 'checkpoint/91ae44c',
        status: 'passed',
      },
    ],
  },
];

export const LiveVerifierPlayground: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [thinkingVariant, setThinkingVariant] = useState<AgentThinkingVariant>('wave');
  const [humanGuidance, setHumanGuidance] = useState('');
  const [feedLogs, setFeedLogs] = useState<string[]>([
    'maxcode runtime initialized in clean git worktree sandbox: /tmp/maxcode-worktree-817',
    'loaded verifier configuration from .maxcode/config.json',
  ]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.playground-header', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.from('.playground-card', {
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

  const scenario = SCENARIOS[selectedScenarioIndex];
  const currentStep = scenario.steps[activeStepIndex];

  const handleNextStep = () => {
    if (activeStepIndex < scenario.steps.length - 1) {
      setIsVerifying(true);
      setFeedLogs((prev) => [
        ...prev,
        `Stepping forward: ${scenario.steps[activeStepIndex + 1].label}`,
      ]);
      setTimeout(() => {
        setActiveStepIndex((prev) => prev + 1);
        setIsVerifying(false);
        setFeedLogs((prev) => [
          ...prev,
          `Verification PASSED: ${scenario.steps[activeStepIndex + 1].testOutput}`,
          `Git checkpoint created: ${scenario.steps[activeStepIndex + 1].commitHash}`,
        ]);
      }, 1200);
    }
  };

  const handleRollback = () => {
    if (activeStepIndex > 0) {
      const targetHash = scenario.steps[activeStepIndex - 1].commitHash;
      setFeedLogs((prev) => [
        ...prev,
        `HUMAN ACTION: Rolling back to prior checkpoint ${targetHash}...`,
        `git reset --hard ${targetHash} → 0 files dirty, tree restored cleanly`,
      ]);
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  const handleInjectSteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanGuidance.trim()) return;
    setFeedLogs((prev) => [
      ...prev,
      `HUMAN STEERING: "${humanGuidance.trim()}"`,
      `Agent adjusted plan in-flight: re-evaluating test bounds...`,
    ]);
    setHumanGuidance('');
  };

  return (
    <section id="interactive-playground" ref={containerRef} className="scroll-mt-24">
      <div className="mx-auto w-[88%] md:w-10/12 max-w-width-mx">
        {/* Section Header */}
        <div className="playground-header flex flex-col items-center text-center max-w-[760px] mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[1.5px] text-accent-600 dark:text-accent-400 font-semibold mb-2">
            INTERACTIVE RUNTIME EXPLORER
          </span>
          <h2 className="font-season text-tx text-2xl md:text-4xl lg:text-[40px] leading-[120%] tracking-[-0.8px]">
            Experience the Verifier Loop live in action.
          </h2>
          <p className="mt-4 text-tx-secondary text-base md:text-lg leading-relaxed">
            Step through code modifications, watch automated AST boundary checks run, steer the agent with live human feedback, and inspect instant git rollbacks.
          </p>
        </div>

        {/* Playground Container Card */}
        <div className="playground-card bg-(--color-card-surface,white) border border-st-secondary rounded-[28px] md:rounded-4xl shadow-xl overflow-hidden transition-colors duration-300">
          {/* Top Bar: Scenario Switcher & Thinking Variant Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:px-8 border-b border-st-secondary bg-sf-secondary/40 backdrop-blur-md">
            {/* Scenario Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#A9B4C4] uppercase mr-1">Scenario:</span>
              {SCENARIOS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedScenarioIndex(idx);
                    setActiveStepIndex(0);
                    setFeedLogs([
                      `Switched scenario to: ${s.title}`,
                      `Loaded target test: ${s.targetTest}`,
                    ]);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                    selectedScenarioIndex === idx
                      ? 'bg-sf-invert text-tx-invert shadow-xs'
                      : 'bg-sf text-tx hover:bg-sf-tertiary border border-st-secondary'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Thinking Variant Switcher (BoardUI AgentThinking showcase) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#A9B4C4] font-mono">Loader:</span>
              {(['wave', 'spin', 'stars', 'infinity'] as AgentThinkingVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setThinkingVariant(v)}
                  className={`px-2 py-1 rounded-md capitalize transition-colors ${
                    thinkingVariant === v
                      ? 'bg-accent-500/15 text-accent-700 dark:text-accent-400 font-semibold'
                      : 'text-tx-secondary hover:text-tx'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Left Steps & Verifier Status | Right Live Code Diff & Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-st-secondary">
            {/* LEFT COLUMN: Step Progression & Steering Controls (5 Cols) */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <StatusDot color={isVerifying ? 'yellow' : 'green'} />
                    <span className="text-xs font-mono font-medium text-[#A9B4C4]">
                      {isVerifying ? 'AGENT VERIFYING RUN' : 'CHECKPOINT VERIFIED'}
                    </span>
                  </div>
                  <Badge color="primary" className="font-mono text-[10px]">
                    Step {activeStepIndex + 1} of {scenario.steps.length}
                  </Badge>
                </div>

                <h3 className="font-season text-tx text-xl font-medium mb-1">
                  {currentStep.label}
                </h3>
                <p className="text-[#A9B4C4] text-sm mb-6 leading-relaxed">
                  {currentStep.action}
                </p>

                {/* Agent Thinking Indicator (BoardUI) */}
                <div className="mb-6 p-3.5 rounded-xl bg-sf border border-st-secondary">
                  <AgentThinking
                    variant={thinkingVariant}
                    label={isVerifying ? 'Running test runner & checking AST diff...' : 'Awaiting next human instruction or step'}
                    shimmer={isVerifying}
                    showTimer={true}
                    tone={isVerifying ? 'accent' : 'default'}
                  />
                </div>

                {/* Checkpoint Timeline Cards */}
                <div className="flex flex-col gap-2.5">
                  {scenario.steps.map((st, i) => {
                    const isDone = i <= activeStepIndex;
                    const isCurrent = i === activeStepIndex;
                    return (
                      <div
                        key={st.label}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-sf border-accent-500/50 shadow-xs'
                            : isDone
                            ? 'bg-sf/80 border-st-secondary'
                            : 'bg-sf/30 border-st-secondary/40'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <span className="size-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center">
                              <RiCheckLine className="size-3" />
                            </span>
                          ) : (
                            <span className="size-4 rounded-full border border-[#8D99AB] inline-flex items-center justify-center text-[10px] text-[#A9B4C4] font-medium">
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-tx truncate">{st.label}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-[#A9B4C4] flex items-center gap-1">
                              <RiGitCommitLine className="size-3" /> {st.commitHash}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              PASS
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons & Human Steering Input */}
              <div className="pt-4 border-t border-st-secondary flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="medium"
                    leadingIcon={RiPlayFill}
                    onClick={handleNextStep}
                    disabled={isVerifying || activeStepIndex >= scenario.steps.length - 1}
                    className="flex-1 justify-center"
                  >
                    {activeStepIndex >= scenario.steps.length - 1 ? 'All Steps Verified' : 'Next Step & Verify'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="medium"
                    leadingIcon={RiRestartLine}
                    onClick={handleRollback}
                    disabled={activeStepIndex === 0 || isVerifying}
                    className="shrink-0"
                    title="Atomic git reset to prior checkpoint"
                  >
                    Rollback
                  </Button>
                </div>

                {/* Interactive Human Steering Box with BoardUI ComposerLoader */}
                <form onSubmit={handleInjectSteer} className="relative">
                  <ComposerLoader active={isVerifying} intensity={0.9} radius={16}>
                    <div className="flex items-center gap-2 p-1.5 bg-sf border border-st-secondary rounded-2xl">
                      <input
                        type="text"
                        value={humanGuidance}
                        onChange={(e) => setHumanGuidance(e.target.value)}
                        placeholder="Steer agent: e.g. 'Add 500ms timeout guard'..."
                        className="flex-1 bg-transparent px-3 py-1.5 text-xs text-tx placeholder:text-tx-tertiary focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!humanGuidance.trim()}
                        className="size-8 rounded-xl bg-sf-invert text-tx-invert flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity cursor-pointer"
                        title="Inject steering instruction"
                      >
                        <RiSendPlane2Fill className="size-3.5" />
                      </button>
                    </div>
                  </ComposerLoader>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[11px] text-tx-tertiary flex items-center gap-1">
                      <RiCompass3Line className="size-3" /> Live mid-run steer
                    </span>
                    <span className="text-[11px] text-tx-tertiary flex items-center gap-1">
                      <Kbd>⌘↵</Kbd> to submit
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: Real-Time AST Diff & Live Log Stream (7 Cols) */}
            <div className="lg:col-span-7 bg-[#070B14] text-[#F5F7FA] p-6 md:p-8 flex flex-col justify-between min-h-[460px] font-mono text-xs">
              {/* Terminal Title Bar */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E2A40] text-[#A9B4C4]">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-yellow-500/80" />
                    <span className="size-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-[#D9DEE5]">
                      {scenario.file}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#141C2E] text-[10px] text-[#D9DEE5] border border-[#1E2A40]">
                      git worktree: sandboxed
                    </span>
                  </div>
                </div>

                {/* Diff Viewer */}
                <div className="space-y-1 bg-[#0E1422] p-4 rounded-xl border border-[#1E2A40] overflow-x-auto max-h-[220px]">
                  <div className="text-[#8D99AB] pb-1 font-mono text-[11px]">// Diff generated by maxcode verifier engine</div>
                  {currentStep.diff.map((line, idx) => {
                    const isAdd = line.startsWith('+');
                    const isRemove = line.startsWith('-');
                    return (
                      <div
                        key={idx}
                        className={`leading-relaxed whitespace-pre font-mono ${
                          isAdd
                            ? 'text-emerald-400 bg-emerald-500/10 px-1 rounded-sm'
                            : isRemove
                            ? 'text-rose-400 bg-rose-500/10 px-1 rounded-sm'
                            : 'text-[#D9DEE5]'
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Runtime Feed & Test Output */}
              <div className="mt-6 pt-4 border-t border-[#1E2A40]">
                <div className="flex items-center justify-between text-[#A9B4C4] text-[11px] mb-2">
                  <span className="flex items-center gap-1.5">
                    <RiTerminalBoxLine className="size-3.5 text-[#BEE6FF]" />
                    Runtime Verifier Stream
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <RiShieldCheckLine className="size-3" />
                    Continuous AST Guard Active
                  </span>
                </div>

                <div className="bg-[#0E1422] p-3 rounded-xl border border-[#1E2A40] h-[120px] overflow-y-auto font-mono text-[11px] text-[#D9DEE5] space-y-1">
                  {feedLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.includes('PASSED') || log.includes('passed')
                          ? 'text-emerald-300'
                          : log.includes('HUMAN')
                          ? 'text-[#BEE6FF]'
                          : log.includes('checkpoint')
                          ? 'text-sky-300'
                          : 'text-[#A9B4C4]'
                      }
                    >
                      &gt; {log}
                    </div>
                  ))}
                  {isVerifying && (
                    <div className="text-[#BEE6FF] animate-pulse">
                      &gt; [verifier-hook] executing pytest in isolated worktree...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
