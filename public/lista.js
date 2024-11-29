// Seleção de elementos
const productList = document.getElementById('product-list');
const productCount = document.getElementById('product-count');
const searchButton = document.getElementById('searchButton');
const sortBySelect = document.getElementById('sortBy');
const searchInput = document.getElementById('search');

// Função para buscar produtos na API
async function fetchProducts() {
    try {
        // Captura a ordenação selecionada
        const selectedSort = sortBySelect.value;
        let sortBy = '';
        let order = '';

        // Define os valores de `sortBy` e `order` com base na opção selecionada
        if (selectedSort.includes('-')) {
            const [field, direction] = selectedSort.split('-');
            sortBy = field;
            order = direction;
        }

        // Cria a URL com os parâmetros
        const url = new URL('http://localhost:8080/produto');
        if (sortBy && order) {
            url.searchParams.append('sortBy', sortBy);
            url.searchParams.append('order', order);
        }

        const response = await fetch(url);
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
                <img src="${product.imagem}" class="card-img-top" alt="${product.nome}">
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

// Adiciona evento ao botão de busca
searchButton.addEventListener('click', fetchProducts);

// Carrega os produtos ao abrir a página
fetchProducts();
