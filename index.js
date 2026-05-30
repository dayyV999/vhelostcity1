/* ════════════════════════════════════════════
   VheLostCity — index.js
   ════════════════════════════════════════════ */

/* ── LOADER ─────────────────────────────────── */
const siteLoader = document.getElementById('siteLoader');

document.body.classList.add('loading');

function hideLoader() {
  if (siteLoader) {
    siteLoader.classList.add('hidden');
  }
  document.body.classList.remove('loading');
}

window.addEventListener('load', () => {
  setTimeout(hideLoader, 2200);
});

setTimeout(hideLoader, 5000);

/* ── CUSTOM CURSOR ───────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  requestAnimationFrame(animRing);
})();

function cursorGrow() {
  if (cursor) { cursor.style.width = '6px'; cursor.style.height = '6px'; }
  if (ring) { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.opacity = '0.15'; }
}

function cursorShrink() {
  if (cursor) { cursor.style.width = '8px'; cursor.style.height = '8px'; }
  if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.35'; }
}

function attachCursorHover(el) {
  el.addEventListener('mouseenter', cursorGrow);
  el.addEventListener('mouseleave', cursorShrink);
}

document.querySelectorAll('a, button, input, select').forEach(attachCursorHover);

/* ── DARK SECTION COLOR SWITCH ───────────────── */
const darkSection = document.querySelector('.statement-section');
const nav = document.getElementById('mainNav');
const musicWrap = document.querySelector('.music-toggle-wrap');

function checkNavColor() {
  if (!nav || !darkSection) return;
  const navRect = nav.getBoundingClientRect();
  const sectionRect = darkSection.getBoundingClientRect();
  const isOverDark = navRect.bottom > sectionRect.top && navRect.top < sectionRect.bottom;
  nav.classList.toggle('nav-white', isOverDark);
  if (musicWrap) musicWrap.classList.toggle('audio-white', isOverDark);
}

window.addEventListener('scroll', checkNavColor, { passive: true });
checkNavColor();

/* ── CUSTOM SCROLLBAR ───────────────────────── */
const customScrollbar = document.querySelector('.custom-scrollbar');
const scrollThumb = document.querySelector('.scroll-thumb');
let scrollTimeout;

function updateCustomScrollbar() {
  if (!customScrollbar || !scrollThumb) return;
  customScrollbar.classList.add('active');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
  const trackHeight = 220, thumbHeight = 60;
  const maxMove = trackHeight - thumbHeight;
  scrollThumb.style.transform = `translateY(${scrollPercent * maxMove}px)`;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => customScrollbar.classList.remove('active'), 900);
}

function checkScrollbarColor() {
  if (!customScrollbar || !darkSection) return;
  const scrollY = window.scrollY + window.innerHeight / 2;
  const darkTop = darkSection.offsetTop;
  const darkBottom = darkTop + darkSection.offsetHeight;
  customScrollbar.classList.toggle('light-mode', scrollY >= darkTop && scrollY <= darkBottom);
}

/* ── ACTIVE NAV ON SCROLL ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let ticking = false;

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', () => {
  updateCustomScrollbar();
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveNav();
      checkNavColor();
      checkScrollbarColor();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

updateActiveNav();
checkScrollbarColor();

/* ── HERO 3D PARALLAX ───────────────────────── */
const heroBg = document.querySelector('.hero-depth-bg');
const heroAccent = document.querySelector('.hero-marble-accent');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  if (heroAccent) heroAccent.style.transform = `translateY(${scrolled * 0.15}px)`;
}, { passive: true });

/* ── MARQUEE ─────────────────────────────────── */
const marqueeItems = [
  'New Arrivals',
  'Free Shipping Over $150',
  'SS25 Collection Live',
  'Worldwide Shipping',
  'Handcrafted Quality',
  'Limited Runs'
];

const marqueeTrack = document.getElementById('marqueeTrack');

