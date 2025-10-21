'use client';

import React, { useState } from 'react';
import {
  Download, FileText, FileSpreadsheet, Calendar, Filter,
  BarChart3, PieChart, TrendingUp, Users, Home, AlertTriangle,
  Package, Heart, Activity, MapPin, Clock, ChevronDown, ChevronUp,
  Printer, Share2, Mail, Eye
} from 'lucide-react';
import { BannerDadosSimulados } from './BadgeDados';

// ==================== TIPOS ====================

interface FiltrosRelatorio {
  periodo: 'hoje' | '7dias' | '30dias' | 'personalizado';
  dataInicio?: Date;
  dataFim?: Date;
  tipo: 'geral' | 'emergencias' | 'abrigos' | 'voluntarios' | 'doacoes';
  regiao?: string;
  formato: 'pdf' | 'excel' | 'visualizar';
}

interface DadosEstatisticos {
  emergencias: {
    total: number;
    criticas: number;
    altas: number;
    medias: number;
    resolvidas: number;
    pendentes: number;
    tempoMedioAtendimento: number; // em horas
  };
  abrigos: {
    total: number;
    ativos: number;
    lotados: number;
    capacidadeTotal: number;
    ocupacaoTotal: number;
    pessoasAbrigadas: number;
  };
  voluntarios: {
    total: number;
    ativos: number;
    medicos: number;
    resgate: number;
    transporte: number;
    geral: number;
  };
  doacoes: {
    total: number;
    alimentacao: number;
    roupas: number;
    medicamentos: number;
    agua: number;
    outros: number;
  };
}

// ==================== DADOS MOCKADOS ====================

const dadosEstatisticos: DadosEstatisticos = {
  emergencias: {
    total: 226,
    criticas: 47,
    altas: 89,
    medias: 90,
    resolvidas: 156,
    pendentes: 70,
    tempoMedioAtendimento: 3.5
  },
  abrigos: {
    total: 12,
    ativos: 10,
    lotados: 2,
    capacidadeTotal: 4850,
    ocupacaoTotal: 2847,
    pessoasAbrigadas: 2847
  },
  voluntarios: {
    total: 328,
    ativos: 286,
    medicos: 45,
    resgate: 68,
    transporte: 92,
    geral: 123
  },
  doacoes: {
    total: 1245,
    alimentacao: 420,
    roupas: 315,
    medicamentos: 180,
    agua: 210,
    outros: 120
  }
};

const cidades = [
  'Todas',
  'Porto Alegre',
  'Canoas',
  'Novo Hamburgo',
  'São Leopoldo',
  'Eldorado do Sul',
  'Guaíba',
  'Alvorada',
  'Viamão'
];

// ==================== COMPONENTE PRINCIPAL ====================

