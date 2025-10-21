/**
 * Serviço de Registro de Necessidades
 * Permite que vítimas registrem pedidos de ajuda de forma ultra-simples
 * Incluindo cadastro via WhatsApp (áudio/texto)
 */

// ==================== INTERFACES ====================

export interface Localizacao {
  latitude: number;
  longitude: number;
  endereco?: string;
  municipio: string;
  bairro?: string;
  pontoReferencia?: string;
  codigoIBGE?: string;
}

export interface PessoasAfetadas {
  total: number;
  adultos: number;
  criancas: number;
  idosos: number;
  gestantes: number;
  pessoasComDeficiencia: number;
  pessoasComMobilidadeReduzida: number;
}

export interface AnimaisAfetados {
  total: number;
  caes: number;
  gatos: number;
  outros: number;
  especificacao?: string; // Ex: "2 cavalos, 5 galinhas"
}

export interface NecessidadeEspecifica {
  id: string;
  categoria: 
    | 'alimentos' 
    | 'agua' 
    | 'medicamentos' 
    | 'higiene' 
    | 'roupas' 
    | 'fraldas' 
    | 'itens-bebe' 
    | 'itens-crianca' 
    | 'racao-animal' 
    | 'abrigo' 
    | 'resgate' 
    | 'atendimento-medico'
    | 'outro';
  descricao: string;
  quantidade?: number;
  unidade?: string;
  urgencia: 'baixa' | 'media' | 'alta' | 'critica';
  especificacoes?: string; // Ex: "Insulina NPH", "Fraldas tamanho M", "Leite sem lactose"
}

export interface SituacaoEmergencia {
  tipo: 
    | 'enchente' 
    | 'deslizamento' 
    | 'vendaval' 
    | 'incendio' 
    | 'desabamento' 
    | 'ilhamento' 
    | 'desaparecimento'
    | 'outro';
  gravidade: 'baixa' | 'media' | 'alta' | 'critica';
  descricao: string;
  tempoEstimadoAteResgate?: number; // em minutos
  acessoVeiculo: 'sim' | 'nao' | 'parcial';
  acessoApe: 'sim' | 'nao' | 'perigoso';
  acessoBarco: 'sim' | 'nao' | 'necessario';
  alturaAgua?: number; // em metros
  riscoDeslizamento?: boolean;
  tempoNoLocal?: number; // há quantos minutos/horas está na situação
}

export interface Solicitante {
  nome: string;
  telefone: string;
  telefoneAlternativo?: string;
  ehPropriAVitima: boolean;
  relacaoComVitimas?: string; // Se não for a própria vítima
  observacoes?: string;
}

export interface RegistroNecessidade {
  id: string;
  protocolo: string; // RN/2025/00001
  dataHoraCadastro: string;
  dataHoraAtualizacao: string;
  
  // Dados da situação
  situacao: SituacaoEmergencia;
  localizacao: Localizacao;
  
  // Pessoas e animais
  pessoas: PessoasAfetadas;
  animais?: AnimaisAfetados;
  
  // Necessidades
  necessidades: NecessidadeEspecifica[];
  
  // Solicitante
  solicitante: Solicitante;
  
  // Origem do cadastro
  origemCadastro: 'web' | 'app' | 'whatsapp-texto' | 'whatsapp-audio' | 'telefone' | 'presencial';
  transcricaoAudio?: string; // Se veio de áudio do WhatsApp
  audioUrl?: string;
  
  // Status e acompanhamento
  status: 'aguardando' | 'em-atendimento' | 'atendido-parcial' | 'atendido-completo' | 'cancelado';
  prioridade: 1 | 2 | 3 | 4 | 5; // 1 = máxima, 5 = mínima
  
  // Atendimento
  voluntariosDesignados?: string[]; // IDs dos voluntários
  abrigoDesignado?: string;
  dataHoraAtendimento?: string;
  observacoesAtendimento?: string;
  
  // Metadados
  verificado: boolean;
  latitude: number;
  longitude: number;
  tags: string[];
}

export interface CadastroSimplificado {
  // Campos mínimos para situação de emergência extrema
  nome: string;
  telefone: string;
  localizacao: string; // Pode ser endereço ou descrição
  numeroPessoas: number;
  urgencia: 'alta' | 'critica';
  descricaoRapida: string; // "Estou ilhado com 3 pessoas e 2 cachorros"
}

