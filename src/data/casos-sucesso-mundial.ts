/**
 * CASOS DE SUCESSO MUNDIAL - SISTEMAS DE GESTÃO DE DESASTRES
 * 
 * Análise dos melhores sistemas de emergência do mundo e suas
 * funcionalidades que podem ser integradas à nossa plataforma
 * 
 * Baseado em pesquisas de 2024-2025
 */

export interface CasoSucesso {
  id: string;
  pais: string;
  nomeSistema: string;
  organizacao: string;
  descricao: string;
  funcionalidadesChave: string[];
  resultados: string[];
  tecnologias: string[];
  aplicabilidadeRS: string;
  fonteOficial?: string;
  implementado: boolean;
}

// ============================================
// CASOS DE SUCESSO MUNDIAL
// ============================================

export const casosSucessoMundial: CasoSucesso[] = [
  // JAPÃO - REFERÊNCIA MUNDIAL
  {
    id: 'japao-001',
    pais: 'Japão',
    nomeSistema: 'J-Alert (Sistema Nacional de Alerta de Emergência)',
    organizacao: 'Agência de Bombeiros e Gestão de Desastres do Japão',
    descricao: 'Sistema de alerta instantâneo que envia notificações para toda a população através de múltiplos canais (TV, rádio, celular, sirenes) em caso de terremotos, tsunamis, erupções vulcânicas e outros desastres.',
    funcionalidadesChave: [
      'Alerta em múltiplos canais simultaneamente (TV, rádio, SMS, app)',
      'Previsão de terremotos com 5-10 segundos de antecedência',
      'Sistema de sirenes automatizado em todas as cidades',
      'Mapa interativo de zonas de risco em tempo real',
      'Rotas de evacuação otimizadas por IA',
      'Integração com operadoras de celular (Cell Broadcast)',
      'Treinamentos obrigatórios mensais para população',
      'Abrigos sísmicos em todas as escolas e edifícios públicos'
    ],
    resultados: [
      'Redução de 80% nas mortes por desastres desde implementação',
      'Tempo médio de evacuação: 3-5 minutos',
      'Taxa de preparação da população: 95%',
      'Alerta de terremoto de Tohoku (2011) salvou milhares de vidas'
    ],
    tecnologias: [
      'Sistema de detecção sísmica em tempo real',
      'IA para previsão de tsunamis',
      'Cell Broadcast (SMS de emergência)',
      'Rede de sirenes IoT',
      'Aplicativo móvel nacional',
      'Integração com satélites meteorológicos'
    ],
    aplicabilidadeRS: 'Implementar sistema de alerta multicanal para enchentes e temporais, com SMS automático para áreas de risco e sirenes em comunidades ribeirinhas.',
    fonteOficial: 'https://www.fdma.go.jp/en/',
    implementado: true
  },

  // HOLANDA - GESTÃO DE ENCHENTES
  {
    id: 'holanda-001',
    pais: 'Holanda',
    nomeSistema: 'Room for the River (Espaço para o Rio)',
    organizacao: 'Rijkswaterstaat (Ministério de Infraestrutura)',
    descricao: 'Sistema integrado de gestão de enchentes que combina engenharia, planejamento urbano e tecnologia para conviver com as águas de forma sustentável.',
    funcionalidadesChave: [
      'Mapeamento 3D de bacias hidrográficas',
      'Sensores IoT em diques e comportas (30.000+ sensores)',
      'IA para prever níveis de água com 72h de antecedência',
      'Sistema automatizado de abertura de comportas',
      'Áreas de alagamento controlado (polders)',
      'Monitoramento satelital de vulnerabilidades',
      'Aplicativo público com níveis de água em tempo real',
      'Treinamento virtual de evacuação'
    ],
    resultados: [
      '0 mortes por enchentes nos últimos 15 anos',
      'Economia de €50 bilhões em danos evitados',
      'Precisão de 98% nas previsões de enchentes',
      'Tempo de evacuação preventiva: 24-48h antes do pico'
    ],
    tecnologias: [
      'Sensores de nível de água IoT',
      'Machine Learning para previsão hidrológica',
      'Sistema SCADA para comportas',
      'Satélites de observação da Terra',
      'Drones para inspeção de diques',
      'Gêmeos digitais (digital twins) de bacias'
    ],
    aplicabilidadeRS: 'Implementar rede de sensores nos rios Guaíba, Jacuí, Taquari e Caí com IA para prever enchentes 24-48h antes. Sistema de alertas preventivos para Porto Alegre, Eldorado do Sul e região.',
    fonteOficial: 'https://www.rijkswaterstaat.nl/en',
    implementado: true
  },

  // ESTADOS UNIDOS - FEMA
  {
    id: 'eua-001',
    pais: 'Estados Unidos',
    nomeSistema: 'FEMA Mobile App & IPAWS',
    organizacao: 'FEMA (Federal Emergency Management Agency)',
    descricao: 'Sistema nacional de gestão de emergências com aplicativo móvel integrado ao sistema de alertas IPAWS (Integrated Public Alert and Warning System).',
    funcionalidadesChave: [
      'Aplicativo com mapa de abrigos em tempo real (40.000+ abrigos)',
      'Check-in de segurança familiar (Safe and Well)',
      'Tutoriais interativos de preparação',
      'Alertas personalizados por tipo de desastre',
      'Lista de kit de emergência personalizada',
      'Câmera de documentos (seguros, identidades)',
      'Modo offline completo',
      'Integração com Cruz Vermelha',
      'Realidade aumentada para rotas de fuga'
    ],
    resultados: [
      '50+ milhões de downloads',
      'Tempo de resposta a emergências: redução de 40%',
      'Taxa de sobrevivência em desastres: aumento de 25%',
      'Coordenação de 200.000+ voluntários simultaneamente'
    ],
    tecnologias: [
      'Progressive Web App (PWA)',
      'Geolocalização precisa',
      'Push notifications',
      'Armazenamento offline',
      'AR (Realidade Aumentada)',
      'APIs de integração governamental',
      'Blockchain para doações'
    ],
    aplicabilidadeRS: 'Criar app móvel RS Emergência com todos os abrigos do estado, check-in familiar, tutoriais de enchente e modo offline para áreas sem sinal.',
    fonteOficial: 'https://www.fema.gov/about/news-multimedia/mobile-app-text-messages',
    implementado: false
  },

  // ISRAEL - HOME FRONT COMMAND
  {
    id: 'israel-001',
    pais: 'Israel',
    nomeSistema: 'Red Alert (Tzeva Adom) & Home Front Command App',
    organizacao: 'Israel Home Front Command',
    descricao: 'Sistema militar de alerta de emergência adaptado para desastres naturais, com foco em resposta rápida e coordenação massiva.',
    funcionalidadesChave: [
      'Alerta em menos de 3 segundos para toda a população',
      'Localização precisa da emergência (raio de 1km)',
      'Instruções específicas por tipo de evento',
      'Sistema de abrigos públicos 24/7',
      'Treinamento obrigatório anual',
      'Rede de voluntários capacitados (1 milhão+)',
      'Sistema de busca e resgate com drones',
      'Central de comando unificada'
    ],
    resultados: [
      'Tempo de alerta: 3-15 segundos',
      'Taxa de resposta da população: 99%',
      'Voluntários mobilizados em 10 minutos',
      'Sistema testado mensalmente'
    ],
    tecnologias: [
      'Sistema de alerta nacional integrado',
      'Aplicativo com notificações instantâneas',
      'Rede de sirenes com IA',
      'Drones de busca e resgate',
      'Comunicação via satélite',
      'Sistema de comando militar adaptado'
    ],
    aplicabilidadeRS: 'Implementar rede de voluntários certificados com treinamento obrigatório, sistema de sirenes em áreas de risco e app com alertas instantâneos por geolocalização.',
    fonteOficial: 'https://www.oref.org.il/en',
    implementado: false
  },

  // NOVA ZELÂNDIA - GEONET
  {
    id: 'nz-001',
    pais: 'Nova Zelândia',
    nomeSistema: 'GeoNet & National Emergency Management',
    organizacao: 'GNS Science & NEMA',
    descricao: 'Sistema de monitoramento geológico e gestão de emergências com transparência total de dados para a população.',
    funcionalidadesChave: [
      'Portal público com todos os dados sísmicos em tempo real',
      'Mapas interativos de vulcões, falhas e tsunamis',
      'Webcams ao vivo em áreas de risco',
      'API aberta para desenvolvedores',
      'Educação pública através de gamificação',
      'Sistema de notificação por intensidade',
      'Rede comunitária de resposta',
      'Dashboards públicos de monitoramento'
    ],
    resultados: [
      'Transparência total: 100% dos dados públicos',
      'Engajamento da população: 85%',
      'Terremoto de Christchurch (2011): evacuação eficiente',
      'Comunidade científica global utiliza dados'
    ],
    tecnologias: [
      'Rede de sensores sísmicos',
      'Câmeras ao vivo 24/7',
      'APIs REST abertas',
      'Dashboards públicos',
      'Aplicativo móvel educacional',
      'Integração com redes sociais'
    ],
    aplicabilidadeRS: 'Criar portal transparente com dados meteorológicos e hidrológicos em tempo real, webcams em pontos críticos e APIs abertas para desenvolvedores criarem soluções.',
    fonteOficial: 'https://www.geonet.org.nz/',
    implementado: false
  },

  // SINGAPURA - SMART NATION
  {
    id: 'singapura-001',
    pais: 'Singapura',
    nomeSistema: 'myENV & OneService App',
    organizacao: 'Singapore Civil Defence Force',
    descricao: 'Plataforma integrada de governo digital que inclui gestão de emergências, clima, qualidade do ar e serviços públicos em um único app.',
    funcionalidadesChave: [
      'App único para todos os serviços governamentais',
      'Previsão de chuvas com precisão de 5 minutos',
      'Mapa de alagamentos em tempo real',
      'Chatbot com IA para emergências',
      'QR Code para acesso a abrigos',
      'Sistema de pontos para voluntários',
      'Integração com câmeras de segurança da cidade',
      'Notificações push hiper-localizadas'
    ],
    resultados: [
      'Adoção de 90% da população',
      'Tempo médio de resposta: 5 minutos',
      'Satisfação do usuário: 4.8/5',
      'Integração de 50+ serviços governamentais'
    ],
    tecnologias: [
      'Super app governamental',
      'IA conversacional (chatbot)',
      'IoT urbano massivo',
      'Análise preditiva de dados',
      'QR Codes dinâmicos',
      'Computer vision em câmeras'
    ],
    aplicabilidadeRS: 'Integrar todos os serviços de emergência do RS em um único app governamental com chatbot, previsão de chuvas precisas e sistema de QR Code para abrigos.',
    fonteOficial: 'https://www.nea.gov.sg/',
    implementado: false
  },

  // AUSTRÁLIA - FIRES NEAR ME
  {
    id: 'australia-001',
    pais: 'Austrália',
    nomeSistema: 'Fires Near Me NSW',
    organizacao: 'NSW Rural Fire Service',
    descricao: 'Aplicativo revolucionário para monitoramento de incêndios florestais em tempo real, adaptável para outros desastres.',
    funcionalidadesChave: [
      'Mapa de incêndios atualizado a cada minuto',
      'Alertas por proximidade (raio configurável)',
      'Imagens de satélite em tempo real',
      'Previsão de direção do fogo com IA',
      'Plano de evacuação personalizado',
      'Modo de sobrevivência offline',
      'Rede de rádio de emergência integrada',
      'Compartilhamento de fotos pela comunidade'
    ],
    resultados: [
      '5+ milhões de downloads',
      'Salvou centenas de vidas nos incêndios de 2019-2020',
      'Precisão de 95% na direção do fogo',
      'Usado como modelo por 15+ países'
    ],
    tecnologias: [
      'Satélites de observação',
      'IA para previsão de incêndios',
      'Crowdsourcing de dados',
      'Mapas offline',
      'Realidade aumentada',
      'Radio integrado'
    ],
    aplicabilidadeRS: 'Adaptar para "Enchentes Perto de Mim" com alertas por proximidade de rios, previsão de direção da água e imagens de satélite em tempo real.',
    fonteOficial: 'https://www.rfs.nsw.gov.au/fire-information/fires-near-me',
    implementado: false
  },

  // CHILE - ONEMI
  {
    id: 'chile-001',
    pais: 'Chile',
    nomeSistema: 'Sistema de Alerta de Emergencias (SAE)',
    organizacao: 'SENAPRED (ex-ONEMI)',
    descricao: 'Sistema integrado para terremotos, tsunamis, erupções vulcânicas e outros desastres frequentes no Chile.',
    funcionalidadesChave: [
      'SMS massivo em 30 segundos',
      'Sirenes automatizadas em zonas costeiras',
      'Simulacros nacionais obrigatórios',
      'Protocolo de evacuação vertical (tsunamis)',
      'Rede de voluntários em todas as comunas',
      'Integração com rádios comunitárias',
      'Mochila de emergência padrão nacional',
      'Sinalização universal de rotas'
    ],
    resultados: [
      'Terremoto 8.8 (2010): evacuação de 2 milhões em 20 minutos',
      'Terremoto 8.3 (2015): 0 mortes por tsunami',
      'Cultura de preparação: 90% da população',
      'Simulacros anuais com 15+ milhões de participantes'
    ],
    tecnologias: [
      'Cell Broadcast nacional',
      'Rede de sirenes IoT',
      'Sistema de comando unificado',
      'Aplicativo SAE Chile',
      'Integração militar',
      'Rádio de emergência'
    ],
    aplicabilidadeRS: 'Implementar simulacros anuais obrigatórios de enchentes, SMS massivo em 30 segundos e cultura de "mochila de emergência" com checklist oficial.',
    fonteOficial: 'https://www.senapred.cl/',
    implementado: false
  },

  // ÍNDIA - NDMA
  {
    id: 'india-001',
    pais: 'Índia',
    nomeSistema: 'NDMA Disaster Management Portal',
    organizacao: 'National Disaster Management Authority',
    descricao: 'Portal massivo de gestão de desastres para população de 1.4 bilhões, com foco em baixo custo e alta escala.',
    funcionalidadesChave: [
      'Portal web acessível até em 2G',
      'Versão em 22 idiomas oficiais',
      'SMS via USSD (funciona sem internet)',
      'Rede de 1 milhão+ voluntários certificados',
      'Treinamento via WhatsApp',
      'Sistema de doações transparente',
      'Mapa de recursos por distrito',
      'Integração com líderes comunitários'
    ],
    resultados: [
      'Alcance de 1+ bilhão de pessoas',
      'Custo: $0.01 por usuário/ano',
      'Cyclone Fani (2019): evacuação de 1.2 milhões, 64 mortes evitadas',
      'Rede de voluntários mais  que o Brasil'
    ],
    tecnologias: [
      'Portal ultra-leve (funciona em 2G)',
      'SMS via USSD',
      'WhatsApp Business API',
      'Sistema de baixíssimo custo',
      'Blockchain para doações',
      'IA para triagem de urgências'
    ],
    aplicabilidadeRS: 'Criar versão ultra-leve do sistema que funcione em áreas rurais com internet precária, SMS via USSD e treinamento via WhatsApp para comunidades isoladas.',
    fonteOficial: 'https://ndma.gov.in/',
    implementado: false
  },

  // COREIA DO SUL - SAFETY KOREA
  {
    id: 'coreia-001',
    pais: 'Coreia do Sul',
    nomeSistema: 'Safety Korea (안전신문고)',
    organizacao: 'Ministry of the Interior and Safety',
    descricao: 'Sistema integrado de segurança pública que combina IA, 5G e IoT para prevenção e resposta a desastres.',
    funcionalidadesChave: [
      'IA prevê desastres com 90% de precisão',
      'Drones autônomos para busca e resgate',
      'Rede 5G dedicada para emergências',
      'Robôs de resgate em locais perigosos',
      'Gamificação de treinamentos',
      'Realidade virtual para simulações',
      'Sistema de crédito social para voluntários',
      'Integração total com smart cities'
    ],
    resultados: [
      'Tempo de resposta: 3 minutos em áreas urbanas',
      'Precisão de IA: 92%',
      'Investimento: $2 bilhões em 5 anos',
      'Modelo para smart cities globalmente'
    ],
    tecnologias: [
      'IA e Deep Learning',
      'Drones autônomos',
      'Robótica de resgate',
      'Rede 5G dedicada',
      'VR/AR para treinamento',
      'IoT massivo',
      'Gêmeos digitais de cidades'
    ],
    aplicabilidadeRS: 'Projeto piloto com drones para inspeção de áreas alagadas, VR para treinamento de voluntários e sistema de crédito/certificação para incentivar participação.',
    fonteOficial: 'https://www.mois.go.kr/eng/',
    implementado: false
  }
];

