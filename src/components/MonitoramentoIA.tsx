'use client';

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CloudRain, Wind, Thermometer, Droplets, Activity, MapPin, Clock, CheckCircle, XCircle, Target } from 'lucide-react';
import AvisoDadosFicticios from '@/components/AvisoDadosFicticios';

interface PrevisaoDesastre {
  id: string;
  tipo: 'enchente' | 'vendaval' | 'deslizamento' | 'seca' | 'incendio';
  probabilidade: number;
  severidade: 'baixa' | 'moderada' | 'alta' | 'extrema';
  regiao: string;
  dataPrevisao: string;
  tempoEstimado: string;
  confianca: number;
  fatoresRisco: string[];
  recomendacoes: string[];
}

interface MetricasIA {
  precisao: number;
  alertasEmitidos: number;
  alertasCorretos: number;
  tempoMedioAntecedencia: string;
  modeloVersao: string;
  ultimaAtualizacao: string;
}

export default function MonitoramentoIA() {
  const [previsoes, setPrevisoes] = useState<PrevisaoDesastre[]>([
    {
      id: '1',
      tipo: 'enchente',
      probabilidade: 87,
      severidade: 'alta',
      regiao: 'Porto Alegre - Zona Norte',
      dataPrevisao: '2025-10-21T14:00:00',
      tempoEstimado: '12h',
      confianca: 85,
      fatoresRisco: ['Chuvas intensas previstas (120mm)', 'Solo saturado', 'Rios acima do nível normal', 'Histórico de enchentes na região'],
      recomendacoes: ['Evacuar áreas de risco', 'Preparar abrigos emergenciais', 'Mobilizar equipes de resgate', 'Alertar população via SMS']
    },
    {
      id: '2',
      tipo: 'deslizamento',
      probabilidade: 72,
      severidade: 'moderada',
      regiao: 'Canoas - Morro da Esperança',
      dataPrevisao: '2025-10-21T18:00:00',
      tempoEstimado: '16h',
      confianca: 78,
      fatoresRisco: ['Chuvas acumuladas (80mm)', 'Inclinação do terreno 45°', 'Vegetação degradada', 'Histórico de deslizamentos'],
      recomendacoes: ['Monitorar encostas', 'Preparar rotas de evacuação', 'Alertar moradores de área de risco']
    },
    {
      id: '3',
      tipo: 'vendaval',
      probabilidade: 65,
      severidade: 'moderada',
      regiao: 'Região Metropolitana',
      dataPrevisao: '2025-10-22T08:00:00',
      tempoEstimado: '30h',
      confianca: 70,
      fatoresRisco: ['Ventos previstos 80km/h', 'Frente fria intensa', 'Árvores em área urbana'],
      recomendacoes: ['Reforçar estruturas temporárias', 'Podar árvores em risco', 'Alertar população']
    }
  ]);

  const [metricas, setMetricas] = useState<MetricasIA>({
    precisao: 85.4,
    alertasEmitidos: 247,
    alertasCorretos: 211,
    tempoMedioAntecedencia: '12.5h',
    modeloVersao: 'v2.3.1',
    ultimaAtualizacao: new Date().toISOString()
  });

  const [dadosClimaticos, setDadosClimaticos] = useState({
    temperatura: 18.5,
    umidade: 78,
    precipitacao: 12.5,
    vento: 25,
    pressao: 1013
  });

  useEffect(() => {
    // Simulação de atualização em tempo real
    const interval = setInterval(() => {
      setDadosClimaticos(prev => ({
        temperatura: prev.temperatura + (Math.random() - 0.5) * 0.5,
        umidade: Math.max(0, Math.min(100, prev.umidade + (Math.random() - 0.5) * 2)),
        precipitacao: Math.max(0, prev.precipitacao + (Math.random() - 0.5) * 1),
        vento: Math.max(0, prev.vento + (Math.random() - 0.5) * 3),
        pressao: prev.pressao + (Math.random() - 0.5) * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const severidadeColors = {
    baixa: 'bg-green-100 text-green-800 border-green-300',
    moderada: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    alta: 'bg-orange-100 text-orange-800 border-orange-300',
    extrema: 'bg-red-100 text-red-800 border-red-300'
  };

  const tipoIcons = {
    enchente: CloudRain,
    vendaval: Wind,
    deslizamento: AlertTriangle,
    seca: Thermometer,
    incendio: Activity
  };

  const tipoColors = {
    enchente: 'text-blue-600',
    vendaval: 'text-gray-600',
    deslizamento: 'text-yellow-600',
    seca: 'text-orange-600',
    incendio: 'text-red-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Aviso de Dados Fictícios */}
        <div className="mb-6">
          <AvisoDadosFicticios 
            tipo="warning"
            mensagem="As previsões exibidas são SIMULADAS para demonstração. Em produção, o sistema utilizará dados reais de sensores IoT, estações meteorológicas e modelos de Machine Learning treinados com histórico real de desastres do RS."
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Monitoramento com IA Preditiva</h1>
          </div>
          <p className="text-gray-600">Sistema de previsão de desastres naturais com 85% de precisão e 12h de antecedência</p>
        </div>

        {/* Métricas do Modelo IA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Métricas do Modelo de IA
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Precisão Geral</div>
              <div className="text-3xl font-bold">{metricas.precisao}%</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Alertas Emitidos</div>
              <div className="text-3xl font-bold">{metricas.alertasEmitidos}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Alertas Corretos</div>
              <div className="text-3xl font-bold">{metricas.alertasCorretos}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Antecedência Média</div>
              <div className="text-3xl font-bold">{metricas.tempoMedioAntecedencia}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Versão do Modelo</div>
              <div className="text-2xl font-bold">{metricas.modeloVersao}</div>
            </div>
          </div>
        </div>

        {/* Dados Climáticos em Tempo Real */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Dados Climáticos em Tempo Real
            <span className="ml-auto text-sm text-gray-500 font-normal">Atualizado a cada 5 segundos</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dadosClimaticos.temperatura.toFixed(1)}°C</div>
              <div className="text-sm text-gray-600">Temperatura</div>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dadosClimaticos.umidade.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Umidade</div>
            </div>
            <div className="text-center">
              <CloudRain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dadosClimaticos.precipitacao.toFixed(1)}mm</div>
              <div className="text-sm text-gray-600">Precipitação</div>
            </div>
            <div className="text-center">
              <Wind className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dadosClimaticos.vento.toFixed(0)}km/h</div>
              <div className="text-sm text-gray-600">Vento</div>
            </div>
            <div className="text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dadosClimaticos.pressao.toFixed(0)}hPa</div>
              <div className="text-sm text-gray-600">Pressão</div>
            </div>
          </div>
        </div>

        {/* Previsões de Desastres */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Previsões de Desastres Naturais
          </h2>
          <div className="space-y-4">
            {previsoes.map((previsao) => {
              const Icon = tipoIcons[previsao.tipo];
              return (
                <div key={previsao.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-10 h-10 ${tipoColors[previsao.tipo]}`} />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 capitalize">{previsao.tipo}</h3>
                          <p className="text-gray-600">{previsao.regiao}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-red-600">{previsao.probabilidade}%</div>
                        <div className="text-sm text-gray-600">Probabilidade</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${severidadeColors[previsao.severidade]}`}>
                          Severidade: {previsao.severidade.charAt(0).toUpperCase() + previsao.severidade.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span>Previsão: {previsao.tempoEstimado}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Target className="w-4 h-4" />
                        <span>Confiança: {previsao.confianca}%</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          Fatores de Risco
                        </h4>
                        <ul className="space-y-1">
                          {previsao.fatoresRisco.map((fator, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{fator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Recomendações
                        </h4>
                        <ul className="space-y-1">
                          {previsao.recomendacoes.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t">
                      <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Emitir Alerta
                      </button>
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Ver no Mapa
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-semibold">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metodologia */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Metodologia Prof. Fábio Teodoro (PUC-PR)
          </h3>
          <p className="text-blue-800 text-sm mb-2">
            Sistema baseado em metodologia de IA para detecção de focos de incêndio adaptada para múltiplos tipos de desastres.
          </p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• <strong>Machine Learning:</strong> Análise de dados históricos + padrões climáticos</li>
            <li>• <strong>Tempo Real:</strong> Integração com sensores meteorológicos e satélites</li>
            <li>• <strong>Aprendizado Contínuo:</strong> Modelo se aprimora com cada evento registrado</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
