const products = [
    { id: 1, name: 'Gemas', desc: "", category: 'gemas', price: 1.0, img: 'https://via.placeholder.com/300x200/000/00aaff?text=VIP+Pack', obs: { enabled: true, max: 2, title: "Selecione até 2 carros", options: ["Carro A", "Carro B", "Carro C", "Carro D"]} },
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
        body: JSON.stringify({ id: gameId, email: email, cart: cart })
    });

    const data = await res.json();

    if (data.status) {
        closeModal()

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