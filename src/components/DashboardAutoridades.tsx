'use client';

import React, { useState } from 'react';
import {
  Shield, Users, Home, AlertTriangle, Download,
  FileText, CheckCircle, Clock, Phone, MapPin,
  Calendar, BarChart3, PieChart, Activity,
  Eye, Edit, UserCheck, Package, Heart, MessageSquare
} from 'lucide-react';

// ==================== TIPOS ====================

interface Usuario {
  id: string;
  tipo: 'mp' | 'policia' | 'defesa-civil' | 'admin';
  nome: string;
  email: string;
  cargo: string;
  organizacao: string;
}

interface Estatisticas {
  emergenciasAbertas: number;
  emergenciasEmAtendimento: number;
  emergenciasResolvidas: number;
  voluntariosAtivos: number;
  abrigosAtivos: number;
  pessoasAbrigadas: number;
  doacoesRecebidas: number;
  alertasAtivos: number;
}

interface Emergencia {
  id: string;
  protocolo: string;
  tipo: string;
  urgencia: 'critica' | 'alta' | 'media';
  status: 'pendente' | 'em-atendimento' | 'resolvido';
  solicitante: string;
  telefone: string;
  localizacao: string;
  descricao: string;
  data: Date;
  responsavel?: string;
}

interface Acao {
  id: string;
  tipo: 'aprovacao' | 'fiscalizacao' | 'mediacao' | 'resgate';
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'em-andamento' | 'concluida';
  responsavel?: string;
  prazo?: Date;
}

// ==================== DADOS MOCKADOS ====================

const usuarioMock: Usuario = {
  id: 'USR-001',
  tipo: 'defesa-civil',
  nome: 'Carlos Eduardo Silva',
  email: 'carlos.silva@defesacivil.rs.gov.br',
  cargo: 'Coordenador Regional',
  organizacao: 'Defesa Civil - Rio Grande do Sul'
};

const estatisticasMock: Estatisticas = {
  emergenciasAbertas: 47,
  emergenciasEmAtendimento: 23,
  emergenciasResolvidas: 156,
  voluntariosAtivos: 328,
  abrigosAtivos: 12,
  pessoasAbrigadas: 2847,
  doacoesRecebidas: 1245,
  alertasAtivos: 8
};

const emergenciasMock: Emergencia[] = [
  {
    id: 'EMG-001',
    protocolo: 'RN/2025/00247',
    tipo: 'Resgate',
    urgencia: 'critica',
    status: 'pendente',
    solicitante: 'João Silva',
    telefone: '(51) 99999-1111',
    localizacao: 'Rua dos Andradas, 1234 - Centro, Porto Alegre',
    descricao: 'Família ilhada em telhado. 5 pessoas, sendo 2 crianças',
    data: new Date('2025-01-20T08:30:00')
  },
  {
    id: 'EMG-002',
    protocolo: 'RN/2025/00248',
    tipo: 'Medicamentos',
    urgencia: 'alta',
    status: 'em-atendimento',
    solicitante: 'Maria Santos',
    telefone: '(51) 98888-2222',
    localizacao: 'Av. Guilherme Schell, 567 - Canoas',
    descricao: 'Diabético sem insulina. Urgente!',
    data: new Date('2025-01-20T09:15:00'),
    responsavel: 'Voluntário: Dr. Carlos (VOL-001)'
  },
  {
    id: 'EMG-003',
    protocolo: 'RN/2025/00249',
    tipo: 'Alimentos',
    urgencia: 'media',
    status: 'resolvido',
    solicitante: 'Pedro Oliveira',
    telefone: '(51) 97777-3333',
    localizacao: 'Rua Lima e Silva, 890 - Novo Hamburgo',
    descricao: 'Família com 8 pessoas sem alimentação',
    data: new Date('2025-01-19T10:00:00'),
    responsavel: 'Abrigo: Ginásio Tesourinha'
  }
];

const acoesPendentes: Acao[] = [
  {
    id: 'AC-001',
    tipo: 'aprovacao',
    titulo: 'Aprovação de novo abrigo emergencial',
    descricao: 'Escola Municipal solicita autorização para abrigar até 200 pessoas',
    prioridade: 'alta',
    status: 'pendente',
    prazo: new Date('2025-01-21T18:00:00')
  },
  {
    id: 'AC-002',
    tipo: 'fiscalizacao',
    titulo: 'Vistoria em área de risco',
    descricao: 'Verificar condições de segurança em área com risco de deslizamento',
    prioridade: 'alta',
    status: 'pendente'
  },
  {
    id: 'AC-003',
    tipo: 'mediacao',
    titulo: 'Mediação de conflito em abrigo',
    descricao: 'Resolver disputa sobre distribuição de recursos no Abrigo FIERGS',
    prioridade: 'media',
    status: 'em-andamento',
    responsavel: 'Maria Souza - Assistente Social'
  }
];

