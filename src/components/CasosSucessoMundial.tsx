'use client';

import React, { useState } from 'react';
import { casosSucessoMundial, type CasoSucesso } from '@/data/casos-sucesso-mundial';

export default function CasosSucessoMundial() {
  const [casoSelecionado, setCasoSelecionado] = useState<CasoSucesso | null>(null);
  const [filtroImplementacao, setFiltroImplementacao] = useState<string>('todos');

  const casosFiltrados = filtroImplementacao === 'todos' 
    ? casosSucessoMundial 
    : casosSucessoMundial.filter((c: CasoSucesso) => {
        if (filtroImplementacao === 'implementado') return c.implementado;
        if (filtroImplementacao === 'planejado') return !c.implementado;
        return true;
      });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-blue-100">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🌍 Casos de Sucesso Mundial
        </h1>
        <p className="text-gray-700 text-lg">
          Sistemas de gestão de desastres que alcançaram resultados comprovados ao redor do mundo
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white/60 backdrop-blur-sm shadow-lg p-6 rounded-xl">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFiltroImplementacao('todos')}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              filtroImplementacao === 'todos'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Todos ({casosSucessoMundial.length})
          </button>
          <button
            onClick={() => setFiltroImplementacao('implementado')}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              filtroImplementacao === 'implementado'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            ✅ Implementados no Mundo
          </button>
          <button
            onClick={() => setFiltroImplementacao('planejado')}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              filtroImplementacao === 'planejado'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            🎯 Para Implementar no RS
          </button>
        </div>
      </div>

      {/* Grid de Casos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {casosFiltrados.map((caso: CasoSucesso) => (
          <div
            key={caso.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
            onClick={() => setCasoSelecionado(caso)}
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{caso.pais === 'Japão' ? '🇯🇵' : 
                  caso.pais === 'Holanda' ? '🇳🇱' :
                  caso.pais === 'Estados Unidos' ? '🇺🇸' :
                  caso.pais === 'Israel' ? '🇮🇱' :
                  caso.pais === 'Nova Zelândia' ? '🇳🇿' :
                  caso.pais === 'Singapura' ? '🇸🇬' :
                  '🌍'
                }</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{caso.pais}</h3>
                  <p className="text-sm text-gray-600">{caso.organizacao}</p>
                </div>
              </div>
              <span className={`badge ${
                caso.implementado ? 'badge-success' : 'badge-info'
              }`}>
                {caso.implementado ? '✅ Implementado' : '🎯 Potencial'}
              </span>
            </div>

            {/* Nome do Sistema */}
            <h4 className="text-xl font-bold mb-3 text-blue-600">
              {caso.nomeSistema}
            </h4>

            {/* Descrição */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {caso.descricao}
            </p>

            {/* Principais Resultados */}
            <div className="space-y-2 mb-4">
              {caso.resultados.slice(0, 3).map((resultado: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-1 font-bold">✓</span>
                  <span className="text-gray-700">{resultado}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Aplicável ao RS:</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {caso.aplicabilidadeRS}
              </p>
            </div>

            {/* Botão Ver Mais */}
            <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md">
              Ver Detalhes Completos →
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {casoSelecionado && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setCasoSelecionado(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-6xl">
                  {casoSelecionado.pais === 'Japão' ? '🇯🇵' : 
                   casoSelecionado.pais === 'Holanda' ? '🇳🇱' :
                   casoSelecionado.pais === 'Estados Unidos' ? '🇺🇸' :
                   casoSelecionado.pais === 'Israel' ? '🇮🇱' :
                   casoSelecionado.pais === 'Nova Zelândia' ? '🇳🇿' :
                   casoSelecionado.pais === 'Singapura' ? '🇸🇬' :
                   '🌍'
                  }
                </span>
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    {casoSelecionado.nomeSistema}
                  </h2>
                  <p className="text-gray-400">{casoSelecionado.pais} • {casoSelecionado.organizacao}</p>
                </div>
              </div>
              <button
                onClick={() => setCasoSelecionado(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Descrição */}
            <div className="glass-dark p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-3">📝 Descrição</h3>
              <p className="text-gray-300 leading-relaxed">
                {casoSelecionado.descricao}
              </p>
            </div>

            {/* Características Principais */}
            <div className="glass p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-4">⭐ Funcionalidades Chave</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {casoSelecionado.funcionalidadesChave.map((funcionalidade: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span className="text-gray-300">{funcionalidade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resultados Comprovados */}
            <div className="glass-dark p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-4">📊 Resultados Comprovados</h3>
              <div className="space-y-3">
                {casoSelecionado.resultados.map((resultado: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-gray-200">{resultado}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tecnologias Utilizadas */}
            <div className="glass p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-4">🔧 Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {casoSelecionado.tecnologias.map((tech: string, idx: number) => (
                  <span key={idx} className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full text-sm text-blue-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Aplicabilidade ao RS */}
            <div className="glass-dark p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-3">🎯 Aplicabilidade ao Rio Grande do Sul</h3>
              <p className="text-gray-300 leading-relaxed">
                {casoSelecionado.aplicabilidadeRS}
              </p>
            </div>

            {/* Fonte Oficial */}
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Fonte Oficial:</span>
                <a
                  href={casoSelecionado.fonteOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Acessar Documentação Oficial →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Funcionalidades Implementáveis */}
      <div className="glass-dark p-8 rounded-2xl">
        <h2 className="text-3xl font-bold gradient-text mb-6">
          🚀 Lições Aprendidas
        </h2>
        <p className="text-gray-300 mb-8">
          Principais insights dos casos de sucesso mundial para aplicação no Rio Grande do Sul
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-hover text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">Alertas Múltiplos Canais</h3>
            <p className="text-gray-300">SMS, sirenes, apps e TV simultaneamente para alcançar toda população</p>
          </div>
          
          <div className="card-hover text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">IA Preditiva</h3>
            <p className="text-gray-300">Sensores + Machine Learning para prever enchentes 24-48h antes</p>
          </div>
          
          <div className="card-hover text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-purple-400 mb-2">App Único Confiável</h3>
            <p className="text-gray-300">Um super app governamental que funciona offline com tudo integrado</p>
          </div>
        </div>
      </div>
    </div>
  );
}
