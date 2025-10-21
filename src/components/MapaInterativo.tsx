'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, divIcon } from 'leaflet';
import { 
  MapPin, AlertTriangle, Users, Home, Navigation, Filter,
  Layers, Info, X, ChevronDown, ChevronUp, Phone, Clock
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix do Leaflet no Next.js
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ==================== TIPOS ====================

interface Coordenadas {
  lat: number;
  lng: number;
}

interface Emergencia {
  id: string;
  tipo: 'resgate' | 'medicamentos' | 'alimentos' | 'abrigo' | 'agua';
  urgencia: 'critica' | 'alta' | 'media';
  coordenadas: Coordenadas;
  endereco: string;
  descricao: string;
  pessoas: number;
  telefone?: string;
  timestamp: Date;
  status: 'pendente' | 'em-atendimento' | 'resolvido';
}

interface Voluntario {
  id: string;
  nome: string;
  especialidade: 'medico' | 'resgate' | 'transporte' | 'geral';
  coordenadas: Coordenadas;
  disponivel: boolean;
  telefone: string;
}

interface Abrigo {
  id: string;
  nome: string;
  coordenadas: Coordenadas;
  capacidade: number;
  ocupacao: number;
  disponivel: number;
  aceitaAnimais: boolean;
  telefone: string;
  status: 'ativo' | 'lotado';
}

interface AreaRisco {
  id: string;
  tipo: 'inundacao' | 'deslizamento' | 'alagamento';
  coordenadas: Coordenadas;
  raio: number; // em metros
  nivel: 'alto' | 'medio' | 'baixo';
  descricao: string;
}

interface Filtros {
  emergencias: boolean;
  voluntarios: boolean;
  abrigos: boolean;
  areasRisco: boolean;
  apenasCriticas: boolean;
  apenasDisponiveis: boolean;
}

// ==================== DADOS MOCKADOS ====================

const emergenciasMock: Emergencia[] = [
  {
    id: 'EMG-001',
    tipo: 'resgate',
    urgencia: 'critica',
    coordenadas: { lat: -30.0346, lng: -51.2177 },
    endereco: 'Rua dos Andradas, 1234 - Centro, Porto Alegre',
    descricao: 'Família ilhada em telhado. 5 pessoas, sendo 2 crianças',
    pessoas: 5,
    telefone: '(51) 99999-1111',
    timestamp: new Date('2025-01-20T08:30:00'),
    status: 'pendente'
  },
  {
    id: 'EMG-002',
    tipo: 'medicamentos',
    urgencia: 'alta',
    coordenadas: { lat: -29.7944, lng: -51.1450 },
    endereco: 'Av. Guilherme Schell, 567 - Canoas',
    descricao: 'Diabético sem insulina. Urgente!',
    pessoas: 1,
    telefone: '(51) 98888-2222',
    timestamp: new Date('2025-01-20T09:15:00'),
    status: 'em-atendimento'
  },
  {
    id: 'EMG-003',
    tipo: 'alimentos',
    urgencia: 'media',
    coordenadas: { lat: -29.6868, lng: -51.1049 },
    endereco: 'Rua Lima e Silva, 890 - Novo Hamburgo',
    descricao: 'Família com 8 pessoas sem alimentação há 2 dias',
    pessoas: 8,
    telefone: '(51) 97777-3333',
    timestamp: new Date('2025-01-20T10:00:00'),
    status: 'pendente'
  },
  {
    id: 'EMG-004',
    tipo: 'abrigo',
    urgencia: 'critica',
    coordenadas: { lat: -30.0691, lng: -51.2122 },
    endereco: 'Bairro Sarandi - Porto Alegre',
    descricao: 'Casa destruída pela enchente. Preciso de abrigo para 4 pessoas e 2 cachorros',
    pessoas: 4,
    timestamp: new Date('2025-01-20T07:45:00'),
    status: 'pendente'
  }
];

const voluntariosMock: Voluntario[] = [
  {
    id: 'VOL-001',
    nome: 'Dr. Carlos Silva',
    especialidade: 'medico',
    coordenadas: { lat: -30.0277, lng: -51.2287 },
    disponivel: true,
    telefone: '(51) 99111-1111'
  },
  {
    id: 'VOL-002',
    nome: 'João Santos - Bombeiro',
    especialidade: 'resgate',
    coordenadas: { lat: -29.7800, lng: -51.1500 },
    disponivel: true,
    telefone: '(51) 99222-2222'
  },
  {
    id: 'VOL-003',
    nome: 'Maria Oliveira - Motorista',
    especialidade: 'transporte',
    coordenadas: { lat: -29.6900, lng: -51.1100 },
    disponivel: false,
    telefone: '(51) 99333-3333'
  }
];

const abrigosMock: Abrigo[] = [
  {
    id: 'ABR-001',
    nome: 'Ginásio Tesourinha',
    coordenadas: { lat: -30.0346, lng: -51.2177 },
    capacidade: 500,
    ocupacao: 380,
    disponivel: 120,
    aceitaAnimais: true,
    telefone: '(51) 98765-4321',
    status: 'ativo'
  },
  {
    id: 'ABR-002',
    nome: 'E.E.E.M. Coronel Massot',
    coordenadas: { lat: -29.7944, lng: -51.1450 },
    capacidade: 300,
    ocupacao: 280,
    disponivel: 20,
    aceitaAnimais: true,
    telefone: '(51) 99123-4567',
    status: 'ativo'
  },
  {
    id: 'ABR-003',
    nome: 'Centro de Eventos FIERGS',
    coordenadas: { lat: -30.0691, lng: -51.2122 },
    capacidade: 800,
    ocupacao: 800,
    disponivel: 0,
    aceitaAnimais: true,
    telefone: '(51) 3347-8888',
    status: 'lotado'
  }
];

const areasRiscoMock: AreaRisco[] = [
  {
    id: 'RISK-001',
    tipo: 'inundacao',
    coordenadas: { lat: -30.0400, lng: -51.2200 },
    raio: 1500,
    nivel: 'alto',
    descricao: 'Área próxima ao Rio Guaíba - risco de inundação'
  },
  {
    id: 'RISK-002',
    tipo: 'alagamento',
    coordenadas: { lat: -29.7950, lng: -51.1480 },
    raio: 1000,
    nivel: 'medio',
    descricao: 'Região baixa de Canoas - alagamento'
  }
];

// ==================== ÍCONES CUSTOMIZADOS ====================

const createCustomIcon = (color: string, emoji: string) => {
  return divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 20px;
        ">${emoji}</span>
      </div>
    `,
    className: 'custom-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const icones = {
  emergenciaCritica: createCustomIcon('#DC2626', '🆘'),
  emergenciaAlta: createCustomIcon('#F59E0B', '⚠️'),
  emergenciaMedia: createCustomIcon('#3B82F6', 'ℹ️'),
  voluntarioDisponivel: createCustomIcon('#10B981', '👤'),
  voluntarioOcupado: createCustomIcon('#6B7280', '👤'),
  abrigoAtivo: createCustomIcon('#8B5CF6', '🏠'),
  abrigoLotado: createCustomIcon('#EF4444', '🏠')
};

// ==================== COMPONENTE PRINCIPAL ====================

export default function MapaInterativo() {
  const [filtros, setFiltros] = useState<Filtros>({
    emergencias: true,
    voluntarios: true,
    abrigos: true,
    areasRisco: true,
    apenasCriticas: false,
    apenasDisponiveis: false
  });
  
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarLegenda, setMostrarLegenda] = useState(true);
  const [itemSelecionado, setItemSelecionado] = useState<string | null>(null);
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas | null>(null);

  // Centralização do Rio Grande do Sul
  const centroRS: LatLngExpression = [-29.7, -51.1];

  // Obtém localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalizacaoUsuario({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Geolocalização não disponível')
      );
    }
  }, []);

  // Filtragem de dados
  const dadosFiltrados = useMemo(() => {
    let emg = emergenciasMock;
    let vol = voluntariosMock;
    let abr = abrigosMock;
    const risk = areasRiscoMock;

    if (filtros.apenasCriticas) {
      emg = emg.filter(e => e.urgencia === 'critica');
    }

    if (filtros.apenasDisponiveis) {
      vol = vol.filter(v => v.disponivel);
      abr = abr.filter(a => a.status === 'ativo');
    }

    return {
      emergencias: filtros.emergencias ? emg : [],
      voluntarios: filtros.voluntarios ? vol : [],
      abrigos: filtros.abrigos ? abr : [],
      areasRisco: filtros.areasRisco ? risk : []
    };
  }, [filtros]);

  const getIconeEmergencia = (urgencia: Emergencia['urgencia']) => {
    switch (urgencia) {
      case 'critica': return icones.emergenciaCritica;
      case 'alta': return icones.emergenciaAlta;
      case 'media': return icones.emergenciaMedia;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Painel de Controles */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 hover:bg-gray-50 transition"
        >
          <Filter className="w-5 h-5" />
          Filtros
          {mostrarFiltros ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setMostrarLegenda(!mostrarLegenda)}
          className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 hover:bg-gray-50 transition"
        >
          <Info className="w-5 h-5" />
          Legenda
        </button>
      </div>

      {/* Painel de Filtros */}
      {mostrarFiltros && (
        <div className="absolute top-20 right-4 z-[1000] bg-white rounded-lg shadow-2xl p-6 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Filtros do Mapa</h3>
            <button onClick={() => setMostrarFiltros(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.emergencias}
                onChange={(e) => setFiltros({ ...filtros, emergencias: e.target.checked })}
                className="w-5 h-5 text-red-600"
              />
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Emergências</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.voluntarios}
                onChange={(e) => setFiltros({ ...filtros, voluntarios: e.target.checked })}
                className="w-5 h-5 text-green-600"
              />
              <Users className="w-5 h-5 text-green-600" />
              <span>Voluntários</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.abrigos}
                onChange={(e) => setFiltros({ ...filtros, abrigos: e.target.checked })}
                className="w-5 h-5 text-purple-600"
              />
              <Home className="w-5 h-5 text-purple-600" />
              <span>Abrigos</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.areasRisco}
                onChange={(e) => setFiltros({ ...filtros, areasRisco: e.target.checked })}
                className="w-5 h-5 text-orange-600"
              />
              <Layers className="w-5 h-5 text-orange-600" />
              <span>Áreas de Risco</span>
            </label>

            <hr className="my-4" />

            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.apenasCriticas}
                onChange={(e) => setFiltros({ ...filtros, apenasCriticas: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="text-sm">Apenas emergências críticas</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filtros.apenasDisponiveis}
                onChange={(e) => setFiltros({ ...filtros, apenasDisponiveis: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="text-sm">Apenas disponíveis</span>
            </label>
          </div>
        </div>
      )}

      {/* Legenda */}
      {mostrarLegenda && (
        <div className="absolute bottom-8 left-4 z-[1000] bg-white rounded-lg shadow-2xl p-4 max-w-xs">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Legenda
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span>Emergência Crítica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Emergência Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Emergência Média</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span>Voluntário Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              <span>Abrigo Ativo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-orange-700"></div>
              <span>Área de Risco</span>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas Rápidas */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-bold">{dadosFiltrados.emergencias.length}</span>
            <span className="text-gray-600">Emergências</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            <span className="font-bold">{dadosFiltrados.voluntarios.length}</span>
            <span className="text-gray-600">Voluntários</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-purple-600" />
            <span className="font-bold">{dadosFiltrados.abrigos.length}</span>
            <span className="text-gray-600">Abrigos</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-600" />
            <span className="font-bold">{dadosFiltrados.areasRisco.length}</span>
            <span className="text-gray-600">Áreas Risco</span>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <MapContainer
        center={centroRS}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores de Emergências */}
        {dadosFiltrados.emergencias.map(emg => (
          <Marker
            key={emg.id}
            position={[emg.coordenadas.lat, emg.coordenadas.lng]}
            icon={getIconeEmergencia(emg.urgencia)}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Emergência {emg.tipo.toUpperCase()}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Urgência:</strong> <span className={`
                    ${emg.urgencia === 'critica' ? 'text-red-600 font-bold' : ''}
                    ${emg.urgencia === 'alta' ? 'text-orange-600 font-semibold' : ''}
                    ${emg.urgencia === 'media' ? 'text-blue-600' : ''}
                  `}>{emg.urgencia.toUpperCase()}</span></p>
                  <p><strong>Endereço:</strong> {emg.endereco}</p>
                  <p><strong>Descrição:</strong> {emg.descricao}</p>
                  <p><strong>Pessoas:</strong> {emg.pessoas}</p>
                  {emg.telefone && (
                    <p className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${emg.telefone}`} className="text-blue-600 hover:underline">
                        {emg.telefone}
                      </a>
                    </p>
                  )}
                  <p className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {new Date(emg.timestamp).toLocaleString('pt-BR')}
                  </p>
                  <p><strong>Status:</strong> {emg.status}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Voluntários */}
        {dadosFiltrados.voluntarios.map(vol => (
          <Marker
            key={vol.id}
            position={[vol.coordenadas.lat, vol.coordenadas.lng]}
            icon={vol.disponivel ? icones.voluntarioDisponivel : icones.voluntarioOcupado}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  {vol.nome}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Especialidade:</strong> {vol.especialidade}</p>
                  <p><strong>Status:</strong> <span className={vol.disponivel ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {vol.disponivel ? 'Disponível' : 'Ocupado'}
                  </span></p>
                  <p className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${vol.telefone}`} className="text-blue-600 hover:underline">
                      {vol.telefone}
                    </a>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Abrigos */}
        {dadosFiltrados.abrigos.map(abr => (
          <Marker
            key={abr.id}
            position={[abr.coordenadas.lat, abr.coordenadas.lng]}
            icon={abr.status === 'ativo' ? icones.abrigoAtivo : icones.abrigoLotado}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Home className="w-5 h-5 text-purple-600" />
                  {abr.nome}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Capacidade:</strong> {abr.capacidade} pessoas</p>
                  <p><strong>Ocupação:</strong> {abr.ocupacao} ({((abr.ocupacao/abr.capacidade)*100).toFixed(0)}%)</p>
                  <p><strong>Disponível:</strong> <span className={abr.disponivel > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {abr.disponivel} vagas
                  </span></p>
                  <p><strong>Aceita animais:</strong> {abr.aceitaAnimais ? '✅ Sim' : '❌ Não'}</p>
                  <p className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${abr.telefone}`} className="text-blue-600 hover:underline">
                      {abr.telefone}
                    </a>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Áreas de Risco (Círculos) */}
        {dadosFiltrados.areasRisco.map(risk => (
          <Circle
            key={risk.id}
            center={[risk.coordenadas.lat, risk.coordenadas.lng]}
            radius={risk.raio}
            pathOptions={{
              color: risk.nivel === 'alto' ? '#DC2626' : risk.nivel === 'medio' ? '#F59E0B' : '#3B82F6',
              fillColor: risk.nivel === 'alto' ? '#FEE2E2' : risk.nivel === 'medio' ? '#FEF3C7' : '#DBEAFE',
              fillOpacity: 0.3,
              weight: 2
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold mb-1">Área de Risco: {risk.tipo}</h3>
                <p className="text-sm"><strong>Nível:</strong> {risk.nivel}</p>
                <p className="text-sm">{risk.descricao}</p>
                <p className="text-xs text-gray-500 mt-1">Raio: {risk.raio}m</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Localização do Usuário */}
        {localizacaoUsuario && (
          <Marker position={[localizacaoUsuario.lat, localizacaoUsuario.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  Você está aqui
                </h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
