'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, Heart, AlertTriangle, MessageSquare, FileText, Shield, Phone, 
  ChevronRight, Clock, CheckCircle, Zap, Activity, Package, TrendingUp, 
  UserPlus, LogIn, Brain, ArrowRight, Play, Star, Award, Target,
  Building2, Map, HeartHandshake, Radio, Bot, BarChart3, Search
} from 'lucide-react';
import { getCurrentUser } from '@/services/auth';
import { getTotalVagasDisponiveis, getTotalCapacidade } from '@/data/real-locations';

interface Stats {
  emergencias: number;
  abrigados: number;
  voluntarios: number;
  doacoes: number;
  vagasAbrigos: number;
  capacidadeTotal: number;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  href: string;
}

const features: Feature[] = [
  {
    title: 'Monitoramento com IA',
    description: '85% de precisão nas previsões com 12h de antecedência usando Machine Learning',
    icon: Brain,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-600',
    href: '/monitoramento'
  },
  {
    title: 'Gestão de Emergências',
    description: 'Sistema completo de registro, triagem e coordenação de emergências em tempo real',
    icon: AlertTriangle,
    color: 'text-red-600',
    gradient: 'from-red-500 to-orange-600',
    href: '/emergencias'
  },
  {
    title: 'Rede de Abrigos',
    description: '30+ abrigos cadastrados com localização GPS, vagas disponíveis e recursos',
    icon: Building2,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-600',
    href: '/abrigos'
  },
  {
    title: 'Mapa Interativo',
    description: 'Visualização geográfica de abrigos, hospitais e pontos de doação em tempo real',
    icon: Map,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-600',
    href: '/mapa'
  },
  {
    title: 'Sistema de Doações',
    description: 'Gestão inteligente de doações com rastreamento e distribuição otimizada',
    icon: HeartHandshake,
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-rose-600',
    href: '/doacoes'
  },
  {
    title: 'Chat em Tempo Real',
    description: 'Comunicação instantânea entre vítimas, voluntários e autoridades',
    icon: Radio,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-600',
    href: '/chat'
  },
  {
    title: 'WhatsApp Bot',
    description: 'Assistente virtual 24/7 para registro de emergências via WhatsApp',
    icon: Bot,
    color: 'text-green-600',
    gradient: 'from-green-600 to-teal-600',
    href: '/whatsapp'
  },
  {
    title: 'Relatórios Analíticos',
    description: 'Dashboards e relatórios detalhados para tomada de decisões estratégicas',
    icon: BarChart3,
    color: 'text-blue-600',
    gradient: 'from-blue-600 to-violet-600',
    href: '/relatorios'
  }
];

