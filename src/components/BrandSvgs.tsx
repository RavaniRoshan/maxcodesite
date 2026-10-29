import React from 'react';

export const MaxMascotSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-1 -1 14 15"
    role="img"
    aria-label="Max, the maxcode mascot"
    shapeRendering="crispEdges"
    className={className}
  >
    <style>{`
      .max-mascot-eye {
        transform-box: fill-box;
        transform-origin: center;
        animation: maxMascotBlink 4.2s infinite;
      }
      .max-mascot-tick {
        animation: maxMascotBob 1.9s steps(2, end) infinite;
      }
      @keyframes maxMascotBlink {
        0%, 92%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.12); }
      }
      @keyframes maxMascotBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-0.45px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .max-mascot-eye, .max-mascot-tick { animation: none; }
      }
    `}</style>

    {/* Ground shadow */}
    <rect x="2" y="12.3" width="8" height="0.5" fill="#181310" opacity="0.22" />

    {/* Floating pass-gate tick crown (bobbing) - Warm Golden Amber */}
    <g className="max-mascot-tick">
      <rect x="4" y="2" width="1" height="1" fill="#F59E0B" />
      <rect x="5" y="2" width="1" height="1" fill="#D97706" />
      <rect x="6" y="1" width="1" height="1" fill="#F59E0B" />
      <rect x="7" y="0" width="1" height="1" fill="#FBBF24" />
    </g>

    {/* Body top highlight (Warm Apricot / Terracotta highlight) */}
    <rect x="3" y="4" width="6" height="1" fill="#FDBA74" />

    {/* Body main — chunky block cursor silhouette (Maxcode Terracotta / Red-Orange) */}
    <rect x="2" y="5" width="8" height="5" fill="#E26A2C" />
    <rect x="3" y="10" width="6" height="1" fill="#E26A2C" />

    {/* Right-side & bottom bevel shading (Deep Burnt Sienna) */}
    <rect x="9" y="5" width="1" height="5" fill="#B84318" />
    <rect x="8" y="10" width="1" height="1" fill="#B84318" />

    {/* Left-edge warm highlight */}
    <rect x="2" y="5" width="1" height="4" fill="#FB923C" />

    {/* Eyes — dark obsidian terminal cells that blink */}
    <rect className="max-mascot-eye" x="4" y="6" width="1" height="2" fill="#181310" />
    <rect className="max-mascot-eye" x="7" y="6" width="1" height="2" fill="#181310" />

    {/* Subtle confident pixel smile */}
    <rect x="5" y="9" width="2" height="0.75" fill="#181310" />

    {/* Little stubby feet */}
    <rect x="3" y="11" width="2" height="1" fill="#9A3412" />
    <rect x="7" y="11" width="2" height="1" fill="#9A3412" />
  </svg>
);

/**
 * Background layer of Max the mascot sitting behind the Hero CTA text,
 * visible between two words with wide outstretched buddy arms reaching behind the adjacent words.
 */
