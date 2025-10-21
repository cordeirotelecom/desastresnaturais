# 🔍 DADOS FICTÍCIOS VS REAIS
## Sistema Integrado de Gestão de Desastres Naturais

---

## ⚠️ AVISO IMPORTANTE

Este documento identifica **TODOS** os dados e integrações que são **FICTÍCIOS/SIMULADOS** versus **REAIS** na plataforma.

**Última atualização:** 21 de outubro de 2025

---

## ✅ DADOS REAIS - FUNCIONANDO

### **1. Localizações Geográficas (100% REAIS)**
📂 Arquivo: `src/data/real-locations.ts`

#### ✅ Abrigos (30+ cadastrados)
- **Fonte:** Dados reais da Defesa Civil RS coletados durante enchentes de 2024
- **Informações:** Nome, endereço completo, coordenadas GPS, capacidade, vagas
- **Status:** ✅ DADOS REAIS VERIFICADOS

**Exemplos:**
- Ginásio Tesourinha - Porto Alegre (Capacidade: 500)
- Arena do Grêmio - Porto Alegre (Capacidade: 1000)
- Estádio Beira-Rio - Porto Alegre (Capacidade: 800)
- 27+ outros abrigos reais com dados verificados

#### ✅ Hospitais (20+ cadastrados)
- **Fonte:** Cadastro Nacional de Estabelecimentos de Saúde (CNES)
- **Informações:** Nome, endereço, coordenadas, especialidades
- **Status:** ✅ DADOS REAIS DO SISTEMA DE SAÚDE

**Exemplos:**
- Hospital de Clínicas de Porto Alegre
- Hospital São Lucas da PUCRS
- Hospital Mãe de Deus
- 17+ outros hospitais reais

#### ✅ Pontos de Doação (15+ cadastrados)
- **Fonte:** Locais verificados durante campanha de doações 2024
- **Informações:** Nome, endereço, coordenadas, tipos aceitos
- **Status:** ✅ LOCAIS REAIS VERIFICADOS

---

### **2. Recursos Oficiais e Documentação**
📂 Arquivo: `src/data/recursos-oficiais.ts`

#### ✅ Documentos Oficiais (50+ links reais)
- **Ministério Público:** Manuais, recomendações, protocolos
- **Defesa Civil Nacional:** Leis, políticas, documentos técnicos
- **CENAD:** Protocolos S2iD, manuais operacionais
- **INMET/ANA/INPE:** Documentação técnica
- **Status:** ✅ TODOS OS LINKS SÃO REAIS E FUNCIONAIS

**Categorias:**
- Documentos do MP (10+)
- Documentos da Defesa Civil (15+)
- Protocolos CENAD (8+)
- Manuais técnicos INMET/ANA (12+)
- Cartilhas educativas (10+)

#### ✅ Cursos de Capacitação (30+ cursos reais)
- **Plataformas:** AVACED, ENAP, SENAD, Defesa Civil
- **Gratuitos:** 28 cursos 100% gratuitos com certificado
- **Status:** ✅ TODOS OS CURSOS EXISTEM E ESTÃO DISPONÍVEIS

**Exemplos:**
- AVACED - Capacitação Básica em Defesa Civil (40h)
- ENAP - Gestão de Riscos e Desastres (20h)
- SENAD - Primeira Resposta em Desastres (30h)
- 27+ outros cursos reais

#### ✅ Contatos de Emergência
- **Defesa Civil:** 199 (real)
- **Bombeiros:** 193 (real)
- **SAMU:** 192 (real)
- **Polícia:** 190 (real)
- **PRF:** 191 (real)
- **Status:** ✅ TELEFONES OFICIAIS REAIS

---

### **3. Casos de Sucesso Mundiais**
📂 Arquivo: `src/data/casos-sucesso-mundial.ts`

#### ✅ Exemplos Internacionais (15+ casos)
- **Países:** Japão, Holanda, Nova Zelândia, EUA, Chile, etc.
- **Informações:** Sistemas reais, tecnologias, resultados comprovados
- **Fontes:** ONU, Banco Mundial, estudos acadêmicos
- **Status:** ✅ CASOS REAIS E DOCUMENTADOS

---

## ❌ DADOS FICTÍCIOS - SIMULADOS