export default function Relatorios() {
  const [filtros, setFiltros] = useState<FiltrosRelatorio>({
    periodo: '30dias',
    tipo: 'geral',
    formato: 'visualizar'
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [relatorioGerado, setRelatorioGerado] = useState(false);

  const gerarRelatorio = () => {
    setRelatorioGerado(true);
    
    // Simular download baseado no formato
    if (filtros.formato === 'pdf') {
      alert('📄 Gerando relatório PDF...\n\nEm produção, isso baixaria um arquivo PDF com todos os dados e gráficos.');
    } else if (filtros.formato === 'excel') {
      alert('📊 Gerando relatório Excel...\n\nEm produção, isso baixaria uma planilha Excel com todos os dados tabulados.');
    }
  };

  const exportarCSV = () => {
    alert('📥 Exportando para CSV...\n\nEm produção, isso baixaria um arquivo CSV com os dados brutos.');
  };

  const imprimirRelatorio = () => {
    window.print();
  };

  const compartilharRelatorio = () => {
    alert('🔗 Link de compartilhamento gerado!\n\nEm produção, isso geraria um link seguro para compartilhar o relatório.');
  };

  const enviarPorEmail = () => {
    alert('📧 Enviando relatório por email...\n\nEm produção, isso abriria um formulário para enviar o relatório por email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner de dados simulados */}
        <BannerDadosSimulados 
          tipo="mock"
          mensagem="Os dados estatísticos e gráficos exibidos nesta página são SIMULADOS para demonstração. Em produção, conecte com o banco de dados real para relatórios precisos."
        />
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Geração de Relatórios
              </h1>
              <p className="mt-1 text-gray-600">
                Gere relatórios completos em PDF, Excel ou visualize online
              </p>
            </div>

            {relatorioGerado && (
              <div className="flex gap-2">
                <button
                  onClick={imprimirRelatorio}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  <Printer className="w-5 h-5" />
                  Imprimir
                </button>
                <button
                  onClick={compartilharRelatorio}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>
                <button
                  onClick={enviarPorEmail}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Mail className="w-5 h-5" />
                  Enviar Email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-6 h-6 text-blue-600" />
              Filtros do Relatório
            </h2>
            {mostrarFiltros ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {mostrarFiltros && (
            <div className="space-y-4">
              {/* Tipo de Relatório */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Relatório
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { value: 'geral', label: 'Geral Completo', icon: FileText },
                    { value: 'emergencias', label: 'Emergências', icon: AlertTriangle },
                    { value: 'abrigos', label: 'Abrigos', icon: Home },
                    { value: 'voluntarios', label: 'Voluntários', icon: Users },
                    { value: 'doacoes', label: 'Doações', icon: Package }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setFiltros({ ...filtros, tipo: value as any })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition ${
                        filtros.tipo === value
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium text-center">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'hoje', label: 'Hoje' },
                    { value: '7dias', label: 'Últimos 7 dias' },
                    { value: '30dias', label: 'Últimos 30 dias' },
                    { value: 'personalizado', label: 'Personalizado' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setFiltros({ ...filtros, periodo: value as any })}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        filtros.periodo === value
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Datas Personalizadas */}
              {filtros.periodo === 'personalizado' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Início
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFiltros({ ...filtros, dataInicio: new Date(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Fim
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFiltros({ ...filtros, dataFim: new Date(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {/* Região */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Região / Cidade
                </label>
                <select
                  value={filtros.regiao || 'Todas'}
                  onChange={(e) => setFiltros({ ...filtros, regiao: e.target.value === 'Todas' ? undefined : e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {cidades.map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>

              {/* Formato */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Saída
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'visualizar', label: 'Visualizar Online', icon: Eye, color: 'blue' },
                    { value: 'pdf', label: 'Baixar PDF', icon: FileText, color: 'red' },
                    { value: 'excel', label: 'Baixar Excel', icon: FileSpreadsheet, color: 'green' }
                  ].map(({ value, label, icon: Icon, color }) => (
                    <button
                      key={value}
                      onClick={() => setFiltros({ ...filtros, formato: value as any })}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                        filtros.formato === value
                          ? `border-${color}-600 bg-${color}-50 text-${color}-900`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Gerar */}
              <button
                onClick={gerarRelatorio}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg shadow-lg"
              >
                <Download className="w-6 h-6" />
                Gerar Relatório
              </button>
            </div>
          )}
        </div>

        {/* Visualização do Relatório */}
        {relatorioGerado && filtros.formato === 'visualizar' && (
          <div className="space-y-6">
            {/* Cabeçalho do Relatório */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Relatório {filtros.tipo === 'geral' ? 'Geral Completo' : filtros.tipo}
                </h2>
                <p className="text-gray-600 mt-1">
                  Período: {filtros.periodo === 'hoje' ? 'Hoje' : filtros.periodo === '7dias' ? 'Últimos 7 dias' : 'Últimos 30 dias'}
                  {filtros.regiao && ` • Região: ${filtros.regiao}`}
                </p>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Gerado em: {new Date().toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Emergências */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                  <span className="text-3xl font-bold text-gray-900">{dadosEstatisticos.emergencias.total}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Emergências</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Críticas:</span>
                    <span className="font-semibold text-red-600">{dadosEstatisticos.emergencias.criticas}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Altas:</span>
                    <span className="font-semibold text-orange-600">{dadosEstatisticos.emergencias.altas}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Resolvidas:</span>
                    <span className="font-semibold text-green-600">{dadosEstatisticos.emergencias.resolvidas}</span>
                  </p>
                  <p className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                    <span>Tempo médio:</span>
                    <span>{dadosEstatisticos.emergencias.tempoMedioAtendimento}h</span>
                  </p>
                </div>
              </div>

              {/* Abrigos */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <Home className="w-8 h-8 text-purple-500" />
                  <span className="text-3xl font-bold text-gray-900">{dadosEstatisticos.abrigos.total}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Abrigos</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Ativos:</span>
                    <span className="font-semibold text-green-600">{dadosEstatisticos.abrigos.ativos}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Lotados:</span>
                    <span className="font-semibold text-red-600">{dadosEstatisticos.abrigos.lotados}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Abrigados:</span>
                    <span className="font-semibold text-blue-600">{dadosEstatisticos.abrigos.pessoasAbrigadas}</span>
                  </p>
                  <p className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                    <span>Ocupação:</span>
                    <span>{((dadosEstatisticos.abrigos.ocupacaoTotal / dadosEstatisticos.abrigos.capacidadeTotal) * 100).toFixed(1)}%</span>
                  </p>
                </div>
              </div>

              {/* Voluntários */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold text-gray-900">{dadosEstatisticos.voluntarios.total}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Voluntários</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Ativos:</span>
                    <span className="font-semibold text-green-600">{dadosEstatisticos.voluntarios.ativos}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Médicos:</span>
                    <span className="font-semibold">{dadosEstatisticos.voluntarios.medicos}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Resgate:</span>
                    <span className="font-semibold">{dadosEstatisticos.voluntarios.resgate}</span>
                  </p>
                </div>
              </div>

              {/* Doações */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold text-gray-900">{dadosEstatisticos.doacoes.total}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Doações</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Alimentação:</span>
                    <span className="font-semibold">{dadosEstatisticos.doacoes.alimentacao}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Roupas:</span>
                    <span className="font-semibold">{dadosEstatisticos.doacoes.roupas}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Medicamentos:</span>
                    <span className="font-semibold">{dadosEstatisticos.doacoes.medicamentos}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Gráficos Simulados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Distribuição de Emergências por Urgência
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Críticas', value: dadosEstatisticos.emergencias.criticas, color: 'bg-red-500', total: dadosEstatisticos.emergencias.total },
                    { label: 'Altas', value: dadosEstatisticos.emergencias.altas, color: 'bg-orange-500', total: dadosEstatisticos.emergencias.total },
                    { label: 'Médias', value: dadosEstatisticos.emergencias.medias, color: 'bg-blue-500', total: dadosEstatisticos.emergencias.total }
                  ].map(({ label, value, color, total }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-gray-700 font-medium">{label}</span>
                        <span className="text-gray-900 font-bold">{value} ({((value/total)*100).toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${color} h-3 rounded-full transition-all`}
                          style={{ width: `${(value/total)*100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Voluntários por Especialidade
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Geral', value: dadosEstatisticos.voluntarios.geral, color: 'bg-gray-500', total: dadosEstatisticos.voluntarios.total },
                    { label: 'Transporte', value: dadosEstatisticos.voluntarios.transporte, color: 'bg-blue-500', total: dadosEstatisticos.voluntarios.total },
                    { label: 'Resgate', value: dadosEstatisticos.voluntarios.resgate, color: 'bg-orange-500', total: dadosEstatisticos.voluntarios.total },
                    { label: 'Médicos', value: dadosEstatisticos.voluntarios.medicos, color: 'bg-red-500', total: dadosEstatisticos.voluntarios.total }
                  ].map(({ label, value, color, total }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-gray-700 font-medium">{label}</span>
                        <span className="text-gray-900 font-bold">{value} ({((value/total)*100).toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${color} h-3 rounded-full transition-all`}
                          style={{ width: `${(value/total)*100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão Export CSV */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Exportar Dados Brutos</h3>
                  <p className="text-sm text-gray-600 mt-1">Baixe os dados em formato CSV para análise personalizada</p>
                </div>
                <button
                  onClick={exportarCSV}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de Download */}
        {relatorioGerado && filtros.formato !== 'visualizar' && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Download className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatório Gerado com Sucesso!</h2>
            <p className="text-gray-600 mb-6">
              Seu relatório em {filtros.formato === 'pdf' ? 'PDF' : 'Excel'} está sendo processado...
            </p>
            <p className="text-sm text-gray-500">
              Em produção, o download iniciaria automaticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
