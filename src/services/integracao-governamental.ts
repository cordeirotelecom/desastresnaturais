/**
 * SERVIÇO DE INTEGRAÇÃO GOVERNAMENTAL COMPLETO
 * 
 * Integração com sistemas oficiais de gestão de desastres:
 * - S2ID (Sistema Integrado de Informações sobre Desastres) - SEDEC/Federal
 * - SEGIRD (Sistema Estadual de Gestão Integrada de Riscos e Desastres) - RS
 * - Serviço Geológico do Brasil (CPRM/SGB)
 * - Sistemas de Monitoramento e Legislação
 * 
 * Metodologia DHS (Desenvolvimento Harmônico e Sustentável) integrada
 * Via: https://dhsviapgs.vercel.app/
 */

// ============================================================================
// INTERFACES - SISTEMAS GOVERNAMENTAIS
// ============================================================================

/**
 * S2ID - Sistema Integrado de Informações sobre Desastres (Federal)
 * Fonte: SEDEC - Secretaria Nacional de Proteção e Defesa Civil
 */
export interface S2IDDesastre {
  id: string;
  codigoIBGE: string; // Código do município
  municipio: string;
  uf: string;
  tipoDesastre: string; // COBRADE
  cobradeCompleto: string; // Ex: "1.3.2.1.4 - Enxurradas"
  dataOcorrencia: string;
  situacao: 'SE' | 'ECP' | 'Normalidade'; // Situação de Emergência / Estado de Calamidade Pública
  numeroDecreto: string;
  dataDecreto: string;
  validadeDecreto: string;
  
  // Impactos
  pessoasAfetadas: number;
  desabrigados: number;
  desalojados: number;
  feridos: number;
  enfermos: number;
  mortos: number;
  desaparecidos: number;
  
  // Danos
  habitacoesDestruidas: number;
  habitacoesDanificadas: number;
  instalacoesPublicasDestruidas: number;
  instalacoesPublicasDanificadas: number;
  
  // Recursos
  recursosEstadualSolicitado: number;
  recursosFederalSolicitado: number;
  recursosEstadualRecebido: number;
  recursosFederalRecebido: number;
  
  // Documentação
  documentosAnexados: DocumentoS2ID[];
  status: 'Aguardando Análise' | 'Em Análise' | 'Deferido' | 'Indeferido' | 'Cancelado';
}

export interface DocumentoS2ID {
  tipo: 'Decreto' | 'FIDE' | 'NADE' | 'DACA' | 'P2R2' | 'Relatório Fotográfico' | 'Outro';
  nome: string;
  url: string;
  dataUpload: string;
  tamanho: number; // bytes
}

/**
 * SEGIRD - Sistema Estadual de Gestão Integrada de Riscos e Desastres (RS)
 */
export interface SEGIRDOcorrencia {
  id: string;
  numeroProtocolo: string;
  municipio: string;
  coordenadoriaRegional: string; // COREDES
  dataHoraOcorrencia: string;
  
  // Tipo de evento
  tipoEvento: 'Inundação' | 'Enxurrada' | 'Alagamento' | 'Deslizamento' | 'Vendaval' | 
              'Granizo' | 'Tornado' | 'Estiagem' | 'Incêndio Florestal' | 'Outro';
  gravidade: 'Baixa' | 'Média' | 'Alta' | 'Muito Alta';
  
  // Localização
  endereco: string;
  bairro: string;
  latitude: number;
  longitude: number;
  areaRisco: boolean; // Está em área de risco catalogada?
  codigoAreaRisco?: string;
  
  // Dados do solicitante
  nomeSolicitante: string;
  cpfSolicitante: string;
  telefoneSolicitante: string;
  emailSolicitante: string;
  
  // Atendimento
  statusAtendimento: 'Aguardando' | 'Em Atendimento' | 'Concluído' | 'Cancelado';
  equipeResponsavel?: string;
  dataHoraAtendimento?: string;
  dataHoraConclusao?: string;
  observacoes: string;
  
  // Ações realizadas
  acoesRealizadas: AcaoDefesaCivil[];
  recursosUtilizados: RecursoUtilizado[];
}

export interface AcaoDefesaCivil {
  tipo: 'Vistoria' | 'Evacuação' | 'Resgate' | 'Distribuição de Suprimentos' | 
        'Interdição' | 'Limpeza' | 'Desobstrução' | 'Outro';
  descricao: string;
  responsavel: string;
  dataHora: string;
  resultado: string;
}

export interface RecursoUtilizado {
  tipo: 'Viatura' | 'Equipamento' | 'Material' | 'Pessoal';
  descricao: string;
  quantidade: number;
  unidade: string;
}

/**
 * Serviço Geológico do Brasil (SGB/CPRM)
 * Áreas de risco geológico-geotécnico
 */
export interface AreaRiscoGeologico {
  id: string;
  codigoArea: string;
  municipio: string;
  uf: string;
  bairro: string;
  
  // Classificação
  tipoProcesso: 'Deslizamento' | 'Inundação' | 'Enxurrada' | 'Erosão' | 'Solapamento';
  grauRisco: 'R1 - Baixo' | 'R2 - Médio' | 'R3 - Alto' | 'R4 - Muito Alto';
  
  // Geolocalização
  geometria: {
    tipo: 'Polygon' | 'Point';
    coordenadas: number[][] | number[];
  };
  
  // População
  setoresCenso: string[];
  familias: number;
  pessoas: number;
  moradias: number;
  
  // Características
  descricaoArea: string;
  condicoesAmbientais: string;
  ocupacaoSolo: string;
  intervencoes: string[];
  
  // Monitoramento
  possuiMonitoramento: boolean;
  tipoMonitoramento?: 'Pluviométrico' | 'Geotécnico' | 'Misto';
  dataUltimaVistoria: string;
  responsavelVistoria: string;
}

/**
 * Monitoramento de Níveis dos Rios
 * Integração com ANA (Agência Nacional de Águas)
 */
export interface EstacaoFluviometrica {
  codigo: string; // Código ANA
  nome: string;
  rio: string;
  municipio: string;
  uf: string;
  bacia: string;
  
