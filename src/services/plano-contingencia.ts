/**
 * Plano de Contingência para Desastres Naturais - Rio Grande do Sul
 * Sistema integrado baseado no Plano Rio Grande
 */

// ==================== TIPOS E INTERFACES ====================

export interface PlanoRioGrande {
  id: string;
  nome: string;
  descricao: string;
  objetivo: string;
  fases: FasePlano[];
  componentes: ComponentePlano[];
  status: 'ativo' | 'em-planejamento' | 'concluido';
  dataInicio: Date;
  dataAtualizacao: Date;
}

export interface ComponentePlano {
  id: string;
  tipo: 'municipal' | 'estadual' | 'capacitacao' | 'mapeamento' | 'comunicacao';
  nome: string;
  descricao: string;
  responsavel: string;
  acoes: AcaoContingencia[];
  status: 'planejado' | 'em-andamento' | 'concluido';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
}

export interface PlanoMunicipal {
  id: string;
  municipio: string;
  codigoIBGE: string;
  tiposEmergencia: TipoEmergencia[];
  acoes: AcaoContingencia[];
  recursosDisponiveis: Recurso[];
  contatosEmergencia: ContatoEmergencia[];
  dataElaboracao: Date;
  dataRevisao: Date;
  status: 'vigente' | 'em-revisao' | 'desatualizado';
}

export interface TipoEmergencia {
  id: string;
  tipo: 'enchente' | 'deslizamento' | 'vendaval' | 'estiagem' | 'incendio' | 'outro';
  nome: string;
  descricao: string;
  nivelRisco: 'baixo' | 'moderado' | 'alto' | 'muito-alto';
  protocolos: Protocolo[];
}

export interface AcaoContingencia {
  id: string;
  fase: 'prevencao' | 'preparacao' | 'resposta' | 'recuperacao';
  categoria: 'socorro' | 'assistencia' | 'logistica' | 'reconstrucao' | 'financiamento';
  nome: string;
  descricao: string;
  responsaveis: string[];
  prazo: string;
  recursos: Recurso[];
  indicadores: Indicador[];
  status: 'pendente' | 'em-andamento' | 'concluida' | 'bloqueada' | 'planejado';
}

export interface Protocolo {
  id: string;
  nome: string;
  tipo: 'comunicacao' | 'evacuacao' | 'resgate' | 'atendimento' | 'distribuicao';
  etapas: EtapaProtocolo[];
  responsaveis: string[];
  tempoEstimado: string;
  condicoes: string[];
}

export interface EtapaProtocolo {
  ordem: number;
  descricao: string;
  responsavel: string;
  duracao: string;
  recursos: string[];
  pontoVerificacao: string;
}

export interface Recurso {
  id: string;
  tipo: 'humano' | 'material' | 'financeiro' | 'infraestrutura';
  nome: string;
  quantidade: number;
  unidade: string;
  localizacao?: string;
  disponibilidade: 'disponivel' | 'em-uso' | 'indisponivel';
  origem?: 'municipal' | 'estadual' | 'federal' | 'privado' | 'doacao';
}

export interface ContatoEmergencia {
  id: string;
  orgao: string;
  tipo: 'defesa-civil' | 'bombeiros' | 'saude' | 'policia' | 'voluntarios' | 'outro';
  responsavel: string;
  telefone: string;
  email: string;
  endereco?: string;
  disponibilidade: '24h' | 'comercial' | 'plantao';
}

export interface Indicador {
  id: string;
  nome: string;
  tipo: 'eficacia' | 'eficiencia' | 'tempo' | 'cobertura' | 'satisfacao';
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  dataAtualizacao: Date;
}

export interface MapaUnicoRS {
  id: string;
  nome: string;
  descricao: string;
  camadas: CamadaMapa[];
  areasAfetadas: AreaAfetada[];
  pontosPrioritarios: PontoPrioritario[];
  dataAtualizacao: Date;
}

export interface CamadaMapa {
  id: string;
  tipo: 'risco' | 'afetada' | 'recurso' | 'infraestrutura' | 'populacao';
  nome: string;
  visivel: boolean;
  opacidade: number;
  dados: Record<string, unknown>;
}

