/**
 * API de Gerenciamento de Voluntários
 * Sistema completo de cadastro, validação e gestão de voluntários
 * Baseado em DHS - Desenvolvimento Harmônico e Sustentável
 */

// ==================== INTERFACES ====================

export interface Voluntario {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  genero: 'masculino' | 'feminino' | 'outro' | 'prefiro não informar';
  
  // Endereço
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    latitude: number;
    longitude: number;
  };
  
  // Habilidades e Experiências
  habilidades: HabilidadeVoluntario[];
  experiencias: string[];
  profissao: string;
  escolaridade: 'fundamental' | 'médio' | 'superior' | 'pós-graduação' | 'mestrado' | 'doutorado';
  
  // Disponibilidade
  disponibilidade: {
    diasDaSemana: DiaDaSemana[];
    horarios: 'manhã' | 'tarde' | 'noite' | 'integral' | 'flexível';
    tipoAtuacao: TipoAtuacao[];
  };
  
  // Documentação
  documentos: {
    rgFrente?: string; // URL da foto
    rgVerso?: string;
    comprovanteResidencia?: string;
    certificados?: string[];
    antecedentes?: string; // Certidão de antecedentes criminais
  };
  
  // Status
  status: 'pendente' | 'aprovado' | 'ativo' | 'inativo' | 'suspenso';
  aprovadoPor?: string;
  dataAprovacao?: Date;
  dataCadastro: Date;
  ultimaAtuacao?: Date;
  
  // Histórico
  horasTrabalhadas: number;
  atendimentos: number;
  avaliacoes: AvaliacaoVoluntario[];
  mediaAvaliacao: number;
  
  // Preferências
  preferencias: {
    receberNotificacoes: boolean;
    raioAtuacao: number; // km
    areasInteresse: string[];
  };
  
  // Emergência
  contatoEmergencia: {
    nome: string;
    telefone: string;
    parentesco: string;
  };
  
  // Saúde
  informacoesSaude: {
    tipoSanguineo?: string;
    alergias?: string[];
    medicamentos?: string[];
    condicoes?: string[];
  };
}

export interface HabilidadeVoluntario {
  tipo: 'primeiros socorros' | 'resgate' | 'psicologia' | 'medicina' | 'enfermagem' | 
        'engenharia' | 'construção' | 'cozinha' | 'logística' | 'transporte' | 
        'comunicação' | 'tecnologia' | 'tradução' | 'veterinária' | 'educação' | 'outro';
  nivel: 'básico' | 'intermediário' | 'avançado' | 'especialista';
  certificacao?: string;
  validadeCertificacao?: Date;
  descricao?: string;
}

export type DiaDaSemana = 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado' | 'domingo';

export type TipoAtuacao = 
  | 'resgate' 
  | 'abrigo' 
  | 'distribuição' 
  | 'atendimento médico'
  | 'apoio psicológico'
  | 'logística'
  | 'transporte'
  | 'cozinha'
  | 'limpeza'
  | 'reconstrução'
  | 'cadastramento'
  | 'comunicação'
  | 'tecnologia'
  | 'outro';

export interface AvaliacaoVoluntario {
  id: string;
  avaliadoPor: string;
  data: Date;
  nota: number; // 1-5
  comentario?: string;
  atividade: string;
}

export interface EscalaVoluntario {
  id: string;
  voluntarioId: string;
  atividade: string;
  localId: string;
  localNome: string;
  localEndereco: string;
  dataInicio: Date;
  dataFim: Date;
  status: 'agendada' | 'em andamento' | 'concluída' | 'cancelada';
  responsavel: string;
  descricao: string;
  observacoes?: string;
}

export interface ChamadoVoluntario {
  id: string;
  titulo: string;
  descricao: string;
  urgencia: 'baixa' | 'média' | 'alta' | 'crítica';
  localidade: {
    cidade: string;
    bairro?: string;
    endereco?: string;
    latitude: number;
    longitude: number;
  };
  habilidadesNecessarias: string[];
  numeroVoluntarios: number;
  voluntariosInscritos: string[];
  dataInicio: Date;
  dataFim: Date;
  status: 'aberto' | 'em andamento' | 'concluído' | 'cancelado';
  criadoPor: string;
  dataCriacao: Date;
}

