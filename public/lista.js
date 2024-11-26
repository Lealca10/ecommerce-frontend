// Seleção de elementos
const productList = document.getElementById('product-list');
const productCount = document.getElementById('product-count');

// Função para buscar produtos na API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/produto');
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        productList.innerHTML = `<div class="col-12 text-center text-danger">
            <p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
        </div>`;
    }
}

// Função para renderizar os produtos na página
function renderProducts(products) {
    // Limpa a lista de produtos
    productList.innerHTML = '';

    products.forEach(product => {
        // Cria o card do produto usando classes do Bootstrap
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'mb-4');

        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.imagem}" class="card-img-top" alt="${product.mome}">
                <div class="card-body">
                    <h5 class="card-title">${product.nome}</h5>
                    <p class="card-text-muted">${product.descricao}</p>
                    <p class="card-text font-weight-bold">Preço: R$ ${product.preco.toFixed(2)}</p>
                </div>
            </div>
        `;

        // Adiciona o card na lista de produtos
        productList.appendChild(card);
    });

    // Atualiza o contador de produtos
    productCount.textContent = `Total de produtos exibidos: ${products.length}`;
}

// Carrega os produtos ao abrir a página
fetchProducts();
