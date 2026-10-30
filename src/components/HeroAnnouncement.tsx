import React from 'react';
import { RiSparkling2Fill, RiArrowRightLine } from '@remixicon/react';
import { docUrl } from '@/lib/utils';

export const HeroAnnouncement: React.FC = () => {
  return (
    <a
      href={docUrl('/docs/explanation/verifier-loop')}
      className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-st bg-sf-secondary/90 hover:bg-sf-tertiary transition-all duration-200 shadow-xs backdrop-blur-md mb-6 max-w-full overflow-hidden text-xs sm:text-sm"
    >
      <span className="inline-flex items-center justify-center size-5 rounded-full bg-sf-tertiary text-tx border border-st">
        <RiSparkling2Fill className="size-3" aria-hidden="true" />
      </span>
      <span className="font-mono text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-sf-tertiary text-tx border border-st">
        v0.8 Released
      </span>
      <span className="text-tx font-medium truncate">
        Deterministic verifier loop &amp; instant git rollbacks
      </span>
      <span className="inline-flex items-center text-tx-tertiary group-hover:text-tx group-hover:translate-x-0.5 transition-all duration-150">
        <RiArrowRightLine className="size-3.5" aria-hidden="true" />
      </span>
    </a>
  );
};