export interface FiltrosBusca {
  municipio?: string;
  status?: RegistroNecessidade['status'][];
  prioridade?: number[];
  tipoSituacao?: SituacaoEmergencia['tipo'][];
  dataInicio?: string;
  dataFim?: string;
  verificadoApenas?: boolean;
  comAnimais?: boolean;
  urgenciaMinima?: NecessidadeEspecifica['urgencia'];
}

export interface EstatisticasNecessidades {
  total: number;
  aguardando: number;
  emAtendimento: number;
  atendidoParcial: number;
  atendidoCompleto: number;
  
  totalPessoas: number;
  totalAnimais: number;
  
  porMunicipio: { [municipio: string]: number };
  porTipoSituacao: { [tipo: string]: number };
  porCategoriaNecessidade: { [categoria: string]: number };
  
  urgenciasCriticas: number;
  urgenciasAltas: number;
  
  tempoMedioAtendimento: number; // em minutos
  taxaAtendimento: number; // percentual
}

// ==================== SERVIÇO ====================

class RegistroNecessidadesService {
  private static instance: RegistroNecessidadesService;
  private registros: Map<string, RegistroNecessidade> = new Map();
  private contadorProtocolo: number = 1;

  private constructor() {
    this.inicializarDadosMock();
  }

  public static getInstance(): RegistroNecessidadesService {
    if (!RegistroNecessidadesService.instance) {
      RegistroNecessidadesService.instance = new RegistroNecessidadesService();
    }
    return RegistroNecessidadesService.instance;
  }

  // ==================== CADASTRO COMPLETO ====================

  /**
   * Registrar uma necessidade completa
   */
  public registrarNecessidade(
    dados: Omit<RegistroNecessidade, 'id' | 'protocolo' | 'dataHoraCadastro' | 'dataHoraAtualizacao' | 'latitude' | 'longitude' | 'prioridade' | 'verificado' | 'tags'>
  ): RegistroNecessidade {
    const id = `RN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const protocolo = `RN/2025/${String(this.contadorProtocolo++).padStart(5, '0')}`;
    const agora = new Date().toISOString();

    // Calcular prioridade automaticamente
    const prioridade = this.calcularPrioridade(dados.situacao, dados.necessidades, dados.pessoas);

    const registro: RegistroNecessidade = {
      ...dados,
      id,
      protocolo,
      dataHoraCadastro: agora,
      dataHoraAtualizacao: agora,
      latitude: dados.localizacao.latitude,
      longitude: dados.localizacao.longitude,
      prioridade,
      verificado: false,
      tags: this.gerarTags(dados)
    };

    this.registros.set(id, registro);

    // Notificar sistema de matching
    this.notificarNovoRegistro(registro);

    return registro;
  }

  // ==================== CADASTRO SIMPLIFICADO ====================

  /**
   * Cadastro ultra-simplificado para emergências críticas
   * Ideal para WhatsApp, telefone ou situações extremas
   */
  public cadastroSimplificado(dados: CadastroSimplificado): RegistroNecessidade {
    const id = `RN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const protocolo = `RN/2025/${String(this.contadorProtocolo++).padStart(5, '0')}`;
    const agora = new Date().toISOString();

    const registro: RegistroNecessidade = {
      id,
      protocolo,
      dataHoraCadastro: agora,
      dataHoraAtualizacao: agora,
      
      situacao: {
        tipo: 'ilhamento', // Assumir mais comum
        gravidade: dados.urgencia === 'critica' ? 'critica' : 'alta',
        descricao: dados.descricaoRapida,
        acessoVeiculo: 'nao',
        acessoApe: 'nao',
        acessoBarco: 'necessario'
      },
      
      localizacao: {
        latitude: 0, // Será geolocalizado depois
        longitude: 0,
        endereco: dados.localizacao,
        municipio: 'A definir' // Será identificado depois
      },
      
      pessoas: {
        total: dados.numeroPessoas,
        adultos: dados.numeroPessoas,
        criancas: 0,
        idosos: 0,
        gestantes: 0,
        pessoasComDeficiencia: 0,
        pessoasComMobilidadeReduzida: 0
      },
      
      necessidades: [
        {
          id: `NEC${Date.now()}`,
          categoria: 'resgate',
          descricao: 'Resgate urgente',
          urgencia: dados.urgencia,
          especificacoes: dados.descricaoRapida
        }
      ],
      
      solicitante: {
        nome: dados.nome,
        telefone: dados.telefone,
        ehPropriAVitima: true
      },
      
      origemCadastro: 'whatsapp-texto', // Padrão
      status: 'aguardando',
      prioridade: dados.urgencia === 'critica' ? 1 : 2,
      verificado: false,
      latitude: 0,
      longitude: 0,
      tags: ['emergencia', 'simplificado', 'urgente']
    };

    this.registros.set(id, registro);
    this.notificarNovoRegistro(registro);

    return registro;
  }

