import React, { useEffect, useState } from 'react';
import { HalftoneCmyk } from '@paper-design/shaders-react';
import { ThemeMode } from '../data/brandConfig';

interface HeroHalftoneBackdropProps {
  themeMode?: ThemeMode;
}

export const HeroHalftoneBackdrop: React.FC<HeroHalftoneBackdropProps> = ({ themeMode = 'dark' }) => {
  const [mounted, setMounted] = useState(false);
  const isLight = themeMode === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Exact shader parameters from the user's specification:
  // https://shaders.paper.design/halftone-cmyk#colorBack=fffaf0&colorC=59afc5&colorM=d8697c&colorY=fad85c&colorK=2d2824&size=0.2&gridNoise=0.45&type=sharp&softness=0.4&contrast=1.25&floodC=0.15&floodM=0&floodY=0&floodK=0&gainC=0.3&gainM=0&gainY=0.2&gainK=0&grainMixer=0.15&grainOverlay=0.1&grainSize=0.5&scale=1&fit=cover

  const shaderProps = isLight
    ? {
        colorBack: '#fffaf0',
        colorC: '#59afc5',
        colorM: '#d8697c',
        colorY: '#fad85c',
        colorK: '#2d2824',
        size: 0.2,
        gridNoise: 0.45,
        type: 'sharp' as const,
        softness: 0.4,
        contrast: 1.25,
        floodC: 0.15,
        floodM: 0,
        floodY: 0,
        floodK: 0,
        gainC: 0.3,
        gainM: 0,
        gainY: 0.2,
        gainK: 0,
        grainMixer: 0.15,
        grainOverlay: 0.1,
        grainSize: 0.5,
        scale: 1,
        fit: 'cover' as const,
        speed: 0,
      }
    : {
        // Dark mode tuned: Deep ink-navy background with subtle cyan, silver, and indigo halftone dots
        colorBack: '#070B14',
        colorC: '#38BDF8',
        colorM: '#818CF8',
        colorY: '#D9DEE5',
        colorK: '#020617',
        size: 0.2,
        gridNoise: 0.45,
        type: 'sharp' as const,
        softness: 0.4,
        contrast: 1.25,
        floodC: 0.12,
        floodM: 0,
        floodY: 0,
        floodK: 0,
        gainC: 0.25,
        gainM: 0,
        gainY: 0.2,
        gainK: 0,
        grainMixer: 0.15,
        grainOverlay: 0.08,
        grainSize: 0.5,
        scale: 1,
        fit: 'cover' as const,
        speed: 0,
      };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-24 md:-top-32 h-[720px] md:h-[840px] lg:h-[940px] overflow-hidden pointer-events-none select-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0) 100%)',
      }}
    >
      {/* Halftone CMYK WebGL Canvas */}
      <div className={`w-full h-full ${isLight ? 'opacity-85' : 'opacity-70'}`}>
        <HalftoneCmyk
          key={themeMode}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
          {...shaderProps}
        />
      </div>

      {/* Center soft vignette for supreme typography readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 50% 35%, rgba(255,250,240,0.4) 0%, rgba(244,246,249,0.1) 60%, transparent 100%)'
            : 'radial-gradient(circle at 50% 35%, rgba(7,11,20,0.45) 0%, rgba(7,11,20,0.1) 60%, transparent 100%)',
        }}
      />

      {/* Smooth progressive fade out to base surface color as it approaches the terminal preview section */}
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-gradient-to-b from-transparent via-sf/70 to-sf pointer-events-none" />
    </div>
  );
};
