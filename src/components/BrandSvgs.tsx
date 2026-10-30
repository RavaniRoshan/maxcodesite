import React from 'react';

export type MaxPose = 'idle' | 'working' | 'pass' | 'fail';

export interface MaxMascotProps {
  className?: string;
  pose?: MaxPose;
  glow?: boolean;
  onDarkTile?: boolean;
}

export const MaxMascotSvg: React.FC<MaxMascotProps> = ({
  className = 'w-12 h-12',
  pose = 'idle',
  glow = true,
  onDarkTile = false,
}) => {
  const showTick = pose === 'idle' || pose === 'pass';
  const showGlow = glow && (pose === 'idle' || pose === 'pass');

  const svgContent = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 16 18"
      role="img"
      aria-label={`Max, the maxcode mascot (${pose})`}
      className={className}
    >
      <style>{`
        .max-eye { transform-box: fill-box; transform-origin: center; animation: maxBlink 4s infinite; }
        @keyframes maxBlink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
        .max-tick { animation: maxBob 1.6s ease-in-out infinite; }
        @keyframes maxBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-0.4px); } }
        .max-glow { animation: maxPulse 3s ease-in-out infinite; }
        @keyframes maxPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .max-eye, .max-tick, .max-glow { animation: none; }
        }
      `}</style>

      <defs>
        <radialGradient id="max-aura-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BEE6FF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#BEE6FF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#BEE6FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura Glow — Verified only (idle & pass) */}
      {showGlow && (
        <g>
          <circle className="max-glow" cx="6" cy="8" r="8" fill="url(#max-aura-glow)" />
          {pose === 'pass' && (
            <circle cx="6" cy="8" r="6" fill="url(#max-aura-glow)" opacity="0.8" />
          )}
        </g>
      )}

      {/* Silver & White Body Silhouette */}
      <g shapeRendering="crispEdges">
        {/* Body main (#D9DEE5) */}
        <rect x="1" y="3" width="10" height="9" fill="#D9DEE5" />
        {/* Top highlight row (#FFFFFF) */}
        <rect x="1" y="3" width="10" height="1" fill="#FFFFFF" />
        {/* Right and bottom shade edges (#AEB6C2) */}
        <rect x="10" y="4" width="1" height="8" fill="#AEB6C2" />
        <rect x="1" y="11" width="10" height="1" fill="#AEB6C2" />
        {/* Stubby feet (#8D99AB) */}
        <rect x="2" y="12" width="2" height="1" fill="#8D99AB" />
        <rect x="8" y="12" width="2" height="1" fill="#8D99AB" />
      </g>

      {/* Pose Faces & Indicators */}
      {pose === 'idle' && (
        <g shapeRendering="crispEdges" fill="#0A0F1E">
          <rect className="max-eye" x="3" y="5" width="1" height="2" />
          <rect className="max-eye" x="8" y="5" width="1" height="2" />
          <rect x="4" y="8" width="1" height="1" />
          <rect x="7" y="8" width="1" height="1" />
          <rect x="5" y="9" width="2" height="1" />
        </g>
      )}

      {pose === 'working' && (
        <>
          <g shapeRendering="crispEdges" fill="#0A0F1E">
            <rect x="4" y="5" width="1" height="2" />
            <rect x="9" y="5" width="1" height="2" />
            <rect x="5" y="9" width="2" height="1" />
          </g>
          <g shapeRendering="crispEdges" fill="#94A3B8">
            <rect x="4" y="1" width="1" height="1">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0s" repeatCount="indefinite" />
            </rect>
            <rect x="6" y="1" width="1" height="1">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="1" width="1" height="1">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
            </rect>
          </g>
        </>
      )}

      {pose === 'pass' && (
        <>
          <g shapeRendering="crispEdges" fill="#0A0F1E">
            <rect x="2" y="6" width="1" height="1" />
            <rect x="3" y="5" width="1" height="1" />
            <rect x="4" y="6" width="1" height="1" />
            <rect x="7" y="6" width="1" height="1" />
            <rect x="8" y="5" width="1" height="1" />
            <rect x="9" y="6" width="1" height="1" />
            <rect x="4" y="8" width="4" height="1" />
            <rect x="5" y="9" width="2" height="1" />
          </g>
          <g shapeRendering="crispEdges" fill="#FFFFFF">
            <rect x="0" y="1" width="1" height="1" />
            <rect x="-1" y="2" width="1" height="1" />
            <rect x="1" y="2" width="1" height="1" />
            <rect x="0" y="3" width="1" height="1" />
          </g>
        </>
      )}

      {pose === 'fail' && (
        <>
          <g shapeRendering="crispEdges" fill="#0A0F1E">
            <rect x="3" y="5" width="1" height="1" />
            <rect x="4" y="6" width="1" height="1" />
            <rect x="3" y="7" width="1" height="1" />
            <rect x="8" y="5" width="1" height="1" />
            <rect x="7" y="6" width="1" height="1" />
            <rect x="8" y="7" width="1" height="1" />
            <rect x="4" y="9" width="4" height="1" />
          </g>
          <g shapeRendering="crispEdges" fill="#F87171">
            <rect x="5" y="-1" width="1" height="1" />
            <rect x="7" y="-1" width="1" height="1" />
            <rect x="6" y="0" width="1" height="1" />
            <rect x="5" y="1" width="1" height="1" />
            <rect x="7" y="1" width="1" height="1" />
          </g>
          <g shapeRendering="crispEdges" fill="#7DD3FC">
            <rect x="11" y="5" width="1" height="1" />
            <rect x="11" y="6" width="1" height="1" />
          </g>
        </>
      )}

      {/* Floating Verified Tick Crown — Silver Hi (#FFFFFF) */}
      {showTick && (
        <g className="max-tick" shapeRendering="crispEdges" fill="#FFFFFF">
          <rect x="8" y="-1" width="1" height="1" />
          <rect x="9" y="-1" width="1" height="1" />
          <rect x="3" y="0" width="1" height="1" />
          <rect x="7" y="0" width="1" height="1" />
          <rect x="8" y="0" width="1" height="1" />
          <rect x="3" y="1" width="1" height="1" />
          <rect x="4" y="1" width="1" height="1" />
          <rect x="6" y="1" width="1" height="1" />
          <rect x="7" y="1" width="1" height="1" />
          <rect x="4" y="2" width="1" height="1" />
          <rect x="5" y="2" width="1" height="1" />
          <rect x="6" y="2" width="1" height="1" />
        </g>
      )}
    </svg>
  );

  if (onDarkTile) {
    return (
      <span className="inline-flex items-center justify-center bg-[#070B14] p-2 rounded-[6px] border border-[#1E2A40]/60 shrink-0">
        {svgContent}
      </span>
    );
  }

  return svgContent;
};

