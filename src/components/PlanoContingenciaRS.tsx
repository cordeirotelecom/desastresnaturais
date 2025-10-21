'use client';

import React, { useState, useEffect } from 'react';
import PlanoContingenciaService, { ComponentePlano, FasePlano, PlanoRioGrande } from '@/services/plano-contingencia';

export default function PlanoContingenciaRS() {
  const [planoRioGrande, setPlanoRioGrande] = useState<PlanoRioGrande | null>(null);
  const [componentes, setComponentes] = useState<ComponentePlano[]>([]);
  const [estatisticas, setEstatisticas] = useState<ReturnType<typeof PlanoContingenciaService.getEstatisticas> | null>(null);
  const [abaSelecionada, setAbaSelecionada] = useState<'visao-geral' | 'fases' | 'componentes' | 'acoes'>('visao-geral');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const plano = PlanoContingenciaService.getPlanoRioGrande();
    const comps = PlanoContingenciaService.getComponentes();
    const stats = PlanoContingenciaService.getEstatisticas();

    setPlanoRioGrande(plano);
    setComponentes(comps);
    setEstatisticas(stats);
  };

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case 'critica': return 'bg-red-500 text-white';
      case 'alta': return 'bg-orange-500 text-white';
      case 'media': return 'bg-yellow-500 text-white';
      case 'baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800 border-green-300';
      case 'em-andamento': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'planejado': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'bloqueada': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!planoRioGrande || !estatisticas) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-blue-700 to-blue-900 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🛡️ Plano de Contingência RS</h1>
              <p className="text-green-200 text-lg">Plano Rio Grande - Reconstrução e Resiliência</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-200">Atualizado em</div>
              <div className="text-lg font-semibold">{new Date(planoRioGrande.dataAtualizacao).toLocaleDateString('pt-BR')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600">
            <div className="text-sm text-gray-600 mb-1">Total de Ações</div>
            <div className="text-3xl font-bold text-blue-600">{estatisticas.totalAcoes}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-600">
            <div className="text-sm text-gray-600 mb-1">Em Andamento</div>
            <div className="text-3xl font-bold text-green-600">{estatisticas.acoesEmAndamento}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-purple-600">
            <div className="text-sm text-gray-600 mb-1">Concluídas</div>
            <div className="text-3xl font-bold text-purple-600">{estatisticas.acoesConcluidas}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-600">
            <div className="text-sm text-gray-600 mb-1">Componentes</div>
            <div className="text-3xl font-bold text-orange-600">{estatisticas.componentesAtivos}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-red-600">
            <div className="text-sm text-gray-600 mb-1">Fases Ativas</div>
            <div className="text-3xl font-bold text-red-600">{estatisticas.fasesAtivas}</div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setAbaSelecionada('visao-geral')}
              className={`px-6 py-4 font-semibold transition-colors ${
                abaSelecionada === 'visao-geral'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              📊 Visão Geral
            </button>
            <button
              onClick={() => setAbaSelecionada('fases')}
              className={`px-6 py-4 font-semibold transition-colors ${
                abaSelecionada === 'fases'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🎯 Fases do Plano
            </button>
            <button
              onClick={() => setAbaSelecionada('componentes')}
              className={`px-6 py-4 font-semibold transition-colors ${
                abaSelecionada === 'componentes'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🔧 Componentes
            </button>
            <button
              onClick={() => setAbaSelecionada('acoes')}
              className={`px-6 py-4 font-semibold transition-colors ${
                abaSelecionada === 'acoes'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              ⚡ Ações
            </button>
          </div>

          <div className="p-6">
            {/* Visão Geral */}
            {abaSelecionada === 'visao-geral' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{planoRioGrande.nome}</h2>
                  <p className="text-gray-700 mb-4">{planoRioGrande.descricao}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">🎯 Objetivo</h3>
                      <p className="text-gray-600">{planoRioGrande.objetivo}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">📅 Status</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCorStatus(planoRioGrande.status)}`}>
                        {planoRioGrande.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ações Previstas por Categoria */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Ações Previstas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(['socorro', 'assistencia', 'logistica', 'reconstrucao', 'financiamento'] as const).map((categoria) => {
                      const acoes = PlanoContingenciaService.getAcoesPorCategoria(categoria);
                      return (
                        <div key={categoria} className="bg-white border rounded-lg p-4 shadow">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 capitalize">
                              {categoria === 'socorro' && '🚨 Socorro'}
                              {categoria === 'assistencia' && '🤝 Assistência'}
                              {categoria === 'logistica' && '📦 Logística'}
                              {categoria === 'reconstrucao' && '🏗️ Reconstrução'}
                              {categoria === 'financiamento' && '💰 Financiamento'}
                            </h4>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                              {acoes.length}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {acoes.map((acao) => (
                              <li key={acao.id} className="text-sm text-gray-600 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{acao.nome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Fases do Plano */}
            {abaSelecionada === 'fases' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Fases do Plano Rio Grande</h3>
                {planoRioGrande.fases.map((fase: FasePlano, index: number) => (
                  <div key={fase.id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{fase.nome}</h4>
                          <p className="text-sm text-gray-600">⏱️ {fase.prazo}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCorStatus(fase.status)}`}>
                        {fase.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{fase.descricao}</p>
                    {fase.orcamento && (
                      <div className="text-sm text-gray-600">
                        💰 Orçamento: R$ {fase.orcamento.toLocaleString('pt-BR')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Componentes */}
            {abaSelecionada === 'componentes' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 Componentes do Plano</h3>
                {componentes.map((componente) => (
                  <div key={componente.id} className="bg-white border rounded-lg p-6 shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCorPrioridade(componente.prioridade)}`}>
                            {componente.prioridade.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 uppercase">{componente.tipo}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{componente.nome}</h4>
                        <p className="text-gray-600 mb-3">{componente.descricao}</p>
                        <div className="text-sm text-gray-600">
                          👤 <strong>Responsável:</strong> {componente.responsavel}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ml-4 ${getCorStatus(componente.status)}`}>
                        {componente.status}
                      </span>
                    </div>
                    {componente.acoes.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                          Ações vinculadas: {componente.acoes.length}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {componente.acoes.slice(0, 5).map((acao) => (
                            <span key={acao.id} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                              {acao.nome}
                            </span>
                          ))}
                          {componente.acoes.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{componente.acoes.length - 5} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Ações */}
            {abaSelecionada === 'acoes' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Todas as Ações</h3>
                {(['prevencao', 'preparacao', 'resposta', 'recuperacao'] as const).map((fase) => {
                  const acoes = PlanoContingenciaService.getAcoesPorFase(fase);
                  if (acoes.length === 0) return null;
                  
                  return (
                    <div key={fase}>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                        {fase === 'prevencao' && '🛡️ Prevenção'}
                        {fase === 'preparacao' && '📋 Preparação'}
                        {fase === 'resposta' && '🚨 Resposta'}
                        {fase === 'recuperacao' && '🏗️ Recuperação'}
                      </h4>
                      <div className="space-y-3">
                        {acoes.map((acao) => (
                          <div key={acao.id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold text-gray-800">{acao.nome}</h5>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCorStatus(acao.status)}`}>
                                {acao.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{acao.descricao}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div>
                                👥 {acao.responsaveis.join(', ')}
                              </div>
                              <div>
                                ⏱️ {acao.prazo}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer com informações adicionais */}
        <div className="bg-gradient-to-r from-blue-900 to-green-900 text-white rounded-lg shadow-xl p-6 mt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-green-300">📍 Mapa Único RS (MUP RS)</h4>
              <p className="text-sm text-blue-100">
                Sistema integrado que mapeia áreas atingidas, fornecendo informações essenciais para tomada de decisões.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-green-300">📢 Comunicação de Riscos</h4>
              <p className="text-sm text-blue-100">
                Pesquisas e estudos para qualificar protocolos de comunicação, garantindo informações eficazes à população.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-green-300">🎓 Capacitação</h4>
              <p className="text-sm text-blue-100">
                Treinamentos contínuos para secretarias de saúde e órgãos municipais sobre elaboração e execução de planos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
