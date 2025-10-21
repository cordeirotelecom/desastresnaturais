/**
 * SERVIÇO DE ABRIGOS - SISTEMA DE GESTÃO DE DESASTRES
 * 
 * Gerenciamento completo de abrigos temporários
 * Dados baseados em abrigos reais do Rio Grande do Sul (enchentes 2024)
 * 
 * Funcionalidades:
 * - Listagem de abrigos com dados em tempo real
 * - Busca por cidade/região
 * - Filtros por capacidade, ocupação, necessidades
 * - Geolocalização e cálculo de distância
 * - Registro de doações e voluntários por abrigo
 * - Sistema de check-in de abrigados
 * 
 * @author Sistema DHS
 * @version 1.0.0
 * @date 2025-01-20
 */

// ==================== INTERFACES ====================

export interface Localizacao {
  latitude: number;
  longitude: number;
  endereco: string;
  bairro?: string;
  cidade: string;
  estado: string;
  cep?: string;
  pontoReferencia?: string;
}

export interface Capacidade {
  total: number;              // Total de vagas
  ocupada: number;            // Vagas ocupadas
  disponivel: number;         // Vagas disponíveis
  adultos: number;            // Adultos abrigados
  criancas: number;           // Crianças abrigadas
  idosos: number;             // Idosos abrigados
  pessoasDeficiencia: number; // PcD abrigadas
  animais: number;            // Animais abrigados
  aceitaAnimais: boolean;     // Se aceita animais
}

export interface Infraestrutura {
  banheiros: number;
  chuveiros: number;
  cozinha: boolean;
  refeitorio: boolean;
  dormitorios: number;
  enfermaria: boolean;
  acessibilidade: boolean;
  areaLazer: boolean;
  areaAnimais?: boolean;
  geradores: boolean;
  internet: boolean;
  lavanderia: boolean;
}

export interface Necessidades {
  alimentacao: 'critica' | 'moderada' | 'atendida';
  agua: 'critica' | 'moderada' | 'atendida';
  roupas: 'critica' | 'moderada' | 'atendida';
  cobertores: 'critica' | 'moderada' | 'atendida';
  higiene: 'critica' | 'moderada' | 'atendida';
  medicamentos: 'critica' | 'moderada' | 'atendida';
  fraldas: 'critica' | 'moderada' | 'atendida';
  voluntarios: 'critica' | 'moderada' | 'atendida';
  observacoes?: string;
}

export interface Responsavel {
  nome: string;
  telefone: string;
  email?: string;
  cargo: string;
  organizacao: string; // Ex: Defesa Civil, Igreja, Escola
}

export interface Abrigo {
  id: string;
  nome: string;
  tipo: 'escola' | 'ginasio' | 'igreja' | 'centro-comunitario' | 'outro';
  status: 'ativo' | 'lotado' | 'em-preparacao' | 'encerrado';
  localizacao: Localizacao;
  capacidade: Capacidade;
  infraestrutura: Infraestrutura;
  necessidades: Necessidades;
  responsavel: Responsavel;
  dataAbertura: Date;
  dataEncerramento?: Date;
  horariosVisita?: string;
  observacoes?: string;
  imagemUrl?: string;
}

export interface FiltrosAbrigos {
  cidade?: string;
  status?: 'ativo' | 'lotado' | 'em-preparacao' | 'encerrado';
  aceitaAnimais?: boolean;
  acessibilidade?: boolean;
  temEnfermaria?: boolean;
  vagasDisponiveis?: boolean; // Apenas com vagas
  latitude?: number; // Para busca por proximidade
  longitude?: number;
  raioKm?: number; // Raio de busca em km
}

export interface EstatisticasAbrigos {
  totalAbrigos: number;
  abrigosAtivos: number;
  abrigosLotados: number;
  totalAbrigados: number;
  totalCapacidade: number;
  taxaOcupacao: number; // Percentual
  abrigosPorCidade: { [cidade: string]: number };
  necessidadesCriticas: number; // Abrigos com necessidades críticas
}

// ==================== DADOS MOCKADOS (BASE REAL RS 2024) ====================