  // ==================== CADASTRO VIA WHATSAPP ====================

  /**
   * Processar mensagem de texto do WhatsApp
   */
  public async processarWhatsAppTexto(
    telefone: string,
    mensagem: string
  ): Promise<RegistroNecessidade> {
    // Extrair informações da mensagem usando regex e IA
    const dados = this.extrairInformacoesMensagem(mensagem, telefone);
    
    const registro = this.registrarNecessidade({
      ...dados,
      origemCadastro: 'whatsapp-texto',
      solicitante: {
        ...dados.solicitante,
        telefone
      }
    });

    return registro;
  }

  /**
   * Processar áudio do WhatsApp
   */
  public async processarWhatsAppAudio(
    telefone: string,
    audioUrl: string
  ): Promise<RegistroNecessidade> {
    // Transcrever áudio usando API de Speech-to-Text
    const transcricao = await this.transcreverAudio(audioUrl);
    
    // Processar transcricao como texto
    const dados = this.extrairInformacoesMensagem(transcricao, telefone);
    
    const registro = this.registrarNecessidade({
      ...dados,
      origemCadastro: 'whatsapp-audio',
      transcricaoAudio: transcricao,
      audioUrl,
      solicitante: {
        ...dados.solicitante,
        telefone
      }
    });

    return registro;
  }

  // ==================== BUSCA E FILTROS ====================

  /**
   * Buscar registros com filtros
   */
  public buscarRegistros(filtros: FiltrosBusca = {}): RegistroNecessidade[] {
    let resultados = Array.from(this.registros.values());

    if (filtros.municipio) {
      resultados = resultados.filter(r => 
        r.localizacao.municipio.toLowerCase().includes(filtros.municipio!.toLowerCase())
      );
    }

    if (filtros.status && filtros.status.length > 0) {
      resultados = resultados.filter(r => filtros.status!.includes(r.status));
    }

    if (filtros.prioridade && filtros.prioridade.length > 0) {
      resultados = resultados.filter(r => filtros.prioridade!.includes(r.prioridade));
    }

    if (filtros.tipoSituacao && filtros.tipoSituacao.length > 0) {
      resultados = resultados.filter(r => filtros.tipoSituacao!.includes(r.situacao.tipo));
    }

    if (filtros.verificadoApenas) {
      resultados = resultados.filter(r => r.verificado);
    }

    if (filtros.comAnimais) {
      resultados = resultados.filter(r => r.animais && r.animais.total > 0);
    }

    // Ordenar por prioridade e data
    resultados.sort((a, b) => {
      if (a.prioridade !== b.prioridade) {
        return a.prioridade - b.prioridade;
      }
      return new Date(b.dataHoraCadastro).getTime() - new Date(a.dataHoraCadastro).getTime();
    });

    return resultados;
  }

  /**
   * Buscar registro por ID ou protocolo
   */
  public buscarPorId(idOuProtocolo: string): RegistroNecessidade | undefined {
    // Buscar por ID
    if (this.registros.has(idOuProtocolo)) {
      return this.registros.get(idOuProtocolo);
    }

    // Buscar por protocolo
    return Array.from(this.registros.values()).find(r => r.protocolo === idOuProtocolo);
  }

  /**
   * Buscar registros urgentes (prioridade 1 ou 2)
   */
  public buscarUrgentes(): RegistroNecessidade[] {
    return this.buscarRegistros({
      prioridade: [1, 2],
      status: ['aguardando', 'em-atendimento']
    });
  }

  /**
   * Buscar registros próximos a uma localização
   */
  public buscarProximos(
    latitude: number,
    longitude: number,
    raioKm: number = 5
  ): RegistroNecessidade[] {
    const registros = this.buscarRegistros();
    
    return registros.filter(r => {
      const distancia = this.calcularDistancia(
        latitude,
        longitude,
        r.latitude,
        r.longitude
      );
      return distancia <= raioKm;
    }).sort((a, b) => {
      const distA = this.calcularDistancia(latitude, longitude, a.latitude, a.longitude);
      const distB = this.calcularDistancia(latitude, longitude, b.latitude, b.longitude);
      return distA - distB;
    });
  }

