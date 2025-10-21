'use client';

import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
}

export default function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simular notificações em tempo real
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: getRandomNotification().title,
        message: getRandomNotification().message,
        type: getRandomNotification().type,
        timestamp: new Date()
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 30000); // Nova notificação a cada 30 segundos

    // Adicionar notificação inicial
    setNotifications([
      {
        id: '1',
        title: 'Sistema Operacional',
        message: 'Todos os sensores estão funcionando normalmente',
        type: 'success',
        timestamp: new Date()
      }
    ]);

    return () => clearInterval(interval);
  }, []);

  const getRandomNotification = () => {
    const notifications = [
      { title: 'Novo Alerta', message: 'Alerta de chuvas intensas em Canoas', type: 'warning' as const },
      { title: 'Atualização', message: 'Dados meteorológicos atualizados', type: 'info' as const },
      { title: 'Capacidade Atualizada', message: 'Abrigo Municipal com 20 novas vagas', type: 'success' as const },
      { title: 'Voluntário Cadastrado', message: 'Novo voluntário se cadastrou no sistema', type: 'info' as const },
      { title: 'Alerta Crítico', message: 'Nível do rio Guaíba em elevação', type: 'error' as const },
    ];
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '🚨';
      default: return 'ℹ️';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-500 text-green-900';
      case 'warning': return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      case 'error': return 'bg-red-50 border-red-500 text-red-900';
      default: return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  };

  return (
    <div className="relative">
      {/* Botão de Notificações */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <span className="text-xl">🔔</span>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Painel de Notificações */}
      {isOpen && (
        <div className="absolute right-0 top-14 w-96 max-h-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Notificações em Tempo Real</h3>
              <button
                onClick={() => setNotifications([])}
                className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
              >
                Limpar Todas
              </button>
            </div>
            <p className="text-xs text-blue-100 mt-1">Sistema de monitoramento ativo</p>
          </div>

          {/* Lista de Notificações */}
          <div className="overflow-y-auto max-h-80">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-4xl mb-2">🔕</p>
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getColor(notification.type)} border-b border-gray-100 hover:bg-opacity-70 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <p className="text-xs mt-1 opacity-80">{notification.message}</p>
                      <p className="text-xs mt-2 opacity-60">
                        {notification.timestamp.toLocaleTimeString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé */}
          <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Ver todas as notificações →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
