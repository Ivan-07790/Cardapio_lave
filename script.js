const carrinho = [];
const cardapio = [
  { nome: "Suco de Laranja", descricao: "Natural, sem açúcar", preco: 6, imagem: "https://i.imgur.com/FlwK8Yv.jpg" },
  { nome: "Pão de Queijo", descricao: "Com queijo minas", preco: 4, imagem: "https://i.imgur.com/FhpvM63.jpg" },
];

function renderizarCardapio() {
  const container = document.getElementById("cardapio");
  cardapio.forEach(item => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px;">
        <img src="${item.imagem}" width="100"><br>
        <strong>${item.nome}</strong><br>
        ${item.descricao}<br>
        R$${item.preco.toFixed(2)}<br>
        <button onclick='adicionarAoCarrinho("${item.nome}", ${item.preco})'>Adicionar</button>
      </div>
    `;
  });
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;
  carrinho.forEach(item => {
    lista.innerHTML += `<li>${item.nome} - R$${item.preco.toFixed(2)}</li>`;
    total += item.preco;
  });
  document.getElementById("total").innerText = `R$ ${total.toFixed(2)}`;
}

function enviarPedido() {
  const dados = {
    pedido: carrinho.map(i => `${i.nome} - R$${i.preco}`).join("\n"),
    total: carrinho.reduce((s, i) => s + i.preco, 0).toFixed(2)
  };

  fetch('AKfycbyvR1mmJgEo9u-XVqt3LPzwS6JSXQMocEdItgRs_DCj28U-3VZag_vHXj-t8xYkOX52rg', {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("mensagem").innerText = msg;
    carrinho.length = 0;
    atualizarCarrinho();
  });
}

renderizarCardapio();
