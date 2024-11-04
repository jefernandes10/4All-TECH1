// app.js

// Verifica se está na página de administração
if (document.getElementById("productForm")) {
    let produtos = JSON.parse(localStorage.getItem("products")) || [];

    function adicionarProduto() {
        const nome = document.getElementById('productName').value;
        const preco = parseFloat(document.getElementById('productPrice').value).toFixed(2);
        const descricao = document.getElementById('productDescription').value;
        const imagemInput = document.getElementById('productImage');
        const reader = new FileReader();

        if (imagemInput.files && imagemInput.files[0]) {
            reader.onload = function(e) {
                const imagem = e.target.result;
                const produto = { nome, preco, descricao, imagem };
                produtos.push(produto);
                localStorage.setItem("products", JSON.stringify(produtos));
                atualizarLista();
                document.getElementById('productForm').reset();
            }
            reader.readAsDataURL(imagemInput.files[0]);
        }
    }

    function removerProduto(index) {
        produtos.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(produtos));
        atualizarLista();
    }

    function atualizarLista() {
        const lista = document.getElementById('listaProdutos');
        lista.innerHTML = '';
        produtos.forEach((produto, index) => {
            lista.innerHTML += `<li>${produto.nome} - R$${produto.preco} <button onclick="removerProduto(${index})">Remover</button></li>`;
        });
    }

    document.getElementById("productForm").addEventListener("submit", function(event) {
        event.preventDefault();
        adicionarProduto();
    });

    atualizarLista();
}

// Verifica se está na página inicial para exibir os produtos
if (document.getElementById("productList")) {
    let produtos = JSON.parse(localStorage.getItem("products")) || [];

    function exibirProdutos() {
        const productList = document.getElementById("productList");
        productList.innerHTML = '';
        produtos.forEach((produto) => {
            const item = document.createElement("div");
            item.classList.add("produto-item");
            item.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$${produto.preco}</p>
                <p>${produto.descricao}</p>
            `;
            productList.appendChild(item);
        });
    }

    exibirProdutos();
}
