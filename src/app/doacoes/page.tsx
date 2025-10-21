'use client';

import React, { useState } from 'react';
import { Package, Heart, TrendingUp, Users, MapPin, Calendar, Search, Filter, Plus } from 'lucide-react';
import AvisoDadosFicticios from '@/components/AvisoDadosFicticios';

interface Doacao {
  id: string;
  tipo: 'alimento' | 'roupa' | 'medicamento' | 'higiene' | 'outro';
  descricao: string;
  quantidade: number;
  unidade: string;
  doador: string;
  dataDoacao: string;
  destino: string;
  status: 'recebido' | 'em_transito' | 'entregue';
}

export default function DoacoesPage() {
  const [doacoes] = useState<Doacao[]>([
    { id: '1', tipo: 'alimento', descricao: 'Cestas Básicas', quantidade: 150, unidade: 'unidades', doador: 'Supermercado Central', dataDoacao: '2025-10-20', destino: 'Abrigo Municipal Centro', status: 'entregue' },
    { id: '2', tipo: 'roupa', descricao: 'Cobertores', quantidade: 300, unidade: 'unidades', doador: 'Campanha Solidária', dataDoacao: '2025-10-20', destino: 'Abrigo Escola São José', status: 'entregue' },
    { id: '3', tipo: 'medicamento', descricao: 'Medicamentos Básicos', quantidade: 500, unidade: 'caixas', doador: 'Farmácia Saúde', dataDoacao: '2025-10-19', destino: 'Posto Médico Zona Norte', status: 'em_transito' },
    { id: '4', tipo: 'higiene', descricao: 'Kits de Higiene', quantidade: 200, unidade: 'kits', doador: 'Empresa Limpeza Total', dataDoacao: '2025-10-19', destino: 'Abrigo Ginásio Central', status: 'recebido' },
  ]);

  const stats = {
    totalDoacoes: 1150,
    emTransito: 500,
    entregues: 450,
    doadores: 42
  };

  const tipoColors = {
    alimento: 'bg-orange-100 text-orange-700 border-orange-300',
    roupa: 'bg-blue-100 text-blue-700 border-blue-300',
    medicamento: 'bg-red-100 text-red-700 border-red-300',
    higiene: 'bg-green-100 text-green-700 border-green-300',
    outro: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  const statusColors = {
    recebido: 'bg-yellow-100 text-yellow-800',
    em_transito: 'bg-blue-100 text-blue-800',
    entregue: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    recebido: 'Recebido',
    em_transito: 'Em Trânsito',
    entregue: 'Entregue'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Aviso de Dados Fictícios */}
        <div className="mb-6">
          <AvisoDadosFicticios 
            tipo="warning"
            mensagem="As doações exibidas nesta página são FICTÍCIAS para demonstração. Em produção, serão integradas doações reais de ONGs, empresas e campanhas solidárias."
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Doações</h1>
          <p className="text-gray-600">Gerencie e acompanhe todas as doações recebidas e distribuídas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Doações</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDoacoes}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Em Trânsito</p>
                <p className="text-3xl font-bold text-gray-900">{stats.emTransito}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Entregues</p>
                <p className="text-3xl font-bold text-gray-900">{stats.entregues}</p>
              </div>
              <Heart className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Doadores Ativos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.doadores}</p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar doações..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrar
            </button>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold">
            <Plus className="w-5 h-5" />
            Nova Doação
          </button>
        </div>

        {/* Donations List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doador</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Destino</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doacoes.map((doacao) => (
                  <tr key={doacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${tipoColors[doacao.tipo]}`}>
                        {doacao.tipo.charAt(0).toUpperCase() + doacao.tipo.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{doacao.descricao}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{doacao.quantidade} {doacao.unidade}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{doacao.doador}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{doacao.destino}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{new Date(doacao.dataDoacao).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[doacao.status]}`}>
                        {statusLabels[doacao.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <Package className="w-12 h-12 mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Registrar Doação</h3>
            <p className="text-blue-100 mb-4">Cadastre novas doações recebidas</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50">
              Cadastrar Agora
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <TrendingUp className="w-12 h-12 mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Distribuir Doações</h3>
            <p className="text-green-100 mb-4">Organize a distribuição para abrigos</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50">
              Organizar
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <Heart className="w-12 h-12 mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Relatório de Impacto</h3>
            <p className="text-purple-100 mb-4">Visualize o impacto das doações</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50">
              Ver Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
