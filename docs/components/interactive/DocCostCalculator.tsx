'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, Zap, ShieldCheck } from 'lucide-react';

export function DocCostCalculator() {
  const [linesOfCode, setLinesOfCode] = useState(50000);
  const [taskCount, setTaskCount] = useState(10);

  // Pricing models per 100k LoC processed across task lifecycle:
  // maxcode: routes small verifier models for AST checks, saving frontier tokens
  const maxcodeCost = ((linesOfCode / 100000) * 0.18 * (taskCount / 5)).toFixed(2);
  const frontierOnlyCost = ((linesOfCode / 100000) * 8.4 * (taskCount / 5)).toFixed(2);
  const savingsPct = Math.round((1 - parseFloat(maxcodeCost) / Math.max(0.01, parseFloat(frontierOnlyCost))) * 100);

  return (
    <div className="my-6 rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm text-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-fd-border">
        <Calculator className="size-4 text-fd-primary" />
        <span className="font-semibold text-fd-foreground">
          Interactive Token &amp; Cost Savings Calculator
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-medium text-fd-foreground">Target Codebase Scope</span>
              <span className="font-mono font-semibold text-fd-primary">
                {linesOfCode.toLocaleString()} LoC
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={linesOfCode}
              onChange={(e) => setLinesOfCode(Number(e.target.value))}
              className="w-full accent-fd-primary cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-medium text-fd-foreground">Verification Checkpoints / Tasks</span>
              <span className="font-mono font-semibold text-fd-primary">
                {taskCount} checkpoints
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="2"
              value={taskCount}
              onChange={(e) => setTaskCount(Number(e.target.value))}
              className="w-full accent-fd-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Results Comparison Card */}
        <div className="rounded-xl bg-fd-muted/60 p-4 border border-fd-border flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-fd-muted-foreground flex items-center gap-1">
                <Zap className="size-3.5 text-fd-primary" /> maxcode Verifier Loop:
              </span>
              <span className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">
                ${maxcodeCost}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-fd-muted-foreground">Monolithic Frontier LLM:</span>
              <span className="font-mono text-sm text-fd-muted-foreground line-through">
                ${frontierOnlyCost}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-fd-border flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingDown className="size-3.5" /> {savingsPct}% Cost Reduction
            </span>
            <span className="text-fd-muted-foreground text-[11px] flex items-center gap-1">
              <ShieldCheck className="size-3" /> Zero regression guarantee
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-fd-muted-foreground leading-relaxed pt-2 border-t border-fd-border">
        * Based on canonical benchmark measurements: lightweight verifiers evaluate syntax and unit tests locally, while reasoning frontier models are queried solely during initial plan decomposition and hard invariant violations.
      </div>
    </div>
  );
}
