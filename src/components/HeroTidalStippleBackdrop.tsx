import React, { useEffect, useState } from 'react';
import OrchidFlurry from '@/components/originkit/ui/tidal-stipple';
import { ThemeMode } from '../data/brandConfig';

interface HeroTidalStippleBackdropProps {
  themeMode?: ThemeMode;
}

export const HeroTidalStippleBackdrop: React.FC<HeroTidalStippleBackdropProps> = ({
  themeMode = 'dark',
}) => {
  const [mounted, setMounted] = useState(false);
  const isLight = themeMode === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[920px] sm:h-[1000px] md:h-[1080px] lg:h-[1160px] overflow-hidden pointer-events-auto select-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0.18) 88%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0.18) 88%, rgba(0,0,0,0) 100%)',
      }}
    >
      <OrchidFlurry
        key={themeMode}
        background={isLight ? '#F4F6F9' : '#070B14'}
        baseColor={isLight ? '#0284C7' : '#0081FF'}
        accentColor={isLight ? '#0F172A' : '#5FCDFF'}
        density={42}
        scale={186}
        dotTop={36}
        reach={4.5}
        distortion={6}
        speed={85}
        tide={20}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
        }}
      />

      {/* Gentle center spotlight ensuring typography is crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 70% 50% at 50% 36%, rgba(244,246,249,0.72) 0%, rgba(244,246,249,0.2) 65%, transparent 100%)'
            : 'radial-gradient(ellipse 70% 50% at 50% 36%, rgba(7,11,20,0.72) 0%, rgba(7,11,20,0.2) 65%, transparent 100%)',
        }}
      />

      {/* Smooth progressive dissolve overlay merging into base surface color at the preview terminal */}
      <div className="absolute inset-x-0 bottom-0 h-64 sm:h-72 md:h-80 bg-gradient-to-b from-transparent via-sf/70 to-sf pointer-events-none" />
    </div>
  );
};
