'use client';

import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  GitCommit,
  Shield,
  Terminal,
} from 'lucide-react';

export function DocVerifierSimulator() {
  const [phase, setPhase] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [shouldFail, setShouldFail] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const runSimulation = () => {
    setPhase('running');
    setElapsed(0);
    const interval = setInterval(() => {
      setElapsed((p) => p + 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      if (shouldFail) {
        setPhase('failed');
      } else {
        setPhase('success');
      }
    }, 1400);
  };

  const resetSimulation = () => {
    setPhase('idle');
    setElapsed(0);
  };

  return (
    <div className="my-6 rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-fd-border">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-fd-primary" />
          <span className="font-semibold text-fd-foreground">
            Interactive Verifier Loop Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-fd-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={shouldFail}
              onChange={(e) => setShouldFail(e.target.checked)}
              className="accent-fd-primary rounded"
            />
            Simulate Broken Test Run
          </label>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center gap-3 py-4">
        <button
          type="button"
          onClick={runSimulation}
          disabled={phase === 'running'}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fd-primary text-fd-primary-foreground font-medium text-xs hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          <Play className="size-3.5 fill-current" />
          {phase === 'running' ? `Running Verifier (${(elapsed / 1000).toFixed(1)}s)...` : 'Run Verifier Loop'}
        </button>

        <button
          type="button"
          onClick={resetSimulation}
          disabled={phase === 'idle' || phase === 'running'}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-fd-border bg-fd-secondary text-fd-secondary-foreground font-medium text-xs hover:bg-fd-accent transition-colors disabled:opacity-40 cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          Reset State
        </button>

        <div className="ml-auto text-xs font-mono text-fd-muted-foreground flex items-center gap-1.5">
          <span>Target:</span>
          <code className="px-1.5 py-0.5 rounded bg-fd-muted text-fd-foreground">pytest tests/test_pool.py</code>
        </div>
      </div>

      {/* Simulator Terminal Screen */}
      <div className="rounded-xl bg-[#141210] p-4 font-mono text-xs text-[#faf6f1] space-y-1.5 shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/50 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Terminal className="size-3" />
            worktree sandbox: /tmp/maxcode-worktree-624
          </span>
          <span>git status: {phase === 'running' ? 'VERIFYING' : phase === 'success' ? 'CLEAN (CHECKPOINTED)' : phase === 'failed' ? 'ROLLED BACK' : 'READY'}</span>
        </div>

        <div className="text-white/60">&gt; agent modified: src/net/connection_pool.ts (+14 -3 lines)</div>
        <div className="text-white/60">&gt; checking protected paths... [PASS] (.env and prod.tf untouched)</div>

        {phase === 'running' && (
          <div className="text-amber-400 animate-pulse">
            &gt; [verifier] executing: pytest tests/test_pool.py -v...
          </div>
        )}

        {phase === 'success' && (
          <>
            <div className="text-emerald-400">
              &gt; [verifier] test_connection_drain .......................... PASS (38ms)
            </div>
            <div className="text-emerald-400">
              &gt; [verifier] test_zero_leaked_sockets ....................... PASS (12ms)
            </div>
            <div className="text-sky-300 font-semibold flex items-center gap-1 pt-1">
              <GitCommit className="size-3.5" />
              &gt; [checkpoint] created atomic git commit: 7d2e9fa ("checkpoint: connection pool drain verified")
            </div>
          </>
        )}

        {phase === 'failed' && (
          <>
            <div className="text-rose-400">
              &gt; [verifier] test_connection_drain .......................... FAIL: AssertionError
            </div>
            <div className="text-rose-300">
              &gt; [verifier] invariant check violated: socket timeout exceeded 500ms
            </div>
            <div className="text-amber-300 font-semibold flex items-center gap-1 pt-1">
              <RotateCcw className="size-3.5" />
              &gt; [rollback] executing: git reset --hard HEAD~1
            </div>
            <div className="text-white/60">
              &gt; restored prior clean checkpoint. Working directory is clean.
            </div>
          </>
        )}
      </div>

      {/* Educational Outcome Summary */}
      <div className="mt-4 p-3 rounded-xl bg-fd-muted/50 border border-fd-border flex items-start gap-2.5">
        {phase === 'success' ? (
          <>
            <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Checkpoint Verified:</span> The verifier test command passed completely. maxcode recorded an atomic git commit hash in <code className="px-1 py-0.5 bg-fd-muted rounded">.maxcode/run.log</code> so you can resume or inspect anytime.
            </div>
          </>
        ) : phase === 'failed' ? (
          <>
            <AlertCircle className="size-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-rose-600 dark:text-rose-400">Rollback Guard Triggered:</span> Because the verifier detected a failing test, maxcode performed an instantaneous <code className="px-1 py-0.5 bg-fd-muted rounded">git reset --hard</code>. No broken code lingers in your branch.
            </div>
          </>
        ) : (
          <div className="text-xs text-fd-muted-foreground">
            Click <strong>Run Verifier Loop</strong> to test maxcode's deterministic checkpointing cycle. Check <em>Simulate Broken Test Run</em> to watch the automated rollback mechanism in action.
          </div>
        )}
      </div>
    </div>
  );
}
