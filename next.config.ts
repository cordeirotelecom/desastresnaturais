import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configurações otimizadas para o Sistema de Gestão de Desastres */
  
  // Otimizações de Performance
  reactStrictMode: true,
  
  // PWA - Progressive Web App  
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Imagens otimizadas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apitempo.inmet.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'www.snirh.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'queimadas.dgi.inpe.br',
      },
      {
        protocol: 'https',
        hostname: 'www.defesacivil.rs.gov.br',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Redirecionamentos
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

