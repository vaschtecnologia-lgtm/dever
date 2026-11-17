import React, { useState } from 'react';
import { Heart, Lock, Menu, MessageCircle, X } from 'lucide-react';
import { BROKER_NAME, WHATSAPP_NUMBER } from '../data/properties';

interface HeaderProps {
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesView: () => void;
  onOpenAdmin: () => void;
}

export const LOGO_URL = '/assets/aistudio/LOGO_DEVER_1f760976.jpeg';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'h-11 w-auto' }) => (
  <img
    src={LOGO_URL}
    alt={`${BROKER_NAME} — Corretor e Perito Avaliador de Imóveis`}
    style={{ clipPath: 'inset(0 3% 0 0)' }}
    className={`object-contain select-none ${className}`}
  />
);

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesView,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappDirectUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    'Olá Déver Resende, gostaria de atendimento sobre imóveis no Distrito Federal.'
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[58px] bg-[#0B0A63]/95 backdrop-blur-sm border-b border-[#1D1B8A]">
      <div className="max-w-[1120px] mx-auto h-full px-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand mark com logomarca oficial Déver Resende maior e sem traço lateral */}
        <a
          href="#topo"
          className="flex items-center gap-2 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E88B44] rounded"
        >
          <BrandLogo className="h-[46px] w-auto shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            {BROKER_NAME}
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100"
        >
          <a
            href="#catalogo"
            className="hover:text-[#FAC7A4] transition-colors whitespace-nowrap shrink-0"
          >
            Imóveis
          </a>
          <button
            type="button"
            onClick={onToggleFavoritesView}
            className={`inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showFavoritesOnly
                ? 'text-[#FAC7A4] font-semibold'
                : 'hover:text-[#FAC7A4]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                showFavoritesOnly ? 'fill-[#E88B44] text-[#E88B44]' : 'text-[#E88B44]'
              }`}
            />
            <span>Favoritos ({favoritesCount})</span>
          </button>
          <a
            href="#contato"
            className="hover:text-[#FAC7A4] transition-colors whitespace-nowrap shrink-0"
          >
            Informações
          </a>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 hover:text-[#FAC7A4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 text-white hover:bg-white/10"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0A63] border-b border-[#1D1B8A] px-4 py-3 shadow-lg">
          <div className="max-w-[1120px] mx-auto flex flex-col gap-2 text-sm font-medium text-blue-100">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded hover:bg-white/10 text-center"
            >
              Imóveis
            </a>
            <button
              type="button"
              onClick={() => {
                onToggleFavoritesView();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-2 rounded hover:bg-white/10 flex items-center justify-center gap-1.5"
            >
              <Heart
                className={`w-4 h-4 ${
                  showFavoritesOnly ? 'fill-[#E88B44] text-[#E88B44]' : 'text-[#E88B44]'
                }`}
              />
              <span>Favoritos ({favoritesCount})</span>
            </button>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded hover:bg-white/10 text-center"
            >
              Informações
            </a>
            <button
              type="button"
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-2 rounded hover:bg-white/10 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>Painel Admin</span>
            </button>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-lg bg-[#E06D22] text-white text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
