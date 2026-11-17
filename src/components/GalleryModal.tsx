import React, { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { DEFAULT_FALLBACK_PHOTO, formatBRL } from '../data/properties';
import type { Property } from '../types';
import { PropertyImage } from './PropertyImage';

interface GalleryModalProps {
  property: Property | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onSchedule: (id: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  property,
  isFavorite,
  onClose,
  onToggleFavorite,
  onSchedule,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [property?.id]);

  useEffect(() => {
    if (!property) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % Math.max(1, property.photos.length));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          (prev - 1 + Math.max(1, property.photos.length)) %
          Math.max(1, property.photos.length)
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [property, onClose]);

  if (!property) return null;

  const photos = property.photos.length > 0 ? property.photos : [DEFAULT_FALLBACK_PHOTO];
  const currentPhoto = photos[activeIndex] || photos[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#07063D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#0B0A63]/20 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar in brand royal navy */}
        <div className="px-4 py-3 bg-[#0B0A63] text-white flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-[#FAC7A4] truncate">
              {property.tier} Padrão · {property.type} · {property.neighborhood}, {property.city}
            </p>
            <h2
              id="gallery-modal-title"
              className="font-display text-lg font-bold text-white truncate"
            >
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(property.id)}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              className="w-9 h-9 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#E88B44] text-[#E88B44]' : 'text-white'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar galeria"
              className="w-9 h-9 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Main photo */}
          <div className="relative rounded-lg overflow-hidden bg-[#ddd]">
            <PropertyImage
              src={currentPhoto}
              alt={`${property.title} — Foto ${activeIndex + 1}`}
              className="h-[220px] sm:h-[340px]"
            />

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
                  }
                  aria-label="Foto anterior"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B0A63]/75 hover:bg-[#0B0A63] text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % photos.length)}
                  aria-label="Próxima foto"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B0A63]/75 hover:bg-[#0B0A63] text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <span className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded bg-[#0B0A63]/85 text-white text-xs font-medium tabular-nums">
              {activeIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Clickable thumbnails */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {photos.map((photo, index) => (
              <button
                key={`${photo}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Selecionar foto ${index + 1}`}
                className={`rounded-md overflow-hidden border-2 transition-opacity cursor-pointer ${
                  index === activeIndex
                    ? 'border-[#E06D22] opacity-100'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <PropertyImage
                  src={photo}
                  alt={`Miniatura ${index + 1}`}
                  className="h-[52px]"
                />
              </button>
            ))}
          </div>

          {/* Centered Property Info & Specs */}
          <div className="text-center space-y-3 pt-1">
            <p className="text-2xl font-bold text-[#E06D22] tabular-nums">
              {formatBRL(property.price)}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center border-y border-blue-100 py-3">
              <div>
                <p className="text-[11px] text-zinc-500">Área Privativa</p>
                <p className="text-sm font-semibold text-[#0B0A63] tabular-nums">
                  {property.areaPrivativa} m²
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500">Área Total</p>
                <p className="text-sm font-semibold text-[#0B0A63] tabular-nums">
                  {property.areaTotal} m²
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500">Dormitórios / Ban.</p>
                <p className="text-sm font-semibold text-[#0B0A63] tabular-nums">
                  {property.bedrooms} qts · {property.bathrooms} ban
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500">Garagem</p>
                <p className="text-sm font-semibold text-[#0B0A63] tabular-nums">
                  {property.parking} {property.parking === 1 ? 'vaga' : 'vagas'}
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              {property.description}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-3 border-t border-blue-100 bg-[#F4F7FC] flex flex-col sm:flex-row items-center justify-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              const targetId = property.id;
              onClose();
              onSchedule(targetId);
            }}
            className="w-full sm:w-auto h-[38px] px-6 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar visita deste imóvel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
