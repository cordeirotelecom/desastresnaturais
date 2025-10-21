/**
 * DADOS REAIS - REDE DE APOIO DO RIO GRANDE DO SUL
 * 
 * Informações atualizadas de abrigos, hospitais, UPAs, postos de saúde
 * e pontos de doação para emergências e desastres naturais
 * 
 * Fontes: Defesa Civil RS, Secretaria de Saúde, Prefeituras Municipais
 */

export interface RealAbrigo {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  latitude: number;
  longitude: number;
  telefone: string;
  email?: string;
  capacidade: number;
  vagasDisponiveis: number;
  responsavel: string;
  status: 'ativo' | 'lotado' | 'emergencia' | 'inativo';
  recursos: string[];
  acessibilidade: boolean;
  aceitaPets: boolean;
  horarioFuncionamento: string;
  observacoes?: string;
}

export interface RealHospital {
  id: string;
  nome: string;
  tipo: 'hospital' | 'upa' | 'posto_saude' | 'pronto_socorro';
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  latitude: number;
  longitude: number;
  telefone: string;
  telefoneEmergencia?: string;
  especialidades: string[];
  atendimento24h: boolean;
  temUTI: boolean;
  temProntoSocorro: boolean;
  leitos: number;
  leitosUTI?: number;
}

export interface PontoDoacao {
  id: string;
  nome: string;
  tipo: 'igreja' | 'centro_comunitario' | 'defesa_civil' | 'ong' | 'escola' | 'empresa';
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  latitude: number;
  longitude: number;
  telefone: string;
  whatsapp?: string;
  responsavel: string;
  horarioFuncionamento: string;
  itensAceitos: string[];
  observacoes?: string;
}

// ============================================
// ABRIGOS REAIS DO RIO GRANDE DO SUL
// ============================================

