'use client';

import Link from 'next/link';

export default function AlertasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-800 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Sistema de Alertas - MP-RS</h1>
          <p className="text-red-200 mt-2">Monitoramento de Alertas em Tempo Real</p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerta Crítico */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-red-600">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-red-700">ALERTA CRÍTICO</h2>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  ATIVO
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Vale do Taquari</h3>
                <p className="text-gray-700">Risco CRÍTICO de enchente</p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm"><strong>Nível do Rio:</strong> 4.1m (crítico: 3.5m)</p>
                  <p className="text-sm"><strong>Previsão:</strong> Continua subindo</p>
                  <p className="text-sm"><strong>População em risco:</strong> 15.000 pessoas</p>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Fonte: ANA - Agência Nacional de Águas</p>
                  <p>Última atualização: {new Date().toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerta Alto */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-orange-700">ALERTA ALTO</h2>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  ATIVO
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Região Metropolitana</h3>
                <p className="text-gray-700">Temporal severo - Ventos fortes</p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm"><strong>Velocidade dos ventos:</strong> 85 km/h</p>
                  <p className="text-sm"><strong>Rajadas:</strong> Até 110 km/h</p>
                  <p className="text-sm"><strong>Duração estimada:</strong> 6 horas</p>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Fonte: INMET - Instituto Nacional de Meteorologia</p>
                  <p>Última atualização: {new Date(Date.now() - 8*60*1000).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerta Médio */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-yellow-700">ALERTA MÉDIO</h2>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  ATIVO
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Serra Gaúcha</h3>
                <p className="text-gray-700">Risco de deslizamento</p>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm"><strong>Solo:</strong> Saturado por chuvas</p>
                  <p className="text-sm"><strong>Encostas monitoradas:</strong> 12 pontos</p>
                  <p className="text-sm"><strong>Famílias em área de risco:</strong> 450</p>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Fonte: Defesa Civil RS</p>
                  <p>Última atualização: {new Date(Date.now() - 15*60*1000).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Alertas */}
        <div className="mt-8 bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Histórico de Alertas (Últimas 24h)</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
                <div className="flex-1">
                  <h4 className="font-semibold">Litoral Norte - RESOLVIDO</h4>
                  <p className="text-sm text-gray-600">Ressaca marítima - ventos diminuíram</p>
                  <p className="text-xs text-gray-500">Resolvido há 2 horas</p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                  RESOLVIDO
                </span>
              </div>
              
              <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex-1">
                  <h4 className="font-semibold">Porto Alegre - MONITORANDO</h4>
                  <p className="text-sm text-gray-600">Nível do Guaíba em observação</p>
                  <p className="text-xs text-gray-500">Em monitoramento há 6 horas</p>
                </div>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                  MONITORANDO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex space-x-4">
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Voltar ao Dashboard
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Acionar Equipes de Emergência
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Relatório Completo
          </button>
        </div>
      </main>
    </div>
  );
}