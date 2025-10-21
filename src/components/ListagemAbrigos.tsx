'use client';

import React, { useState, useEffect } from 'react';
import {
  Home, MapPin, Users, Phone, AlertCircle, CheckCircle, Clock,
  Filter, Search, Navigation, Heart, Dog, Accessibility,
  Activity, Utensils, Droplet, Shirt, Wind, Pill, Baby, User,
  TrendingUp, Building2, ChevronDown, ChevronUp, ExternalLink,
  Download
} from 'lucide-react';
import abrigosService, { Abrigo, FiltrosAbrigos } from '@/services/abrigos';

export default function ListagemAbrigos() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [abrigosFiltrados, setAbrigosFiltrados] = useState<Abrigo[]>([]);
  const [filtros, setFiltros] = useState<FiltrosAbrigos>({});
  const [buscaTexto, setBuscaTexto] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [abrigoExpandido, setAbrigoExpandido] = useState<string | null>(null);
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<{ lat: number; lon: number } | null>(null);

  // Carrega abrigos ao montar
  useEffect(() => {
    const dados = abrigosService.listarTodos();
    setAbrigos(dados);
    setAbrigosFiltrados(dados);
  }, []);

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
    let resultado = abrigosService.buscarComFiltros(filtros);

    // Filtro de texto (busca nome ou cidade)
    if (buscaTexto) {
      resultado = resultado.filter(a =>
        a.nome.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        a.localizacao.cidade.toLowerCase().includes(buscaTexto.toLowerCase())
      );
    }

    setAbrigosFiltrados(resultado);
  }, [filtros, buscaTexto]);

  const getStatusBadge = (status: Abrigo['status']) => {
    const badges = {
      'ativo': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Ativo' },
      'lotado': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Lotado' },
      'em-preparacao': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Em Preparação' },
      'encerrado': { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock, label: 'Encerrado' }
    };
    const badge = badges[status];
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <IconComponent className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const getNecessidadeStatus = (nivel: 'critica' | 'moderada' | 'atendida') => {
    const status = {
      'critica': { bg: 'bg-red-500', label: 'Crítica' },
      'moderada': { bg: 'bg-yellow-500', label: 'Moderada' },
      'atendida': { bg: 'bg-green-500', label: 'Atendida' }
    };
    return status[nivel];
  };

  const calcularDistancia = (abrigo: Abrigo): string => {
    if (!localizacaoUsuario) return '';
    
    const distanciaKm = abrigosService.calcularDistancia(
      localizacaoUsuario.lat,
      localizacaoUsuario.lon,
      abrigo.localizacao.latitude,
      abrigo.localizacao.longitude
    );

    return distanciaKm < 1 
      ? `${(distanciaKm * 1000).toFixed(0)}m` 
      : `${distanciaKm.toFixed(1)}km`;
  };

  const abrirMapa = (abrigo: Abrigo) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${abrigo.localizacao.latitude},${abrigo.localizacao.longitude}`;
    window.open(url, '_blank');
  };

  const estatisticas = abrigosService.obterEstatisticas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Home className="w-8 h-8 text-blue-600" />
                Abrigos Temporários - RS
              </h1>
              <p className="mt-1 text-gray-600">
                Encontre abrigos próximos e veja suas necessidades em tempo real
              </p>
            </div>
            
            <button
              onClick={() => {
                const csv = abrigosService.exportarParaCSV();
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'abrigos-rs.csv';
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 mb-1">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">Total de Abrigos</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{estatisticas.totalAbrigos}</p>
            </div>

            <div className="bg-green-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 mb-1">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Ativos</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{estatisticas.abrigosAtivos}</p>
            </div>

            <div className="bg-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-800 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Pessoas Abrigadas</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{estatisticas.totalAbrigados}</p>
            </div>

            <div className="bg-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-800 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Taxa de Ocupação</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{estatisticas.taxaOcupacao.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Barra de Busca */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou cidade..."
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
              {mostrarFiltros ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Painel de Filtros */}
          {mostrarFiltros && (
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filtros.status || ''}
                onChange={(e) => setFiltros({ ...filtros, status: e.target.value as any || undefined })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="lotado">Lotado</option>
                <option value="em-preparacao">Em Preparação</option>
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={filtros.vagasDisponiveis || false}
                  onChange={(e) => setFiltros({ ...filtros, vagasDisponiveis: e.target.checked || undefined })}
                  className="w-5 h-5 text-blue-600"
                />
                <span>Apenas com vagas</span>
              </label>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={filtros.aceitaAnimais || false}
                  onChange={(e) => setFiltros({ ...filtros, aceitaAnimais: e.target.checked || undefined })}
                  className="w-5 h-5 text-blue-600"
                />
                <Dog className="w-5 h-5" />
                <span>Aceita animais</span>
              </label>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={filtros.acessibilidade || false}
                  onChange={(e) => setFiltros({ ...filtros, acessibilidade: e.target.checked || undefined })}
                  className="w-5 h-5 text-blue-600"
                />
                <Accessibility className="w-5 h-5" />
                <span>Acessível (PcD)</span>
              </label>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={filtros.temEnfermaria || false}
                  onChange={(e) => setFiltros({ ...filtros, temEnfermaria: e.target.checked || undefined })}
                  className="w-5 h-5 text-blue-600"
                />
                <Activity className="w-5 h-5" />
                <span>Com enfermaria</span>
              </label>

              <button
                onClick={() => {
                  setFiltros({});
                  setBuscaTexto('');
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                Limpar Filtros
              </button>
            </div>
          )}

          {/* Resultado da busca */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-semibold">{abrigosFiltrados.length}</span> de <span className="font-semibold">{abrigos.length}</span> abrigos
          </div>
        </div>

        {/* Lista de Abrigos */}
        <div className="mt-6 space-y-4">
          {abrigosFiltrados.map(abrigo => {
            const expandido = abrigoExpandido === abrigo.id;
            const distancia = calcularDistancia(abrigo);

            return (
              <div key={abrigo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Header do Card */}
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{abrigo.nome}</h3>
                        {getStatusBadge(abrigo.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {abrigo.localizacao.cidade} - {abrigo.localizacao.bairro}
                        </div>
                        {distancia && (
                          <div className="flex items-center gap-1 text-blue-600 font-medium">
                            <Navigation className="w-4 h-4" />
                            {distancia} de você
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {abrigo.tipo.replace('-', ' ')}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setAbrigoExpandido(expandido ? null : abrigo.id)}
                      className="ml-4 p-2 hover:bg-white rounded-lg transition"
                    >
                      {expandido ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Métricas Rápidas */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                        <Users className="w-4 h-4" />
                        Ocupação
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {abrigo.capacidade.ocupada}/{abrigo.capacidade.total}
                      </p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (abrigo.capacidade.ocupada / abrigo.capacidade.total) > 0.9
                              ? 'bg-red-500'
                              : (abrigo.capacidade.ocupada / abrigo.capacidade.total) > 0.7
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(abrigo.capacidade.ocupada / abrigo.capacidade.total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                        <User className="w-4 h-4" />
                        Adultos
                      </div>
                      <p className="text-lg font-bold text-gray-900">{abrigo.capacidade.adultos}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                        <Baby className="w-4 h-4" />
                        Crianças/Idosos
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {abrigo.capacidade.criancas + abrigo.capacidade.idosos}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                        {abrigo.capacidade.aceitaAnimais ? (
                          <>
                            <Dog className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">Aceita pets</span>
                          </>
                        ) : (
                          <>
                            <Dog className="w-4 h-4 text-red-600" />
                            <span className="text-red-600 font-medium">Não aceita pets</span>
                          </>
                        )}
                      </div>
                      <p className="text-lg font-bold text-gray-900">{abrigo.capacidade.animais}</p>
                    </div>
                  </div>
                </div>

                {/* Detalhes Expandidos */}
                {expandido && (
                  <div className="p-6 space-y-6">
                    {/* Contato */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-600" />
                        Informações de Contato
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p><strong>Responsável:</strong> {abrigo.responsavel.nome}</p>
                        <p><strong>Cargo:</strong> {abrigo.responsavel.cargo}</p>
                        <p><strong>Organização:</strong> {abrigo.responsavel.organizacao}</p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${abrigo.responsavel.telefone}`} className="text-blue-600 hover:underline">
                            {abrigo.responsavel.telefone}
                          </a>
                        </p>
                        {abrigo.responsavel.email && (
                          <p className="text-sm text-gray-600">{abrigo.responsavel.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Endereço */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        Localização
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p>{abrigo.localizacao.endereco}</p>
                        <p>{abrigo.localizacao.bairro} - {abrigo.localizacao.cidade}/{abrigo.localizacao.estado}</p>
                        {abrigo.localizacao.pontoReferencia && (
                          <p className="text-sm text-gray-600 mt-2">📍 {abrigo.localizacao.pontoReferencia}</p>
                        )}
                        <button
                          onClick={() => abrirMapa(abrigo)}
                          className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Abrir no Google Maps
                        </button>
                      </div>
                    </div>

                    {/* Necessidades */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        Necessidades Atuais
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { key: 'alimentacao', label: 'Alimentação', icon: Utensils },
                          { key: 'agua', label: 'Água', icon: Droplet },
                          { key: 'roupas', label: 'Roupas', icon: Shirt },
                          { key: 'cobertores', label: 'Cobertores', icon: Wind },
                          { key: 'higiene', label: 'Higiene', icon: Heart },
                          { key: 'medicamentos', label: 'Medicamentos', icon: Pill },
                          { key: 'fraldas', label: 'Fraldas', icon: Baby },
                          { key: 'voluntarios', label: 'Voluntários', icon: Users }
                        ].map(({ key, label, icon: Icon }) => {
                          const nivel = abrigo.necessidades[key as keyof typeof abrigo.necessidades] as 'critica' | 'moderada' | 'atendida';
                          if (typeof nivel !== 'string') return null;
                          
                          const status = getNecessidadeStatus(nivel);
                          
                          return (
                            <div key={key} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-900">{label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${status.bg}`} />
                                <span className="text-xs text-gray-600">{status.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {abrigo.necessidades.observacoes && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800">
                            <strong>⚠️ Observação:</strong> {abrigo.necessidades.observacoes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Infraestrutura */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Infraestrutura Disponível</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className={`p-2 rounded ${abrigo.infraestrutura.cozinha ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Cozinha
                        </div>
                        <div className={`p-2 rounded ${abrigo.infraestrutura.enfermaria ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Enfermaria
                        </div>
                        <div className={`p-2 rounded ${abrigo.infraestrutura.acessibilidade ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Acessível
                        </div>
                        <div className={`p-2 rounded ${abrigo.infraestrutura.internet ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Internet
                        </div>
                        <div className={`p-2 rounded ${abrigo.infraestrutura.lavanderia ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Lavanderia
                        </div>
                        <div className={`p-2 rounded ${abrigo.infraestrutura.geradores ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          ✓ Geradores
                        </div>
                        <div className="p-2 rounded bg-gray-50">
                          {abrigo.infraestrutura.banheiros} banheiros
                        </div>
                        <div className="p-2 rounded bg-gray-50">
                          {abrigo.infraestrutura.chuveiros} chuveiros
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sem resultados */}
        {abrigosFiltrados.length === 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum abrigo encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou a busca</p>
          </div>
        )}
      </div>
    </div>
  );
}