if (marqueeTrack) {
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  repeated.forEach((txt, i) => {
    const span = document.createElement('span');
    const isDot = i % 2 === 1;
    span.className = 'marquee-item' + (isDot ? ' marquee-dot' : '');
    span.textContent = isDot ? '·' : txt;
    marqueeTrack.appendChild(span);
  });
}

/* ── SCROLL REVEAL ───────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

function observeRevealEls() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

observeRevealEls();

/* ── PRODUCTS ────────────────────────────────── */
const products = [
  {
    name: 'Obsidian Hoodie',
    category: 'Outerwear',
    price: 125,
    image: 'images/obsidian-hoodie.jpg',
    description: 'A heavyweight hoodie cut with a relaxed silhouette, dropped shoulders, and a washed obsidian tone designed for everyday wear.',
    fabric: '100% Cotton Fleece',
    fit: 'Relaxed Fit',
    color: 'Obsidian Black',
    sizes: 'S, M, L, XL',
    code: 'VLC-OH-001'
  },
  {
    name: 'Ash Cargo Trousers',
    category: 'Bottoms',
    price: 95,
    image: 'images/ash-cargo-trousers.jpg',
    description: 'Structured cargo trousers with a straight-leg fit, utility pocket detailing, and a muted ash finish built for movement.',
    fabric: 'Cotton Twill Blend',
    fit: 'Straight Leg',
    color: 'Ash Grey',
    sizes: '28, 30, 32, 34, 36',
    code: 'VLC-ACP-002'
  },
  {
    name: 'Noir Tee',
    category: 'Tops',
    price: 45,
    image: 'images/noir-tee.jpg',
    description: 'A premium essential tee with a slightly oversized cut, soft hand feel, and deep noir tone for a minimal everyday look.',
    fabric: '240 GSM Cotton Jersey',
    fit: 'Boxy Fit',
    color: 'Noir Black',
    sizes: 'S, M, L, XL',
    code: 'VLC-NT-003'
  }
];

let currentFilter = 'all';
let currentSort = 'featured';
let currentSearch = '';

function loadProducts(filter = currentFilter, sort = currentSort, search = currentSearch) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const visibleProducts = filter === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === filter);

  const searchedProducts = visibleProducts.filter(p => {
    const q = search.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  let sortedProducts = [...searchedProducts];
  if (sort === 'price-low') sortedProducts.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') sortedProducts.sort((a, b) => b.price - a.price);
  if (sort === 'name') sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

  if (!sortedProducts.length) {
    grid.innerHTML = `<p style="font-size:0.75rem;color:var(--ash);letter-spacing:0.15em;text-transform:uppercase;">No products available right now.</p>`;
    return;
  }

  grid.innerHTML = sortedProducts.map((product, index) => `
    <article
      class="collection-card reveal"
      style="transition-delay:${index * 0.08}s"
      data-name="${product.name}"
      data-category="${product.category}"
      data-price="${product.price}"
      data-image="${product.image}"
      data-description="${product.description}"
      data-fabric="${product.fabric}"
      data-fit="${product.fit}"
      data-color="${product.color}"
      data-sizes="${product.sizes}"
      data-code="${product.code}"
    >
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="card-overlay">
          <span class="card-overlay-text">Quick View</span>
        </div>
      </div>
      <div class="card-label">
        <div>
          <p class="card-name">${product.name}</p>
          <p class="card-tag">${product.category}</p>
        </div>
        <p class="card-price">$${product.price}</p>
      </div>
    </article>
  `).join('');

  observeRevealEls();

  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => openProductModal({ ...card.dataset }));
    attachCursorHover(card);
  });
}

loadProducts();

/* ── FILTER / SORT / SEARCH ─────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    loadProducts();
  });
});

const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    loadProducts();
  });
}

const productSearch = document.getElementById('productSearch');
if (productSearch) {
  productSearch.addEventListener('input', () => {
    currentSearch = productSearch.value.toLowerCase();
    loadProducts();
  });
}

/* ── PRODUCT MODAL ───────────────────────────── */
const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

