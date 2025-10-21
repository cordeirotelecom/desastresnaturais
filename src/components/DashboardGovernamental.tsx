'use client';

/**
 * DASHBOARD DE INTEGRAÇÃO GOVERNAMENTAL COMPLETO
 * 
 * Interface unificada para:
 * - S2ID (Federal)
 * - SEGIRD (Estadual RS)
 * - Serviço Geológico do Brasil
 * - Monitoramento de Rios
 * - Legislação e Decretos
 * - DAT, DACA, P2R2
 * - Boas Práticas
 * - Calculadora DHS
 */

import { useState, useEffect } from 'react';
import { integracaoGovernamental } from '@/services/integracao-governamental';
import type { 
  S2IDDesastre, 
  SEGIRDOcorrencia, 
  EstacaoFluviometrica,
  AreaRiscoGeologico,
  Decreto,
  SolicitacaoDAT,
  TransferenciaFundoFundo,
  BoaPratica,
  AvaliacaoDHS
} from '@/services/integracao-governamental';

interface DashboardData {
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
  };
  rios: {
    emAlerta: number;
    emEmergencia: number;
  };
  recursos: {
    totalAutorizado: number;
    totalRecebido: number;
    totalPendente: number;
  };
  dat: {
    solicitacoesPendentes: number;
    emAtendimento: number;
    aprovadas?: number;
  };
  dhs?: {
    iniciativasAvaliadas: number;
    mediaIndice: number;
  };
}

