import React from 'react';
import { Heart, RotateCcw, Search } from 'lucide-react';
import type { FilterState, Property, QuickFilter, SortOption } from '../types';

interface FilterBarProps {
  properties: Property[];
  favoritesCount: number;
  filters: FilterState;
  filteredCount: number;
  onUpdateFilters: (patch: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  properties,
  favoritesCount,
  filters,
  filteredCount,
  onUpdateFilters,
  onResetFilters,
}) => {
  const counts = {
    todos: properties.length,
    Alto: properties.filter((p) => p.tier === 'Alto').length,
    Médio: properties.filter((p) => p.tier === 'Médio').length,
    Baixo: properties.filter((p) => p.tier === 'Baixo').length,
    Kitnet: properties.filter((p) => p.type === 'Kitnet').length,
    Casa: properties.filter((p) => p.type === 'Casa').length,
    Apartamento: properties.filter((p) => p.type === 'Apartamento').length,
  };

  const neighborhoods = Array.from(new Set(properties.map((p) => p.neighborhood))).sort(
    (a, b) => a.localeCompare(b, 'pt-BR')
  );

  const quickButtons: { key: QuickFilter; label: string; isFav?: boolean }[] = [
    { key: 'todos', label: `Todos (${counts.todos})` },
    { key: 'Alto', label: `Alto (${counts.Alto})` },
    { key: 'Médio', label: `Médio (${counts.Médio})` },
    { key: 'Baixo', label: `Baixo (${counts.Baixo})` },
    { key: 'Kitnet', label: `Kitnets (${counts.Kitnet})` },
    { key: 'Casa', label: `Casas (${counts.Casa})` },
    { key: 'Apartamento', label: `Apartamentos (${counts.Apartamento})` },
    { key: 'favoritos', label: `Favoritos (${favoritesCount})`, isFav: true },
  ];

  const hasActiveFilters =
    filters.quick !== 'todos' ||
    filters.search !== '' ||
    filters.type !== 'todos' ||
    filters.bedrooms !== 'todos' ||
    filters.neighborhood !== 'todos' ||
    filters.maxPrice !== 'todos' ||
    filters.minArea !== 'todos' ||
    filters.sort !== 'featured';

  return (
    <section
      id="catalogo"
      className="relative z-10 max-w-[1120px] mx-auto px-4 pt-6 pb-4"
      aria-label="Busca e filtros de imóveis"
    >
      <div className="bg-white/95 backdrop-blur-xs border border-[#0B0A63]/15 rounded-xl p-4 sm:p-5 shadow-xs">
        {/* Quick segmented filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 pb-3 border-b border-blue-100/80">
          {quickButtons.map((btn) => {
            const active = filters.quick === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => onUpdateFilters({ quick: btn.key })}
                className={`inline-flex items-center justify-center gap-1.5 h-[36px] px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#0B0A63] text-white'
                    : 'bg-[#EEF3FA] text-[#0B0A63] hover:bg-[#DFE8F7]'
                }`}
              >
                {btn.isFav && (
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      active ? 'fill-[#E88B44] text-[#E88B44]' : 'text-[#E06D22]'
                    }`}
                  />
                )}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Refined search grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Text search */}
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="w-4 h-4 text-[#0B0A63]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onUpdateFilters({ search: e.target.value })}
              placeholder="Buscar por bairro, título ou característica..."
              aria-label="Buscar imóveis por texto"
              className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:bg-white focus:border-[#E06D22]"
            />
          </div>

          {/* Tipo */}
          <select
            value={filters.type}
            onChange={(e) => onUpdateFilters({ type: e.target.value })}
            aria-label="Filtrar por tipo de imóvel"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="todos">Tipo: Todos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Kitnet">Kitnet</option>
            <option value="Cobertura">Cobertura</option>
          </select>

          {/* Bairro */}
          <select
            value={filters.neighborhood}
            onChange={(e) => onUpdateFilters({ neighborhood: e.target.value })}
            aria-label="Filtrar por bairro"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="todos">Bairro: Todos</option>
            {neighborhoods.map((nb) => (
              <option key={nb} value={nb}>
                {nb}
              </option>
            ))}
          </select>

          {/* Quartos */}
          <select
            value={filters.bedrooms}
            onChange={(e) => onUpdateFilters({ bedrooms: e.target.value })}
            aria-label="Filtrar por número de quartos"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="todos">Quartos: Qualquer</option>
            <option value="1">1+ quarto</option>
            <option value="2">2+ quartos</option>
            <option value="3">3+ quartos</option>
            <option value="4">4+ quartos</option>
          </select>

          {/* Preço */}
          <select
            value={filters.maxPrice}
            onChange={(e) => onUpdateFilters({ maxPrice: e.target.value })}
            aria-label="Filtrar por faixa de preço"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="todos">Preço: Qualquer faixa</option>
            <option value="250000">Até R$ 250.000</option>
            <option value="500000">Até R$ 500.000</option>
            <option value="1000000">Até R$ 1.000.000</option>
            <option value="5000000">Até R$ 5.000.000</option>
            <option value="above-5m">Acima de R$ 5.000.000</option>
          </select>

          {/* Área */}
          <select
            value={filters.minArea}
            onChange={(e) => onUpdateFilters({ minArea: e.target.value })}
            aria-label="Filtrar por área privativa mínima"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="todos">Área: Qualquer metragem</option>
            <option value="30">30+ m² privativos</option>
            <option value="60">60+ m² privativos</option>
            <option value="120">120+ m² privativos</option>
            <option value="250">250+ m² privativos</option>
            <option value="400">400+ m² privativos</option>
          </select>

          {/* Ordenação */}
          <select
            value={filters.sort}
            onChange={(e) => onUpdateFilters({ sort: e.target.value as SortOption })}
            aria-label="Ordenar imóveis"
            className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-[#E06D22]"
          >
            <option value="featured">Ordenar: Destaques</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="area-desc">Maior área</option>
          </select>
        </div>

        {/* Summary and reset */}
        <div className="mt-3 pt-2.5 border-t border-blue-100/80 flex flex-wrap items-center justify-center sm:justify-between gap-2 text-xs text-zinc-600">
          <span className="tabular-nums">
            Exibindo <strong className="text-[#0B0A63]">{filteredCount}</strong> de{' '}
            <strong className="text-[#0B0A63]">{properties.length}</strong> imóveis disponíveis
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[#E06D22] hover:text-[#C85A14] font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
