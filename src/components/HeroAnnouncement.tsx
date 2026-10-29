import React from 'react';
import { RiSparkling2Fill, RiArrowRightLine } from '@remixicon/react';
import { Badge } from '@/components/base/badges/badge';
import { docUrl } from '@/lib/utils';

export const HeroAnnouncement: React.FC = () => {
  return (
    <a
      href={docUrl('/docs/explanation/verifier-loop')}
      className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-st-secondary bg-sf-secondary/80 hover:bg-sf-secondary transition-all duration-200 shadow-xs hover:shadow-sm backdrop-blur-md mb-6 max-w-full overflow-hidden text-xs sm:text-sm"
    >
      <span className="inline-flex items-center justify-center size-5 rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400">
        <RiSparkling2Fill className="size-3.5" aria-hidden="true" />
      </span>
      <Badge color="primary" className="font-mono text-[10px] tracking-wide uppercase px-1.5 py-0.5">
        v0.8 Released
      </Badge>
      <span className="text-tx font-medium truncate">
        Deterministic verifier loop &amp; instant git rollbacks
      </span>
      <span className="inline-flex items-center text-tx-tertiary group-hover:text-accent-600 dark:group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all duration-150">
        <RiArrowRightLine className="size-3.5" aria-hidden="true" />
      </span>
    </a>
  );
};
