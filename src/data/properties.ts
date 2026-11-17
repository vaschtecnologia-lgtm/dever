import type { Property } from '../types';

export const BROKER_NAME = 'Déver Resende';
export const BROKER_CRECI = 'CRECI-DF 30584';
export const BROKER_CITY = 'Taguatinga/DF';
export const WHATSAPP_NUMBER = '5561999738646';
export const WHATSAPP_DISPLAY = '(61) 99973-8646';

export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const;

export const PHOTO_MANSION = '/src/assets/images/prop_mansion_pool_1794924564023.jpg';
export const PHOTO_LIVING = '/src/assets/images/prop_living_luxury_1794924565788.jpg';
export const PHOTO_PENTHOUSE = '/src/assets/images/prop_penthouse_view_1794924565749.jpg';
export const PHOTO_HOUSE = '/src/assets/images/prop_modern_house_1794924567456.jpg';
export const PHOTO_APARTMENT = '/src/assets/images/prop_apartment_interior_1794924566588.jpg';
export const PHOTO_STUDIO = '/src/assets/images/prop_compact_studio_1794924567035.jpg';

export const DEFAULT_FALLBACK_PHOTO = PHOTO_HOUSE;

export const INITIAL_PROPERTIES: Property[] = [
  // ALTO PADRÃO (6)
  {
    id: '1',
    title: 'Mansão Lago Sul',
    tier: 'Alto',
    type: 'Casa',
    neighborhood: 'Lago Sul',
    city: 'Brasília/DF',
    price: 8900000,
    bedrooms: 5,
    bathrooms: 7,
    parking: 6,
    areaPrivativa: 780,
    areaTotal: 1200,
    description:
      'Residência contemporânea na SHIS com vão livre em concreto aparente, piscina aquecida com borda infinita, espaço gourmet integrado ao paisagismo e suíte máster com closet e hidromassagem.',
    isNew: true,
    photos: [
      PHOTO_MANSION,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_APARTMENT,
      PHOTO_HOUSE,
      PHOTO_STUDIO,
    ],
  },
  {
    id: '2',
    title: 'Casa Park Way',
    tier: 'Alto',
    type: 'Casa',
    neighborhood: 'Park Way',
    city: 'Brasília/DF',
    price: 5200000,
    bedrooms: 4,
    bathrooms: 6,
    parking: 5,
    areaPrivativa: 540,
    areaTotal: 2500,
    description:
      'Condomínio fechado em quadra nobre do Park Way, terreno amplo arborizado, projeto luminotécnico automatizado, cozinha ilha em pedra natural e área de lazer privativa.',
    photos: [
      PHOTO_HOUSE,
      PHOTO_LIVING,
      PHOTO_MANSION,
      PHOTO_PENTHOUSE,
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
    ],
  },
  {
    id: '3',
    title: 'Cobertura Noroeste',
    tier: 'Alto',
    type: 'Cobertura',
    neighborhood: 'Noroeste',
    city: 'Brasília/DF',
    price: 3800000,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    areaPrivativa: 340,
    areaTotal: 410,
    description:
      'Cobertura duplex com vista livre para o Parque Burle Marx, terraço gourmet privativo com churrasqueira e spa, elevador privativo e acabamento alto padrão.',
    isNew: true,
    photos: [
      PHOTO_PENTHOUSE,
      PHOTO_LIVING,
      PHOTO_APARTMENT,
      PHOTO_MANSION,
      PHOTO_HOUSE,
      PHOTO_STUDIO,
    ],
  },
  {
    id: '4',
    title: 'Apto Sudoeste',
    tier: 'Alto',
    type: 'Apartamento',
    neighborhood: 'Sudoeste',
    city: 'Brasília/DF',
    price: 2900000,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    areaPrivativa: 235,
    areaTotal: 290,
    description:
      'Apartamento vazado em superquadra do Sudoeste, 4 suítes plenas, varanda gourmet envidraçada, marcenaria planejada em freijó e prédio com lazer completo.',
    photos: [
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_HOUSE,
      PHOTO_MANSION,
      PHOTO_STUDIO,
    ],
  },
  {
    id: '5',
    title: 'Mansão Lago Norte',
    tier: 'Alto',
    type: 'Casa',
    neighborhood: 'Lago Norte',
    city: 'Brasília/DF',
    price: 7500000,
    bedrooms: 5,
    bathrooms: 6,
    parking: 6,
    areaPrivativa: 690,
    areaTotal: 1050,
    description:
      'Projeto arquitetônico exclusivo na Península do Lago Norte, pé-direito duplo, piscina revestida em pedra hijau, academia privativa e vista panorâmica.',
    photos: [
      PHOTO_MANSION,
      PHOTO_HOUSE,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
    ],
  },
  {
    id: '6',
    title: 'Casa Jardins Mangueiral',
    tier: 'Alto',
    type: 'Casa',
    neighborhood: 'Jardins Mangueiral',
    city: 'Brasília/DF',
    price: 4500000,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    areaPrivativa: 460,
    areaTotal: 800,
    description:
      'Sobrado de alto padrão em lote de ponta, fachada moderna em concreto e ripado amadeirado, energia fotovoltaica instalada e área gourmet completa.',
    photos: [
      PHOTO_HOUSE,
      PHOTO_MANSION,
      PHOTO_LIVING,
      PHOTO_APARTMENT,
      PHOTO_PENTHOUSE,
      PHOTO_STUDIO,
    ],
  },

  // MÉDIO PADRÃO (6)
  {
    id: '7',
    title: 'Apto Águas Claras',
    tier: 'Médio',
    type: 'Apartamento',
    neighborhood: 'Águas Claras',
    city: 'Brasília/DF',
    price: 680000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    areaPrivativa: 92,
    areaTotal: 120,
    description:
      'Localização privilegiada próximo ao metrô e Parque Ecológico de Águas Claras. 3 quartos com 1 suíte, armários planejados, varanda e lazer completo no condomínio.',
    isNew: true,
    photos: [
      PHOTO_APARTMENT,
      PHOTO_PENTHOUSE,
      PHOTO_LIVING,
      PHOTO_STUDIO,
      PHOTO_HOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '8',
    title: 'Casa Taguatinga',
    tier: 'Médio',
    type: 'Casa',
    neighborhood: 'Taguatinga Norte',
    city: 'Taguatinga/DF',
    price: 890000,
    bedrooms: 3,
    bathrooms: 3,
    parking: 3,
    areaPrivativa: 210,
    areaTotal: 300,
    description:
      'Casa reformada em excelente quadra residencial de Taguatinga Norte, sala ampla para dois ambientes, cozinha americana com ilha, churrasqueira e garagem coberta.',
    photos: [
      PHOTO_HOUSE,
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_STUDIO,
      PHOTO_MANSION,
    ],
  },
  {
    id: '9',
    title: 'Apto Guará',
    tier: 'Médio',
    type: 'Apartamento',
    neighborhood: 'Guará II',
    city: 'Brasília/DF',
    price: 520000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaPrivativa: 72,
    areaTotal: 94,
    description:
      'Apartamento andar alto nascente no Guará II, 2 quartos sendo 1 suíte, cozinha planejada, piso em porcelanato e fácil acesso à EPTG e comércio local.',
    photos: [
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_STUDIO,
      PHOTO_PENTHOUSE,
      PHOTO_HOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '10',
    title: 'Casa Vicente Pires',
    tier: 'Médio',
    type: 'Casa',
    neighborhood: 'Vicente Pires',
    city: 'Brasília/DF',
    price: 750000,
    bedrooms: 3,
    bathrooms: 3,
    parking: 3,
    areaPrivativa: 185,
    areaTotal: 400,
    description:
      'Casa térrea em rua tranquila de Vicente Pires, lote de 400m², 3 quartos com suíte e closet, área gourmet coberta e excelente padrão de acabamento.',
    isNew: true,
    photos: [
      PHOTO_HOUSE,
      PHOTO_LIVING,
      PHOTO_APARTMENT,
      PHOTO_PENTHOUSE,
      PHOTO_STUDIO,
      PHOTO_MANSION,
    ],
  },
  {
    id: '11',
    title: 'Kitnet Asa Sul',
    tier: 'Médio',
    type: 'Kitnet',
    neighborhood: 'Asa Sul',
    city: 'Brasília/DF',
    price: 320000,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    areaPrivativa: 34,
    areaTotal: 42,
    description:
      'Kitnet totalmente mobiliada e reformada na Asa Sul, projeto inteligente com divisória em marcenaria, ar-condicionado e vaga de garagem coberta. Ideal para renda ou moradia.',
    photos: [
      PHOTO_STUDIO,
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_HOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '12',
    title: 'Apto Samambaia',
    tier: 'Médio',
    type: 'Apartamento',
    neighborhood: 'Samambaia Norte',
    city: 'Brasília/DF',
    price: 380000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaPrivativa: 64,
    areaTotal: 80,
    description:
      'Apartamento moderno próximo à estação do metrô em Samambaia, varanda espaçosa, cozinha americana equipada, condomínio fechado com portaria 24h e área de lazer.',
    photos: [
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
      PHOTO_LIVING,
      PHOTO_HOUSE,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },

  // BAIXO PADRÃO / ECONÔMICO (6)
  {
    id: '13',
    title: 'Kitnet Ceilândia',
    tier: 'Baixo',
    type: 'Kitnet',
    neighborhood: 'Ceilândia Centro',
    city: 'Brasília/DF',
    price: 165000,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    areaPrivativa: 28,
    areaTotal: 34,
    description:
      'Kitnet bem localizada no centro de Ceilândia, próxima ao metrô e comércio, pintura nova, cozinha funcional com bancada em granito e ótimo custo-benefício.',
    photos: [
      PHOTO_STUDIO,
      PHOTO_APARTMENT,
      PHOTO_HOUSE,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '14',
    title: 'Apto Recanto',
    tier: 'Baixo',
    type: 'Apartamento',
    neighborhood: 'Recanto das Emas',
    city: 'Brasília/DF',
    price: 210000,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    areaPrivativa: 52,
    areaTotal: 62,
    description:
      'Apartamento de 2 quartos no Recanto das Emas, aceita financiamento habitacional e FGTS, vaga de garagem vinculada, condomínio organizado e próximo a escolas.',
    photos: [
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
      PHOTO_HOUSE,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '15',
    title: 'Casa Riacho Fundo',
    tier: 'Baixo',
    type: 'Casa',
    neighborhood: 'Riacho Fundo I',
    city: 'Brasília/DF',
    price: 280000,
    bedrooms: 2,
    bathrooms: 1,
    parking: 2,
    areaPrivativa: 88,
    areaTotal: 150,
    description:
      'Casa aconchegante no Riacho Fundo I, sala ampla, dois dormitórios bem ventilados, quintal privativo nos fundos e garagem para dois veículos.',
    photos: [
      PHOTO_HOUSE,
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '16',
    title: 'Kitnet Taguatinga',
    tier: 'Baixo',
    type: 'Kitnet',
    neighborhood: 'Taguatinga Centro',
    city: 'Taguatinga/DF',
    price: 195000,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    areaPrivativa: 30,
    areaTotal: 36,
    description:
      'Excelente oportunidade no coração de Taguatinga Centro, próximo ao metrô Praça do Relógio, ideal para estudantes ou investidores com alta liquidez de locação.',
    photos: [
      PHOTO_STUDIO,
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_HOUSE,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '17',
    title: 'Apto Santa Maria',
    tier: 'Baixo',
    type: 'Apartamento',
    neighborhood: 'Santa Maria',
    city: 'Brasília/DF',
    price: 235000,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    areaPrivativa: 56,
    areaTotal: 68,
    description:
      'Apartamento pronto para morar em Santa Maria, 2 dormitórios, cozinha com área de serviço separada, condomínio fechado com playground e vaga demarcada.',
    photos: [
      PHOTO_APARTMENT,
      PHOTO_STUDIO,
      PHOTO_LIVING,
      PHOTO_HOUSE,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
  {
    id: '18',
    title: 'Casa Ceilândia Sul',
    tier: 'Baixo',
    type: 'Casa',
    neighborhood: 'Ceilândia Sul',
    city: 'Brasília/DF',
    price: 250000,
    bedrooms: 2,
    bathrooms: 1,
    parking: 2,
    areaPrivativa: 78,
    areaTotal: 140,
    description:
      'Casa térrea na Ceilândia Sul próxima à estação do metrô, 2 quartos, sala iluminada, cozinha ampla, portão eletrônico e documentação regularizada.',
    photos: [
      PHOTO_HOUSE,
      PHOTO_STUDIO,
      PHOTO_APARTMENT,
      PHOTO_LIVING,
      PHOTO_PENTHOUSE,
      PHOTO_MANSION,
    ],
  },
];

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDateBR(iso: string): string {
  if (!iso || !iso.includes('-')) return iso;
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
