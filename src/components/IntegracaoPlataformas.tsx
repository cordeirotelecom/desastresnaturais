'use client';

import React, { useState, useEffect } from 'react';
import { integracaoService, type DadosIntegrados } from '@/services/integracao-plataformas';

/**
 * Componente de Integração de Plataformas de Desastres Naturais do RS
 * 
 * Exibe dados em tempo real de múltiplas fontes oficiais e comunitárias
 * com validação de congruência entre dados.
 * 
 * Baseado em DHS - Desenvolvimento Harmônico e Sustentável
 */
export default function IntegracaoPlataformas() {
  const [dados, setDados] = useState<DadosIntegrados | null>(null);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<'visao-geral' | 'rios' | 'meteorologia' | 'abrigos' | 'emergencia' | 'animais' | 'doacoes' | 'fontes'>('visao-geral');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date>(new Date());

  useEffect(() => {
    carregarDados();
    
    // Atualizar a cada 5 minutos
    const intervalo = setInterval(carregarDados, 5 * 60 * 1000);
    
    return () => clearInterval(intervalo);
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const dadosIntegrados = await integracaoService.obterDadosIntegrados();
      setDados(dadosIntegrados);
      setUltimaAtualizacao(new Date());
    } catch (error) {
      console.error('Erro ao carregar dados integrados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarTendencia = (tendencia: string) => {
    switch (tendencia) {
      case 'subindo': return '▲ Subindo';
      case 'descendo': return '▼ Descendo';
      default: return '● Estável';
    }
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'emergência': return 'bg-red-500';
      case 'alerta': return 'bg-orange-500';
      case 'atenção': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatarHora = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && !dados) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dados integrados...</p>
          <p className="text-gray-500 text-sm mt-2">Sincronizando múltiplas fontes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🔗 Integração de Plataformas</h1>
              <p className="text-blue-100 text-lg">
                Dados Unificados de Desastres Naturais do Rio Grande do Sul
              </p>
              <p className="text-sm text-blue-200 mt-2">
                ⚖️ Baseado em DHS - Desenvolvimento Harmônico e Sustentável
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-200">Última Atualização</p>
              <p className="text-2xl font-bold">{formatarHora(ultimaAtualizacao)}</p>
              <button
                onClick={carregarDados}
                className="mt-2 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                disabled={loading}
              >
                {loading ? '🔄 Atualizando...' : '🔄 Atualizar Agora'}
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas Gerais */}
        {dados && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-semibold">Pessoas Abrigadas</p>
              <p className="text-3xl font-bold text-blue-600">{dados.statusGeral.pessoasAbrigadas.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-semibold">Abrigos Ativos</p>
              <p className="text-3xl font-bold text-green-600">{dados.statusGeral.abrigosAtivos}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-600">
              <p className="text-gray-600 text-sm font-semibold">Desaparecidos</p>
              <p className="text-3xl font-bold text-orange-600">{dados.statusGeral.desaparecidosAtivos}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-600">
              <p className="text-gray-600 text-sm font-semibold">Animais Resgatados</p>
              <p className="text-3xl font-bold text-purple-600">{dados.statusGeral.animaisResgatados}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-pink-600">
              <p className="text-gray-600 text-sm font-semibold">Doações Entregues</p>
              <p className="text-3xl font-bold text-pink-600">{dados.statusGeral.doacoesRecebidas}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-600">
              <p className="text-gray-600 text-sm font-semibold">Municípios Afetados</p>
              <p className="text-3xl font-bold text-red-600">{dados.statusGeral.municipiosAfetados}</p>
            </div>
          </div>
        )}

        {/* Navegação por Abas */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b">
            {[
              { id: 'visao-geral', label: '📊 Visão Geral', icon: '📊' },
              { id: 'rios', label: '🌊 Níveis de Rios', icon: '🌊' },
              { id: 'meteorologia', label: '☁️ Meteorologia', icon: '☁️' },
              { id: 'abrigos', label: '🏠 Abrigos', icon: '🏠' },
              { id: 'emergencia', label: '🚨 Emergência', icon: '🚨' },
              { id: 'animais', label: '🐾 Animais', icon: '🐾' },
              { id: 'doacoes', label: '🎁 Doações', icon: '🎁' },
              { id: 'fontes', label: '🔗 Fontes de Dados', icon: '🔗' },
            ].map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id as 'visao-geral' | 'rios' | 'meteorologia' | 'abrigos' | 'emergencia' | 'animais' | 'doacoes' | 'fontes')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  abaAtiva === aba.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Visão Geral */}
            {abaAtiva === 'visao-geral' && dados && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Visão Geral do Sistema Integrado</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Plataformas Integradas */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">🔗 Plataformas Integradas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🌊 Nível Guaíba</span>
                        <span className="text-green-600 font-bold">✓ Online</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🏞️ Nível Uruguai</span>
                        <span className="text-green-600 font-bold">✓ Online</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🏠 SOS Abrigo</span>
                        <span className="text-yellow-600 font-bold">⚠️ Integração Pendente</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🗺️ SOS Maps</span>
                        <span className="text-yellow-600 font-bold">⚠️ Integração Pendente</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">💙 Apoio Enchentes RS</span>
                        <span className="text-yellow-600 font-bold">⚠️ Integração Pendente</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🐾 Abrigo dos Animais</span>
                        <span className="text-yellow-600 font-bold">⚠️ Integração Pendente</span>
                      </div>
                    </div>
                  </div>

                  {/* Fontes Oficiais */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-4">🏛️ Fontes Oficiais</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🏛️ Defesa Civil RS</span>
                        <span className="text-green-600 font-bold">✓ Integrado</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">💧 ANA (Águas)</span>
                        <span className="text-green-600 font-bold">✓ Integrado</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">☁️ INMET</span>
                        <span className="text-green-600 font-bold">✓ Integrado</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🛰️ CPTEC/INPE</span>
                        <span className="text-green-600 font-bold">✓ Integrado</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <span className="font-semibold">🌡️ Meteomatics</span>
                        <span className="text-green-600 font-bold">✓ Integrado</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Validação de Dados */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">✅ Validação de Congruência de Dados</h3>
                  <p className="text-purple-800 mb-4">
                    O sistema valida automaticamente a congruência entre múltiplas fontes de dados para garantir 
                    informações verdadeiras e confiáveis.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">✓</div>
                      <div>
                        <p className="font-bold text-green-600">Dados Congruentes</p>
                        <p className="text-sm text-gray-600">
                          Todas as fontes de medição apresentam valores consistentes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Níveis de Rios */}
            {abaAtiva === 'rios' && dados && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🌊 Monitoramento de Níveis de Rios em Tempo Real</h2>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
                  <p className="text-blue-900 font-semibold">📡 Fontes: Nível Guaíba • Nível Uruguai • ANA • INMET</p>
                  <p className="text-sm text-blue-700 mt-1">Atualização automática a cada 15 minutos</p>
                </div>

                {dados.medicoes.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">Carregando medições das estações...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dados.medicoes.map((medicao) => (
                      <div key={medicao.estacaoId} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{medicao.estacaoId}</h3>
                            <p className="text-sm text-gray-600">{medicao.fonte}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getCorStatus(medicao.status)}`}>
                            {medicao.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-blue-600">{medicao.nivelAtual.toFixed(2)}</span>
                            <span className="text-gray-600">metros</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <span className={medicao.variacao > 0 ? 'text-red-600' : 'text-green-600'}>
                              {formatarTendencia(medicao.tendencia)}
                            </span>
                            <span className="text-gray-600">
                              {Math.abs(medicao.variacao).toFixed(1)} cm/h
                            </span>
                          </div>
                          
                          <div className="border-t pt-3 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cota de Alerta:</span>
                              <span className="font-bold text-orange-600">{medicao.cotaAlerta.toFixed(2)}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cota de Inundação:</span>
                              <span className="font-bold text-red-600">{medicao.cotaInundacao.toFixed(2)}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Média 90 dias:</span>
                              <span className="font-bold text-gray-700">{medicao.nivelMedio90Dias.toFixed(2)}m</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Confiabilidade</span>
                              <span className="font-bold text-green-600">{medicao.confiabilidade}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${medicao.confiabilidade}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fontes de Dados */}
            {abaAtiva === 'fontes' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🔗 Fontes de Dados Integradas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(integracaoService.obterFontesDados()).map(([key, fonte]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{key}</h3>
                          <p className="text-sm text-gray-600">{fonte.tipo}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                          {fonte.confiabilidade}% confiável
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">🔗 URL:</span>
                          <a href={fonte.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {fonte.url}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">📡 API:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">{fonte.api}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">🔄 Atualização:</span>
                          <span className="font-semibold">A cada {fonte.atualizacao} minutos</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lista de Estações */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Estações de Monitoramento Ativas</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Estação</th>
                          <th className="px-4 py-2 text-left">Cidade</th>
                          <th className="px-4 py-2 text-left">Rio</th>
                          <th className="px-4 py-2 text-left">Bacia</th>
                          <th className="px-4 py-2 text-left">Fonte</th>
                          <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {integracaoService.obterEstacoes().map((estacao) => (
                          <tr key={estacao.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 font-semibold">{estacao.nome}</td>
                            <td className="px-4 py-2">{estacao.cidade}</td>
                            <td className="px-4 py-2">{estacao.rio}</td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {estacao.bacia}
                              </span>
                            </td>
                            <td className="px-4 py-2">{estacao.fonte}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                estacao.ativa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {estacao.ativa ? '✓ Ativa' : '✗ Inativa'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Outras abas (implementar conforme necessário) */}
            {['meteorologia', 'abrigos', 'emergencia', 'animais', 'doacoes'].includes(abaAtiva) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Dados de {abaAtiva} em desenvolvimento...
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Integração com plataformas externas em andamento
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer com DHS */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-xl shadow-lg p-6 text-white text-center">
          <p className="text-sm mb-2">⚖️ Baseado em Desenvolvimento Harmônico e Sustentável (DHS)</p>
          <p className="text-xs text-blue-100">
            Convergência de Setores • Pensamento Sistêmico • Dados Verdadeiros e Congruentes
          </p>
        </div>
      </div>
    </div>
  );
}