  // ==================== ATUALIZAÇÃO ====================

  /**
   * Atualizar status do registro
   */
  public atualizarStatus(
    id: string,
    status: RegistroNecessidade['status'],
    observacoes?: string
  ): void {
    const registro = this.registros.get(id);
    if (!registro) {
      throw new Error(`Registro ${id} não encontrado`);
    }

    registro.status = status;
    registro.dataHoraAtualizacao = new Date().toISOString();
    
    if (status === 'em-atendimento') {
      registro.dataHoraAtendimento = new Date().toISOString();
    }
    
    if (observacoes) {
      registro.observacoesAtendimento = observacoes;
    }

    this.registros.set(id, registro);
  }

  /**
   * Designar voluntários
   */
  public designarVoluntarios(id: string, voluntariosIds: string[]): void {
    const registro = this.registros.get(id);
    if (!registro) {
      throw new Error(`Registro ${id} não encontrado`);
    }

    registro.voluntariosDesignados = voluntariosIds;
    registro.status = 'em-atendimento';
    registro.dataHoraAtualizacao = new Date().toISOString();
    
    this.registros.set(id, registro);
  }

  /**
   * Verificar registro (após confirmação)
   */
  public verificarRegistro(id: string): void {
    const registro = this.registros.get(id);
    if (!registro) {
      throw new Error(`Registro ${id} não encontrado`);
    }

    registro.verificado = true;
    registro.dataHoraAtualizacao = new Date().toISOString();
    
    this.registros.set(id, registro);
  }

  // ==================== ESTATÍSTICAS ====================

  /**
   * Obter estatísticas gerais
   */
  public obterEstatisticas(filtros: FiltrosBusca = {}): EstatisticasNecessidades {
    const registros = this.buscarRegistros(filtros);

    const stats: EstatisticasNecessidades = {
      total: registros.length,
      aguardando: registros.filter(r => r.status === 'aguardando').length,
      emAtendimento: registros.filter(r => r.status === 'em-atendimento').length,
      atendidoParcial: registros.filter(r => r.status === 'atendido-parcial').length,
      atendidoCompleto: registros.filter(r => r.status === 'atendido-completo').length,
      
      totalPessoas: registros.reduce((sum, r) => sum + r.pessoas.total, 0),
      totalAnimais: registros.reduce((sum, r) => sum + (r.animais?.total || 0), 0),
      
      porMunicipio: {},
      porTipoSituacao: {},
      porCategoriaNecessidade: {},
      
      urgenciasCriticas: registros.filter(r => r.prioridade === 1).length,
      urgenciasAltas: registros.filter(r => r.prioridade <= 2).length,
      
      tempoMedioAtendimento: 0,
      taxaAtendimento: 0
    };

    // Por município
    registros.forEach(r => {
      const mun = r.localizacao.municipio;
      stats.porMunicipio[mun] = (stats.porMunicipio[mun] || 0) + 1;
    });

    // Por tipo de situação
    registros.forEach(r => {
      const tipo = r.situacao.tipo;
      stats.porTipoSituacao[tipo] = (stats.porTipoSituacao[tipo] || 0) + 1;
    });

    // Por categoria de necessidade
    registros.forEach(r => {
      r.necessidades.forEach(nec => {
        stats.porCategoriaNecessidade[nec.categoria] = 
          (stats.porCategoriaNecessidade[nec.categoria] || 0) + 1;
      });
    });

    // Taxa de atendimento
    const atendidos = stats.atendidoParcial + stats.atendidoCompleto;
    stats.taxaAtendimento = stats.total > 0 ? (atendidos / stats.total) * 100 : 0;

    return stats;
  }

  // ==================== MÉTODOS AUXILIARES ====================

