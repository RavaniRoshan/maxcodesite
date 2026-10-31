import React, { useEffect, useState } from 'react';
import { HalftoneCmyk } from '@paper-design/shaders-react';
import { ThemeMode } from '../data/brandConfig';
import cloudsWallpaper from '../assets/wp16484691-white-clouds-desktop-wallpapers.webp';
import cloudsNight from '../assets/clouds-night.webp';

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

  // Halftone CMYK shader using the user-selected white clouds wallpaper:
  // wp16484691-white-clouds-desktop-wallpapers.webp
  // In Light mode: direct wallpaper with vintage CMYK cyan sky & cream cloud
  // In Dark mode: night-mapped clouds with glowing silver/white/aura dots against ink-navy
  const shaderProps = isLight
    ? {
        image: cloudsWallpaper,
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
        image: cloudsNight,
        colorBack: '#070B14',
        colorC: '#7DD3FC',
        colorM: '#AEB6C2',
        colorY: '#BEE6FF',
        colorK: '#FFFFFF',
        size: 0.2,
        gridNoise: 0.45,
        type: 'sharp' as const,
        softness: 0.4,
        contrast: 1.25,
        floodC: 0,
        floodM: 0,
        floodY: 0,
        floodK: 0,
        gainC: 0.25,
        gainM: 0.15,
        gainY: 0.15,
        gainK: 0.4,
        grainMixer: 0.1,
        grainOverlay: 0.08,
        grainSize: 0.5,
        scale: 1,
        fit: 'cover' as const,
        speed: 0,
      };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[880px] sm:h-[940px] md:h-[1020px] lg:h-[1120px] overflow-hidden pointer-events-none select-none z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0) 100%)',
      }}
    >
      {/* Halftone CMYK WebGL Canvas - 100% full visibility */}
      <div className="w-full h-full opacity-100">
        <HalftoneCmyk
          key={themeMode}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
          {...shaderProps}
        />
      </div>

      {/* Gentle center-left spotlight ensuring hero typography is crisp while flowers bloom on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 60% 45% at 38% 44%, rgba(255,250,240,0.5) 0%, rgba(255,250,240,0.15) 60%, transparent 100%)'
            : 'radial-gradient(ellipse 60% 45% at 38% 44%, rgba(7,11,20,0.6) 0%, rgba(7,11,20,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Smooth progressive dissolve overlay merging seamlessly into the base surface color at the preview terminal */}
      <div className="absolute inset-x-0 bottom-0 h-56 sm:h-64 md:h-80 bg-gradient-to-b from-transparent via-sf/60 to-sf pointer-events-none" />
    </div>
  );
};