let currentModalProduct = null;
let selectedSize = null;

function openProductModal(product) {
  if (!productModal) return;
  currentModalProduct = product;
  selectedSize = null;

  const el = id => document.getElementById(id);
  const img = el('modalImage');
  if (img) { img.src = product.image; img.alt = product.name; }
  if (el('modalName'))        el('modalName').textContent = product.name;
  if (el('modalCategory'))    el('modalCategory').textContent = product.category;
  if (el('modalPrice'))       el('modalPrice').textContent = '$' + product.price;
  if (el('modalDescription')) el('modalDescription').textContent = product.description || '';
  if (el('modalFabric'))      el('modalFabric').textContent = product.fabric || '';
  if (el('modalFit'))         el('modalFit').textContent = product.fit || '';
  if (el('modalColor'))       el('modalColor').textContent = product.color || '';
  if (el('modalSizes'))       el('modalSizes').textContent = product.sizes || '';
  if (el('modalCode'))        el('modalCode').textContent = product.code || '';

  renderSizeOptions(product.sizes);
  productModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);
if (modalClose) modalClose.addEventListener('click', closeProductModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeCart();
    closeCheckoutModal();
  }
});

function renderSizeOptions(sizesText) {
  const sizeOptions = document.getElementById('sizeOptions');
  if (!sizeOptions || !sizesText) return;

  const sizes = sizesText.split(',').map(s => s.trim());

  sizeOptions.innerHTML = sizes.map(size => `
    <button class="size-option" type="button" data-size="${size}">${size}</button>
  `).join('');

  sizeOptions.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSize = btn.dataset.size;
      sizeOptions.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    attachCursorHover(btn);
  });
}

/* ── MUSIC PLAYER ────────────────────────────── */
const siteAudio = document.getElementById('siteAudio');
const playPauseBtn = document.getElementById('playPauseTrack');
const songPopup = document.getElementById('songPopup');
const songPopupTitle = document.getElementById('songPopupTitle');

const playlist = [
  { title: 'Treasure In The Hills — Leon Thomas', src: 'music/track1.mp3' },
  { title: 'Friends Again — Baby Rose & Leon Thomas', src: 'music/track2.mp3' },
  { title: 'Track Three', src: 'music/track3.mp3' }
];

let currentTrackIndex = parseInt(localStorage.getItem('vlc_music_index'), 10) || 0;
let isPlaying = false;
let popupTimeout = null;
let fadeInterval = null;

function loadTrack(index) {
  const track = playlist[index];
  if (!track || !siteAudio) return;
  siteAudio.src = track.src;
  if (songPopupTitle) songPopupTitle.textContent = 'Now Playing — ' + track.title;
}

function showSongPopup() {
  if (!songPopup) return;
  songPopup.classList.remove('hide');
  songPopup.classList.add('show');
  clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => {
    songPopup.classList.remove('show');
    songPopup.classList.add('hide');
  }, 2600);
}

