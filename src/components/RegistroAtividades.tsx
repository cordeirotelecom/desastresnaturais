'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, User as UserIcon, Filter, Download, 
  AlertTriangle, Heart, Users, Shield, Package, 
  MapPin, MessageSquare, FileText, Clock,
  CheckCircle, XCircle, AlertCircle, Info
} from 'lucide-react';
import { getCurrentUser, type User } from '@/services/auth';
import { useRouter } from 'next/navigation';

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: 'vitima' | 'voluntario' | 'autoridade';
  action: string;
  category: 'emergencia' | 'doacao' | 'voluntariado' | 'chat' | 'abrigo' | 'relatorio' | 'sistema';
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  metadata?: Record<string, unknown>;
}

export default function RegistroAtividades() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    loadActivities(currentUser);
  }, [router]);

  const loadActivities = (currentUser: User) => {
    // Dados mockados de atividades
    const mockActivities: ActivityLog[] = [
      {
        id: '1',
        userId: currentUser.id,
        userName: currentUser.nome,
        userRole: currentUser.role,
        action: 'Login no sistema',
        category: 'sistema',
        description: 'Acesso realizado com sucesso',
        timestamp: new Date(),
        status: 'success'
      },
      {
        id: '2',
        userId: currentUser.id,
        userName: currentUser.nome,
        userRole: currentUser.role,
        action: 'Emergência registrada',
        category: 'emergencia',
        description: 'Emergência #12345 - Enchente na Zona Norte de Porto Alegre',
        timestamp: new Date(Date.now() - 30 * 60000),
        status: 'warning',
        metadata: { emergencyId: '12345', location: 'Porto Alegre - Zona Norte' }
      },
      {
        id: '3',
        userId: 'maria',
        userName: 'Maria Santos',
        userRole: 'voluntario',
        action: 'Doação registrada',
        category: 'doacao',
        description: 'Doação de 50kg de alimentos não perecíveis',
        timestamp: new Date(Date.now() - 60 * 60000),
        status: 'success',
        metadata: { amount: '50kg', type: 'Alimentos' }
      },
      {
        id: '4',
        userId: 'carlos',
        userName: 'Dr. Carlos Oliveira',
        userRole: 'autoridade',
        action: 'Relatório gerado',
        category: 'relatorio',
        description: 'Relatório mensal de atendimentos - Março 2025',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        status: 'success'
      },
      {
        id: '5',
        userId: currentUser.id,
        userName: currentUser.nome,
        userRole: currentUser.role,
        action: 'Mensagem enviada',
        category: 'chat',
        description: 'Mensagem para Dr. Carlos Oliveira sobre situação de emergência',
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        status: 'info'
      },
      {
        id: '6',
        userId: 'joao',
        userName: 'João Silva',
        userRole: 'vitima',
        action: 'Abrigo consultado',
        category: 'abrigo',
        description: 'Consultou vagas no Ginásio Tesourinha',
        timestamp: new Date(Date.now() - 5 * 60 * 60000),
        status: 'info'
      },
      {
        id: '7',
        userId: 'maria',
        userName: 'Maria Santos',
        userRole: 'voluntario',
        action: 'Voluntário cadastrado',
        category: 'voluntariado',
        description: 'Cadastro aprovado - Especialidade: Assistência Médica',
        timestamp: new Date(Date.now() - 24 * 60 * 60000),
        status: 'success',
        metadata: { specialty: 'Assistência Médica' }
      },
      {
        id: '8',
        userId: 'sistema',
        userName: 'Sistema Automático',
        userRole: 'autoridade',
        action: 'Alerta emitido',
        category: 'emergencia',
        description: 'Alerta de tempestade para região metropolitana de Porto Alegre',
        timestamp: new Date(Date.now() - 48 * 60 * 60000),
        status: 'warning',
        metadata: { severity: 'alta', region: 'Porto Alegre' }
      },
      {
        id: '9',
        userId: currentUser.id,
        userName: currentUser.nome,
        userRole: currentUser.role,
        action: 'Perfil atualizado',
        category: 'sistema',
        description: 'Informações de contato atualizadas',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000),
        status: 'success'
      },
      {
        id: '10',
        userId: 'carlos',
        userName: 'Dr. Carlos Oliveira',
        userRole: 'autoridade',
        action: 'Emergência atendida',
        category: 'emergencia',
        description: 'Emergência #12340 - Resolvida com sucesso',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60000),
        status: 'success',
        metadata: { emergencyId: '12340', duration: '2h 30min' }
      }
    ];

    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  };

  useEffect(() => {
    let filtered = activities;

    // Filtro por categoria
    if (filterCategory !== 'all') {
      filtered = filtered.filter(a => a.category === filterCategory);
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }

    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por data
    const now = new Date();
    switch (dateRange) {
      case 'today':
        filtered = filtered.filter(a => {
          const diff = now.getTime() - a.timestamp.getTime();
          return diff < 24 * 60 * 60 * 1000;
        });
        break;
      case 'week':
        filtered = filtered.filter(a => {
          const diff = now.getTime() - a.timestamp.getTime();
          return diff < 7 * 24 * 60 * 60 * 1000;
        });
        break;
      case 'month':
        filtered = filtered.filter(a => {
          const diff = now.getTime() - a.timestamp.getTime();
          return diff < 30 * 24 * 60 * 60 * 1000;
        });
        break;
    }

    setFilteredActivities(filtered);
  }, [filterCategory, filterStatus, searchQuery, dateRange, activities]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergencia': return <AlertTriangle className="w-5 h-5" />;
      case 'doacao': return <Package className="w-5 h-5" />;
      case 'voluntariado': return <Heart className="w-5 h-5" />;
      case 'chat': return <MessageSquare className="w-5 h-5" />;
      case 'abrigo': return <MapPin className="w-5 h-5" />;
      case 'relatorio': return <FileText className="w-5 h-5" />;
      case 'sistema': return <Activity className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergencia': return 'bg-red-100 text-red-800';
      case 'doacao': return 'bg-green-100 text-green-800';
      case 'voluntariado': return 'bg-purple-100 text-purple-800';
      case 'chat': return 'bg-blue-100 text-blue-800';
      case 'abrigo': return 'bg-orange-100 text-orange-800';
      case 'relatorio': return 'bg-indigo-100 text-indigo-800';
      case 'sistema': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vitima': return 'bg-red-50 text-red-700';
      case 'voluntario': return 'bg-green-50 text-green-700';
      case 'autoridade': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'vitima': return <Heart className="w-3 h-3" />;
      case 'voluntario': return <Users className="w-3 h-3" />;
      case 'autoridade': return <Shield className="w-3 h-3" />;
      default: return <UserIcon className="w-3 h-3" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Há ${days} dia${days > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const csv = [
      ['Data/Hora', 'Usuário', 'Perfil', 'Ação', 'Categoria', 'Descrição', 'Status'],
      ...filteredActivities.map(a => [
        a.timestamp.toLocaleString('pt-BR'),
        a.userName,
        a.userRole,
        a.action,
        a.category,
        a.description,
        a.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atividades_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando atividades...</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: activities.length,
    today: activities.filter(a => new Date().getTime() - a.timestamp.getTime() < 24 * 60 * 60 * 1000).length,
    success: activities.filter(a => a.status === 'success').length,
    pending: activities.filter(a => a.status === 'warning').length
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Registro de Atividades</h1>
                <p className="text-gray-600">Histórico completo de ações no sistema</p>
              </div>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Atividades</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Concluídas</p>
                  <p className="text-2xl font-bold text-green-900">{stats.success}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Em Atenção</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="font-semibold text-gray-900">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  type="text"
                  placeholder="Buscar atividades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todas</option>
                  <option value="emergencia">Emergências</option>
                  <option value="doacao">Doações</option>
                  <option value="voluntariado">Voluntariado</option>
                  <option value="chat">Chat</option>
                  <option value="abrigo">Abrigos</option>
                  <option value="relatorio">Relatórios</option>
                  <option value="sistema">Sistema</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="success">Sucesso</option>
                  <option value="warning">Atenção</option>
                  <option value="error">Erro</option>
                  <option value="info">Informação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="today">Hoje</option>
                  <option value="week">Última Semana</option>
                  <option value="month">Último Mês</option>
                  <option value="all">Todos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">
              {filteredActivities.length} atividade{filteredActivities.length !== 1 ? 's' : ''} encontrada{filteredActivities.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="divide-y">
            {filteredActivities.map(activity => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-4">
                  {/* Ícone de Status */}
                  <div className="flex-shrink-0 pt-1">
                    {getStatusIcon(activity.status)}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{activity.action}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                          {getCategoryIcon(activity.category)}
                          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                    </div>

                    <p className="text-gray-700 mb-2">{activity.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{activity.userName}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(activity.userRole)}`}>
                          {getRoleIcon(activity.userRole)}
                          {activity.userRole === 'vitima' ? 'Vítima' : activity.userRole === 'voluntario' ? 'Voluntário' : 'Autoridade'}
                        </span>
                      </div>

                      {activity.metadata && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Info className="w-4 h-4" />
                          <span>
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <span key={key} className="mr-2">
                                <strong>{key}:</strong> {String(value)}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="p-12 text-center">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma atividade encontrada</h3>
                <p className="text-gray-600">Tente ajustar os filtros para ver mais resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
