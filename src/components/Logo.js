import React from 'react';

/**
 * The BlogFoundry mark: a nib/droplet silhouette that reads two ways at once —
 * a pen nib (writing) and a cast droplet of molten type (a foundry casts letters).
 */
export const LogoMark = ({ size = 40, className = '' }) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 shadow-lg shadow-primary-900/30 ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      viewBox="0 0 32 32"
      width={size * 0.56}
      height={size * 0.56}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 30C10.2 23.8 5 17.9 5 11.6 5 6.3 10 2 16 2s11 4.3 11 9.6c0 6.3-5.2 12.2-11 18.4Z"
        fill="white"
      />
      <path
        d="M16 8.5V23"
        stroke="url(#bf-nib-gradient)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <defs>
        <linearGradient id="bf-nib-gradient" x1="16" y1="8.5" x2="16" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#581A8C" />
          <stop offset="1" stopColor="#8420D6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Logo = ({ size = 40, showWordmark = true, wordmarkClassName = '', className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <LogoMark size={size} />
    {showWordmark && (
      <span className={`font-serif tracking-tight ${wordmarkClassName}`}>
        <span className="font-semibold">Blog</span>
        <span className="font-normal italic">Foundry</span>
      </span>
    )}
  </div>
);

export default Logo;
