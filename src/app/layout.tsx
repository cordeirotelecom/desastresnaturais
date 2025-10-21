import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import QuickActions from "../components/QuickActions";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Gestão de Desastres Naturais - RS",
  description: "Plataforma integrada para gestão de emergências, abrigos, voluntários e autoridades. Sistema com IA para previsão e resposta a desastres naturais no Rio Grande do Sul.",
  keywords: "desastres naturais, emergência, enchentes, abrigos, voluntários, defesa civil, Rio Grande do Sul",
  authors: [{ name: "Sistema DHS" }],
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#2563EB',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow">
          {children}
        </main>
        <QuickActions />
        <Footer />
      </body>
    </html>
  );
}
