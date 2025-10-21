/**
 * BIBLIOTECA DE RECURSOS OFICIAIS
 * 
 * Links para documentos oficiais, treinamentos gratuitos,
 * cursos de capacitação e materiais educativos de órgãos
 * governamentais e instituições reconhecidas
 */

export interface DocumentoOficial {
  id: string;
  titulo: string;
  orgao: string;
  tipo: 'pdf' | 'video' | 'curso' | 'manual' | 'cartilha' | 'lei' | 'protocolo';
  categoria: 'juridico' | 'tecnico' | 'educativo' | 'operacional' | 'normativo';
  descricao: string;
  urlDownload: string;
  tamanho?: string;
  dataPublicacao: string;
  relevancia: 'essencial' | 'recomendado' | 'complementar';
  tags: string[];
}

export interface CursoTreinamento {
  id: string;
  titulo: string;
  instituicao: string;
  plataforma: string;
  tipo: 'ead' | 'presencial' | 'hibrido';
  duracao: string;
  cargaHoraria: string;
  certificado: boolean;
  gratuito: boolean;
  nivel: 'basico' | 'intermediario' | 'avancado';
  descricao: string;
  urlInscricao: string;
  publicoAlvo: string[];
  conteudoProgramatico: string[];
}

// ============================================
// DOCUMENTOS OFICIAIS - MINISTÉRIO PÚBLICO
// ============================================

export const documentosMinisterioPublico: DocumentoOficial[] = [
  {
    id: 'mp-001',
    titulo: 'Manual de Atuação do Ministério Público em Situações de Desastres',
    orgao: 'Conselho Nacional do Ministério Público (CNMP)',
    tipo: 'manual',
    categoria: 'juridico',
    descricao: 'Manual completo sobre a atuação do MP antes, durante e após desastres naturais, incluindo responsabilidades, protocolos e fluxos de trabalho.',
    urlDownload: 'https://www.cnmp.mp.br/portal/images/Publicacoes/documentos/2022/Manual_Atuacao_Desastres_CNMP.pdf',
    tamanho: '8.5 MB',
    dataPublicacao: '2022-03-15',
    relevancia: 'essencial',
    tags: ['MP', 'protocolo', 'atuação', 'desastres', 'responsabilidades']
  },
  {
    id: 'mp-002',
    titulo: 'Recomendação nº 82/2021 - Planos de Contingência',
    orgao: 'CNMP',
    tipo: 'lei',
    categoria: 'normativo',
    descricao: 'Recomendação sobre elaboração e atualização de Planos de Contingência municipais para situações de emergência e desastre.',
    urlDownload: 'https://www.cnmp.mp.br/portal/images/Recomendacoes/Recomenda%C3%A7%C3%A3o-082.pdf',
    tamanho: '450 KB',
    dataPublicacao: '2021-09-07',
    relevancia: 'essencial',
    tags: ['recomendação', 'plano de contingência', 'municipal', 'prevenção']
  },
  {
    id: 'mp-003',
    titulo: 'Guia de Atuação Ministerial: Defesa Civil',
    orgao: 'Ministério Público do RS',
    tipo: 'manual',
    categoria: 'operacional',
    descricao: 'Guia específico do MP-RS sobre coordenação com a Defesa Civil estadual e municipal em situações de calamidade.',
    urlDownload: 'https://www.mprs.mp.br/media/areas/ambiente/arquivos/guia_defesa_civil.pdf',
    tamanho: '3.2 MB',
    dataPublicacao: '2023-01-20',
    relevancia: 'essencial',
    tags: ['MP-RS', 'defesa civil', 'coordenação', 'calamidade']
  }
];

// ============================================
// DOCUMENTOS - DEFESA CIVIL NACIONAL
// ============================================

