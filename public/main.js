const products = [
    { id: 1, name: 'Casa no Condomínio', desc: "", category: 'Propriedades', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Condomínio', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 2, name: 'Facs VIPs', desc: "Facs VIPs", category: 'Facs', price: 299.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Facs+VIPs', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 3, name: 'Mansões', desc: "", category: 'Propriedades', price: 399.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Mansões', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 4, name: 'Vale Casa VIP', desc: "", category: 'Propriedades', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Casa+VIP', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 5, name: 'Vale Garagem', desc: "", category: 'Propriedades', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Garagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 6, name: 'Vale Casa + Vale Garagem', desc: "", category: 'Propriedades', price: 129.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Vale+Casa+Garagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 7, name: 'Kit Blips', desc: "Barbearia, tattoo e roupas", category: 'Personalização', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Kit+Blips', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 8, name: 'Troca ID 2 dig', desc: "", category: 'Personalização', price: 149.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Troca+ID+2+dig', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 9, name: 'Troca ID 3 dig', desc: "", category: 'Personalização', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Troca+ID+3+dig', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 10, name: 'Skin Cocudo Existente', desc: "", category: 'Personalização', price: 19.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Skin+Cocudo', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 11, name: 'Skin Cocudo Nova', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Skin+Cocudo+Nova', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 12, name: 'Rem Adv Verbal', desc: "", category: 'Punições', price: 29.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+Verbal', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 13, name: 'Rem Adv 1', desc: "", category: 'Punições', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+1', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 14, name: 'Rem Adv 2', desc: "", category: 'Punições', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+2', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 15, name: 'Rem Adv 3 / Desban', desc: "", category: 'Punições', price: 199.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rem+Adv+3+Desban', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 16, name: 'Remover Prisão', desc: "", category: 'Punições', price: 9.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Remover+Prisão', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 17, name: 'Cirurgia', desc: "", category: 'Personalização', price: 9.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Cirurgia', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 18, name: 'Blips Arena PVP', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Blips+Arena+PVP', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 19, name: 'Aumentar +2.000kg Baú', desc: "", category: 'Facs', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Aumentar+Baú+2k', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 20, name: 'Aumentar +4.000kg Baú', desc: "", category: 'Facs', price: 109.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Aumentar+Baú+4k', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 21, name: 'Adição 1 Roupa Masc/Fem', desc: "", category: 'Personalização', price: 59.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Roupa+Masc+Fem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 22, name: 'Roupa Pack Masc + Fem', desc: "", category: 'Personalização', price: 109.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Roupa+Pack', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 23, name: 'Carro Bau Fac M', desc: "", category: 'Facs', price: 99.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Carro+Bau+Fac+M', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 24, name: 'Carro Bau Fac G', desc: "", category: 'Facs', price: 299.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Carro+Bau+Fac+G', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 25, name: 'Rádio Privada', desc: "", category: 'Personalização', price: 49.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Rádio+Privada', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 26, name: 'VIP Fac', desc: "", category: 'Facs', price: 399.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=VIP+Fac', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    { id: 27, name: 'Outro Personagem', desc: "", category: 'Personalização', price: 199.99, img: 'https://via.placeholder.com/300x200/000/00aaff?text=Outro+Personagem', obs: { enabled: false, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
    // VIPs
    { id: 28, name: 'VIP Bronze', desc: "Tag Discord | Dinheiro | Salário | Onda Coins", category: 'VIP', price: 29.99, img: 'https://via.placeholder.com/300x200/b8860b/000000?text=VIP+Bronze', obs: { enabled: false, max: 0, title: "", options: []} },
    { id: 29, name: 'VIP Prata', desc: "Tag Discord | Dinheiro | Salário | Onda Coins", category: 'VIP', price: 69.99, img: 'https://via.placeholder.com/300x200/C0C0C0/000000?text=VIP+Prata', obs: { enabled: false, max: 0, title: "", options: []} },
    { id: 30, name: 'VIP Ouro', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB", category: 'VIP', price: 129.99, img: 'https://via.placeholder.com/300x200/FFD700/000000?text=VIP+Ouro', obs: { enabled: true, max: 1, title: "Selecione 1 carro (opções: 2)", options: ["Carro Opção A", "Carro Opção B"]} },
    { id: 31, name: 'VIP Platina', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP", category: 'VIP', price: 199.99, img: 'https://via.placeholder.com/300x200/E5E4E2/000000?text=VIP+Platina', obs: { enabled: true, max: 1, title: "Selecione 1 carro (opções: 5)", options: ["Carro Opção 1", "Carro Opção 2", "Carro Opção 3", "Carro Opção 4", "Carro Opção 5"]} },
    { id: 32, name: 'VIP Onda Brava', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP | Vale Casa", category: 'VIP', price: 499.90, img: 'https://via.placeholder.com/300x200/000080/FFFFFF?text=VIP+Onda+Brava', obs: { enabled: true, max: 2, title: "Selecione 2 carros (opções: 10)", options: ["Carro OB 1", "Carro OB 2", "Carro OB 3", "Carro OB 4", "Carro OB 5", "Carro OB 6", "Carro OB 7", "Carro OB 8", "Carro OB 9", "Carro OB 10"]} },
    { id: 33, name: 'VIP Supremo Onda Brava', desc: "Tag Discord | Dinheiro | Salário | Onda Coins | /som | RGB | Câmeras | FixVIP | Tratamento VIP HP | Vale Casa | Vale Garagem", category: 'VIP', price: 699.90, img: 'https://via.placeholder.com/300x200/800080/FFFFFF?text=VIP+Supremo', obs: { enabled: true, max: 2, title: "Selecione 2 carros (opções: 20)", options: ["Carro S 1", "Carro S 2", "Carro S 3", "Carro S 4", "Carro S 5", "Carro S 6", "Carro S 7", "Carro S 8", "Carro S 9", "Carro S 10", "Carro S 11", "Carro S 12", "Carro S 13", "Carro S 14", "Carro S 15", "Carro S 16", "Carro S 17", "Carro S 18", "Carro S 19", "Carro S 20"]} },
];
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    const filtered = products.filter(p =>
        (currentCategory === 'all' || p.category === currentCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product';
        productEl.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Descrição: ${product.desc}</p>
                    <p>Preço: R$ ${product.price}</p>
                    <button class="btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                `;
        container.appendChild(productEl);
    });
}

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts();
}

document.getElementById('searchInput').addEventListener('input', function () {
    searchQuery = this.value;
    renderProducts();
});

let selectedProduct = null;

function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (product.obs && product.obs.enabled) {
        selectedProduct = product;
        openObsModal(product);
        return;
    }

    pushToCart(product);
}

function pushToCart(product, obs = []) {
    const existing = cart.find(item => item.id === product.id && JSON.stringify(item.obs_selected) === JSON.stringify(obs));

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            obs_selected: obs
        });
    }

    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
                    <span>${item.name} (x${item.quantity}) - R$ ${item.price * item.quantity},00</span>
                    <button onclick="removeFromCart(${item.id})">Remover</button>
                `;
        cartItems.appendChild(itemEl);
    });
    document.getElementById('cartTotal').textContent = `Total: R$ ${total},00`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

async function checkout() {
    document.getElementById("loadModal").style.display = "block";
    
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        document.getElementById("loadModal").style.display = "none";
        return;
    }

    closeCart();

    const res = await fetch('/api/checkonline', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    const data = res.json();

    if (data) {
        document.getElementById('purchaseModal').style.display = 'block';
        document.getElementById("loadModal").style.display = "none";
    } else {
        alert('Cidade offline no momento aguarde um pouco e tente novamente')
        document.getElementById("loadModal").style.display = "none";
        return;
    };
}

async function confirmPurchase() {
    const gameId = document.getElementById('gameId').value;
    const email = document.getElementById('email').value;
    const cupom = document.getElementById('cupom').value;

    if (gameId.trim() === '') {
        alert('Por favor, insira seu ID dentro do jogo.');
        return;
    }

    if (email.trim() === ''  || !(email.includes("@")) || !(email.includes("."))) {
        alert('Por favor, insira um email valido.');
        return;
    }

    const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: gameId, email: email, cart: cart, cupom: cupom })
    });

    const data = await res.json();

    if (data.status) {
        closeModal()

        if (data.newPrice){
            document.getElementById("newPrice").innerText = `R$ ${data.newPrice.toFixed(2)} (${data.desconto}% de desconto aplicado)`;
        };

        document.getElementById("paymentStatus").innerText = `Status: ${data.order_status}`;
        document.getElementById("paymentCode").innerText = `${data.order_id}`;
        document.getElementById("paymentModal").style.display = "block";
        document.getElementById("qrcode").src = `data:image/png;base64,${data.base64}`;
        document.getElementById("copiaecola").innerText = data.copiaecola;

        setCookie("order_id", data.order_id, 7)
    } else{
        alert("Houve um erro, tente novamente mais tarde.")
    }

    cart = [];

    updateCart();
}

function closeModal() {
    document.getElementById('purchaseModal').style.display = 'none';
}

function openObsModal(product) {
    document.getElementById('obsTitle').innerText = product.obs.title;
    const box = document.getElementById('obsOptions');
    box.innerHTML = '';

    product.obs.options.forEach(option => {
        const item = document.createElement('div');
        item.innerHTML = `
            <label>
                <input type="checkbox" name="obsOption" value="${option}">
                ${option}
            </label>
        `;
        box.appendChild(item);
    });

    document.getElementById('obsModal').style.display = "block";
}

function closeObs() {
    document.getElementById('obsModal').style.display = "none";
}

function confirmObs() {
    const checkboxes = document.querySelectorAll('input[name="obsOption"]:checked');
    const values = Array.from(checkboxes).map(c => c.value);

    if (values.length > selectedProduct.obs.max) {
        alert(`Você só pode selecionar até ${selectedProduct.obs.max} opções.`);
        return;
    }

    pushToCart(selectedProduct, values);

    closeObs();
}

//

document.getElementById("tryFinalizar").addEventListener("click", async function(e) {
    const res = await fetch('/api/getstatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: document.getElementById("paymentCode").innerText })
    });

    const data = res.json();

    if (data.status){
        document.getElementById("paymentStatus").innerText = `Status: ${data.status}`;
    };
});

window.onclick = function (event) {
    if (event.target == document.getElementById('cartModal')) {
        closeCart();
    }
    if (event.target == document.getElementById('purchaseModal')) {
        closeModal();
    }
}

document.getElementById("copy").addEventListener("click", function(e){
    navigator.clipboard.writeText(document.getElementById("copiaecola").value);
})

const tabs = document.getElementsByClassName('tab') 

for (let tab of tabs) {
    tab.addEventListener('click', function() {
        filterCategory(this.getAttribute('data-tab'));
    });
}

function setCookie(name, value, days = 7) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/`;
}

document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', checkout);
document.getElementById('confirmPurchaseBtn').addEventListener('click', confirmPurchase);
document.getElementById('closeModal').addEventListener('click', closeModal);

renderProducts();