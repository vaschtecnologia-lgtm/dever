import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { AdminModal } from './components/AdminModal';
import { ContactSection } from './components/ContactSection';
import { FilterBar } from './components/FilterBar';
import { GalleryModal } from './components/GalleryModal';
import { BrandLogo, Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { ScheduleModal } from './components/ScheduleModal';
import { WatermarkBackground } from './components/WatermarkBackground';
import {
  BROKER_CITY,
  BROKER_CRECI,
  BROKER_NAME,
  INITIAL_PROPERTIES,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from './data/properties';
import type { FilterState, Property } from './types';

const STORAGE_KEYS = {
  properties: 'dever_resende_properties_v1',
  favorites: 'dever_resende_favorites_v1',
  adminPass: 'dever_resende_admin_pass_v1',
};

const DEFAULT_FILTERS: FilterState = {
  quick: 'todos',
  search: '',
  type: 'todos',
  bedrooms: 'todos',
  neighborhood: 'todos',
  maxPrice: 'todos',
  minArea: 'todos',
  sort: 'featured',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const stored = readStorage<Property[]>(STORAGE_KEYS.properties, INITIAL_PROPERTIES);
    const hasAnyNewFlag = stored.some((p) => typeof p.isNew === 'boolean');
    if (hasAnyNewFlag) return stored;
    const initialNewIds = new Set(
      INITIAL_PROPERTIES.filter((p) => p.isNew).map((p) => String(p.id))
    );
    return stored.map((p) =>
      initialNewIds.has(String(p.id)) ? { ...p, isNew: true } : p
    );
  });
  const [favorites, setFavorites] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.favorites, [])
  );
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.adminPass) || '1808';
    } catch {
      return '1808';
    }
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [galleryPropertyId, setGalleryPropertyId] = useState<string | null>(null);
  const [schedulePropertyId, setSchedulePropertyId] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    } catch {
      // Ignore storage quota errors
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favorites]);

  const handleUpdateFilters = (patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleToggleFavorite = (id: string) => {
    const sid = String(id);
    setFavorites((prev) =>
      prev.includes(sid) ? prev.filter((item) => item !== sid) : [...prev, sid]
    );
  };

  const handleToggleFavoritesView = () => {
    setFilters((prev) => ({
      ...prev,
      quick: prev.quick === 'favoritos' ? 'todos' : 'favoritos',
    }));
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickNeighborhood = (neighborhood: string) => {
    setFilters((prev) => ({
      ...DEFAULT_FILTERS,
      neighborhood: prev.neighborhood === neighborhood ? 'todos' : neighborhood,
    }));
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveProperty = (saved: Property) => {
    setProperties((prev) => {
      const exists = prev.some((x) => String(x.id) === String(saved.id));
      if (exists) {
        return prev.map((x) => (String(x.id) === String(saved.id) ? saved : x));
      }
      return [saved, ...prev];
    });
  };

  const handleDeleteProperty = (id: string) => {
    const sid = String(id);
    setProperties((prev) => prev.filter((x) => String(x.id) !== sid));
    setFavorites((prev) => prev.filter((favId) => favId !== sid));
  };

  const handleResetProperties = () => {
    setProperties(INITIAL_PROPERTIES);
    try {
      localStorage.removeItem(STORAGE_KEYS.properties);
    } catch {
      // Ignore
    }
  };

  const handleChangePassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem(STORAGE_KEYS.adminPass, newPass);
    } catch {
      // Ignore
    }
  };

  const filteredProperties = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const matched = properties.filter((prop) => {
      if (filters.quick === 'Alto' || filters.quick === 'Médio' || filters.quick === 'Baixo') {
        if (prop.tier !== filters.quick) return false;
      } else if (
        filters.quick === 'Kitnet' ||
        filters.quick === 'Casa' ||
        filters.quick === 'Apartamento'
      ) {
        if (prop.type !== filters.quick) return false;
      } else if (filters.quick === 'favoritos') {
        if (!favorites.includes(String(prop.id))) return false;
      }

      if (query) {
        const haystack =
          `${prop.title} ${prop.neighborhood} ${prop.city} ${prop.type} ${prop.tier} ${prop.description}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      if (filters.type !== 'todos' && prop.type !== filters.type) {
        return false;
      }

      if (filters.neighborhood !== 'todos' && prop.neighborhood !== filters.neighborhood) {
        return false;
      }

      if (filters.bedrooms !== 'todos') {
        const minBeds = Number(filters.bedrooms);
        if (prop.bedrooms < minBeds) return false;
      }

      if (filters.maxPrice !== 'todos') {
        if (filters.maxPrice === 'above-5m') {
          if (prop.price <= 5000000) return false;
        } else {
          const max = Number(filters.maxPrice);
          if (prop.price > max) return false;
        }
      }

      if (filters.minArea !== 'todos') {
        const minArea = Number(filters.minArea);
        if (prop.areaPrivativa < minArea) return false;
      }

      return true;
    });

    if (filters.sort === 'price-asc') {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (filters.sort === 'price-desc') {
      return [...matched].sort((a, b) => b.price - a.price);
    }
    if (filters.sort === 'area-desc') {
      return [...matched].sort((a, b) => b.areaPrivativa - a.areaPrivativa);
    }
    return matched;
  }, [properties, favorites, filters]);

  const galleryProperty = useMemo(
    () =>
      galleryPropertyId !== null
        ? properties.find((x) => String(x.id) === String(galleryPropertyId)) || null
        : null,
    [properties, galleryPropertyId]
  );

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col pt-[58px] relative bg-[#F4F8FD] text-zinc-900 overflow-x-hidden">
      <WatermarkBackground />

      <Header
        favoritesCount={favorites.length}
        showFavoritesOnly={filters.quick === 'favoritos'}
        onToggleFavoritesView={handleToggleFavoritesView}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main className="flex-1 relative z-10">
        <Hero
          totalCount={properties.length}
          onQuickNeighborhood={handleQuickNeighborhood}
        />

        <FilterBar
          properties={properties}
          favoritesCount={favorites.length}
          filters={filters}
          filteredCount={filteredProperties.length}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Catalog grid */}
        <section
          className="max-w-[1120px] mx-auto px-4 pb-6"
          aria-label="Lista de imóveis disponíveis"
        >
          {filteredProperties.length === 0 ? (
            <div className="bg-white/95 border border-[#0B0A63]/15 rounded-xl p-10 text-center space-y-3">
              <p className="font-display text-xl font-bold text-[#0B0A63]">
                Nenhum imóvel encontrado com os filtros atuais
              </p>
              <p className="text-sm text-zinc-600">
                {filters.quick === 'favoritos'
                  ? 'Clique no coração de qualquer imóvel para salvá-lo em seus favoritos.'
                  : 'Tente ampliar a faixa de preço, metragem ou limpar a busca.'}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-[38px] px-5 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Mostrar todos os imóveis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                    isFavorite={favorites.includes(String(property.id))}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenGallery={(id) => setGalleryPropertyId(String(id))}
                    onSchedule={(id) => setSchedulePropertyId(String(id))}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <ContactSection />
      </main>

      <footer className="relative z-10 border-t border-[#1D1B8A] bg-[#0B0A63] py-6 px-4 text-center">
        <div className="max-w-[1120px] mx-auto flex flex-col items-center gap-2">
          <BrandLogo className="h-24 sm:h-28 w-auto" />
          <p className="text-xs font-medium text-[#FAC7A4]">
            {BROKER_CRECI} · {BROKER_CITY} · WhatsApp{' '}
            <a
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-[#E88B44] tabular-nums"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </footer>

      <GalleryModal
        property={galleryProperty}
        isFavorite={
          galleryProperty ? favorites.includes(String(galleryProperty.id)) : false
        }
        onClose={() => setGalleryPropertyId(null)}
        onToggleFavorite={handleToggleFavorite}
        onSchedule={(id) => setSchedulePropertyId(String(id))}
      />

      <ScheduleModal
        propertyId={schedulePropertyId}
        properties={properties}
        onClose={() => setSchedulePropertyId(null)}
      />

      <AdminModal
        isOpen={adminOpen}
        properties={properties}
        adminPassword={adminPassword}
        onClose={() => setAdminOpen(false)}
        onSaveProperty={handleSaveProperty}
        onDeleteProperty={handleDeleteProperty}
        onResetProperties={handleResetProperties}
        onChangePassword={handleChangePassword}
      />
    </div>
    </MotionConfig>
  );
}
