# >_ Under Code | Front-end

A interface oficial da **Under Code**, uma plataforma SaaS de alto padrão (B2B/B2C) focada na venda, gerenciamento e distribuição segura de scripts premium para servidores de FiveM (QBox e QBCore).

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Premium-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Sobre o Projeto

O front-end da Under Code foi arquitetado com foco extremo em **UX/UI premium**, separação rigorosa de domínios (Storefront vs. Back-office) e performance. Utilizando o padrão de design *Linear/Vercel* (Dark mode nativo, bordas sutis de 1px, ausência de sombras pesadas e acentos em verde esmeralda), a plataforma oferece uma experiência fluida tanto para clientes quanto para administradores.

## ✨ Funcionalidades Principais

### 🛍️ Storefront (Área Pública)
- Catálogo dinâmico com sistema de busca e filtros em tempo real.
- Design responsivo de vitrine focado em conversão.
- Proteção contra bots integrada (Cloudflare Turnstile UI ready).
- Roteamento inteligente: Oculta áreas de marketing para usuários já logados.

### 👤 Client Portal (Área do Cliente)
- Dashboard isolado com barra de navegação lateral fixa.
- Gerenciamento de licenças e acesso imediato a downloads.
- Acesso à documentação externa de cada script.
- Configurações de perfil de usuário com UI preparada para Autenticação em 2 Fatores (2FA).

### ⚙️ Admin Command Center (Back-office)
- Rota e layout 100% isolados (`/admin`) para máxima segurança e foco.
- Dashboard financeiro com KPIs (MRR, Clientes Ativos, Taxa de Conversão).
- Gestão completa de Produtos (Upload de imagens via Drag & Drop, controle de preços e frameworks).
- Gestão de Categorias e Histórico de Atividades (Auditoria completa da plataforma).

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + shadcn/ui
- **Ícones:** Lucide React
- **Integração Back-end Prevista:** Nest.js + Supabase (PostgreSQL)
