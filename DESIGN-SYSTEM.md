# 🎨 Sistema de Design Harmônico
## Plataforma de Gestão de Desastres Naturais v2.0

---

## 📐 Fundamentos do Design System

### Princípios de Design
1. **Harmonia Visual** - Todos os elementos seguem padrões consistentes
2. **Hierarquia Clara** - Informações organizadas por importância
3. **Acessibilidade** - Contraste adequado e navegação por teclado
4. **Responsividade** - Adaptável a todos os tamanhos de tela
5. **Performance** - Transições suaves e otimizadas

---

## 🎨 Paleta de Cores

### Cores Primárias
```css
--primary-500: #3b82f6  /* Azul Principal - Confiança */
--primary-600: #2563eb  /* Azul Escuro - Profissionalismo */
--primary-700: #1d4ed8  /* Azul Muito Escuro */
```

### Cores Secundárias
```css
--secondary-500: #a855f7  /* Roxo - Inovação e IA */
--secondary-600: #9333ea  /* Roxo Escuro */
--secondary-700: #7e22ce  /* Roxo Muito Escuro */
```

### Cores Semânticas
```css
--success: #10b981       /* Verde - Sucesso */
--warning: #f59e0b       /* Amarelo - Atenção */
--error: #ef4444         /* Vermelho - Erro */
--info: #06b6d4          /* Ciano - Informação */
```

### Cores de Emergência
```css
--emergency-critical: #dc2626   /* Vermelho - Crítico */
--emergency-high: #ea580c       /* Laranja - Alta */
--emergency-medium: #f59e0b     /* Amarelo - Média */
--emergency-low: #84cc16        /* Verde - Baixa */
```

---

## 📝 Tipografia

### Hierarquia de Títulos
```css
.heading-1 { font-size: 3rem; font-weight: 800; }      /* 48px */
.heading-2 { font-size: 2.25rem; font-weight: 700; }   /* 36px */
.heading-3 { font-size: 1.875rem; font-weight: 700; }  /* 30px */
.heading-4 { font-size: 1.5rem; font-weight: 600; }    /* 24px */
.heading-5 { font-size: 1.25rem; font-weight: 600; }   /* 20px */
```

### Corpo de Texto
```css
.text-lead { font-size: 1.125rem; }  /* 18px - Destaque */
.text-body { font-size: 1rem; }      /* 16px - Padrão */
.text-small { font-size: 0.875rem; } /* 14px - Secundário */
.text-tiny { font-size: 0.75rem; }   /* 12px - Mínimo */
```

---

## 🃏 Sistema de Cards

### Card Base
```tsx
<div className="card-base">
  {/* Conteúdo */}
</div>
```

### Card com Hover
```tsx
<div className="card-hover">
  {/* Levanta ao passar o mouse */}
</div>
```

### Card Premium
```tsx
<div className="card-premium">
  {/* Efeito de barra superior no hover */}
</div>
```

### Card Interativo
```tsx
<div className="card-interactive">
  {/* Escala ao passar o mouse */}
</div>
```

---

## 🔘 Sistema de Botões

### Botões Principais
```tsx
<button className="btn-base btn-primary">Primário</button>
<button className="btn-base btn-secondary">Secundário</button>
<button className="btn-base btn-outline">Outline</button>
<button className="btn-base btn-ghost">Ghost</button>
```

### Botões de Ação
```tsx
<button className="btn-base btn-success">Sucesso</button>
<button className="btn-base btn-danger">Perigo</button>
<button className="btn-base btn-warning">Atenção</button>
```

### Tamanhos
```tsx
<button className="btn-base btn-primary btn-sm">Pequeno</button>
<button className="btn-base btn-primary">Normal</button>
<button className="btn-base btn-primary btn-lg">Grande</button>
```

---

## 🏷️ Badges

### Badges de Status
```tsx
<span className="badge badge-primary">Primário</span>
<span className="badge badge-success">Sucesso</span>
<span className="badge badge-warning">Atenção</span>
<span className="badge badge-danger">Perigo</span>
<span className="badge badge-info">Informação</span>
```

### Badge Outline
```tsx
<span className="badge badge-outline badge-primary">Outline</span>
```

---

## 📥 Inputs

### Input Base
```tsx
<input 
  type="text" 
  className="input-base" 
  placeholder="Digite aqui..."
/>
```

### Input com Estados
```tsx
<input className="input-base input-error" />   {/* Erro */}
<input className="input-base input-success" /> {/* Sucesso */}
```

---

## 🚨 Alertas

