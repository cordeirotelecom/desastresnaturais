/**
 * Desenvolvimento Harmônico e Sustentável (DHS)
 * Base filosófica e metodológica para todas as ações do sistema
 * 
 * Fundamentação:
 * - Pensamento Sistêmico e Complexo
 * - Convergência dos 3 Setores
 * - Impactos Proporcionais nos Eixos da Sustentabilidade
 */

// ==================== INTERFACES E TIPOS ====================

export interface NecessidadeHumana {
  id: string;
  categoria: 'fisiologica' | 'psicologica' | 'autorrealizacao';
  tipo: string;
  descricao: string;
  prioridade: 'critica' | 'alta' | 'media' | 'baixa';
  atendida: boolean;
  percentualAtendimento?: number;
}

export interface EixoSustentabilidade {
  id: string;
  tipo: 'economico' | 'social' | 'ambiental';
  nome: string;
  descricao: string;
  indicadores: IndicadorDHS[];
  impacto: number; // 0-100
  proporcionalidade: number; // 0-100
}

export interface SetorAtuante {
  id: string;
  tipo: 'publico' | 'privado' | 'sociedade-civil' | 'comunidade';
  nome: string;
  representantes: string[];
  contribuicoes: Contribuicao[];
  nivelConvergencia: number; // 0-100
}

export interface Contribuicao {
  id: string;
  setorId: string;
  tipo: 'recurso' | 'conhecimento' | 'infraestrutura' | 'mobilizacao';
  descricao: string;
  valor?: number;
  dataContribuicao: Date;
}

export interface IndicadorDHS {
  id: string;
  nome: string;
  descricao: string;
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  tendencia: 'crescente' | 'estavel' | 'decrescente';
  dataAtualizacao: Date;
}

export interface AtuacaoResolutiva {
  id: string;
  nome: string;
  descricao: string;
  problema: string;
  solucao: string;
  setoresEnvolvidos: string[];
  necessidadesAtendidas: string[];
  impactosEixos: {
    economico: number;
    social: number;
    ambiental: number;
  };
  status: 'planejada' | 'em-andamento' | 'concluida' | 'suspensa';
  resultados?: string[];
}

export interface MatrizConvergencia {
  id: string;
  nome: string;
  objetivo: string;
  setoresParticipantes: SetorAtuante[];
  acoes: AtuacaoResolutiva[];
  indicadorConvergencia: number; // 0-100
  dataInicio: Date;
  dataFim?: Date;
  status: 'ativa' | 'concluida' | 'pausada';
}

export interface AbordagemSistemica {
  tipo: 'multidisciplinar' | 'interdisciplinar' | 'transdisciplinar';
  nome: string;
  descricao: string;
  analogia: string;
  nivelEficacia: number; // 0-100
  caracteristicas: string[];
}

export interface FocoPrioritario {
  id: string;
  nome: string;
  descricao: string;
  relevanciaFamilia: boolean;
  necessidadesAssociadas: NecessidadeHumana[];
  setoresEnvolvidos: string[];
  prazo: string;
  prioridade: 'critica' | 'alta' | 'media' | 'baixa';
}

export interface ResultadoDHS {
  tipo: 'melhora-relacoes' | 'liberdade-consciencia' | 'paz-interna' | 'paz-externa';
  descricao: string;
  indicadores: IndicadorDHS[];
  alcancado: boolean;
}

// ==================== NECESSIDADES HUMANAS (PIRÂMIDE DE MASLOW) ====================

export const NECESSIDADES_FISIOLOGICAS: NecessidadeHumana[] = [
  {
    id: 'nec-fis-001',
    categoria: 'fisiologica',
    tipo: 'Alimentação',
    descricao: 'Fome - Necessidade básica de nutrição adequada',
    prioridade: 'critica',
    atendida: false,
  },
  {
    id: 'nec-fis-002',
    categoria: 'fisiologica',
    tipo: 'Descanso',
    descricao: 'Sono - Necessidade de repouso e recuperação',
    prioridade: 'critica',
    atendida: false,
  },
  {
    id: 'nec-fis-003',
    categoria: 'fisiologica',
    tipo: 'Saúde',
    descricao: 'Saúde - Necessidade de bem-estar físico e mental',
    prioridade: 'critica',
    atendida: false,
  },
  {
    id: 'nec-fis-004',
    categoria: 'fisiologica',
    tipo: 'Abrigo',
    descricao: 'Moradia - Necessidade de proteção e segurança física',
    prioridade: 'critica',
    atendida: false,
  },
];

