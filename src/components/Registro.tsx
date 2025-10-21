'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, FileText, AlertCircle,
  Loader2, CheckCircle, ArrowRight, Home, Heart, Users as UsersIcon,
  Shield, Check, Building, CreditCard, Briefcase
} from 'lucide-react';
import { register, saveAuthData, RegisterData, UserRole } from '@/services/auth';

const especialidadesDisponiveis = [
  'medico',
  'enfermeiro',
  'primeiros-socorros',
  'resgate',
  'transporte',
  'doacao-sangue',
  'psicologo',
  'assistente-social',
  'cozinha',
  'logistica',
  'comunicacao',
  'geral'
];

const orgaos = [
  { value: 'DefesaCivil', label: 'Defesa Civil' },
  { value: 'Bombeiros', label: 'Corpo de Bombeiros' },
  { value: 'Policia', label: 'Polícia Militar/Civil' },
  { value: 'MP', label: 'Ministério Público' },
  { value: 'Saude', label: 'Secretaria de Saúde' },
  { value: 'Outro', label: 'Outro' }
];

export default function Registro() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1); // 1: Escolher perfil, 2: Dados básicos, 3: Dados específicos
  const [formData, setFormData] = useState<RegisterData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpf: '',
    role: 'vitima',
    especialidades: [],
    veiculoProprio: false,
    orgao: '',
    matricula: '',
    cargo: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await register(formData);

      if (response.success && response.user && response.token) {
        setSuccess(true);
        saveAuthData(response.user, response.token);
        
        setTimeout(() => {
          switch (response.user!.role) {
            case 'autoridade':
              router.push('/autoridades');
              break;
            case 'voluntario':
              router.push('/voluntarios');
              break;
            case 'vitima':
              router.push('/');
              break;
            default:
              router.push('/');
          }
        }, 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleEspecialidade = (esp: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades?.includes(esp)
        ? prev.especialidades.filter(e => e !== esp)
        : [...(prev.especialidades || []), esp]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Criar Nova Conta</h1>
          <p className="text-gray-600">Junte-se ao sistema de gestão de desastres</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  etapa >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {etapa > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${etapa > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-gray-600">
            <span>Perfil</span>
            <span>Dados Básicos</span>
            <span>Finalizar</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Mensagens */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Erro ao criar conta</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Conta criada com sucesso!</p>
                <p className="text-green-600 text-sm mt-1">Redirecionando...</p>
              </div>
            </div>
          )}

          {/* ETAPA 1: Escolher Perfil */}
          {etapa === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Escolha seu tipo de perfil
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vítima */}
                <button
                  onClick={() => setFormData({ ...formData, role: 'vitima' })}
                  className={`p-6 rounded-xl border-2 transition ${
                    formData.role === 'vitima'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    formData.role === 'vitima' ? 'bg-red-500' : 'bg-gray-200'
                  }`}>
                    <Heart className={`w-8 h-8 ${formData.role === 'vitima' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Vítima</h3>
                  <p className="text-sm text-gray-600">
                    Preciso de ajuda em situação de emergência
                  </p>
                </button>

                {/* Voluntário */}
                <button
                  onClick={() => setFormData({ ...formData, role: 'voluntario' })}
                  className={`p-6 rounded-xl border-2 transition ${
                    formData.role === 'voluntario'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    formData.role === 'voluntario' ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <UsersIcon className={`w-8 h-8 ${formData.role === 'voluntario' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Voluntário</h3>
                  <p className="text-sm text-gray-600">
                    Quero ajudar pessoas em situação de risco
                  </p>
                </button>

                {/* Autoridade */}
                <button
                  onClick={() => setFormData({ ...formData, role: 'autoridade' })}
                  className={`p-6 rounded-xl border-2 transition ${
                    formData.role === 'autoridade'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    formData.role === 'autoridade' ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                    <Shield className={`w-8 h-8 ${formData.role === 'autoridade' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Autoridade</h3>
                  <p className="text-sm text-gray-600">
                    Sou servidor público ou agente autorizado
                  </p>
                </button>
              </div>

              <button
                onClick={() => setEtapa(2)}
                className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* ETAPA 2: Dados Básicos */}
          {etapa === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setEtapa(3); }} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Dados Pessoais
              </h2>

              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="João Silva"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Telefone e CPF */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="(51) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-3.5"
                  >
                    {mostrarSenha ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={mostrarConfirmarSenha ? 'text' : 'password'}
                    value={formData.confirmarSenha}
                    onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite a senha novamente"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    className="absolute right-3 top-3.5"
                  >
                    {mostrarConfirmarSenha ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setEtapa(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* ETAPA 3: Dados Específicos */}
          {etapa === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {formData.role === 'voluntario' && 'Dados do Voluntário'}
                {formData.role === 'autoridade' && 'Dados da Autoridade'}
                {formData.role === 'vitima' && 'Finalizar Cadastro'}
              </h2>

              {/* Campos para Voluntário */}
              {formData.role === 'voluntario' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Especialidades * (selecione pelo menos uma)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {especialidadesDisponiveis.map(esp => (
                        <button
                          key={esp}
                          type="button"
                          onClick={() => toggleEspecialidade(esp)}
                          className={`px-4 py-2 rounded-lg border-2 transition text-sm ${
                            formData.especialidades?.includes(esp)
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {formData.especialidades?.includes(esp) && <Check className="w-4 h-4 inline mr-1" />}
                          {esp.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      id="veiculo"
                      type="checkbox"
                      checked={formData.veiculoProprio}
                      onChange={(e) => setFormData({ ...formData, veiculoProprio: e.target.checked })}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="veiculo" className="text-sm font-medium text-gray-700">
                      Possuo veículo próprio para deslocamentos
                    </label>
                  </div>
                </>
              )}

              {/* Campos para Autoridade */}
              {formData.role === 'autoridade' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Órgão *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        value={formData.orgao}
                        onChange={(e) => setFormData({ ...formData, orgao: e.target.value })}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Selecione...</option>
                        {orgaos.map(org => (
                          <option key={org.value} value={org.value}>{org.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matrícula *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.matricula}
                        onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Número de matrícula funcional"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.cargo}
                        onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: Coordenador, Agente, etc."
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Termos de uso */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="termos"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="termos" className="text-sm text-gray-700">
                    Concordo com os <Link href="/termos" className="text-blue-600 hover:underline">Termos de Uso</Link> e{' '}
                    <Link href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</Link>
                  </label>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setEtapa(2)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading || success}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-bold disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Criando conta...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Conta criada!
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Criar Conta
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Link para login */}
          {etapa !== 3 && (
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Fazer login
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Voltar para home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <Home className="w-4 h-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