  // Localização
  latitude: number;
  longitude: number;
  altitude: number;
  
  // Níveis
  nivelAtual: number; // metros
  nivelAlerta: number;
  nivelEmergencia: number;
  nivelInundacao: number;
  
  // Status
  status: 'Normal' | 'Atenção' | 'Alerta' | 'Emergência';
  tendencia: 'Subindo' | 'Estável' | 'Descendo';
  variacao24h: number; // cm/24h
  
  // Dados históricos
  ultimaAtualizacao: string;
  historicoLeituras: LeituraFluviometrica[];
  
  // Previsão
  previsao24h?: number;
  previsao48h?: number;
  previsao72h?: number;
}

export interface LeituraFluviometrica {
  dataHora: string;
  nivel: number; // metros
  vazao?: number; // m³/s
  precipitacao?: number; // mm
}

/**
 * Monitoramento por Radar Meteorológico
 */
export interface DadosRadar {
  id: string;
  nomeRadar: string;
  localizacao: {
    cidade: string;
    uf: string;
    latitude: number;
    longitude: number;
  };
  
  // Dados meteorológicos
  dataHora: string;
  refletividade: number; // dBZ
  precipitacao: number; // mm/h
  tipoEco: 'Estratiforme' | 'Convectivo' | 'Misto';
  
  // Alertas
  alertaGranizo: boolean;
  alertaTempestadeSevera: boolean;
  alertaTornado: boolean;
  
  // Áreas afetadas
  municipiosAlerta: string[];
  raioCobertura: number; // km
}

/**
 * Legislação e Decretos
 */
export interface Decreto {
  numero: string;
  tipo: 'SE' | 'ECP'; // Situação de Emergência / Estado de Calamidade Pública
  municipio: string;
  uf: string;
  
  dataPublicacao: string;
  dataInicio: string;
  dataTermino: string;
  prorrogacoes: Prorrogacao[];
  
  // Documentação
  urlDiarioOficial: string;
  urlS2ID: string;
  
  // Reconhecimento
  reconhecidoEstado: boolean;
  dataReconhecimentoEstado?: string;
  numeroPortariaEstadual?: string;
  
  reconhecidoFederal: boolean;
  dataReconhecimentoFederal?: string;
  numeroPortariaFederal?: string;
  
  // Status
  status: 'Vigente' | 'Expirado' | 'Revogado';
  motivoRevogacao?: string;
}

export interface Prorrogacao {
  numeroDecreto: string;
  dataPublicacao: string;
  novaDataTermino: string;
}

/**
 * DACA - Declaração de Atuação em Condições de Calamidade
 */
export interface DACA {
  id: string;
  numeroProtocolo: string;
  municipio: string;
  desastre: string;
  
  // Dados do profissional/empresa
  responsavel: string;
  cpfCnpj: string;
  conselhoProfissional: string;
  numeroRegistro: string;
  
  // Serviços
  servicosDeclarados: ServicoDACA[];
  dataInicio: string;
  dataTermino: string;
  
  // Documentação
  documentosAnexados: string[];
  status: 'Ativa' | 'Encerrada' | 'Cancelada';
}

export interface ServicoDACA {
  tipo: string;
  descricao: string;
  endereco: string;
  valor: number;
}

/**
 * P2R2 - Plano de Preparação e Resposta Rápida
 */
export interface P2R2 {
  id: string;
  municipio: string;
  anoElaboracao: number;
  versao: string;
  
  // Equipe elaboradora
  coordenador: string;
  membros: MembroEquipeP2R2[];
  
  // Cenários de risco
  cenariosRisco: CenarioRisco[];
  
  // Recursos disponíveis
  recursosHumanos: RecursoHumano[];
  recursosMateriais: RecursoMaterial[];
  
  // Protocolos
  protocolosResposta: ProtocoloResposta[];
  
  // Treinamentos
  treinamentosRealizados: Treinamento[];
  
  // Validação
  dataAprovacao: string;
  aprovadoPor: string;
  urlDocumento: string;
  status: 'Elaboração' | 'Aprovado' | 'Vigente' | 'Desatualizado';
}

export interface MembroEquipeP2R2 {
  nome: string;
  cargo: string;
  orgao: string;
  telefone: string;
  email: string;
}

export interface CenarioRisco {
  tipo: string;
  probabilidade: 'Baixa' | 'Média' | 'Alta';
  impacto: 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto';
  areasVulneraveis: string[];
  populacaoExposta: number;
}

export interface RecursoHumano {
  tipo: 'Defesa Civil' | 'Bombeiros' | 'Polícia' | 'Saúde' | 'Voluntários';
  quantidade: number;
  disponibilidade: '24h' | 'Horário Comercial' | 'Sob Demanda';
  contato: string;
}

export interface RecursoMaterial {
  tipo: string;
  descricao: string;
  quantidade: number;
  localizacao: string;
  responsavel: string;
}

export interface ProtocoloResposta {
  cenario: string;
  acoes: string[];
  responsaveis: string[];
  tempoResposta: string;
}

export interface Treinamento {
  titulo: string;
  data: string;
  participantes: number;
  cargaHoraria: number;
  certificados: boolean;
}

/**
 * DAT - Divisão de Apoio Técnico
 */
export interface SolicitacaoDAT {
  id: string;
  numeroProtocolo: string;
  municipio: string;
  solicitante: string;
  
  // Tipo de apoio
  tipoApoio: 'Vistoria Técnica' | 'Análise Estrutural' | 'Mapeamento de Risco' | 
             'Capacitação' | 'Elaboração de Planos' | 'Outro';
  descricao: string;
  urgencia: 'Baixa' | 'Média' | 'Alta' | 'Emergencial';
  
  // Atendimento
  dataSolicitacao: string;
  dataAtendimento?: string;
  tecnicoResponsavel?: string;
  equipe?: string[];
  
  // Resultado
  relatorioTecnico?: string;
  recomendacoes?: string[];
  documentosGerados?: string[];
  
