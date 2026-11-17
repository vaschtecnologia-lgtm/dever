export type PropertyTier = 'Alto' | 'Médio' | 'Baixo';

export type PropertyType = 'Casa' | 'Apartamento' | 'Kitnet' | 'Cobertura';

export type QuickFilter =
  | 'todos'
  | 'Alto'
  | 'Médio'
  | 'Baixo'
  | 'Kitnet'
  | 'Casa'
  | 'Apartamento'
  | 'favoritos';

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'area-desc';

export interface Property {
  id: string;
  title: string;
  tier: PropertyTier;
  type: PropertyType;
  neighborhood: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  areaPrivativa: number;
  areaTotal: number;
  description: string;
  photos: string[];
  isNew?: boolean;
}

export interface FilterState {
  quick: QuickFilter;
  search: string;
  type: string;
  bedrooms: string;
  neighborhood: string;
  maxPrice: string;
  minArea: string;
  sort: SortOption;
}