const abrigosRS: Abrigo[] = [
  {
    id: 'ABR-001',
    nome: 'Ginásio Tesourinha',
    tipo: 'ginasio',
    status: 'ativo',
    localizacao: {
      latitude: -30.0346,
      longitude: -51.2177,
      endereco: 'Av. Padre Leopoldo Brentano, s/n',
      bairro: 'Humaitá',
      cidade: 'Porto Alegre',
      estado: 'RS',
      pontoReferencia: 'Próximo ao Estádio Beira-Rio'
    },
    capacidade: {
      total: 500,
      ocupada: 380,
      disponivel: 120,
      adultos: 220,
      criancas: 95,
      idosos: 55,
      pessoasDeficiencia: 10,
      animais: 42,
      aceitaAnimais: true
    },
    infraestrutura: {
      banheiros: 20,
      chuveiros: 16,
      cozinha: true,
      refeitorio: true,
      dormitorios: 8,
      enfermaria: true,
      acessibilidade: true,
      areaLazer: true,
      areaAnimais: true,
      geradores: true,
      internet: true,
      lavanderia: true
    },
    necessidades: {
      alimentacao: 'moderada',
      agua: 'atendida',
      roupas: 'critica',
      cobertores: 'moderada',
      higiene: 'moderada',
      medicamentos: 'atendida',
      fraldas: 'critica',
      voluntarios: 'moderada',
      observacoes: 'Precisamos urgente de roupas infantis e fraldas tamanho G'
    },
    responsavel: {
      nome: 'Carlos Eduardo Silva',
      telefone: '(51) 98765-4321',
      email: 'carlos.silva@defesacivil.rs.gov.br',
      cargo: 'Coordenador',
      organizacao: 'Defesa Civil - Porto Alegre'
    },
    dataAbertura: new Date('2024-05-05'),
    horariosVisita: '08:00 - 20:00',
    observacoes: 'Abrigo principal de Porto Alegre. Equipe médica 24h.'
  },
  {
    id: 'ABR-002',
    nome: 'E.E.E.M. Coronel Afonso Emilio Massot',
    tipo: 'escola',
    status: 'ativo',
    localizacao: {
      latitude: -29.7944,
      longitude: -51.1450,
      endereco: 'Rua Coberta, 255',
      bairro: 'Centro',
      cidade: 'Canoas',
      estado: 'RS',
      pontoReferencia: 'Próximo à Praça da Bandeira'
    },
    capacidade: {
      total: 300,
      ocupada: 280,
      disponivel: 20,
      adultos: 165,
      criancas: 75,
      idosos: 35,
      pessoasDeficiencia: 5,
      animais: 18,
      aceitaAnimais: true
    },
    infraestrutura: {
      banheiros: 12,
      chuveiros: 10,
      cozinha: true,
      refeitorio: true,
      dormitorios: 6,
      enfermaria: true,
      acessibilidade: true,
      areaLazer: true,
      areaAnimais: true,
      geradores: false,
      internet: true,
      lavanderia: false
    },
    necessidades: {
      alimentacao: 'atendida',
      agua: 'atendida',
      roupas: 'moderada',
      cobertores: 'atendida',
      higiene: 'critica',
      medicamentos: 'moderada',
      fraldas: 'moderada',
      voluntarios: 'critica',
      observacoes: 'Precisamos de kits de higiene pessoal e voluntários para atendimento noturno'
    },
    responsavel: {
      nome: 'Maria Aparecida Santos',
      telefone: '(51) 99123-4567',
      email: 'maria.santos@seduc.rs.gov.br',
      cargo: 'Diretora',
      organizacao: 'Secretaria de Educação - Canoas'
    },
    dataAbertura: new Date('2024-05-06'),
    horariosVisita: '09:00 - 18:00'
  },
  {
    id: 'ABR-003',
    nome: 'Igreja Assembleia de Deus',
    tipo: 'igreja',
    status: 'ativo',
    localizacao: {
      latitude: -29.6868,
      longitude: -51.1049,
      endereco: 'Av. Industrial, 1500',
      bairro: 'São José',
      cidade: 'Novo Hamburgo',
      estado: 'RS',
      pontoReferencia: 'Próximo ao Shopping Bourbon'
    },
    capacidade: {
      total: 150,
      ocupada: 145,
      disponivel: 5,
      adultos: 85,
      criancas: 40,
      idosos: 18,
      pessoasDeficiencia: 2,
      animais: 0,
      aceitaAnimais: false
    },
    infraestrutura: {
      banheiros: 6,
      chuveiros: 4,
      cozinha: true,
      refeitorio: true,
      dormitorios: 3,
      enfermaria: false,
      acessibilidade: true,
      areaLazer: false,
      areaAnimais: false,
      geradores: true,
      internet: true,
      lavanderia: false
    },
    necessidades: {
      alimentacao: 'moderada',
      agua: 'atendida',
      roupas: 'atendida',
      cobertores: 'moderada',
      higiene: 'moderada',
      medicamentos: 'critica',
      fraldas: 'atendida',
      voluntarios: 'atendida',
      observacoes: 'Necessitamos de medicamentos para hipertensão e diabetes'
    },
    responsavel: {
      nome: 'Pastor João Oliveira',
      telefone: '(51) 99876-5432',
      cargo: 'Pastor Responsável',
      organizacao: 'Assembleia de Deus - Novo Hamburgo'
    },
    dataAbertura: new Date('2024-05-07'),
    horariosVisita: '10:00 - 17:00',
    observacoes: 'Abrigo comunitário. Não aceita animais por limitação de espaço.'
  },
  {
    id: 'ABR-004',
    nome: 'Centro de Eventos da FIERGS',
    tipo: 'centro-comunitario',
    status: 'lotado',
    localizacao: {
      latitude: -30.0691,
      longitude: -51.2122,
      endereco: 'Av. Assis Brasil, 8787',
      bairro: 'Sarandi',
      cidade: 'Porto Alegre',
      estado: 'RS',
      pontoReferencia: 'Próximo ao Aeroporto Salgado Filho'
    },
    capacidade: {
      total: 800,
      ocupada: 800,
      disponivel: 0,
      adultos: 450,
      criancas: 220,
      idosos: 110,
      pessoasDeficiencia: 20,
      animais: 65,
      aceitaAnimais: true
    },
    infraestrutura: {
      banheiros: 35,
      chuveiros: 28,
      cozinha: true,
      refeitorio: true,
      dormitorios: 12,
      enfermaria: true,
      acessibilidade: true,
      areaLazer: true,
      areaAnimais: true,
      geradores: true,
      internet: true,
      lavanderia: true
    },
    necessidades: {
      alimentacao: 'atendida',
      agua: 'atendida',
      roupas: 'atendida',
      cobertores: 'atendida',
      higiene: 'atendida',
      medicamentos: 'atendida',
      fraldas: 'moderada',
      voluntarios: 'atendida',
      observacoes: 'Abrigo lotado. Lista de espera disponível.'
    },
    responsavel: {
      nome: 'Dr. Roberto Ferreira',
      telefone: '(51) 3347-8888',
      email: 'roberto.ferreira@fiergs.org.br',
      cargo: 'Coordenador Geral',
      organizacao: 'FIERGS'
    },
    dataAbertura: new Date('2024-05-04'),
    horariosVisita: '24 horas',
    observacoes: 'Maior abrigo da região metropolitana. Suporte completo 24h.'
  },
  {
    id: 'ABR-005',
    nome: 'Ginásio Municipal de Eldorado do Sul',
    tipo: 'ginasio',
    status: 'ativo',
    localizacao: {
      latitude: -30.0833,
      longitude: -51.6167,
      endereco: 'Rua Prefeito Otávio Rocha, 123',
      bairro: 'Centro',
      cidade: 'Eldorado do Sul',
      estado: 'RS',
      cep: '92990-000'
    },
    capacidade: {
      total: 200,
      ocupada: 175,
      disponivel: 25,
      adultos: 100,
      criancas: 50,
      idosos: 22,
      pessoasDeficiencia: 3,
      animais: 28,
      aceitaAnimais: true
    },
    infraestrutura: {
      banheiros: 8,
      chuveiros: 6,
      cozinha: true,
      refeitorio: true,
      dormitorios: 4,
      enfermaria: false,
      acessibilidade: false,
      areaLazer: true,
      areaAnimais: true,
      geradores: false,
      internet: false,
      lavanderia: false
    },
    necessidades: {
      alimentacao: 'critica',
      agua: 'moderada',
      roupas: 'critica',
      cobertores: 'critica',
      higiene: 'critica',
      medicamentos: 'critica',
      fraldas: 'critica',
      voluntarios: 'critica',
      observacoes: 'Abrigo com recursos limitados. Precisamos urgente de tudo!'
    },
    responsavel: {
      nome: 'Ana Paula Costa',
      telefone: '(51) 98234-5678',
      cargo: 'Coordenadora Voluntária',
      organizacao: 'Prefeitura de Eldorado do Sul'
    },
    dataAbertura: new Date('2024-05-08'),
    horariosVisita: '08:00 - 17:00',
    observacoes: 'Cidade fortemente atingida. Necessidades críticas em todas as áreas.'
  }
];