export const documentosDefesaCivil: DocumentoOficial[] = [
  {
    id: 'dc-001',
    titulo: 'Política Nacional de Proteção e Defesa Civil - Lei nº 12.608/2012',
    orgao: 'Ministério da Integração e Desenvolvimento Regional',
    tipo: 'lei',
    categoria: 'normativo',
    descricao: 'Lei que institui a Política Nacional de Proteção e Defesa Civil - PNPDEC e dispõe sobre o Sistema Nacional de Proteção e Defesa Civil - SINPDEC.',
    urlDownload: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12608.htm',
    dataPublicacao: '2012-04-10',
    relevancia: 'essencial',
    tags: ['lei', 'PNPDEC', 'SINPDEC', 'política nacional']
  },
  {
    id: 'dc-002',
    titulo: 'Protocolo Nacional de Gestão Integrada de Riscos e Desastres',
    orgao: 'Defesa Civil Nacional',
    tipo: 'protocolo',
    categoria: 'operacional',
    descricao: 'Protocolo unificado para gestão de riscos, prevenção, preparação, resposta e recuperação em desastres.',
    urlDownload: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/protocolo-nacional.pdf',
    tamanho: '12 MB',
    dataPublicacao: '2023-06-10',
    relevancia: 'essencial',
    tags: ['protocolo', 'gestão de riscos', 'prevenção', 'resposta']
  },
  {
    id: 'dc-003',
    titulo: 'Manual de Elaboração de Plano de Contingência Municipal',
    orgao: 'Defesa Civil Nacional',
    tipo: 'manual',
    categoria: 'tecnico',
    descricao: 'Manual passo a passo para municípios elaborarem seus Planos de Contingência para diferentes tipos de desastres.',
    urlDownload: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/publicacoes/Manual_Plano_Contingencia.pdf',
    tamanho: '6.8 MB',
    dataPublicacao: '2022-08-15',
    relevancia: 'essencial',
    tags: ['manual', 'plano de contingência', 'municipal', 'elaboração']
  },
  {
    id: 'dc-004',
    titulo: 'Capacitação Básica em Proteção e Defesa Civil',
    orgao: 'Defesa Civil Nacional',
    tipo: 'cartilha',
    categoria: 'educativo',
    descricao: 'Cartilha com conceitos básicos de proteção e defesa civil para capacitação de agentes municipais e voluntários.',
    urlDownload: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/publicacoes/Cartilha_Capacitacao_Basica.pdf',
    tamanho: '4.5 MB',
    dataPublicacao: '2023-02-01',
    relevancia: 'recomendado',
    tags: ['capacitação', 'voluntários', 'conceitos básicos', 'agentes']
  },
  {
    id: 'dc-005',
    titulo: 'Atlas Brasileiro de Desastres Naturais 1991-2020',
    orgao: 'Centro Nacional de Monitoramento e Alertas (CEMADEN)',
    tipo: 'pdf',
    categoria: 'tecnico',
    descricao: 'Análise histórica completa dos desastres naturais no Brasil nas últimas três décadas, com mapas, estatísticas e tendências.',
    urlDownload: 'https://www.cemaden.gov.br/wp-content/uploads/2021/12/Atlas_Brasileiro_Desastres_Naturais.pdf',
    tamanho: '45 MB',
    dataPublicacao: '2021-12-01',
    relevancia: 'recomendado',
    tags: ['atlas', 'histórico', 'estatísticas', 'CEMADEN']
  }
];

// ============================================
// DOCUMENTOS - DEFESA CIVIL RS
// ============================================

export const documentosDefesaCivilRS: DocumentoOficial[] = [
  {
    id: 'dcrs-001',
    titulo: 'Plano Estadual de Proteção e Defesa Civil do RS',
    orgao: 'Defesa Civil do Rio Grande do Sul',
    tipo: 'protocolo',
    categoria: 'operacional',
    descricao: 'Plano estadual com diretrizes, protocolos e estratégias para gestão de desastres no território gaúcho.',
    urlDownload: 'https://defesacivil.rs.gov.br/upload/arquivos/plano-estadual-2023.pdf',
    tamanho: '15 MB',
    dataPublicacao: '2023-03-01',
    relevancia: 'essencial',
    tags: ['RS', 'plano estadual', 'diretrizes', 'estratégias']
  },
  {
    id: 'dcrs-002',
    titulo: 'Mapeamento de Áreas de Risco de Enchentes no RS',
    orgao: 'Defesa Civil RS + CPRM',
    tipo: 'pdf',
    categoria: 'tecnico',
    descricao: 'Mapeamento técnico das áreas de risco de enchentes em 497 municípios gaúchos, com mapas e recomendações.',
    urlDownload: 'https://rigeo.cprm.gov.br/bitstream/doc/mapeamento_enchentes_rs.pdf',
    tamanho: '78 MB',
    dataPublicacao: '2022-11-10',
    relevancia: 'essencial',
    tags: ['mapeamento', 'enchentes', 'áreas de risco', 'CPRM']
  },
  {
    id: 'dcrs-003',
    titulo: 'Protocolo de Ação para Enchentes',
    orgao: 'Defesa Civil RS',
    tipo: 'protocolo',
    categoria: 'operacional',
    descricao: 'Protocolo operacional específico para situações de enchentes, com fluxos de decisão, responsabilidades e ações prioritárias.',
    urlDownload: 'https://defesacivil.rs.gov.br/upload/protocolo-enchentes-2023.pdf',
    tamanho: '2.8 MB',
    dataPublicacao: '2023-05-15',
    relevancia: 'essencial',
    tags: ['protocolo', 'enchentes', 'operacional', 'fluxos']
  }
];

