'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas de SSR com Leaflet
const MapaInterativo = dynamic(
  () => import('../../components/MapaInterativo'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando mapa interativo...</p>
        </div>
      </div>
    )
  }
);

export default function MapaPage() {
  return <MapaInterativo />;
}
