import React from 'react';
import { ArrowDown, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BROKER_CITY,
  BROKER_CRECI,
  BROKER_NAME,
  WHATSAPP_DISPLAY,
} from '../data/properties';
import { LOGO_URL } from './Header';

interface HeroProps {
  totalCount: number;
  onQuickNeighborhood: (neighborhood: string) => void;
}

const FEATURED_NEIGHBORHOODS = [
  'Lago Sul',
  'Park Way',
  'Noroeste',
  'Águas Claras',
  'Taguatinga Norte',
  'Vicente Pires',
];

export const Hero: React.FC<HeroProps> = ({ totalCount, onQuickNeighborhood }) => {
  return (
    <section
      id="topo"
      className="relative z-10 min-h-[300px] flex items-center justify-center border-b border-[#1D1B8A] bg-[#0B0A63]"
    >
      {/* Subtle bluish architectural glow inside hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 80% at 50% 45%, rgba(37, 99, 235, 0.22) 0%, rgba(11, 10, 99, 0.96) 72%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[1120px] mx-auto w-full px-4 py-6 text-center flex flex-col items-center justify-center"
      >
        {/* Official attached brand logo enlarged and cleanly cropped to remove right-side white bar */}
        <div className="mb-2 w-full flex justify-center">
          <img
            src={LOGO_URL}
            alt={`${BROKER_NAME} — Corretor e Perito Avaliador de Imóveis`}
            style={{ clipPath: 'inset(0 3% 0 0)' }}
            className="h-[142px] sm:h-[184px] w-auto mx-auto object-contain select-none"
          />
        </div>

        <p className="text-xs sm:text-sm font-semibold text-[#FAC7A4] tracking-wide mb-2">
          {BROKER_CRECI} <span aria-hidden="true">·</span> {BROKER_CITY}{' '}
          <span aria-hidden="true">·</span> WhatsApp{' '}
          <span className="tabular-nums text-white">{WHATSAPP_DISPLAY}</span>
        </p>

        <h1
          className="font-display font-bold text-white tracking-tight leading-tight max-w-2xl mb-2.5"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.35rem)',
            textWrap: 'balance',
          }}
        >
          Imóveis Selecionados em Brasília e Taguatinga
        </h1>

        <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl leading-relaxed mb-4">
          Curadoria exclusiva com{' '}
          <strong className="text-white tabular-nums">{totalCount} imóveis</strong> de alto, médio
          e econômico padrão no Distrito Federal.
        </p>

        {/* Quick interactive neighborhood jump links */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-2xl">
          {FEATURED_NEIGHBORHOODS.map((nb) => (
            <button
              key={nb}
              type="button"
              onClick={() => onQuickNeighborhood(nb)}
              className="inline-flex items-center gap-1 h-[30px] px-2.5 rounded-md bg-white/10 hover:bg-[#E06D22] border border-white/20 hover:border-[#E06D22] text-xs font-medium text-blue-50 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <MapPin className="w-3 h-3 text-[#FAC7A4]" />
              <span>{nb}</span>
            </button>
          ))}
        </div>

        <a
          href="#catalogo"
          className="inline-flex items-center justify-center gap-2 h-[38px] px-6 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md whitespace-nowrap shrink-0"
        >
          <span>Explorar imóveis</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};
