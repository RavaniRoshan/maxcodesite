import React, { useEffect, useState } from 'react';
import FieldDiagonalPixel from '@/components/originkit/ui/pixelcascade';
import { ThemeMode } from '../data/brandConfig';

interface HeroPixelCascadeBackdropProps {
  themeMode?: ThemeMode;
}

export const HeroPixelCascadeBackdrop: React.FC<HeroPixelCascadeBackdropProps> = ({
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
      className="absolute inset-x-0 top-0 h-[880px] sm:h-[940px] md:h-[1020px] lg:h-[1120px] overflow-hidden pointer-events-auto select-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0) 100%)',
      }}
    >
      <FieldDiagonalPixel
        key={themeMode}
        background={isLight ? '#F4F6F9' : '#070B14'}
        baseColor={isLight ? '#94A3B8' : '#1E2A40'}
        accentColor={isLight ? '#0A0F1E' : '#FFFFFF'}
        speed={16}
        scale={54}
        density={60}
        accentShare={18}
        trail={8}
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
            ? 'radial-gradient(ellipse 65% 50% at 50% 40%, rgba(244,246,249,0.65) 0%, rgba(244,246,249,0.15) 65%, transparent 100%)'
            : 'radial-gradient(ellipse 65% 50% at 50% 40%, rgba(7,11,20,0.7) 0%, rgba(7,11,20,0.2) 65%, transparent 100%)',
        }}
      />

      {/* Smooth progressive dissolve overlay merging into base surface color at the terminal container */}
      <div className="absolute inset-x-0 bottom-0 h-56 sm:h-64 md:h-80 bg-gradient-to-b from-transparent via-sf/70 to-sf pointer-events-none" />
    </div>
  );
};