  /**
   * Calcular prioridade automaticamente
   */
  private calcularPrioridade(
    situacao: SituacaoEmergencia,
    necessidades: NecessidadeEspecifica[],
    pessoas: PessoasAfetadas
  ): 1 | 2 | 3 | 4 | 5 {
    let pontos = 0;

    // Gravidade da situação
    if (situacao.gravidade === 'critica') pontos += 100;
    else if (situacao.gravidade === 'alta') pontos += 70;
    else if (situacao.gravidade === 'media') pontos += 40;
    else pontos += 20;

    // Urgência das necessidades
    const temCritica = necessidades.some(n => n.urgencia === 'critica');
    const temAlta = necessidades.some(n => n.urgencia === 'alta');
    if (temCritica) pontos += 50;
    else if (temAlta) pontos += 30;

    // Grupos vulneráveis
    if (pessoas.criancas > 0) pontos += 15;
    if (pessoas.idosos > 0) pontos += 15;
    if (pessoas.gestantes > 0) pontos += 20;
    if (pessoas.pessoasComDeficiencia > 0) pontos += 20;

    // Tipo de resgate necessário
    if (necessidades.some(n => n.categoria === 'resgate')) pontos += 40;
    if (necessidades.some(n => n.categoria === 'atendimento-medico')) pontos += 35;

    // Converter pontos em prioridade
    if (pontos >= 150) return 1; // Máxima
    if (pontos >= 100) return 2; // Alta
    if (pontos >= 60) return 3;  // Média
    if (pontos >= 30) return 4;  // Baixa
    return 5;                     // Mínima
  }

  /**
   * Gerar tags para busca
   */
  private gerarTags(dados: Partial<RegistroNecessidade>): string[] {
    const tags: string[] = [];

    if (dados.situacao) {
      tags.push(dados.situacao.tipo);
      tags.push(dados.situacao.gravidade);
    }

    if (dados.localizacao) {
      tags.push(dados.localizacao.municipio.toLowerCase());
    }

    if (dados.necessidades) {
      dados.necessidades.forEach(nec => {
        tags.push(nec.categoria);
        tags.push(nec.urgencia);
      });
    }

    if (dados.animais && dados.animais.total > 0) {
      tags.push('com-animais');
    }

    if (dados.pessoas) {
      if (dados.pessoas.criancas > 0) tags.push('com-criancas');
      if (dados.pessoas.idosos > 0) tags.push('com-idosos');
      if (dados.pessoas.gestantes > 0) tags.push('com-gestantes');
    }

    return tags;
  }

  /**
   * Notificar sistema de matching
   */
  private notificarNovoRegistro(registro: RegistroNecessidade): void {
    // TODO: Implementar notificação para sistema de matching
    // TODO: Enviar push notification para voluntários próximos
    // TODO: Alertar equipes de resgate se prioridade 1 ou 2
    console.log(`✅ Novo registro criado: ${registro.protocolo} - Prioridade ${registro.prioridade}`);
  }

  /**
   * Extrair informações de mensagem de texto
   */
  private extrairInformacoesMensagem(
    mensagem: string,
    telefone: string
  ): Omit<RegistroNecessidade, 'id' | 'protocolo' | 'dataHoraCadastro' | 'dataHoraAtualizacao' | 'latitude' | 'longitude' | 'prioridade' | 'verificado' | 'origemCadastro'> {
    // TODO: Implementar IA para extrair informações
    // Por enquanto, retornar estrutura básica
    return {
      situacao: {
        tipo: 'ilhamento',
        gravidade: 'alta',
        descricao: mensagem,
        acessoVeiculo: 'nao',
        acessoApe: 'nao',
        acessoBarco: 'necessario'
      },
      localizacao: {
        latitude: 0,
        longitude: 0,
        municipio: 'A definir'
      },
      pessoas: {
        total: 1,
        adultos: 1,
        criancas: 0,
        idosos: 0,
        gestantes: 0,
        pessoasComDeficiencia: 0,
        pessoasComMobilidadeReduzida: 0
      },
      necessidades: [
        {
          id: `NEC${Date.now()}`,
          categoria: 'resgate',
          descricao: 'Resgate urgente',
          urgencia: 'alta'
        }
      ],
      solicitante: {
        nome: 'Não informado',
        telefone,
        ehPropriAVitima: true
      },
      status: 'aguardando',
      tags: ['whatsapp', 'urgente']
    };
  }

  /**
   * Transcrever áudio
   */
  private async transcreverAudio(audioUrl: string): Promise<string> {
    // TODO: Integrar com API de Speech-to-Text (Google Cloud, AWS, Azure)
    return "Transcrição simulada do áudio";
  }

  /**
   * Calcular distância entre duas coordenadas (Haversine)
   */
  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  // ==================== DADOS MOCK ====================