export const NECESSIDADES_PSICOLOGICAS: NecessidadeHumana[] = [
  {
    id: 'nec-psi-001',
    categoria: 'psicologica',
    tipo: 'Segurança',
    descricao: 'Segurança - Necessidade de proteção contra ameaças',
    prioridade: 'alta',
    atendida: false,
  },
  {
    id: 'nec-psi-002',
    categoria: 'psicologica',
    tipo: 'Pertencimento',
    descricao: 'Pertencimento - Necessidade de conexão social e familiar',
    prioridade: 'alta',
    atendida: false,
  },
  {
    id: 'nec-psi-003',
    categoria: 'psicologica',
    tipo: 'Autoestima',
    descricao: 'Autoestima - Necessidade de reconhecimento e valor pessoal',
    prioridade: 'alta',
    atendida: false,
  },
];

export const NECESSIDADES_AUTORREALIZACAO: NecessidadeHumana[] = [
  {
    id: 'nec-aut-001',
    categoria: 'autorrealizacao',
    tipo: 'Desenvolvimento',
    descricao: 'Desenvolvimento - Necessidade de crescimento pessoal',
    prioridade: 'media',
    atendida: false,
  },
  {
    id: 'nec-aut-002',
    categoria: 'autorrealizacao',
    tipo: 'Potencial',
    descricao: 'Potencial - Necessidade de expressar capacidades',
    prioridade: 'media',
    atendida: false,
  },
  {
    id: 'nec-aut-003',
    categoria: 'autorrealizacao',
    tipo: 'Superação',
    descricao: 'Superação - Necessidade de transcendência e realização',
    prioridade: 'media',
    atendida: false,
  },
];

// ==================== EIXOS DA SUSTENTABILIDADE ====================

export const EIXOS_SUSTENTABILIDADE: EixoSustentabilidade[] = [
  {
    id: 'eixo-eco',
    tipo: 'economico',
    nome: '💰 Eixo Econômico',
    descricao: 'Geração de renda e valor agregado',
    indicadores: [],
    impacto: 0,
    proporcionalidade: 33.33,
  },
  {
    id: 'eixo-soc',
    tipo: 'social',
    nome: '👥 Eixo Social',
    descricao: 'Saúde, educação, cidadania e segurança',
    indicadores: [],
    impacto: 0,
    proporcionalidade: 33.33,
  },
  {
    id: 'eixo-amb',
    tipo: 'ambiental',
    nome: '🌱 Eixo Ambiental',
    descricao: 'Equilíbrio e harmonia com a natureza',
    indicadores: [],
    impacto: 0,
    proporcionalidade: 33.34,
  },
];

// ==================== SETORES ATUANTES ====================

export const SETORES_CONVERGENCIA: SetorAtuante[] = [
  {
    id: 'setor-pub',
    tipo: 'publico',
    nome: 'Setor Público',
    representantes: ['Governo do Estado', 'Prefeituras', 'Defesa Civil', 'Secretarias'],
    contribuicoes: [],
    nivelConvergencia: 0,
  },
  {
    id: 'setor-priv',
    tipo: 'privado',
    nome: 'Setor Privado',
    representantes: ['Empresas', 'Indústrias', 'Comércio', 'Iniciativa Privada'],
    contribuicoes: [],
    nivelConvergencia: 0,
  },
  {
    id: 'setor-civil',
    tipo: 'sociedade-civil',
    nome: 'Sociedade Civil Organizada',
    representantes: ['ONGs', 'Associações', 'Institutos', 'Cooperativas'],
    contribuicoes: [],
    nivelConvergencia: 0,
  },
  {
    id: 'setor-com',
    tipo: 'comunidade',
    nome: 'Comunidade em Geral',
    representantes: ['Famílias', 'Cidadãos', 'Voluntários', 'Grupos Comunitários'],
    contribuicoes: [],
    nivelConvergencia: 0,
  },
];

// ==================== ABORDAGENS SISTÊMICAS ====================

