'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock, MapPin, AlertTriangle, RefreshCw } from 'lucide-react';

interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  fonte: string;
  url: string;
  dataPublicacao: Date;
  localizacao: string;
  categoria: 'enchente' | 'temporal' | 'deslizamento' | 'alerta' | 'recuperacao';
  urgencia: 'baixa' | 'media' | 'alta' | 'critica';
}

// Simulação de feed de notícias (em produção, seria uma API real)
const noticiasSimuladas: Noticia[] = [
  {
    id: '1',
    titulo: 'Defesa Civil emite alerta de temporais para região metropolitana',
    resumo: 'Previsão de chuvas intensas para próximas 48h. População deve se preparar e evitar áreas de risco.',
    fonte: 'Defesa Civil RS',
    url: 'https://www.defesacivil.rs.gov.br/',
    dataPublicacao: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h atrás
    localizacao: 'Porto Alegre e Região Metropolitana',
    categoria: 'alerta',
    urgencia: 'alta'
  },
  {
    id: '2',
    titulo: 'Operação de resgate em andamento no Vale do Taquari',
    resumo: 'Equipes trabalham no resgate de famílias ilhadas devido às enchentes. 120 pessoas já foram evacuadas.',
    fonte: 'G1 RS',
    url: 'https://g1.globo.com/rs/',
    dataPublicacao: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h atrás
    localizacao: 'Vale do Taquari',
    categoria: 'enchente',
    urgencia: 'critica'
  },
  {
    id: '3',
    titulo: 'Abrigos temporários recebem doações em Canoas',
    resumo: 'Campanha arrecada alimentos, roupas e produtos de higiene para famílias desabrigadas.',
    fonte: 'Prefeitura de Canoas',
    url: 'https://www.canoas.rs.gov.br/',
    dataPublicacao: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h atrás
    localizacao: 'Canoas',
    categoria: 'recuperacao',
    urgencia: 'media'
  },
  {
    id: '4',
    titulo: 'Nível do Guaíba sobe 30cm em 24 horas',
    resumo: 'Monitoramento indica elevação constante. Defesa Civil monitora áreas ribeirinhas.',
    fonte: 'INMET',
    url: 'https://portal.inmet.gov.br/',
    dataPublicacao: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8h atrás
    localizacao: 'Porto Alegre',
    categoria: 'alerta',
    urgencia: 'media'
  },
  {
    id: '5',
    titulo: 'Deslizamento interdita rodovia em Caxias do Sul',
    resumo: 'BR-116 bloqueada após deslizamento de terra. Tráfego desviado para rotas alternativas.',
    fonte: 'PRF',
    url: 'https://www.gov.br/prf/',
    dataPublicacao: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h atrás
    localizacao: 'Caxias do Sul',
    categoria: 'deslizamento',
    urgencia: 'alta'
  },
  {
    id: '6',
    titulo: 'Temporal causa estragos em Santa Maria',
    resumo: 'Ventos de até 90 km/h derrubam árvores e causam destelhamentos. Sem vítimas graves.',
    fonte: 'Corpo de Bombeiros',
    url: 'https://www.cbm.rs.gov.br/',
    dataPublicacao: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18h atrás
    localizacao: 'Santa Maria',
    categoria: 'temporal',
    urgencia: 'media'
  }
];