### **1. APIs Meteorológicas (SIMULADAS)**
📂 Arquivo: `src/lib/api-service.ts`

#### ❌ INMET Service
```typescript
// CÓDIGO ATUAL: Dados simulados
static async getStationsRS(): Promise<WeatherStation[]> {
  return this.getMockWeatherData(); // ❌ MOCK
}
```

**Status:** ❌ AGUARDANDO CHAVE DE API DO INMET
- **API Real:** https://apitempo.inmet.gov.br
- **Requisito:** Chave de API do governo
- **Custo:** Gratuita mediante cadastro institucional
- **Ação Necessária:** Solicitar credenciais ao INMET

#### ❌ ANA Service (Níveis de Rios)
```typescript
// CÓDIGO ATUAL: Dados simulados
static async getRiverLevelsRS(): Promise<RiverLevel[]> {
  return this.getMockRiverData(); // ❌ MOCK
}
```

**Status:** ❌ AGUARDANDO CHAVE DE API DA ANA
- **API Real:** https://www.snirh.gov.br/hidroweb/rest/api
- **Requisito:** Credenciais institucionais
- **Custo:** Gratuita para órgãos públicos
- **Ação Necessária:** Solicitar acesso via convenio

#### ❌ INPE Service (Focos de Incêndio)
**Status:** ❌ NÃO IMPLEMENTADO
- **API Real:** https://queimadas.dgi.inpe.br/queimadas/dados-abertos/api
- **Requisito:** Cadastro institucional
- **Custo:** Gratuita
- **Ação Necessária:** Implementar integração

---

### **2. Previsão com IA (SIMULADA)**
📂 Arquivos: `src/app/monitoramento/page.tsx`

#### ❌ Sistema de IA Preditiva
**Status:** ❌ ALGORITMO NÃO TREINADO
- **Promessa:** 85% de precisão com 12h de antecedência
- **Realidade:** Interface pronta, mas IA não treinada
- **Requisito:** 
  - Dados históricos de 5+ anos
  - Servidor com GPU para treinamento
  - Modelo TensorFlow.js treinado
- **Ação Necessária:** 
  1. Coletar dados históricos de desastres
  2. Treinar modelo de machine learning
  3. Validar com dados reais
  4. Deploy do modelo treinado

---

### **3. Sistema de Emergências (PARCIALMENTE SIMULADO)**
📂 Arquivos: Componentes de emergência

#### ⚠️ Registro de Emergências
**Status:** ⚠️ FUNCIONAL MAS SEM BACKEND
- **Frontend:** ✅ Formulário completo e funcional
- **Backend:** ❌ Dados salvos apenas em localStorage
- **Integração:** ❌ Não conectado com Defesa Civil
- **Ação Necessária:**
  1. Criar banco de dados PostgreSQL
  2. Implementar API REST
  3. Integrar com Sistema S2iD da Defesa Civil
  4. Sistema de notificações para autoridades

#### ⚠️ Gestão de Emergências
**Status:** ⚠️ INTERFACE PRONTA, DADOS MOCK
- **Dashboard:** ✅ Interface profissional
- **Dados:** ❌ Emergências simuladas para demonstração
- **Ação Necessária:** Conectar com banco de dados real

---

### **4. Sistema de Voluntários (SIMULADO)**
📂 Arquivo: `src/components/RegistroAtividades.tsx`

#### ❌ Cadastro e Atividades
```typescript
// CÓDIGO ATUAL
const mockActivities: ActivityLog[] = [ /* dados fake */ ];
```

**Status:** ❌ COMPLETAMENTE SIMULADO
- **Cadastro:** Frontend funcional, sem backend
- **Atividades:** Dados fictícios
- **Horas:** Cálculos simulados
- **Ação Necessária:**
  1. Banco de dados para voluntários
  2. Sistema de autenticação real
  3. Integração com órgãos (Defesa Civil, bombeiros)
  4. App mobile para check-in/check-out

---

### **5. Sistema de Doações (PARCIALMENTE SIMULADO)**
📂 Arquivo: `src/app/doacoes/page.tsx`