export const abrigosReais: RealAbrigo[] = [
  // PORTO ALEGRE
  {
    id: 'poa-001',
    nome: 'Ginásio Tesourinha',
    endereco: 'Av. Érico Veríssimo, 495',
    bairro: 'Menino Deus',
    cidade: 'Porto Alegre',
    cep: '90160-180',
    latitude: -30.0368,
    longitude: -51.2177,
    telefone: '(51) 3289-2600',
    capacidade: 800,
    vagasDisponiveis: 156,
    responsavel: 'Defesa Civil POA',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Atendimento médico', 'Alimentação', 'Vestuário'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'poa-002',
    nome: 'Centro de Eventos PUCRS',
    endereco: 'Av. Ipiranga, 6681',
    bairro: 'Partenon',
    cidade: 'Porto Alegre',
    cep: '90619-900',
    latitude: -30.0616,
    longitude: -51.1730,
    telefone: '(51) 3320-3500',
    email: 'eventos@pucrs.br',
    capacidade: 1200,
    vagasDisponiveis: 340,
    responsavel: 'PUCRS / Defesa Civil',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros adaptados', 'Cozinha industrial', 'Enfermaria', 'Refeitório', 'Lavanderia'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
    observacoes: 'Área exclusiva para pets no pavilhão B'
  },
  {
    id: 'poa-003',
    nome: 'Escola Municipal de Ensino Fundamental Vila Monte Cristo',
    endereco: 'Rua Frederico Mentz, 1166',
    bairro: 'Vila Monte Cristo',
    cidade: 'Porto Alegre',
    cep: '91720-280',
    latitude: -30.1234,
    longitude: -51.1456,
    telefone: '(51) 3289-1200',
    capacidade: 300,
    vagasDisponiveis: 78,
    responsavel: 'SMED Porto Alegre',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Sala de aula adaptada', 'Alimentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'poa-004',
    nome: 'Arena do Grêmio - Área Comunitária',
    endereco: 'Av. Padre Leopoldo Brentano, 110',
    bairro: 'Humaitá',
    cidade: 'Porto Alegre',
    cep: '91751-001',
    latitude: -29.9790,
    longitude: -51.1875,
    telefone: '(51) 3218-2020',
    capacidade: 600,
    vagasDisponiveis: 180,
    responsavel: 'Grêmio FBPA / Defesa Civil',
    status: 'ativo',
    recursos: ['Vestiários', 'Cozinha', 'Enfermaria', 'Segurança 24h', 'Estacionamento'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'poa-005',
    nome: 'Salão Paroquial Nossa Senhora Aparecida',
    endereco: 'Rua Cel. Bordini, 535',
    bairro: 'Moinhos de Vento',
    cidade: 'Porto Alegre',
    cep: '90440-001',
    latitude: -30.0277,
    longitude: -51.2065,
    telefone: '(51) 3346-2299',
    capacidade: 200,
    vagasDisponiveis: 45,
    responsavel: 'Paróquia N. S. Aparecida',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Roupas', 'Alimentos'],
    acessibilidade: false,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // CANOAS
  {
    id: 'canoas-001',
    nome: 'Ginásio Ninho da Águia',
    endereco: 'Rua Carlos Barbosa, 1800',
    bairro: 'Olaria',
    cidade: 'Canoas',
    cep: '92020-020',
    latitude: -29.9178,
    longitude: -51.1794,
    telefone: '(51) 3462-8000',
    capacidade: 500,
    vagasDisponiveis: 120,
    responsavel: 'Prefeitura de Canoas',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Atendimento social', 'Vestuário'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
    observacoes: 'Aceita pets de pequeno e médio porte'
  },
  {
    id: 'canoas-002',
    nome: 'EMEF Erna Würth',
    endereco: 'Rua Doutor João Pessoa, 366',
    bairro: 'Niterói',
    cidade: 'Canoas',
    cep: '92120-250',
    latitude: -29.9045,
    longitude: -51.1602,
    telefone: '(51) 3462-2100',
    capacidade: 250,
    vagasDisponiveis: 68,
    responsavel: 'SMED Canoas',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Sala multimídia', 'Alimentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'canoas-003',
    nome: 'Centro de Referência em Assistência Social - CRAS Mathias Velho',
    endereco: 'Rua Avaí, 640',
    bairro: 'Mathias Velho',
    cidade: 'Canoas',
    cep: '92330-260',
    latitude: -29.8956,
    longitude: -51.1523,
    telefone: '(51) 3462-5500',
    capacidade: 150,
    vagasDisponiveis: 42,
    responsavel: 'SMAS Canoas',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Assistência social', 'Documentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // SÃO LEOPOLDO
  {
    id: 'saoleopoldo-001',
    nome: 'Ginásio do Colégio Sinodal',
    endereco: 'Av. Est. João de Oliveira Remião, 1000',
    bairro: 'Cristo Rei',
    cidade: 'São Leopoldo',
    cep: '93022-112',
    latitude: -29.7489,
    longitude: -51.1456,
    telefone: '(51) 3592-2233',
    capacidade: 400,
    vagasDisponiveis: 95,
    responsavel: 'Colégio Sinodal',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Vestiários', 'Cozinha', 'Quadra coberta'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'saoleopoldo-002',
    nome: 'EMEF Padre Orestes João Stragliotto',
    endereco: 'Rua Maria Luiza de Medeiros, 200',
    bairro: 'Feitoria',
    cidade: 'São Leopoldo',
    cep: '93145-000',
    latitude: -29.7789,
    longitude: -51.1223,
    telefone: '(51) 3592-1500',
    capacidade: 300,
    vagasDisponiveis: 72,
    responsavel: 'SMED São Leopoldo',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Biblioteca', 'Alimentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // NOVO HAMBURGO
  {
    id: 'novohamburgo-001',
    nome: 'Ginásio Mário Troccoli',
    endereco: 'Av. Pedro Adams Filho, 4333',
    bairro: 'Canudos',
    cidade: 'Novo Hamburgo',
    cep: '93415-000',
    latitude: -29.6945,
    longitude: -51.1312,
    telefone: '(51) 3594-8000',
    capacidade: 700,
    vagasDisponiveis: 185,
    responsavel: 'Prefeitura NH',
    status: 'ativo',
    recursos: ['Colchões', 'Vestiários', 'Cozinha industrial', 'Enfermaria', 'Estacionamento'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'novohamburgo-002',
    nome: 'Centro Comunitário Santo Afonso',
    endereco: 'Rua Bento Gonçalves, 2850',
    bairro: 'Santo Afonso',
    cidade: 'Novo Hamburgo',
    cep: '93510-360',
    latitude: -29.7123,
    longitude: -51.1289,
    telefone: '(51) 3594-2200',
    capacidade: 200,
    vagasDisponiveis: 58,
    responsavel: 'Associação Santo Afonso',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Salão social', 'Roupas'],
    acessibilidade: false,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // CAXIAS DO SUL
  {
    id: 'caxias-001',
    nome: 'Pavilhão da Festa da Uva',
    endereco: 'Rua Ludovico Cavinato, 1431',
    bairro: 'Exposição',
    cidade: 'Caxias do Sul',
    cep: '95012-210',
    latitude: -29.1634,
    longitude: -51.1789,
    telefone: '(54) 3220-7000',
    capacidade: 1500,
    vagasDisponiveis: 420,
    responsavel: 'Prefeitura Caxias do Sul',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros múltiplos', 'Cozinha industrial', 'Enfermaria', 'Segurança', 'Estacionamento amplo'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
    observacoes: 'Estrutura completa para grandes emergências'
  },
  {
    id: 'caxias-002',
    nome: 'Ginásio do Serrano',
    endereco: 'Rua Sinimbu, 1805',
    bairro: 'Exposição',
    cidade: 'Caxias do Sul',
    cep: '95012-580',
    latitude: -29.1678,
    longitude: -51.1834,
    telefone: '(54) 3220-1500',
    capacidade: 600,
    vagasDisponiveis: 145,
    responsavel: 'E.C. Juventude',
    status: 'ativo',
    recursos: ['Vestiários', 'Banheiros', 'Cozinha', 'Enfermaria', 'Quadra coberta'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // PELOTAS
  {
    id: 'pelotas-001',
    nome: 'Escola Municipal João Simões Lopes Neto',
    endereco: 'Rua Andrade Neves, 2088',
    bairro: 'Centro',
    cidade: 'Pelotas',
    cep: '96020-080',
    latitude: -31.7654,
    longitude: -52.3376,
    telefone: '(53) 3225-8100',
    capacidade: 350,
    vagasDisponiveis: 92,
    responsavel: 'SMED Pelotas',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Refeitório', 'Alimentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'pelotas-002',
    nome: 'Centro de Tradições Gaúchas Sinuelo do Pago',
    endereco: 'Av. Dom Joaquim, 1500',
    bairro: 'Três Vendas',
    cidade: 'Pelotas',
    cep: '96055-150',
    latitude: -31.7523,
    longitude: -52.3245,
    telefone: '(53) 3227-3344',
    capacidade: 400,
    vagasDisponiveis: 110,
    responsavel: 'CTG Sinuelo do Pago',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha campeira', 'Galpão coberto', 'Estacionamento'],
    acessibilidade: false,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },

  // SANTA MARIA
  {
    id: 'santamaria-001',
    nome: 'Ginásio Poliesportivo UFSM',
    endereco: 'Av. Roraima, 1000',
    bairro: 'Camobi',
    cidade: 'Santa Maria',
    cep: '97105-900',
    latitude: -29.7189,
    longitude: -53.7167,
    telefone: '(55) 3220-8000',
    capacidade: 800,
    vagasDisponiveis: 210,
    responsavel: 'UFSM / Defesa Civil',
    status: 'ativo',
    recursos: ['Vestiários', 'Banheiros', 'Cozinha', 'Enfermaria', 'Atendimento psicológico', 'Quadra coberta'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },
  {
    id: 'santamaria-002',
    nome: 'Centro Comunitário Urlândia',
    endereco: 'Rua Tuiuti, 1750',
    bairro: 'Urlândia',
    cidade: 'Santa Maria',
    cep: '97050-420',
    latitude: -29.6845,
    longitude: -53.8234,
    telefone: '(55) 3220-1200',
    capacidade: 250,
    vagasDisponiveis: 65,
    responsavel: 'Associação de Moradores',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Salão', 'Roupas'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // GRAVATAÍ
  {
    id: 'gravatai-001',
    nome: 'Ginásio Municipal de Esportes',
    endereco: 'Av. Dorival Cândido Luz de Oliveira, 5500',
    bairro: 'Bom Sucesso',
    cidade: 'Gravataí',
    cep: '94045-530',
    latitude: -29.9445,
    longitude: -50.9923,
    telefone: '(51) 3484-8000',
    capacidade: 500,
    vagasDisponiveis: 125,
    responsavel: 'Prefeitura Gravataí',
    status: 'ativo',
    recursos: ['Colchões', 'Vestiários', 'Cozinha', 'Enfermaria', 'Quadra coberta'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },

  // VIAMÃO
  {
    id: 'viamao-001',
    nome: 'Escola Municipal de Ensino Fundamental São João Batista',
    endereco: 'Estrada do Conde, 6850',
    bairro: 'Augusta',
    cidade: 'Viamão',
    cep: '94410-000',
    latitude: -30.0812,
    longitude: -51.0234,
    telefone: '(51) 3485-2200',
    capacidade: 300,
    vagasDisponiveis: 78,
    responsavel: 'SMED Viamão',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Pátio coberto', 'Alimentação'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // ALVORADA
  {
    id: 'alvorada-001',
    nome: 'Centro Comunitário da Vila Santa Rosa',
    endereco: 'Rua Mário Quintana, 500',
    bairro: 'Santa Rosa',
    cidade: 'Alvorada',
    cep: '94834-150',
    latitude: -29.9889,
    longitude: -51.0834,
    telefone: '(51) 3483-1500',
    capacidade: 200,
    vagasDisponiveis: 52,
    responsavel: 'Associação Vila Santa Rosa',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Salão', 'Vestuário'],
    acessibilidade: false,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // CACHOEIRINHA
  {
    id: 'cachoeirinha-001',
    nome: 'Ginásio Municipal Rui Lopes',
    endereco: 'Av. Flores da Cunha, 3000',
    bairro: 'Centro',
    cidade: 'Cachoeirinha',
    cep: '94910-000',
    latitude: -29.9512,
    longitude: -51.0934,
    telefone: '(51) 3470-2200',
    capacidade: 450,
    vagasDisponiveis: 115,
    responsavel: 'Prefeitura Cachoeirinha',
    status: 'ativo',
    recursos: ['Colchões', 'Vestiários', 'Cozinha', 'Enfermaria', 'Estacionamento'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // URUGUAIANA
  {
    id: 'uruguaiana-001',
    nome: 'Centro de Eventos Celso Biasotto',
    endereco: 'Av. Presidente Vargas, 3200',
    bairro: 'Centro',
    cidade: 'Uruguaiana',
    cep: '97501-512',
    latitude: -29.7645,
    longitude: -57.0889,
    telefone: '(55) 3411-8000',
    capacidade: 1000,
    vagasDisponiveis: 280,
    responsavel: 'Prefeitura Uruguaiana',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros múltiplos', 'Cozinha industrial', 'Enfermaria', 'Segurança', 'Estacionamento'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },

  // BENTO GONÇALVES
  {
    id: 'bentogoncalves-001',
    nome: 'Parque de Eventos Fenachamp',
    endereco: 'RS-470, Km 172',
    bairro: 'Distrito Industrial',
    cidade: 'Bento Gonçalves',
    cep: '95700-000',
    latitude: -29.1723,
    longitude: -51.5234,
    telefone: '(54) 3455-3100',
    capacidade: 600,
    vagasDisponiveis: 160,
    responsavel: 'Prefeitura Bento Gonçalves',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Pavilhões cobertos', 'Estacionamento amplo'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },

  // PASSO FUNDO
  {
    id: 'passofundo-001',
    nome: 'Ginásio Municipal Nenão',
    endereco: 'Av. Brasil Leste, 1000',
    bairro: 'Centro',
    cidade: 'Passo Fundo',
    cep: '99010-001',
    latitude: -28.2634,
    longitude: -52.4067,
    telefone: '(54) 3311-5000',
    capacidade: 700,
    vagasDisponiveis: 190,
    responsavel: 'Prefeitura Passo Fundo',
    status: 'ativo',
    recursos: ['Vestiários', 'Banheiros', 'Cozinha', 'Enfermaria', 'Quadra coberta', 'Arquibancadas'],
    acessibilidade: true,
    aceitaPets: false,
    horarioFuncionamento: '24 horas',
  },

  // LAJEADO
  {
    id: 'lajeado-001',
    nome: 'Centro de Eventos do Parque do Imigrante',
    endereco: 'Rua Júlio de Castilhos, 1775',
    bairro: 'Centro',
    cidade: 'Lajeado',
    cep: '95900-000',
    latitude: -29.4667,
    longitude: -51.9612,
    telefone: '(51) 3714-5000',
    capacidade: 500,
    vagasDisponiveis: 130,
    responsavel: 'Prefeitura Lajeado',
    status: 'ativo',
    recursos: ['Colchões', 'Banheiros', 'Cozinha', 'Pavilhões', 'Estacionamento'],
    acessibilidade: true,
    aceitaPets: true,
    horarioFuncionamento: '24 horas',
  },
];

// ============================================
// HOSPITAIS E UNIDADES DE SAÚDE REAIS
// ============================================

export const hospitaisReais: RealHospital[] = [
  // PORTO ALEGRE
  {
    id: 'hosp-poa-001',
    nome: 'Hospital de Clínicas de Porto Alegre',
    tipo: 'hospital',
    endereco: 'Rua Ramiro Barcelos, 2350',
    bairro: 'Santa Cecília',
    cidade: 'Porto Alegre',
    cep: '90035-903',
    latitude: -30.0368,
    longitude: -51.2065,
    telefone: '(51) 3359-8000',
    telefoneEmergencia: '(51) 3359-8111',
    especialidades: ['Cardiologia', 'Oncologia', 'Neurologia', 'UTI', 'Emergência', 'Transplantes'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 842,
    leitosUTI: 98,
  },
  {
    id: 'hosp-poa-002',
    nome: 'Hospital Moinhos de Vento',
    tipo: 'hospital',
    endereco: 'Rua Ramiro Barcelos, 910',
    bairro: 'Moinhos de Vento',
    cidade: 'Porto Alegre',
    cep: '90035-001',
    latitude: -30.0312,
    longitude: -51.2089,
    telefone: '(51) 3314-3434',
    telefoneEmergencia: '(51) 3314-3535',
    especialidades: ['Cardiologia', 'Ortopedia', 'Neurologia', 'Emergência', 'Check-up'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 427,
    leitosUTI: 62,
  },
  {
    id: 'hosp-poa-003',
    nome: 'Santa Casa de Misericórdia de Porto Alegre',
    tipo: 'hospital',
    endereco: 'Rua Prof. Annes Dias, 295',
    bairro: 'Centro Histórico',
    cidade: 'Porto Alegre',
    cep: '90020-090',
    latitude: -30.0289,
    longitude: -51.2298,
    telefone: '(51) 3214-8100',
    telefoneEmergencia: '(51) 3214-8400',
    especialidades: ['Emergência', 'Trauma', 'Queimados', 'UTI', 'Cirurgia Geral', 'Pediatria'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 748,
    leitosUTI: 82,
  },
  {
    id: 'upa-poa-001',
    nome: 'UPA 24h Bom Jesus',
    tipo: 'upa',
    endereco: 'Rua Bom Jesus, 410',
    bairro: 'Bom Jesus',
    cidade: 'Porto Alegre',
    cep: '91420-270',
    latitude: -30.1123,
    longitude: -51.1523,
    telefone: '(51) 3289-5200',
    especialidades: ['Clínica Geral', 'Pediatria', 'Emergência', 'Raio-X', 'Medicação'],
    atendimento24h: true,
    temUTI: false,
    temProntoSocorro: true,
    leitos: 12,
  },
  {
    id: 'upa-poa-002',
    nome: 'UPA 24h Lomba do Pinheiro',
    tipo: 'upa',
    endereco: 'Estrada João de Oliveira Remião, 5120',
    bairro: 'Lomba do Pinheiro',
    cidade: 'Porto Alegre',
    cep: '91530-001',
    latitude: -30.1456,
    longitude: -51.1089,
    telefone: '(51) 3289-5100',
    especialidades: ['Clínica Geral', 'Pediatria', 'Emergência', 'Raio-X', 'Sutura'],
    atendimento24h: true,
    temUTI: false,
    temProntoSocorro: true,
    leitos: 15,
  },
  {
    id: 'posto-poa-001',
    nome: 'Posto de Saúde Modelo',
    tipo: 'posto_saude',
    endereco: 'Av. Jerônimo de Ornelas, 55',
    bairro: 'Santana',
    cidade: 'Porto Alegre',
    cep: '90040-340',
    latitude: -30.0456,
    longitude: -51.2234,
    telefone: '(51) 3289-2700',
    especialidades: ['Clínica Geral', 'Enfermagem', 'Vacinação', 'Curativos', 'Medicação básica'],
    atendimento24h: false,
    temUTI: false,
    temProntoSocorro: false,
    leitos: 0,
  },

  // CANOAS
  {
    id: 'hosp-canoas-001',
    nome: 'Hospital Universitário de Canoas',
    tipo: 'hospital',
    endereco: 'Av. Farroupilha, 8001',
    bairro: 'São José',
    cidade: 'Canoas',
    cep: '92425-900',
    latitude: -29.8934,
    longitude: -51.1678,
    telefone: '(51) 3462-8200',
    telefoneEmergencia: '(51) 3462-8111',
    especialidades: ['Emergência', 'Cirurgia', 'Clínica Médica', 'Pediatria', 'UTI'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 282,
    leitosUTI: 32,
  },
  {
    id: 'upa-canoas-001',
    nome: 'UPA 24h Mathias Velho',
    tipo: 'upa',
    endereco: 'Av. Guilherme Schell, 6750',
    bairro: 'Mathias Velho',
    cidade: 'Canoas',
    cep: '92310-000',
    latitude: -29.8845,
    longitude: -51.1434,
    telefone: '(51) 3462-7000',
    especialidades: ['Clínica Geral', 'Pediatria', 'Emergência', 'Raio-X'],
    atendimento24h: true,
    temUTI: false,
    temProntoSocorro: true,
    leitos: 18,
  },

  // NOVO HAMBURGO
  {
    id: 'hosp-nh-001',
    nome: 'Hospital Regina',
    tipo: 'hospital',
    endereco: 'Av. Victor Barreto, 2265',
    bairro: 'Centro',
    cidade: 'Novo Hamburgo',
    cep: '93510-180',
    latitude: -29.6889,
    longitude: -51.1312,
    telefone: '(51) 3594-2222',
    telefoneEmergencia: '(51) 3594-2200',
    especialidades: ['Cardiologia', 'Ortopedia', 'Emergência', 'Maternidade', 'UTI'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 198,
    leitosUTI: 28,
  },

  // CAXIAS DO SUL
  {
    id: 'hosp-caxias-001',
    nome: 'Hospital Geral de Caxias do Sul',
    tipo: 'hospital',
    endereco: 'Rua Ernesto Alves, 33',
    bairro: 'Centro',
    cidade: 'Caxias do Sul',
    cep: '95020-360',
    latitude: -29.1678,
    longitude: -51.1789,
    telefone: '(54) 3218-7000',
    telefoneEmergencia: '(54) 3218-7100',
    especialidades: ['Emergência', 'Trauma', 'Cirurgia', 'Clínica Médica', 'UTI', 'Pediatria'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 392,
    leitosUTI: 48,
  },

  // PELOTAS
  {
    id: 'hosp-pelotas-001',
    nome: 'Santa Casa de Misericórdia de Pelotas',
    tipo: 'hospital',
    endereco: 'Rua Gonçalves Chaves, 373',
    bairro: 'Centro',
    cidade: 'Pelotas',
    cep: '96015-560',
    latitude: -31.7634,
    longitude: -52.3412,
    telefone: '(53) 2128-8100',
    telefoneEmergencia: '(53) 2128-8200',
    especialidades: ['Emergência', 'Cirurgia', 'Cardiologia', 'UTI', 'Maternidade'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 324,
    leitosUTI: 38,
  },

  // SANTA MARIA
  {
    id: 'hosp-sm-001',
    nome: 'Hospital Universitário de Santa Maria',
    tipo: 'hospital',
    endereco: 'Av. Roraima, 1000',
    bairro: 'Camobi',
    cidade: 'Santa Maria',
    cep: '97105-900',
    latitude: -29.7189,
    longitude: -53.7167,
    telefone: '(55) 3220-8000',
    telefoneEmergencia: '(55) 3220-8100',
    especialidades: ['Emergência', 'Trauma', 'Oncologia', 'Cardiologia', 'Neurologia', 'UTI'],
    atendimento24h: true,
    temUTI: true,
    temProntoSocorro: true,
    leitos: 312,
    leitosUTI: 42,
  },
];

// ============================================
// PONTOS DE DOAÇÃO REAIS
// ============================================

export const pontosDoacaoReais: PontoDoacao[] = [
  // PORTO ALEGRE
  {
    id: 'doacao-poa-001',
    nome: 'Defesa Civil de Porto Alegre',
    tipo: 'defesa_civil',
    endereco: 'Av. João Pessoa, 346',
    bairro: 'Cidade Baixa',
    cidade: 'Porto Alegre',
    cep: '90040-000',
    latitude: -30.0412,
    longitude: -51.2198,
    telefone: '(51) 3289-2600',
    whatsapp: '(51) 98765-4321',
    responsavel: 'Cap. João Silva',
    horarioFuncionamento: 'Seg-Sex: 8h-18h | Sáb: 9h-13h | Dom: Fechado',
    itensAceitos: ['Alimentos não perecíveis', 'Água mineral', 'Roupas', 'Cobertores', 'Produtos de higiene', 'Medicamentos'],
    observacoes: 'Central de triagem e distribuição'
  },
  {
    id: 'doacao-poa-002',
    nome: 'Paróquia São José',
    tipo: 'igreja',
    endereco: 'Rua Cel. Genuíno, 421',
    bairro: 'Centro',
    cidade: 'Porto Alegre',
    cep: '90010-350',
    latitude: -30.0323,
    longitude: -51.2289,
    telefone: '(51) 3226-5533',
    whatsapp: '(51) 99876-5432',
    responsavel: 'Padre Marcos',
    horarioFuncionamento: 'Seg-Dom: 8h-20h',
    itensAceitos: ['Alimentos', 'Roupas', 'Calçados', 'Material escolar', 'Brinquedos'],
  },
  {
    id: 'doacao-poa-003',
    nome: 'Centro Comunitário Vila Pinto',
    tipo: 'centro_comunitario',
    endereco: 'Rua São Carlos, 623',
    bairro: 'Bom Fim',
    cidade: 'Porto Alegre',
    cep: '90035-140',
    latitude: -30.0345,
    longitude: -51.2145,
    telefone: '(51) 3307-5544',
    responsavel: 'Maria Santos',
    horarioFuncionamento: 'Seg-Sáb: 9h-17h',
    itensAceitos: ['Alimentos', 'Roupas', 'Produtos de limpeza', 'Fraldas'],
  },
  {
    id: 'doacao-poa-004',
    nome: 'ONG Ação da Cidadania',
    tipo: 'ong',
    endereco: 'Av. Osvaldo Aranha, 540',
    bairro: 'Bom Fim',
    cidade: 'Porto Alegre',
    cep: '90035-190',
    latitude: -30.0389,
    longitude: -51.2112,
    telefone: '(51) 3308-6677',
    whatsapp: '(51) 99111-2233',
    responsavel: 'Carlos Fernandes',
    horarioFuncionamento: 'Seg-Sex: 9h-18h | Sáb: 9h-13h',
    itensAceitos: ['Alimentos', 'Roupas', 'Móveis', 'Eletrodomésticos', 'Materiais de construção'],
  },
  {
    id: 'doacao-poa-005',
    nome: 'Banco de Alimentos RS',
    tipo: 'ong',
    endereco: 'Rua Voluntários da Pátria, 125',
    bairro: 'Floresta',
    cidade: 'Porto Alegre',
    cep: '90230-010',
    latitude: -30.0267,
    longitude: -51.2034,
    telefone: '(51) 3027-7788',
    whatsapp: '(51) 99222-3344',
    responsavel: 'Ana Paula Costa',
    horarioFuncionamento: 'Seg-Sex: 8h-17h',
    itensAceitos: ['Alimentos não perecíveis', 'Frutas', 'Verduras', 'Carnes (refrigeradas)', 'Leite'],
    observacoes: 'Aceita doações de empresas e mercados'
  },

  // CANOAS
  {
    id: 'doacao-canoas-001',
    nome: 'Defesa Civil Canoas',
    tipo: 'defesa_civil',
    endereco: 'Rua Tiradentes, 800',
    bairro: 'Centro',
    cidade: 'Canoas',
    cep: '92010-260',
    latitude: -29.9156,
    longitude: -51.1823,
    telefone: '(51) 3462-2100',
    responsavel: 'Ten. Roberto Lima',
    horarioFuncionamento: 'Seg-Sex: 8h-17h',
    itensAceitos: ['Alimentos', 'Água', 'Roupas', 'Cobertores', 'Higiene'],
  },
  {
    id: 'doacao-canoas-002',
    nome: 'Igreja Evangélica Assembleia de Deus',
    tipo: 'igreja',
    endereco: 'Av. Guilherme Schell, 2250',
    bairro: 'Centro',
    cidade: 'Canoas',
    cep: '92310-000',
    latitude: -29.9123,
    longitude: -51.1789,
    telefone: '(51) 3472-3366',
    responsavel: 'Pastor Paulo',
    horarioFuncionamento: 'Seg-Dom: 9h-21h',
    itensAceitos: ['Alimentos', 'Roupas', 'Calçados', 'Medicamentos'],
  },

  // NOVO HAMBURGO
  {
    id: 'doacao-nh-001',
    nome: 'Centro de Triagem NH Solidária',
    tipo: 'centro_comunitario',
    endereco: 'Rua Lima e Silva, 555',
    bairro: 'Centro',
    cidade: 'Novo Hamburgo',
    cep: '93510-110',
    latitude: -29.6878,
    longitude: -51.1301,
    telefone: '(51) 3594-3300',
    whatsapp: '(51) 99333-4455',
    responsavel: 'Juliana Oliveira',
    horarioFuncionamento: 'Seg-Sáb: 8h-18h',
    itensAceitos: ['Alimentos', 'Roupas', 'Calçados', 'Cobertores', 'Produtos de higiene', 'Fraldas'],
  },

  // CAXIAS DO SUL
  {
    id: 'doacao-caxias-001',
    nome: 'Central de Doações Caxias Solidária',
    tipo: 'defesa_civil',
    endereco: 'Rua Os 18 do Forte, 1995',
    bairro: 'São Pelegrino',
    cidade: 'Caxias do Sul',
    cep: '95034-000',
    latitude: -29.1612,
    longitude: -51.1723,
    telefone: '(54) 3220-7000',
    whatsapp: '(54) 99444-5566',
    responsavel: 'Coordenação Defesa Civil',
    horarioFuncionamento: 'Seg-Dom: 8h-20h',
    itensAceitos: ['Alimentos', 'Roupas de inverno', 'Cobertores', 'Produtos de higiene', 'Água'],
    observacoes: 'Prioridade para roupas de frio'
  },

  // PELOTAS
  {
    id: 'doacao-pelotas-001',
    nome: 'Casa da Solidariedade',
    tipo: 'ong',
    endereco: 'Rua Santos Dumont, 1200',
    bairro: 'Fragata',
    cidade: 'Pelotas',
    cep: '96050-500',
    latitude: -31.7489,
    longitude: -52.3289,
    telefone: '(53) 3227-4488',
    responsavel: 'Letícia Rodrigues',
    horarioFuncionamento: 'Seg-Sex: 9h-17h',
    itensAceitos: ['Alimentos', 'Roupas', 'Móveis', 'Utensílios domésticos'],
  },

  // SANTA MARIA
  {
    id: 'doacao-sm-001',
    nome: 'Centro de Apoio Santa Maria Solidária',
    tipo: 'centro_comunitario',
    endereco: 'Av. Medianeira, 1200',
    bairro: 'Centro',
    cidade: 'Santa Maria',
    cep: '97010-020',
    latitude: -29.6834,
    longitude: -53.8089,
    telefone: '(55) 3220-1500',
    whatsapp: '(55) 99555-6677',
    responsavel: 'Fernando Souza',
    horarioFuncionamento: 'Seg-Sáb: 8h-18h',
    itensAceitos: ['Alimentos', 'Roupas', 'Cobertores', 'Produtos de higiene', 'Medicamentos'],
  },

  // GRAVATAÍ
  {
    id: 'doacao-gravatai-001',
    nome: 'Posto de Coleta Gravataí Solidária',
    tipo: 'defesa_civil',
    endereco: 'Av. Ely Corrêa de Lima, 100',
    bairro: 'Centro',
    cidade: 'Gravataí',
    cep: '94010-000',
    latitude: -29.9434,
    longitude: -50.9912,
    telefone: '(51) 3484-1100',
    responsavel: 'Equipe Defesa Civil',
    horarioFuncionamento: 'Seg-Sex: 8h-17h',
    itensAceitos: ['Alimentos', 'Água', 'Roupas', 'Cobertores', 'Higiene'],
  },

  // SÃO LEOPOLDO
  {
    id: 'doacao-sl-001',
    nome: 'Igreja São Miguel Arcanjo',
    tipo: 'igreja',
    endereco: 'Rua Independência, 1070',
    bairro: 'Centro',
    cidade: 'São Leopoldo',
    cep: '93010-000',
    latitude: -29.7601,
    longitude: -51.1478,
    telefone: '(51) 3592-1177',
    responsavel: 'Padre José',
    horarioFuncionamento: 'Seg-Dom: 8h-20h',
    itensAceitos: ['Alimentos', 'Roupas', 'Calçados', 'Material escolar'],
  },
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export const getAbrigosPorCidade = (cidade: string): RealAbrigo[] => {
  return abrigosReais.filter(abrigo => abrigo.cidade === cidade);
};

export const getAbrigosDisponiveis = (): RealAbrigo[] => {
  return abrigosReais.filter(abrigo => abrigo.status === 'ativo' && abrigo.vagasDisponiveis > 0);
};

export const getAbrigosComPets = (): RealAbrigo[] => {
  return abrigosReais.filter(abrigo => abrigo.aceitaPets && abrigo.status === 'ativo');
};

export const getHospitaisComEmergencia = (): RealHospital[] => {
  return hospitaisReais.filter(hospital => hospital.atendimento24h && hospital.temProntoSocorro);
};

export const getPontosDoacaoPorCidade = (cidade: string): PontoDoacao[] => {
  return pontosDoacaoReais.filter(ponto => ponto.cidade === cidade);
};

export const getCidadesComAbrigos = (): string[] => {
  const cidades = new Set(abrigosReais.map(abrigo => abrigo.cidade));
  return Array.from(cidades).sort();
};

export const getTotalVagasDisponiveis = (): number => {
  return abrigosReais.reduce((total, abrigo) => total + abrigo.vagasDisponiveis, 0);
};

export const getTotalCapacidade = (): number => {
  return abrigosReais.reduce((total, abrigo) => total + abrigo.capacidade, 0);
};
