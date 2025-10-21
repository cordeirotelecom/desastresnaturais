'use client';

import React, { useState } from 'react';
import DHSService, {
  AbordagemSistemica,
  EixoSustentabilidade,
  SetorAtuante,
  NecessidadeHumana,
} from '@/services/dhs-service';

export default function DHSPlatform() {
  const [abaSelecionada, setAbaSelecionada] = useState<
    'conceito' | 'necessidades' | 'eixos' | 'setores' | 'abordagens' | 'familia'
  >('conceito');

  const definicaoDHS = DHSService.getDefinicaoDHS();
  const necessidades = DHSService.getNecessidadesHumanas();
  const eixos = DHSService.getEixosSustentabilidade();
  const setores = DHSService.getSetoresConvergencia();
  const abordagens = DHSService.getAbordagensSistemicas();
  const familia = DHSService.getRelevanciaFamilia();

  const getCorAbordagem = (tipo: string) => {
    switch (tipo) {
      case 'multidisciplinar':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'interdisciplinar':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'transdisciplinar':
        return 'bg-green-100 border-green-500 text-green-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getIconeNecessidade = (categoria: string) => {
    switch (categoria) {
      case 'fisiologica':
        return '🍎';
      case 'psicologica':
        return '🧠';
      case 'autorrealizacao':
        return '🎯';
      default:
        return '⭐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-green-900 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-3">
              ⚖️ Desenvolvimento Harmônico e Sustentável
            </h1>
            <p className="text-xl text-purple-200 mb-4">
              Base Filosófica e Metodológica do Sistema de Gestão de Desastres
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 max-w-4xl mx-auto">
              <p className="text-sm leading-relaxed text-blue-100">
                Pensamento Sistêmico + Convergência de Setores + Impactos Proporcionais = 
                <strong className="text-green-300"> Transformação Sustentável</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-xl mb-6">
          <div className="flex flex-wrap border-b overflow-x-auto">
            <button
              onClick={() => setAbaSelecionada('conceito')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'conceito'
                  ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              📖 Conceito DHS
            </button>
            <button
              onClick={() => setAbaSelecionada('necessidades')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'necessidades'
                  ? 'border-b-4 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              🎯 Necessidades Humanas
            </button>
            <button
              onClick={() => setAbaSelecionada('eixos')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'eixos'
                  ? 'border-b-4 border-green-600 text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              ⚖️ Eixos da Sustentabilidade
            </button>
            <button
              onClick={() => setAbaSelecionada('setores')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'setores'
                  ? 'border-b-4 border-orange-600 text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              🤝 Convergência de Setores
            </button>
            <button
              onClick={() => setAbaSelecionada('abordagens')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'abordagens'
                  ? 'border-b-4 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              🔄 Pensamento Sistêmico
            </button>
            <button
              onClick={() => setAbaSelecionada('familia')}
              className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                abaSelecionada === 'familia'
                  ? 'border-b-4 border-pink-600 text-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-gray-50'
              }`}
            >
              👨‍👩‍👧‍👦 Família como Base
            </button>
          </div>

          <div className="p-8">
            {/* ABA: Conceito DHS */}
            {abaSelecionada === 'conceito' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{definicaoDHS.titulo}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">{definicaoDHS.definicao}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 mb-3">🔑 Componentes Chave</h3>
                      <ul className="space-y-2">
                        {definicaoDHS.componentesChave.map((componente, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2 text-xl">✓</span>
                            <span className="text-gray-700">{componente}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-3">🎯 Resultados Esperados</h3>
                      <ul className="space-y-2">
                        {definicaoDHS.resultadosEsperados.map((resultado, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2 text-xl">★</span>
                            <span className="text-gray-700">{resultado}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Diagrama Visual */}
                <div className="bg-white rounded-lg border-2 border-purple-200 p-8">
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    🔄 Ciclo do DHS
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border-2 border-blue-300">
                      <div className="text-4xl mb-2">🎯</div>
                      <h4 className="font-bold text-blue-800 mb-1">1. Foco Prioritário</h4>
                      <p className="text-sm text-gray-600">Necessidades + Família</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border-2 border-green-300">
                      <div className="text-4xl mb-2">🤝</div>
                      <h4 className="font-bold text-green-800 mb-1">2. Convergência</h4>
                      <p className="text-sm text-gray-600">3 Setores + Comunidade</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border-2 border-purple-300">
                      <div className="text-4xl mb-2">⚖️</div>
                      <h4 className="font-bold text-purple-800 mb-1">3. Proporcionalidade</h4>
                      <p className="text-sm text-gray-600">3 Eixos Equilibrados</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center border-2 border-orange-300">
                      <div className="text-4xl mb-2">🌟</div>
                      <h4 className="font-bold text-orange-800 mb-1">4. Transformação</h4>
                      <p className="text-sm text-gray-600">Paz + Harmonia</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: Necessidades Humanas */}
            {abaSelecionada === 'necessidades' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎯 Pirâmide de Necessidades Humanas</h2>
                <p className="text-gray-600 mb-6">
                  O DHS busca atender necessidades humanas legítimas, não apenas desejos ou vontades.
                </p>

                {/* Necessidades Fisiológicas */}
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                  <h3 className="text-2xl font-bold text-red-800 mb-4">🍎 Necessidades Fisiológicas (Base)</h3>
                  <p className="text-sm text-gray-600 mb-4">Essenciais para a sobrevivência humana</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {necessidades.fisiologicas.map((nec: NecessidadeHumana) => (
                      <div key={nec.id} className="bg-white rounded-lg p-4 shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 flex items-center">
                            {getIconeNecessidade(nec.categoria)}
                            <span className="ml-2">{nec.tipo}</span>
                          </h4>
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            {nec.prioridade.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{nec.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Necessidades Psicológicas */}
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">🧠 Necessidades Psicológicas (Intermediário)</h3>
                  <p className="text-sm text-gray-600 mb-4">Relacionadas ao bem-estar emocional e social</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {necessidades.psicologicas.map((nec: NecessidadeHumana) => (
                      <div key={nec.id} className="bg-white rounded-lg p-4 shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 flex items-center">
                            {getIconeNecessidade(nec.categoria)}
                            <span className="ml-2">{nec.tipo}</span>
                          </h4>
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                            {nec.prioridade.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{nec.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Necessidades de Autorrealização */}
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">🎯 Necessidades de Autorrealização (Topo)</h3>
                  <p className="text-sm text-gray-600 mb-4">Realização plena do potencial humano</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {necessidades.autorrealizacao.map((nec: NecessidadeHumana) => (
                      <div key={nec.id} className="bg-white rounded-lg p-4 shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 flex items-center">
                            {getIconeNecessidade(nec.categoria)}
                            <span className="ml-2">{nec.tipo}</span>
                          </h4>
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                            {nec.prioridade.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{nec.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ABA: Eixos da Sustentabilidade */}
            {abaSelecionada === 'eixos' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">⚖️ Impactos Proporcionais nos Eixos</h2>
                <p className="text-gray-600 mb-6">
                  O DHS exige equilíbrio entre os três eixos da sustentabilidade, com impactos proporcionais de aproximadamente 33% cada.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {eixos.map((eixo: EixoSustentabilidade) => (
                    <div
                      key={eixo.id}
                      className={`rounded-lg p-6 shadow-lg border-2 ${
                        eixo.tipo === 'economico'
                          ? 'bg-yellow-50 border-yellow-500'
                          : eixo.tipo === 'social'
                          ? 'bg-blue-50 border-blue-500'
                          : 'bg-green-50 border-green-500'
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-3">{eixo.nome}</h3>
                      <p className="text-gray-700 mb-4">{eixo.descricao}</p>
                      <div className="bg-white rounded p-3">
                        <div className="text-sm text-gray-600 mb-1">Proporcionalidade Ideal</div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2">
                            <div
                              className={`h-4 rounded-full ${
                                eixo.tipo === 'economico'
                                  ? 'bg-yellow-500'
                                  : eixo.tipo === 'social'
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${eixo.proporcionalidade}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-lg">{eixo.proporcionalidade.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-50 via-blue-50 to-green-50 rounded-lg p-6 border-2 border-gray-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Princípio da Proporcionalidade</h3>
                  <p className="text-gray-700 mb-3">
                    Toda ação deve buscar impacto equilibrado nos três eixos. Um desequilíbrio excessivo compromete a sustentabilidade do desenvolvimento.
                  </p>
                  <div className="bg-white rounded p-4">
                    <p className="text-sm text-gray-600"><strong>Exemplo Prático:</strong></p>
                    <p className="text-sm text-gray-700 mt-2">
                      ✅ <strong>Bom:</strong> Projeto gera 35% de impacto econômico, 32% social e 33% ambiental<br />
                      ❌ <strong>Insustentável:</strong> Projeto gera 80% econômico, 15% social e 5% ambiental
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: Convergência de Setores */}
            {abaSelecionada === 'setores' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🤝 Convergência dos Setores</h2>
                <p className="text-gray-600 mb-6">
                  O DHS só é alcançado com a participação ativa e convergente dos três setores e da comunidade em geral.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {setores.map((setor: SetorAtuante) => (
                    <div
                      key={setor.id}
                      className={`rounded-lg p-6 shadow-lg border-2 ${
                        setor.tipo === 'publico'
                          ? 'bg-blue-50 border-blue-500'
                          : setor.tipo === 'privado'
                          ? 'bg-green-50 border-green-500'
                          : setor.tipo === 'sociedade-civil'
                          ? 'bg-purple-50 border-purple-500'
                          : 'bg-orange-50 border-orange-500'
                      }`}
                    >
                      <div className="text-4xl mb-3 text-center">
                        {setor.tipo === 'publico' && '🏛️'}
                        {setor.tipo === 'privado' && '🏢'}
                        {setor.tipo === 'sociedade-civil' && '🤲'}
                        {setor.tipo === 'comunidade' && '👥'}
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">{setor.nome}</h3>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Representantes:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {setor.representantes.map((rep, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-1">•</span>
                              <span>{rep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">🔄 Matriz de Convergência</h3>
                  <p className="text-gray-700 mb-4">
                    A convergência acontece quando todos os setores trabalham juntos por um objetivo comum, 
                    compartilhando recursos, conhecimentos e responsabilidades.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Sinais de Convergência</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Comunicação regular entre setores</li>
                        <li>• Objetivos compartilhados e alinhados</li>
                        <li>• Tomada de decisão participativa</li>
                        <li>• Resultados mensuráveis em conjunto</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold text-red-800 mb-2">⚠️ Bloqueios à Convergência</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Trabalho isolado e fragmentado</li>
                        <li>• Conflito de interesses não resolvidos</li>
                        <li>• Falta de transparência</li>
                        <li>• Ausência de coordenação central</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: Pensamento Sistêmico */}
            {abaSelecionada === 'abordagens' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🔄 Evolução do Pensamento Sistêmico</h2>
                <p className="text-gray-600 mb-6">
                  A superação da crise exige mudança de paradigma: do pensamento fragmentado ao pensamento complexo e transdisciplinar.
                </p>

                {abordagens.map((abordagem: AbordagemSistemica) => (
                  <div
                    key={abordagem.tipo}
                    className={`rounded-lg p-6 shadow-lg border-2 ${getCorAbordagem(abordagem.tipo)}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{abordagem.nome}</h3>
                        <p className="text-lg mb-3">{abordagem.descricao}</p>
                        <div className="bg-white/50 rounded p-3 mb-4">
                          <p className="text-sm font-semibold mb-1">🚣 Analogia da Tripulação:</p>
                          <p className="italic">{abordagem.analogia}</p>
                        </div>
                      </div>
                      <div className="ml-4 text-center">
                        <div className="text-4xl font-bold mb-1">{abordagem.nivelEficacia}%</div>
                        <div className="text-xs">Eficácia</div>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Características:</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {abordagem.caracteristicas.map((caract, idx) => (
                          <div key={idx} className="flex items-start bg-white/30 rounded p-2">
                            <span className="mr-2">
                              {abordagem.tipo === 'transdisciplinar' ? '✅' : 
                               abordagem.tipo === 'interdisciplinar' ? '🟡' : '❌'}
                            </span>
                            <span className="text-sm">{caract}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 border-2 border-green-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">🎯 Meta do DHS</h3>
                  <p className="text-lg text-gray-800">
                    <strong>Abordagem Transdisciplinar:</strong> É a forma ideal de trabalho no DHS, 
                    pois permite navegação eficaz em situações complexas e imprevisíveis, 
                    como desastres naturais.
                  </p>
                </div>
              </div>
            )}

            {/* ABA: Família como Base */}
            {abaSelecionada === 'familia' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  👨‍👩‍👧‍👦 A Família como Base da Sociedade
                </h2>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border-l-4 border-pink-600">
                  <h3 className="text-2xl font-bold text-pink-800 mb-3">⚖️ Fundamento Constitucional</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <p className="font-semibold text-gray-800 mb-2">{familia.fundamentoLegal}</p>
                    <p className="text-lg italic text-gray-700">&quot;{familia.texto}&quot;</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">💡 Importância da Família</h3>
                    <ul className="space-y-3">
                      {familia.importancia.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2 text-xl">★</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                    <h3 className="text-xl font-bold text-green-800 mb-4">🤝 Ações Integradas</h3>
                    <ul className="space-y-3">
                      {familia.acoesIntegradas.map((acao, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-2 text-xl">✓</span>
                          <span className="text-gray-700">{acao}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 border-2 border-purple-400">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">🏠 Família no Contexto de Desastres</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded p-4">
                      <div className="text-3xl mb-2 text-center">🛡️</div>
                      <h4 className="font-bold text-center mb-2">Proteção</h4>
                      <p className="text-sm text-gray-600 text-center">
                        Prioridade na evacuação e abrigo de núcleos familiares completos
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <div className="text-3xl mb-2 text-center">🤝</div>
                      <h4 className="font-bold text-center mb-2">Apoio</h4>
                      <p className="text-sm text-gray-600 text-center">
                        Assistência psicossocial focada no fortalecimento familiar
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <div className="text-3xl mb-2 text-center">🌱</div>
                      <h4 className="font-bold text-center mb-2">Reconstrução</h4>
                      <p className="text-sm text-gray-600 text-center">
                        Recuperação centrada na família como unidade de reconstrução social
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Informativo */}
        <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-green-900 text-white rounded-lg shadow-xl p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">🌟 Transformação Sistêmica</h3>
            <p className="text-lg text-purple-200 mb-4">
              O DHS não é apenas um método, é uma mudança de paradigma que transforma como entendemos 
              e respondemos aos desafios complexos da sociedade.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div>
                <strong className="text-green-300">Pensamento Sistêmico</strong> →
              </div>
              <div>
                <strong className="text-blue-300">Convergência</strong> →
              </div>
              <div>
                <strong className="text-purple-300">Proporcionalidade</strong> →
              </div>
              <div>
                <strong className="text-yellow-300">Harmonia</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