export default function DashboardGovernamental() {
  const [abaAtiva, setAbaAtiva] = useState<'visao-geral' | 's2id' | 'segird' | 'rios' | 'areas-risco' | 'decretos' | 'dat' | 'transferencias' | 'boas-praticas' | 'dhs'>('visao-geral');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const dados = integracaoGovernamental.obterDashboardUnificado();
      setDashboard(dados as DashboardData);
    } catch (error) {
      console.error('Erro ao carregar dados governamentais:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dados governamentais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-8 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              🏛️
            </div>
            <div>
              <h1 className="text-3xl font-bold">Integração Governamental</h1>
              <p className="text-blue-100 text-sm mt-1">
                S2ID · SEGIRD · Serviço Geológico · Monitoramento · Legislação · DHS
              </p>
            </div>
          </div>
          
          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">{dashboard?.desastres.vigentes || 0}</div>
              <div className="text-blue-100 text-sm">Desastres Vigentes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">{dashboard?.ocorrencias.abertas || 0}</div>
              <div className="text-blue-100 text-sm">Ocorrências Abertas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">{(dashboard?.rios.emAlerta || 0) + (dashboard?.rios.emEmergencia || 0)}</div>
              <div className="text-blue-100 text-sm">Rios em Alerta</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">{dashboard?.areasRisco.altoRisco || 0}</div>
              <div className="text-blue-100 text-sm">Áreas Alto Risco</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por abas */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar">
            {[
              { id: 'visao-geral', label: '📊 Visão Geral', icon: '📊' },
              { id: 's2id', label: '🏛️ S2ID Federal', icon: '🏛️' },
              { id: 'segird', label: '🏢 SEGIRD RS', icon: '🏢' },
              { id: 'rios', label: '🌊 Rios', icon: '🌊' },
              { id: 'areas-risco', label: '⛰️ Áreas de Risco', icon: '⛰️' },
              { id: 'decretos', label: '📜 Decretos', icon: '📜' },
              { id: 'dat', label: '🔧 DAT', icon: '🔧' },
              { id: 'transferencias', label: '💰 Recursos', icon: '💰' },
              { id: 'boas-praticas', label: '⭐ Boas Práticas', icon: '⭐' },
              { id: 'dhs', label: '🎯 DHS', icon: '🎯' }
            ].map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id as typeof abaAtiva)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                  abaAtiva === aba.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{aba.icon}</span>
                {aba.label.replace(/^[^\s]+\s/, '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {abaAtiva === 'visao-geral' && <VisaoGeral dashboard={dashboard} />}
        {abaAtiva === 's2id' && <AbaS2ID />}
        {abaAtiva === 'segird' && <AbaSEGIRD />}
        {abaAtiva === 'rios' && <AbaRios />}
        {abaAtiva === 'areas-risco' && <AbaAreasRisco />}
        {abaAtiva === 'decretos' && <AbaDecretos />}
        {abaAtiva === 'dat' && <AbaDAT />}
        {abaAtiva === 'transferencias' && <AbaTransferencias />}
        {abaAtiva === 'boas-praticas' && <AbaBoasPraticas />}
        {abaAtiva === 'dhs' && <AbaDHS />}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTES DAS ABAS
// ============================================================================

function VisaoGeral({ dashboard }: { dashboard: DashboardData | null }) {
  if (!dashboard) return <div>Carregando...</div>;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
        <span className="text-3xl">📊</span>
        Visão Geral do Sistema
      </h2>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Desastres */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Desastres (S2ID)</h3>
            <span className="text-3xl">🚨</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Vigentes:</span>
              <span className="font-bold text-red-600">{dashboard.desastres.vigentes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Aguardando Análise:</span>
              <span className="font-bold text-yellow-600">{dashboard.desastres.aguardandoAnalise}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Afetados:</span>
              <span className="font-bold text-gray-800">{dashboard.desastres.totalAfetados.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Ocorrências */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Ocorrências (SEGIRD)</h3>
            <span className="text-3xl">📋</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Abertas:</span>
              <span className="font-bold text-orange-600">{dashboard.ocorrencias.abertas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Em Atendimento:</span>
              <span className="font-bold text-blue-600">{dashboard.ocorrencias.emAtendimento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Concluídas (24h):</span>
              <span className="font-bold text-green-600">{dashboard.ocorrencias.concluidas24h}</span>
            </div>
          </div>
        </div>

        {/* Áreas de Risco */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Áreas de Risco</h3>
            <span className="text-3xl">⛰️</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-gray-800">{dashboard.areasRisco.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Alto/Muito Alto:</span>
              <span className="font-bold text-red-600">{dashboard.areasRisco.altoRisco}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pessoas Expostas:</span>
              <span className="font-bold text-purple-600">{dashboard.areasRisco.pessoasExpostas.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Monitoramento de Rios */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Monitoramento Rios</h3>
            <span className="text-3xl">🌊</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Em Alerta:</span>
              <span className="font-bold text-orange-600">{dashboard.rios.emAlerta}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Em Emergência:</span>
              <span className="font-bold text-red-600">{dashboard.rios.emEmergencia}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-bold ${dashboard.rios.emEmergencia > 0 ? 'text-red-600' : dashboard.rios.emAlerta > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                {dashboard.rios.emEmergencia > 0 ? 'CRÍTICO' : dashboard.rios.emAlerta > 0 ? 'ATENÇÃO' : 'NORMAL'}
              </span>
            </div>
          </div>
        </div>

        {/* Recursos Financeiros */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Recursos Financeiros</h3>
            <span className="text-3xl">💰</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Autorizado:</span>
              <span className="font-bold text-gray-800">
                R$ {(dashboard.recursos.totalAutorizado / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recebido:</span>
              <span className="font-bold text-green-600">
                R$ {(dashboard.recursos.totalRecebido / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pendente:</span>
              <span className="font-bold text-orange-600">
                R$ {(dashboard.recursos.totalPendente / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>

        {/* DAT */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Apoio Técnico (DAT)</h3>
            <span className="text-3xl">🔧</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Pendentes:</span>
              <span className="font-bold text-orange-600">{dashboard.dat.solicitacoesPendentes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Em Atendimento:</span>
              <span className="font-bold text-blue-600">{dashboard.dat.emAtendimento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-bold text-green-600">Operacional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alinhamento DHS */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl p-6 shadow-lg mt-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🎯</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Índice DHS</h3>
            <p className="text-gray-600 text-sm">Desenvolvimento Harmônico e Sustentável</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">Iniciativas Avaliadas:</span>
              <span className="font-bold text-purple-600">{dashboard.dhs?.iniciativasAvaliadas || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Índice Médio:</span>
              <span className="font-bold text-blue-600">{dashboard.dhs?.mediaIndice || 0}/100</span>
            </div>
          </div>
          <div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${dashboard.dhs?.mediaIndice || 0}%` }}
              >
                {dashboard.dhs?.mediaIndice || 0}%
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Nível: {(dashboard.dhs?.mediaIndice || 0) < 40 ? 'Em Desenvolvimento' : (dashboard.dhs?.mediaIndice || 0) < 60 ? 'Intermediário' : (dashboard.dhs?.mediaIndice || 0) < 80 ? 'Avançado' : 'Excelente'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes placeholder para as outras abas
function AbaS2ID() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">🏛️</span>
        S2ID - Sistema Integrado de Informações sobre Desastres
      </h2>
      <p className="text-gray-600 mb-6">Sistema Federal de Gestão de Desastres (SEDEC)</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Funcionalidades:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Registro de desastres com classificação COBRADE</li>
            <li>Decretação de Situação de Emergência (SE) e Estado de Calamidade Pública (ECP)</li>
            <li>Solicitação de recursos federais</li>
            <li>Acompanhamento de reconhecimento federal</li>
            <li>Documentação: FIDE, NADE, Relatórios</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> Interface em desenvolvimento. Os dados estão sendo coletados e armazenados.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaSEGIRD() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">🏢</span>
        SEGIRD - Sistema Estadual de Gestão Integrada de Riscos e Desastres
      </h2>
      <p className="text-gray-600 mb-6">Defesa Civil do Estado do Rio Grande do Sul</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-orange-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Funcionalidades:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Registro de ocorrências em tempo real</li>
            <li>Atendimento e despacho de equipes</li>
            <li>Monitoramento de ações realizadas</li>
            <li>Gestão de recursos utilizados</li>
            <li>Integração com Coordenadorias Regionais (COREDES)</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> Sistema pronto para registro e consulta de ocorrências estaduais.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaRios() {
  const [estacoes, setEstacoes] = useState<EstacaoFluviometrica[]>([]);

  useEffect(() => {
    // Carregar estações (mock - em produção buscar da API)
    setEstacoes([
      integracaoGovernamental.obterDadosEstacao('87550000')!,
      integracaoGovernamental.obterDadosEstacao('87090000')!
    ].filter(Boolean));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
        <span className="text-3xl">🌊</span>
        Monitoramento de Níveis dos Rios
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {estacoes.map(estacao => (
          <div key={estacao.codigo} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{estacao.nome}</h3>
                <p className="text-gray-600 text-sm">{estacao.rio} - {estacao.municipio}/{estacao.uf}</p>
                <p className="text-gray-500 text-xs mt-1">Código ANA: {estacao.codigo}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                estacao.status === 'Emergência' ? 'bg-red-100 text-red-800' :
                estacao.status === 'Alerta' ? 'bg-orange-100 text-orange-800' :
                estacao.status === 'Atenção' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {estacao.status.toUpperCase()}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nível Atual:</span>
                <span className="font-bold text-2xl text-blue-600">{estacao.nivelAtual.toFixed(2)}m</span>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-600">Níveis de Referência</div>
                </div>
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${(estacao.nivelAtual / estacao.nivelInundacao) * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      estacao.status === 'Emergência' ? 'bg-red-500' :
                      estacao.status === 'Alerta' ? 'bg-orange-500' :
                      estacao.status === 'Atenção' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0m</span>
                  <span className="text-yellow-600">{estacao.nivelAlerta}m</span>
                  <span className="text-orange-600">{estacao.nivelEmergencia}m</span>
                  <span className="text-red-600">{estacao.nivelInundacao}m</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500">Tendência</p>
                  <p className="font-semibold text-gray-800">
                    {estacao.tendencia === 'Subindo' && '📈 Subindo'}
                    {estacao.tendencia === 'Descendo' && '📉 Descendo'}
                    {estacao.tendencia === 'Estável' && '➡️ Estável'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Variação 24h</p>
                  <p className={`font-semibold ${estacao.variacao24h > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {estacao.variacao24h > 0 ? '+' : ''}{estacao.variacao24h} cm
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">
                Última atualização: {new Date(estacao.ultimaAtualizacao).toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbaAreasRisco() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">⛰️</span>
        Áreas de Risco Geológico-Geotécnico
      </h2>
      <p className="text-gray-600 mb-6">Serviço Geológico do Brasil (SGB/CPRM)</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-purple-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Mapeamento disponível:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Áreas de risco a deslizamentos</li>
            <li>Áreas de risco a inundações e enxurradas</li>
            <li>Classificação por grau de risco (R1 a R4)</li>
            <li>População exposta e moradias em risco</li>
            <li>Histórico de vistorias técnicas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AbaDecretos() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">📜</span>
        Legislação e Decretos
      </h2>
      <p className="text-gray-600 mb-6">Decretação de SE/ECP, Reconhecimento e Prorrogações</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-red-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Gestão de Decretos:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>SE - Situação de Emergência</li>
            <li>ECP - Estado de Calamidade Pública</li>
            <li>Reconhecimento Estadual e Federal</li>
            <li>Prorrogações e vigência</li>
            <li>DACA - Declaração de Atuação em Condições de Calamidade</li>
            <li>P2R2 - Plano de Preparação e Resposta Rápida</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AbaDAT() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">🔧</span>
        DAT - Divisão de Apoio Técnico
      </h2>
      <p className="text-gray-600 mb-6">Suporte técnico especializado para municípios</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-indigo-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Serviços oferecidos:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Vistorias técnicas em áreas de risco</li>
            <li>Análise estrutural de edificações</li>
            <li>Mapeamento de áreas de risco</li>
            <li>Capacitação de equipes municipais</li>
            <li>Elaboração de planos de contingência</li>
            <li>Apoio na decretação de SE/ECP</li>
          </ul>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Como solicitar:</strong> Municípios podem solicitar apoio técnico através do protocolo oficial da Defesa Civil Estadual.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaTransferencias() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">💰</span>
        Transferências Fundo a Fundo
      </h2>
      <p className="text-gray-600 mb-6">Recursos Estaduais e Federais para Desastres</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-green-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Tipos de transferência:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li><strong>Socorro:</strong> Ações imediatas de salvamento</li>
            <li><strong>Assistencial:</strong> Abrigos temporários e suprimentos</li>
            <li><strong>Resposta:</strong> Restabelecimento de serviços essenciais</li>
            <li><strong>Reconstrução:</strong> Obras permanentes de recuperação</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Prestação de contas:</strong> Todos os recursos recebidos devem ter prestação de contas conforme legislação vigente.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaBoasPraticas() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">⭐</span>
        Catálogo de Boas Práticas
      </h2>
      <p className="text-gray-600 mb-6">Experiências exitosas em gestão de riscos e desastres</p>
      
      <div className="space-y-4">
        <div className="border-l-4 border-yellow-500 pl-4 py-2">
          <h3 className="font-semibold text-gray-800">Categorias:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li><strong>Prevenção:</strong> Medidas para evitar desastres</li>
            <li><strong>Preparação:</strong> Capacitação e planejamento</li>
            <li><strong>Resposta:</strong> Ações durante emergências</li>
            <li><strong>Recuperação:</strong> Reconstrução e reabilitação</li>
            <li><strong>Mitigação:</strong> Redução de impactos futuros</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Compartilhe sua experiência!</strong> Contribua com práticas que deram certo em seu município.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaDHS() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">🎯</span>
        Calculadora DHS - Desenvolvimento Harmônico e Sustentável
      </h2>
      <p className="text-gray-600 mb-6">Avaliação de maturidade em gestão de desastres</p>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold text-gray-800 mb-3">Pilares do DHS:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-700">Econômico</h4>
              <p className="text-sm text-gray-600">Gestão eficiente de recursos</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-700">Social</h4>
              <p className="text-sm text-gray-600">Proteção de vidas e comunidades</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-purple-700">Ambiental</h4>
              <p className="text-sm text-gray-600">Sustentabilidade e resiliência</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold text-gray-800 mb-3">Convergência de Setores:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏛️</span>
              <span className="text-gray-700">Setor Público (Governos e Defesa Civil)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              <span className="text-gray-700">Setor Privado (Empresas e Indústrias)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <span className="text-gray-700">Sociedade Civil (ONGs e Comunidades)</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">📚 Saiba mais:</h3>
          <a 
            href="https://dhsviapgs.vercel.app/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            dhsviapgs.vercel.app - Guia Completo DHS
          </a>
        </div>
      </div>
    </div>
  );
}