export interface EstatisticasVoluntario {
  totalVoluntarios: number;
  ativos: number;
  pendentes: number;
  totalHoras: number;
  totalAtendimentos: number;
  porCidade: { [cidade: string]: number };
  porHabilidade: { [habilidade: string]: number };
  porDisponibilidade: { [dia: string]: number };
  mediaAvaliacao: number;
}

// ==================== SERVIÇO DE API ====================

export class VoluntarioAPIService {
  private static instance: VoluntarioAPIService;
  private voluntarios: Map<string, Voluntario> = new Map();
  private escalas: Map<string, EscalaVoluntario> = new Map();
  private chamados: Map<string, ChamadoVoluntario> = new Map();

  private constructor() {
    // Inicializar com dados de exemplo
    this.inicializarDadosExemplo();
  }

  public static getInstance(): VoluntarioAPIService {
    if (!VoluntarioAPIService.instance) {
      VoluntarioAPIService.instance = new VoluntarioAPIService();
    }
    return VoluntarioAPIService.instance;
  }

  // ==================== MÉTODOS DE CADASTRO ====================

  /**
   * Cadastrar novo voluntário
   */
  public async cadastrarVoluntario(dados: Partial<Voluntario>): Promise<{
    sucesso: boolean;
    voluntario?: Voluntario;
    erro?: string;
  }> {
    try {
      // Validar dados obrigatórios
      const validacao = this.validarDadosVoluntario(dados);
      if (!validacao.valido) {
        return { sucesso: false, erro: validacao.erro };
      }

      // Verificar CPF duplicado
      const cpfExiste = Array.from(this.voluntarios.values()).some(
        v => v.cpf === dados.cpf
      );
      if (cpfExiste) {
        return { sucesso: false, erro: 'CPF já cadastrado no sistema' };
      }

      // Buscar coordenadas por CEP
      const coordenadas = await this.buscarCoordenadasPorCEP(dados.endereco?.cep || '');

      const voluntario: Voluntario = {
        id: this.gerarId(),
        nome: dados.nome || '',
        cpf: dados.cpf || '',
        email: dados.email || '',
        telefone: dados.telefone || '',
        dataNascimento: dados.dataNascimento || new Date(),
        genero: dados.genero || 'prefiro não informar',
        endereco: {
          ...dados.endereco!,
          latitude: coordenadas.latitude,
          longitude: coordenadas.longitude,
        },
        habilidades: dados.habilidades || [],
        experiencias: dados.experiencias || [],
        profissao: dados.profissao || '',
        escolaridade: dados.escolaridade || 'médio',
        disponibilidade: dados.disponibilidade || {
          diasDaSemana: [],
          horarios: 'flexível',
          tipoAtuacao: [],
        },
        documentos: dados.documentos || {},
        status: 'pendente',
        dataCadastro: new Date(),
        horasTrabalhadas: 0,
        atendimentos: 0,
        avaliacoes: [],
        mediaAvaliacao: 0,
        preferencias: dados.preferencias || {
          receberNotificacoes: true,
          raioAtuacao: 20,
          areasInteresse: [],
        },
        contatoEmergencia: dados.contatoEmergencia || {
          nome: '',
          telefone: '',
          parentesco: '',
        },
        informacoesSaude: dados.informacoesSaude || {},
      };

      this.voluntarios.set(voluntario.id, voluntario);

      return { sucesso: true, voluntario };
    } catch (error) {
      return { sucesso: false, erro: 'Erro ao cadastrar voluntário' };
    }
  }

  /**
   * Validar dados do voluntário
   */
  private validarDadosVoluntario(dados: Partial<Voluntario>): {
    valido: boolean;
    erro?: string;
  } {
    if (!dados.nome || dados.nome.length < 3) {
      return { valido: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
    }

    if (!dados.cpf || !this.validarCPF(dados.cpf)) {
      return { valido: false, erro: 'CPF inválido' };
    }

    if (!dados.email || !this.validarEmail(dados.email)) {
      return { valido: false, erro: 'Email inválido' };
    }

    if (!dados.telefone || dados.telefone.length < 10) {
      return { valido: false, erro: 'Telefone inválido' };
    }

    if (!dados.endereco?.cep) {
      return { valido: false, erro: 'CEP é obrigatório' };
    }

    return { valido: true };
  }

  /**
   * Validar CPF
   */
  private validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto >= 10 ? 0 : resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto >= 10 ? 0 : resto;

    return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
  }