function fadeInAudio(targetVolume = 0.7, duration = 1200) {
  if (!siteAudio) return;
  clearInterval(fadeInterval);
  siteAudio.volume = 0;
  const stepTime = 50;
  const volumeStep = targetVolume / (duration / stepTime);
  fadeInterval = setInterval(() => {
    if (siteAudio.volume < targetVolume) {
      siteAudio.volume = Math.min(siteAudio.volume + volumeStep, targetVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

function fadeOutAudio(duration = 800) {
  if (!siteAudio) return;
  clearInterval(fadeInterval);
  const stepTime = 50;
  const startVol = siteAudio.volume || 0.7;
  const volumeStep = startVol / (duration / stepTime);
  fadeInterval = setInterval(() => {
    if (siteAudio.volume > volumeStep) {
      siteAudio.volume = Math.max(siteAudio.volume - volumeStep, 0);
    } else {
      clearInterval(fadeInterval);
      siteAudio.volume = 0;
      siteAudio.pause();
    }
  }, stepTime);
}

function playTrack() {
  if (!siteAudio) return;
  siteAudio.play()
    .then(() => {
      isPlaying = true;
      if (playPauseBtn) { playPauseBtn.textContent = '⏸'; playPauseBtn.classList.add('playing'); }
      fadeInAudio();
      showSongPopup();
      localStorage.setItem('vlc_music_playing', 'true');
      localStorage.setItem('vlc_music_index', currentTrackIndex);
    })
    .catch(err => console.warn('Playback blocked:', err));
}

function pauseTrack() {
  isPlaying = false;
  if (playPauseBtn) { playPauseBtn.textContent = '▶'; playPauseBtn.classList.remove('playing'); }
  fadeOutAudio();
  localStorage.setItem('vlc_music_playing', 'false');
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

if (playPauseBtn) playPauseBtn.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
if (siteAudio) siteAudio.addEventListener('ended', playNextTrack);

loadTrack(currentTrackIndex);
if (playPauseBtn) playPauseBtn.textContent = '▶';

/* ── CART DRAWER ───────────────────────────── */
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartOpenBtn = document.querySelector('.cart-nav-btn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItemsEl = document.getElementById('cartItems');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartCountEl = document.querySelector('.cart-count');
const cartToast = document.getElementById('cartToast');

let cart = JSON.parse(localStorage.getItem('vlc_cart')) || [];

function saveCart() { localStorage.setItem('vlc_cart', JSON.stringify(cart)); }

function showCartToast(message = 'Added to cart') {
  if (!cartToast) return;
  cartToast.textContent = message;
  cartToast.classList.add('show');
  setTimeout(() => cartToast.classList.remove('show'), 1800);
}

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove('open');
  if (!productModal?.classList.contains('open') && !checkoutModal?.classList.contains('open')) {
    document.body.classList.remove('modal-open');
  }
}

function renderCart() {
  if (!cartItemsEl || !cartSubtotalEl || !cartCountEl) return;

  if (!cart.length) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your bag is empty.</p>`;
    cartSubtotalEl.textContent = '$0';
    cartCountEl.textContent = '0';
    saveCart();
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0);

  cartItemsEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.category} · Size ${item.selectedSize} · $${item.price}</p>
      </div>
      <div class="cart-actions">
        <div class="qty-controls">
          <button type="button" onclick="changeQuantity(${index}, -1)">-</button>
          <span>${item.quantity || 1}</span>
          <button type="button" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <button type="button" class="cart-remove" onclick="removeFromCart(${index})">×</button>
      </div>
    </div>
  `).join('');

  cartSubtotalEl.textContent = '$' + subtotal;
  cartCountEl.textContent = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  saveCart();
}

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name && item.selectedSize === product.selectedSize);
  if (existing) {
    existing.quantity = Number(existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
  closeProductModal();
  showCartToast('Added to cart');
}

function removeFromCart(index) { cart.splice(index, 1); renderCart(); }

function changeQuantity(index, amount) {
  if (!cart[index]) return;
  cart[index].quantity = Number(cart[index].quantity || 1) + amount;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  renderCart();
}

window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;

if (modalAddToCartBtn) {
  modalAddToCartBtn.addEventListener('click', () => {
    if (!selectedSize) { alert('Please select a size first.'); return; }
    if (currentModalProduct) addToCart({ ...currentModalProduct, selectedSize });
  });
}

if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);
if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

renderCart();

/* ── CHECKOUT MODAL ─────────────────────────── */
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
const checkoutSummary = document.getElementById('checkoutSummary');
const checkoutForm = document.getElementById('checkoutForm');

function openCheckoutModal() {
  if (!checkoutModal || !checkoutSummary) return;
  if (!cart.length) { alert('Your cart is empty.'); return; }

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0);

  checkoutSummary.innerHTML = cart.map(item => `
    <div class="checkout-summary-item">
      <p>${item.name}</p>
      <p>Size ${item.selectedSize} · Qty ${item.quantity || 1} · $${item.price}</p>
    </div>
  `).join('') + `
    <div class="checkout-total"><span>Subtotal</span><span>$${subtotal}</span></div>
  `;

  closeCart();
  checkoutModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeCheckoutModal() {
  if (!checkoutModal) return;
  checkoutModal.classList.remove('open');
  if (!cartDrawer?.classList.contains('open') && !productModal?.classList.contains('open')) {
    document.body.classList.remove('modal-open');
  }
}

if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckoutModal);
if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckoutModal);

if (checkoutForm) {
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();

    const order = {
      id: 'VLC-' + Date.now(),
      customer: {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
      },
      items: cart,
      total: cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0),
      createdAt: new Date().toLocaleString(),
      status: 'Pending'
    };

    const savedOrders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
    savedOrders.push(order);
    localStorage.setItem('vlc_orders', JSON.stringify(savedOrders));

    alert(`Order submitted successfully!\nOrder ID: ${order.id}`);
    cart = [];
    renderCart();
    checkoutForm.reset();
    closeCheckoutModal();
  });
}

