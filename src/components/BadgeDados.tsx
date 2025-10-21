'use client';

import React from 'react';
import { AlertTriangle, Info, Database, Zap } from 'lucide-react';

interface BadgeDadosProps {
  tipo?: 'mock' | 'demo' | 'real' | 'parcial';
  posicao?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  tamanho?: 'sm' | 'md' | 'lg';
  mostrarIcone?: boolean;
  mensagemCustomizada?: string;
}

/**
 * Badge para indicar o status dos dados exibidos
 * 
 * Uso:
 * <BadgeDados tipo="mock" /> - Dados completamente simulados
 * <BadgeDados tipo="demo" /> - Demonstração, dados limitados
 * <BadgeDados tipo="real" /> - Dados reais e verificados
 * <BadgeDados tipo="parcial" /> - Parcialmente real
 */
export default function BadgeDados({
  tipo = 'demo',
  posicao = 'top-right',
  tamanho = 'sm',
  mostrarIcone = true,
  mensagemCustomizada
}: BadgeDadosProps) {
  
  // Configurações por tipo
  const configs = {
    mock: {
      cor: 'bg-red-100 text-red-700 border-red-300',
      corHover: 'hover:bg-red-200',
      icone: AlertTriangle,
      texto: mensagemCustomizada || 'Dados Simulados',
      descricao: 'Informações fictícias para demonstração'
    },
    demo: {
      cor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      corHover: 'hover:bg-yellow-200',
      icone: Info,
      texto: mensagemCustomizada || 'Demonstração',
      descricao: 'Sistema em modo de demonstração'
    },
    real: {
      cor: 'bg-green-100 text-green-700 border-green-300',
      corHover: 'hover:bg-green-200',
      icone: Database,
      texto: mensagemCustomizada || 'Dados Reais',
      descricao: 'Informações verificadas e atualizadas'
    },
    parcial: {
      cor: 'bg-blue-100 text-blue-700 border-blue-300',
      corHover: 'hover:bg-blue-200',
      icone: Zap,
      texto: mensagemCustomizada || 'Parcialmente Real',
      descricao: 'Alguns dados são reais, outros simulados'
    }
  };

  const config = configs[tipo];
  const Icone = config.icone;

  // Classes de tamanho
  const tamanhos = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  // Classes de posição
  const posicoes = {
    'top-left': 'absolute top-2 left-2 z-10',
    'top-right': 'absolute top-2 right-2 z-10',
    'bottom-left': 'absolute bottom-2 left-2 z-10',
    'bottom-right': 'absolute bottom-2 right-2 z-10',
    'inline': 'inline-flex'
  };

  // Tamanho do ícone baseado no tamanho do badge
  const iconeSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div className={`${posicoes[posicao]} group relative`}>
      <span
        className={`
          ${config.cor} 
          ${config.corHover}
          ${tamanhos[tamanho]}
          inline-flex items-center gap-1.5 
          font-semibold rounded-full 
          border-2 
          transition-all duration-200
          cursor-help
          shadow-sm
        `}
        title={config.descricao}
      >
        {mostrarIcone && (
          <Icone 
            size={iconeSizes[tamanho]} 
            className="flex-shrink-0" 
          />
        )}
        <span className="whitespace-nowrap">{config.texto}</span>
      </span>

      {/* Tooltip expandido no hover */}
      <div
        className="
          absolute top-full mt-2 right-0
          hidden group-hover:block
          bg-gray-900 text-white text-xs
          rounded-lg shadow-xl
          px-3 py-2
          w-64
          z-20
          animate-fadeIn
        "
      >
        <p className="font-semibold mb-1">{config.texto}</p>
        <p className="text-gray-300 text-xs leading-relaxed">
          {config.descricao}
        </p>
        
        {tipo === 'mock' && (
          <p className="mt-2 text-yellow-400 text-xs">
            ⚠️ Para uso em produção, implemente integração com dados reais
          </p>
        )}
        
        {tipo === 'parcial' && (
          <p className="mt-2 text-blue-300 text-xs">
            ℹ️ Verifique a documentação para detalhes
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Badge específico para componentes
 */
export function BadgeComponente({ 
  nome, 
  statusDados 
}: { 
  nome: string; 
  statusDados: 'mock' | 'demo' | 'real' | 'parcial' 
}) {
  return (
    <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
      <span className="text-sm font-medium text-gray-700">
        Componente: <strong>{nome}</strong>
      </span>
      <BadgeDados tipo={statusDados} posicao="inline" tamanho="sm" />
    </div>
  );
}

/**
 * Banner de aviso para páginas inteiras
 */
export function BannerDadosSimulados({ 
  mensagem,
  tipo = 'demo',
  mostrarDocumentacao = true 
}: { 
  mensagem?: string;
  tipo?: 'mock' | 'demo';
  mostrarDocumentacao?: boolean;
}) {
  const configs = {
    mock: {
      cor: 'bg-red-50 border-red-200 text-red-800',
      corIcone: 'text-red-600',
      icone: AlertTriangle
    },
    demo: {
      cor: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      corIcone: 'text-yellow-600',
      icone: Info
    }
  };

  const config = configs[tipo];
  const Icone = config.icone;

  return (
    <div className={`${config.cor} border-2 rounded-xl p-4 mb-6 shadow-sm`}>
      <div className="flex items-start gap-3">
        <Icone className={`${config.corIcone} flex-shrink-0 mt-0.5`} size={24} />
        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1">
            {tipo === 'mock' ? '⚠️ Dados Simulados' : 'ℹ️ Modo Demonstração'}
          </h3>
          <p className="text-sm leading-relaxed">
            {mensagem || 'Este componente utiliza dados simulados para fins de demonstração. Para uso em produção, implemente as integrações necessárias.'}
          </p>
          {mostrarDocumentacao && (
            <a 
              href="/DADOS-FICTICIOS-VS-REAIS.md" 
              target="_blank"
              className="inline-flex items-center gap-1 mt-2 text-sm font-semibold hover:underline"
            >
              📄 Ver documentação completa
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
