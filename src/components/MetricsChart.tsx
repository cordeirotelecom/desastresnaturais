'use client';

import React from 'react';

interface MetricData {
  label: string;
  value: number;
  change: number;
  color: string;
}

export default function MetricsChart() {
  const metrics: MetricData[] = [
    { label: 'Alertas Ativos', value: 3, change: -20, color: 'bg-red-500' },
    { label: 'Abrigos Disponíveis', value: 8, change: 15, color: 'bg-green-500' },
    { label: 'Pessoas Assistidas', value: 450, change: 25, color: 'bg-blue-500' },
    { label: 'Voluntários Ativos', value: 120, change: 10, color: 'bg-purple-500' },
  ];

  const getMaxValue = () => Math.max(...metrics.map(m => m.value));

  return (
    <div className="space-y-4">
      {/* Gráfico de Barras */}
      {metrics.map((metric, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{metric.value}</span>
              <span className={`text-xs px-2 py-1 rounded ${metric.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`${metric.color} h-3 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${(metric.value / getMaxValue()) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}

      {/* Estatísticas Resumidas */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Resumo do Sistema</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-600">Taxa de Resposta</p>
            <p className="text-xl font-bold text-green-600">98.5%</p>
          </div>
          <div>
            <p className="text-gray-600">Tempo Médio</p>
            <p className="text-xl font-bold text-blue-600">12min</p>
          </div>
          <div>
            <p className="text-gray-600">Eficiência</p>
            <p className="text-xl font-bold text-purple-600">95%</p>
          </div>
          <div>
            <p className="text-gray-600">Satisfação</p>
            <p className="text-xl font-bold text-orange-600">4.8/5</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Linha Simplificado (Últimos 7 dias) */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Tendência de Alertas (7 dias)</h4>
        <div className="flex items-end justify-between h-24 gap-1">
          {[12, 8, 15, 10, 7, 5, 3].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-500"
                style={{ height: `${(value / 15) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-600">{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Redução de <span className="font-bold text-green-600">75%</span> nos alertas esta semana
        </p>
      </div>
    </div>
  );
}