/* ── ADMIN ORDERS ─────────────────────────── */
window.viewOrders = function () {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  console.table(orders);
  return orders;
};

const adminOrdersBtn = document.getElementById('adminOrdersBtn');
const adminOrders = document.getElementById('adminOrders');
const adminOrdersBackdrop = document.getElementById('adminOrdersBackdrop');
const adminOrdersClose = document.getElementById('adminOrdersClose');
const adminOrdersList = document.getElementById('adminOrdersList');
const adminOrdersSearch = document.getElementById('adminOrdersSearch');
const clearOrdersBtn = document.getElementById('clearOrdersBtn');
const adminOrderCount = document.getElementById('adminOrderCount');
const adminRevenue = document.getElementById('adminRevenue');

function renderAdminOrders(search = '') {
  if (!adminOrdersList) return;

  const orders = (JSON.parse(localStorage.getItem('vlc_orders')) || []).reverse();

  if (adminOrderCount) adminOrderCount.textContent = orders.length;
  if (adminRevenue) {
    const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    adminRevenue.textContent = '$' + revenue;
  }

  const filteredOrders = orders.filter(order => {
    const query = search.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.email.toLowerCase().includes(query)
    );
  });

  if (!filteredOrders.length) {
    adminOrdersList.innerHTML = `<p class="cart-empty">No matching orders found.</p>`;
    return;
  }

  adminOrdersList.innerHTML = filteredOrders.map(order => `
    <div class="admin-order-card">
      <button type="button" class="admin-order-toggle" onclick="toggleOrderCard(this)">View Details</button>
      <div class="admin-order-content">
        <p><strong>Order:</strong> ${order.id}</p>
        <p><strong>Name:</strong> ${order.customer.name}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Phone:</strong> ${order.customer.phone}</p>
        <p><strong>Address:</strong> ${order.customer.address}</p>
        <div class="admin-order-items">
          ${order.items.map(item => `
            <p>${item.name} · Size ${item.selectedSize} · Qty ${item.quantity || 1} · $${item.price}</p>
          `).join('')}
        </div>
        <div class="admin-order-bottom">
          <p><strong>Date:</strong> ${order.createdAt}</p>
          <div class="admin-order-controls">
            <span class="order-status ${(order.status || 'Pending').trim().toLowerCase()}">${order.status || 'Pending'}</span>
            <button type="button" class="status-btn" onclick="updateOrderStatus('${order.id}', 'Shipped')">Ship</button>
            <button type="button" class="status-btn delivered" onclick="updateOrderStatus('${order.id}', 'Delivered')">Deliver</button>
            <button type="button" class="delete-order-btn" onclick="deleteSingleOrder('${order.id}')">Delete</button>
            <textarea class="order-note-input" placeholder="Admin note..." onchange="updateOrderNote('${order.id}', this.value)">${order.note || ''}</textarea>
            <button type="button" class="copy-order-btn" onclick="copyOrderInfo('${order.id}')">Copy Order</button>
            <button type="button" class="print-order-btn" onclick="printOrder('${order.id}')">Print Order</button>
            <button type="button" class="export-orders-btn" onclick="exportOrders()">Export Orders</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openAdminOrders() {
  if (!adminOrders) return;
  renderAdminOrders();
  adminOrders.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeAdminOrders() {
  if (!adminOrders) return;
  adminOrders.classList.remove('open');
  if (!cartDrawer?.classList.contains('open') && !productModal?.classList.contains('open') && !checkoutModal?.classList.contains('open')) {
    document.body.classList.remove('modal-open');
  }
}

if (adminOrdersBtn) adminOrdersBtn.addEventListener('click', openAdminOrders);
if (adminOrdersBackdrop) adminOrdersBackdrop.addEventListener('click', closeAdminOrders);
if (adminOrdersClose) adminOrdersClose.addEventListener('click', closeAdminOrders);
if (adminOrdersSearch) adminOrdersSearch.addEventListener('input', () => renderAdminOrders(adminOrdersSearch.value));

if (clearOrdersBtn) {
  clearOrdersBtn.addEventListener('click', () => {
    if (!confirm('Delete all saved orders?')) return;
    localStorage.removeItem('vlc_orders');
    renderAdminOrders();
  });
}

window.updateOrderStatus = function(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  localStorage.setItem('vlc_orders', JSON.stringify(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)));
  renderAdminOrders();
};

window.deleteSingleOrder = function(orderId) {
  if (!confirm('Delete this order?')) return;
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  localStorage.setItem('vlc_orders', JSON.stringify(orders.filter(o => o.id !== orderId)));
  renderAdminOrders();
};

window.updateOrderNote = function(orderId, noteText) {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  localStorage.setItem('vlc_orders', JSON.stringify(orders.map(o => o.id === orderId ? { ...o, note: noteText } : o)));
};

window.copyOrderInfo = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const itemsText = order.items.map(item =>
    `${item.name} | Size ${item.selectedSize} | Qty ${item.quantity || 1} | $${item.price}`
  ).join('\n');

  const text = `Order: ${order.id}\nStatus: ${order.status || 'Pending'}\n\nCustomer:\n${order.customer.name}\n${order.customer.email}\n${order.customer.phone}\n${order.customer.address}\n\nItems:\n${itemsText}\n\nTotal: $${order.total}\nDate: ${order.createdAt}\nNote: ${order.note || 'None'}`.trim();

  navigator.clipboard.writeText(text);
  alert('Order copied.');
};

window.toggleOrderCard = function(button) {
  const content = button.nextElementSibling;
  if (!content) return;
  content.classList.toggle('open');
  button.textContent = content.classList.contains('open') ? 'Hide Details' : 'View Details';
};

window.printOrder = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const itemsHtml = order.items.map(item =>
    `<p>${item.name} · Size ${item.selectedSize} · Qty ${item.quantity || 1} · $${item.price}</p>`
  ).join('');

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html><head><title>${order.id}</title></head>
    <body style="font-family:monospace;padding:2rem;">
      <h1>VheLostCity Order</h1>
      <p><strong>Order:</strong> ${order.id}</p>
      <p><strong>Status:</strong> ${order.status || 'Pending'}</p><hr>
      <p><strong>Name:</strong> ${order.customer.name}</p>
      <p><strong>Email:</strong> ${order.customer.email}</p>
      <p><strong>Phone:</strong> ${order.customer.phone}</p>
      <p><strong>Address:</strong> ${order.customer.address}</p><hr>
      ${itemsHtml}<hr>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Date:</strong> ${order.createdAt}</p>
      <p><strong>Note:</strong> ${order.note || 'None'}</p>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.print();
};

function exportOrders() {
  const orders = JSON.parse(localStorage.getItem('vlc_orders')) || [];
  const file = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'vhelostcity-orders.json';
  link.click();
  URL.revokeObjectURL(link.href);
}

window.exportOrders = exportOrders;