  /**
   * Validar Email
   */
  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Buscar coordenadas por CEP (integração com ViaCEP + Nominatim)
   */
  private async buscarCoordenadasPorCEP(cep: string): Promise<{
    latitude: number;
    longitude: number;
  }> {
    // TODO: Implementar integração real com ViaCEP e Nominatim
    // Por enquanto, retornar coordenadas de Porto Alegre
    return {
      latitude: -30.0346,
      longitude: -51.2177,
    };
  }

  // ==================== MÉTODOS DE CONSULTA ====================

  /**
   * Buscar voluntários por filtros
   */
  public buscarVoluntarios(filtros: {
    cidade?: string;
    habilidade?: string;
    disponibilidade?: DiaDaSemana;
    status?: string;
    raio?: number; // km
    latitude?: number;
    longitude?: number;
  }): Voluntario[] {
    let resultado = Array.from(this.voluntarios.values());

    if (filtros.cidade) {
      resultado = resultado.filter(v => 
        v.endereco.cidade.toLowerCase().includes(filtros.cidade!.toLowerCase())
      );
    }

    if (filtros.habilidade) {
      resultado = resultado.filter(v =>
        v.habilidades.some(h => h.tipo === filtros.habilidade)
      );
    }

    if (filtros.disponibilidade) {
      resultado = resultado.filter(v =>
        v.disponibilidade.diasDaSemana.includes(filtros.disponibilidade!)
      );
    }

    if (filtros.status) {
      resultado = resultado.filter(v => v.status === filtros.status);
    }

    if (filtros.raio && filtros.latitude && filtros.longitude) {
      resultado = resultado.filter(v => {
        const distancia = this.calcularDistancia(
          filtros.latitude!,
          filtros.longitude!,
          v.endereco.latitude,
          v.endereco.longitude
        );
        return distancia <= filtros.raio!;
      });
    }

    return resultado;
  }

  /**
   * Calcular distância entre dois pontos (Haversine)
   */
  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Obter voluntário por ID
   */
  public obterVoluntario(id: string): Voluntario | null {
    return this.voluntarios.get(id) || null;
  }

  /**
   * Obter estatísticas gerais
   */
  public obterEstatisticas(): EstatisticasVoluntario {
    const voluntarios = Array.from(this.voluntarios.values());

    const porCidade: { [cidade: string]: number } = {};
    const porHabilidade: { [habilidade: string]: number } = {};
    const porDisponibilidade: { [dia: string]: number } = {};

    let totalHoras = 0;
    let totalAtendimentos = 0;
    let somaAvaliacoes = 0;
    let totalAvaliacoes = 0;

    voluntarios.forEach(v => {
      // Por cidade
      porCidade[v.endereco.cidade] = (porCidade[v.endereco.cidade] || 0) + 1;

      // Por habilidade
      v.habilidades.forEach(h => {
        porHabilidade[h.tipo] = (porHabilidade[h.tipo] || 0) + 1;
      });

      // Por disponibilidade
      v.disponibilidade.diasDaSemana.forEach(d => {
        porDisponibilidade[d] = (porDisponibilidade[d] || 0) + 1;
      });

      totalHoras += v.horasTrabalhadas;
      totalAtendimentos += v.atendimentos;
      
      v.avaliacoes.forEach(a => {
        somaAvaliacoes += a.nota;
        totalAvaliacoes++;
      });
    });

    return {
      totalVoluntarios: voluntarios.length,
      ativos: voluntarios.filter(v => v.status === 'ativo').length,
      pendentes: voluntarios.filter(v => v.status === 'pendente').length,
      totalHoras,
      totalAtendimentos,
      porCidade,
      porHabilidade,
      porDisponibilidade,
      mediaAvaliacao: totalAvaliacoes > 0 ? somaAvaliacoes / totalAvaliacoes : 0,
    };
  }

  // ==================== MÉTODOS DE ESCALA ====================

  /**
   * Criar escala para voluntário
   */
  public criarEscala(escala: Omit<EscalaVoluntario, 'id'>): EscalaVoluntario {
    const novaEscala: EscalaVoluntario = {
      ...escala,
      id: this.gerarId(),
    };

    this.escalas.set(novaEscala.id, novaEscala);
    return novaEscala;
  }

  /**
   * Obter escalas de um voluntário
   */
  public obterEscalasVoluntario(voluntarioId: string): EscalaVoluntario[] {
    return Array.from(this.escalas.values()).filter(
      e => e.voluntarioId === voluntarioId
    );
  }

  // ==================== MÉTODOS DE CHAMADOS ====================

