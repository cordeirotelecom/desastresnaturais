'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, AlertTriangle, Users, MapPin, Shield, FileText,
  Heart, Phone, Menu, X, MessageSquare, Building2, User,
  LogOut, Settings, UserCircle, LogIn, Brain,
  Newspaper, Globe, BookOpen
} from 'lucide-react';
import { getCurrentUser, logout, type User as UserType } from '@/services/auth';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  category: string;
}

// ===== NAVEGAÇÃO ORGANIZADA POR CATEGORIAS =====
const mainMenuItems: MenuItem[] = [
  { href: '/', label: 'Início', icon: Home, description: 'Página inicial', color: 'text-blue-600', category: 'main' },
  { href: '/monitoramento', label: 'Monitoramento IA', icon: Brain, description: 'Previsão 12h - 85% precisão', color: 'text-purple-600', category: 'main' },
  { href: '/registro-emergencia', label: 'Emergência', icon: AlertTriangle, description: 'Registrar ocorrência rápida', color: 'text-red-600', category: 'main' },
  { href: '/mapa', label: 'Mapa', icon: MapPin, description: 'Visualização geográfica', color: 'text-green-600', category: 'main' }
];

const emergencyItems: MenuItem[] = [
  { href: '/registro-emergencia', label: 'Registrar Emergência', icon: AlertTriangle, description: 'Cadastro rápido < 1min', color: 'text-red-600', category: 'emergency' },
  { href: '/emergencias', label: 'Gestão de Emergências', icon: Phone, description: 'Gerenciar ocorrências', color: 'text-orange-600', category: 'emergency' },
  { href: '/abrigos', label: 'Rede de Abrigos', icon: Building2, description: '30+ abrigos cadastrados', color: 'text-blue-600', category: 'emergency' }
];

const resourcesItems: MenuItem[] = [
  { href: '/voluntarios', label: 'Voluntários', icon: Users, description: 'Cadastro e gestão', color: 'text-green-600', category: 'resources' },
  { href: '/doacoes', label: 'Doações', icon: Heart, description: 'Registrar e rastrear', color: 'text-pink-600', category: 'resources' },
  { href: '/recursos-oficiais', label: 'Documentos & Cursos', icon: BookOpen, description: 'Recursos educacionais', color: 'text-indigo-600', category: 'resources' }
];

const infoItems: MenuItem[] = [
  { href: '/noticias', label: 'Notícias', icon: Newspaper, description: 'Atualizações em tempo real', color: 'text-blue-600', category: 'info' },
  { href: '/casos-sucesso', label: 'Casos de Sucesso', icon: Globe, description: 'Boas práticas mundiais', color: 'text-teal-600', category: 'info' },
  { href: '/relatorios', label: 'Relatórios', icon: FileText, description: 'Análises e dashboards', color: 'text-gray-600', category: 'info' }
];

const toolsItems: MenuItem[] = [
  { href: '/chat', label: 'Chat em Tempo Real', icon: MessageSquare, description: 'Comunicação interna', color: 'text-blue-600', category: 'tools' },
  { href: '/whatsapp', label: 'WhatsApp Bot', icon: MessageSquare, description: 'Assistente 24/7', color: 'text-green-600', category: 'tools' },
  { href: '/autoridades', label: 'Portal Autoridades', icon: Shield, description: 'Defesa Civil, MP, PRF', color: 'text-indigo-600', category: 'tools' }
];

