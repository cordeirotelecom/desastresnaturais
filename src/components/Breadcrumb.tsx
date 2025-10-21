'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const pathLabels: Record<string, string> = {
  '': 'Início',
  'monitoramento': 'Monitoramento IA',
  'registro-emergencia': 'Registrar Emergência',
  'emergencias': 'Gestão de Emergências',
  'abrigos': 'Rede de Abrigos',
  'mapa': 'Mapa Interativo',
  'voluntarios': 'Voluntários',
  'doacoes': 'Doações',
  'recursos-oficiais': 'Documentos e Cursos',
  'noticias': 'Notícias',
  'casos-sucesso': 'Casos de Sucesso',
  'relatorios': 'Relatórios',
  'chat': 'Chat em Tempo Real',
  'whatsapp': 'WhatsApp Bot',
  'autoridades': 'Portal Autoridades',
  'perfil': 'Meu Perfil',
  'login': 'Login',
  'registro': 'Cadastro',
  'configuracoes': 'Configurações',
  'atividades': 'Registro de Atividades',
  'governamental': 'Portal Governamental',
  'integracao': 'Integrações',
  'dhs': 'DHS Platform',
  'plano-contingencia': 'Plano de Contingência'
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Não mostrar breadcrumb na home
  if (!pathname || pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbItems.push({
      label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentPath
    });
  });

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {!isFirst && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                
                {isLast ? (
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    {isFirst && <Home className="w-4 h-4" />}
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href} 
                    className="text-blue-600 hover:text-blue-800 hover:underline transition flex items-center gap-2 font-medium"
                  >
                    {isFirst && <Home className="w-4 h-4" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