export const ABORDAGENS_SISTEMICAS: AbordagemSistemica[] = [
  {
    tipo: 'multidisciplinar',
    nome: '🔴 Abordagem Multidisciplinar',
    descricao: 'Diversos assuntos impactados, mas sem cooperação ou interconexão',
    analogia: 'Tripulantes remando desordenadamente. O barco anda em círculos.',
    nivelEficacia: 30,
    caracteristicas: [
      'Trabalho isolado por disciplinas',
      'Falta de comunicação entre áreas',
      'Resultados fragmentados',
      'Baixa sinergia',
    ],
  },
  {
    tipo: 'interdisciplinar',
    nome: '🟡 Abordagem Interdisciplinar',
    descricao: 'Diversos assuntos com cooperação e interconexão para atingir um objetivo',
    analogia: 'Tripulação alinhada como competição de remo. Avança, mas não está preparado para turbulências.',
    nivelEficacia: 65,
    caracteristicas: [
      'Cooperação entre disciplinas',
      'Objetivo comum definido',
      'Comunicação regular',
      'Resultados integrados',
    ],
  },
  {
    tipo: 'transdisciplinar',
    nome: '🟢 Abordagem Transdisciplinar',
    descricao: 'Assuntos unificados, gerando pensamento complexo/sistêmico que transpassa disciplinas',
    analogia: 'Tripulação percebe missão comum. Remam juntos e o barco vira navio apto a navegar mares bravios.',
    nivelEficacia: 95,
    caracteristicas: [
      'Pensamento sistêmico e complexo',
      'Unificação de conhecimentos',
      'Resiliência e adaptabilidade',
      'Transformação paradigmática',
      'Resultados sustentáveis',
    ],
  },
];

// ==================== DEFINIÇÃO DO DHS ====================

export const DEFINICAO_DHS = {
  titulo: 'Desenvolvimento Harmônico e Sustentável (DHS)',
  definicao: `O processo evolutivo que busca, a partir de foco(s) prioritário(s) e, no que couber, dando relevância à família, atender necessidades, com impactos proporcionais nos 3 eixos da sustentabilidade (econômico, social e ambiental), por meio da convergência dos 3 setores (público, privado e sociedade civil organizada) e da comunidade em geral e via promoção de atuações resolutivas e matrizes de convergência, gerando a melhora nas relações, a liberdade com a consciência da unidade e a Paz, interna e externa.`,
  componentesChave: [
    'Atendimento de Necessidades Humanas',
    'Impactos Proporcionais nos Eixos da Sustentabilidade',
    'Convergência dos Três Setores e da Comunidade',
    'Relevância da Família (art. 226 da CF/88)',
  ],
  resultadosEsperados: [
    'Melhora nas relações',
    'Liberdade com consciência da unidade',
    'Paz interna',
    'Paz externa',
  ],
};

// ==================== FAMÍLIA COMO BASE ====================

export const RELEVANCIA_FAMILIA = {
  fundamentoLegal: 'Artigo 226 da Constituição Federal de 1988',
  texto: 'A família, base da sociedade, tem especial proteção do Estado.',
  importancia: [
    'Ambiente primordial para o desenvolvimento de valores',
    'Base da estrutura social',
    'Núcleo de fomento do DHS',
    'Primeiro espaço de educação e formação cidadã',
  ],
  acoesIntegradas: [
    'Fortalecimento de vínculos familiares',
    'Apoio psicossocial às famílias afetadas',
    'Programas de desenvolvimento familiar',
    'Proteção integral da família',
  ],
};

// ==================== SERVIÇO DE GESTÃO DHS ====================

export class DHSService {
  /**
   * Obtém todas as necessidades humanas categorizadas
   */
  static getNecessidadesHumanas() {
    return {
      fisiologicas: NECESSIDADES_FISIOLOGICAS,
      psicologicas: NECESSIDADES_PSICOLOGICAS,
      autorrealizacao: NECESSIDADES_AUTORREALIZACAO,
      total: [
        ...NECESSIDADES_FISIOLOGICAS,
        ...NECESSIDADES_PSICOLOGICAS,
        ...NECESSIDADES_AUTORREALIZACAO,
      ],
    };
  }

  /**
   * Obtém os eixos da sustentabilidade
   */
  static getEixosSustentabilidade(): EixoSustentabilidade[] {
    return EIXOS_SUSTENTABILIDADE;
  }

  /**
   * Obtém os setores para convergência
   */
  static getSetoresConvergencia(): SetorAtuante[] {
    return SETORES_CONVERGENCIA;
  }

  /**
   * Obtém as abordagens sistêmicas
   */
  static getAbordagensSistemicas(): AbordagemSistemica[] {
    return ABORDAGENS_SISTEMICAS;
  }

