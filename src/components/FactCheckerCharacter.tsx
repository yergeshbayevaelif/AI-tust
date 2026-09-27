import React from 'react';

export type CharacterAction = 'reading' | 'searching' | 'comparing_sources' | 'comparing_cards' | 'completed' | 'idle';

interface FactCheckerCharacterProps {
  action?: CharacterAction;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const FactCheckerCharacter: React.FC<FactCheckerCharacterProps> = ({
  action = 'idle',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    hero: 'w-56 h-56 sm:w-64 sm:h-64',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Background Soft Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/15 to-indigo-500/20 blur-xl animate-pulse" />

      {/* SVG Character */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="50" y1="40" x2="150" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#0284c7" />
            <stop offset="1" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="coatGrad" x1="60" y1="90" x2="140" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8fafc" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="coatGradDark" x1="60" y1="90" x2="140" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#a5f3fc" stopOpacity="0.8" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="lensRing" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- SHADOW AT FEET --- */}
        <ellipse cx="100" cy="182" rx="42" ry="7" fill="#0f172a" fillOpacity="0.12" />

        {/* --- MAIN TORSO / RESEARCHER COAT --- */}
        <g className="transition-transform duration-300">
          {/* Base Body / Coat */}
          <path
            d="M68 116 C66 98 80 88 100 88 C120 88 134 98 132 116 L136 166 C136 172 130 176 124 176 L76 176 C70 176 64 172 64 166 Z"
            fill="url(#coatGrad)"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Coat Lapels & Inspector Collar */}
          <path
            d="M86 88 L96 125 L100 125 L104 125 L114 88"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          {/* Tie or Inspector Badge */}
          <polygon points="97,100 103,100 101,114 99,114" fill="#0284c7" />
          <circle cx="100" cy="98" r="2.5" fill="#38bdf8" />

          {/* Research Pocket with Pens */}
          <rect x="74" y="130" width="16" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="78" y1="126" x2="78" y2="132" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="83" y1="124" x2="83" y2="132" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- HEAD --- */}
        <g className="transition-transform duration-300 origin-center">
          {/* Head Sphere */}
          <circle
            cx="100"
            cy="62"
            r="32"
            fill="url(#bodyGrad)"
            stroke="#0284c7"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Researcher / Sleuth Beret or Cap */}
          <path
            d="M66 54 C66 36 82 26 100 26 C118 26 134 36 134 54 C134 56 132 58 128 58 L72 58 C68 58 66 56 66 54 Z"
            fill="#0369a1"
            stroke="#075985"
            strokeWidth="2"
          />
          <path
            d="M62 58 C80 54 120 54 138 58 C140 59 138 62 134 62 L66 62 C62 62 60 59 62 58 Z"
            fill="#0284c7"
          />
          {/* Cap Badge / Shield emblem */}
          <circle cx="100" cy="42" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M98 42 L100 44 L103 40" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Visor / Smart Spectacles */}
          <rect
            x="76"
            y="54"
            width="48"
            height="16"
            rx="6"
            fill="url(#glassGrad)"
            stroke="#0369a1"
            strokeWidth="2"
          />
          <line x1="100" y1="58" x2="100" y2="66" stroke="#0369a1" strokeWidth="2" />

          {/* Curious Friendly Eyes */}
          <circle cx="88" cy="62" r="4" fill="#0f172a" />
          <circle cx="89.5" cy="60.5" r="1.5" fill="#ffffff" />
          <circle cx="112" cy="62" r="4" fill="#0f172a" />
          <circle cx="113.5" cy="60.5" r="1.5" fill="#ffffff" />

          {/* Small confident detective smile */}
          <path
            d="M95 72 Q100 76 105 72"
            stroke="#0369a1"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- DYNAMIC HANDS & PROPS PER ACTION --- */}

        {/* 1. READING ACTION: Holds a clipboard / report document */}
        {action === 'reading' && (
          <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
            {/* Left Hand holding board */}
            <circle cx="68" cy="128" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Clipboard */}
            <g transform="translate(76, 102) rotate(-5)">
              <rect x="0" y="0" width="46" height="58" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" filter="url(#shadow)" />
              <rect x="14" y="-4" width="18" height="8" rx="2" fill="#64748b" />
              {/* Document lines */}
              <line x1="8" y1="14" x2="38" y2="14" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="22" x2="32" y2="22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="30" x2="36" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="38" x2="26" y2="38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              {/* Checkmark stamp */}
              <circle cx="32" cy="44" r="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
              <path d="M29 44 L31 46 L35 42" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Right Hand pointing */}
            <circle cx="128" cy="124" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}

        {/* 2. SEARCHING ACTION: Holding glowing Magnifying Glass examining sources */}
        {action === 'searching' && (
          <g>
            {/* Document on left */}
            <rect x="42" y="112" width="34" height="42" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(-12 42 112)" filter="url(#shadow)" />
            <line x1="48" y1="124" x2="68" y2="120" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="47" y1="132" x2="65" y2="128" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

            {/* Magnifying Glass held in hand */}
            <g className="origin-center" style={{ transformOrigin: '120px 110px' }}>
              {/* Handle */}
              <line x1="126" y1="128" x2="152" y2="154" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
              <line x1="126" y1="128" x2="134" y2="136" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
              {/* Glass Lens */}
              <circle cx="112" cy="114" r="22" fill="#38bdf8" fillOpacity="0.25" stroke="url(#lensRing)" strokeWidth="4" filter="url(#shadow)" />
              {/* Lens Glare */}
              <path d="M100 104 C104 98 114 96 122 100" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
              {/* Target Claim Sparkle inside lens */}
              <circle cx="112" cy="114" r="3" fill="#38bdf8" />
              <path d="M112 107 L112 121 M105 114 L119 114" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Hands */}
            <circle cx="70" cy="130" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="132" cy="134" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}

        {/* 3. COMPARING SOURCES ACTION: Looking between multiple open source papers */}
        {action === 'comparing_sources' && (
          <g>
            {/* Source Paper 1 (Left - Academic green check) */}
            <g transform="translate(28, 96) rotate(-10)">
              <rect x="0" y="0" width="36" height="46" rx="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" filter="url(#shadow)" />
              <rect x="4" y="4" width="16" height="5" rx="1" fill="#ecfdf5" />
              <text x="6" y="8" fontSize="4" fill="#047857" fontWeight="bold">PUBMED</text>
              <line x1="4" y1="15" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4" y1="21" x2="26" y2="21" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="28" cy="36" r="4" fill="#10b981" />
              <path d="M26 36 L27.5 37.5 L30 35" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Source Paper 2 (Right - Registry archive) */}
            <g transform="translate(136, 96) rotate(10)">
              <rect x="0" y="0" width="36" height="46" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2" filter="url(#shadow)" />
              <rect x="4" y="4" width="16" height="5" rx="1" fill="#e0f2fe" />
              <text x="6" y="8" fontSize="4" fill="#0369a1" fontWeight="bold">ARCHIVE</text>
              <line x1="4" y1="15" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4" y1="21" x2="28" y2="21" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="28" cy="36" r="4" fill="#0284c7" />
              <path d="M26 36 L27.5 37.5 L30 35" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Connecting comparison beam */}
            <path d="M64 116 Q100 134 136 116" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.8" />

            {/* Hands juggling the sources */}
            <circle cx="62" cy="130" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="138" cy="130" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}

        {/* 4. COMPARING CARDS: Comparing two floating claim cards */}
        {action === 'comparing_cards' && (
          <g>
            {/* Card Left: Green Check */}
            <g transform="translate(36, 100) rotate(-6)">
              <rect x="0" y="0" width="38" height="48" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" filter="url(#shadow)" />
              <circle cx="10" cy="10" r="4" fill="#10b981" />
              <path d="M8 10 L9.5 11.5 L12 9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              <text x="17" y="11" fontSize="4.5" fill="#065f46" fontWeight="bold">CLAIM 01</text>
              <line x1="6" y1="20" x2="32" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="26" x2="28" y2="26" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="32" x2="30" y2="32" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="6" y="38" width="26" height="5" rx="2" fill="#d1fae5" />
              <text x="8" y="42" fontSize="3.5" fill="#047857" fontWeight="bold">VERIFIED</text>
            </g>

            {/* Card Right: Red Alert Cross */}
            <g transform="translate(126, 100) rotate(6)">
              <rect x="0" y="0" width="38" height="48" rx="4" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" filter="url(#shadow)" />
              <circle cx="10" cy="10" r="4" fill="#f43f5e" />
              <path d="M8 8 L12 12 M12 8 L8 12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              <text x="17" y="11" fontSize="4.5" fill="#881337" fontWeight="bold">CLAIM 02</text>
              <line x1="6" y1="20" x2="32" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="26" x2="24" y2="26" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="32" x2="28" y2="32" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="6" y="38" width="26" height="5" rx="2" fill="#ffe4e6" />
              <text x="8" y="42" fontSize="3.5" fill="#b91c1c" fontWeight="bold">REFUTED</text>
            </g>

            {/* Inspector Hands */}
            <circle cx="68" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="132" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}

        {/* 5. COMPLETED ACTION: Holding Golden Shield / Certified Trust Report */}
        {action === 'completed' && (
          <g>
            {/* Proud Shield / Trust Badge in center */}
            <g transform="translate(76, 105)" filter="url(#shadow)">
              {/* Certified Shield */}
              <path
                d="M24 0 C38 0 48 8 48 22 C48 38 24 50 24 50 C24 50 0 38 0 22 C0 8 10 0 24 0 Z"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              <path
                d="M24 4 C34 4 43 11 43 22 C43 35 24 45 24 45 C24 45 5 35 5 22 C5 11 14 4 24 4 Z"
                fill="#f0f9ff"
              />
              {/* Checkmark in shield */}
              <circle cx="24" cy="22" r="12" fill="#10b981" />
              <path d="M19 22 L22.5 25.5 L29 18.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="11" y="40" fontSize="5" fill="#0284c7" fontWeight="bold">AI TRUST</text>
            </g>

            {/* Confident hands holding up shield */}
            <circle cx="74" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="126" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />

            {/* Sparkles / Celebration Stars */}
            <path d="M50 82 L52 86 L56 88 L52 90 L50 94 L48 90 L44 88 L48 86 Z" fill="#f59e0b" />
            <path d="M150 78 L152 82 L156 84 L152 86 L150 90 L148 86 L144 84 L148 82 Z" fill="#38bdf8" />
            <path d="M100 16 L102 20 L106 21 L102 22 L100 26 L98 22 L94 21 L98 20 Z" fill="#10b981" />
          </g>
        )}

        {/* 6. IDLE ACTION: Standing ready with notepad and magnifying glass tucked */}
        {action === 'idle' && (
          <g>
            {/* Magnifying glass in left hand */}
            <g transform="translate(56, 120) rotate(-25)">
              <line x1="8" y1="12" x2="20" y2="28" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <circle cx="8" cy="10" r="10" fill="#38bdf8" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2.5" />
            </g>
            <circle cx="68" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />

            {/* Notepad in right hand */}
            <g transform="translate(122, 118) rotate(12)">
              <rect x="0" y="0" width="22" height="30" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" filter="url(#shadow)" />
              <line x1="4" y1="6" x2="18" y2="6" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4" y1="11" x2="16" y2="11" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="16" x2="17" y2="16" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="21" x2="12" y2="21" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
            </g>
            <circle cx="132" cy="132" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
};