export const MaxFaviconSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="1 3 10 10"
    shapeRendering="crispEdges"
    className={className}
    role="img"
    aria-label="maxcode favicon mark"
  >
    <rect x="1" y="3" width="10" height="9" fill="#D9DEE5" />
    <rect x="1" y="3" width="10" height="1" fill="#FFFFFF" />
    <rect x="10" y="4" width="1" height="8" fill="#AEB6C2" />
    <rect x="1" y="11" width="10" height="1" fill="#AEB6C2" />
    <rect x="2" y="12" width="2" height="1" fill="#8D99AB" />
    <rect x="8" y="12" width="2" height="1" fill="#8D99AB" />
    <rect x="3" y="5" width="1" height="2" fill="#0A0F1E" />
    <rect x="8" y="5" width="1" height="2" fill="#0A0F1E" />
    <rect x="4" y="8" width="1" height="1" fill="#0A0F1E" />
    <rect x="7" y="8" width="1" height="1" fill="#0A0F1E" />
    <rect x="5" y="9" width="2" height="1" fill="#0A0F1E" />
  </svg>
);

/**
 * Legacy alias for Max mascot sitting inline with headlines
 */
export const MaxBuddyBackSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <MaxMascotSvg className={className} pose="idle" />
);

/**
 * Legacy alias retained for backward compatibility
 */
export const MaxBuddyHandsSvg: React.FC<{ className?: string }> = () => null;

export const MotifSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 1357 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      opacity="0.2"
      d="M849.898 44.365C787.211 103.596 710.892 104.242 644.499 44.365C710.892 -15.5125 787.211 -14.8665 849.898 44.365Z"
      fill="url(#paint0_linear_motif)"
    />
    <path
      opacity="0.2"
      d="M1111.74 44.365C1049.05 103.596 972.732 104.242 906.339 44.365C972.732 -15.5125 1049.05 -14.8665 1111.74 44.365Z"
      fill="url(#paint1_linear_motif)"
    />
    <path
      opacity="0.2"
      d="M1357 44.365C1294.31 103.596 1217.99 104.242 1151.6 44.365C1217.99 -15.5125 1294.31 -14.8665 1357 44.365Z"
      fill="url(#paint2_linear_motif)"
    />
    <path
      opacity="0.2"
      d="M512.501 44.365C575.188 103.596 651.507 104.242 717.9 44.365C651.507 -15.5125 575.188 -14.8665 512.501 44.365Z"
      fill="url(#paint3_linear_motif)"
    />
    <path
      opacity="0.2"
      d="M250.661 44.365C313.348 103.596 389.667 104.242 456.06 44.365C389.667 -15.5125 313.348 -14.8665 250.661 44.365Z"
      fill="url(#paint4_linear_motif)"
    />
    <path
      opacity="0.2"
      d="M0 44.365C62.687 103.596 139.006 104.242 205.399 44.365C139.006 -15.5125 62.687 -14.8665 0 44.365Z"
      fill="url(#paint5_linear_motif)"
    />
    <defs>
      <linearGradient id="paint0_linear_motif" x1="747.199" y1="0" x2="747.199" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="paint1_linear_motif" x1="1009.04" y1="0" x2="1009.04" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="paint2_linear_motif" x1="1254.3" y1="0" x2="1254.3" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="paint3_linear_motif" x1="615.201" y1="0" x2="615.201" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="paint4_linear_motif" x1="353.361" y1="0" x2="353.361" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="paint5_linear_motif" x1="102.7" y1="0" x2="102.7" y2="88.73" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--brand-primary)" />
        <stop offset="1" stopColor="var(--brand-accent)" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);
