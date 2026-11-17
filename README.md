# Bazar da Sônia — Catálogo online

**Autor do projeto:** Kaiky Yoshio Ono Marins  
**Portfólio:** [kaikysec.vercel.app](https://kaikysec.vercel.app/)  
**Demonstração:** [bazarsonia.netlify.app](https://bazarsonia.netlify.app/)  
**Categoria:** Desenvolvimento web · Firebase · Aplicação comercial

## Visão geral

Aplicação web de catálogo de produtos com uma área pública para visitantes e páginas administrativas para gerenciar o conteúdo. O projeto conecta uma interface web ao Cloud Firestore.

## Contexto e objetivo

O objetivo é facilitar a consulta de produtos em um catálogo online e separar a experiência de quem visita a loja das ferramentas utilizadas na administração.

## Funcionalidades identificadas

- Página pública com apresentação e listagem de produtos.
- Formatação de preços e links de contato.
- Páginas administrativas separadas.
- Leitura e gerenciamento de dados por meio do Firestore.
- Regras do Firestore e guia de operação incluídos no repositório.

## Implementação e tecnologias

- HTML, CSS e JavaScript no front-end.
- Firebase / Cloud Firestore para dados.
- Netlify para publicação.

## Como explorar o projeto

1. Acesse a demonstração publicada.
2. Consulte o código-fonte neste repositório.
3. Leia o arquivo `GUIA-PASSO-A-PASSO.md` para instruções de configuração e operação.
4. Revise `firestore.rules` antes de configurar um ambiente próprio.

## Segurança e limitações

As regras do Firestore precisam ser validadas com usuários autorizados e não autorizados antes de qualquer uso em produção. A área administrativa deve exigir autenticação adequada. Não publique credenciais privadas nem deixe regras de banco abertas para facilitar testes.

## O que este projeto demonstra

- Construção de uma interface web orientada a uma necessidade de negócio.
- Integração de front-end com banco de dados em nuvem.
- Separação de páginas públicas e administrativas.
- Atenção à configuração e às regras de acesso aos dados.

© 2026 Kaiky Yoshio Ono Marins.