export interface AreaAfetada {
  id: string;
  municipio: string;
  bairro?: string;
  tipoDesastre: string;
  nivelImpacto: 'baixo' | 'moderado' | 'alto' | 'severo';
  populacaoAfetada: number;
  coordenadas: Coordenada[];
  dataOcorrencia: Date;
  status: 'ativo' | 'controlado' | 'recuperado';
}

export interface PontoPrioritario {
  id: string;
  tipo: 'abrigo' | 'hospital' | 'distribuicao' | 'resgate' | 'comando';
  nome: string;
  endereco: string;
  coordenada: Coordenada;
  capacidade?: number;
  ocupacaoAtual?: number;
  recursos: Recurso[];
  prioridade: number;
}

export interface Coordenada {
  latitude: number;
  longitude: number;
}

export interface FasePlano {
  id: string;
  nome: string;
  fase: 'fase1-emergencial' | 'fase2-transicao' | 'fase3-reconstrucao' | 'fase4-resiliencia';
  descricao: string;
  prazo: string;
  orcamento?: number;
  acoes: AcaoContingencia[];
  status: 'planejado' | 'em-andamento' | 'concluido';
}

// ==================== DADOS DO PLANO RIO GRANDE ====================

export const PLANO_RIO_GRANDE: PlanoRioGrande = {
  id: 'prg-2024',
  nome: 'Plano Rio Grande',
  descricao: 'Programa estadual de reconstrução, adaptação e resiliência do Rio Grande do Sul frente a eventos climáticos extremos',
  objetivo: 'Reconstruir o estado após desastres naturais e fortalecer a resiliência a longo prazo',
  status: 'ativo',
  dataInicio: new Date('2024-05-01'),
  dataAtualizacao: new Date(),
  fases: [
    {
      id: 'fase1',
      nome: 'Fase 1 - Emergencial',
      fase: 'fase1-emergencial',
      descricao: 'Ações imediatas de socorro, assistência e resposta',
      prazo: '0-3 meses',
      status: 'em-andamento',
      acoes: [],
    },
    {
      id: 'fase2',
      nome: 'Fase 2 - Transição',
      fase: 'fase2-transicao',
      descricao: 'Estabilização e início da recuperação',
      prazo: '3-12 meses',
      status: 'planejado',
      acoes: [],
    },
    {
      id: 'fase3',
      nome: 'Fase 3 - Reconstrução',
      fase: 'fase3-reconstrucao',
      descricao: 'Recuperação completa das áreas afetadas',
      prazo: '1-3 anos',
      status: 'planejado',
      acoes: [],
    },
    {
      id: 'fase4',
      nome: 'Fase 4 - Resiliência',
      fase: 'fase4-resiliencia',
      descricao: 'Fortalecimento da resiliência e prevenção',
      prazo: '3+ anos',
      status: 'planejado',
      acoes: [],
    },
  ],
  componentes: [],
};

// ==================== AÇÕES PREVISTAS ====================

