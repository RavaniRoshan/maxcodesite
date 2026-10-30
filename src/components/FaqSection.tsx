'use client';

import React, { useRef } from 'react';
import { DetachableAccordion, type DetachableAccordionItem } from '@/components/spaceui/detachable-accordion';
import { Component, Flash, Code, Shield, Cpu } from 'reicon-react';
import { FAQ_ITEMS } from '../data/brandConfig';
import { gsap, useGSAP } from '@/lib/gsap';

const ICONS = [
  <Component size={20} key="comp" />,
  <Flash size={20} key="flash" />,
  <Code size={20} key="code" />,
  <Cpu size={20} key="cpu" />,
  <Shield size={20} key="shield" />,
  <Component size={20} key="start" />,
];

export const FaqSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const items: DetachableAccordionItem[] = FAQ_ITEMS.map((faq, idx) => ({
    value: `faq-${idx}`,
    title: faq.question,
    icon: ICONS[idx % ICONS.length],
    content: faq.answer,
  }));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.faq-header', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.from('.faq-accordion-wrap', {
          scrollTrigger: {
            trigger: '.faq-accordion-wrap',
            start: 'top 85%',
          },
          y: 35,
          autoAlpha: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="faq"
      ref={containerRef}
      className="flex flex-col items-center gap-10 mx-auto w-[88%] md:w-10/12 max-w-width-mx py-12 scroll-mt-24"
    >
      <div className="w-full">
        <div className="faq-header flex flex-col items-center mx-auto max-w-xl text-center">
          <p className="font-mono text-tx-tertiary text-xs font-semibold uppercase tracking-widest mb-2">
            Questions &amp; Answers
          </p>
          <h2 className="font-season font-normal text-tx text-3xl md:text-4xl lg:text-[44px] leading-[120%] tracking-[-1px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-tx-secondary text-sm md:text-base max-w-md">
            Everything you need to know about the verifier loop, checkpoints, sovereign deployments, and completed-work pricing.
          </p>
        </div>
      </div>

      <div className="faq-accordion-wrap w-full max-w-3xl flex justify-center">
        <DetachableAccordion items={items} defaultValue="faq-0" />
      </div>
    </section>
  );
};

export default FaqSection;