  /**
   * Criar chamado para voluntários
   */
  public criarChamado(chamado: Omit<ChamadoVoluntario, 'id' | 'dataCriacao' | 'voluntariosInscritos'>): ChamadoVoluntario {
    const novoChamado: ChamadoVoluntario = {
      ...chamado,
      id: this.gerarId(),
      dataCriacao: new Date(),
      voluntariosInscritos: [],
    };

    this.chamados.set(novoChamado.id, novoChamado);
    return novoChamado;
  }

  /**
   * Inscrever voluntário em chamado
   */
  public inscreverEmChamado(chamadoId: string, voluntarioId: string): boolean {
    const chamado = this.chamados.get(chamadoId);
    if (!chamado) return false;

    if (chamado.voluntariosInscritos.includes(voluntarioId)) {
      return false; // Já inscrito
    }

    if (chamado.voluntariosInscritos.length >= chamado.numeroVoluntarios) {
      return false; // Chamado lotado
    }

    chamado.voluntariosInscritos.push(voluntarioId);
    return true;
  }

  /**
   * Obter chamados ativos
   */
  public obterChamadosAtivos(): ChamadoVoluntario[] {
    return Array.from(this.chamados.values()).filter(
      c => c.status === 'aberto' && new Date(c.dataFim) > new Date()
    );
  }

  /**
   * Recomendar voluntários para chamado
   */
  public recomendarVoluntariosParaChamado(chamadoId: string): Voluntario[] {
    const chamado = this.chamados.get(chamadoId);
    if (!chamado) return [];

    // Buscar voluntários com as habilidades necessárias
    const voluntarios = this.buscarVoluntarios({
      latitude: chamado.localidade.latitude,
      longitude: chamado.localidade.longitude,
      raio: 50, // 50km
      status: 'ativo',
    });

    // Filtrar por habilidades
    const recomendados = voluntarios.filter(v =>
      chamado.habilidadesNecessarias.some(hab =>
        v.habilidades.some(h => h.tipo.includes(hab.toLowerCase()))
      )
    );

    // Ordenar por distância e avaliação
    return recomendados.sort((a, b) => {
      const distA = this.calcularDistancia(
        chamado.localidade.latitude,
        chamado.localidade.longitude,
        a.endereco.latitude,
        a.endereco.longitude
      );
      const distB = this.calcularDistancia(
        chamado.localidade.latitude,
        chamado.localidade.longitude,
        b.endereco.latitude,
        b.endereco.longitude
      );

      // Priorizar por avaliação e depois por distância
      if (b.mediaAvaliacao !== a.mediaAvaliacao) {
        return b.mediaAvaliacao - a.mediaAvaliacao;
      }
      return distA - distB;
    });
  }

  // ==================== MÉTODOS AUXILIARES ====================

  private gerarId(): string {
    return `VOL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private inicializarDadosExemplo(): void {
    // Adicionar alguns voluntários de exemplo
    const exemplos: Partial<Voluntario>[] = [
      {
        nome: 'Maria Silva Santos',
        cpf: '123.456.789-00',
        email: 'maria.silva@email.com',
        telefone: '(51) 99999-1111',
        dataNascimento: new Date('1990-05-15'),
        genero: 'feminino',
        endereco: {
          cep: '90000-000',
          rua: 'Rua dos Voluntários',
          numero: '100',
          bairro: 'Centro',
          cidade: 'Porto Alegre',
          estado: 'RS',
          latitude: -30.0346,
          longitude: -51.2177,
        },
        habilidades: [
          { tipo: 'primeiros socorros', nivel: 'avançado', certificacao: 'Cruz Vermelha' },
          { tipo: 'enfermagem', nivel: 'especialista' },
        ],
        profissao: 'Enfermeira',
        escolaridade: 'superior',
        disponibilidade: {
          diasDaSemana: ['sábado', 'domingo'],
          horarios: 'integral',
          tipoAtuacao: ['atendimento médico', 'abrigo'],
        },
        contatoEmergencia: {
          nome: 'João Silva',
          telefone: '(51) 99999-2222',
          parentesco: 'Esposo',
        },
      },
    ];

    // Cadastrar voluntários de exemplo
    // (comentado para não poluir - descomentar se necessário)
    // exemplos.forEach(ex => this.cadastrarVoluntario(ex));
  }
}

// Exportar instância única
export const voluntarioAPI = VoluntarioAPIService.getInstance();
