import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { DEFAULT_FALLBACK_PHOTO, formatBRL } from '../data/properties';
import type { Property } from '../types';
import { PropertyImage } from './PropertyImage';

interface PropertyCardProps {
  property: Property;
  index?: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenGallery: (id: string) => void;
  onSchedule: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  isFavorite,
  onToggleFavorite,
  onOpenGallery,
  onSchedule,
}) => {
  const photos = property.photos.length > 0 ? property.photos : [DEFAULT_FALLBACK_PHOTO];
  const [photoIdx, setPhotoIdx] = useState(0);
  const currentPhoto = photos[photoIdx % photos.length] || DEFAULT_FALLBACK_PHOTO;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -3 }}
      transition={{
        duration: 0.36,
        delay: (index % 3) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/95 backdrop-blur-xs border border-[#0B0A63]/15 rounded-xl overflow-hidden flex flex-col transition-[box-shadow,border-color] duration-200 hover:shadow-lg hover:border-[#0B0A63]/35"
    >
      {/* Media frame: 180px height on cards with interactive photo switcher */}
      <div className="relative w-full h-[180px] bg-[#ddd] overflow-hidden group">
        <button
          type="button"
          onClick={() => onOpenGallery(property.id)}
          className="w-full h-full block cursor-pointer focus:outline-none"
          aria-label={`Abrir galeria de fotos de ${property.title}`}
        >
          <PropertyImage
            src={currentPhoto}
            alt={`${property.title} em ${property.neighborhood}`}
            className="h-[180px] transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        {/* Bottom gradient scrim for photo count legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0B0A63]/80 via-black/30 to-transparent" />

        {/* Dynamic quick photo arrows on hover */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              aria-label="Foto anterior do imóvel"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B0A63]/70 hover:bg-[#0B0A63] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              aria-label="Próxima foto do imóvel"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B0A63]/70 hover:bg-[#0B0A63] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Interactive photo dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1">
            {photos.slice(0, 6).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIdx(idx);
                }}
                aria-label={`Ver foto ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === photoIdx ? 'w-4 bg-[#E88B44]' : 'w-1.5 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo count & area unobtrusive text */}
        <span className="pointer-events-none absolute bottom-2 left-3 text-[11px] font-medium text-white/95 tabular-nums">
          {photoIdx + 1}/{photos.length} fotos · {property.areaPrivativa} m²
        </span>

        {/* Distinct pulsing "Novo" label for recent listings */}
        {property.isNew && (
          <motion.span
            animate={{ scale: [1, 1.07, 1], opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-2.5 left-2.5 inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold tracking-wide shadow-md ring-2 ring-emerald-300/60"
          >
            Novo
          </motion.span>
        )}

        {/* Favorite heart button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          aria-pressed={isFavorite}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#E06D22] text-[#E06D22]' : 'text-[#0B0A63]'
            }`}
          />
        </motion.button>
      </div>

      {/* Centered slim content */}
      <div className="p-4 flex-1 flex flex-col items-center text-center justify-between gap-3">
        <div className="w-full">
          {/* Unboxed metadata with typographic separators */}
          <p className="text-[11px] font-semibold text-[#0B0A63]/70 tracking-wide mb-1 truncate">
            {property.tier} Padrão <span aria-hidden="true">·</span> {property.type}{' '}
            <span aria-hidden="true">·</span> {property.neighborhood}
          </p>

          <h3 className="font-display text-lg font-bold text-[#0B0A63] leading-snug line-clamp-1 mb-1">
            {property.title}
          </h3>

          <p className="text-lg font-bold text-[#E06D22] tabular-nums mb-1.5">
            {formatBRL(property.price)}
          </p>

          <p className="text-xs text-zinc-600 tabular-nums">
            {property.bedrooms} {property.bedrooms === 1 ? 'quarto' : 'quartos'}{' '}
            <span aria-hidden="true">·</span> {property.bathrooms}{' '}
            {property.bathrooms === 1 ? 'banheiro' : 'banheiros'}{' '}
            <span aria-hidden="true">·</span> {property.parking}{' '}
            {property.parking === 1 ? 'vaga' : 'vagas'}
          </p>

          <p className="text-[11px] text-zinc-500 tabular-nums mt-0.5">
            Área privativa {property.areaPrivativa}m² <span aria-hidden="true">/</span> Total{' '}
            {property.areaTotal}m²
          </p>
        </div>

        {/* Slim 38px action buttons */}
        <div className="w-full grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpenGallery(property.id)}
            className="h-[38px] px-3 rounded-lg border border-[#0B0A63]/20 bg-white hover:bg-[#0B0A63] text-[#0B0A63] hover:text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver fotos</span>
          </button>

          <button
            type="button"
            onClick={() => onSchedule(property.id)}
            className="h-[38px] px-3 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar visita</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