  status: 'Aguardando' | 'Em Análise' | 'Em Atendimento' | 'Concluído' | 'Cancelado';
}

/**
 * Transferência Fundo a Fundo
 */
export interface TransferenciaFundoFundo {
  id: string;
  numeroPortaria: string;
  tipoTransferencia: 'Resposta' | 'Reconstrução' | 'Socorro' | 'Assistencial';
  
  // Origem e destino
  origemEsfera: 'Federal' | 'Estadual';
  destinoMunicipio: string;
  destinoUF: string;
  
  // Valores
  valorAutorizado: number;
  valorEmpenhado: number;
  valorPago: number;
  dataAutorizacao: string;
  dataPagamento?: string;
  
  // Vinculação
  decretoRelacionado: string;
  desastreRelacionado: string;
  
  // Prestação de contas
  prestacaoContasEnviada: boolean;
  dataPrestacaoContas?: string;
  statusPrestacaoContas?: 'Pendente' | 'Aprovada' | 'Em Análise' | 'Rejeitada';
  
  status: 'Autorizado' | 'Empenhado' | 'Pago' | 'Cancelado';
}

/**
 * Boas Práticas e Ações Preventivas
 */
export interface BoaPratica {
  id: string;
  titulo: string;
  categoria: 'Prevenção' | 'Preparação' | 'Resposta' | 'Recuperação' | 'Mitigação';
  subcategoria: string;
  
  // Origem
  municipio: string;
  uf: string;
  orgao: string;
  
  // Descrição
  resumo: string;
  descricaoCompleta: string;
  problema: string;
  solucao: string;
  resultados: string[];
  
  // Implementação
  custoEstimado: number;
  tempoImplementacao: string;
  recursosNecessarios: string[];
  passosPasso: string[];
  
  // Evidências
  fotos: string[];
  videos: string[];
  documentos: string[];
  
  // Reconhecimento
  premios?: string[];
  replicacoes: number;
  avaliacaoMedia: number; // 0-5 estrelas
  
  // Contato
  responsavel: string;
  email: string;
  telefone: string;
  
  dataPublicacao: string;
  visualizacoes: number;
}

/**
 * Calculadora DHS - Índice de Maturidade
 * Baseado em https://dhsviapgs.vercel.app/calculadora
 */
export interface AvaliacaoDHS {
  id: string;
  entidade: string;
  tipo: 'Municipal' | 'Estadual' | 'Federal' | 'ONG' | 'Empresa' | 'Outro';
  dataAvaliacao: string;
  
  // Eixos DHS
  dimensoes: {
    economico: DimensaoDHS;
    social: DimensaoDHS;
    ambiental: DimensaoDHS;
  };
  
  // Convergência de setores
  convergencia: {
    setorPublico: number; // 0-100
    setorPrivado: number;
    sociedadeCivil: number;
    integracaoSetores: number;
  };
  
  // Pensamento sistêmico
  pensamentoSistemico: {
    visaoHolistica: number;
    interconexoes: number;
    causasRaizes: number;
    impactoLongoPrazo: number;
  };
  
  // Resultado final
  indiceGlobal: number; // 0-100
  nivel: 'Inicial' | 'Em Desenvolvimento' | 'Intermediário' | 'Avançado' | 'Excelente';
  
  // Recomendações
  pontosFortes: string[];
  areasDesenvolver: string[];
  proximosPassos: string[];
}

export interface DimensaoDHS {
  pontuacao: number; // 0-100
  indicadores: {
    [key: string]: number;
  };
  comentarios: string;
}

/**
 * Matriz de Convergência (Metodologia PGS)
 */
export interface MatrizConvergencia {
  id: string;
  projeto: string;
  responsavel: string;
  dataElaboracao: string;
  
  // Setores envolvidos
  setores: {
    publico: AtorSetor[];
    privado: AtorSetor[];
    sociedadeCivil: AtorSetor[];
  };
  
  // Objetivos
  objetivosPrincipais: string[];
  necessidadesAtendidas: NecessidadeHumana[];
  
  // Recursos
  recursosPublicos: Recurso[];
  recursosPrivados: Recurso[];
  recursosSociedadeCivil: Recurso[];
  
  // Governança
  estruturaGovernanca: string;
  processosDecisao: string;
  mecanismosNMC: MecanismoNMC[]; // Núcleo de Mobilização Colaborativa
  
  // Resultados esperados
  indicadoresImpacto: IndicadorImpacto[];
  metasQuantitativas: Meta[];
  
  status: 'Planejamento' | 'Em Implementação' | 'Operacional' | 'Concluído';
}

export interface AtorSetor {
  nome: string;
  tipo: string;
  papel: string;
  contribuicao: string;
  contato: string;
}

export interface NecessidadeHumana {
  categoria: 'Fisiológica' | 'Segurança' | 'Social' | 'Estima' | 'Autorrealização';
  descricao: string;
  populacaoBeneficiada: number;
}

export interface Recurso {
  tipo: 'Financeiro' | 'Humano' | 'Material' | 'Tecnológico' | 'Conhecimento';
  descricao: string;
  valor?: number;
  quantidade?: number;
}

export interface MecanismoNMC {
  tipo: string;
  descricao: string;
  frequencia: string;
  participantes: string[];
}

export interface IndicadorImpacto {
  nome: string;
  unidade: string;
  metaAnual: number;
  resultadoAtual: number;
  percentualAlcancado: number;
}

export interface Meta {
  descricao: string;
  valor: number;
  unidade: string;
  prazo: string;
  responsavel: string;
  status: 'Não Iniciada' | 'Em Andamento' | 'Concluída' | 'Atrasada';
}

// ============================================================================
// SERVIÇO PRINCIPAL - INTEGRAÇÃO GOVERNAMENTAL
// ============================================================================

export class IntegracaoGovernamentalService {
  private static instance: IntegracaoGovernamentalService;

