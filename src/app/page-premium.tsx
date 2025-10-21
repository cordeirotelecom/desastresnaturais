'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, Heart, AlertTriangle, MessageSquare, FileText, Shield, Phone, 
  ChevronRight, Clock, CheckCircle, Zap, Activity, Package, TrendingUp, 
  UserPlus, LogIn, Brain, ArrowRight, Play, Star, Award, Target,
  Building2, Map, HeartHandshake, Radio, Bot, BarChart3, Search
} from 'lucide-react';
import { getCurrentUser, type User } from '@/services/auth';
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
  const [user, setUser] = useState<User | null>(null);
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {user ? (
            // USUÁRIO LOGADO
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Você está conectado</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Olá, {user.nome}!
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
            <div className="text-center">
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

      {/* STATS EM TEMPO REAL */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="card-premium p-6 text-center">
              <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-red-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.emergencias}</div>
              <div className="text-sm text-gray-600 mt-1">Emergências Ativas</div>
            </div>
            
            <div className="card-premium p-6 text-center">
              <Users className="w-10 h-10 mx-auto mb-3 text-green-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.abrigados.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Pessoas Abrigadas</div>
            </div>
            
            <div className="card-premium p-6 text-center">
              <Heart className="w-10 h-10 mx-auto mb-3 text-pink-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.voluntarios}</div>
              <div className="text-sm text-gray-600 mt-1">Voluntários Ativos</div>
            </div>
            
            <div className="card-premium p-6 text-center">
              <Package className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.doacoes.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Doações Recebidas</div>
            </div>
            
            <div className="card-premium p-6 text-center">
              <Building2 className="w-10 h-10 mx-auto mb-3 text-blue-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.vagasAbrigos.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Vagas Disponíveis</div>
            </div>
            
            <div className="card-premium p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-purple-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.capacidadeTotal.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Capacidade Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES PRINCIPAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plataforma Completa para Gestão de Emergências
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta com Inteligência Artificial para salvar vidas e coordenar respostas rápidas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link 
                key={index}
                href={feature.href}
                className="card-hover card-premium p-6 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  Acessar
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA EMERGÊNCIA */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">Em uma emergência?</h2>
          <p className="text-xl text-red-100 mb-8">
            Registre sua emergência em menos de 1 minuto e receba ajuda imediata
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/registro-emergencia" className="bg-white text-red-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-2xl hover:scale-105 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Registrar Emergência Agora
            </Link>
            <Link href="/abrigos" className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Encontrar Abrigo Mais Próximo
            </Link>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS / IMPACTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Impacto Real nas Comunidades
          </h2>
          <p className="text-xl text-gray-600">
            Números que salvam vidas todos os dias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">85%</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Precisão da IA</div>
            <p className="text-gray-600">
              Previsões com 12h de antecedência para evacuações preventivas
            </p>
          </div>

          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">&lt;1min</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Tempo de Resposta</div>
            <p className="text-gray-600">
              Sistema mais rápido de registro e triagem de emergências do RS
            </p>
          </div>

          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Transparência</div>
            <p className="text-gray-600">
              Rastreamento completo de doações e recursos em tempo real
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
