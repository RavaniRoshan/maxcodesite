import React, { useRef } from 'react';
import RidgelineDitherFooter from './ui/ridgeline-dither-footer';
import { MaxMascotSvg } from './BrandSvgs';
import { ThemeMode } from '../data/brandConfig';
import { gsap, useGSAP } from '@/lib/gsap';
import { assetUrl, docUrl } from '@/lib/utils';

interface FinalCtaAndFooterProps {
  onOpenModal: (mode: 'try' | 'talk' | 'login') => void;
  themeMode?: ThemeMode;
}

/**
 * Original bespoke centerpiece emblem for maxcode:
 * An isometric multi-faceted checkpoint prism core with orbital execution rings
 * and a terminal branch glyph — replacing the 4-point star emblem.
 */
const MaxcodeCheckpointCoreSvg: React.FC = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[68px] h-[68px]"
  >
    <defs>
      <linearGradient id="prismTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D9DEE5" />
      </linearGradient>
      <linearGradient id="prismLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D9DEE5" />
        <stop offset="100%" stopColor="#8D99AB" />
      </linearGradient>
      <linearGradient id="prismRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AEB6C2" />
        <stop offset="100%" stopColor="#3D4A60" />
      </linearGradient>
    </defs>

    {/* Outer precision orbital ring with 4 checkpoint nodes */}
    <circle
      cx="34"
      cy="34"
      r="30"
      stroke="rgba(190, 230, 255, 0.35)"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
    <circle cx="34" cy="4" r="2.2" fill="#BEE6FF" />
    <circle cx="64" cy="34" r="2.2" fill="#BEE6FF" />
    <circle cx="34" cy="64" r="2.2" fill="#BEE6FF" />
    <circle cx="4" cy="34" r="2.2" fill="#BEE6FF" />

    {/* Rotated diamond checkpoint frame */}
    <rect
      x="34"
      y="10"
      width="33.94"
      height="33.94"
      rx="4"
      transform="rotate(45 34 10)"
      stroke="rgba(190, 230, 255, 0.55)"
      strokeWidth="1.2"
      fill="rgba(14, 20, 34, 0.65)"
    />

    {/* Isometric 3D Hexagonal Prism Core */}
    {/* Top Facet */}
    <polygon
      points="34,16 50,25 34,34 18,25"
      fill="url(#prismTop)"
    />
    {/* Left Facet */}
    <polygon
      points="18,25 34,34 34,52 18,43"
      fill="url(#prismLeft)"
    />
    {/* Right Facet */}
    <polygon
      points="50,25 34,34 34,52 50,43"
      fill="url(#prismRight)"
    />
    {/* Inner glowing core node */}
    <circle cx="34" cy="34" r="3.5" fill="#FFFFFF" />
  </svg>
);

/**
 * Original bespoke architectural background SVG for the Final CTA card:
 * A perspective execution-graph astrolabe, radial circuit branches, and
 * checkpoint horizon rings — completely replacing the lotus globe.
 */
