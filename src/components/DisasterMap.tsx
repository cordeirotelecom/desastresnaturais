'use client';

import React from 'react';

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'alert' | 'hospital' | 'shelter' | 'supply';
  name: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

interface DisasterMapProps {
  points?: MapPoint[];
}

export default function DisasterMap({ points = [] }: DisasterMapProps) {
  // Dados de exemplo para o Rio Grande do Sul
  const defaultPoints: MapPoint[] = [
    { id: '1', lat: -30.0346, lng: -51.2177, type: 'alert', name: 'Porto Alegre - Alerta Enchente', severity: 'high' },
    { id: '2', lat: -29.1634, lng: -51.1797, type: 'alert', name: 'Canela - Alerta Deslizamento', severity: 'medium' },
    { id: '3', lat: -29.6878, lng: -53.8069, type: 'hospital', name: 'Hospital Santa Cruz' },
    { id: '4', lat: -30.0318, lng: -51.2065, type: 'shelter', name: 'Abrigo Municipal Centro' },
    { id: '5', lat: -29.3628, lng: -50.8762, type: 'alert', name: 'Vale do Taquari - Alerta Crítico', severity: 'critical' },
  ];

  const mapPoints = points.length > 0 ? points : defaultPoints;

  const getMarkerColor = (point: MapPoint) => {
    if (point.type === 'alert') {
      switch (point.severity) {
        case 'critical': return 'bg-red-600';
        case 'high': return 'bg-orange-500';
        case 'medium': return 'bg-yellow-500';
        default: return 'bg-blue-500';
      }
    }
    if (point.type === 'hospital') return 'bg-green-600';
    if (point.type === 'shelter') return 'bg-purple-600';
    return 'bg-gray-600';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return '⚠️';
      case 'hospital': return '🏥';
      case 'shelter': return '🏠';
      case 'supply': return '📦';
      default: return '📍';
    }
  };

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg relative overflow-hidden border-2 border-gray-300">
      {/* Mapa SVG simplificado do Rio Grande do Sul */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50">
          {/* Grid de fundo */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Contorno simplificado do RS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-gray-300 font-bold opacity-30">RS</div>
          </div>

          {/* Pontos no mapa */}
          {mapPoints.map((point) => {
            // Normalizar coordenadas para o container
            const x = ((point.lng + 54) / 8) * 100; // Aproximação para RS
            const y = ((point.lat + 33) / 5) * 100;

            return (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                {/* Marcador */}
                <div className={`${getMarkerColor(point)} w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-125 transition-transform animate-pulse`}>
                  <span className="text-sm">{getIcon(point.type)}</span>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-xl">
                    <p className="font-semibold">{point.name}</p>
                    {point.severity && (
                      <p className="text-yellow-300 capitalize">Nível: {point.severity}</p>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>

                {/* Ondas de alerta para pontos críticos */}
                {point.severity === 'critical' && (
                  <>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
              </div>
            );
          })}

          {/* Legenda */}
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg shadow-lg p-3 text-xs">
            <h4 className="font-bold mb-2 text-gray-800">Legenda</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>Alerta Crítico</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Alerta Alto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Alerta Médio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>Hospital</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span>Abrigo</span>
              </div>
            </div>
          </div>

          {/* Contador de pontos */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg shadow-lg p-3">
            <h4 className="font-bold text-gray-800">Monitoramento Ativo</h4>
            <p className="text-2xl font-bold text-blue-600">{mapPoints.length}</p>
            <p className="text-xs text-gray-600">pontos monitorados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