export const ACOES_SOCORRO_ASSISTENCIA: AcaoContingencia[] = [
  {
    id: 'acao-001',
    fase: 'resposta',
    categoria: 'socorro',
    nome: 'Busca e Salvamento',
    descricao: 'Operações de busca e resgate de pessoas em áreas de risco',
    responsaveis: ['Corpo de Bombeiros', 'Defesa Civil', 'Forças Armadas'],
    prazo: 'Imediato',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
  {
    id: 'acao-002',
    fase: 'resposta',
    categoria: 'socorro',
    nome: 'Atendimento Médico de Urgência',
    descricao: 'Atendimento médico emergencial e transporte de feridos',
    responsaveis: ['SAMU', 'Hospitais', 'UPAs'],
    prazo: 'Imediato',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
  {
    id: 'acao-003',
    fase: 'resposta',
    categoria: 'assistencia',
    nome: 'Acolhimento em Abrigos',
    descricao: 'Acolhimento e assistência a pessoas desabrigadas',
    responsaveis: ['Defesa Civil', 'Assistência Social', 'Voluntários'],
    prazo: '24-72 horas',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
];

export const ACOES_LOGISTICA_DOACOES: AcaoContingencia[] = [
  {
    id: 'acao-101',
    fase: 'resposta',
    categoria: 'logistica',
    nome: 'Recebimento de Doações',
    descricao: 'Coordenação do recebimento e triagem de doações',
    responsaveis: ['Defesa Civil', 'Voluntários', 'ONGs'],
    prazo: 'Contínuo',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
  {
    id: 'acao-102',
    fase: 'resposta',
    categoria: 'logistica',
    nome: 'Distribuição de Suprimentos',
    descricao: 'Distribuição estratégica de água, alimentos e itens essenciais',
    responsaveis: ['Defesa Civil', 'Forças Armadas', 'Logística Municipal'],
    prazo: 'Diário',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
];

export const ACOES_RECONSTRUCAO: AcaoContingencia[] = [
  {
    id: 'acao-201',
    fase: 'recuperacao',
    categoria: 'reconstrucao',
    nome: 'Recuperação de Infraestrutura',
    descricao: 'Reconstrução de estradas, pontes e infraestrutura crítica',
    responsaveis: ['DAER', 'Prefeituras', 'Governo Estadual'],
    prazo: '6-24 meses',
    recursos: [],
    indicadores: [],
    status: 'planejado',
  },
  {
    id: 'acao-202',
    fase: 'recuperacao',
    categoria: 'reconstrucao',
    nome: 'Reconstrução de Moradias',
    descricao: 'Reconstrução e adaptação de moradias afetadas',
    responsaveis: ['Governo Estadual', 'Prefeituras', 'Caixa Econômica'],
    prazo: '12-36 meses',
    recursos: [],
    indicadores: [],
    status: 'planejado',
  },
];

export const ACOES_FINANCIAMENTO: AcaoContingencia[] = [
  {
    id: 'acao-301',
    fase: 'preparacao',
    categoria: 'financiamento',
    nome: 'Captação de Recursos Federais',
    descricao: 'Busca de recursos junto ao governo federal',
    responsaveis: ['Governo Estadual', 'Defesa Civil Nacional'],
    prazo: 'Contínuo',
    recursos: [],
    indicadores: [],
    status: 'em-andamento',
  },
  {
    id: 'acao-302',
    fase: 'preparacao',
    categoria: 'financiamento',
    nome: 'Investimentos em Infraestrutura',
    descricao: 'Investimentos preventivos em infraestrutura de proteção',
    responsaveis: ['Governo Estadual', 'Prefeituras'],
    prazo: '1-5 anos',
    recursos: [],
    indicadores: [],
    status: 'planejado',
  },
];

// ==================== COMPONENTES DO PLANO ====================

export const COMPONENTES_PLANO: ComponentePlano[] = [
  {
    id: 'comp-001',
    tipo: 'estadual',
    nome: 'Plano Rio Grande',
    descricao: 'Programa estadual de reconstrução e resiliência',
    responsavel: 'Governo do Estado do Rio Grande do Sul',
    acoes: [...ACOES_SOCORRO_ASSISTENCIA, ...ACOES_LOGISTICA_DOACOES, ...ACOES_RECONSTRUCAO, ...ACOES_FINANCIAMENTO],
    status: 'em-andamento',
    prioridade: 'critica',
  },
  {
    id: 'comp-002',
    tipo: 'municipal',
    nome: 'Planos Municipais de Contingência',
    descricao: 'Documentos detalhando ações locais para cada tipo de emergência',
    responsavel: 'Prefeituras Municipais',
    acoes: [],
    status: 'em-andamento',
    prioridade: 'alta',
  },
  {
    id: 'comp-003',
    tipo: 'capacitacao',
    nome: 'Capacitação de Órgãos Municipais',
    descricao: 'Treinamentos para secretarias de saúde e defesa civil sobre elaboração e execução de planos',
    responsavel: 'Defesa Civil Estadual',
    acoes: [],
    status: 'em-andamento',
    prioridade: 'alta',
  },
  {
    id: 'comp-004',
    tipo: 'mapeamento',
    nome: 'Mapa Único do Plano Rio Grande (MUP RS)',
    descricao: 'Sistema integrado de mapeamento das áreas atingidas',
    responsavel: 'Governo do Estado',
    acoes: [],
    status: 'em-andamento',
    prioridade: 'critica',
  },
  {
    id: 'comp-005',
    tipo: 'comunicacao',
    nome: 'Protocolos de Comunicação de Risco',
    descricao: 'Pesquisas e estudos para qualificar protocolos de comunicação eficaz',
    responsavel: 'Defesa Civil e Comunicação Social',
    acoes: [],
    status: 'em-andamento',
    prioridade: 'alta',
  },
];

// ==================== SERVIÇO DE GESTÃO DO PLANO ====================

export class PlanoContingenciaService {
  
  /**
   * Obtém o Plano Rio Grande completo
   */
  static getPlanoRioGrande(): PlanoRioGrande {
    return PLANO_RIO_GRANDE;
  }

  /**
   * Obtém todos os componentes do plano
   */
  static getComponentes(): ComponentePlano[] {
    return COMPONENTES_PLANO;
  }

  /**
   * Obtém ações por fase
   */
  static getAcoesPorFase(fase: AcaoContingencia['fase']): AcaoContingencia[] {
    const todasAcoes = [
      ...ACOES_SOCORRO_ASSISTENCIA,
      ...ACOES_LOGISTICA_DOACOES,
      ...ACOES_RECONSTRUCAO,
      ...ACOES_FINANCIAMENTO,
    ];
    return todasAcoes.filter(acao => acao.fase === fase);
  }

  /**
   * Obtém ações por categoria
   */
  static getAcoesPorCategoria(categoria: AcaoContingencia['categoria']): AcaoContingencia[] {
    const todasAcoes = [
      ...ACOES_SOCORRO_ASSISTENCIA,
      ...ACOES_LOGISTICA_DOACOES,
      ...ACOES_RECONSTRUCAO,
      ...ACOES_FINANCIAMENTO,
    ];
    return todasAcoes.filter(acao => acao.categoria === categoria);
  }

  /**
   * Obtém estatísticas do plano
   */
  static getEstatisticas() {
    const todasAcoes = [
      ...ACOES_SOCORRO_ASSISTENCIA,
      ...ACOES_LOGISTICA_DOACOES,
      ...ACOES_RECONSTRUCAO,
      ...ACOES_FINANCIAMENTO,
    ];

    return {
      totalAcoes: todasAcoes.length,
      acoesEmAndamento: todasAcoes.filter(a => a.status === 'em-andamento').length,
      acoesConcluidas: todasAcoes.filter(a => a.status === 'concluida').length,
      acoesPendentes: todasAcoes.filter(a => a.status === 'pendente').length,
      componentesAtivos: COMPONENTES_PLANO.filter(c => c.status === 'em-andamento').length,
      fasesAtivas: PLANO_RIO_GRANDE.fases.filter(f => f.status === 'em-andamento').length,
    };
  }

  /**
   * Obtém modelo de plano municipal
   */
  static getModeloPlanoMunicipal(municipio: string, codigoIBGE: string): PlanoMunicipal {
    return {
      id: `pm-${codigoIBGE}`,
      municipio,
      codigoIBGE,
      tiposEmergencia: [],
      acoes: [],
      recursosDisponiveis: [],
      contatosEmergencia: [],
      dataElaboracao: new Date(),
      dataRevisao: new Date(),
      status: 'em-revisao',
    };
  }

  /**
   * Gera relatório de progresso
   */
  static gerarRelatorioProgresso() {
    const stats = this.getEstatisticas();
    const percentualConclusao = (stats.acoesConcluidas / stats.totalAcoes) * 100;

    return {
      dataGeracao: new Date(),
      percentualConclusao: percentualConclusao.toFixed(2),
      totalAcoes: stats.totalAcoes,
      distribuicaoStatus: {
        concluidas: stats.acoesConcluidas,
        emAndamento: stats.acoesEmAndamento,
        pendentes: stats.acoesPendentes,
      },
      fasesAtivas: PLANO_RIO_GRANDE.fases.filter(f => f.status === 'em-andamento'),
      componentesCriticos: COMPONENTES_PLANO.filter(c => c.prioridade === 'critica'),
    };
  }
}

export default PlanoContingenciaService;
