'use client';

import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Phone, User, Filter, Search, CheckCircle, AlertCircle } from 'lucide-react';
import AvisoDadosFicticios from '@/components/AvisoDadosFicticios';

interface Emergencia {
  id: string;
  tipo: 'enchente' | 'incendio' | 'deslizamento' | 'vendaval' | 'outro';
  descricao: string;
  localizacao: string;
  coordenadas: { lat: number; lng: number };
  reportadoPor: string;
  contato: string;
  dataHora: string;
  status: 'pendente' | 'em_atendimento' | 'resolvido' | 'cancelado';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  vitimas: number;
}

export default function EmergenciasPage() {
  const [emergencias] = useState<Emergencia[]>([
    {
      id: '1',
      tipo: 'enchente',
      descricao: 'Alagamento severo na Rua Principal, água atingindo 1.5m',
      localizacao: 'Rua Principal, 450 - Centro',
      coordenadas: { lat: -30.0346, lng: -51.2177 },
      reportadoPor: 'João Silva',
      contato: '(51) 99999-0001',
      dataHora: '2025-10-20T08:30:00',
      status: 'em_atendimento',
      prioridade: 'critica',
      vitimas: 15
    },
    {
      id: '2',
      tipo: 'deslizamento',
      descricao: 'Deslizamento de terra em área residencial',
      localizacao: 'Morro da Esperança - Zona Norte',
      coordenadas: { lat: -30.0270, lng: -51.2065 },
      reportadoPor: 'Maria Santos',
      contato: '(51) 99999-0002',
      dataHora: '2025-10-20T07:15:00',
      status: 'em_atendimento',
      prioridade: 'alta',
      vitimas: 8
    },
    {
      id: '3',
      tipo: 'vendaval',
      descricao: 'Árvore caída bloqueando via principal',
      localizacao: 'Av. Brasil, km 12',
      coordenadas: { lat: -30.0500, lng: -51.2200 },
      reportadoPor: 'Pedro Costa',
      contato: '(51) 99999-0003',
      dataHora: '2025-10-20T06:00:00',
      status: 'resolvido',
      prioridade: 'media',
      vitimas: 0
    },
    {
      id: '4',
      tipo: 'enchente',
      descricao: 'Água invadindo casas na região baixa',
      localizacao: 'Bairro Várzea - Zona Sul',
      coordenadas: { lat: -30.0400, lng: -51.2100 },
      reportadoPor: 'Ana Oliveira',
      contato: '(51) 99999-0004',
      dataHora: '2025-10-19T18:45:00',
      status: 'resolvido',
      prioridade: 'alta',
      vitimas: 25
    }
  ]);

  const stats = {
    total: emergencias.length,
    pendentes: emergencias.filter(e => e.status === 'pendente').length,
    emAtendimento: emergencias.filter(e => e.status === 'em_atendimento').length,
    resolvidas: emergencias.filter(e => e.status === 'resolvido').length
  };

  const tipoColors = {
    enchente: 'bg-blue-100 text-blue-700 border-blue-300',
    incendio: 'bg-red-100 text-red-700 border-red-300',
    deslizamento: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    vendaval: 'bg-gray-100 text-gray-700 border-gray-300',
    outro: 'bg-purple-100 text-purple-700 border-purple-300'
  };

  const statusColors = {
    pendente: 'bg-yellow-100 text-yellow-800',
    em_atendimento: 'bg-blue-100 text-blue-800',
    resolvido: 'bg-green-100 text-green-800',
    cancelado: 'bg-gray-100 text-gray-800'
  };

  const prioridadeColors = {
    baixa: 'bg-green-500',
    media: 'bg-yellow-500',
    alta: 'bg-orange-500',
    critica: 'bg-red-500'
  };

  const statusLabels = {
    pendente: 'Pendente',
    em_atendimento: 'Em Atendimento',
    resolvido: 'Resolvido',
    cancelado: 'Cancelado'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestão de Emergências</h1>
          <p className="text-gray-600">Monitore e gerencie todas as ocorrências emergenciais em tempo real</p>
        </div>

        {/* Aviso de Dados Fictícios */}
        <div className="mb-8">
          <AvisoDadosFicticios 
            tipo="warning"
            mensagem="As emergências exibidas nesta página são FICTÍCIAS e utilizadas apenas para demonstração do sistema. Em produção, esta página exibirá ocorrências reais reportadas por cidadãos e autoridades."
            tamanho="medium"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Ocorrências</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-gray-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendentes}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Em Atendimento</p>
                <p className="text-3xl font-bold text-gray-900">{stats.emAtendimento}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolvidas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.resolvidas}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar emergências..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros Avançados
          </button>
        </div>

        {/* Emergencies List */}
        <div className="space-y-4">
          {emergencias.map((emergencia) => (
            <div key={emergencia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${prioridadeColors[emergencia.prioridade]}`}></div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${tipoColors[emergencia.tipo]}`}>
                        {emergencia.tipo.charAt(0).toUpperCase() + emergencia.tipo.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[emergencia.status]}`}>
                        {statusLabels[emergencia.status]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{emergencia.descricao}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{emergencia.localizacao}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{emergencia.reportadoPor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{emergencia.contato}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{new Date(emergencia.dataHora).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">{emergencia.vitimas}</div>
                    <div className="text-xs text-gray-500">Vítimas</div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                    Atender
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-semibold">
                    Ver Detalhes
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
