'use client';

import React, { useState } from 'react';
import {
  MessageCircle, Send, AlertTriangle, Home, Package, Users,
  Heart, MapPin, Phone, Clock, CheckCircle, Info, Zap, Bot,
  QrCode, Smartphone, Globe, Shield, TrendingUp, Star,
  ChevronRight, Copy, Check
} from 'lucide-react';

export default function WhatsAppBot() {
  const [numeroCopiado, setNumeroCopiado] = useState(false);

  const copiarNumero = () => {
    navigator.clipboard.writeText('+55 51 99999-0199');
    setNumeroCopiado(true);
    setTimeout(() => setNumeroCopiado(false), 2000);
  };

  const comandos = [
    {
      comando: 'SOCORRO',
      descricao: 'Registrar emergência urgente',
      icon: AlertTriangle,
      color: 'red',
      exemplo: 'SOCORRO enchente casa alagando',
      resposta: 'Emergência registrada! Protocolo #12345. Equipes notificadas.'
    },
    {
      comando: 'ABRIGO',
      descricao: 'Encontrar abrigos próximos',
      icon: Home,
      color: 'purple',
      exemplo: 'ABRIGO Porto Alegre',
      resposta: 'Encontrados 3 abrigos próximos: Ginásio Tesourinha (2km), ...'
    },
    {
      comando: 'VOLUNTARIO',
      descricao: 'Cadastrar-se como voluntário',
      icon: Users,
      color: 'green',
      exemplo: 'VOLUNTARIO médico Porto Alegre',
      resposta: 'Cadastro iniciado! Por favor, informe seu nome completo.'
    },
    {
      comando: 'DOAR',
      descricao: 'Registrar doação',
      icon: Package,
      color: 'blue',
      exemplo: 'DOAR alimentos 50kg',
      resposta: 'Obrigado! Onde está localizada a doação?'
    },
    {
      comando: 'STATUS',
      descricao: 'Consultar protocolo',
      icon: Info,
      color: 'gray',
      exemplo: 'STATUS 12345',
      resposta: 'Protocolo #12345: Em atendimento. Equipe a caminho.'
    },
    {
      comando: 'AJUDA',
      descricao: 'Ver todos os comandos',
      icon: MessageCircle,
      color: 'orange',
      exemplo: 'AJUDA',
      resposta: 'Comandos disponíveis: SOCORRO, ABRIGO, VOLUNTARIO, DOAR, STATUS...'
    }
  ];

  const recursos = [
    {
      titulo: 'Disponível 24/7',
      descricao: 'Bot ativo todos os dias, sem interrupções',
      icon: Clock,
      color: 'blue'
    },
    {
      titulo: 'Respostas Instantâneas',
      descricao: 'IA processa em menos de 3 segundos',
      icon: Zap,
      color: 'yellow'
    },
    {
      titulo: 'Sem Internet Necessária',
      descricao: 'Funciona via SMS em áreas sem dados',
      icon: Smartphone,
      color: 'green'
    },
    {
      titulo: 'Multilíngue',
      descricao: 'Português, Espanhol, Inglês',
      icon: Globe,
      color: 'purple'
    },
    {
      titulo: 'Dados Criptografados',
      descricao: 'Segurança ponta-a-ponta do WhatsApp',
      icon: Shield,
      color: 'gray'
    },
    {
      titulo: 'IA Avançada',
      descricao: 'Compreende linguagem natural',
      icon: Bot,
      color: 'red'
    }
  ];

  const estatisticas = [
    { numero: '12.458', label: 'Atendimentos realizados', icon: MessageCircle },
    { numero: '847', label: 'Emergências registradas', icon: AlertTriangle },
    { numero: '3.2 seg', label: 'Tempo médio de resposta', icon: Zap },
    { numero: '98.5%', label: 'Taxa de satisfação', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Powered by GPT-4 & WhatsApp Business API</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-6">
                Assistente Virtual WhatsApp
              </h1>
              
              <p className="text-xl text-green-100 mb-8">
                Registre emergências, encontre abrigos, doe suprimentos ou seja voluntário - tudo pelo WhatsApp, 24 horas por dia.
              </p>

              {/* Número do WhatsApp */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-sm text-green-100 mb-2">Adicione nosso número:</p>
                <div className="flex items-center gap-4">
                  <Phone className="w-8 h-8" />
                  <div>
                    <p className="text-3xl font-bold">+55 51 99999-0199</p>
                    <p className="text-sm text-green-100">Horário: 24 horas, 7 dias por semana</p>
                  </div>
                  <button
                    onClick={copiarNumero}
                    className="ml-auto px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition flex items-center gap-2 font-semibold"
                  >
                    {numeroCopiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {numeroCopiado ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5551999990199?text=OLÁ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition font-bold text-lg shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Iniciar Conversa
                </a>
                
                <button className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition font-bold text-lg">
                  <QrCode className="w-6 h-6" />
                  Escanear QR Code
                </button>
              </div>
            </div>

            {/* Mockup de Celular */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-sm mx-auto">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-xs font-semibold">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                    <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                    <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                  </div>
                </div>

                {/* WhatsApp Header */}
                <div className="bg-green-600 text-white rounded-t-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">SOS Desastres Bot</p>
                    <p className="text-xs text-green-100">Online - responde em segundos</p>
                  </div>
                </div>

                {/* Mensagens */}
                <div className="bg-gray-100 p-4 space-y-3 h-96 overflow-y-auto">
                  {/* Mensagem do usuário */}
                  <div className="flex justify-end">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                      <p className="text-sm">SOCORRO enchente casa alagando</p>
                      <span className="text-xs text-green-100">15:23</span>
                    </div>
                  </div>

                  {/* Resposta do bot */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow">
                      <p className="text-sm">✅ <strong>Emergência registrada!</strong></p>
                      <p className="text-sm mt-2">📋 Protocolo: <strong>#12345</strong></p>
                      <p className="text-sm mt-1">🚨 Prioridade: ALTA</p>
                      <p className="text-sm mt-1">📍 Equipes mais próximas foram notificadas</p>
                      <p className="text-sm mt-2">Aguarde contato em até 10 minutos.</p>
                      <span className="text-xs text-gray-500">15:23</span>
                    </div>
                  </div>

                  {/* Mensagem do usuário */}
                  <div className="flex justify-end">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                      <p className="text-sm">ABRIGO</p>
                      <span className="text-xs text-green-100">15:24</span>
                    </div>
                  </div>

                  {/* Resposta do bot */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow">
                      <p className="text-sm">🏠 <strong>Abrigos próximos:</strong></p>
                      <p className="text-sm mt-2">1. Ginásio Tesourinha (2.3 km)</p>
                      <p className="text-sm">   ✅ 150 vagas disponíveis</p>
                      <p className="text-sm mt-2">2. E.E.E.M. Coronel Massot (3.1 km)</p>
                      <p className="text-sm">   ⚠️ 20 vagas restantes</p>
                      <span className="text-xs text-gray-500">15:24</span>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="bg-white rounded-b-xl p-3 border-t flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Digite AJUDA para comandos"
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm"
                    disabled
                  />
                  <button className="p-2 bg-green-600 rounded-full">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-full px-6 py-3 font-bold shadow-lg transform rotate-12">
                Grátis!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {estatisticas.map(({ numero, label, icon: Icon }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{numero}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comandos Disponíveis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comandos Disponíveis</h2>
          <p className="text-xl text-gray-600">Digite qualquer comando abaixo no WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comandos.map(({ comando, descricao, icon: Icon, color, exemplo, resposta }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-${color}-100 rounded-lg mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{comando}</h3>
              <p className="text-gray-600 mb-4">{descricao}</p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-500 mb-1">Exemplo:</p>
                <p className="text-sm font-mono text-gray-900">{exemplo}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                <p className="text-xs text-green-700 mb-1">Resposta do bot:</p>
                <p className="text-sm text-green-900">{resposta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recursos */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que usar nosso bot?</h2>
            <p className="text-xl text-gray-600">Tecnologia de ponta para salvar vidas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recursos.map(({ titulo, descricao, icon: Icon, color }, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${color}-100 rounded-full mb-4`}>
                  <Icon className={`w-8 h-8 text-${color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{titulo}</h3>
                <p className="text-gray-600">{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Como Funciona */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600">3 passos simples para obter ajuda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              passo: '1',
              titulo: 'Adicione o Número',
              descricao: 'Salve nosso número nos seus contatos: +55 51 99999-0199',
              icon: Phone
            },
            {
              passo: '2',
              titulo: 'Envie um Comando',
              descricao: 'Digite SOCORRO, ABRIGO, DOAR ou qualquer comando',
              icon: MessageCircle
            },
            {
              passo: '3',
              titulo: 'Receba Ajuda Imediata',
              descricao: 'IA processa e conecta você com recursos em segundos',
              icon: CheckCircle
            }
          ].map(({ passo, titulo, descricao, icon: Icon }, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 text-white text-3xl font-bold">
                  {passo}
                </div>
                <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{titulo}</h3>
                <p className="text-gray-600">{descricao}</p>
              </div>
              
              {index < 2 && (
                <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 text-green-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Simulado */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Escaneie e Comece Agora</h2>
          <p className="text-xl text-green-100 mb-8">Use a câmera do seu celular para escanear o QR Code</p>
          
          <div className="bg-white rounded-xl p-8 inline-block">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <p className="text-gray-600 mt-4 font-semibold">QR Code de Demonstração</p>
            <p className="text-sm text-gray-500">Em produção, este seria um QR real</p>
          </div>

          <p className="mt-8 text-green-100">Ou clique no botão abaixo para abrir diretamente</p>
          <a
            href="https://wa.me/5551999990199?text=OLÁ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-4 px-10 py-5 bg-white text-green-600 rounded-xl hover:bg-green-50 transition font-bold text-xl shadow-2xl"
          >
            <MessageCircle className="w-8 h-8" />
            Abrir WhatsApp Agora
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Perguntas Frequentes</h2>
        
        <div className="space-y-6">
          {[
            {
              pergunta: 'O serviço é gratuito?',
              resposta: 'Sim! Totalmente gratuito. Apenas os custos normais de dados/SMS do seu plano se aplicam.'
            },
            {
              pergunta: 'Funciona sem internet?',
              resposta: 'Sim, em áreas sem internet, você pode enviar comandos via SMS para o mesmo número.'
            },
            {
              pergunta: 'Meus dados estão seguros?',
              resposta: 'Sim. Usamos a criptografia ponta-a-ponta do WhatsApp. Seus dados nunca são compartilhados.'
            },
            {
              pergunta: 'Posso usar em português informal?',
              resposta: 'Sim! Nossa IA entende linguagem natural. Você não precisa usar comandos exatos.'
            },
            {
              pergunta: 'Quanto tempo leva para receber resposta?',
              resposta: 'Média de 3 segundos. Em emergências críticas, equipes humanas são acionadas imediatamente.'
            }
          ].map(({ pergunta, resposta }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-green-600" />
                {pergunta}
              </h3>
              <p className="text-gray-600 pl-7">{resposta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-300" />
          <h2 className="text-4xl font-bold mb-4">Salve esta informação agora</h2>
          <p className="text-xl text-blue-100 mb-8">
            Em uma emergência, cada segundo conta. Adicione nosso número aos contatos agora.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 inline-block">
            <p className="text-sm text-blue-100 mb-2">Número para salvar:</p>
            <p className="text-4xl font-bold mb-4">+55 51 99999-0199</p>
            <button
              onClick={copiarNumero}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold flex items-center gap-2 mx-auto"
            >
              {numeroCopiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {numeroCopiado ? 'Número Copiado!' : 'Copiar Número'}
            </button>
          </div>

          <p className="text-blue-100">
            Compartilhe com familiares, vizinhos e amigos. Juntos somos mais fortes! 💪
          </p>
        </div>
      </div>
    </div>
  );
}