const MaxcodeExecutionHorizonSvg: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 1100 620"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="horizonCoreGlow" cx="50%" cy="62%" r="55%">
        <stop offset="0%" stopColor="#BEE6FF" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#7DD3FC" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
      </radialGradient>

      <linearGradient id="branchBeam" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="65%" stopColor="#D9DEE5" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#D9DEE5" stopOpacity="0.02" />
      </linearGradient>

      <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D9DEE5" stopOpacity="0.05" />
        <stop offset="25%" stopColor="#BEE6FF" stopOpacity="0.32" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="75%" stopColor="#BEE6FF" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#D9DEE5" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Ambient horizon glow */}
    <ellipse cx="550" cy="380" rx="520" ry="260" fill="url(#horizonCoreGlow)" />

    {/* Perspective isometric execution rings */}
    {[110, 175, 245, 325, 415, 515].map((rx, idx) => {
      const ry = Math.round(rx * 0.44);
      return (
        <ellipse
          key={rx}
          cx="550"
          cy="380"
          rx={rx}
          ry={ry}
          stroke="url(#ringStroke)"
          strokeWidth={idx % 2 === 0 ? '1.25' : '0.85'}
          strokeDasharray={idx % 2 === 1 ? '6 6' : undefined}
        />
      );
    })}

    {/* Precision degree tick ring */}
    <ellipse
      cx="550"
      cy="380"
      rx="285"
      ry="125"
      stroke="rgba(190, 230, 255, 0.28)"
      strokeWidth="3"
      strokeDasharray="1.5 10"
    />

    {/* Radiating execution DAG branches & checkpoint lines from center (550, 310) */}
    <g stroke="url(#branchBeam)" strokeWidth="1.1">
      {/* Center vertical spine */}
      <line x1="550" y1="210" x2="550" y2="610" />
      {/* Symmetric branching execution paths */}
      <path d="M550 310 L430 365 L310 475 L160 610" />
      <path d="M550 310 L670 365 L790 475 L940 610" />
      <path d="M550 310 L355 340 L175 415 L30 510" />
      <path d="M550 310 L745 340 L925 415 L1070 510" />
      <path d="M550 310 L475 420 L405 565" />
      <path d="M550 310 L625 420 L695 565" />
      {/* Horizontal horizon axis */}
      <line x1="80" y1="380" x2="1020" y2="380" strokeOpacity="0.35" />
    </g>

    {/* Isometric hexagonal grid overlay in the foreground plane */}
    <g stroke="rgba(217, 222, 229, 0.18)" strokeWidth="1">
      <polygon points="550,245 645,295 645,395 550,445 455,395 455,295" />
      <polygon points="550,195 725,285 725,465 550,555 375,465 375,285" strokeDasharray="4 4" />
    </g>

    {/* Checkpoint verification nodes (diamonds & glowing points along the branches) */}
    {[
      { x: 430, y: 365 },
      { x: 670, y: 365 },
      { x: 355, y: 340 },
      { x: 745, y: 340 },
      { x: 310, y: 475 },
      { x: 790, y: 475 },
      { x: 475, y: 420 },
      { x: 625, y: 420 },
      { x: 550, y: 445 },
    ].map((pt, i) => (
      <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
        <circle r="6" fill="rgba(190, 230, 255, 0.25)" />
        <rect
          x="-3"
          y="-3"
          width="6"
          height="6"
          transform="rotate(45)"
          fill="#FFFFFF"
          stroke="#D9DEE5"
          strokeWidth="1"
        />
      </g>
    ))}
  </svg>
);

/**
 * Giant foreground "maxcode" wordmark rendered in the foreground of the Ridgeline Dither scene
 * so both the interactive dithered mountain ridges and the giant maxcode logo are visible together.
 */
const GiantForegroundMaxcodeLogo: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
  <div className="relative w-full aspect-[1640/270] overflow-hidden pointer-events-none select-none">
    <svg
      viewBox="0 0 1640 270"
      preserveAspectRatio="xMidYMax meet"
      className="w-full h-full"
      aria-label="maxcode"
    >
      <defs>
        <linearGradient id="maxcodeFgFill" x1="0%" y1="0%" x2="0%" y2="100%">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#D9DEE5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#070B14" stopOpacity="0.85" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0A0F1E" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#3D4A60" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#0A0F1E" stopOpacity="0.72" />
            </>
          )}
        </linearGradient>
        <linearGradient id="maxcodeFgStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D9DEE5" stopOpacity={isDark ? '0.45' : '0.65'} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isDark ? '0.75' : '0.85'} />
          <stop offset="100%" stopColor="#D9DEE5" stopOpacity={isDark ? '0.45' : '0.65'} />
        </linearGradient>
      </defs>
      {/* Giant Foreground Mascot Emblem on the left of maxcode */}
      <g
        transform="translate(52, 24) scale(17.5)"
        shapeRendering="crispEdges"
        style={{ mixBlendMode: isDark ? 'normal' : 'multiply' }}
        opacity={isDark ? '0.85' : '0.75'}
      >
        {/* Floating Verified Tick */}
        <rect x="7" y="0" width="1" height="1" fill="#FFFFFF" />
        <rect x="6" y="1" width="1" height="1" fill="#FFFFFF" />
        <rect x="5" y="2" width="1" height="1" fill="#AEB6C2" />
        <rect x="4" y="2" width="1" height="1" fill="#AEB6C2" />
        {/* Body Main (#D9DEE5) */}
        <rect x="1" y="3" width="10" height="9" fill="#D9DEE5" />
        {/* Top Highlight (#FFFFFF) */}
        <rect x="1" y="3" width="10" height="1" fill="#FFFFFF" />
        {/* Right and Bottom Shading (#AEB6C2) */}
        <rect x="10" y="4" width="1" height="8" fill="#AEB6C2" />
        <rect x="1" y="11" width="10" height="1" fill="#AEB6C2" />
        {/* Terminal Eyes & Smile (#0A0F1E) */}
        <rect x="3" y="5" width="1" height="2" fill="#0A0F1E" />
        <rect x="8" y="5" width="1" height="2" fill="#0A0F1E" />
        <rect x="4" y="8" width="1" height="1" fill="#0A0F1E" />
        <rect x="7" y="8" width="1" height="1" fill="#0A0F1E" />
        <rect x="5" y="9" width="2" height="1" fill="#0A0F1E" />
        {/* Stubby Feet (#8D99AB) */}
        <rect x="2" y="12" width="2" height="1" fill="#8D99AB" />
        <rect x="8" y="12" width="2" height="1" fill="#8D99AB" />
      </g>
      <text
        x="930"
        y="244"
        textAnchor="middle"
        fill="url(#maxcodeFgFill)"
        stroke="url(#maxcodeFgStroke)"
        strokeWidth="2.5"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: '305px',
          letterSpacing: '-0.045em',
          mixBlendMode: isDark ? 'normal' : 'multiply',
        }}
      >
        maxcode
      </text>
    </svg>
  </div>
);