  // Dados em memória (substituir por banco de dados em produção)
  private desastresS2ID: Map<string, S2IDDesastre> = new Map();
  private ocorrenciasSEGIRD: Map<string, SEGIRDOcorrencia> = new Map();
  private areasRisco: Map<string, AreaRiscoGeologico> = new Map();
  private estacoesFluviometricas: Map<string, EstacaoFluviometrica> = new Map();
  private decretos: Map<string, Decreto> = new Map();
  private dacas: Map<string, DACA> = new Map();
  private p2r2s: Map<string, P2R2> = new Map();
  private solicitacoesDAT: Map<string, SolicitacaoDAT> = new Map();
  private transferencias: Map<string, TransferenciaFundoFundo> = new Map();
  private boasPraticas: Map<string, BoaPratica> = new Map();
  private avaliacoesDHS: Map<string, AvaliacaoDHS> = new Map();
  private matrizesConvergencia: Map<string, MatrizConvergencia> = new Map();

  private constructor() {
    this.inicializarDadosMock();
  }

  public static getInstance(): IntegracaoGovernamentalService {
    if (!IntegracaoGovernamentalService.instance) {
      IntegracaoGovernamentalService.instance = new IntegracaoGovernamentalService();
    }
    return IntegracaoGovernamentalService.instance;
  }

  // ========================================================================
  // S2ID - SISTEMA INTEGRADO DE INFORMAÇÕES SOBRE DESASTRES
  // ========================================================================

  /**
   * Registrar novo desastre no S2ID
   */
  public registrarDesastreS2ID(desastre: Omit<S2IDDesastre, 'id'>): S2IDDesastre {
    const id = `S2ID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const novoDesastre: S2IDDesastre = { ...desastre, id };
    this.desastresS2ID.set(id, novoDesastre);
    return novoDesastre;
  }

  /**
   * Buscar desastres no S2ID por município
   */
  public buscarDesastresS2IDPorMunicipio(codigoIBGE: string): S2IDDesastre[] {
    return Array.from(this.desastresS2ID.values())
      .filter(d => d.codigoIBGE === codigoIBGE)
      .sort((a, b) => new Date(b.dataOcorrencia).getTime() - new Date(a.dataOcorrencia).getTime());
  }

  /**
   * Buscar desastres vigentes (com decreto ativo)
   */
  public buscarDesastresVigentes(): S2IDDesastre[] {
    const hoje = new Date();
    return Array.from(this.desastresS2ID.values())
      .filter(d => {
        if (d.situacao === 'Normalidade') return false;
        const validade = new Date(d.validadeDecreto);
        return validade >= hoje && d.status === 'Deferido';
      });
  }

  /**
   * Calcular total de recursos solicitados vs recebidos
   */
  public calcularRecursosDesastre(desastreId: string): {
    solicitado: number;
    recebido: number;
    pendente: number;
    percentualRecebido: number;
  } {
    const desastre = this.desastresS2ID.get(desastreId);
    if (!desastre) throw new Error('Desastre não encontrado');

    const solicitado = desastre.recursosEstadualSolicitado + desastre.recursosFederalSolicitado;
    const recebido = desastre.recursosEstadualRecebido + desastre.recursosFederalRecebido;
    const pendente = solicitado - recebido;
    const percentualRecebido = solicitado > 0 ? (recebido / solicitado) * 100 : 0;

    return { solicitado, recebido, pendente, percentualRecebido };
  }

  // ========================================================================
  // SEGIRD - SISTEMA ESTADUAL (RIO GRANDE DO SUL)
  // ========================================================================

  /**
   * Registrar ocorrência no SEGIRD
   */
  public registrarOcorrenciaSEGIRD(ocorrencia: Omit<SEGIRDOcorrencia, 'id' | 'numeroProtocolo'>): SEGIRDOcorrencia {
    const id = `SEGIRD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const numeroProtocolo = `${new Date().getFullYear()}${String(this.ocorrenciasSEGIRD.size + 1).padStart(6, '0')}`;
    
    const novaOcorrencia: SEGIRDOcorrencia = {
      ...ocorrencia,
      id,
      numeroProtocolo,
      statusAtendimento: 'Aguardando',
      acoesRealizadas: [],
      recursosUtilizados: []
    };
    
    this.ocorrenciasSEGIRD.set(id, novaOcorrencia);
    return novaOcorrencia;
  }

  /**
   * Buscar ocorrências por município
   */
  public buscarOcorrenciasSEGIRD(filtros: {
    municipio?: string;
    tipoEvento?: string;
    status?: string;
    dataInicio?: string;
    dataFim?: string;
  }): SEGIRDOcorrencia[] {
    let resultado = Array.from(this.ocorrenciasSEGIRD.values());

    if (filtros.municipio) {
      resultado = resultado.filter(o => o.municipio === filtros.municipio);
    }
    if (filtros.tipoEvento) {
      resultado = resultado.filter(o => o.tipoEvento === filtros.tipoEvento);
    }
    if (filtros.status) {
      resultado = resultado.filter(o => o.statusAtendimento === filtros.status);
    }
    if (filtros.dataInicio) {
      resultado = resultado.filter(o => o.dataHoraOcorrencia >= filtros.dataInicio!);
    }
    if (filtros.dataFim) {
      resultado = resultado.filter(o => o.dataHoraOcorrencia <= filtros.dataFim!);
    }

    return resultado.sort((a, b) => 
      new Date(b.dataHoraOcorrencia).getTime() - new Date(a.dataHoraOcorrencia).getTime()
    );
  }

  /**
   * Adicionar ação realizada em ocorrência
   */
  public adicionarAcaoOcorrencia(ocorrenciaId: string, acao: AcaoDefesaCivil): void {
    const ocorrencia = this.ocorrenciasSEGIRD.get(ocorrenciaId);
    if (!ocorrencia) throw new Error('Ocorrência não encontrada');

    ocorrencia.acoesRealizadas.push(acao);
    if (ocorrencia.statusAtendimento === 'Aguardando') {
      ocorrencia.statusAtendimento = 'Em Atendimento';
      ocorrencia.dataHoraAtendimento = new Date().toISOString();
    }
  }