### Tipos de Alerta
```tsx
<div className="alert alert-success">
  <Icon /> <span>Operação realizada com sucesso!</span>
</div>

<div className="alert alert-warning">
  <Icon /> <span>Atenção: verifique os dados.</span>
</div>

<div className="alert alert-error">
  <Icon /> <span>Erro ao processar a solicitação.</span>
</div>

<div className="alert alert-info">
  <Icon /> <span>Nova atualização disponível.</span>
</div>
```

---

## ✨ Efeitos Glass

### Glassmorphism
```tsx
<div className="glass">
  {/* Efeito vidro sutil */}
</div>

<div className="glass-dark">
  {/* Efeito vidro mais opaco */}
</div>
```

---

## 🎭 Animações

### Animações Disponíveis
```tsx
<div className="animate-fade-in">Fade In</div>
<div className="animate-slide-in">Slide In</div>
<div className="animate-pulse">Pulse</div>
<div className="animate-bounce-slow">Bounce</div>
```

---

## 📐 Espaçamentos

### Sistema de Spacing
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

---

## 🎯 Bordas Arredondadas

### Radii System
```css
--radius-xs: 0.25rem;    /* 4px */
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-3xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Circular */
```

---

## 🌊 Sombras

### Shadow System
```css
--shadow-xs: Mínima
--shadow-sm: Pequena
--shadow-md: Média
--shadow-lg: Grande
--shadow-xl: Extra Grande
--shadow-2xl: Máxima
--shadow-colored-blue: Azul com sombra
--shadow-colored-purple: Roxa com sombra
```

---

## 🎨 Gradientes

### Gradientes Pré-definidos
```css
.bg-gradient-primary      /* Azul */
.bg-gradient-secondary    /* Roxo */
.bg-gradient-hero        /* Azul degradê */

.gradient-text           /* Texto com gradiente azul */
.gradient-text-purple    /* Texto com gradiente roxo */
.gradient-text-hero      /* Texto com gradiente hero */
```

---

## 📦 Containers

### Container System
```tsx
<div className="container-responsive">  {/* 1280px max */}
<div className="container-narrow">      {/* 960px max */}
<div className="container-wide">        {/* 1536px max */}
```

---

## 🎯 Boas Práticas

### ✅ FAZER:
- Usar as classes CSS predefinidas
- Manter consistência visual
- Seguir a hierarquia de cores
- Usar transições suaves
- Aplicar espaçamentos harmônicos

### ❌ NÃO FAZER:
- Criar cores customizadas fora do sistema
- Usar inline styles aleatórios
- Misturar tamanhos de fonte inconsistentes
- Ignorar estados de hover/focus
- Usar múltiplos estilos de cards na mesma página

---

## 🚀 Exemplos de Uso

### Card de Funcionalidade
```tsx
<div className="card-premium">
  <div className="flex items-center gap-4 mb-4">
    <Brain className="w-12 h-12 text-primary-600" />
    <div>
      <h3 className="heading-4">Monitoramento IA</h3>
      <p className="text-small text-secondary">85% de precisão</p>
    </div>
  </div>
  <p className="text-body mb-4">
    Sistema de previsão com 12h de antecedência usando Machine Learning.
  </p>
  <button className="btn-base btn-primary w-full">
    Acessar <ArrowRight />
  </button>
</div>
```

### Alerta de Emergência
```tsx
<div className="alert alert-error">
  <AlertTriangle className="w-6 h-6" />
  <div>
    <h4 className="font-bold mb-1">Alerta Crítico</h4>
    <p className="text-sm">Risco de enchente nas próximas 6 horas.</p>
  </div>
</div>
```

### Badge de Status
```tsx
<div className="flex gap-2">
  <span className="badge badge-danger">🔴 Crítico</span>
  <span className="badge badge-warning">🟡 Atenção</span>
  <span className="badge badge-success">🟢 Normal</span>
</div>
```

---

## 📱 Responsividade

### Breakpoints Tailwind
```css
sm: 640px   /* Mobile grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeno */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop extra grande */
```

### Exemplo Responsivo
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 coluna, Tablet: 2 colunas, Desktop: 3 colunas */}
</div>
```

---

## ✨ Resumo

Este Design System garante:
- ✅ **Consistência visual** em toda a plataforma
- ✅ **Hierarquia clara** de informações
- ✅ **Componentes reutilizáveis** e escaláveis
- ✅ **Performance otimizada** com transições suaves
- ✅ **Acessibilidade** com contraste adequado
- ✅ **Manutenibilidade** facilitada

**Use este sistema para manter a plataforma harmônica e profissional!** 🎨✨