export const FinalCtaAndFooter: React.FC<FinalCtaAndFooterProps> = ({
  onOpenModal,
  themeMode = 'light',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = themeMode === 'dark';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.final-cta-section', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
        });

        // Floating prism idle
        gsap.to('.final-prism-core', {
          y: -8,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* Section 5: Final CTA Card with Bespoke Maxcode Checkpoint Astrolabe & Prism Core */}
      <section className="final-cta-section rounded-2xl md:rounded-[24px] outline outline-1 outline-[#1E2A40] outline-offset-2 md:outline-offset-4 mx-auto w-[88%] md:w-10/12 max-w-width-mx overflow-hidden">
        <div
          className="relative flex flex-col justify-center items-center rounded-xl md:rounded-[24px] w-full min-h-[450px] overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, #070B14 0%, #0E1422 55%, #141C2E 100%)',
            border: '1px solid #1E2A40',
          }}
        >
          <div className="top-12 md:top-20 z-10 absolute flex flex-col items-center gap-6 px-4 text-center">
            <h2 className="max-w-2xl font-mono font-bold text-[#F5F7FA] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Put maxcode to work on a real codebase.
            </h2>
          </div>

          {/* Bespoke Maxcode Execution Horizon & DAG Checkpoint Astrolabe SVG */}
          <div className="top-[115px] md:top-[125px] left-1/2 absolute w-[1040px] h-[560px] -translate-x-1/2 pointer-events-none">
            <MaxcodeExecutionHorizonSvg className="w-full h-full object-contain" />
          </div>

          {/* Center Isometric Checkpoint Prism Core & CTA */}
          <div className="bottom-12 md:bottom-16 left-1/2 z-10 absolute flex flex-col items-center gap-10 -translate-x-1/2">
            <div className="final-prism-core relative flex justify-center items-center">
              <div className="bg-[#BEE6FF]/25 blur-[28px] rounded-full w-24 h-24" />
              <div className="absolute inset-0 flex justify-center items-center">
                <MaxcodeCheckpointCoreSvg />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenModal('talk')}
              className="group inline-flex relative justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#D9DEE5] active:translate-x-1 active:translate-y-1 px-6 py-3 rounded font-mono font-semibold text-[#0A0F1E] text-base tracking-tight transition-all duration-120 cursor-pointer select-none"
              style={{
                boxShadow: '4px 4px 0 #8D99AB',
              }}
            >
              <span className="z-10 flex items-center gap-2">Talk to us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Curved Bottom Section Cap before Footer */}
      <div className="relative bg-sf -mb-4 border-sf-tertiary border-b rounded-b-4xl w-full h-16 md:h-28" />

      {/* Ridgeline Dither Footer with Giant Foreground maxcode Logo */}
      <RidgelineDitherFooter
        name="maxcode"
        logo={<MaxMascotSvg pose="idle" className="w-10 h-11 shrink-0 -translate-y-0.5" />}
        brandHref="#top"
        preset="silver"
        palette={
          isDark
            ? {
                paper: '#070B14',
                ink: '#F5F7FA',
                muted: '#8D99AB',
                line: '#1E2A40',
                heart: '#D9DEE5',
                tones: ['#070B14', '#0E1422', '#141C2E', '#1E2A40', '#3D4A60', '#8D99AB', '#D9DEE5'],
              }
            : {
                paper: '#F4F6F9',
                ink: '#0A0F1E',
                muted: '#56637A',
                line: '#D5DCE6',
                heart: '#0A0F1E',
                tones: ['#F4F6F9', '#EAEEF4', '#D5DCE6', '#AEB6C2', '#8D99AB', '#3D4A60', '#0A0F1E'],
              }
        }
        seed={23}
        ridges={7}
        height="760px"
        sceneMinHeight="320px"
        maxWidth="1400px"
        tagline="Built on the Apache-2.0 Codex CLI · maxcode runs tests before it says done."
        brandExtra={
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-2 bg-sf-secondary/80 px-2.5 py-1.5 border border-st rounded-xl">
              <img
                src={assetUrl('/assets/iso-27001.svg')}
                alt="ISO 27001 Certified"
                className="w-8 h-8 object-contain"
              />
              <span className="font-mono text-[10.5px] text-tx-secondary">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 bg-sf-secondary/80 px-2.5 py-1.5 border border-st rounded-xl">
              <img
                src={assetUrl('/assets/soc2-type2.svg')}
                alt="AICPA SOC 2 Type II Certified"
                className="w-8 h-8 object-contain"
              />
              <span className="font-mono text-[10.5px] text-tx-secondary">SOC 2 Type II</span>
            </div>
          </div>
        }
        foregroundLogo={<GiantForegroundMaxcodeLogo isDark={isDark} />}
        columns={[
          {
            title: 'Features & Architecture',
            links: [
              { label: 'maxcode CLI', href: '#top', badge: 'v0.1.0' },
              { label: 'The Verifier Loop', href: '#orchestration' },
              { label: 'Git Checkpoints & Undo', href: '#long-horizon' },
              { label: 'Multi-Model Routing', href: '#cost' },
              { label: '20-Task Benchmark', href: docUrl('/docs/reference/benchmarks') },
            ],
          },
          {
            title: 'Documentation',
            links: [
              { label: '5-Minute Quickstart', href: docUrl('/docs/tutorials/quickstart'), badge: '5 min' },
              { label: 'CLI Commands Reference', href: docUrl('/docs/reference/cli') },
              { label: 'maxcode.toml Schema', href: docUrl('/docs/reference/config') },
              { label: 'Verifier State Machine', href: docUrl('/docs/explanation/verifier-loop') },
              { label: 'All Documentation', href: docUrl('/docs') },
            ],
          },
          {
            title: 'Open Source',
            links: [
              { label: 'GitHub Repository', href: 'https://github.com/RavaniRoshan/maxcode' },
              { label: 'Contributing Guide', href: docUrl('/docs/reference/contributing') },
              { label: 'Security Policy', href: docUrl('/docs/reference/security') },
              { label: 'Apache-2.0 License', href: docUrl('/docs/reference/legal') },
              { label: 'Changelog', href: docUrl('/docs/reference/changelog') },
            ],
          },
          {
            title: 'Resources & Legal',
            links: [
              { label: 'Frequently Asked Questions', href: '#faq' },
              { label: 'Diátaxis How-To Guides', href: docUrl('/docs/how-to') },
              { label: 'Open Codex Attribution', href: docUrl('/docs/reference/legal') },
              { label: 'Trademark & Brand Policy', href: docUrl('/docs/reference/legal') },
            ],
          },
        ]}
        socials={[
          { icon: 'github', href: 'https://github.com/RavaniRoshan/maxcode' },
          { icon: 'x', href: 'https://x.com' },
          { icon: 'linkedin', href: 'https://linkedin.com' },
          { icon: 'youtube', href: 'https://youtube.com' },
        ]}
        copyright="© 2026 maxcode contributors. Open source under Apache-2.0 · Forked from Codex CLI"
        credit={{ label: 'maxcode Docs & Studio', href: docUrl('/docs') }}
      />
    </div>
  );
};