  private inicializarDadosMock(): void {
    // Exemplo 1: Família ilhada em Porto Alegre
    this.registrarNecessidade({
      situacao: {
        tipo: 'enchente',
        gravidade: 'critica',
        descricao: 'Família ilhada no segundo andar da casa. Água subindo rápido.',
        acessoVeiculo: 'nao',
        acessoApe: 'nao',
        acessoBarco: 'necessario',
        alturaAgua: 2.5,
        tempoNoLocal: 180
      },
      localizacao: {
        latitude: -30.0346,
        longitude: -51.2177,
        endereco: 'Rua dos Andradas, 1234',
        municipio: 'Porto Alegre',
        bairro: 'Centro Histórico',
        pontoReferencia: 'Próximo ao Mercado Público'
      },
      pessoas: {
        total: 5,
        adultos: 2,
        criancas: 2,
        idosos: 1,
        gestantes: 0,
        pessoasComDeficiencia: 0,
        pessoasComMobilidadeReduzida: 1
      },
      animais: {
        total: 2,
        caes: 2,
        gatos: 0,
        outros: 0
      },
      necessidades: [
        {
          id: 'NEC001',
          categoria: 'resgate',
          descricao: 'Resgate urgente com barco',
          urgencia: 'critica'
        },
        {
          id: 'NEC002',
          categoria: 'medicamentos',
          descricao: 'Insulina NPH',
          quantidade: 2,
          unidade: 'ampolas',
          urgencia: 'alta',
          especificacoes: 'Idoso diabético precisa de insulina'
        },
        {
          id: 'NEC003',
          categoria: 'fraldas',
          descricao: 'Fraldas infantis',
          quantidade: 10,
          unidade: 'unidades',
          urgencia: 'media',
          especificacoes: 'Tamanho M'
        }
      ],
      solicitante: {
        nome: 'Maria Silva',
        telefone: '(51) 99999-1111',
        telefoneAlternativo: '(51) 98888-2222',
        ehPropriAVitima: true
      },
      origemCadastro: 'whatsapp-texto',
      status: 'aguardando'
    });

    // Exemplo 2: Pessoa sozinha (cadastro simplificado)
    this.cadastroSimplificado({
      nome: 'João Santos',
      telefone: '(51) 97777-3333',
      localizacao: 'Bairro Humaitá, perto da escola municipal',
      numeroPessoas: 1,
      urgencia: 'alta',
      descricaoRapida: 'Estou no telhado, água já passou da cintura'
    });

    // Exemplo 3: Abrigo com várias necessidades
    this.registrarNecessidade({
      situacao: {
        tipo: 'enchente',
        gravidade: 'media',
        descricao: 'Abrigo improvisado com 45 desabrigados',
        acessoVeiculo: 'sim',
        acessoApe: 'sim',
        acessoBarco: 'nao'
      },
      localizacao: {
        latitude: -29.6883,
        longitude: -51.4354,
        endereco: 'Ginásio Municipal',
        municipio: 'Novo Hamburgo',
        bairro: 'Centro'
      },
      pessoas: {
        total: 45,
        adultos: 28,
        criancas: 12,
        idosos: 5,
        gestantes: 2,
        pessoasComDeficiencia: 3,
        pessoasComMobilidadeReduzida: 5
      },
      animais: {
        total: 8,
        caes: 6,
        gatos: 2,
        outros: 0
      },
      necessidades: [
        {
          id: 'NEC004',
          categoria: 'alimentos',
          descricao: 'Alimentos não perecíveis',
          quantidade: 100,
          unidade: 'kg',
          urgencia: 'alta'
        },
        {
          id: 'NEC005',
          categoria: 'agua',
          descricao: 'Água potável',
          quantidade: 200,
          unidade: 'litros',
          urgencia: 'critica'
        },
        {
          id: 'NEC006',
          categoria: 'fraldas',
          descricao: 'Fraldas geriátricas',
          quantidade: 50,
          unidade: 'unidades',
          urgencia: 'alta'
        },
        {
          id: 'NEC007',
          categoria: 'racao-animal',
          descricao: 'Ração para cães',
          quantidade: 20,
          unidade: 'kg',
          urgencia: 'media'
        }
      ],
      solicitante: {
        nome: 'Coordenação do Abrigo',
        telefone: '(51) 96666-4444',
        ehPropriAVitima: false,
        relacaoComVitimas: 'Coordenador do abrigo municipal'
      },
      origemCadastro: 'telefone',
      status: 'em-atendimento',
      voluntariosDesignados: ['VOL001', 'VOL002', 'VOL003']
    });
  }
}

// Exportar instância singleton
export default RegistroNecessidadesService.getInstance();
