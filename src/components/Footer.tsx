'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Twitter, Facebook,
  Instagram, Linkedin, Heart, Shield, AlertTriangle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-600 rounded-lg p-2">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Sistema DHS</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Plataforma integrada de gestão de desastres naturais com IA. 
              Modelo mundial para Desenvolvimento Harmônico Sustentável.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/registro-emergencia" className="text-gray-300 hover:text-white transition">
                  → Registrar Emergência
                </Link>
              </li>
              <li>
                <Link href="/abrigos" className="text-gray-300 hover:text-white transition">
                  → Encontrar Abrigo
                </Link>
              </li>
              <li>
                <Link href="/voluntarios" className="text-gray-300 hover:text-white transition">
                  → Ser Voluntário
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-gray-300 hover:text-white transition">
                  → Mapa Interativo
                </Link>
              </li>
              <li>
                <Link href="/alertas" className="text-gray-300 hover:text-white transition">
                  → Alertas Ativos
                </Link>
              </li>
              <li>
                <Link href="/autoridades" className="text-gray-300 hover:text-white transition">
                  → Portal Autoridades
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatos Emergenciais */}
          <div>
            <h3 className="font-bold text-lg mb-4">Emergência</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:199" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="font-semibold">Defesa Civil</p>
                    <p className="text-xs text-gray-400">199</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:193" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <Phone className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="font-semibold">Bombeiros</p>
                    <p className="text-xs text-gray-400">193</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:192" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-semibold">SAMU</p>
                    <p className="text-xs text-gray-400">192</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:190" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Polícia Militar</p>
                    <p className="text-xs text-gray-400">190</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-300">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>contato@sistema-desastres.rs.gov.br</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>(51) 3210-4000</p>
                  <p className="text-xs text-gray-400">Seg-Sex: 8h às 18h</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>Porto Alegre, RS</p>
                  <p className="text-xs text-gray-400">Brasil</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>© {currentYear} Sistema de Gestão de Desastres Naturais - Rio Grande do Sul</p>
              <p className="text-xs mt-1">
                Desenvolvido com <Heart className="w-3 h-3 inline text-red-500" /> para salvar vidas
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full text-xs">
                <Shield className="w-3 h-3" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-green-800 px-3 py-1 rounded-full text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-800 px-3 py-1 rounded-full text-xs">
                <span>🤖 IA</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-400">
            <Link href="/privacidade" className="hover:text-white transition">
              Política de Privacidade
            </Link>
            <span>•</span>
            <Link href="/termos" className="hover:text-white transition">
              Termos de Uso
            </Link>
            <span>•</span>
            <Link href="/acessibilidade" className="hover:text-white transition">
              Acessibilidade
            </Link>
            <span>•</span>
            <Link href="/lgpd" className="hover:text-white transition">
              LGPD
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Bottom Bar */}
      <div className="bg-red-600 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-sm font-semibold">
            🆘 Em caso de emergência, ligue: <a href="tel:199" className="underline hover:no-underline">199 (Defesa Civil)</a> ou <a href="tel:193" className="underline hover:no-underline">193 (Bombeiros)</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