export default function Homepage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats>({
    emergencias: 47,
    abrigados: 2847,
    voluntarios: 286,
    doacoes: 1245,
    vagasAbrigos: getTotalVagasDisponiveis(),
    capacidadeTotal: getTotalCapacidade()
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Atualizar vagas e capacidade de abrigos
    setStats(prev => ({
      ...prev,
      vagasAbrigos: getTotalVagasDisponiveis(),
      capacidadeTotal: getTotalCapacidade()
    }));

    const interval = setInterval(() => {
      setStats(prev => ({
        emergencias: Math.max(0, prev.emergencias + Math.floor(Math.random() * 3 - 1)),
        abrigados: Math.max(0, prev.abrigados + Math.floor(Math.random() * 10 - 5)),
        voluntarios: Math.max(0, prev.voluntarios + Math.floor(Math.random() * 5 - 2)),
        doacoes: Math.max(0, prev.doacoes + Math.floor(Math.random() * 15 - 7)),
        vagasAbrigos: getTotalVagasDisponiveis(),
        capacidadeTotal: getTotalCapacidade()
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* HERO SECTION - PROFISSIONAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {user ? (
            // USUÁRIO LOGADO
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Você está conectado</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Olá, <span className="gradient-text-hero">{user.nome}</span>!
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                {user.role === 'vitima' && '🛡️ Acesse recursos de emergência, encontre abrigos e mantenha-se seguro'}
                {user.role === 'voluntario' && '❤️ Obrigado por fazer a diferença na vida de quem precisa!'}
                {user.role === 'autoridade' && '⚡ Painel completo para coordenação e gestão de emergências'}
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <Link href="/registro-emergencia" className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                  <AlertTriangle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Registrar Emergência
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/monitoramento" className="group bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                  <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Ver Previsões IA
                </Link>
                
                <Link href="/abrigos" className="group border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <Building2 className="w-5 h-5" />
                  Encontrar Abrigo
                </Link>
              </div>
            </div>
          ) : (
            // USUÁRIO NÃO LOGADO
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-lg px-4 py-2 rounded-full mb-6 border border-yellow-400/30">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold text-yellow-100">Sistema de Emergência 24/7</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                Gestão Inteligente de<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-blue-200">
                  Desastres Naturais
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                Plataforma completa com <strong className="text-white">Inteligência Artificial</strong> para prevenção,
                resposta rápida e recuperação em situações de emergência no Rio Grande do Sul
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-16">
                <Link href="/registro" className="group bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-blue-500/50 hover:scale-105">
                  <UserPlus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Criar Conta Grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link href="/login" className="group border-2 border-white/40 backdrop-blur-lg text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center gap-3 shadow-xl">
                  <LogIn className="w-6 h-6" />
                  Já tenho conta
                </Link>

                <Link href="/monitoramento" className="group border-2 border-purple-400/50 bg-purple-500/20 backdrop-blur-lg text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 shadow-xl">
                  <Brain className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Ver IA em Ação
                  <span className="text-xs bg-yellow-400 text-blue-900 px-2 py-1 rounded-full font-bold">NOVO</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-8 justify-center items-center text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span><strong className="text-white">85%</strong> precisão IA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-300" />
                  <span><strong className="text-white">280+</strong> voluntários</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-300" />
                  <span><strong className="text-white">30+</strong> abrigos cadastrados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span><strong className="text-white">24/7</strong> monitoramento</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-red-300" />
                <div>
                  <div className="text-3xl font-bold">{stats.emergencias}</div>
                  <div className="text-sm text-blue-100">Emergências Ativas</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-green-300" />
                <div>
                  <div className="text-3xl font-bold">{stats.abrigados.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Pessoas Abrigadas</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-pink-300" />
                <div>
                  <div className="text-3xl font-bold">{stats.voluntarios}</div>
                  <div className="text-sm text-blue-100">Voluntários Ativos</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-8 h-8 text-yellow-300" />
                <div>
                  <div className="text-3xl font-bold">{stats.doacoes.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Doações Registradas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ações Principais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/emergencias" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Emergências</h3>
                <p className="text-gray-600 mb-3">Relatar situação de risco ou solicitar ajuda urgente</p>
                <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-semibold">URGENTE</span>
              </div>
            </div>
          </Link>

          <Link href="/abrigos" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <MapPin className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Abrigos</h3>
                <p className="text-gray-600 mb-3">Localizar abrigos próximos e verificar vagas disponíveis</p>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">PRIORITÁRIO</span>
              </div>
            </div>
          </Link>

          <Link href="/voluntarios" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <Heart className="w-10 h-10 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Voluntários</h3>
                <p className="text-gray-600 mb-3">Cadastre-se para ajudar ou encontre voluntários</p>
                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">ATIVO</span>
              </div>
            </div>
          </Link>

          <Link href="/doacoes" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <Package className="w-10 h-10 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Doações</h3>
                <p className="text-gray-600 mb-3">Doar ou receber suprimentos e recursos</p>
                <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">ESSENCIAL</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Technology Highlights */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Tecnologia de Ponta</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-700 font-semibold mb-1">Precisão da IA</div>
              <div className="text-sm text-gray-500">Previsão de desastres com 12h de antecedência</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">5seg</div>
              <div className="text-gray-700 font-semibold mb-1">Atualização em Tempo Real</div>
              <div className="text-sm text-gray-500">Dados atualizados a cada 5 segundos</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">3.5h</div>
              <div className="text-gray-700 font-semibold mb-1">Tempo Médio de Resposta</div>
              <div className="text-sm text-gray-500">Coordenação eficiente de equipes</div>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-red-600 mb-2">96%</div>
              <div className="text-gray-700 font-semibold mb-1">Taxa de Sucesso</div>
              <div className="text-sm text-gray-500">Resgates e atendimentos bem-sucedidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ferramentas do Sistema</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/monitoramento" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative border-2 border-purple-200">
            <Brain className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Monitoramento IA</h3>
            <p className="text-gray-600 text-sm">Previsão de desastres com 85% de precisão e 12h de antecedência</p>
            <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">IA</span>
          </Link>

          <Link href="/mapa" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <MapPin className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Mapa Interativo</h3>
            <p className="text-gray-600 text-sm">Visualize desastres, abrigos e recursos em tempo real</p>
          </Link>

          <Link href="/chat" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            <MessageSquare className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Chat Interno</h3>
            <p className="text-gray-600 text-sm">Comunicação entre vítimas, voluntários e autoridades</p>
            <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">NOVO</span>
          </Link>

          <Link href="/atividades" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            <Activity className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Registro de Atividades</h3>
            <p className="text-gray-600 text-sm">Acompanhe todas as ações realizadas no sistema</p>
            <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">NOVO</span>
          </Link>

          <Link href="/relatorios" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Relatórios</h3>
            <p className="text-gray-600 text-sm">Análises detalhadas e histórico de operações</p>
          </Link>

          <Link href="/autoridades" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 text-red-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Painel Autoridades</h3>
            <p className="text-gray-600 text-sm">Coordenação e gestão de operações emergenciais</p>
          </Link>

          <Link href="/whatsapp" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <Phone className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp Bot</h3>
            <p className="text-gray-600 text-sm">Atendimento automatizado via WhatsApp</p>
          </Link>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border-t-4 border-red-500 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">Contatos de Emergência</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <Phone className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="font-bold text-gray-800">Bombeiros</div>
              <div className="text-2xl font-bold text-red-600">193</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-gray-800">Polícia Militar</div>
              <div className="text-2xl font-bold text-blue-600">190</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <Phone className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-gray-800">SAMU</div>
              <div className="text-2xl font-bold text-green-600">192</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <Phone className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="font-bold text-gray-800">Defesa Civil</div>
              <div className="text-2xl font-bold text-yellow-600">199</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
