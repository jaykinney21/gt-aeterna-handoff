/* ============================================
   AETERNA — Cart System
   Shared across all pages
   ============================================ */

(function () {
  'use strict';

  // Product catalog
  window.AETERNA_PRODUCTS = {
    solace: { id: 'solace', name: 'Solace', material: 'White Ceramic · Minimalist Sphere', price: 245, category: 'human', materialType: 'ceramic', image: 'solace' },
    ember: { id: 'ember', name: 'Ember', material: 'Hand-Blown Glass · Amber Gradient', price: 385, category: 'human', materialType: 'glass', image: 'ember' },
    meridian: { id: 'meridian', name: 'Meridian', material: 'Bronze · Sculptural Form', price: 780, category: 'human', materialType: 'metal', image: 'meridian' },
    vesper: { id: 'vesper', name: 'Vesper', material: 'Carved Walnut · Organic Curves', price: 320, category: 'human', materialType: 'wood', image: 'vesper' },
    lumina: { id: 'lumina', name: 'Lumina', material: 'Crystal Glass · Gold Leaf', price: 1450, category: 'human', materialType: 'glass', image: 'lumina' },
    terra: { id: 'terra', name: 'Terra', material: 'Earthen Ceramic · Wabi-Sabi', price: 195, category: 'human', materialType: 'ceramic', image: 'terra' },
    companion: { id: 'companion', name: 'Companion', material: 'Ceramic · River Stone', price: 165, category: 'pet', materialType: 'ceramic', image: 'companion' },
    whisper: { id: 'whisper', name: 'Whisper', material: 'Glass Pendant · Keepsake', price: 125, category: 'keepsake', materialType: 'glass', image: 'whisper' },
    soulful: { id: 'soulful', name: 'Soulful', material: 'Hand-Blown Glass · Orb', price: 285, category: 'pet', materialType: 'glass', image: 'soulful' },
    pebble: { id: 'pebble', name: 'Pebble', material: 'Smooth Stone · Keepsake', price: 95, category: 'keepsake', materialType: 'ceramic', image: 'pebble' },
    'ember-glow': { id: 'ember-glow', name: 'Ember Glow', material: 'Memorial Candle · Soy Wax', price: 145, category: 'candle', materialType: 'ceramic', image: 'ember-glow' },
    'eternal-thread': { id: 'eternal-thread', name: 'Eternal Thread', material: 'Sterling Silver · Pendant', price: 225, category: 'jewelry', materialType: 'metal', image: 'eternal-thread' }
  };

  // Cart state
  let cart = JSON.parse(((window._aeternaStore||{})['aeterna_cart']) || '[]');

  function saveCart() {
    ;(window._aeternaStore=window._aeternaStore||{})['aeterna_cart']=JSON.stringify(cart);
    updateCartUI();
  }

  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  window.AeternaCart = {
    add(productId, qty = 1) {
      const product = AETERNA_PRODUCTS[productId];
      if (!product) return;
      const existing = cart.find(i => i.id === productId);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id: productId, name: product.name, price: product.price, material: product.material, qty, image: product.image });
      }
      saveCart();
      openCartDrawer();
    },

    remove(productId) {
      cart = cart.filter(i => i.id !== productId);
      saveCart();
    },

    updateQty(productId, qty) {
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.qty = Math.max(0, qty);
        if (item.qty === 0) cart = cart.filter(i => i.id !== productId);
      }
      saveCart();
    },

    getItems() { return cart; },
    getCount: getCartCount,
    getTotal: getCartTotal,
    clear() { cart = []; saveCart(); }
  };

  // --- Cart Drawer ---
  function createCartDrawer() {
    if (document.getElementById('cartDrawer')) return;

    const drawer = document.createElement('div');
    drawer.id = 'cartDrawer';
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer__backdrop"></div>
      <div class="cart-drawer__panel">
        <div class="cart-drawer__header">
          <h3>Your Cart</h3>
          <button class="cart-drawer__close" aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="cart-drawer__items" id="cartDrawerItems"></div>
        <div class="cart-drawer__footer" id="cartDrawerFooter">
          <div class="cart-drawer__total">
            <span>Subtotal</span>
            <span id="cartDrawerTotal">$0</span>
          </div>
          <p class="cart-drawer__shipping">Free shipping on all orders</p>
          <button class="btn btn--primary-light cart-drawer__checkout" style="width:100%;justify-content:center;background:var(--color-primary);color:#FAFAF8;">Checkout</button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    drawer.querySelector('.cart-drawer__backdrop').addEventListener('click', closeCartDrawer);
    drawer.querySelector('.cart-drawer__close').addEventListener('click', closeCartDrawer);
  }

  function openCartDrawer() {
    createCartDrawer();
    const drawer = document.getElementById('cartDrawer');
    requestAnimationFrame(() => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    renderCartItems();
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;

  function renderCartItems() {
    const container = document.getElementById('cartDrawerItems');
    const footer = document.getElementById('cartDrawerFooter');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-drawer__empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="width:48px;height:48px;margin:0 auto var(--space-4);display:block;opacity:0.3">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn btn--outline-light" style="margin-top:var(--space-4)">Browse Collection</a>
        </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = '';

    container.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__image"><div class="art-shape art-shape--${item.image}" style="width:100%;height:100%;"></div></div>
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p class="cart-item__material">${item.material}</p>
          <div class="cart-item__controls">
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.qty}</span>
              <button class="cart-item__qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
            <span class="cart-item__price">$${(item.price * item.qty).toLocaleString()}</span>
          </div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove ${item.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');

    document.getElementById('cartDrawerTotal').textContent = '$' + getCartTotal().toLocaleString();

    // Event delegation
    container.querySelectorAll('.cart-item__qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const item = cart.find(i => i.id === id);
        if (item) {
          AeternaCart.updateQty(id, action === 'increase' ? item.qty + 1 : item.qty - 1);
          renderCartItems();
        }
      });
    });

    container.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        AeternaCart.remove(btn.dataset.id);
        renderCartItems();
      });
    });
  }

  function updateCartUI() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCartCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? '' : 'none';
    });
  }

  // Init
  createCartDrawer();
  updateCartUI();

  // Expose for other pages
  window.updateCartUI = updateCartUI;

})();