// ==================== SERVIÇO ====================

class AbrigosService {
  
  /**
   * Lista todos os abrigos
   */
  listarTodos(): Abrigo[] {
    return abrigosRS;
  }

  /**
   * Busca abrigo por ID
   */
  buscarPorId(id: string): Abrigo | undefined {
    return abrigosRS.find(a => a.id === id);
  }

  /**
   * Busca abrigos com filtros
   */
  buscarComFiltros(filtros: FiltrosAbrigos): Abrigo[] {
    let resultado = [...abrigosRS];

    // Filtro por cidade
    if (filtros.cidade) {
      resultado = resultado.filter(a => 
        a.localizacao.cidade.toLowerCase().includes(filtros.cidade!.toLowerCase())
      );
    }

    // Filtro por status
    if (filtros.status) {
      resultado = resultado.filter(a => a.status === filtros.status);
    }

    // Filtro: aceita animais
    if (filtros.aceitaAnimais !== undefined) {
      resultado = resultado.filter(a => a.capacidade.aceitaAnimais === filtros.aceitaAnimais);
    }

    // Filtro: acessibilidade
    if (filtros.acessibilidade !== undefined) {
      resultado = resultado.filter(a => a.infraestrutura.acessibilidade === filtros.acessibilidade);
    }

    // Filtro: tem enfermaria
    if (filtros.temEnfermaria !== undefined) {
      resultado = resultado.filter(a => a.infraestrutura.enfermaria === filtros.temEnfermaria);
    }

    // Filtro: apenas com vagas disponíveis
    if (filtros.vagasDisponiveis) {
      resultado = resultado.filter(a => a.capacidade.disponivel > 0);
    }

    // Filtro por proximidade
    if (filtros.latitude && filtros.longitude && filtros.raioKm) {
      resultado = resultado.filter(a => {
        const distancia = this.calcularDistancia(
          filtros.latitude!,
          filtros.longitude!,
          a.localizacao.latitude,
          a.localizacao.longitude
        );
        return distancia <= filtros.raioKm!;
      });
    }

    return resultado;
  }