export default function NoticiasDesastres() {
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasSimuladas);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [carregando, setCarregando] = useState(false);

  const categoriaColors = {
    enchente: 'bg-blue-100 text-blue-800 border-blue-300',
    temporal: 'bg-gray-100 text-gray-800 border-gray-300',
    deslizamento: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    alerta: 'bg-orange-100 text-orange-800 border-orange-300',
    recuperacao: 'bg-green-100 text-green-800 border-green-300'
  };

  const urgenciaColors = {
    baixa: 'border-l-green-500',
    media: 'border-l-yellow-500',
    alta: 'border-l-orange-500',
    critica: 'border-l-red-500'
  };

  const categoriaLabels = {
    enchente: '🌊 Enchente',
    temporal: '⛈️ Temporal',
    deslizamento: '⚠️ Deslizamento',
    alerta: '🔔 Alerta',
    recuperacao: '✅ Recuperação'
  };

  const noticiasFiltradas = filtroCategoria === 'todas' 
    ? noticias 
    : noticias.filter(n => n.categoria === filtroCategoria);

  const atualizarNoticias = () => {
    setCarregando(true);
    // Simula atualização (em produção, faria fetch da API)
    setTimeout(() => {
      setNoticias([...noticiasSimuladas]);
      setCarregando(false);
    }, 1000);
  };

  const formatarTempo = (data: Date) => {
    const diff = Date.now() - data.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor(diff / (1000 * 60));
    
    if (horas > 0) return `Há ${horas}h`;
    if (minutos > 0) return `Há ${minutos}min`;
    return 'Agora';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Newspaper className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Notícias em Tempo Real</h1>
              <p className="text-blue-50">Acompanhe as últimas atualizações sobre desastres naturais no RS</p>
            </div>
          </div>
          <button
            onClick={atualizarNoticias}
            disabled={carregando}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50 font-semibold"
          >
            <RefreshCw className={`w-4 h-4 ${carregando ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Aviso de Dados */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
        <div>
          <p className="font-bold text-yellow-800">DEMONSTRAÇÃO - Dados Simulados</p>
          <p className="text-yellow-700 text-sm">
            As notícias exibidas são simuladas para demonstração. Em produção, este feed seria alimentado por APIs de:
            <strong> G1 RS, Defesa Civil, INMET, Corpo de Bombeiros, PRF</strong> e outras fontes oficiais em tempo real.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-lg rounded-xl p-4">
        <h3 className="font-bold text-gray-800 mb-3">Filtrar por Categoria:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroCategoria('todas')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filtroCategoria === 'todas'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({noticias.length})
          </button>
          {Object.entries(categoriaLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFiltroCategoria(key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtroCategoria === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({noticias.filter(n => n.categoria === key).length})
            </button>
          ))}
        </div>
      </div>

      {/* Stats Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow-lg border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-bold">Urgente</p>
          <p className="text-2xl font-bold text-red-700">
            {noticias.filter(n => n.urgencia === 'critica').length}
          </p>
        </div>
        <div className="bg-white shadow-lg border-l-4 border-orange-500 p-4 rounded-lg">
          <p className="text-sm text-orange-600 font-bold">Alta Prioridade</p>
          <p className="text-2xl font-bold text-orange-700">
            {noticias.filter(n => n.urgencia === 'alta').length}
          </p>
        </div>
        <div className="bg-white shadow-lg border-l-4 border-yellow-500 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-bold">Média Prioridade</p>
          <p className="text-2xl font-bold text-yellow-700">
            {noticias.filter(n => n.urgencia === 'media').length}
          </p>
        </div>
        <div className="bg-white shadow-lg border-l-4 border-green-500 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-bold">Baixa Prioridade</p>
          <p className="text-2xl font-bold text-green-700">
            {noticias.filter(n => n.urgencia === 'baixa').length}
          </p>
        </div>
      </div>

      {/* Lista de Notícias */}
      <div className="space-y-4">
        {noticiasFiltradas.length === 0 ? (
          <div className="bg-white shadow-lg p-12 rounded-xl text-center">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">Nenhuma notícia encontrada nesta categoria</p>
          </div>
        ) : (
          noticiasFiltradas.map((noticia) => (
            <div
              key={noticia.id}
              className={`bg-white shadow-lg hover:shadow-2xl transition rounded-xl p-6 border-l-4 ${urgenciaColors[noticia.urgencia]}`}
            >
              {/* Header da Notícia */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoriaColors[noticia.categoria]}`}>
                      {categoriaLabels[noticia.categoria]}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      noticia.urgencia === 'critica' ? 'bg-red-600 text-white' :
                      noticia.urgencia === 'alta' ? 'bg-orange-600 text-white' :
                      noticia.urgencia === 'media' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {noticia.urgencia === 'critica' ? '🚨 CRÍTICA' :
                       noticia.urgencia === 'alta' ? '⚠️ ALTA' :
                       noticia.urgencia === 'media' ? '📌 MÉDIA' :
                       '✓ BAIXA'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{noticia.titulo}</h3>
                  <p className="text-gray-700">{noticia.resumo}</p>
                </div>
              </div>

              {/* Footer da Notícia */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatarTempo(noticia.dataPublicacao)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {noticia.localizacao}
                  </div>
                  <div className="font-bold text-blue-600">
                    {noticia.fonte}
                  </div>
                </div>
                <a
                  href={noticia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  Ler Mais <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer com Fontes */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-blue-700 mb-3 text-lg">📰 Fontes de Notícias Oficiais</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { nome: 'G1 Rio Grande do Sul', url: 'https://g1.globo.com/rs/' },
            { nome: 'Defesa Civil RS', url: 'https://www.defesacivil.rs.gov.br/' },
            { nome: 'INMET', url: 'https://portal.inmet.gov.br/' },
            { nome: 'Corpo de Bombeiros RS', url: 'https://www.cbm.rs.gov.br/' },
            { nome: 'PRF - Polícia Rodoviária Federal', url: 'https://www.gov.br/prf/' },
            { nome: 'Governo do Estado RS', url: 'https://estado.rs.gov.br/' }
          ].map((fonte, idx) => (
            <a
              key={idx}
              href={fonte.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white hover:bg-blue-50 rounded-lg transition shadow-sm hover:shadow-md border border-blue-200"
            >
              <span className="text-sm text-gray-700 font-medium">{fonte.nome}</span>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
