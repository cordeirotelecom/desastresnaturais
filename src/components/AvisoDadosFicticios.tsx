export interface AvisoDadosFicticiosProps {
  tipo?: 'warning' | 'info' | 'danger';
  mensagem?: string;
  tamanho?: 'small' | 'medium' | 'large';
}

export default function AvisoDadosFicticios({ 
  tipo = 'warning',
  mensagem = 'Estes dados são FICTÍCIOS e utilizados apenas para demonstração do sistema.',
  tamanho = 'medium'
}: AvisoDadosFicticiosProps) {
  const cores = {
    warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
    info: 'bg-blue-500/20 border-blue-500 text-blue-300',
    danger: 'bg-red-500/20 border-red-500 text-red-300'
  };

  const tamanhos = {
    small: 'text-xs p-2',
    medium: 'text-sm p-4',
    large: 'text-base p-6'
  };

  const icones = {
    warning: '⚠️',
    info: 'ℹ️',
    danger: '🚨'
  };

  return (
    <div className={`${cores[tipo]} ${tamanhos[tamanho]} border-2 rounded-lg flex items-start gap-3`}>
      <span className="text-2xl flex-shrink-0">{icones[tipo]}</span>
      <div>
        <p className="font-bold mb-1">
          {tipo === 'warning' && 'DADOS FICTÍCIOS - DEMONSTRAÇÃO'}
          {tipo === 'info' && 'INFORMAÇÃO IMPORTANTE'}
          {tipo === 'danger' && 'ATENÇÃO: DADOS NÃO REAIS'}
        </p>
        <p className="opacity-90">{mensagem}</p>
      </div>
    </div>
  );
}

// Variações específicas para uso rápido
export function AvisoDadosReais({ mensagem = 'Estes dados são REAIS e atualizados do Rio Grande do Sul.' }: { mensagem?: string }) {
  return (
    <div className="bg-green-500/20 border-2 border-green-500 text-green-300 text-sm p-4 rounded-lg flex items-start gap-3">
      <span className="text-2xl flex-shrink-0">✅</span>
      <div>
        <p className="font-bold mb-1">DADOS REAIS VERIFICADOS</p>
        <p className="opacity-90">{mensagem}</p>
      </div>
    </div>
  );
}

export function AvisoDemonstracao() {
  return (
    <AvisoDadosFicticios 
      tipo="warning"
      mensagem="Sistema em demonstração. Os dados de emergências, voluntários e algumas estatísticas são simulados para fins de teste. Os dados de abrigos, hospitais e pontos de doação são REAIS do Rio Grande do Sul."
      tamanho="large"
    />
  );
}
