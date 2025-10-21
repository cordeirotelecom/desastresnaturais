'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Users, AlertTriangle, User, Shield, Heart, 
  Clock, RefreshCw, LogOut, Bell, Settings, TrendingUp, Activity
} from 'lucide-react';
import { getCurrentUser } from '../services/auth';
import { useRouter } from 'next/navigation';
import AvisoDadosFicticios from '@/components/AvisoDadosFicticios';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: 'vitima' | 'voluntario' | 'autoridade';
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'emergency';
}

interface OnlineUser {
  id: string;
  name: string;
  role: 'vitima' | 'voluntario' | 'autoridade';
  lastSeen: Date;
}

// Simulação de armazenamento global (em produção, usar WebSocket + DB)
const STORAGE_KEY = 'chat_messages';
const USERS_KEY = 'online_users';

export default function ChatGlobal() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Verificar autenticação
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    
    // Adicionar usuário aos online
    addUserOnline(currentUser);
    
    // Carregar mensagens
    loadMessages();
    
    // Cleanup ao sair
    return () => {
      removeUserOnline(currentUser.id);
    };
  }, [router]);

  // Auto-refresh a cada 3 segundos
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      loadMessages();
      updateOnlineUsers();
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  // Scroll automático para última mensagem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const addUserOnline = (currentUser: any) => {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      let users: OnlineUser[] = stored ? JSON.parse(stored) : [];
      
      // Remover usuário se já existe
      users = users.filter(u => u.id !== currentUser.id);
      
      // Adicionar usuário
      users.push({
        id: currentUser.id,
        name: currentUser.nome,
        role: currentUser.role,
        lastSeen: new Date()
      });
      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      updateOnlineUsers();
    } catch (error) {
      console.error('Erro ao adicionar usuário online:', error);
    }
  };

  const removeUserOnline = (userId: string) => {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) {
        let users: OnlineUser[] = JSON.parse(stored);
        users = users.filter(u => u.id !== userId);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    } catch (error) {
      console.error('Erro ao remover usuário online:', error);
    }
  };

  const updateOnlineUsers = () => {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) {
        const users: OnlineUser[] = JSON.parse(stored);
        // Remover usuários inativos há mais de 1 minuto
        const now = new Date();
        const activeUsers = users.filter(u => {
          const lastSeen = new Date(u.lastSeen);
          const diff = now.getTime() - lastSeen.getTime();
          return diff < 60000; // 1 minuto
        });
        
        localStorage.setItem(USERS_KEY, JSON.stringify(activeUsers));
        setOnlineUsers(activeUsers);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuários online:', error);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);

    const message: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      userId: user.id,
      userName: user.nome,
      userRole: user.role,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let allMessages: Message[] = stored ? JSON.parse(stored) : [];
      
      // Limitar a 200 mensagens mais recentes
      if (allMessages.length >= 200) {
        allMessages = allMessages.slice(-150);
      }
      
      allMessages.push(message);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allMessages));
      
      setMessages(allMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
      
      setNewMessage('');
      
      // Atualizar lastSeen do usuário
      addUserOnline(user);
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'vitima':
        return { icon: User, color: 'bg-blue-100 text-blue-700', label: 'Vítima' };
      case 'voluntario':
        return { icon: Heart, color: 'bg-green-100 text-green-700', label: 'Voluntário' };
      case 'autoridade':
        return { icon: Shield, color: 'bg-red-100 text-red-700', label: 'Autoridade' };
      default:
        return { icon: User, color: 'bg-gray-100 text-gray-700', label: 'Usuário' };
    }
  };

  const clearAllMessages = () => {
    if (user?.role === 'autoridade') {
      if (confirm('Tem certeza que deseja limpar TODAS as mensagens do chat? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem(STORAGE_KEY);
        setMessages([]);
      }
    } else {
      alert('Apenas autoridades podem limpar o chat.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Carregando chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Aviso de Dados Fictícios */}
      <div className="p-4 bg-gray-50">
        <AvisoDadosFicticios 
          tipo="warning"
          mensagem="Este chat é uma DEMONSTRAÇÃO com dados simulados. Em produção, será um sistema de comunicação em tempo real seguro e moderado pela Defesa Civil."
          tamanho="small"
        />
      </div>

      <div className="flex flex-1">
      {/* Sidebar - Usuários Online */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" />
              Chat Global
            </h2>
            <button 
              onClick={() => loadMessages()}
              className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
              title="Atualizar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-blue-100">Todos os usuários logados podem conversar aqui</p>
        </div>

        {/* Lista de Usuários Online */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online ({onlineUsers.length})
              </h3>
            </div>
            <div className="space-y-2">
              {onlineUsers.map((onlineUser) => {
                const badge = getRoleBadge(onlineUser.role);
                const Icon = badge.icon;
                return (
                  <div key={onlineUser.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                        {onlineUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {onlineUser.name}
                        {onlineUser.id === user.id && <span className="text-blue-600 ml-1">(você)</span>}
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>
                        <Icon className="w-3 h-3" />
                        {badge.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Estatísticas
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Total de mensagens:</span>
                <span className="font-bold text-blue-900">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Usuários ativos:</span>
                <span className="font-bold text-blue-900">{onlineUsers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Suas mensagens:</span>
                <span className="font-bold text-blue-900">
                  {messages.filter(m => m.userId === user.id).length}
                </span>
              </div>
            </div>
          </div>

          {/* Botão Limpar Chat (apenas autoridades) */}
          {user.role === 'autoridade' && (
            <button
              onClick={clearAllMessages}
              className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Limpar Todo o Chat
            </button>
          )}
        </div>
      </div>

      {/* Área de Chat Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-7 h-7 text-blue-600" />
                Sala de Chat Geral
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {onlineUsers.length} {onlineUsers.length === 1 ? 'pessoa online' : 'pessoas online'} • 
                Atualização automática a cada 3 segundos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg ${getRoleBadge(user.role).color} flex items-center gap-2`}>
                {React.createElement(getRoleBadge(user.role).icon, { className: 'w-4 h-4' })}
                <span className="font-semibold">{user.nome}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma mensagem ainda</h3>
              <p className="text-gray-500">Seja o primeiro a enviar uma mensagem!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.userId === user.id;
              const badge = getRoleBadge(message.userRole);
              const Icon = badge.icon;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      isOwnMessage ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-gray-400 to-gray-600'
                    }`}>
                      {message.userName.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div className={`flex-1 max-w-2xl ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!isOwnMessage && (
                        <>
                          <span className="font-semibold text-gray-900">{message.userName}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>
                            <Icon className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </>
                      )}
                      {isOwnMessage && (
                        <>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>
                            <Icon className="w-3 h-3" />
                            {badge.label}
                          </span>
                          <span className="font-semibold text-gray-900">{message.userName}</span>
                        </>
                      )}
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center gap-2 transition-colors"
            >
              <Send className="w-5 h-5" />
              Enviar
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Pressione Enter para enviar • Shift+Enter para nova linha
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