  /**
   * Calcula distância entre dois pontos (fórmula Haversine)
   */
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  /**
   * Busca abrigos próximos a uma localização
   */
  buscarProximos(latitude: number, longitude: number, raioKm: number = 50): Array<Abrigo & { distanciaKm: number }> {
    return abrigosRS
      .map(abrigo => ({
        ...abrigo,
        distanciaKm: this.calcularDistancia(
          latitude,
          longitude,
          abrigo.localizacao.latitude,
          abrigo.localizacao.longitude
        )
      }))
      .filter(a => a.distanciaKm <= raioKm)
      .sort((a, b) => a.distanciaKm - b.distanciaKm);
  }

  /**
   * Obtém estatísticas gerais dos abrigos
   */
  obterEstatisticas(): EstatisticasAbrigos {
    const totalAbrigos = abrigosRS.length;
    const abrigosAtivos = abrigosRS.filter(a => a.status === 'ativo').length;
    const abrigosLotados = abrigosRS.filter(a => a.status === 'lotado').length;
    
    const totalAbrigados = abrigosRS.reduce((sum, a) => sum + a.capacidade.ocupada, 0);
    const totalCapacidade = abrigosRS.reduce((sum, a) => sum + a.capacidade.total, 0);
    const taxaOcupacao = (totalAbrigados / totalCapacidade) * 100;

    // Abrigos por cidade
    const abrigosPorCidade: { [cidade: string]: number } = {};
    abrigosRS.forEach(a => {
      const cidade = a.localizacao.cidade;
      abrigosPorCidade[cidade] = (abrigosPorCidade[cidade] || 0) + 1;
    });

    // Contagem de necessidades críticas
    const necessidadesCriticas = abrigosRS.filter(a => {
      const nec = a.necessidades;
      return (
        nec.alimentacao === 'critica' ||
        nec.agua === 'critica' ||
        nec.medicamentos === 'critica' ||
        nec.voluntarios === 'critica'
      );
    }).length;

    return {
      totalAbrigos,
      abrigosAtivos,
      abrigosLotados,
      totalAbrigados,
      totalCapacidade,
      taxaOcupacao,
      abrigosPorCidade,
      necessidadesCriticas
    };
  }

