import React from 'react';
import { assetUrl } from '@/lib/utils';

/**
 * Self-contained, local atmospheric backdrops in the warm terracotta / red-orange shade.
 * Rendered as inline responsive vector SVGs with CSS gradient ground fallbacks so they
 * display immediately on the first frame with zero network latency, zero FOUC, and
 * zero 404 risk on GitHub Pages or subpath deployments.
 */
export const HeroAtmosphericBackdrop: React.FC<{ asImg?: boolean; className?: string }> = ({
  asImg = false,
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#f7b286] via-[#e8733c] to-[#b83714] ${className}`}
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
          <linearGradient id="heroSkyToHorizon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7b286" />
            <stop offset="28%" stopColor="#f29461" />
            <stop offset="56%" stopColor="#e8733c" />
            <stop offset="80%" stopColor="#dc5624" />
            <stop offset="100%" stopColor="#b83714" />
          </linearGradient>

          <radialGradient id="heroTopAmberGlow" cx="50%" cy="8%" r="65%" fx="50%" fy="5%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#fb923c" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heroBottomCrimsonOrangeGlow" cx="50%" cy="98%" r="75%" fx="50%" fy="98%">
            <stop offset="0%" stopColor="#9a3412" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#c2410c" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e26a2c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heroLeftWarmBloom" cx="12%" cy="75%" r="55%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heroRightWarmBloom" cx="88%" cy="75%" r="55%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>

          <filter id="heroFineGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={3} stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.045 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="compositeNoise" />
            <feBlend mode="overlay" in="SourceGraphic" in2="compositeNoise" />
          </filter>
        </defs>

        <rect width="1600" height="1000" fill="url(#heroSkyToHorizon)" />
        <rect width="1600" height="1000" fill="url(#heroTopAmberGlow)" />
        <rect width="1600" height="1000" fill="url(#heroBottomCrimsonOrangeGlow)" />
        <rect width="1600" height="1000" fill="url(#heroLeftWarmBloom)" />
        <rect width="1600" height="1000" fill="url(#heroRightWarmBloom)" />
        <rect width="1600" height="1000" fill="#ffffff" fillOpacity="0.02" filter="url(#heroFineGrain)" />
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
    className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#140f0c] via-[#1f1510] to-[#2e1b12] ${className}`}
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
          <linearGradient id="trainingDarkObsidianBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#140f0c" />
            <stop offset="62%" stopColor="#1f1510" />
            <stop offset="100%" stopColor="#2e1b12" />
          </linearGradient>

          <radialGradient id="trainingHorizonAmberAurora" cx="50%" cy="105%" r="75%" fx="50%" fy="105%">
            <stop offset="0%" stopColor="#e26a2c" stopOpacity="0.58" />
            <stop offset="45%" stopColor="#9a3412" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#181310" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="trainingSubtleCrimsonEdge" cx="82%" cy="92%" r="48%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#181310" stopOpacity="0" />
          </radialGradient>

          <filter id="trainingDarkGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" in="noise" result="grain" />
            <feBlend mode="screen" in="SourceGraphic" in2="grain" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#trainingDarkObsidianBase)" />
        <rect width="1600" height="900" fill="url(#trainingHorizonAmberAurora)" />
        <rect width="1600" height="900" fill="url(#trainingSubtleCrimsonEdge)" />
        <rect width="1600" height="900" fill="#181310" fillOpacity="0.05" filter="url(#trainingDarkGrain)" />
      </svg>
    )}
  </div>
);