// ============================================
// CURSOS - ESCOLA VIRTUAL DE GOVERNO (ENAP)
// ============================================

export const cursosENAP: CursoTreinamento[] = [
  {
    id: 'enap-001',
    titulo: 'Introdução à Gestão de Riscos e Desastres',
    instituicao: 'ENAP - Escola Nacional de Administração Pública',
    plataforma: 'EV.G (Escola Virtual de Governo)',
    tipo: 'ead',
    duracao: '4 semanas',
    cargaHoraria: '40 horas',
    certificado: true,
    gratuito: true,
    nivel: 'basico',
    descricao: 'Curso introdutório sobre conceitos, políticas e instrumentos de gestão de riscos e desastres no Brasil.',
    urlInscricao: 'https://www.escolavirtual.gov.br/curso/77',
    publicoAlvo: ['Servidores públicos', 'Voluntários', 'Sociedade civil'],
    conteudoProgramatico: [
      'Conceitos básicos de desastres',
      'Política Nacional de Proteção e Defesa Civil',
      'Sistema Nacional de Proteção e Defesa Civil',
      'Gestão de riscos: prevenção, preparação, resposta e recuperação',
      'Ferramentas de monitoramento e alerta',
      'Comunicação de risco com a população'
    ]
  },
  {
    id: 'enap-002',
    titulo: 'Elaboração de Planos de Contingência',
    instituicao: 'ENAP',
    plataforma: 'EV.G',
    tipo: 'ead',
    duracao: '3 semanas',
    cargaHoraria: '30 horas',
    certificado: true,
    gratuito: true,
    nivel: 'intermediario',
    descricao: 'Capacitação prática para elaboração de Planos de Contingência municipais conforme metodologia nacional.',
    urlInscricao: 'https://www.escolavirtual.gov.br/curso/312',
    publicoAlvo: ['Gestores municipais', 'Defesa Civil', 'Técnicos'],
    conteudoProgramatico: [
      'Metodologia de elaboração de planos',
      'Análise de riscos locais',
      'Definição de cenários de desastres',
      'Estrutura organizacional de resposta',
      'Recursos necessários e mobilização',
      'Simulados e testes do plano',
      'Atualização e revisão periódica'
    ]
  },
  {
    id: 'enap-003',
    titulo: 'Gestão de Abrigos Temporários',
    instituicao: 'ENAP',
    plataforma: 'EV.G',
    tipo: 'ead',
    duracao: '2 semanas',
    cargaHoraria: '20 horas',
    certificado: true,
    gratuito: true,
    nivel: 'intermediario',
    descricao: 'Curso sobre gestão operacional de abrigos temporários, incluindo instalação, administração, atendimento humanizado e encerramento.',
    urlInscricao: 'https://www.escolavirtual.gov.br/curso/218',
    publicoAlvo: ['Coordenadores de abrigos', 'Assistentes sociais', 'Voluntários'],
    conteudoProgramatico: [
      'Seleção e preparação de locais',
      'Estrutura mínima de um abrigo',
      'Gestão de recursos e suprimentos',
      'Atendimento humanizado às vítimas',
      'Registro e controle de abrigados',
      'Saúde, alimentação e higiene',
      'Desativação e transição'
    ]
  },
  {
    id: 'enap-004',
    titulo: 'Comunicação de Risco em Situações de Emergência',
    instituicao: 'ENAP',
    plataforma: 'EV.G',
    tipo: 'ead',
    duracao: '2 semanas',
    cargaHoraria: '20 horas',
    certificado: true,
    gratuito: true,
    nivel: 'basico',
    descricao: 'Técnicas e estratégias de comunicação eficaz com a população antes, durante e após desastres.',
    urlInscricao: 'https://www.escolavirtual.gov.br/curso/445',
    publicoAlvo: ['Comunicadores', 'Gestores', 'Defesa Civil'],
    conteudoProgramatico: [
      'Princípios da comunicação de risco',
      'Linguagem clara e acessível',
      'Canais de comunicação eficazes',
      'Gestão de fake news em crises',
      'Uso de redes sociais em emergências',
      'Comunicação com públicos vulneráveis',
      'Porta-vozes e assessoria de imprensa'
    ]
  }
];

