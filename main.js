// Product Data
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
    setupRevealAnimation();
});

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'reveal');
        productCard.innerHTML = `
            <div class="p-img-container">
                <img src="${product.image}" alt="${product.name}">
                <div class="p-actions">
                    <button onclick="addToCart(${product.id})">Adicionar à Sacola</button>
                </div>
            </div>
            <div class="p-info">
                <h3>${product.name}</h3>
                <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
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

function updateCart() {
    // Update count
    cartCount.innerText = cart.length;
    
    // Update items list
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
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
    
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
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

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    handleReveal();
});

// Reveal Animation
function setupRevealAnimation() {
    handleReveal(); // Initial check
}

function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

// Newsletter Submit
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado por assinar! Em breve você receberá nossas novidades.');
    e.target.reset();
});

// Checkout Logic (WhatsApp)
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sua sacola está vazia!');
        return;
    }

    const phoneNumber = "5591986323585";
    let message = "Olá MH Brillance! Gostaria de fazer o pedido dos seguintes itens:\n\n";
    
    let total = 0;
    cart.forEach(item => {
        message += `- ${item.name}: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
        total += item.price;
    });
    
    message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Mobile Menu Logic
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});