  // ========================================================================
  // SERVIÇO GEOLÓGICO DO BRASIL - ÁREAS DE RISCO
  // ========================================================================

  /**
   * Buscar áreas de risco em município
   */
  public buscarAreasRisco(municipio: string, grauMinimo?: string): AreaRiscoGeologico[] {
    const ordem = { 'R1 - Baixo': 1, 'R2 - Médio': 2, 'R3 - Alto': 3, 'R4 - Muito Alto': 4 };
    let resultado = Array.from(this.areasRisco.values())
      .filter(a => a.municipio === municipio);

    if (grauMinimo) {
      const nivelMinimo = ordem[grauMinimo as keyof typeof ordem];
      resultado = resultado.filter(a => ordem[a.grauRisco] >= nivelMinimo);
    }

    return resultado.sort((a, b) => ordem[b.grauRisco] - ordem[a.grauRisco]);
  }

  /**
   * Verificar se localização está em área de risco
   */
  public verificarLocalizacaoEmRisco(latitude: number, longitude: number): AreaRiscoGeologico | null {
    // Implementação simplificada - em produção usar geometrias reais
    for (const area of this.areasRisco.values()) {
      if (area.geometria.tipo === 'Point') {
        const [lat, lon] = area.geometria.coordenadas as number[];
        const distancia = this.calcularDistancia(latitude, longitude, lat, lon);
        if (distancia < 0.5) return area; // 500m de raio
      }
    }
    return null;
  }

  /**
   * Estatísticas de áreas de risco
   */
  public estatisticasAreasRisco(municipio?: string): {
    totalAreas: number;
    porGrau: { [key: string]: number };
    totalFamilias: number;
    totalPessoas: number;
    areasComMonitoramento: number;
  } {
    let areas = Array.from(this.areasRisco.values());
    if (municipio) {
      areas = areas.filter(a => a.municipio === municipio);
    }

    const porGrau: { [key: string]: number } = {
      'R1 - Baixo': 0,
      'R2 - Médio': 0,
      'R3 - Alto': 0,
      'R4 - Muito Alto': 0
    };

    let totalFamilias = 0;
    let totalPessoas = 0;
    let areasComMonitoramento = 0;

    areas.forEach(area => {
      porGrau[area.grauRisco]++;
      totalFamilias += area.familias;
      totalPessoas += area.pessoas;
      if (area.possuiMonitoramento) areasComMonitoramento++;
    });

    return {
      totalAreas: areas.length,
      porGrau,
      totalFamilias,
      totalPessoas,
      areasComMonitoramento
    };
  }

  // ========================================================================
  // MONITORAMENTO DE NÍVEIS DOS RIOS
  // ========================================================================

  /**
   * Obter dados de estação fluviométrica
   */
  public obterDadosEstacao(codigo: string): EstacaoFluviometrica | undefined {
    return this.estacoesFluviometricas.get(codigo);
  }

  /**
   * Listar todas as estações com alerta
   */
  public listarEstacoesComAlerta(): EstacaoFluviometrica[] {
    return Array.from(this.estacoesFluviometricas.values())
      .filter(e => e.status !== 'Normal')
      .sort((a, b) => {
        const ordem = { 'Emergência': 3, 'Alerta': 2, 'Atenção': 1, 'Normal': 0 };
        return ordem[b.status] - ordem[a.status];
      });
  }

  /**
   * Buscar estações por bacia hidrográfica
   */
  public buscarEstacoesPorBacia(bacia: string): EstacaoFluviometrica[] {
    return Array.from(this.estacoesFluviometricas.values())
      .filter(e => e.bacia === bacia);
  }

  /**
   * Atualizar leitura de estação (simular dado em tempo real)
   */
  public atualizarLeituraEstacao(codigo: string, nivel: number, vazao?: number, precipitacao?: number): void {
    const estacao = this.estacoesFluviometricas.get(codigo);
    if (!estacao) throw new Error('Estação não encontrada');

    const leitura: LeituraFluviometrica = {
      dataHora: new Date().toISOString(),
      nivel,
      vazao,
      precipitacao
    };

    estacao.historicoLeituras.push(leitura);
    if (estacao.historicoLeituras.length > 168) { // Manter 7 dias (1 leitura/hora)
      estacao.historicoLeituras.shift();
    }

    // Atualizar nível atual
    const nivelAnterior = estacao.nivelAtual;
    estacao.nivelAtual = nivel;
    estacao.ultimaAtualizacao = leitura.dataHora;

    // Calcular variação 24h
    if (estacao.historicoLeituras.length >= 24) {
      const nivel24hAtras = estacao.historicoLeituras[estacao.historicoLeituras.length - 24].nivel;
      estacao.variacao24h = (nivel - nivel24hAtras) * 100; // em cm
    }

    // Determinar tendência
    if (nivel > nivelAnterior) {
      estacao.tendencia = 'Subindo';
    } else if (nivel < nivelAnterior) {
      estacao.tendencia = 'Descendo';
    } else {
      estacao.tendencia = 'Estável';
    }

    // Determinar status
    if (nivel >= estacao.nivelInundacao) {
      estacao.status = 'Emergência';
    } else if (nivel >= estacao.nivelEmergencia) {
      estacao.status = 'Alerta';
    } else if (nivel >= estacao.nivelAlerta) {
      estacao.status = 'Atenção';
    } else {
      estacao.status = 'Normal';
    }
  }

  // ========================================================================
  // LEGISLAÇÃO E DECRETOS
  // ========================================================================

  /**
   * Registrar decreto municipal
   */
  public registrarDecreto(decreto: Omit<Decreto, 'prorrogacoes' | 'reconhecidoEstado' | 'reconhecidoFederal'>): Decreto {
    const novoDecreto: Decreto = {
      ...decreto,
      prorrogacoes: [],
      reconhecidoEstado: false,
      reconhecidoFederal: false
    };

    this.decretos.set(decreto.numero, novoDecreto);
    return novoDecreto;
  }

