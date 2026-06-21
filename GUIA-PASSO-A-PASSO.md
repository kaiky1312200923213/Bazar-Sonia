# 🌸 Guia do Site — Bazar da Sônia

Esse guia vai te levar do zero até o site no ar, em pé de igualdade com qualquer site profissional. Vai com calma, um passo por vez. Você não precisa saber programar — só seguir os cliques.

**Tempo estimado: 30 a 40 minutos, uma vez só.** Depois disso, sua vó só usa o painel — não precisa repetir nada disso.

---

## O que você já tem em mãos

Dentro da pasta do site, estes arquivos:

- `index.html` → a página que todo mundo vê (catálogo)
- `admin.html` → o painel só da Sônia (protegido por senha)
- `styles.css`, `app.js`, `admin.js` → o "motor" do site (não precisa tocar)
- `firebase-config.js` → **é aqui que você vai colar suas chaves** (passo 2)
- `firestore.rules` → as regras de segurança (passo 4)

---

## Passo 1 — Criar sua conta gratuita no Firebase

O Firebase é do Google. Ele vai guardar os produtos que a Sônia cadastrar, de graça, para sempre (dentro do uso normal de uma loja pequena).

1. Acesse **https://console.firebase.google.com**
2. Entre com uma conta Google (crie uma se a Sônia não tiver)
3. Clique em **"Criar um projeto"** (ou "Add project")
4. Dê um nome, por exemplo `bazar-da-sonia`
5. Quando perguntar sobre o Google Analytics, pode **desativar** (não precisa)
6. Clique em **"Criar projeto"** e espere carregar

---

## Passo 2 — Conectar o site ao Firebase

1. Dentro do seu projeto, clique no ícone **`</>`** (Web) para adicionar um app
2. Dê um nome, por exemplo `site-bazar`, e clique em **"Registrar app"**
3. Vai aparecer um bloco de código parecido com isto:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "bazar-da-sonia.firebaseapp.com",
  projectId: "bazar-da-sonia",
  storageBucket: "bazar-da-sonia.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

4. **Copie** esses valores
5. Abra o arquivo `firebase-config.js` (pode abrir com o Bloco de Notas ou qualquer editor de texto)
6. Substitua os valores `"COLE_AQUI..."` pelos valores reais que você copiou
7. Salve o arquivo

---

## Passo 3 — Ativar o banco de dados (Firestore)

1. No menu da esquerda do Firebase, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha a localização **`southamerica-east1` (São Paulo)** — fica mais rápido para o Brasil
4. Selecione **"Iniciar no modo de produção"**
5. Clique em **"Ativar"**

### Agora cole as regras de segurança:

6. Clique na aba **"Regras"** (Rules), no topo
7. Apague tudo que estiver lá
8. Abra o arquivo `firestore.rules` (que você já tem), copie todo o conteúdo e cole no lugar
9. Clique em **"Publicar"**

Isso garante que **qualquer visitante pode ver os produtos**, mas **só quem tiver login pode cadastrar ou apagar**.

---

## Passo 4 — Criar o login da Sônia

1. No menu da esquerda, clique em **"Authentication"**
2. Clique em **"Vamos começar"** (Get started)
3. Na lista de métodos de login, clique em **"E-mail/senha"**
4. Ative a primeira opção e clique em **"Salvar"**
5. Agora vá na aba **"Users"** (Usuários) e clique em **"Adicionar usuário"**
6. Coloque um e-mail (pode ser o e-mail real da Sônia, ou um que você escolher) e uma senha forte
7. Clique em **"Adicionar usuário"**

📌 **Guarde esse e-mail e senha** — é o que a Sônia vai usar para entrar no painel em `seusite.com/admin.html`.

---

## Passo 5 — Testar o site no seu computador (opcional, mas recomendado)

Antes de publicar, dá pra ver se tudo está funcionando:

1. Encontre o arquivo `index.html` na pasta do site
2. Clique duas vezes nele — vai abrir no seu navegador
3. Veja se o site aparece bonito (sem produtos ainda, é normal)
4. Abra `admin.html` do mesmo jeito, entre com o e-mail/senha que você criou no Passo 4
5. Cadastre um produto de teste com nome, preço e foto
6. Volte para a aba do `index.html` e atualize a página — o produto deve aparecer! 🎉

Se aparecer, está tudo certo. Pode seguir para publicar de verdade.

---

## Passo 6 — Publicar o site na internet (gratuito)

Vamos usar o **Netlify**, que permite publicar **arrastando a pasta**, sem comando nenhum.

1. Acesse **https://app.netlify.com/drop**
2. Crie uma conta gratuita (pode ser com Google)
3. Arraste a **pasta inteira do site** (a que contém `index.html`, `admin.html`, etc.) para a área indicada na página
4. Espere alguns segundos — o Netlify vai te dar um link tipo:
   `https://bazar-da-sonia-xyz123.netlify.app`

🎉 **Seu site já está no ar!** Esse link já pode ser compartilhado com qualquer pessoa.

### Deixar o endereço mais bonito e fácil de lembrar (grátis)

1. Dentro do Netlify, vá em **"Site settings" → "Change site name"**
2. Escolha algo como `bazardasonia` — o link vira `https://bazardasonia.netlify.app`
3. Esse já é um ótimo endereço, fácil de digitar e compartilhar

### Se quiser um domínio próprio (ex: `bazardasonia.com.br`) — opcional

Isso tem um custo pequeno (em torno de R$ 40/ano, no registro.br). Se quiser isso no futuro, me avise que eu te ajudo a configurar.

---

## Passo 7 — Como a Sônia vai usar o painel no dia a dia

Depois de tudo publicado, o uso do dia a dia é simples:

1. Acessar `https://bazardasonia.netlify.app/admin.html` (vale salvar esse link na tela inicial do celular dela)
2. Entrar com o e-mail e senha
3. Preencher: nome do produto, preço, foto
4. Clicar em **"Cadastrar produto"**
5. Pronto! Ele já aparece no site, para qualquer visitante

Para editar ou excluir, ela usa os ícones de lápis ✏️ e lixeira 🗑️ ao lado de cada produto na lista.

💡 **Dica:** Ensine a Sônia a "Adicionar à tela inicial" do navegador do celular, assim o painel admin vira um ícone, parecendo um aplicativo de verdade.

---

## Sempre que precisar atualizar o site (textos, cores, etc.)

Se um dia você quiser mudar alguma coisa do visual ou texto do site, edite os arquivos e arraste a pasta de novo no `https://app.netlify.com/drop` — ou me chame de novo aqui que eu ajusto pra você.

---

## Resumo rápido (cola na geladeira 😄)

| O que | Onde |
|---|---|
| Site da loja (para os clientes) | `https://bazardasonia.netlify.app` |
| Painel da Sônia (cadastrar produtos) | `https://bazardasonia.netlify.app/admin.html` |
| Gerenciar banco de dados | https://console.firebase.google.com |
| Publicar atualizações do site | https://app.netlify.com/drop |

Qualquer dúvida em qualquer passo, volte aqui na conversa e me chame — eu te ajudo a resolver. 💛