#### ⚠️ Gestão de Doações
**Status:** ⚠️ INTERFACE PRONTA, SEM INTEGRAÇÃO
- **Registro:** ✅ Formulário funcional
- **Rastreamento:** ❌ Não conectado com logística real
- **Distribuição:** ❌ Não integrado com centros de distribuição
- **Ação Necessária:**
  1. Integrar com sistema de estoque
  2. QR Codes para rastreamento
  3. API de logística
  4. Notificações para doadores

---

### **6. Chat e WhatsApp Bot (DEMONSTRAÇÃO)**
📂 Arquivos: `src/components/ChatGlobal.tsx`, `src/components/WhatsAppBot.tsx`

#### ❌ Chat em Tempo Real
**Status:** ❌ INTERFACE DE DEMONSTRAÇÃO
- **UI:** ✅ Design profissional
- **Backend:** ❌ Sem servidor WebSocket
- **Mensagens:** ❌ Não são salvas
- **Ação Necessária:**
  1. Servidor Socket.io ou Firebase
  2. Autenticação de usuários
  3. Histórico de mensagens
  4. Moderação automática

#### ❌ WhatsApp Bot
**Status:** ❌ MOCKUP VISUAL APENAS
- **Interface:** ✅ Demonstração do conceito
- **Integração:** ❌ Não conectado com WhatsApp Business API
- **Bot:** ❌ Não existe processamento real
- **Ação Necessária:**
  1. Conta WhatsApp Business API
  2. Servidor Node.js com Twilio/WhatsApp API
  3. Processamento de linguagem natural
  4. Integração com sistema de emergências

---

### **7. Relatórios e Analytics (DADOS MOCK)**
📂 Arquivo: `src/components/Relatorios.tsx`

#### ❌ Dashboards e Relatórios
```typescript
// CÓDIGO ATUAL: Linha 58
// ==================== DADOS MOCKADOS ====================
```

**Status:** ❌ TODOS OS GRÁFICOS SÃO FICTÍCIOS
- **Métricas:** Números aleatórios
- **Gráficos:** Dados simulados
- **Exportação:** Não funcional
- **Ação Necessária:**
  1. Conectar com banco de dados real
  2. Implementar queries analíticas
  3. Sistema de exportação (PDF/Excel)
  4. Cache de relatórios pesados

---

### **8. Autenticação (SIMPLIFICADA)**
📂 Arquivo: `src/services/auth.ts`

#### ⚠️ Sistema de Login
**Status:** ⚠️ FUNCIONAL MAS SEM SEGURANÇA REAL
- **Frontend:** ✅ Login/Registro funcionam
- **Backend:** ❌ Usuários salvos em localStorage
- **Segurança:** ❌ Sem criptografia real
- **Sessões:** ❌ Não persistem entre dispositivos
- **Ação Necessária:**
  1. Backend com JWT ou NextAuth
  2. Banco de dados de usuários
  3. Criptografia bcrypt
  4. OAuth para login social
  5. 2FA para administradores

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO REAL

### **PRIORIDADE CRÍTICA** 🔴

- [ ] **Backend PostgreSQL/MongoDB**
  - Banco de dados para emergências
  - Banco de dados para voluntários
  - Banco de dados para doações
  - Sistema de usuários real

- [ ] **Autenticação Real**
  - NextAuth.js ou Auth0
  - JWT para sessões
  - Roles e permissões
  - 2FA para administradores

- [ ] **APIs Governamentais**
  - Solicitar chave INMET
  - Solicitar chave ANA
  - Solicitar chave INPE
  - Integrar com S2iD (Defesa Civil)

### **PRIORIDADE ALTA** 🟠

- [ ] **Sistema de IA Real**
  - Coletar dados históricos (5+ anos)
  - Treinar modelo TensorFlow
  - Validar com dados reais
  - Deploy em servidor com GPU

- [ ] **Notificações Push**
  - Firebase Cloud Messaging
  - WebPush para navegador
  - SMS para emergências críticas
  - E-mail para alertas

- [ ] **Geolocalização Real**
  - GPS do dispositivo
  - Cálculo de rotas (Google Maps API)
  - Geocoding de endereços
  - Área de risco em tempo real

### **PRIORIDADE MÉDIA** 🟡

- [ ] **Chat em Tempo Real**
  - Servidor Socket.io ou Firebase
  - Salas por emergência
  - Histórico de mensagens
  - Upload de fotos

