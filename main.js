// Initial Product Catalog
const products = [
    {
        id: 1,
        name: "Colar Aura Gold",
        category: "colar",
        price: 289.90,
        image: "assets/necklace_aura.png"
    },
    {
        id: 2,
        name: "Anel Eternal Brilliance",
        category: "anel",
        price: 195.00,
        image: "assets/ring_eternal.png"
    },
    {
        id: 3,
        name: "Brincos Starlight Drop",
        category: "brinco",
        price: 149.90,
        image: "assets/earrings_starlight.png"
    },
    {
        id: 4,
        name: "Pulseira Luna Silver",
        category: "pulseira",
        price: 220.00,
        image: "assets/bracelet_luna.png"
    },
    {
        id: 5,
        name: "Colar Riviera Shine",
        category: "colar",
        price: 350.00,
        image: "assets/necklace_aura.png" // Reusing for illustration
    },
    {
        id: 6,
        name: "Anel Solitário Classic",
        category: "anel",
        price: 120.00,
        image: "assets/ring_eternal.png" // Reusing for illustration
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const nav = document.getElementById('main-nav');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    initSmartNavbar();
    handleReveal(); // trigger initial reveal pass
});

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'reveal');
        productCard.innerHTML = `
            <div class="p-img-container" onclick="openProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="p-info">
                <h3>${product.name}</h3>
                <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button class="card-add-btn" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-bag-shopping"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Re-trigger reveal for new elements
    setTimeout(handleReveal, 100);
}

// Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const filtered = filter === 'all'
            ? products
            : products.filter(p => p.category === filter);

        renderProducts(filtered);
    });
});

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    openCartModal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart UI
function updateCart() {
    // Update count
    cartCount.innerText = cart.length;

    // Update items list
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price;
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <span class="remove-item" onclick="removeFromCart(${index})">Remover</span>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    const shipping = parseFloat(localStorage.getItem('selectedShipping')) || 0;
    const total = subtotal + shipping;

    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Visual feedback for free shipping
    if (subtotal >= 499) {
        document.querySelector('.top-promo').innerText = "Parabéns! Você ganhou Frete Grátis!";
    } else {
        document.querySelector('.top-promo').innerText = "Frete Grátis em compras acima de R$ 499,00";
    }
}

// Modal Toggle
cartBtn.addEventListener('click', openCartModal);
closeCart.addEventListener('click', closeCartModal);

function openCartModal() {
    cartModal.classList.add('active');
}

function closeCartModal() {
    cartModal.classList.remove('active');
}

// Smart Navbar & Scroll Effects
function initSmartNavbar() {
    let lastScrollTop = 0;
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Shadow/Size on scroll
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Smart Hide/Show using top instead of transform to preserve position:fixed context for children
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // Scroll down
            nav.style.top = '-150px';
        } else {
            // Scroll up or At the top
            nav.style.top = '0';
        }

        lastScrollTop = scrollTop;
    }, { passive: true });
}

window.addEventListener('scroll', handleReveal);

// Interactive Parallax for Hero
window.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

// Staggered Scroll Observer
function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach((el, index) => {
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 80;

        if (revealTop < windowHeight - revealPoint) {
            // Natural delay if not already in grid
            if (!el.closest('.product-grid')) {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 50);
            } else {
                el.classList.add('active');
            }
        }
    });
}

// Newsletter Submit
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado por assinar! Em breve você receberá nossas novidades.');
    e.target.reset();
});

// Shipping Logic
const cepInput = document.getElementById('cep-input');
const calcShippingBtn = document.getElementById('calc-shipping-btn');
const shippingResults = document.getElementById('shipping-results');

calcShippingBtn.addEventListener('click', async () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    shippingResults.innerHTML = '<p>Buscando...</p>';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            shippingResults.innerHTML = '<p style="color:red">CEP não encontrado!</p>';
            return;
        }

        const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

        // Simulated prices based on state (Correios simulation)
        // Prices are higher for states far from "center" (SP)
        const isFar = !['SP', 'RJ', 'MG', 'ES'].includes(data.uf);
        const pacPrice = subtotal >= 499 ? 0 : (isFar ? 35.90 : 22.40);
        const sedexPrice = subtotal >= 499 ? (isFar ? 25.00 : 15.00) : (isFar ? 65.50 : 38.90);

        shippingResults.innerHTML = `
            <p style="margin-bottom:0.5rem; font-weight:600">Entregar em: ${data.localidade} - ${data.uf}</p>
            <div class="shipping-option" onclick="selectShipping(${pacPrice}, 'PAC')">
                <div>
                    <span>Correios PAC</span>
                    <div class="time">Entrega em até 8 dias úteis</div>
                </div>
                <strong>${pacPrice === 0 ? 'Grátis' : 'R$ ' + pacPrice.toFixed(2).replace('.', ',')}</strong>
            </div>
            <div class="shipping-option" onclick="selectShipping(${sedexPrice}, 'SEDEX')">
                <div>
                    <span>Correios SEDEX</span>
                    <div class="time">Entrega em até 3 dias úteis</div>
                </div>
                <strong>R$ ${sedexPrice.toFixed(2).replace('.', ',')}</strong>
            </div>
        `;
    } catch (error) {
        shippingResults.innerHTML = '<p style="color:red">Erro ao calcular.</p>';
    }
});

function selectShipping(price, type) {
    localStorage.setItem('selectedShipping', price);
    localStorage.setItem('selectedShippingType', type);

    // Highlight selection
    document.querySelectorAll('.shipping-option').forEach(el => {
        el.classList.remove('selected');
        if (el.innerText.includes(type)) el.classList.add('selected');
    });

    updateCart();
}

// Checkout Logic Update
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sua sacola está vazia!');
        return;
    }

    const shippingPrice = parseFloat(localStorage.getItem('selectedShipping')) || 0;
    const shippingType = localStorage.getItem('selectedShippingType') || 'Não selecionado';
    const phoneNumber = "5591986323585";

    let message = "Olá MH Brillance! Gostaria de fazer o pedido dos seguintes itens:\n\n";

    let subtotal = 0;
    cart.forEach(item => {
        message += `- ${item.name}: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
        subtotal += item.price;
    });

    message += `\nFrete (${shippingType}): R$ ${shippingPrice.toFixed(2).replace('.', ',')}`;
    message += `\n*TOTAL: R$ ${(subtotal + shippingPrice).toFixed(2).replace('.', ',')}*`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Product Modal Logic
const productModal = document.getElementById('product-modal');
const closePModal = document.querySelector('.close-p-modal');

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-name').innerText = product.name;
    document.getElementById('modal-cat').innerText = product.category;
    document.getElementById('modal-price').innerText = `R$ ${product.price.toFixed(2).replace('.', ',')}`;

    const addBtn = document.getElementById('modal-add-btn');
    addBtn.onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };

    const buyBtn = document.getElementById('modal-buy-btn');
    if (buyBtn) {
        buyBtn.onclick = () => {
            const phoneNumber = "5591986323585";
            const message = `Olá MH Brillance! Gostaria de comprar:\n\n- ${product.name}: R$ ${product.price.toFixed(2).replace('.', ',')}\n\nAguardo confirmação!`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            closeProductModal();
        };
    }

    productModal.classList.add('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
}

closePModal.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuBackdrop = document.getElementById('menu-backdrop');

function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    menuBackdrop.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    mobileMenuBtn.setAttribute('aria-expanded', isActive);

    if (isActive) {
        icon.classList.replace('fa-bars', 'fa-xmark');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
        document.body.style.overflow = 'auto';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);
menuBackdrop.addEventListener('click', toggleMenu);

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});
