import React from 'react';
import { assetUrl } from '@/lib/utils';

/**
 * Terminal-native, ink-navy atmospheric backdrops with subtle silver/aura bloom
 * matching the DESIGN.md specification (Dark by default, silver and white).
 * Rendered as inline responsive vector SVGs with CSS gradient ground fallbacks.
 */
export const HeroAtmosphericBackdrop: React.FC<{ asImg?: boolean; className?: string }> = ({
  asImg = false,
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#070B14] via-[#0E1422] to-[#141C2E] ${className}`}
  >
    {asImg ? (
      <img
        src={assetUrl('/assets/maxcode-hero-backdrop.svg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="heroInkBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070B14" />
            <stop offset="45%" stopColor="#0E1422" />
            <stop offset="100%" stopColor="#141C2E" />
          </linearGradient>

          {/* Soft top-center aura bloom in #BEE6FF */}
          <radialGradient id="heroAuraGlow" cx="50%" cy="12%" r="65%" fx="50%" fy="10%">
            <stop offset="0%" stopColor="#BEE6FF" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#BEE6FF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#BEE6FF" stopOpacity="0" />
          </radialGradient>

          {/* Bottom horizon silver ambient reflection */}
          <radialGradient id="heroSilverHorizon" cx="50%" cy="100%" r="70%" fx="50%" fy="100%">
            <stop offset="0%" stopColor="#D9DEE5" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#1E2A40" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>

          <filter id="heroFineGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.035 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="compositeNoise" />
            <feBlend mode="overlay" in="SourceGraphic" in2="compositeNoise" />
          </filter>
        </defs>

        <rect width="1600" height="1000" fill="url(#heroInkBase)" />
        <rect width="1600" height="1000" fill="url(#heroAuraGlow)" />
        <rect width="1600" height="1000" fill="url(#heroSilverHorizon)" />
        <rect width="1600" height="1000" fill="#FFFFFF" fillOpacity="0.015" filter="url(#heroFineGrain)" />
      </svg>
    )}
  </div>
);

export const TrainingAtmosphericBackdrop: React.FC<{ asImg?: boolean; className?: string }> = ({
  asImg = false,
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#070B14] via-[#0E1422] to-[#141C2E] ${className}`}
  >
    {asImg ? (
      <img
        src={assetUrl('/assets/maxcode-training-backdrop.svg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="trainingInkBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070B14" />
            <stop offset="60%" stopColor="#0E1422" />
            <stop offset="100%" stopColor="#141C2E" />
          </linearGradient>

          <radialGradient id="trainingAuraCenter" cx="50%" cy="100%" r="70%" fx="50%" fy="100%">
            <stop offset="0%" stopColor="#BEE6FF" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#D9DEE5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>

          <filter id="trainingDarkGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.035 0" in="noise" result="grain" />
            <feBlend mode="screen" in="SourceGraphic" in2="grain" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#trainingInkBase)" />
        <rect width="1600" height="900" fill="url(#trainingAuraCenter)" />
        <rect width="1600" height="900" fill="#070B14" fillOpacity="0.04" filter="url(#trainingDarkGrain)" />
      </svg>
    )}
  </div>
);
