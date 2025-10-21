# 🚀 Deploy no Vercel

## Passo a Passo

### 1. Acesse a Vercel
Abra: https://vercel.com/new

### 2. Faça Login
- Use sua conta do GitHub (cordeirotelecom)

### 3. Importe o Repositório
- Clique em **"Import Git Repository"**
- Procure por **"desastresnaturais"**
- Clique em **"Import"**

### 4. Configure o Projeto

**Framework Preset:** Next.js (detectado automaticamente)

**Root Directory:** `sistema-novo`

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 5. Variáveis de Ambiente (Opcional)

Se quiser adicionar variáveis de ambiente, clique em **"Environment Variables"** e adicione:

```
NEXT_PUBLIC_APP_NAME=Sistema de Gestão de Desastres - MP-RS
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_APP_ENVIRONMENT=production
```

**Nota:** As APIs governamentais ainda precisam de chaves reais. Por enquanto, o sistema funcionará em modo demonstração.

### 6. Deploy

Clique em **"Deploy"** e aguarde (2-5 minutos)

### 7. Pronto! 🎉

Após o deploy, você receberá:
- **URL de Produção:** `https://desastresnaturais.vercel.app`
- **URL Personalizada:** Você pode configurar um domínio próprio depois

---

## 🔄 Atualizações Automáticas

Cada vez que você fizer um `git push` para o repositório, a Vercel automaticamente:
1. Detecta as mudanças
2. Faz o build
3. Faz o deploy
4. Atualiza o site

---

## 📊 Monitoramento

No painel da Vercel você pode ver:
- ✅ Status dos deploys
- 📈 Analytics (visitantes, páginas)
- ⚡ Performance
- 🐛 Logs de erro

---

## ⚠️ Importante

### Dados em Modo Demonstração
O sistema está configurado para demonstração:
- ✅ **Dados REAIS:** Abrigos, hospitais, documentos, cursos
- ⚠️ **Dados SIMULADOS:** Emergências, voluntários, estatísticas

### Para Produção Completa
Leia: `DADOS-FICTICIOS-VS-REAIS.md` para implementar:
- APIs governamentais (INMET, ANA, INPE)
- Banco de dados PostgreSQL
- Autenticação NextAuth
- Sistema de IA treinado

---

## 🆘 Problemas?

### Build Failed?
1. Verifique se o **Root Directory** está como `sistema-novo`
2. Certifique-se que o Node.js é versão 18+
3. Confira os logs de build na Vercel

### Página em Branco?
1. Aguarde 2-3 minutos após o deploy
2. Limpe o cache do navegador (Ctrl+Shift+R)
3. Verifique os logs da Vercel

---

## 📞 Suporte

- **Documentação Vercel:** https://vercel.com/docs
- **Documentação Next.js:** https://nextjs.org/docs
- **Status Vercel:** https://www.vercel-status.com/

---

**Última Atualização:** 21 de outubro de 2025  
**Versão:** 2.0  
**Status:** ✅ Pronto para Deploy