// ============================================
// CURSOS - UNIVERSIDADES E INSTITUIÇÕES
// ============================================

export const cursosUniversidades: CursoTreinamento[] = [
  {
    id: 'uni-001',
    titulo: 'Especialização em Gestão de Riscos e Desastres Naturais',
    instituicao: 'CEPED UFSC - Centro Universitário de Estudos e Pesquisas sobre Desastres',
    plataforma: 'EAD UFSC',
    tipo: 'ead',
    duracao: '18 meses',
    cargaHoraria: '360 horas',
    certificado: true,
    gratuito: false,
    nivel: 'avancado',
    descricao: 'Pós-graduação Lato Sensu em Gestão de Riscos e Desastres, reconhecida pelo MEC, com foco em formação técnica avançada.',
    urlInscricao: 'https://ceped.ufsc.br/especializacao-gestao-riscos-desastres/',
    publicoAlvo: ['Profissionais da Defesa Civil', 'Engenheiros', 'Gestores públicos'],
    conteudoProgramatico: [
      'Fundamentos da gestão de riscos',
      'Hidrologia e meteorologia aplicada',
      'Geotecnia e movimentos de massa',
      'Planejamento territorial e urbano',
      'Sistemas de monitoramento e alerta',
      'Legislação e políticas públicas',
      'Gestão de emergências e desastres',
      'TCC em projeto real'
    ]
  },
  {
    id: 'uni-002',
    titulo: 'Curso de Capacitação em Primeiros Socorros',
    instituicao: 'Cruz Vermelha Brasileira',
    plataforma: 'Presencial e EAD',
    tipo: 'hibrido',
    duracao: '1 semana',
    cargaHoraria: '16 horas',
    certificado: true,
    gratuito: true,
    nivel: 'basico',
    descricao: 'Treinamento prático de primeiros socorros para atuar em situações de emergência, incluindo RCP, engasgo e hemorragias.',
    urlInscricao: 'https://www.cvb.org.br/cursos/primeiros-socorros/',
    publicoAlvo: ['Voluntários', 'População geral', 'Profissionais de resgate'],
    conteudoProgramatico: [
      'Avaliação inicial da vítima',
      'RCP (Reanimação Cardiopulmonar)',
      'Desobstrução de vias aéreas',
      'Controle de hemorragias',
      'Imobilizações de fraturas',
      'Queimaduras e choque elétrico',
      'Transporte de feridos'
    ]
  },
  {
    id: 'uni-003',
    titulo: 'Curso de Geoprocessamento para Gestão de Riscos',
    instituicao: 'INPE - Instituto Nacional de Pesquisas Espaciais',
    plataforma: 'EAD',
    tipo: 'ead',
    duracao: '6 semanas',
    cargaHoraria: '60 horas',
    certificado: true,
    gratuito: true,
    nivel: 'avancado',
    descricao: 'Capacitação em técnicas de geoprocessamento, sensoriamento remoto e SIG para mapeamento de áreas de risco.',
    urlInscricao: 'http://www.inpe.br/crs/geodesastres/',
    publicoAlvo: ['Técnicos', 'Geógrafos', 'Engenheiros', 'Analistas'],
    conteudoProgramatico: [
      'Fundamentos de SIG',
      'Sensoriamento remoto aplicado',
      'Software QGIS avançado',
      'Análise espacial de riscos',
      'Modelagem de enchentes',
      'Mapas de suscetibilidade',
      'Integração com banco de dados'
    ]
  }
];

// ============================================
// CURSOS - DEFESA CIVIL NACIONAL
// ============================================

