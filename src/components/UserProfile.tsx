'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Heart, 
  Edit, Save, X, Camera, AlertTriangle, CheckCircle,
  Activity, MessageSquare, Package, Users, TrendingUp
} from 'lucide-react';
import { getCurrentUser, type User as UserType } from '../services/auth';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<UserType>>({});
  const [activeTab, setActiveTab] = useState<'perfil' | 'atividades' | 'estatisticas'>('perfil');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setEditedUser(currentUser);
  }, [router]);

  const handleSave = () => {
    // Aqui você salvaria no backend
    if (user && editedUser) {
      const updatedUser = { ...user, ...editedUser };
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      setUser(updatedUser as UserType);
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    }
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'vitima':
        return { icon: User, color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'Vítima' };
      case 'voluntario':
        return { icon: Heart, color: 'bg-green-100 text-green-700 border-green-300', label: 'Voluntário' };
      case 'autoridade':
        return { icon: Shield, color: 'bg-red-100 text-red-700 border-red-300', label: 'Autoridade' };
      default:
        return { icon: User, color: 'bg-gray-100 text-gray-700 border-gray-300', label: 'Usuário' };
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const badge = getRoleBadge(user.role);
  const BadgeIcon = badge.icon;

  // Estatísticas mockadas (em produção, viriam do backend)
  const stats = {
    emergenciasReportadas: user.role === 'vitima' ? 2 : 0,
    atendimentosRealizados: user.role === 'voluntario' ? 15 : user.role === 'autoridade' ? 42 : 0,
    doacoesFeitas: user.role === 'vitima' ? 0 : 8,
    mensagensEnviadas: 127,
    horasVoluntariado: user.role === 'voluntario' ? 48 : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header com Avatar */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                  {user.nome.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.nome}</h1>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${badge.color} mb-3`}>
                  <BadgeIcon className="w-5 h-5" />
                  {badge.label}
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  {user.telefone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {user.telefone}
                    </div>
                  )}
                  {user.endereco && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {user.endereco.cidade}, {user.endereco.estado}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
                  >
                    <Edit className="w-5 h-5" />
                    Editar Perfil
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Salvar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'perfil'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dados do Perfil
            </button>
            <button
              onClick={() => setActiveTab('atividades')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'atividades'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Atividades Recentes
            </button>
            <button
              onClick={() => setActiveTab('estatisticas')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'estatisticas'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Estatísticas
            </button>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'perfil' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações Pessoais</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.nome || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.nome}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">E-mail não pode ser alterado</p>
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedUser.telefone || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, telefone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.telefone || 'Não informado'}</p>
                )}
              </div>

              {/* CPF */}
              {user.cpf && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                  <p className="text-gray-900 font-medium">{user.cpf}</p>
                </div>
              )}
            </div>

            {/* Endereço */}
            {user.endereco && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Endereço</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rua</label>
                    <p className="text-gray-900">{user.endereco.rua}, {user.endereco.numero}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bairro</label>
                    <p className="text-gray-900">{user.endereco.bairro}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
                    <p className="text-gray-900">{user.endereco.cidade}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                    <p className="text-gray-900">{user.endereco.estado}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CEP</label>
                    <p className="text-gray-900">{user.endereco.cep}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Campos específicos por tipo */}
            {user.role === 'voluntario' && user.especialidades && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informações de Voluntário</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidades</label>
                    <div className="flex flex-wrap gap-2">
                      {user.especialidades.map((esp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {esp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Veículo Próprio</label>
                    <p className="text-gray-900">{user.veiculoProprio ? 'Sim' : 'Não'}</p>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'autoridade' && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informações de Autoridade</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Órgão</label>
                    <p className="text-gray-900 font-medium">{user.orgao}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Matrícula</label>
                    <p className="text-gray-900 font-medium">{user.matricula}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo</label>
                    <p className="text-gray-900 font-medium">{user.cargo}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'atividades' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Atividades Recentes</h2>
            <div className="space-y-4">
              {/* Atividades mockadas */}
              <div className="flex items-start gap-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Cadastro no Sistema</h3>
                  <p className="text-sm text-gray-600">Você criou sua conta no sistema</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(user.criadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {stats.mensagensEnviadas > 0 && (
                <div className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Participação no Chat</h3>
                    <p className="text-sm text-gray-600">{stats.mensagensEnviadas} mensagens enviadas</p>
                    <p className="text-xs text-gray-500 mt-1">Última mensagem: hoje</p>
                  </div>
                </div>
              )}

              {user.role === 'vitima' && stats.emergenciasReportadas > 0 && (
                <div className="flex items-start gap-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Emergências Reportadas</h3>
                    <p className="text-sm text-gray-600">{stats.emergenciasReportadas} ocorrências registradas</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'estatisticas' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card de Estatísticas */}
            {stats.emergenciasReportadas > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Emergências</h3>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stats.emergenciasReportadas}</div>
                <p className="text-gray-600 text-sm">Ocorrências reportadas</p>
              </div>
            )}

            {stats.atendimentosRealizados > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Atendimentos</h3>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stats.atendimentosRealizados}</div>
                <p className="text-gray-600 text-sm">
                  {user.role === 'voluntario' ? 'Pessoas ajudadas' : 'Ocorrências resolvidas'}
                </p>
              </div>
            )}

            {stats.doacoesFeitas > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Doações</h3>
                  <Package className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stats.doacoesFeitas}</div>
                <p className="text-gray-600 text-sm">Itens doados</p>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Mensagens</h3>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.mensagensEnviadas}</div>
              <p className="text-gray-600 text-sm">Mensagens no chat</p>
            </div>

            {stats.horasVoluntariado > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Voluntariado</h3>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stats.horasVoluntariado}h</div>
                <p className="text-gray-600 text-sm">Horas de trabalho voluntário</p>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Atividade</h3>
                <Activity className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {Math.floor((new Date().getTime() - new Date(user.criadoEm).getTime()) / (1000 * 60 * 60 * 24))} dias
              </div>
              <p className="text-gray-600 text-sm">Membro desde {new Date(user.criadoEm).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
