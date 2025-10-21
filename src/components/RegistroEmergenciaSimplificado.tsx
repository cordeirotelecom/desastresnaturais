'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Users, AlertTriangle, Send, CheckCircle, 
  Clock, Navigation, Heart, Dog, Pill, Baby, Home, Package,
  Loader2, ChevronRight, Info, X
} from 'lucide-react';
import RegistroNecessidadesService, { CadastroSimplificado } from '@/services/registro-necessidades';

export default function RegistroEmergenciaSimplificado() {
  // Estados do formulário simplificado
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState(1);
  const [numeroAnimais, setNumeroAnimais] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [urgencia, setUrgencia] = useState<'alta' | 'critica'>('alta');
  
  // Estados de controle
  const [geolocalizando, setGeolocalizando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const [erro, setErro] = useState('');

  // Geolocalização automática
  const obterLocalizacaoAtual = () => {
    if (!navigator.geolocation) {
      setErro('Seu navegador não suporta geolocalização');
      return;
    }

    setGeolocalizando(true);
    setErro('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding (converter lat/long em endereço)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`
          );
          const data = await response.json();
          
          const endereco = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setLocalizacao(endereco);
        } catch (error) {
          setLocalizacao(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        } finally {
          setGeolocalizando(false);
        }
      },
      (error) => {
        setGeolocalizando(false);
        setErro('Não foi possível obter sua localização. Digite manualmente.');
      }
    );
  };

  // Formatar telefone
  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2');
    }
    return telefone;
  };

  // Enviar cadastro
  const enviarCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações mínimas
    if (!nome || !telefone || !localizacao) {
      setErro('Por favor, preencha pelo menos nome, telefone e localização');
      return;
    }

    setEnviando(true);
    setErro('');

    try {
      const dados: CadastroSimplificado = {
        nome,
        telefone,
        localizacao,
        numeroPessoas,
        urgencia,
        descricaoRapida: `${descricao}${numeroAnimais > 0 ? ` | ${numeroAnimais} animal(is)` : ''}`
      };

      const registro = RegistroNecessidadesService.cadastroSimplificado(dados);
      
      setProtocolo(registro.protocolo);
      setSucesso(true);
      
      // Resetar formulário após 5 segundos
      setTimeout(() => {
        setSucesso(false);
        setNome('');
        setTelefone('');
        setLocalizacao('');
        setNumeroPessoas(1);
        setNumeroAnimais(0);
        setDescricao('');
        setProtocolo('');
      }, 5000);
      
    } catch (error) {
      setErro('Erro ao registrar emergência. Tente novamente ou ligue 199.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com alerta */}
        <div className="bg-red-600 text-white rounded-t-2xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Registro de Emergência</h1>
              <p className="text-red-100 mt-1">
                Preencha rapidamente. Ajuda está a caminho! ⏱️
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          
          {/* Mensagem de Sucesso */}
          {sucesso && (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    ✅ Cadastro realizado com sucesso!
                  </h3>
                  <p className="text-green-700 mb-3">
                    Seu protocolo: <strong className="text-2xl">{protocolo}</strong>
                  </p>
                  <p className="text-green-700">
                    Anote este número! Você receberá atualizações por SMS/WhatsApp.
                  </p>
                  <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>Próximos passos:</strong>
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>✓ Equipes foram notificadas automaticamente</li>
                      <li>✓ Voluntários próximos receberão alerta</li>
                      <li>✓ Você será contatado em breve</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Erro */}
          {erro && (
            <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3">
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold">Erro</p>
                <p className="text-red-600 text-sm">{erro}</p>
              </div>
            </div>
          )}

          {/* Info rápida */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Cadastro ultra-rápido (menos de 1 minuto)</p>
                <p>Preencha apenas o essencial. Você pode adicionar mais detalhes depois.</p>
              </div>
            </div>
          </div>

          <form onSubmit={enviarCadastro} className="space-y-6">
            
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Seu Nome *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                placeholder="Digite seu nome"
                required
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone (com WhatsApp se possível) *
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                placeholder="(51) 99999-9999"
                required
              />
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Onde você está? *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                  placeholder="Endereço, bairro ou ponto de referência"
                  required
                />
                <button
                  type="button"
                  onClick={obterLocalizacaoAtual}
                  disabled={geolocalizando}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {geolocalizando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                  GPS
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Clique em &quot;GPS&quot; para pegar automaticamente ou digite manualmente
              </p>
            </div>

            {/* Número de Pessoas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Quantas pessoas?
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numeroPessoas}
                  onChange={(e) => setNumeroPessoas(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg text-center font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Dog className="w-4 h-4 inline mr-2" />
                  Quantos animais?
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={numeroAnimais}
                  onChange={(e) => setNumeroAnimais(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg text-center font-bold"
                />
              </div>
            </div>

            {/* Urgência */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Nível de Urgência
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUrgencia('alta')}
                  className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                    urgencia === 'alta'
                      ? 'border-orange-500 bg-orange-50 text-orange-900'
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                  Alta
                  <p className="text-xs mt-1">Preciso de ajuda em breve</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgencia('critica')}
                  className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                    urgencia === 'critica'
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2 animate-pulse" />
                  CRÍTICA
                  <p className="text-xs mt-1">Situação de risco imediato</p>
                </button>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Descreva rapidamente a situação
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Ex: Estou ilhado, água subindo, preciso de resgate com barco"
              />
              <p className="mt-1 text-sm text-gray-500">
                Exemplos: &quot;estou ilhado&quot;, &quot;preciso de medicamento&quot;, &quot;abrigo lotado&quot;
              </p>
            </div>

            {/* Necessidades Rápidas (Checkboxes) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                O que você mais precisa agora? (opcional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { icon: AlertTriangle, label: 'Resgate', color: 'red' },
                  { icon: Pill, label: 'Medicamentos', color: 'blue' },
                  { icon: Package, label: 'Alimentos', color: 'green' },
                  { icon: Home, label: 'Abrigo', color: 'purple' },
                  { icon: Baby, label: 'Fraldas', color: 'pink' },
                  { icon: Heart, label: 'Outro', color: 'gray' },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all"
                  >
                    <input type="checkbox" className="w-4 h-4" />
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botão de Envio */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={enviando || sucesso}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Enviando...
                  </>
                ) : sucesso ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Cadastrado com Sucesso!
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Enviar Pedido de Ajuda
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Informações de Contato Emergencial */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                📞 Em caso de emergência extrema, ligue também:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Defesa Civil: <strong>199</strong></div>
                <div>• Bombeiros: <strong>193</strong></div>
                <div>• SAMU: <strong>192</strong></div>
                <div>• Polícia: <strong>190</strong></div>
              </div>
            </div>
          </form>
        </div>

        {/* Rodapé com estatísticas */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            ✅ Seu cadastro será verificado e você receberá atualizações por SMS/WhatsApp
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Tempo médio de resposta: 15-30 minutos | Dados protegidos por LGPD
          </p>
        </div>
      </div>
    </div>
  );
}
