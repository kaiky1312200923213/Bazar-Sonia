# Bazar da Sônia — Catálogo Online

**Autor do projeto:** Kaiky Yoshio Ono Marins  
**Categoria:** Desenvolvimento web · Firebase · Interface administrativa  
**Status:** Aplicação web publicada

## Visão geral

Site do Bazar da Sônia, com catálogo público de produtos e painel administrativo separado. A aplicação utiliza Firestore para ler e gerenciar o catálogo e oferece um caminho de contato para consultar produtos.

**Site:** [bazarsonia.netlify.app](https://bazarsonia.netlify.app/)

## Recursos identificados

- Página pública com apresentação e listagem de produtos.
- Formatação de preços e geração de links de contato.
- Painel administrativo em páginas próprias.
- Leitura dos produtos no Firestore.
- Regras do Firestore documentadas no repositório.
- Guia passo a passo para configuração e operação.

## Tecnologias

- HTML, CSS e JavaScript
- Firebase / Cloud Firestore
- Netlify

## Estrutura útil

- `index.html` — catálogo público.
- `admin.html` e `admin.js` — painel administrativo.
- `app.js` — integração do catálogo.
- `firestore.rules` — regras de acesso do banco.
- `GUIA-PASSO-A-PASSO.md` — guia de configuração e operação.

## Segurança

Revise as regras do Firestore no Console Firebase antes de publicar alterações. O painel administrativo deve exigir autenticação e as regras do banco precisam ser testadas com contas autorizadas e não autorizadas. Nunca publique credenciais privadas do Firebase.

© 2026 Kaiky Yoshio Ono Marins.