export const MaxBuddyBackSvg: React.FC<{ className?: string }> = ({ className = 'w-32 h-28' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-5 -1 22 15"
    role="img"
    aria-label="Max sitting behind the headline like a buddy"
    shapeRendering="crispEdges"
    className={className}
  >
    <style>{`
      .max-buddy-eye {
        transform-box: fill-box;
        transform-origin: center;
        animation: maxMascotBlink 4.2s infinite;
      }
      .max-buddy-tick {
        animation: maxMascotBob 1.9s steps(2, end) infinite;
      }
    `}</style>

    {/* Subtle warm ambient shadow behind body */}
    <rect x="1.5" y="12.3" width="9" height="0.6" fill="#181310" opacity="0.15" />

    {/* Floating pass-gate tick crown (bobbing) */}
    <g className="max-buddy-tick">
      <rect x="4" y="2" width="1" height="1" fill="#F59E0B" />
      <rect x="5" y="2" width="1" height="1" fill="#D97706" />
      <rect x="6" y="1" width="1" height="1" fill="#F59E0B" />
      <rect x="7" y="0" width="1" height="1" fill="#FBBF24" />
    </g>

    {/* Outstretched Left Arm (reaching behind the left word) */}
    <rect x="-2.2" y="6.2" width="4.2" height="0.8" fill="#FDBA74" />
    <rect x="-2.2" y="7" width="4.2" height="1.6" fill="#E26A2C" />
    <rect x="-2.2" y="8.6" width="4.2" height="0.7" fill="#B84318" />

    {/* Outstretched Right Arm (reaching behind the right word) */}
    <rect x="10" y="6.2" width="4.2" height="0.8" fill="#FDBA74" />
    <rect x="10" y="7" width="4.2" height="1.6" fill="#E26A2C" />
    <rect x="10" y="8.6" width="4.2" height="0.7" fill="#B84318" />

    {/* Body top highlight */}
    <rect x="3" y="4" width="6" height="1" fill="#FDBA74" />

    {/* Body main — chunky block cursor silhouette */}
    <rect x="2" y="5" width="8" height="5" fill="#E26A2C" />
    <rect x="3" y="10" width="6" height="1" fill="#E26A2C" />

    {/* Right-side & bottom bevel shading */}
    <rect x="9" y="5" width="1" height="5" fill="#B84318" />
    <rect x="8" y="10" width="1" height="1" fill="#B84318" />

    {/* Left-edge warm highlight */}
    <rect x="2" y="5" width="1" height="4" fill="#FB923C" />

    {/* Blinking terminal eyes */}
    <rect className="max-buddy-eye" x="4" y="6" width="1" height="2" fill="#181310" />
    <rect className="max-buddy-eye" x="7" y="6" width="1" height="2" fill="#181310" />

    {/* Happy buddy pixel smile */}
    <rect x="4.5" y="8.8" width="0.7" height="0.6" fill="#181310" />
    <rect x="5" y="9.2" width="2" height="0.75" fill="#181310" />
    <rect x="6.8" y="8.8" width="0.7" height="0.6" fill="#181310" />

    {/* Sitting stubby feet tucked onto the text baseline */}
    <rect x="3" y="11" width="2" height="1.2" fill="#9A3412" />
    <rect x="7" y="11" width="2" height="1.2" fill="#9A3412" />
  </svg>
);

/**
 * Foreground layer of Max's two pixel-art hands reaching forward in front of the CTA text
 * and gripping the top/side shoulder of the adjacent words like a buddy without obscuring the letters.
 */
export const MaxBuddyHandsSvg: React.FC<{ className?: string }> = ({ className = 'w-32 h-28' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-5 -1 22 15"
    aria-hidden="true"
    shapeRendering="crispEdges"
    className={className}
  >
    <style>{`
      .max-buddy-grip {
        animation: maxBuddyGrip 2.6s steps(2, end) infinite;
      }
      @keyframes maxBuddyGrip {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(0.25px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .max-buddy-grip { animation: none; }
      }
    `}</style>

    <g className="max-buddy-grip">
      {/* Left Hand gripping the top-right shoulder of "sessions" */}
      <rect x="-3.1" y="5.8" width="2.2" height="2.6" fill="#181310" opacity="0.24" />
      <rect x="-2.9" y="5.3" width="2" height="0.7" fill="#FDBA74" />
      <rect x="-2.9" y="6.0" width="2" height="1.5" fill="#E26A2C" />
      {/* Two little pixel fingers hooking down over the top edge of the word */}
      <rect x="-2.8" y="7.5" width="0.75" height="0.9" fill="#FB923C" />
      <rect x="-1.75" y="7.5" width="0.75" height="0.9" fill="#FB923C" />
      <rect x="-2.9" y="7.2" width="2" height="0.35" fill="#9A3412" />

      {/* Right Hand gripping the top-left shoulder of "with" */}
      <rect x="12.9" y="5.8" width="2.2" height="2.6" fill="#181310" opacity="0.24" />
      <rect x="12.9" y="5.3" width="2" height="0.7" fill="#FDBA74" />
      <rect x="12.9" y="6.0" width="2" height="1.5" fill="#E26A2C" />
      {/* Two little pixel fingers hooking down over the top edge of the word */}
      <rect x="13.0" y="7.5" width="0.75" height="0.9" fill="#FB923C" />
      <rect x="14.05" y="7.5" width="0.75" height="0.9" fill="#FB923C" />
      <rect x="12.9" y="7.2" width="2" height="0.35" fill="#9A3412" />
    </g>
  </svg>
);

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
