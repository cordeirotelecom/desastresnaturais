import NoticiasDesastres from '@/components/NoticiasDesastres';

export const metadata = {
  title: 'Notícias em Tempo Real | Sistema de Desastres RS',
  description: 'Acompanhe as últimas notícias sobre desastres naturais no Rio Grande do Sul em tempo real',
};

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <NoticiasDesastres />
      </div>
    </div>
  );
}
