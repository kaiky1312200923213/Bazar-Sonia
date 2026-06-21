const auth = firebase.auth();

// ===== Elementos =====
const loginBox = document.getElementById("loginBox");
const painelAdmin = document.getElementById("painelAdmin");
const formLogin = document.getElementById("formLogin");
const loginErro = document.getElementById("loginErro");
const btnLogin = document.getElementById("btnLogin");
const btnSair = document.getElementById("btnSair");

const formProduto = document.getElementById("formProduto");
const formErro = document.getElementById("formErro");
const formSucesso = document.getElementById("formSucesso");
const btnSalvarProduto = document.getElementById("btnSalvarProduto");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
const tituloForm = document.getElementById("tituloForm");

const campoNome = document.getElementById("campoNome");
const campoPreco = document.getElementById("campoPreco");
const campoNovo = document.getElementById("campoNovo");
const campoImagem = document.getElementById("campoImagem");
const previewImagem = document.getElementById("previewImagem");
const textoUpload = document.getElementById("textoUpload");
const produtoIdInput = document.getElementById("produtoId");

const listaProdutos = document.getElementById("listaProdutos");

let imagemBase64Atual = "";

// ===== Login =====
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  loginErro.style.display = "none";
  btnLogin.disabled = true;
  btnLogin.innerHTML = '<span class="spinner"></span> Entrando...';

  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .catch((erro) => {
      let mensagem = "Não foi possível entrar. Verifique o e-mail e a senha.";
      if (erro.code === "auth/invalid-email") mensagem = "O e-mail digitado não é válido.";
      loginErro.textContent = mensagem;
      loginErro.style.display = "block";
    })
    .finally(() => {
      btnLogin.disabled = false;
      btnLogin.textContent = "Entrar";
    });
});

btnSair.addEventListener("click", () => auth.signOut());

auth.onAuthStateChanged((usuario) => {
  if (usuario) {
    loginBox.style.display = "none";
    painelAdmin.style.display = "block";
    carregarProdutos();
  } else {
    loginBox.style.display = "block";
    painelAdmin.style.display = "none";
  }
});

// ===== Upload de imagem (comprime e converte em base64) =====
campoImagem.addEventListener("change", () => {
  const arquivo = campoImagem.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const tamanhoMax = 700;
      let largura = img.width;
      let altura = img.height;

      if (largura > altura && largura > tamanhoMax) {
        altura = Math.round((altura * tamanhoMax) / largura);
        largura = tamanhoMax;
      } else if (altura > tamanhoMax) {
        largura = Math.round((largura * tamanhoMax) / altura);
        altura = tamanhoMax;
      }

      const canvas = document.createElement("canvas");
      canvas.width = largura;
      canvas.height = altura;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, largura, altura);

      imagemBase64Atual = canvas.toDataURL("image/jpeg", 0.72);
      previewImagem.src = imagemBase64Atual;
      previewImagem.style.display = "block";
      textoUpload.textContent = "📷 Toque para trocar a foto";
    };
    img.src = e.target.result;
  };
  leitor.readAsDataURL(arquivo);
});

