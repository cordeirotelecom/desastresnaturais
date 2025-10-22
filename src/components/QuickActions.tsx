'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle, MapPin, Users, Heart, Phone, Brain,
  Building2, MessageSquare, FileText, Zap, X
} from 'lucide-react';

interface QuickAction {
  href: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  priority: 'high' | 'medium' | 'low';
}

const quickActions: QuickAction[] = [
  {
    href: '/registro-emergencia',
    label: 'Registrar Emergência',
    icon: AlertTriangle,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-red-600 to-red-700',
    priority: 'high'
  },
  {
    href: '/monitoramento',
    label: 'Ver Previsões IA',
    icon: Brain,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-purple-600 to-purple-700',
    priority: 'high'
  },
  {
    href: '/abrigos',
    label: 'Encontrar Abrigo',
    icon: Building2,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700',
    priority: 'high'
  },
  {
    href: '/mapa',
    label: 'Ver Mapa',
    icon: MapPin,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-green-600 to-green-700',
    priority: 'medium'
  },
  {
    href: '/chat',
    label: 'Chat',
    icon: MessageSquare,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
    priority: 'medium'
  },
  {
    href: '/voluntarios',
    label: 'Voluntários',
    icon: Users,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-teal-600 to-teal-700',
    priority: 'low'
  }
];

export default function QuickActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Inicia minimizado

  useEffect(() => {
    // Mostrar atalhos após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="hidden md:block fixed bottom-6 right-6 z-30 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
        aria-label="Mostrar atalhos rápidos"
      >
        <Zap className="w-6 h-6 group-hover:animate-bounce" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {quickActions.filter(a => a.priority === 'high').length}
        </span>
      </button>
    );
  }

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-30 bg-white rounded-2xl shadow-2xl border-2 border-blue-100 p-6 max-w-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">Atalhos Rápidos</h3>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Minimizar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.bgColor} ${action.color} rounded-xl p-4 hover:scale-105 transition-all shadow-md hover:shadow-lg group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <Icon className="w-6 h-6 mb-2" />
              <p className="text-sm font-semibold leading-tight">{action.label}</p>
              {action.priority === 'high' && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Acesso rápido às funções principais
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-xs text-red-800 font-medium">
            <strong>Emergência:</strong> 199, 193, 192
          </p>
        </div>
      </div>
    </div>
  );
}