// Menu unificado para facilitar busca
const allMenuItems = [...mainMenuItems, ...emergencyItems, ...resourcesItems, ...infoItems, ...toolsItems];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="bg-white rounded-lg p-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg">Sistema de Desastres</h1>
                <p className="text-xs text-blue-200">Rio Grande do Sul</p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Menu Principal - Sempre Visível */}
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      active 
                        ? 'bg-white text-blue-900 font-semibold shadow-lg' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Dropdown Menu Organizado por Categorias */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-all">
                  <Menu className="w-4 h-4" />
                  <span className="text-sm font-medium">Menu Completo</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-blue-100">
                  <div className="p-4 max-h-[80vh] overflow-y-auto">
                    
                    {/* EMERGÊNCIAS */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Emergências
                      </h3>
                      <div className="space-y-1">
                        {emergencyItems.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link 
                              key={item.href} 
                              href={item.href} 
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                active ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${item.color}`} />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* RECURSOS */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        Recursos Humanos
                      </h3>
                      <div className="space-y-1">
                        {resourcesItems.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link 
                              key={item.href} 
                              href={item.href} 
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                active ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${item.color}`} />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-blue-500" />
                        Informações
                      </h3>
                      <div className="space-y-1">
                        {infoItems.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link 
                              key={item.href} 
                              href={item.href} 
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                active ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${item.color}`} />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* FERRAMENTAS */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-indigo-500" />
                        Ferramentas
                      </h3>
                      <div className="space-y-1">
                        {toolsItems.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link 
                              key={item.href} 
                              href={item.href} 
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                active ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${item.color}`} />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {user ? (
                <div className="relative ml-4">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition">
                    <UserCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{user.nome.split(' ')[0]}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-900">{user.nome}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${user.role === 'vitima' ? 'bg-red-100 text-red-800' : user.role === 'voluntario' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {user.role === 'vitima' ? 'Vítima' : user.role === 'voluntario' ? 'Voluntário' : 'Autoridade'}
                        </span>
                      </div>
                      <Link href="/perfil" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-900">Meu Perfil</span>
                      </Link>
                      <Link href="/configuracoes" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-900">Configurações</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left rounded-b-lg">
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600 font-medium">Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-4">
                  <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-blue-800 transition">
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">Entrar</span>
                  </Link>
                  <Link href="/registro" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition font-semibold">
                    <UserCircle className="w-4 h-4" />
                    <span className="text-sm">Cadastrar</span>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-blue-800 transition" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-blue-900 border-t border-blue-800 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4">
              
              {/* Menu Principal Mobile */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Menu Principal</h3>
                <div className="space-y-1">
                  {mainMenuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          active ? 'bg-white text-blue-900 font-semibold shadow-lg' : 'text-blue-100 hover:bg-blue-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs opacity-75">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Emergências Mobile */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Emergências
                </h3>
                <div className="space-y-1">
                  {emergencyItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          active ? 'bg-white text-blue-900 font-semibold' : 'text-blue-100 hover:bg-blue-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs opacity-75">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recursos Mobile */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-green-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Recursos
                </h3>
                <div className="space-y-1">
                  {resourcesItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          active ? 'bg-white text-blue-900 font-semibold' : 'text-blue-100 hover:bg-blue-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs opacity-75">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Informações Mobile */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  Informações
                </h3>
                <div className="space-y-1">
                  {infoItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          active ? 'bg-white text-blue-900 font-semibold' : 'text-blue-100 hover:bg-blue-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs opacity-75">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Ferramentas Mobile */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Ferramentas
                </h3>
                <div className="space-y-1">
                  {toolsItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          active ? 'bg-white text-blue-900 font-semibold' : 'text-blue-100 hover:bg-blue-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs opacity-75">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* User Menu Mobile */}
              <div className="pt-6 mt-6 border-t border-blue-800">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-3 bg-blue-800 rounded-lg border-2 border-blue-700">
                      <p className="font-semibold text-white">{user.nome}</p>
                      <p className="text-xs text-blue-200">{user.email}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'vitima' ? 'bg-red-100 text-red-800' : 
                        user.role === 'voluntario' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'vitima' ? 'Vítima' : user.role === 'voluntario' ? 'Voluntário' : 'Autoridade'}
                      </span>
                    </div>
                    <Link href="/perfil" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg transition">
                      <User className="w-5 h-5" />
                      <span className="font-medium">Meu Perfil</span>
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                      className="w-full flex items-center gap-3 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition font-semibold"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/login" 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition font-semibold shadow-lg"
                    >
                      <LogIn className="w-5 h-5" />
                      Entrar
                    </Link>
                    <Link 
                      href="/registro" 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold shadow-lg"
                    >
                      <UserCircle className="w-5 h-5" />
                      Cadastrar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {pathname === '/' && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold flex items-center justify-center gap-4">
              <Phone className="w-4 h-4" />
              <span>Emergência: Defesa Civil 199 | Bombeiros 193 | SAMU 192</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