  /**
   * Prorrogar decreto
   */
  public prorrogarDecreto(numeroDecreto: string, prorrogacao: Prorrogacao): void {
    const decreto = this.decretos.get(numeroDecreto);
    if (!decreto) throw new Error('Decreto não encontrado');

    decreto.prorrogacoes.push(prorrogacao);
    decreto.dataTermino = prorrogacao.novaDataTermino;

    // Atualizar status se necessário
    const hoje = new Date();
    const dataTermino = new Date(decreto.dataTermino);
    if (dataTermino < hoje && decreto.status === 'Vigente') {
      decreto.status = 'Expirado';
    }
  }

  /**
   * Reconhecer decreto (estadual ou federal)
   */
  public reconhecerDecreto(
    numeroDecreto: string, 
    esfera: 'Estadual' | 'Federal',
    numeroPortaria: string,
    dataReconhecimento: string
  ): void {
    const decreto = this.decretos.get(numeroDecreto);
    if (!decreto) throw new Error('Decreto não encontrado');

    if (esfera === 'Estadual') {
      decreto.reconhecidoEstado = true;
      decreto.dataReconhecimentoEstado = dataReconhecimento;
      decreto.numeroPortariaEstadual = numeroPortaria;
    } else {
      decreto.reconhecidoFederal = true;
      decreto.dataReconhecimentoFederal = dataReconhecimento;
      decreto.numeroPortariaFederal = numeroPortaria;
    }
  }

  /**
   * Buscar decretos vigentes
   */
  public buscarDecretosVigentes(uf?: string): Decreto[] {
    const hoje = new Date();
    return Array.from(this.decretos.values())
      .filter(d => {
        const vigente = new Date(d.dataTermino) >= hoje && d.status === 'Vigente';
        return uf ? vigente && d.uf === uf : vigente;
      });
  }

  // ========================================================================
  // DAT - DIVISÃO DE APOIO TÉCNICO
  // ========================================================================

  /**
   * Criar solicitação de apoio técnico
   */
  public criarSolicitacaoDAT(solicitacao: Omit<SolicitacaoDAT, 'id' | 'numeroProtocolo' | 'dataSolicitacao' | 'status'>): SolicitacaoDAT {
    const id = `DAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const numeroProtocolo = `DAT/${new Date().getFullYear()}/${String(this.solicitacoesDAT.size + 1).padStart(5, '0')}`;
    
    const novaSolicitacao: SolicitacaoDAT = {
      ...solicitacao,
      id,
      numeroProtocolo,
      dataSolicitacao: new Date().toISOString(),
      status: 'Aguardando'
    };

    this.solicitacoesDAT.set(id, novaSolicitacao);
    return novaSolicitacao;
  }

  /**
   * Listar solicitações DAT por município
   */
  public listarSolicitacoesDAT(municipio?: string, status?: string): SolicitacaoDAT[] {
    let resultado = Array.from(this.solicitacoesDAT.values());

    if (municipio) {
      resultado = resultado.filter(s => s.municipio === municipio);
    }
    if (status) {
      resultado = resultado.filter(s => s.status === status);
    }

    return resultado.sort((a, b) => 
      new Date(b.dataSolicitacao).getTime() - new Date(a.dataSolicitacao).getTime()
    );
  }

  // ========================================================================
  // TRANSFERÊNCIA FUNDO A FUNDO
  // ========================================================================

  /**
   * Registrar transferência
   */
  public registrarTransferencia(transferencia: Omit<TransferenciaFundoFundo, 'id'>): TransferenciaFundoFundo {
    const id = `TFF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const novaTransferencia: TransferenciaFundoFundo = { ...transferencia, id };
    this.transferencias.set(id, novaTransferencia);
    return novaTransferencia;
  }

  /**
   * Buscar transferências por município
   */
  public buscarTransferenciasPorMunicipio(municipio: string): TransferenciaFundoFundo[] {
    return Array.from(this.transferencias.values())
      .filter(t => t.destinoMunicipio === municipio)
      .sort((a, b) => new Date(b.dataAutorizacao).getTime() - new Date(a.dataAutorizacao).getTime());
  }

  /**
   * Calcular total de recursos transferidos
   */
  public calcularTotalTransferencias(municipio?: string): {
    totalAutorizado: number;
    totalRecebido: number;
    totalPago: number;
    totalPendente: number;
    porTipo: { [key: string]: number };
  } {
    let transferencias = Array.from(this.transferencias.values());
    if (municipio) {
      transferencias = transferencias.filter(t => t.destinoMunicipio === municipio);
    }

    const porTipo: { [key: string]: number } = {};
    let totalAutorizado = 0;
    let totalPago = 0;

    transferencias.forEach(t => {
      totalAutorizado += t.valorAutorizado;
      totalPago += t.valorPago;
      porTipo[t.tipoTransferencia] = (porTipo[t.tipoTransferencia] || 0) + t.valorPago;
    });

    return {
      totalAutorizado,
      totalRecebido: totalPago, // totalRecebido = totalPago
      totalPago,
      totalPendente: totalAutorizado - totalPago,
      porTipo
    };
  }

  // ========================================================================
  // BOAS PRÁTICAS
  // ========================================================================

