import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const WatermarkBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 1400], [0, -60]);
  const scale = useTransform(scrollY, [0, 1400], [1, 1.04]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Atmospheric bluish architectural backdrop wash matching #0B0A63 royal navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 28%, rgba(209, 224, 250, 0.78) 0%, rgba(233, 241, 253, 0.65) 52%, rgba(244, 247, 252, 0.96) 100%)',
        }}
      />

      {/* Dynamic bluish modern luxury house watermark */}
      <motion.div
        style={{ y: translateY, scale }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <svg
          className="w-[125%] max-w-[1440px] h-auto opacity-[0.16]"
          viewBox="0 0 1200 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="houseBlueFill" x1="200" y1="180" x2="1000" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B0A63" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#1D4ED8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="glassBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0B0A63" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="poolBlue" x1="200" y1="560" x2="960" y2="660" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0B0A63" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          {/* Horizon & architectural ground deck */}
          <path d="M70 555H1130" stroke="#0B0A63" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M130 572H1070" stroke="#2563EB" strokeWidth="1.2" strokeDasharray="6 6" />

          {/* Main upper cantilevered volume */}
          <path
            d="M170 305L565 185L945 278V385H170V305Z"
            fill="url(#houseBlueFill)"
            stroke="#0B0A63"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M125 312L565 172L995 276"
            stroke="#0B0A63"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M150 326L565 194L972 292"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Lower living pavilion */}
          <rect
            x="235"
            y="385"
            width="575"
            height="170"
            fill="url(#houseBlueFill)"
            stroke="#0B0A63"
            strokeWidth="2.4"
          />

          {/* Right gourmet & garage wing */}
          <rect
            x="810"
            y="350"
            width="235"
            height="205"
            fill="url(#houseBlueFill)"
            stroke="#0B0A63"
            strokeWidth="2.2"
          />
          <path d="M790 350H1072" stroke="#0B0A63" strokeWidth="3.6" strokeLinecap="round" />

          {/* Upper floor panoramic glass suites */}
          <rect x="245" y="295" width="230" height="72" fill="url(#glassBlue)" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="322" y1="295" x2="322" y2="367" stroke="#1E3A8A" strokeWidth="1.4" />
          <line x1="398" y1="295" x2="398" y2="367" stroke="#1E3A8A" strokeWidth="1.4" />

          <rect x="530" y="270" width="335" height="97" fill="url(#glassBlue)" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="640" y1="270" x2="640" y2="367" stroke="#1E3A8A" strokeWidth="1.4" />
          <line x1="755" y1="270" x2="755" y2="367" stroke="#1E3A8A" strokeWidth="1.4" />

          <line x1="230" y1="378" x2="880" y2="378" stroke="#0284C7" strokeWidth="2" />

          {/* Ground floor curtain windows & entrance */}
          <rect x="275" y="408" width="215" height="147" fill="url(#glassBlue)" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="346" y1="408" x2="346" y2="555" stroke="#1E3A8A" strokeWidth="1.4" />
          <line x1="418" y1="408" x2="418" y2="555" stroke="#1E3A8A" strokeWidth="1.4" />
          <line x1="295" y1="535" x2="335" y2="430" stroke="#93C5FD" strokeWidth="1.6" />
          <line x1="575" y1="535" x2="635" y2="425" stroke="#93C5FD" strokeWidth="1.6" />

          <rect x="515" y="415" width="76" height="140" fill="#0B0A63" fillOpacity="0.18" stroke="#0B0A63" strokeWidth="2" />
          <line x1="553" y1="415" x2="553" y2="555" stroke="#0B0A63" strokeWidth="1.4" />

          <rect x="615" y="408" width="165" height="147" fill="url(#glassBlue)" stroke="#1E3A8A" strokeWidth="1.8" />
          <line x1="697" y1="408" x2="697" y2="555" stroke="#1E3A8A" strokeWidth="1.4" />

          <rect x="845" y="412" width="165" height="143" fill="#0B0A63" fillOpacity="0.1" stroke="#0B0A63" strokeWidth="1.8" />
          <line x1="845" y1="440" x2="1010" y2="440" stroke="#2563EB" strokeWidth="1.2" />
          <line x1="845" y1="468" x2="1010" y2="468" stroke="#2563EB" strokeWidth="1.2" />
          <line x1="845" y1="496" x2="1010" y2="496" stroke="#2563EB" strokeWidth="1.2" />
          <line x1="845" y1="524" x2="1010" y2="524" stroke="#2563EB" strokeWidth="1.2" />

          {/* Foreground infinity swimming pool reflection */}
          <path
            d="M190 555H765L715 655H140L190 555Z"
            fill="url(#poolBlue)"
            stroke="#0284C7"
            strokeWidth="1.8"
          />
          <line x1="220" y1="585" x2="690" y2="585" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="18 10" />
          <line x1="195" y1="615" x2="640" y2="615" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="24 14" />

          {/* Minimalist landscaping & palm silhouettes */}
          <path d="M135 555V420" stroke="#0B0A63" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M135 420C115 395 85 395 65 408" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M135 420C155 392 185 395 205 410" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M135 420C125 385 108 370 92 368" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M135 420C148 385 168 372 186 372" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />

          <path d="M1085 555V445" stroke="#0B0A63" strokeWidth="2" strokeLinecap="round" />
          <circle cx="1085" cy="422" r="34" fill="#3B82F6" fillOpacity="0.1" stroke="#1D4ED8" strokeWidth="1.6" />
          <circle cx="1055" cy="442" r="24" fill="#3B82F6" fillOpacity="0.08" stroke="#1D4ED8" strokeWidth="1.4" />

          <circle cx="980" cy="155" r="46" stroke="#2563EB" strokeWidth="1.4" strokeDasharray="5 7" />
          <circle cx="980" cy="155" r="24" fill="#60A5FA" fillOpacity="0.14" />
        </svg>
      </motion.div>
    </div>
  );
};