// ===== Salvar (criar ou editar) produto =====
formProduto.addEventListener("submit", (e) => {
  e.preventDefault();
  formErro.style.display = "none";
  formSucesso.style.display = "none";

  const id = produtoIdInput.value;
  const nome = campoNome.value.trim();
  const preco = parseFloat(campoPreco.value);
  const novo = campoNovo.value === "sim";

  if (!nome || isNaN(preco) || preco < 0) {
    formErro.textContent = "Preencha o nome e um preço válido.";
    formErro.style.display = "block";
    return;
  }
  if (!id && !imagemBase64Atual) {
    formErro.textContent = "Escolha uma foto para o produto.";
    formErro.style.display = "block";
    return;
  }

  btnSalvarProduto.disabled = true;
  btnSalvarProduto.innerHTML = '<span class="spinner"></span> Salvando...';

  const dados = {
    nome,
    preco,
    novo,
    atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (imagemBase64Atual) dados.imagem = imagemBase64Atual;

  let operacao;
  if (id) {
    operacao = db.collection("produtos").doc(id).update(dados);
  } else {
    dados.criadoEm = firebase.firestore.FieldValue.serverTimestamp();
    operacao = db.collection("produtos").add(dados);
  }

  operacao
    .then(() => {
      formSucesso.textContent = id ? "Produto atualizado! ✅" : "Produto cadastrado! 🎉";
      formSucesso.style.display = "block";
      resetarFormulario();
    })
    .catch((erro) => {
      console.error(erro);
      formErro.textContent = "Algo deu errado ao salvar. Tente novamente.";
      formErro.style.display = "block";
    })
    .finally(() => {
      btnSalvarProduto.disabled = false;
      btnSalvarProduto.textContent = id ? "Salvar alterações" : "Cadastrar produto";
    });
});

function resetarFormulario() {
  formProduto.reset();
  produtoIdInput.value = "";
  imagemBase64Atual = "";
  previewImagem.style.display = "none";
  previewImagem.src = "";
  textoUpload.textContent = "📷 Toque aqui para escolher uma foto";
  tituloForm.textContent = "Cadastrar novo produto";
  btnSalvarProduto.textContent = "Cadastrar produto";
  btnCancelarEdicao.style.display = "none";
}

btnCancelarEdicao.addEventListener("click", resetarFormulario);

// ===== Listar produtos cadastrados =====
function carregarProdutos() {
  db.collection("produtos").orderBy("criadoEm", "desc").onSnapshot(
    (snapshot) => {
      if (snapshot.empty) {
        listaProdutos.innerHTML = '<div class="vazio-lista">Nenhum produto cadastrado ainda. Use o formulário acima para começar! 🎈</div>';
        return;
      }

      listaProdutos.innerHTML = "";
      snapshot.forEach((doc) => {
        const p = doc.data();
        const item = document.createElement("div");
        item.className = "item-produto";
        item.innerHTML = `
          <img src="${p.imagem || ''}" alt="">
          <div class="item-info">
            <div class="item-nome">${escaparTexto(p.nome)}</div>
            <div class="item-preco">${formatarPrecoAdmin(p.preco)}</div>
          </div>
          <div class="item-acoes">
            <button class="btn-icone" title="Editar" data-acao="editar" data-id="${doc.id}">✏️</button>
            <button class="btn-icone excluir" title="Excluir" data-acao="excluir" data-id="${doc.id}">🗑️</button>
          </div>
        `;
        listaProdutos.appendChild(item);
      });
    },
    (erro) => {
      console.error(erro);
      listaProdutos.innerHTML = '<div class="vazio-lista">Não foi possível carregar os produtos agora.</div>';
    }
  );
}

listaProdutos.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;
  const id = botao.dataset.id;

  if (botao.dataset.acao === "excluir") {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      db.collection("produtos").doc(id).delete().catch((erro) => {
        console.error(erro);
        alert("Não foi possível excluir o produto.");
      });
    }
  }

  if (botao.dataset.acao === "editar") {
    db.collection("produtos").doc(id).get().then((doc) => {
      if (!doc.exists) return;
      const p = doc.data();
      produtoIdInput.value = id;
      campoNome.value = p.nome || "";
      campoPreco.value = p.preco || "";
      campoNovo.value = p.novo ? "sim" : "nao";
      if (p.imagem) {
        previewImagem.src = p.imagem;
        previewImagem.style.display = "block";
        textoUpload.textContent = "📷 Toque para trocar a foto";
      }
      imagemBase64Atual = "";
      tituloForm.textContent = "Editar produto";
      btnSalvarProduto.textContent = "Salvar alterações";
      btnCancelarEdicao.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

function escaparTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

function formatarPrecoAdmin(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