  /**
   * Registrar boa prática
   */
  public registrarBoaPratica(pratica: Omit<BoaPratica, 'id' | 'dataPublicacao' | 'visualizacoes' | 'replicacoes'>): BoaPratica {
    const id = `BP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const novaPratica: BoaPratica = {
      ...pratica,
      id,
      dataPublicacao: new Date().toISOString(),
      visualizacoes: 0,
      replicacoes: 0
    };

    this.boasPraticas.set(id, novaPratica);
    return novaPratica;
  }

  /**
   * Buscar boas práticas
   */
  public buscarBoasPraticas(filtros: {
    categoria?: string;
    uf?: string;
    busca?: string;
  }): BoaPratica[] {
    let resultado = Array.from(this.boasPraticas.values());

    if (filtros.categoria) {
      resultado = resultado.filter(p => p.categoria === filtros.categoria);
    }
    if (filtros.uf) {
      resultado = resultado.filter(p => p.uf === filtros.uf);
    }
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      resultado = resultado.filter(p => 
        p.titulo.toLowerCase().includes(termo) ||
        p.resumo.toLowerCase().includes(termo) ||
        p.descricaoCompleta.toLowerCase().includes(termo)
      );
    }

    return resultado.sort((a, b) => b.avaliacaoMedia - a.avaliacaoMedia);
  }

  // ========================================================================
  // METODOLOGIA DHS - CALCULADORA E MATRIZ
  // ========================================================================

  /**
   * Calcular índice DHS
   */
  public calcularIndiceDHS(avaliacao: Omit<AvaliacaoDHS, 'id' | 'indiceGlobal' | 'nivel' | 'pontosFortes' | 'areasDesenvolver' | 'proximosPassos'>): AvaliacaoDHS {
    const id = `DHS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Calcular índice global
    const mediaEixos = (
      avaliacao.dimensoes.economico.pontuacao +
      avaliacao.dimensoes.social.pontuacao +
      avaliacao.dimensoes.ambiental.pontuacao
    ) / 3;

    const mediaConvergencia = (
      avaliacao.convergencia.setorPublico +
      avaliacao.convergencia.setorPrivado +
      avaliacao.convergencia.sociedadeCivil +
      avaliacao.convergencia.integracaoSetores
    ) / 4;

    const mediaSistemico = (
      avaliacao.pensamentoSistemico.visaoHolistica +
      avaliacao.pensamentoSistemico.interconexoes +
      avaliacao.pensamentoSistemico.causasRaizes +
      avaliacao.pensamentoSistemico.impactoLongoPrazo
    ) / 4;

    const indiceGlobal = Math.round((mediaEixos + mediaConvergencia + mediaSistemico) / 3);

    // Determinar nível
    let nivel: AvaliacaoDHS['nivel'];
    if (indiceGlobal < 20) nivel = 'Inicial';
    else if (indiceGlobal < 40) nivel = 'Em Desenvolvimento';
    else if (indiceGlobal < 60) nivel = 'Intermediário';
    else if (indiceGlobal < 80) nivel = 'Avançado';
    else nivel = 'Excelente';

    // Gerar recomendações
    const pontosFortes: string[] = [];
    const areasDesenvolver: string[] = [];

    if (mediaEixos >= 60) pontosFortes.push('Equilíbrio entre eixos econômico, social e ambiental');
    else areasDesenvolver.push('Melhorar equilíbrio nos três eixos da sustentabilidade');

    if (mediaConvergencia >= 60) pontosFortes.push('Boa convergência entre setores público, privado e sociedade civil');
    else areasDesenvolver.push('Fortalecer parcerias entre os diferentes setores');

    if (mediaSistemico >= 60) pontosFortes.push('Pensamento sistêmico bem desenvolvido');
    else areasDesenvolver.push('Desenvolver visão mais holística e sistêmica');

    const proximosPassos = areasDesenvolver.length > 0
      ? [`Priorizar: ${areasDesenvolver[0]}`, 'Buscar apoio técnico especializado', 'Implementar matriz de convergência']
      : ['Manter e expandir práticas atuais', 'Compartilhar experiência como boa prática', 'Apoiar outras iniciativas'];

    const avaliacaoCompleta: AvaliacaoDHS = {
      ...avaliacao,
      id,
      indiceGlobal,
      nivel,
      pontosFortes,
      areasDesenvolver,
      proximosPassos
    };

    this.avaliacoesDHS.set(id, avaliacaoCompleta);
    return avaliacaoCompleta;
  }