- [ ] **WhatsApp Bot**
  - WhatsApp Business API
  - NLP para comandos
  - Integração com emergências
  - Notificações automáticas

- [ ] **Sistema de Doações**
  - QR Codes
  - Rastreamento logístico
  - Integração com centros
  - Relatórios para doadores

### **PRIORIDADE BAIXA** 🟢

- [ ] **Analytics Avançado**
  - Dashboard administrativo
  - Exportação de relatórios
  - Gráficos em tempo real
  - Machine Learning para insights

- [ ] **App Mobile Nativo**
  - React Native
  - Notificações push nativas
  - Modo offline
  - GPS em background

---

## 💰 ESTIMATIVA DE CUSTOS

### **APIs Gratuitas (Órgãos Públicos)**
- INMET: Gratuito (requer cadastro institucional)
- ANA: Gratuito (convenio institucional)
- INPE: Gratuito (cadastro institucional)
- **Custo:** R$ 0,00

### **Infraestrutura Mínima**
- Servidor VPS (8GB RAM, 4 CPU): ~R$ 200/mês
- Banco de dados PostgreSQL (managed): ~R$ 150/mês
- CDN e Storage: ~R$ 100/mês
- **Total:** ~R$ 450/mês

### **Infraestrutura Completa (com IA)**
- Servidor GPU para IA: ~R$ 800/mês
- Banco de dados robusto: ~R$ 300/mês
- CDN e Storage: ~R$ 200/mês
- Backup e segurança: ~R$ 150/mês
- **Total:** ~R$ 1.450/mês

### **Serviços Terceiros**
- WhatsApp Business API: ~R$ 0,01/mensagem
- SMS (emergências): ~R$ 0,15/SMS
- Google Maps API: ~R$ 7,00/1000 requests
- Firebase (notificações): Gratuito até 10k/mês

---

## 🎯 ROADMAP DE IMPLEMENTAÇÃO

### **FASE 1: Fundação (1-2 meses)**
1. ✅ Design system profissional
2. ✅ Estrutura de componentes
3. ✅ Navegação organizada
4. ⏳ Backend básico (PostgreSQL + API)
5. ⏳ Autenticação real (NextAuth)
6. ⏳ Deploy em produção

### **FASE 2: Integrações Críticas (2-3 meses)**
1. ⏳ APIs governamentais (INMET, ANA, INPE)
2. ⏳ Sistema S2iD (Defesa Civil)
3. ⏳ Geolocalização e mapas
4. ⏳ Notificações push
5. ⏳ Sistema de emergências real

### **FASE 3: IA e Automação (3-4 meses)**
1. ⏳ Coleta de dados históricos
2. ⏳ Treinamento do modelo de IA
3. ⏳ Validação e testes
4. ⏳ WhatsApp Bot funcional
5. ⏳ Chat em tempo real

### **FASE 4: Expansão (4-6 meses)**
1. ⏳ App mobile nativo
2. ⏳ Analytics avançado
3. ⏳ Integrações internacionais
4. ⏳ Modelo de DHS mundial

---

## 📞 CONTATOS PARA INTEGRAÇÕES

### **APIs Meteorológicas**
- **INMET:** api@inmet.gov.br
- **ANA:** snirh@ana.gov.br
- **INPE:** queimadas@inpe.br

### **Defesa Civil**
- **Nacional (CENAD):** cenad@mdr.gov.br
- **Rio Grande do Sul:** defesacivil@seapdr.rs.gov.br

### **Ministério Público**
- **MP-RS:** gabinete.pgj@mprs.mp.br

---

## ⚖️ DISCLAIMER LEGAL

> **IMPORTANTE:** Esta plataforma está em fase de **demonstração e desenvolvimento**. Os dados de emergências, voluntários e algumas estatísticas são **SIMULADOS** para fins de teste e validação da interface. 
> 
> Os dados de **abrigos, hospitais e pontos de doação são REAIS** e verificados.
> 
> Para uso em produção, é **OBRIGATÓRIO** implementar todas as integrações com sistemas governamentais e backends reais conforme descrito neste documento.

---

**Versão:** 1.0  
**Data:** 21 de outubro de 2025  
**Responsável:** Sistema de Gestão de Desastres - MP-RS