  /**
   * Obtém a definição completa do DHS
   */
  static getDefinicaoDHS() {
    return DEFINICAO_DHS;
  }

  /**
   * Obtém informações sobre a relevância da família
   */
  static getRelevanciaFamilia() {
    return RELEVANCIA_FAMILIA;
  }

  /**
   * Calcula o nível de convergência entre setores
   */
  static calcularNivelConvergencia(setores: SetorAtuante[]): number {
    if (setores.length === 0) return 0;
    const soma = setores.reduce((acc, setor) => acc + setor.nivelConvergencia, 0);
    return soma / setores.length;
  }

  /**
   * Verifica proporcionalidade dos impactos nos eixos
   */
  static verificarProporcionalidade(impactos: {
    economico: number;
    social: number;
    ambiental: number;
  }): boolean {
    const valores = [impactos.economico, impactos.social, impactos.ambiental];
    const media = valores.reduce((a, b) => a + b, 0) / 3;
    const desvio = Math.max(...valores) - Math.min(...valores);
    
    // Considera proporcional se o desvio for menor que 20% da média
    return desvio <= media * 0.2;
  }

  /**
   * Avalia ação segundo princípios DHS
   */
  static avaliarAcaoDHS(acao: AtuacaoResolutiva): {
    conformeDHS: boolean;
    pontuacao: number;
    aspectos: {
      atendimentoNecessidades: number;
      proporcionalidadeEixos: number;
      convergenciaSetores: number;
      potencialTransformador: number;
    };
    recomendacoes: string[];
  } {
    const aspectos = {
      atendimentoNecessidades: (acao.necessidadesAtendidas.length / 11) * 100,
      proporcionalidadeEixos: this.verificarProporcionalidade(acao.impactosEixos) ? 100 : 50,
      convergenciaSetores: (acao.setoresEnvolvidos.length / 4) * 100,
      potencialTransformador: 
        acao.status === 'concluida' && acao.resultados && acao.resultados.length > 0 ? 100 : 50,
    };

    const pontuacao =
      (aspectos.atendimentoNecessidades * 0.3 +
        aspectos.proporcionalidadeEixos * 0.3 +
        aspectos.convergenciaSetores * 0.25 +
        aspectos.potencialTransformador * 0.15);

    const recomendacoes: string[] = [];
    
    if (aspectos.atendimentoNecessidades < 50) {
      recomendacoes.push('Ampliar foco no atendimento de necessidades humanas básicas');
    }
    if (aspectos.proporcionalidadeEixos < 80) {
      recomendacoes.push('Equilibrar impactos nos três eixos da sustentabilidade');
    }
    if (aspectos.convergenciaSetores < 75) {
      recomendacoes.push('Aumentar participação dos setores público, privado e sociedade civil');
    }
    if (aspectos.potencialTransformador < 70) {
      recomendacoes.push('Fortalecer atuação resolutiva com resultados mensuráveis');
    }

    return {
      conformeDHS: pontuacao >= 70,
      pontuacao,
      aspectos,
      recomendacoes,
    };
  }

  /**
   * Gera relatório de análise DHS
   */
  static gerarRelatorioDHS(acoes: AtuacaoResolutiva[]) {
    const avaliacoes = acoes.map(acao => ({
      acao: acao.nome,
      avaliacao: this.avaliarAcaoDHS(acao),
    }));

    const mediaGeral =
      avaliacoes.reduce((acc, av) => acc + av.avaliacao.pontuacao, 0) / avaliacoes.length;

    const acoesConformes = avaliacoes.filter(av => av.avaliacao.conformeDHS).length;

    return {
      dataGeracao: new Date(),
      totalAcoes: acoes.length,
      acoesConformesDHS: acoesConformes,
      percentualConformidade: (acoesConformes / acoes.length) * 100,
      pontuacaoMedia: mediaGeral,
      avaliacoes,
      classificacao:
        mediaGeral >= 90
          ? 'Excelente - Plenamente conforme DHS'
          : mediaGeral >= 70
          ? 'Bom - Conforme DHS com melhorias possíveis'
          : mediaGeral >= 50
          ? 'Regular - Necessita ajustes para conformidade DHS'
          : 'Insuficiente - Requer reestruturação sob perspectiva DHS',
    };
  }
}

export default DHSService;
