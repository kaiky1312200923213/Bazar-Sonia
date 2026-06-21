// ===== Links de WhatsApp =====
function montarLinkWhats(textoProduto) {
  const mensagem = textoProduto
    ? `Olá! Vi o produto "${textoProduto}" no site do Bazar da Sônia e gostaria de saber mais 😊`
    : `Olá! Vi o site do Bazar da Sônia e gostaria de saber mais sobre os produtos 😊`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

document.getElementById("whatsHeaderLink").href = montarLinkWhats();
document.getElementById("whatsCtaLink").href = montarLinkWhats();
document.getElementById("whatsFloatLink").href = montarLinkWhats();

// ===== Formatar preço em Real =====
function formatarPreco(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ===== Escapar texto para evitar problemas de HTML =====
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

// ===== Carregar produtos do Firestore em tempo real =====
const grid = document.getElementById("produtosGrid");
const loading = document.getElementById("loadingState");
const vazio = document.getElementById("estadoVazio");

db.collection("produtos")
  .orderBy("criadoEm", "desc")
  .onSnapshot(
    (snapshot) => {
      loading.style.display = "none";

      if (snapshot.empty) {
        grid.style.display = "none";
        vazio.style.display = "block";
        return;
      }

      vazio.style.display = "none";
      grid.style.display = "grid";
      grid.innerHTML = "";

      snapshot.forEach((doc) => {
        const produto = doc.data();
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
          ${produto.novo ? '<span class="produto-fita">novidade</span>' : ""}
          <img class="produto-imagem" src="${produto.imagem || ''}" alt="${escapar(produto.nome)}" loading="lazy">
          <div class="produto-info">
            <div class="produto-nome">${escapar(produto.nome)}</div>
            <span class="produto-preco">${formatarPreco(produto.preco)}</span>
          </div>
        `;
        card.addEventListener("click", () => {
          window.open(montarLinkWhats(produto.nome), "_blank", "noopener");
        });
        grid.appendChild(card);
      });
    },
    (erro) => {
      console.error("Erro ao carregar produtos:", erro);
      loading.style.display = "none";
      vazio.style.display = "block";
    }
  );
