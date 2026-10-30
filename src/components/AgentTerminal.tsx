import React, { useEffect, useRef, useState } from 'react';
import { TerminalTranscript, interpolateDiffCount } from '../data/brandConfig';
import { MaxMascotSvg, MaxFaviconSvg } from './BrandSvgs';

interface AgentTerminalProps {
  transcript: TerminalTranscript;
  className?: string;
  bodyClassName?: string;
  isActive?: boolean;
  fadeMode?: 'always' | 'mobile' | 'none';
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({
  transcript,
  className = '',
  bodyClassName = '',
  isActive = true,
  fadeMode = 'none',
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number>(transcript.steps.length);
  const [typedPrompt, setTypedPrompt] = useState<string>(transcript.prompt);
  const [typedReplies, setTypedReplies] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};
    transcript.steps.forEach((step, idx) => {
      if (step.kind === 'reply') {
        init[idx] = step.text;
      }
    });
    return init;
  });
  const [diffProgress, setDiffProgress] = useState<number>(1);
  const [hasTriggeredInView, setHasTriggeredInView] = useState<boolean>(false);

  // IntersectionObserver for 'inview' mode
  useEffect(() => {
    if (transcript.mode !== 'inview') return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredInView) {
            setHasTriggeredInView(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [transcript.mode, hasTriggeredInView]);

  // Sequence animation runner
  useEffect(() => {
    const shouldAnimate =
      (transcript.mode === 'loop' && isActive) ||
      (transcript.mode === 'inview' && hasTriggeredInView) ||
      (transcript.mode === 'event' && isActive);

    if (!shouldAnimate) {
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const runSequence = () => {
      if (cancelled) return;

      // Start with prompt typing quickly, then reveal steps one by one
      setVisibleSteps(0);
      setDiffProgress(0.25);

      const promptText = transcript.prompt;
      const totalPromptTicks = 12;
      for (let t = 1; t <= totalPromptTicks; t++) {
        const timer = window.setTimeout(() => {
          if (cancelled) return;
          const sliceLen = Math.ceil((promptText.length * t) / totalPromptTicks);
          setTypedPrompt(promptText.slice(0, sliceLen));
        }, t * 28);
        timers.push(timer);
      }

      const baseDelay = totalPromptTicks * 28 + 140;

      transcript.steps.forEach((step, idx) => {
        const stepStart = baseDelay + idx * 360;
        const stepTimer = window.setTimeout(() => {
          if (cancelled) return;
          setVisibleSteps(idx + 1);

          if (step.kind === 'reply') {
            const fullReply = step.text;
            const chunks = 10;
            for (let c = 1; c <= chunks; c++) {
              const rTimer = window.setTimeout(() => {
                if (cancelled) return;
                setTypedReplies((prev) => ({
                  ...prev,
                  [idx]: fullReply.slice(0, Math.ceil((fullReply.length * c) / chunks)),
                }));
              }, c * 24);
              timers.push(rTimer);
            }
          }

          if (step.kind === 'diff') {
            for (let p = 1; p <= 5; p++) {
              const dTimer = window.setTimeout(() => {
                if (cancelled) return;
                setDiffProgress(p / 5);
              }, p * 45);
              timers.push(dTimer);
            }
          }
        }, stepStart);
        timers.push(stepTimer);
      });

      if (transcript.mode === 'loop') {
        const totalDuration = baseDelay + transcript.steps.length * 360 + 5200;
        const loopTimer = window.setTimeout(() => {
          if (!cancelled) {
            runSequence();
          }
        }, totalDuration);
        timers.push(loopTimer);
      }
    };

    runSequence();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [transcript, isActive, hasTriggeredInView]);

  const bulletColorClass = (color: 'blue' | 'green' | 'orange' | 'purple') => {
    switch (color) {
      case 'blue':
        return 'text-(--sc-blue)';
      case 'green':
        return 'text-(--sc-green)';
      case 'orange':
        return 'text-(--sc-orange)';
      case 'purple':
        return 'text-(--sc-purple)';
    }
  };

  const renderTerminalLines = (isGhost: boolean) => (
    <>
      {transcript.shellPrompt && (
        <div className="mb-3 text-[#8D99AB]">
          <span className="font-medium text-[#D9DEE5]">{transcript.shellPrompt.userHost}</span>
          <span className="text-[#8D99AB]">:</span>
          <span className="font-medium text-[#BEE6FF]">{transcript.shellPrompt.path}</span>
          <span className="text-[#8D99AB]"> $ </span>
          <span className="text-[#F5F7FA] font-medium">{transcript.shellPrompt.cmd}</span>
        </div>
      )}

      {transcript.agentHeader && (
        <div className="flex items-center gap-3 mb-4 px-3.5 py-2.5 border border-st-tertiary/70 rounded-lg max-w-full">
          <MaxFaviconSvg className="w-5 h-5 shrink-0" />
          <div className="min-w-0">
            <div className="truncate">
              <span className="text-[#8D99AB]">&gt;_ </span>
              <span className="font-semibold text-tx">{transcript.agentHeader.name}</span>
              <span className="text-[#8D99AB]"> {transcript.agentHeader.version}</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#8D99AB] truncate">
              directory: <span className="text-[#D9DEE5]">{transcript.agentHeader.directory}</span>
            </div>
          </div>
        </div>
      )}

      {/* Highlighted Prompt Box */}
      <div className="bg-(--sc-highlight) mb-3.5 px-2.5 py-1.5 rounded-md text-[#F5F7FA]">
        <span className="text-[#8D99AB]">&gt; </span>
        <span data-at-prompt={isGhost ? undefined : ''}>
          {isGhost ? transcript.prompt : typedPrompt}
        </span>
      </div>

      {/* Step sequence */}
      <div className="space-y-1.5">
        {transcript.steps.map((step, index) => {
          const isVisible = isGhost || index < visibleSteps;
          const rowStateClass = isVisible ? 'at-row' : 'at-row at-hide';

          if (step.kind === 'bullet') {
            return (
              <div
                key={index}
                data-at-step={isGhost ? undefined : ''}
                className={`flex items-baseline gap-2 min-w-0 text-[#A9B4C4] ${rowStateClass}`}
              >
                <span
                  data-at-bullet={!isGhost && step.thinking ? '' : undefined}
                  className={`${bulletColorClass(step.color)} shrink-0 ${
                    !isGhost && step.thinking && index === visibleSteps - 1 ? 'at-pulse' : ''
                  }`}
                >
                  •
                </span>
                <span className={`truncate ${!isGhost && step.thinking ? 'at-thinking' : ''}`}>
                  {step.text}
                </span>
              </div>
            );
          }

          if (step.kind === 'reply') {
            return (
              <div
                key={index}
                data-at-step={isGhost ? undefined : ''}
                className={`flex items-baseline gap-2 pt-1 text-[#F5F7FA] ${rowStateClass}`}
              >
                <span className="text-[#8D99AB] shrink-0">•</span>
                <span data-at-reply={isGhost ? undefined : ''}>
                  {isGhost ? step.text : typedReplies[index] ?? step.text}
                </span>
              </div>
            );
          }

          if (step.kind === 'diff') {
            const addCount =
              step.add !== undefined
                ? isGhost
                ? step.add
                : interpolateDiffCount(step.add, diffProgress)
                : undefined;
            const delCount =
              step.del !== undefined
                ? isGhost
                ? step.del
                : interpolateDiffCount(step.del, diffProgress)
                : undefined;

            return (
              <div
                key={index}
                data-at-step={isGhost ? undefined : ''}
                className={`flex items-baseline gap-2 pl-4 min-w-0 text-[11.5px] ${rowStateClass}`}
              >
                <span className="text-[#8D99AB] shrink-0">⎿</span>
                <span className="font-medium text-[#F5F7FA] truncate">{step.file}</span>
                {step.note && (
                  <span className="hidden sm:inline text-[#A9B4C4] truncate">{step.note}</span>
                )}
                {(addCount !== undefined || delCount !== undefined) && (
                  <span className="ml-auto shrink-0 tabular-nums">
                    {addCount !== undefined && (
                      <span
                        data-at-add={isGhost ? undefined : step.add}
                        className="text-(--sc-green)"
                      >
                        +{addCount}
                      </span>
                    )}
                    {delCount !== undefined && (
                      <span
                        data-at-del={isGhost ? undefined : step.del}
                        className="ml-1 text-tx-tertiary"
                      >
                        -{delCount}
                      </span>
                    )}
                  </span>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </>
  );

  const fadeClass =
    fadeMode === 'always'
      ? 'at-fade-always'
      : fadeMode === 'mobile'
      ? 'at-fade-mobile'
      : '';

  return (
    <figure
      ref={rootRef}
      data-at-live={transcript.mode}
      className={`at-root at-live relative flex flex-col bg-sf border border-st-secondary rounded-2xl overflow-hidden font-mono text-[12px] text-tx leading-[1.65] select-none ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center px-4 py-2.5 border-st-secondary border-b shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="bg-st-tertiary/80 rounded-full w-2.5 h-2.5" />
          <span className="bg-st-tertiary/80 rounded-full w-2.5 h-2.5" />
          <span className="bg-st-tertiary/80 rounded-full w-2.5 h-2.5" />
        </div>
      </div>

      {/* Terminal body */}
      <div className={`px-4 md:px-6 pt-4 pb-5 ${fadeClass} ${bodyClassName}`}>
        <div className="at-fit">
          <div aria-hidden="true" className="at-ghost">
            {renderTerminalLines(true)}
          </div>
          <div data-at-active="" className="at-active">
            {renderTerminalLines(false)}
          </div>
        </div>
      </div>

      {/* Pinned Flow Footer */}
      {transcript.flowFooter && (
        <div className="mt-auto px-4 md:px-6 pt-1 pb-3.5 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-[#8D99AB]">
            <span>─</span>
            <span className="font-mono font-medium text-[#D9DEE5]">Flow</span>
            <span className="flex-1 border-st-tertiary/70 border-t" />
          </div>
          <div className="mt-1.5 px-2.5 py-1.5 border border-st-tertiary/70 rounded-md text-[#A9B4C4] truncate">
            <span className="mr-1.5 text-[#8D99AB]">›</span>
            <span className="bg-tx text-sf">{transcript.flowFooter.cursorChar}</span>
            <span>{transcript.flowFooter.restText}</span>
          </div>
          <div className="mt-1.5 text-[11px] text-[#8D99AB] truncate">
            {transcript.flowFooter.directory}
            {transcript.flowFooter.contextUsed ? ` · ${transcript.flowFooter.contextUsed}` : ''}
            {' · '}
            <span className="font-medium text-[#D9DEE5]">{transcript.flowFooter.modelName}</span>
          </div>
        </div>
      )}
    </figure>
  );
};