// ==================== COMPONENTE PRINCIPAL ====================

export default function DashboardAutoridades() {
  const [usuarioLogado] = useState<Usuario>(usuarioMock);
  const [secaoAtiva, setSecaoAtiva] = useState<'overview' | 'emergencias' | 'acoes' | 'relatorios' | 'dados'>('overview');
  const [filtroEmergencias, setFiltroEmergencias] = useState<'todas' | 'pendente' | 'em-atendimento' | 'resolvido'>('todas');

  const emergenciasFiltradas = emergenciasMock.filter(emg => 
    filtroEmergencias === 'todas' || emg.status === filtroEmergencias
  );

  const getBadgeOrgao = (tipo: Usuario['tipo']) => {
    const badges = {
      'mp': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Ministério Público' },
      'policia': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Polícia Civil' },
      'defesa-civil': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Defesa Civil' },
      'admin': { bg: 'bg-red-100', text: 'text-red-800', label: 'Administrador' }
    };
    return badges[tipo];
  };

  const getBadgeUrgencia = (urgencia: 'critica' | 'alta' | 'media') => {
    const badges = {
      'critica': { bg: 'bg-red-100', text: 'text-red-800', label: 'CRÍTICA' },
      'alta': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Alta' },
      'media': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Média' }
    };
    return badges[urgencia];
  };

  const getBadgeStatus = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: React.ElementType }> = {
      'pendente': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendente', icon: Clock },
      'em-atendimento': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Em Atendimento', icon: Activity },
      'resolvido': { bg: 'bg-green-100', text: 'text-green-800', label: 'Resolvido', icon: CheckCircle },
      'em-andamento': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Em Andamento', icon: Activity },
      'concluida': { bg: 'bg-green-100', text: 'text-green-800', label: 'Concluída', icon: CheckCircle }
    };
    const badge = badges[status] || badges.pendente;
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <IconComponent className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const orgao = getBadgeOrgao(usuarioLogado.tipo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-10 h-10" />
                <h1 className="text-3xl font-bold">Portal de Autoridades</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-lg ${orgao.bg} ${orgao.text} font-semibold`}>
                  {orgao.label}
                </span>
                <span className="text-blue-100">
                  {usuarioLogado.nome} • {usuarioLogado.cargo}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold">
              <Download className="w-5 h-5" />
              Exportar Relatório
            </button>
          </div>

          {/* Menu de Navegação */}
          <div className="mt-6 flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'emergencias', label: 'Emergências', icon: AlertTriangle },
              { id: 'acoes', label: 'Ações Pendentes', icon: FileText },
              { id: 'relatorios', label: 'Relatórios', icon: PieChart },
              { id: 'dados', label: 'Base de Dados', icon: Activity }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSecaoAtiva(id as typeof secaoAtiva)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition whitespace-nowrap ${
                  secaoAtiva === id
                    ? 'bg-white text-blue-900 font-semibold shadow-lg'
                    : 'bg-blue-800 text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEÇÃO: VISÃO GERAL */}
        {secaoAtiva === 'overview' && (
          <div className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                  <span className="text-sm text-gray-500">Urgente</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{estatisticasMock.emergenciasAbertas}</p>
                <p className="text-sm text-gray-600 mt-1">Emergências Abertas</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-blue-500" />
                  <span className="text-sm text-gray-500">Em curso</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{estatisticasMock.emergenciasEmAtendimento}</p>
                <p className="text-sm text-gray-600 mt-1">Em Atendimento</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <span className="text-sm text-gray-500">Resolvido</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{estatisticasMock.emergenciasResolvidas}</p>
                <p className="text-sm text-gray-600 mt-1">Emergências Resolvidas</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-purple-500" />
                  <span className="text-sm text-gray-500">Ativos</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{estatisticasMock.voluntariosAtivos}</p>
                <p className="text-sm text-gray-600 mt-1">Voluntários Ativos</p>
              </div>
            </div>

            {/* Mais Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold text-gray-900">Abrigos</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{estatisticasMock.abrigosAtivos}</p>
                <p className="text-sm text-gray-500">ativos</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-gray-900">Abrigados</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{estatisticasMock.pessoasAbrigadas}</p>
                <p className="text-sm text-gray-500">pessoas</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-gray-900">Doações</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{estatisticasMock.doacoesRecebidas}</p>
                <p className="text-sm text-gray-500">registradas</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Alertas</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{estatisticasMock.alertasAtivos}</p>
                <p className="text-sm text-gray-500">ativos</p>
              </div>
            </div>

            {/* Ações Recentes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Ações Recentes
              </h2>
              <div className="space-y-3">
                {acoesPendentes.slice(0, 3).map(acao => (
                  <div key={acao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{acao.titulo}</h3>
                      <p className="text-sm text-gray-600 mt-1">{acao.descricao}</p>
                    </div>
                    <div className="ml-4">
                      {getBadgeStatus(acao.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO: EMERGÊNCIAS */}
        {secaoAtiva === 'emergencias' && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltroEmergencias('todas')}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtroEmergencias === 'todas'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas ({emergenciasMock.length})
                </button>
                <button
                  onClick={() => setFiltroEmergencias('pendente')}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtroEmergencias === 'pendente'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pendentes ({emergenciasMock.filter(e => e.status === 'pendente').length})
                </button>
                <button
                  onClick={() => setFiltroEmergencias('em-atendimento')}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtroEmergencias === 'em-atendimento'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Em Atendimento ({emergenciasMock.filter(e => e.status === 'em-atendimento').length})
                </button>
                <button
                  onClick={() => setFiltroEmergencias('resolvido')}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtroEmergencias === 'resolvido'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Resolvidas ({emergenciasMock.filter(e => e.status === 'resolvido').length})
                </button>
              </div>
            </div>

            {/* Lista de Emergências */}
            <div className="space-y-4">
              {emergenciasFiltradas.map(emg => {
                const urgencia = getBadgeUrgencia(emg.urgencia);
                
                return (
                  <div key={emg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{emg.protocolo}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${urgencia.bg} ${urgencia.text}`}>
                              {urgencia.label}
                            </span>
                            {getBadgeStatus(emg.status)}
                          </div>
                          <p className="text-gray-600">Tipo: <span className="font-semibold">{emg.tipo}</span></p>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                            <Edit className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Solicitante</p>
                          <p className="font-semibold text-gray-900">{emg.solicitante}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contato</p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {emg.telefone}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Localização</p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {emg.localizacao}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Descrição</p>
                          <p className="text-gray-900">{emg.descricao}</p>
                        </div>
                        {emg.responsavel && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Responsável pelo Atendimento</p>
                            <p className="font-semibold text-green-700">{emg.responsavel}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(emg.data).toLocaleString('pt-BR')}
                        </span>

                        {emg.status === 'pendente' && (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                            Atribuir Equipe
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SEÇÃO: AÇÕES PENDENTES */}
        {secaoAtiva === 'acoes' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Ações Pendentes de Aprovação/Execução</h2>
              
              <div className="space-y-4">
                {acoesPendentes.map(acao => (
                  <div key={acao.id} className="border-l-4 border-blue-600 bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{acao.titulo}</h3>
                        <p className="text-gray-600 mt-1">{acao.descricao}</p>
                      </div>
                      {getBadgeStatus(acao.status)}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                      <span>Tipo: <span className="font-semibold">{acao.tipo}</span></span>
                      <span>Prioridade: <span className={`font-semibold ${
                        acao.prioridade === 'alta' ? 'text-red-600' : 
                        acao.prioridade === 'media' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>{acao.prioridade.toUpperCase()}</span></span>
                      {acao.responsavel && <span>Responsável: <span className="font-semibold">{acao.responsavel}</span></span>}
                      {acao.prazo && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Prazo: {new Date(acao.prazo).toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>

                    {acao.status === 'pendente' && (
                      <div className="mt-4 pt-4 border-t flex gap-3">
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                          Aprovar
                        </button>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                          Rejeitar
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                          Atribuir
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO: RELATÓRIOS */}
        {secaoAtiva === 'relatorios' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Geração de Relatórios</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento. Em breve você poderá gerar relatórios completos em PDF e Excel.</p>
          </div>
        )}

        {/* SEÇÃO: BASE DE DADOS */}
        {secaoAtiva === 'dados' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Acesso à Base de Dados Completa</h2>
            <p className="text-gray-600 mb-6">Acesso total a todos os registros do sistema:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition text-left">
                <AlertTriangle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900">Todas as Emergências</h3>
                <p className="text-sm text-gray-600 mt-1">226 registros</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition text-left">
                <Users className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900">Voluntários Cadastrados</h3>
                <p className="text-sm text-gray-600 mt-1">328 registros</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-lg transition text-left">
                <Home className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900">Abrigos e Abrigados</h3>
                <p className="text-sm text-gray-600 mt-1">12 abrigos, 2847 pessoas</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-lg transition text-left">
                <Package className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-bold text-gray-900">Doações Recebidas</h3>
                <p className="text-sm text-gray-600 mt-1">1245 registros</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:shadow-lg transition text-left">
                <Heart className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="font-bold text-gray-900">Pessoas Desaparecidas</h3>
                <p className="text-sm text-gray-600 mt-1">47 registros ativos</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg hover:shadow-lg transition text-left">
                <MessageSquare className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-900">Atendimentos WhatsApp</h3>
                <p className="text-sm text-gray-600 mt-1">892 conversas</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
