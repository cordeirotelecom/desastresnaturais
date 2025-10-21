'use client';

import React, { useState, useEffect } from 'react';
import {
  Home, MapPin, Users, Phone, AlertCircle, CheckCircle, Clock,
  Filter, Search, Navigation, Heart, Dog, Accessibility,
  Activity, Utensils, Droplet, Shirt, Wind, Pill, Baby, User,
  TrendingUp, Building2, ChevronDown, ChevronUp, ExternalLink,
  Download, Mail, Calendar, Shield, Info, X
} from 'lucide-react';
import { 
  abrigosReais, 
  getAbrigosPorCidade, 
  getAbrigosDisponiveis, 
  getAbrigosComPets,
  getCidadesComAbrigos,
  getTotalVagasDisponiveis,
  type RealAbrigo 
} from '@/data/real-locations';

export default function ListagemAbrigosReal() {
  const [abrigos, setAbrigos] = useState<RealAbrigo[]>(abrigosReais);
  const [abrigosFiltrados, setAbrigosFiltrados] = useState<RealAbrigo[]>(abrigosReais);
  const [filtros, setFiltros] = useState({
    cidade: '',
    status: '',
    aceitaPets: false,
    acessibilidade: false,
    apenasDisponiveis: false
  });
  const [buscaTexto, setBuscaTexto] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [abrigoExpandido, setAbrigoExpandido] = useState<string | null>(null);
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<{ lat: number; lon: number } | null>(null);

  const cidades = getCidadesComAbrigos();

  // Obtém localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalizacaoUsuario({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => console.log('Geolocalização não disponível:', error)
      );
    }
  }, []);

  // Aplica filtros
  useEffect(() => {
    let resultado = [...abrigosReais];

    // Filtro de texto (busca nome, cidade ou bairro)
    if (buscaTexto) {
      resultado = resultado.filter(a =>
        a.nome.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        a.cidade.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        a.bairro.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        a.endereco.toLowerCase().includes(buscaTexto.toLowerCase())
      );
    }

    // Filtro por cidade
    if (filtros.cidade) {
      resultado = resultado.filter(a => a.cidade === filtros.cidade);
    }

    // Filtro por status
    if (filtros.status) {
      resultado = resultado.filter(a => a.status === filtros.status);
    }

    // Filtro aceita pets
    if (filtros.aceitaPets) {
      resultado = resultado.filter(a => a.aceitaPets);
    }

    // Filtro acessibilidade
    if (filtros.acessibilidade) {
      resultado = resultado.filter(a => a.acessibilidade);
    }

    // Filtro apenas disponíveis
    if (filtros.apenasDisponiveis) {
      resultado = resultado.filter(a => a.status === 'ativo' && a.vagasDisponiveis > 0);
    }

    // Ordena por vagas disponíveis (decrescente)
    resultado.sort((a, b) => b.vagasDisponiveis - a.vagasDisponiveis);

    setAbrigosFiltrados(resultado);
  }, [filtros, buscaTexto]);

  const getStatusBadge = (status: RealAbrigo['status']) => {
    const badges = {
      'ativo': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Ativo', border: 'border-green-200' },
      'lotado': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Lotado', border: 'border-red-200' },
      'emergencia': { bg: 'bg-orange-100', text: 'text-orange-800', icon: AlertCircle, label: 'Emergência', border: 'border-orange-200' },
      'inativo': { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock, label: 'Inativo', border: 'border-gray-200' }
    };
    const badge = badges[status];
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border-2 ${badge.bg} ${badge.text} ${badge.border}`}>
        <IconComponent className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const calcularDistancia = (abrigo: RealAbrigo): string => {
    if (!localizacaoUsuario) return '';
    
    const R = 6371; // Raio da Terra em km
    const dLat = (abrigo.latitude - localizacaoUsuario.lat) * Math.PI / 180;
    const dLon = (abrigo.longitude - localizacaoUsuario.lon) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(localizacaoUsuario.lat * Math.PI / 180) * Math.cos(abrigo.latitude * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distanciaKm = R * c;

    return distanciaKm < 1 
      ? `${(distanciaKm * 1000).toFixed(0)}m` 
      : `${distanciaKm.toFixed(1)}km`;
  };

  const getPercentualOcupacao = (abrigo: RealAbrigo): number => {
    return ((abrigo.capacidade - abrigo.vagasDisponiveis) / abrigo.capacidade) * 100;
  };

  const limparFiltros = () => {
    setFiltros({
      cidade: '',
      status: '',
      aceitaPets: false,
      acessibilidade: false,
      apenasDisponiveis: false
    });
    setBuscaTexto('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Rede de Abrigos</h1>
              <p className="text-gray-600 text-lg">Dados reais de abrigos no Rio Grande do Sul</p>
            </div>
          </div>

          {/* ESTATÍSTICAS RÁPIDAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="card-premium p-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{abrigosReais.length}</div>
                  <div className="text-sm text-gray-600">Abrigos Cadastrados</div>
                </div>
              </div>
            </div>

            <div className="card-premium p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{getTotalVagasDisponiveis().toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Vagas Disponíveis</div>
                </div>
              </div>
            </div>

            <div className="card-premium p-4">
              <div className="flex items-center gap-3">
                <Dog className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{getAbrigosComPets().length}</div>
                  <div className="text-sm text-gray-600">Aceitam Pets</div>
                </div>
              </div>
            </div>

            <div className="card-premium p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{getAbrigosDisponiveis().length}</div>
                  <div className="text-sm text-gray-600">Com Vagas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BUSCA E FILTROS */}
        <div className="card-premium p-6 mb-6">
          {/* Busca */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome, cidade, bairro ou endereço..."
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Filter className="w-5 h-5" />
              Filtros
              {mostrarFiltros ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Painel de Filtros */}
          {mostrarFiltros && (
            <div className="border-t-2 border-gray-100 pt-4 mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Cidade */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Cidade
                  </label>
                  <select
                    value={filtros.cidade}
                    onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas as cidades</option>
                    {cidades.map(cidade => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Activity className="w-4 h-4 inline mr-1" />
                    Status
                  </label>
                  <select
                    value={filtros.status}
                    onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos os status</option>
                    <option value="ativo">Ativo</option>
                    <option value="lotado">Lotado</option>
                    <option value="emergencia">Emergência</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filtros.apenasDisponiveis}
                      onChange={(e) => setFiltros({ ...filtros, apenasDisponiveis: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Apenas com vagas</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filtros.aceitaPets}
                      onChange={(e) => setFiltros({ ...filtros, aceitaPets: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <Dog className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Aceita pets</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filtros.acessibilidade}
                      onChange={(e) => setFiltros({ ...filtros, acessibilidade: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <Accessibility className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Acessível</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={limparFiltros}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Limpar filtros
                </button>
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <strong className="text-gray-900">{abrigosFiltrados.length}</strong> de <strong className="text-gray-900">{abrigosReais.length}</strong> abrigos
          </div>
        </div>

        {/* LISTA DE ABRIGOS */}
        <div className="grid gap-6">
          {abrigosFiltrados.map((abrigo) => {
            const isExpandido = abrigoExpandido === abrigo.id;
            const percentualOcupacao = getPercentualOcupacao(abrigo);
            const distancia = calcularDistancia(abrigo);

            return (
              <div key={abrigo.id} className="card-premium card-hover overflow-hidden">
                {/* HEADER DO CARD */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{abrigo.nome}</h3>
                        {getStatusBadge(abrigo.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{abrigo.bairro}, {abrigo.cidade}</span>
                        </div>
                        {distancia && (
                          <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                            <Navigation className="w-4 h-4" />
                            <span className="text-sm">{distancia} de você</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* VAGAS E CAPACIDADE */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Vagas Disponíveis</span>
                      </div>
                      <div className="text-3xl font-bold text-green-600">{abrigo.vagasDisponiveis}</div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Capacidade Total</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">{abrigo.capacidade}</div>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Ocupação</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600">{percentualOcupacao.toFixed(0)}%</div>
                    </div>
                  </div>

                  {/* BARRA DE OCUPAÇÃO */}
                  <div className="mb-4">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          percentualOcupacao >= 90 ? 'bg-red-500' : 
                          percentualOcupacao >= 70 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${percentualOcupacao}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* BADGES DE CARACTERÍSTICAS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {abrigo.aceitaPets && (
                      <span className="badge badge-success flex items-center gap-1">
                        <Dog className="w-4 h-4" />
                        Aceita Pets
                      </span>
                    )}
                    {abrigo.acessibilidade && (
                      <span className="badge badge-info flex items-center gap-1">
                        <Accessibility className="w-4 h-4" />
                        Acessível
                      </span>
                    )}
                    <span className="badge badge-info flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {abrigo.horarioFuncionamento}
                    </span>
                  </div>

                  {/* BOTÃO EXPANDIR */}
                  <button
                    onClick={() => setAbrigoExpandido(isExpandido ? null : abrigo.id)}
                    className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isExpandido ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        Ver Menos
                      </>
                    ) : (
                      <>
                        <Info className="w-5 h-5" />
                        Ver Detalhes Completos
                      </>
                    )}
                  </button>
                </div>

                {/* DETALHES EXPANDIDOS */}
                {isExpandido && (
                  <div className="border-t-2 border-gray-100 bg-gray-50 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* CONTATO */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-blue-600" />
                          Informações de Contato
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{abrigo.endereco}, {abrigo.bairro}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-500" />
                            <span>{abrigo.cidade} - {abrigo.cep}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <a href={`tel:${abrigo.telefone}`} className="text-blue-600 hover:underline font-medium">
                              {abrigo.telefone}
                            </a>
                          </div>
                          {abrigo.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <a href={`mailto:${abrigo.email}`} className="text-blue-600 hover:underline">
                                {abrigo.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span><strong>Responsável:</strong> {abrigo.responsavel}</span>
                          </div>
                        </div>
                      </div>

                      {/* RECURSOS */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-green-600" />
                          Recursos Disponíveis
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {abrigo.recursos.map((recurso, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                              {recurso}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {abrigo.observacoes && (
                      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                        <div className="flex items-start gap-2">
                          <Info className="w-5 h-5 text-yellow-700 mt-0.5" />
                          <div>
                            <h5 className="font-semibold text-yellow-900 mb-1">Observações Importantes</h5>
                            <p className="text-sm text-yellow-800">{abrigo.observacoes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AÇÕES */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${abrigo.latitude},${abrigo.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-5 h-5" />
                        Ver no Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <a
                        href={`tel:${abrigo.telefone}`}
                        className="flex-1 btn-secondary flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Ligar para o Abrigo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MENSAGEM SE NÃO HOUVER RESULTADOS */}
        {abrigosFiltrados.length === 0 && (
          <div className="card-premium p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum abrigo encontrado</h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outra localização
            </p>
            <button
              onClick={limparFiltros}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
