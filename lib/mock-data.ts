// =============================================================================
// UNDER CODE - DTOs e Mock Data (preparado para Nest.js)
// =============================================================================

// =============================================================================
// Interfaces TypeScript (simulando DTOs do Nest.js)
// =============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'admin';
  plan: 'free' | 'pro' | 'enterprise';
  discordId?: string;
  totalSpent: number;
  totalPurchases: number;
  createdAt: string;
  updatedAt: string;
}

export interface Script {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  framework: 'QBox' | 'QBCore' | 'Standalone';
  category: ScriptCategory;
  status: 'published' | 'draft' | 'archived';
  imageUrl: string;
  galleryUrls: string[];
  features: string[];
  requirements: string[];
  version: string;
  changelog: ChangelogEntry[];
  rating: number;
  reviewCount: number;
  downloads: number;
  sales: number;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export type ScriptCategory = 
  | 'vehicles' 
  | 'economy' 
  | 'jobs' 
  | 'crime' 
  | 'housing' 
  | 'ui' 
  | 'admin' 
  | 'misc';

export interface Transaction {
  id: string;
  userId: string;
  user?: User;
  scriptId: string;
  script?: Script;
  amount: number;
  currency: 'BRL';
  paymentMethod: 'pix' | 'credit_card' | 'debit_card';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentGateway: 'stripe' | 'mercadopago';
  gatewayTransactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface UserScript {
  id: string;
  userId: string;
  scriptId: string;
  script: Script;
  transactionId: string;
  licenseKey: string;
  status: 'active' | 'suspended' | 'expired';
  downloadCount: number;
  lastDownloadAt?: string;
  expiresAt?: string;
  purchasedAt: string;
}

export interface Analytics {
  mrr: number;
  mrrGrowth: number;
  arr: number;
  totalRevenue: number;
  totalCustomers: number;
  activeCustomers: number;
  churnRate: number;
  conversionRate: number;
  averageOrderValue: number;
  totalDownloads: number;
  topSellingScripts: { scriptId: string; script: Script; sales: number; revenue: number }[];
  revenueByMonth: { month: string; revenue: number; sales: number }[];
  customersByPlan: { plan: string; count: number }[];
}

// =============================================================================
// Categorias
// =============================================================================

export const scriptCategories: { value: ScriptCategory; label: string; icon: string }[] = [
  { value: 'vehicles', label: 'Veiculos', icon: 'Car' },
  { value: 'economy', label: 'Economia', icon: 'Coins' },
  { value: 'jobs', label: 'Trabalhos', icon: 'Briefcase' },
  { value: 'crime', label: 'Crime', icon: 'Skull' },
  { value: 'housing', label: 'Imoveis', icon: 'Home' },
  { value: 'ui', label: 'Interface', icon: 'Layout' },
  { value: 'admin', label: 'Admin', icon: 'Shield' },
  { value: 'misc', label: 'Diversos', icon: 'Package' },
];

// =============================================================================
// Mock Data - Scripts
// =============================================================================

export const mockScripts: Script[] = [
  {
    id: 'scr_001',
    name: 'UC Garage Pro',
    slug: 'uc-garage-pro',
    description: 'Sistema de garagem premium com interface moderna, suporte a multiplos veiculos e spawn personalizado.',
    longDescription: 'O UC Garage Pro e a solucao definitiva para gerenciamento de veiculos no seu servidor. Com uma interface elegante e intuitiva, seus jogadores poderao organizar seus veiculos por categoria, visualizar estatisticas detalhadas e customizar pontos de spawn. Inclui sistema anti-duplicacao, logs completos e integracao nativa com ox_inventory.',
    price: 149.90,
    originalPrice: 199.90,
    framework: 'QBox',
    category: 'vehicles',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Garage+Pro',
    galleryUrls: [],
    features: [
      'Interface moderna com animacoes fluidas',
      'Suporte a multiplas garagens por jogador',
      'Sistema de spawn customizado',
      'Integracao com ox_inventory',
      'Logs detalhados de acoes',
      'Sistema anti-duplicacao',
      'Otimizado (0.01ms idle)',
    ],
    requirements: ['qbx_core', 'ox_lib', 'ox_inventory'],
    version: '2.4.1',
    changelog: [
      { version: '2.4.1', date: '2024-03-15', changes: ['Fix: Corrigido bug de spawn em garagens VIP', 'Melhoria de performance'] },
      { version: '2.4.0', date: '2024-03-01', changes: ['Novo: Sistema de favoritos', 'Novo: Filtro por categoria'] },
    ],
    rating: 4.9,
    reviewCount: 127,
    downloads: 1834,
    sales: 412,
    isFeatured: true,
    isNew: false,
    tags: ['garagem', 'veiculos', 'spawn', 'premium'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'scr_002',
    name: 'UC Banking System',
    slug: 'uc-banking-system',
    description: 'Sistema bancario completo com PIX, transferencias, emprestimos, cartoes e investimentos.',
    longDescription: 'Transforme a economia do seu servidor com o UC Banking System. Sistema completo que simula um banco real brasileiro com PIX instantaneo, transferencias TED/DOC, cartoes de credito com limite dinamico, emprestimos com juros configuraves e um modulo de investimentos. Interface inspirada nos maiores bancos digitais.',
    price: 399.90,
    framework: 'QBox',
    category: 'economy',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Banking',
    galleryUrls: [],
    features: [
      'PIX instantaneo entre jogadores',
      'Transferencias TED/DOC',
      'Cartoes de credito com limite',
      'Sistema de emprestimos',
      'Modulo de investimentos',
      'Extrato detalhado',
      'App mobile in-game',
    ],
    requirements: ['qbx_core', 'ox_lib', 'oxmysql'],
    version: '3.2.0',
    changelog: [
      { version: '3.2.0', date: '2024-03-18', changes: ['Novo: Modulo de investimentos', 'Novo: Notificacoes push'] },
    ],
    rating: 4.8,
    reviewCount: 89,
    downloads: 2156,
    sales: 523,
    isFeatured: true,
    isNew: false,
    tags: ['banco', 'economia', 'pix', 'financeiro'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-03-18T00:00:00Z',
  },
  {
    id: 'scr_003',
    name: 'UC Jobs Manager',
    slug: 'uc-jobs-manager',
    description: 'Gerencie empresas completas com funcionarios, cargos, salarios automaticos e dashboard.',
    longDescription: 'O UC Jobs Manager e o sistema mais completo para gestao de empresas e trabalhos. Permite criar hierarquias de cargos, definir salarios, gerenciar funcionarios e acompanhar metricas de desempenho. Inclui dashboard administrativo para donos de empresa e integracao com sistema de economia.',
    price: 299.90,
    framework: 'QBCore',
    category: 'jobs',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Jobs',
    galleryUrls: [],
    features: [
      'Criacao de empresas ilimitadas',
      'Sistema de cargos hierarquico',
      'Folha de pagamento automatica',
      'Dashboard para gestores',
      'Sistema de bonus e comissoes',
      'Logs de atividades',
    ],
    requirements: ['qb-core', 'oxmysql'],
    version: '1.8.2',
    changelog: [
      { version: '1.8.2', date: '2024-03-12', changes: ['Fix: Corrigido calculo de comissoes', 'Melhoria no dashboard'] },
    ],
    rating: 4.7,
    reviewCount: 156,
    downloads: 1678,
    sales: 387,
    isFeatured: false,
    isNew: false,
    tags: ['empresas', 'trabalhos', 'gestao', 'economia'],
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: 'scr_004',
    name: 'UC Inventory',
    slug: 'uc-inventory',
    description: 'Inventario premium com drag & drop, sistema de peso, hotbar e visual moderno.',
    longDescription: 'Inventario completamente redesenhado com foco em UX. Sistema de drag & drop fluido, organizacao por categorias, busca rapida, hotbar personalizavel e muito mais. Visual inspirado em jogos AAA com animacoes suaves e feedback visual.',
    price: 199.90,
    framework: 'QBCore',
    category: 'ui',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Inventory',
    galleryUrls: [],
    features: [
      'Drag & drop com animacoes',
      'Sistema de peso configuravel',
      'Categorias de itens',
      'Busca rapida',
      'Hotbar customizavel',
      'Temas personalizaveis',
    ],
    requirements: ['qb-core', 'ox_lib'],
    version: '2.5.0',
    changelog: [
      { version: '2.5.0', date: '2024-03-20', changes: ['Novo: Sistema de temas', 'Novo: Animacoes de transferencia'] },
    ],
    rating: 4.9,
    reviewCount: 234,
    downloads: 3421,
    sales: 892,
    isFeatured: true,
    isNew: true,
    tags: ['inventario', 'ui', 'hud', 'interface'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'scr_005',
    name: 'UC Housing',
    slug: 'uc-housing',
    description: 'Sistema de imoveis com decoracao livre, stash integrado e garagem privativa.',
    longDescription: 'Sistema completo de housing que permite aos jogadores comprar, alugar e decorar imoveis. Inclui sistema de decoracao com centenas de objetos, stash integrado por comodo, garagem privativa e sistema de visitas. Perfeito para servidores de roleplay.',
    price: 449.90,
    framework: 'QBox',
    category: 'housing',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Housing',
    galleryUrls: [],
    features: [
      'Compra e aluguel de imoveis',
      'Decoracao livre com 500+ objetos',
      'Stash por comodo',
      'Garagem integrada',
      'Sistema de visitas',
      'Compartilhamento de chaves',
    ],
    requirements: ['qbx_core', 'ox_lib', 'ox_inventory', 'ox_target'],
    version: '1.9.0',
    changelog: [
      { version: '1.9.0', date: '2024-03-22', changes: ['Novo: 150 novos objetos de decoracao', 'Fix: Persistencia de moveis'] },
    ],
    rating: 4.6,
    reviewCount: 98,
    downloads: 1245,
    sales: 312,
    isFeatured: false,
    isNew: true,
    tags: ['casas', 'imoveis', 'decoracao', 'housing'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-22T00:00:00Z',
  },
  {
    id: 'scr_006',
    name: 'UC Police MDT',
    slug: 'uc-police-mdt',
    description: 'MDT completo para policia com fichas criminais, mandados, BOLO e radio integrado.',
    longDescription: 'O MDT mais completo para forcas policiais. Inclui sistema de fichas criminais detalhadas, mandados de busca e prisao, sistema BOLO para veiculos e pessoas, integracao com radio, GPS de viaturas e muito mais. Interface profissional inspirada em sistemas reais.',
    price: 349.90,
    framework: 'QBCore',
    category: 'jobs',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Police+MDT',
    galleryUrls: [],
    features: [
      'Fichas criminais detalhadas',
      'Sistema de mandados',
      'BOLO de veiculos e pessoas',
      'GPS de viaturas em tempo real',
      'Integracao com radio',
      'Relatorios de ocorrencia',
    ],
    requirements: ['qb-core', 'oxmysql', 'pma-voice'],
    version: '2.1.5',
    changelog: [
      { version: '2.1.5', date: '2024-03-10', changes: ['Novo: Mapa com GPS das viaturas', 'Fix: Sync de mandados'] },
    ],
    rating: 4.8,
    reviewCount: 167,
    downloads: 2034,
    sales: 467,
    isFeatured: false,
    isNew: false,
    tags: ['policia', 'mdt', 'trabalhos', 'rp'],
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'scr_007',
    name: 'UC Drugs System',
    slug: 'uc-drugs-system',
    description: 'Sistema completo de drogas com crafting, laboratorios, rotas de venda e adicao.',
    longDescription: 'Sistema de drogas totalmente imersivo. Inclui processo completo de producao com crafting de ingredientes, laboratorios com mini-games, rotas de venda dinamicas com NPCs e sistema de adicao realista. Balanceado para economia e roleplay.',
    price: 279.90,
    framework: 'QBCore',
    category: 'crime',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Drugs',
    galleryUrls: [],
    features: [
      'Crafting de drogas realista',
      'Laboratorios com mini-games',
      'Rotas de venda dinamicas',
      'Sistema de adicao',
      'Efeitos visuais imersivos',
      'Integracao com policia',
    ],
    requirements: ['qb-core', 'ox_lib', 'ox_inventory'],
    version: '1.4.0',
    changelog: [
      { version: '1.4.0', date: '2024-03-16', changes: ['Novo: 3 novas drogas', 'Novo: Sistema de overdose'] },
    ],
    rating: 4.7,
    reviewCount: 143,
    downloads: 1876,
    sales: 534,
    isFeatured: false,
    isNew: false,
    tags: ['drogas', 'crime', 'crafting', 'ilegal'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-16T00:00:00Z',
  },
  {
    id: 'scr_008',
    name: 'UC Admin Panel',
    slug: 'uc-admin-panel',
    description: 'Painel administrativo completo com gestao de jogadores, logs, bans e estatisticas.',
    longDescription: 'Painel administrativo web completo para seu servidor. Gerencie jogadores, visualize logs em tempo real, aplique punicoes, acompanhe estatisticas do servidor e muito mais. Interface moderna com graficos e relatorios detalhados.',
    price: 499.90,
    framework: 'Standalone',
    category: 'admin',
    status: 'published',
    imageUrl: '/placeholder.svg?height=400&width=600&text=UC+Admin',
    galleryUrls: [],
    features: [
      'Dashboard com estatisticas',
      'Gestao de jogadores',
      'Sistema de bans e warns',
      'Logs em tempo real',
      'Relatorios automaticos',
      'API REST completa',
    ],
    requirements: ['oxmysql'],
    version: '1.2.0',
    changelog: [
      { version: '1.2.0', date: '2024-03-08', changes: ['Novo: Dashboard redesenhado', 'Novo: Exportacao de relatorios'] },
    ],
    rating: 4.9,
    reviewCount: 78,
    downloads: 934,
    sales: 245,
    isFeatured: true,
    isNew: false,
    tags: ['admin', 'painel', 'gestao', 'logs'],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z',
  },
];

// =============================================================================
// Mock Data - Usuario Atual
// =============================================================================

export const mockCurrentUser: User = {
  id: 'usr_001',
  name: 'Rafael Mendes',
  email: 'rafael@servidor.com',
  avatar: '/placeholder.svg?height=100&width=100&text=RM',
  role: 'client',
  plan: 'pro',
  discordId: 'rafael#1234',
  totalSpent: 1249.60,
  totalPurchases: 5,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-03-20T00:00:00Z',
};

export const mockAdminUser: User = {
  id: 'usr_admin',
  name: 'Lucas Admin',
  email: 'admin@undercode.com.br',
  avatar: '/placeholder.svg?height=100&width=100&text=LA',
  role: 'admin',
  plan: 'enterprise',
  totalSpent: 0,
  totalPurchases: 0,
  createdAt: '2023-06-15T00:00:00Z',
  updatedAt: '2024-03-20T00:00:00Z',
};

// =============================================================================
// Mock Data - Scripts do Usuario
// =============================================================================

export const mockUserScripts: UserScript[] = [
  {
    id: 'usc_001',
    userId: 'usr_001',
    scriptId: 'scr_001',
    script: mockScripts[0],
    transactionId: 'txn_001',
    licenseKey: 'UC-XXXX-XXXX-XXXX-0001',
    status: 'active',
    downloadCount: 3,
    lastDownloadAt: '2024-03-18T14:30:00Z',
    purchasedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'usc_002',
    userId: 'usr_001',
    scriptId: 'scr_002',
    script: mockScripts[1],
    transactionId: 'txn_002',
    licenseKey: 'UC-XXXX-XXXX-XXXX-0002',
    status: 'active',
    downloadCount: 1,
    lastDownloadAt: '2024-03-10T09:15:00Z',
    purchasedAt: '2024-03-01T16:45:00Z',
  },
  {
    id: 'usc_003',
    userId: 'usr_001',
    scriptId: 'scr_004',
    script: mockScripts[3],
    transactionId: 'txn_003',
    licenseKey: 'UC-XXXX-XXXX-XXXX-0003',
    status: 'active',
    downloadCount: 5,
    lastDownloadAt: '2024-03-20T11:00:00Z',
    purchasedAt: '2024-01-20T08:30:00Z',
  },
  {
    id: 'usc_004',
    userId: 'usr_001',
    scriptId: 'scr_006',
    script: mockScripts[5],
    transactionId: 'txn_004',
    licenseKey: 'UC-XXXX-XXXX-XXXX-0004',
    status: 'active',
    downloadCount: 2,
    lastDownloadAt: '2024-03-05T15:20:00Z',
    purchasedAt: '2024-02-28T12:00:00Z',
  },
  {
    id: 'usc_005',
    userId: 'usr_001',
    scriptId: 'scr_007',
    script: mockScripts[6],
    transactionId: 'txn_005',
    licenseKey: 'UC-XXXX-XXXX-XXXX-0005',
    status: 'suspended',
    downloadCount: 1,
    purchasedAt: '2024-03-15T19:00:00Z',
  },
];

// =============================================================================
// Mock Data - Analytics (Admin)
// =============================================================================

export const mockAnalytics: Analytics = {
  mrr: 47890.50,
  mrrGrowth: 12.5,
  arr: 574686.00,
  totalRevenue: 892456.80,
  totalCustomers: 2341,
  activeCustomers: 1876,
  churnRate: 2.3,
  conversionRate: 8.7,
  averageOrderValue: 287.45,
  totalDownloads: 15678,
  topSellingScripts: [
    { scriptId: 'scr_004', script: mockScripts[3], sales: 892, revenue: 178421.08 },
    { scriptId: 'scr_007', script: mockScripts[6], sales: 534, revenue: 149446.60 },
    { scriptId: 'scr_002', script: mockScripts[1], sales: 523, revenue: 209067.70 },
    { scriptId: 'scr_006', script: mockScripts[5], sales: 467, revenue: 163221.30 },
    { scriptId: 'scr_001', script: mockScripts[0], sales: 412, revenue: 61738.80 },
  ],
  revenueByMonth: [
    { month: 'Out', revenue: 34567.80, sales: 142 },
    { month: 'Nov', revenue: 38942.30, sales: 167 },
    { month: 'Dez', revenue: 45678.90, sales: 198 },
    { month: 'Jan', revenue: 41234.50, sales: 178 },
    { month: 'Fev', revenue: 43890.20, sales: 189 },
    { month: 'Mar', revenue: 47890.50, sales: 213 },
  ],
  customersByPlan: [
    { plan: 'Free', count: 1234 },
    { plan: 'Pro', count: 876 },
    { plan: 'Enterprise', count: 231 },
  ],
};

// =============================================================================
// Mock Data - Transacoes Recentes (Admin)
// =============================================================================

export const mockRecentTransactions: Transaction[] = [
  {
    id: 'txn_r001',
    userId: 'usr_101',
    user: { id: 'usr_101', name: 'Pedro Santos', email: 'pedro@email.com', role: 'client', plan: 'pro', totalSpent: 599.80, totalPurchases: 2, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-03-20T00:00:00Z' },
    scriptId: 'scr_002',
    script: mockScripts[1],
    amount: 399.90,
    currency: 'BRL',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    paymentGateway: 'mercadopago',
    createdAt: '2024-03-20T14:30:00Z',
    completedAt: '2024-03-20T14:30:05Z',
  },
  {
    id: 'txn_r002',
    userId: 'usr_102',
    user: { id: 'usr_102', name: 'Ana Julia', email: 'ana@email.com', role: 'client', plan: 'free', totalSpent: 149.90, totalPurchases: 1, createdAt: '2024-03-15T00:00:00Z', updatedAt: '2024-03-20T00:00:00Z' },
    scriptId: 'scr_001',
    script: mockScripts[0],
    amount: 149.90,
    currency: 'BRL',
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentGateway: 'stripe',
    createdAt: '2024-03-20T12:15:00Z',
    completedAt: '2024-03-20T12:15:03Z',
  },
  {
    id: 'txn_r003',
    userId: 'usr_103',
    user: { id: 'usr_103', name: 'Carlos Oliveira', email: 'carlos@email.com', role: 'client', plan: 'pro', totalSpent: 1049.70, totalPurchases: 4, createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-03-20T00:00:00Z' },
    scriptId: 'scr_005',
    script: mockScripts[4],
    amount: 449.90,
    currency: 'BRL',
    paymentMethod: 'pix',
    paymentStatus: 'pending',
    paymentGateway: 'mercadopago',
    createdAt: '2024-03-20T11:00:00Z',
  },
];

// =============================================================================
// Helpers
// =============================================================================

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

export function getCategoryLabel(category: ScriptCategory): string {
  return scriptCategories.find(c => c.value === category)?.label || category;
}

// =============================================================================
// Export para compatibilidade
// =============================================================================

export type Product = Script;
export const mockProducts = mockScripts;