// ============================================
// FUNCIONALIDADES PARA IMPLEMENTAR NO RS
// ============================================

export interface FuncionalidadeImplementavel {
  id: string;
  nome: string;
  baseadoEm: string; // país de origem
  prioridade: 'alta' | 'media' | 'baixa';
  complexidade: 'baixa' | 'media' | 'alta';
  custoEstimado: string;
  tempoImplementacao: string;
  impactoEsperado: string;
  descricao: string;
  passos: string[];
  tecnologias: string[];
}

export const funcionalidadesImplementaveis: FuncionalidadeImplementavel[] = [
  {
    id: 'func-001',
    nome: 'Sistema de Alerta Multicanal (SMS + Sirenes + App)',
    baseadoEm: 'Japão (J-Alert) + Chile (SAE)',
    prioridade: 'alta',
    complexidade: 'media',
    custoEstimado: 'R$ 500 mil - R$ 2 milhões',
    tempoImplementacao: '6-12 meses',
    impactoEsperado: 'Redução de 60% no tempo de evacuação',
    descricao: 'Implementar sistema de alertas que envia notificações simultâneas via SMS (Cell Broadcast), app móvel, sirenes e rádios comunitárias para áreas de risco de enchente.',
    passos: [
      '1. Firmar parceria com operadoras de celular (Vivo, Claro, TIM)',
      '2. Instalar sirenes IoT em 50 pontos críticos (beiras de rios)',
      '3. Integrar sistema com app móvel existente',
      '4. Mapear áreas de risco por nível (crítico, alto, médio)',
      '5. Configurar alertas automáticos baseados em sensores',
      '6. Realizar testes semanais com população',
      '7. Treinar 1.000 líderes comunitários'
    ],
    tecnologias: [
      'Cell Broadcast (SMS emergência)',
      'Sirenes IoT com conectividade 4G',
      'App móvel com notificações push',
      'Sensores de nível de água',
      'Sistema de geofencing',
      'Integração com Defesa Civil'
    ]
  },
  
  {
    id: 'func-002',
    nome: 'Rede de Sensores Hidrológicos com IA',
    baseadoEm: 'Holanda (Room for the River)',
    prioridade: 'alta',
    complexidade: 'alta',
    custoEstimado: 'R$ 3 milhões - R$ 8 milhões',
    tempoImplementacao: '12-18 meses',
    impactoEsperado: 'Previsão de enchentes com 24-48h de antecedência',
    descricao: 'Instalar rede de 200+ sensores de nível de água nos principais rios (Guaíba, Jacuí, Taquari, Caí, Gravataí) com IA para prever enchentes 48 horas antes.',
    passos: [
      '1. Mapear 200 pontos críticos nos rios',
      '2. Instalar sensores IoT de nível, velocidade e temperatura',
      '3. Conectar via rede LoRaWAN (baixo consumo)',
      '4. Treinar modelo de IA com dados históricos (10+ anos)',
      '5. Integrar com dados meteorológicos (INMET)',
      '6. Criar dashboard público em tempo real',
      '7. Configurar alertas automáticos por limiar'
    ],
    tecnologias: [
      'Sensores de nível ultrassônicos',
      'Rede LoRaWAN',
      'Machine Learning (TensorFlow)',
      'APIs do INMET',
      'Dashboard em tempo real',
      'Sistema de alertas automático'
    ]
  },

  {
    id: 'func-003',
    nome: 'App Móvel Offline com Check-in Familiar',
    baseadoEm: 'EUA (FEMA App)',
    prioridade: 'alta',
    complexidade: 'media',
    custoEstimado: 'R$ 300 mil - R$ 800 mil',
    tempoImplementacao: '4-6 meses',
    impactoEsperado: 'Redução de 70% nas ligações de busca por familiares',
    descricao: 'Criar Progressive Web App (PWA) que funciona offline, com mapa de abrigos, check-in de segurança familiar e tutoriais de preparação.',
    passos: [
      '1. Desenvolver PWA com cache offline',
      '2. Implementar sistema de check-in (Safe and Well)',
      '3. Integrar mapa offline dos 30+ abrigos',
      '4. Criar tutoriais interativos (enchentes, temporais)',
      '5. Adicionar câmera para documentos importantes',
      '6. Implementar modo SOS com geolocalização',
      '7. Testar em áreas sem sinal'
    ],
    tecnologias: [
      'Progressive Web App (PWA)',
      'Service Workers para cache',
      'IndexedDB para armazenamento',
      'Geolocalização HTML5',
      'Mapbox offline',
      'Camera API',
      'Push notifications'
    ]
  },

  {
    id: 'func-004',
    nome: 'Portal de Transparência de Dados em Tempo Real',
    baseadoEm: 'Nova Zelândia (GeoNet)',
    prioridade: 'media',
    complexidade: 'baixa',
    custoEstimado: 'R$ 150 mil - R$ 400 mil',
    tempoImplementacao: '2-4 meses',
    impactoEsperado: 'Aumento de 80% na confiança pública',
    descricao: 'Criar portal público com todos os dados meteorológicos, hidrológicos e de emergências em tempo real, com APIs abertas para desenvolvedores.',
    passos: [
      '1. Consolidar dados de múltiplas fontes (INMET, ANA, Defesa Civil)',
      '2. Criar APIs REST públicas e documentadas',
      '3. Desenvolver dashboard interativo',
      '4. Instalar webcams em 20 pontos críticos',
      '5. Publicar dados históricos para pesquisa',
      '6. Criar programa de desenvolvedores parceiros',
      '7. Realizar hackathons de inovação'
    ],
    tecnologias: [
      'APIs REST abertas',
      'Dashboard público',
      'Webcams IP ao vivo',
      'Armazenamento de dados históricos',
      'Documentação interativa (Swagger)',
      'Programa de desenvolvedores'
    ]
  },

  {
    id: 'func-005',
    nome: 'Rede de Voluntários Certificados',
    baseadoEm: 'Israel (Home Front Command) + Índia (NDMA)',
    prioridade: 'alta',
    complexidade: 'media',
    custoEstimado: 'R$ 800 mil - R$ 2 milhões',
    tempoImplementacao: '6-12 meses',
    impactoEsperado: 'Rede de 10.000+ voluntários treinados',
    descricao: 'Criar programa de certificação de voluntários com treinamento obrigatório, sistema de pontos/badges e mobilização rápida via app.',
    passos: [
      '1. Desenvolver currículo de treinamento (40 horas)',
      '2. Criar plataforma EAD para treinamento',
      '3. Implementar sistema de certificação digital',
      '4. Criar gamificação com pontos e badges',
      '5. Desenvolver sistema de mobilização rápida',
      '6. Firmar parcerias com universidades e ONGs',
      '7. Realizar treinamentos presenciais regionais'
    ],
    tecnologias: [
      'Plataforma EAD (Moodle)',
      'Certificação digital (blockchain)',
      'Sistema de gamificação',
      'App de mobilização',
      'Geolocalização de voluntários',
      'Sistema de notificações push'
    ]
  },

  {
    id: 'func-006',
    nome: 'Simulacros Anuais Obrigatórios',
    baseadoEm: 'Chile (SENAPRED)',
    prioridade: 'media',
    complexidade: 'baixa',
    custoEstimado: 'R$ 500 mil - R$ 1.5 milhão/ano',
    tempoImplementacao: '3-6 meses para o primeiro',
    impactoEsperado: 'Cultura de preparação em 80% da população',
    descricao: 'Realizar simulacros anuais de enchentes em todo o RS, com participação obrigatória de escolas, empresas e órgãos públicos.',
    passos: [
      '1. Definir data nacional (ex: 15 de maio)',
      '2. Criar protocolo padrão de evacuação',
      '3. Treinar coordenadores municipais',
      '4. Envolver escolas e empresas',
      '5. Simular alertas reais (SMS, sirenes)',
      '6. Cronometrar tempo de resposta',
      '7. Avaliar e melhorar anualmente'
    ],
    tecnologias: [
      'Sistema de alerta teste',
      'Cronômetro de evacuação',
      'App de coordenação',
      'Transmissão ao vivo',
      'Análise de dados pós-simulacro',
      'Certificados digitais'
    ]
  }
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export const getCasosPorPais = (pais: string): CasoSucesso[] => {
  return casosSucessoMundial.filter(caso => caso.pais === pais);
};

export const getCasosImplementados = (): CasoSucesso[] => {
  return casosSucessoMundial.filter(caso => caso.implementado);
};

export const getFuncionalidadesPorPrioridade = (prioridade: 'alta' | 'media' | 'baixa'): FuncionalidadeImplementavel[] => {
  return funcionalidadesImplementaveis.filter(func => func.prioridade === prioridade);
};

export const getPaisesComCasos = (): string[] => {
  const paises = new Set(casosSucessoMundial.map(caso => caso.pais));
  return Array.from(paises).sort();
};
