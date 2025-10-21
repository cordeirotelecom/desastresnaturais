import type { Metadata } from 'next';
import DashboardGovernamental from '@/components/DashboardGovernamental';

export const metadata: Metadata = {
  title: 'Integração Governamental | Sistema de Desastres RS',
  description: 'Dashboard unificado de integração com S2ID (Federal), SEGIRD (Estadual), Serviço Geológico do Brasil, monitoramento de rios, legislação, DAT, recursos financeiros e metodologia DHS para gestão de desastres naturais',
  keywords: [
    'S2ID',
    'SEGIRD',
    'Serviço Geológico',
    'Defesa Civil',
    'SEDEC',
    'Decretos',
    'DAT',
    'Transferência Fundo a Fundo',
    'Boas Práticas',
    'DHS',
    'Desenvolvimento Harmônico Sustentável',
    'Monitoramento de Rios',
    'Áreas de Risco',
    'DACA',
    'P2R2'
  ]
};

export default function GovernamentalPage() {
  return <DashboardGovernamental />;
}
