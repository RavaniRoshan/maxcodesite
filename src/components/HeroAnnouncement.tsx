import React from 'react';
import { RiSparkling2Fill, RiArrowRightLine } from '@remixicon/react';
import { docUrl } from '@/lib/utils';

export const HeroAnnouncement: React.FC = () => {
  return (
    <a
      href={docUrl('/docs/explanation/verifier-loop')}
      className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#1E2A40] bg-[#0E1422]/90 hover:bg-[#141C2E] hover:border-[#D9DEE5]/50 transition-all duration-200 shadow-xs backdrop-blur-md mb-6 max-w-full overflow-hidden text-xs sm:text-sm"
    >
      <span className="inline-flex items-center justify-center size-5 rounded-full bg-[#141C2E] text-[#BEE6FF] border border-[#1E2A40]">
        <RiSparkling2Fill className="size-3" aria-hidden="true" />
      </span>
      <span className="font-mono text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-[#141C2E] text-[#FFFFFF] border border-[#1E2A40]">
        v0.8 Released
      </span>
      <span className="text-[#F5F7FA] font-medium truncate">
        Deterministic verifier loop &amp; instant git rollbacks
      </span>
      <span className="inline-flex items-center text-[#8D99AB] group-hover:text-[#FFFFFF] group-hover:translate-x-0.5 transition-all duration-150">
        <RiArrowRightLine className="size-3.5" aria-hidden="true" />
      </span>
    </a>
  );
};