  /**
   * Criar matriz de convergência
   */
  public criarMatrizConvergencia(matriz: Omit<MatrizConvergencia, 'id'>): MatrizConvergencia {
    const id = `MC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const novaMatriz: MatrizConvergencia = { ...matriz, id };
    this.matrizesConvergencia.set(id, novaMatriz);
    return novaMatriz;
  }

  // ========================================================================
  // DASHBOARD UNIFICADO
  // ========================================================================

  /**
   * Obter visão geral completa do sistema
   */
  public obterDashboardUnificado(municipio?: string): {
    desastres: {
      vigentes: number;
      aguardandoAnalise: number;
      totalAfetados: number;
    };
    ocorrencias: {
      abertas: number;
      emAtendimento: number;
      concluidas24h: number;
    };
    areasRisco: {
      total: number;
      altoRisco: number;
      pessoasExpostas: number;
      porGrau: { [key: string]: number };
    };
    rios: {
      emAlerta: number;
      emEmergencia: number;
    };
    recursos: {
      totalAutorizado: number;
      totalRecebido: number;
      totalPendente: number;
      porTipo: { [key: string]: number };
    };
    dat: {
      solicitacoesPendentes: number;
      emAtendimento: number;
    };
    dhs: {
      iniciativasAvaliadas: number;
      mediaIndice: number;
    };
  } {
    // Filtrar por município se especificado
    const desastresVigentes = this.buscarDesastresVigentes();
    const ocorrencias = this.buscarOcorrenciasSEGIRD({ municipio });
    const estacoesAlerta = this.listarEstacoesComAlerta();
    const statsAreasRisco = this.estatisticasAreasRisco(municipio);
    const statsRecursos = this.calcularTotalTransferencias(municipio);
    
    // Calcular estatísticas
    const dashboard = {
      desastres: {
        vigentes: municipio 
          ? desastresVigentes.filter(d => d.municipio === municipio).length
          : desastresVigentes.length,
        aguardandoAnalise: Array.from(this.desastresS2ID.values())
          .filter(d => d.status === 'Aguardando Análise').length,
        totalAfetados: Array.from(this.desastresS2ID.values())
          .reduce((sum, d) => sum + d.pessoasAfetadas, 0)
      },
      ocorrencias: {
        abertas: ocorrencias.filter(o => o.statusAtendimento === 'Aguardando').length,
        emAtendimento: ocorrencias.filter(o => o.statusAtendimento === 'Em Atendimento').length,
        concluidas24h: ocorrencias.filter(o => {
          if (!o.dataHoraConclusao) return false;
          const diff = Date.now() - new Date(o.dataHoraConclusao).getTime();
          return diff <= 24 * 60 * 60 * 1000;
        }).length
      },
      areasRisco: {
        total: statsAreasRisco.totalAreas,
        altoRisco: (statsAreasRisco.porGrau['R3 - Alto'] || 0) + (statsAreasRisco.porGrau['R4 - Muito Alto'] || 0),
        pessoasExpostas: statsAreasRisco.totalPessoas,
        porGrau: statsAreasRisco.porGrau
      },
      rios: {
        emAlerta: estacoesAlerta.filter(e => e.status === 'Alerta').length,
        emEmergencia: estacoesAlerta.filter(e => e.status === 'Emergência').length
      },
      recursos: statsRecursos,
      dat: {
        solicitacoesPendentes: this.listarSolicitacoesDAT(municipio, 'Aguardando').length,
        emAtendimento: this.listarSolicitacoesDAT(municipio, 'Em Atendimento').length
      },
      dhs: {
        iniciativasAvaliadas: this.avaliacoesDHS.size,
        mediaIndice: this.avaliacoesDHS.size > 0
          ? Math.round(
              Array.from(this.avaliacoesDHS.values())
                .reduce((sum, a) => sum + a.indiceGlobal, 0) / this.avaliacoesDHS.size
            )
          : 0
      }
    };

    return dashboard;
  }

  // ========================================================================
  // UTILITÁRIOS
  // ========================================================================

  /**
   * Calcular distância entre coordenadas (Haversine)
   */
  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // ========================================================================
  // DADOS MOCK (INICIALIZAÇÃO)
  // ========================================================================

  private inicializarDadosMock(): void {
    // Estações fluviométricas do RS (dados reais)
    this.estacoesFluviometricas.set('87090000', {
      codigo: '87090000',
      nome: 'Passo da Cadeia',
      rio: 'Rio Taquari',
      municipio: 'Taquari',
      uf: 'RS',
      bacia: 'Bacia do Guaíba',
      latitude: -29.796,
      longitude: -51.864,
      altitude: 18,
      nivelAtual: 3.45,
      nivelAlerta: 7.0,
      nivelEmergencia: 9.0,
      nivelInundacao: 11.0,
      status: 'Normal',
      tendencia: 'Estável',
      variacao24h: -5,
      ultimaAtualizacao: new Date().toISOString(),
      historicoLeituras: []
    });

    this.estacoesFluviometricas.set('87550000', {
      codigo: '87550000',
      nome: 'Guaíba',
      rio: 'Lago Guaíba',
      municipio: 'Porto Alegre',
      uf: 'RS',
      bacia: 'Bacia do Guaíba',
      latitude: -30.013,
      longitude: -51.214,
      altitude: 2,
      nivelAtual: 0.63,
      nivelAlerta: 2.5,
      nivelEmergencia: 3.15,
      nivelInundacao: 3.6,
      status: 'Normal',
      tendencia: 'Descendo',
      variacao24h: -1.8,
      ultimaAtualizacao: new Date().toISOString(),
      historicoLeituras: []
    });

    // Áreas de risco (exemplo)
    this.areasRisco.set('POA-001', {
      id: 'POA-001',
      codigoArea: 'POA-001',
      municipio: 'Porto Alegre',
      uf: 'RS',
      bairro: 'Humaitá',
      tipoProcesso: 'Inundação',
      grauRisco: 'R3 - Alto',
      geometria: {
        tipo: 'Point',
        coordenadas: [-30.075, -51.197]
      },
      setoresCenso: ['430510205000001'],
      familias: 342,
      pessoas: 987,
      moradias: 342,
      descricaoArea: 'Área de planície de inundação próxima ao Lago Guaíba',
      condicoesAmbientais: 'Ocupação irregular em área de preservação permanente',
      ocupacaoSolo: 'Residencial de baixa renda',
      intervencoes: ['Dique de proteção', 'Sistema de drenagem'],
      possuiMonitoramento: true,
      tipoMonitoramento: 'Pluviométrico',
      dataUltimaVistoria: '2025-09-15',
      responsavelVistoria: 'Defesa Civil Municipal'
    });

    // Boa prática exemplo
    this.boasPraticas.set('BP-001', {
      id: 'BP-001',
      titulo: 'Sistema Comunitário de Alerta de Enchentes',
      categoria: 'Prevenção',
      subcategoria: 'Alerta Precoce',
      municipio: 'São Leopoldo',
      uf: 'RS',
      orgao: 'Defesa Civil Municipal',
      resumo: 'Implementação de sistema de alerta comunitário via WhatsApp integrado com monitoramento de rios',
      descricaoCompleta: 'Sistema que integra dados de estações fluviométricas com grupos de WhatsApp das comunidades em área de risco...',
      problema: 'População não recebia alertas de enchentes com antecedência suficiente',
      solucao: 'Criação de rede de comunicação direta com moradores através de aplicativo de mensagens',
      resultados: [
        'Redução de 70% no tempo de resposta',
        'Zero vítimas fatais em 2024',
        'Aumento da confiança da população na Defesa Civil'
      ],
      custoEstimado: 5000,
      tempoImplementacao: '3 meses',
      recursosNecessarios: ['Smartphone', 'Dados de estações', 'Treinamento de voluntários'],
      passosPasso: [
        'Mapear comunidades em risco',
        'Criar grupos de WhatsApp por bairro',
        'Integrar com sistema de monitoramento',
        'Treinar multiplicadores comunitários',
        'Realizar simulados periódicos'
      ],
      fotos: [],
      videos: [],
      documentos: [],
      replicacoes: 12,
      avaliacaoMedia: 4.8,
      responsavel: 'João Silva',
      email: 'joao.silva@defesacivil.rs.gov.br',
      telefone: '(51) 99999-9999',
      dataPublicacao: '2024-03-15',
      visualizacoes: 1542
    });

    console.log('✅ Dados mock inicializados: Integração Governamental');
  }
}

// Exportar instância única
export const integracaoGovernamental = IntegracaoGovernamentalService.getInstance();