export const cursosDefesaCivil: CursoTreinamento[] = [
  {
    id: 'dc-curso-001',
    titulo: 'Capacitação Básica em Defesa Civil',
    instituicao: 'Defesa Civil Nacional',
    plataforma: 'Portal da Defesa Civil',
    tipo: 'ead',
    duracao: '4 semanas',
    cargaHoraria: '40 horas',
    certificado: true,
    gratuito: true,
    nivel: 'basico',
    descricao: 'Curso básico obrigatório para agentes de defesa civil municipal, cobrindo todos os aspectos da PNPDEC.',
    urlInscricao: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/capacitacao',
    publicoAlvo: ['Agentes de Defesa Civil', 'Gestores municipais', 'Voluntários'],
    conteudoProgramatico: [
      'Sistema Nacional de Proteção e Defesa Civil',
      'Classificação e codificação de desastres (COBRADE)',
      'Análise de riscos e vulnerabilidades',
      'S2iD - Sistema Integrado de Informações sobre Desastres',
      'Decretos de emergência e calamidade',
      'Convênios e recursos federais',
      'Prestação de contas'
    ]
  },
  {
    id: 'dc-curso-002',
    titulo: 'Operação do Sistema S2iD',
    instituicao: 'Defesa Civil Nacional',
    plataforma: 'Portal da Defesa Civil',
    tipo: 'ead',
    duracao: '1 semana',
    cargaHoraria: '8 horas',
    certificado: true,
    gratuito: true,
    nivel: 'basico',
    descricao: 'Treinamento prático para utilização do Sistema Integrado de Informações sobre Desastres (S2iD).',
    urlInscricao: 'https://s2id.mi.gov.br/capacitacao/',
    publicoAlvo: ['Técnicos municipais', 'Defesa Civil', 'Assistentes sociais'],
    conteudoProgramatico: [
      'Cadastro no S2iD',
      'Registro de desastres',
      'Formulários de avaliação de danos (FIDE/DMATE)',
      'Reconhecimento federal',
      'Solicitação de recursos',
      'Acompanhamento de processos',
      'Relatórios e estatísticas'
    ]
  },
  {
    id: 'dc-curso-003',
    titulo: 'Gerenciamento de Abrigos Temporários',
    instituicao: 'Defesa Civil Nacional + ONU',
    plataforma: 'EAD',
    tipo: 'ead',
    duracao: '3 semanas',
    cargaHoraria: '30 horas',
    certificado: true,
    gratuito: true,
    nivel: 'intermediario',
    descricao: 'Curso baseado em padrões internacionais (Sphere) para gestão humanizada de abrigos em emergências.',
    urlInscricao: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/capacitacao/abrigos',
    publicoAlvo: ['Coordenadores de abrigos', 'Assistentes sociais', 'Psicólogos'],
    conteudoProgramatico: [
      'Padrões Sphere (mínimos humanitários)',
      'Direitos humanos em abrigos',
      'Proteção de grupos vulneráveis',
      'Gestão de conflitos',
      'Saúde mental e apoio psicossocial',
      'Atividades recreativas',
      'Transição para soluções duradouras'
    ]
  }
];

// ============================================
// VÍDEOS EDUCATIVOS
// ============================================

export const videosEducativos: DocumentoOficial[] = [
  {
    id: 'video-001',
    titulo: 'O que fazer em caso de enchente',
    orgao: 'Defesa Civil Nacional',
    tipo: 'video',
    categoria: 'educativo',
    descricao: 'Vídeo educativo de 5 minutos com orientações essenciais para população em áreas de risco de enchente.',
    urlDownload: 'https://www.youtube.com/watch?v=exemplo-enchente',
    dataPublicacao: '2023-01-10',
    relevancia: 'essencial',
    tags: ['educativo', 'enchente', 'população', 'orientações']
  },
  {
    id: 'video-002',
    titulo: 'Como montar um Kit de Emergência',
    orgao: 'Defesa Civil RS',
    tipo: 'video',
    categoria: 'educativo',
    descricao: 'Tutorial passo a passo para montar um kit de emergência familiar com itens essenciais.',
    urlDownload: 'https://www.youtube.com/watch?v=exemplo-kit',
    dataPublicacao: '2023-03-05',
    relevancia: 'recomendado',
    tags: ['kit emergência', 'preparação', 'família', 'tutorial']
  }
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export const getTodosDocumentos = (): DocumentoOficial[] => {
  return [
    ...documentosMinisterioPublico,
    ...documentosDefesaCivil,
    ...documentosDefesaCivilRS,
    ...videosEducativos
  ];
};

export const getTodosCursos = (): CursoTreinamento[] => {
  return [
    ...cursosENAP,
    ...cursosUniversidades,
    ...cursosDefesaCivil
  ];
};

export const getCursosGratuitos = (): CursoTreinamento[] => {
  return getTodosCursos().filter(curso => curso.gratuito);
};

export const getDocumentosPorCategoria = (categoria: string): DocumentoOficial[] => {
  return getTodosDocumentos().filter(doc => doc.categoria === categoria);
};

export const getCursosPorNivel = (nivel: string): CursoTreinamento[] => {
  return getTodosCursos().filter(curso => curso.nivel === nivel);
};

export const getDocumentosEssenciais = (): DocumentoOficial[] => {
  return getTodosDocumentos().filter(doc => doc.relevancia === 'essencial');
};
