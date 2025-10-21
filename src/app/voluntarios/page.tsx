import CadastroVoluntarios from '@/components/CadastroVoluntarios';

export const metadata = {
  title: 'Cadastro de Voluntários | Sistema de Desastres RS',
  description: 'Sistema completo de cadastro, gestão e coordenação de voluntários para desastres naturais no Rio Grande do Sul',
};

export default function VoluntariosPage() {
  return <CadastroVoluntarios />;
}
