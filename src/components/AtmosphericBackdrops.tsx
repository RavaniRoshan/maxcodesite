import React from 'react';

/**
 * Self-contained, local atmospheric backdrops in the warm terracotta / red-orange shade.
 */
export const HeroAtmosphericBackdrop: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
  >
    <img
      src="/assets/maxcode-hero-backdrop.svg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);

export const TrainingAtmosphericBackdrop: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
  >
    <img
      src="/assets/maxcode-training-backdrop.svg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);