  /**
   * Registra check-in de pessoa em abrigo
   */
  registrarCheckIn(abrigoId: string, adultos: number, criancas: number, idosos: number, animais: number = 0): boolean {
    const abrigo = this.buscarPorId(abrigoId);
    if (!abrigo) return false;

    const totalPessoas = adultos + criancas + idosos;
    
    // Verifica se há vagas
    if (abrigo.capacidade.disponivel < totalPessoas) {
      return false;
    }

    // Verifica animais
    if (animais > 0 && !abrigo.capacidade.aceitaAnimais) {
      return false;
    }

    // Atualiza capacidade
    abrigo.capacidade.ocupada += totalPessoas;
    abrigo.capacidade.disponivel -= totalPessoas;
    abrigo.capacidade.adultos += adultos;
    abrigo.capacidade.criancas += criancas;
    abrigo.capacidade.idosos += idosos;
    abrigo.capacidade.animais += animais;

    // Atualiza status se lotou
    if (abrigo.capacidade.disponivel === 0) {
      abrigo.status = 'lotado';
    }

    return true;
  }

  /**
   * Registra doação em abrigo
   */
  registrarDoacao(abrigoId: string, item: keyof Necessidades, quantidade?: number): boolean {
    const abrigo = this.buscarPorId(abrigoId);
    if (!abrigo || item === 'observacoes') return false;

    // Melhora o status da necessidade
    const statusAtual = abrigo.necessidades[item] as 'critica' | 'moderada' | 'atendida';
    
    if (statusAtual === 'critica') {
      abrigo.necessidades[item] = 'moderada';
    } else if (statusAtual === 'moderada') {
      abrigo.necessidades[item] = 'atendida';
    }

    return true;
  }

  /**
   * Lista abrigos com necessidades críticas
   */
  listarComNecessidadesCriticas(): Abrigo[] {
    return abrigosRS.filter(a => {
      const nec = a.necessidades;
      return (
        nec.alimentacao === 'critica' ||
        nec.agua === 'critica' ||
        nec.roupas === 'critica' ||
        nec.medicamentos === 'critica' ||
        nec.voluntarios === 'critica'
      );
    });
  }

  /**
   * Exporta dados para CSV (simulação)
   */
  exportarParaCSV(): string {
    let csv = 'ID,Nome,Tipo,Status,Cidade,Capacidade,Ocupação,Disponível,Aceita Animais\n';
    
    abrigosRS.forEach(a => {
      csv += `${a.id},"${a.nome}",${a.tipo},${a.status},${a.localizacao.cidade},`;
      csv += `${a.capacidade.total},${a.capacidade.ocupada},${a.capacidade.disponivel},`;
      csv += `${a.capacidade.aceitaAnimais ? 'Sim' : 'Não'}\n`;
    });

    return csv;
  }
}

// Singleton
const abrigosService = new AbrigosService();
export default abrigosService;
