import React from 'react';
import RidgelineDitherFooter from './ui/ridgeline-dither-footer';
import { MaxMascotSvg } from './BrandSvgs';
import { ThemeMode } from '../data/brandConfig';

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
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fed7aa" />
      </linearGradient>
      <linearGradient id="prismLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdba74" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="prismRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
    </defs>

    {/* Outer precision orbital ring with 4 checkpoint nodes */}
    <circle
      cx="34"
      cy="34"
      r="30"
      stroke="rgba(255, 237, 213, 0.35)"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
    <circle cx="34" cy="4" r="2.2" fill="#fed7aa" />
    <circle cx="64" cy="34" r="2.2" fill="#fed7aa" />
    <circle cx="34" cy="64" r="2.2" fill="#fed7aa" />
    <circle cx="4" cy="34" r="2.2" fill="#fed7aa" />

    {/* Rotated diamond checkpoint frame */}
    <rect
      x="34"
      y="10"
      width="33.94"
      height="33.94"
      rx="4"
      transform="rotate(45 34 10)"
      stroke="rgba(255, 255, 255, 0.45)"
      strokeWidth="1.2"
      fill="rgba(24, 19, 16, 0.35)"
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
    <circle cx="34" cy="34" r="3.5" fill="#ffffff" />
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
        <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.42" />
        <stop offset="45%" stopColor="#fb923c" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#181310" stopOpacity="0" />
      </radialGradient>

      <linearGradient id="branchBeam" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="65%" stopColor="#fed7aa" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.02" />
      </linearGradient>

      <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.05" />
        <stop offset="25%" stopColor="#ffedd5" stopOpacity="0.32" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="75%" stopColor="#ffedd5" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.05" />
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
      stroke="rgba(255, 237, 213, 0.28)"
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
    <g stroke="rgba(255, 237, 213, 0.18)" strokeWidth="1">
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
        <circle r="6" fill="rgba(251, 146, 60, 0.25)" />
        <rect
          x="-3"
          y="-3"
          width="6"
          height="6"
          transform="rotate(45)"
          fill="#ffedd5"
          stroke="#ea580c"
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
              <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.16" />
              <stop offset="45%" stopColor="#fb923c" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#140f0c" stopOpacity="0.78" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#181310" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#9a3412" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#181310" stopOpacity="0.72" />
            </>
          )}
        </linearGradient>
        <linearGradient id="maxcodeFgStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#faf6f1" stopOpacity={isDark ? '0.45' : '0.65'} />
          <stop offset="50%" stopColor="#fed7aa" stopOpacity={isDark ? '0.75' : '0.85'} />
          <stop offset="100%" stopColor="#faf6f1" stopOpacity={isDark ? '0.45' : '0.65'} />
        </linearGradient>
      </defs>
      {/* Giant Foreground Mascot Emblem on the left of maxcode */}
      <g
        transform="translate(52, 24) scale(17.5)"
        shapeRendering="crispEdges"
        style={{ mixBlendMode: isDark ? 'normal' : 'multiply' }}
        opacity={isDark ? '0.82' : '0.72'}
      >
        <rect x="4" y="2" width="1" height="1" fill="#F59E0B" />
        <rect x="5" y="2" width="1" height="1" fill="#D97706" />
        <rect x="6" y="1" width="1" height="1" fill="#F59E0B" />
        <rect x="7" y="0" width="1" height="1" fill="#FBBF24" />
        <rect x="3" y="4" width="6" height="1" fill="#FDBA74" />
        <rect x="2" y="5" width="8" height="5" fill="#E26A2C" />
        <rect x="3" y="10" width="6" height="1" fill="#E26A2C" />
        <rect x="9" y="5" width="1" height="5" fill="#B84318" />
        <rect x="8" y="10" width="1" height="1" fill="#B84318" />
        <rect x="4" y="6" width="1" height="2" fill="#181310" />
        <rect x="7" y="6" width="1" height="2" fill="#181310" />
        <rect x="5" y="9" width="2" height="0.75" fill="#181310" />
        <rect x="3" y="11" width="2" height="1" fill="#9A3412" />
        <rect x="7" y="11" width="2" height="1" fill="#9A3412" />
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
  const isDark = themeMode === 'dark';
  return (
    <>
      {/* Section 5: Final CTA Card with Bespoke Maxcode Checkpoint Astrolabe & Prism Core */}
      <section className="rounded-2xl md:rounded-[24px] outline outline-2 outline-st outline-offset-2 md:outline-offset-4 mx-auto w-[88%] md:w-10/12 max-w-width-mx overflow-hidden">
        <div
          className="relative flex flex-col justify-center items-center rounded-xl md:rounded-[24px] w-full min-h-[450px] overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, var(--brand-glow-start, #181310) 0%, #3b170c 52%, var(--brand-glow-end, #f97316) 116.55%)',
          }}
        >
          <div className="top-12 md:top-20 z-10 absolute flex flex-col items-center gap-6 px-4 text-center">
            <h2 className="max-w-2xl font-season font-semibold text-[#faf6f1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Put maxcode to work on a real codebase.
            </h2>
          </div>

          {/* Bespoke Maxcode Execution Horizon & DAG Checkpoint Astrolabe SVG */}
          <div className="top-[115px] md:top-[125px] left-1/2 absolute w-[1040px] h-[560px] -translate-x-1/2 pointer-events-none">
            <MaxcodeExecutionHorizonSvg className="w-full h-full object-contain" />
          </div>

          {/* Center Isometric Checkpoint Prism Core & CTA */}
          <div className="bottom-12 md:bottom-16 left-1/2 z-10 absolute flex flex-col items-center gap-10 -translate-x-1/2">
            <div className="relative flex justify-center items-center">
              <div className="bg-amber-300/40 blur-[22px] rounded-full w-20 h-20" />
              <div className="absolute inset-0 flex justify-center items-center">
                <MaxcodeCheckpointCoreSvg />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenModal('talk')}
              className="group inline-flex relative justify-center items-center gap-1 bg-[#181310] hover:bg-[#181310]/90 active:bg-[#181310]/80 px-5 py-3 rounded-full overflow-hidden font-semibold text-[#faf6f1] text-base tracking-tight transition-all duration-300 cursor-pointer select-none"
              style={{
                boxShadow:
                  '0 6px 12px 0 rgba(0, 0, 0, 0.18), 0 2px 6px 0 rgba(255, 255, 255, 0.35) inset, 0 -2px 6px 0 rgba(255, 255, 255, 0.35) inset',
              }}
            >
              <span
                className="inline-block top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-80 rounded-full w-3/4 aspect-square transition-all -translate-x-1/2 -translate-y-1/2 duration-500 ease-out pointer-events-none"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, #ffedd5 0%, var(--sc-blue) 48.08%, rgba(220, 38, 38, 0.60) 100%)',
                  filter: 'blur(15px)',
                }}
              />
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
        logo={<MaxMascotSvg className="w-7 h-[30px] shrink-0 -translate-y-0.5" />}
        brandHref="#top"
        theme={themeMode}
        preset="terracotta"
        palette={
          isDark
            ? {
                paper: '#0e0b09',
                ink: '#f7f2ec',
                muted: '#a8998c',
                line: 'rgba(247, 242, 236, 0.13)',
                heart: '#fb923c',
                ridges: ['#29130a', '#451d0d', '#6b2a11', '#943a16', '#bd4d1d', '#e26a2c', '#fb923c'],
              }
            : undefined
        }
        seed={23}
        ridges={7}
        height="760px"
        sceneMinHeight="320px"
        maxWidth="1400px"
        tagline="AI for all from India · Long-horizon coding agents powered by maxm1 for real codebases."
        brandExtra={
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-2 bg-sf-secondary/80 px-2.5 py-1.5 border border-st rounded-xl">
              <img
                src="/assets/iso-27001.svg"
                alt="ISO 27001 Certified"
                className="w-8 h-8 object-contain"
              />
              <span className="font-mono text-[10.5px] text-tx-secondary">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 bg-sf-secondary/80 px-2.5 py-1.5 border border-st rounded-xl">
              <img
                src="/assets/soc2-type2.svg"
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
            title: 'Products',
            links: [
              { label: 'maxcode', href: '#top', badge: 'maxm1' },
              { label: 'Conversational Agents', href: '#long-horizon' },
              { label: 'maxcode for Stubs', href: '#cost' },
              { label: 'Kaze', href: '#faq' },
              { label: 'Indus', href: '#faq' },
            ],
          },
          {
            title: 'APIs & Platform',
            links: [
              { label: 'Text & Chat (maxm1)', href: '#cost' },
              { label: 'Text to Speech', href: '#cost' },
              { label: 'Speech to Text', href: '#cost' },
              { label: 'Document Intelligence', href: '#cost' },
              { label: 'API Pricing', href: '#cost' },
              { label: 'Studio Sandbox', href: '#cost' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Blogs', href: '#faq' },
              { label: 'Research', href: '#faq' },
              { label: 'Cookbooks', href: '#faq' },
              { label: 'Documentation', href: '#faq' },
            ],
          },
          {
            title: 'Company & Legal',
            links: [
              { label: 'About Us', href: '#footer' },
              { label: 'Careers', href: '#footer', badge: 'Hiring' },
              { label: 'Terms of Service', href: '#footer' },
              { label: 'Privacy Policy', href: '#footer' },
              { label: 'Security', href: '#footer' },
            ],
          },
        ]}
        socials={[
          { icon: 'linkedin', href: '#footer' },
          { icon: 'x', href: '#footer' },
          { icon: 'github', href: '#footer' },
          { icon: 'youtube', href: '#footer' },
          { icon: 'instagram', href: '#footer' },
        ]}
        copyright="© 2026 maxcode AI. All rights reserved · Powered by maxm1 · Bengaluru, India"
        credit={{ label: 'maxcode & maxm1 Studio', href: '#top' }}
      />
    </>
  );
};
