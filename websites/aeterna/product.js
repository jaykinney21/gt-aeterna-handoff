/* ============================================
   AETERNA — Product Detail JavaScript
   ============================================ */

(function () {
  'use strict';

  // Extended product data with dimensions and descriptions
  const productDetails = {
    solace: {
      description: 'The Solace is a meditation on simplicity. A perfect sphere of hand-thrown white ceramic, each piece carries the subtle marks of the maker\'s hand. Its pure form invites quiet contemplation — a beautiful object that honors a beautiful life.',
      height: '8.5"', width: '8.5"', capacity: '200 cu in',
      colors: [{ name: 'Snow White', hex: '#F0EDE8' }, { name: 'Warm Ivory', hex: '#E8DFD0' }, { name: 'Soft Gray', hex: '#D0CDC6' }]
    },
    ember: {
      description: 'Born in the furnace and shaped by breath, the Ember captures the warmth of a sunset in hand-blown glass. Each piece is unique — the amber gradients shift and dance as light passes through, creating an ever-changing memorial of color and light.',
      height: '10"', width: '7"', capacity: '200 cu in',
      colors: [{ name: 'Amber', hex: '#D4943C' }, { name: 'Ruby', hex: '#8B3A3A' }, { name: 'Sapphire', hex: '#3A5F8B' }]
    },
    meridian: {
      description: 'The Meridian is a statement piece — a bold sculptural form cast in solid bronze. Its abstract, organic shape evokes the passage of time and the enduring nature of memory. Each piece develops a unique patina, growing more beautiful with age.',
      height: '12"', width: '8"', capacity: '220 cu in',
      colors: [{ name: 'Classic Bronze', hex: '#8B7355' }, { name: 'Dark Patina', hex: '#5C4A35' }, { name: 'Copper', hex: '#B87333' }]
    },
    vesper: {
      description: 'Hand-carved from sustainably sourced walnut, the Vesper is a vessel of warmth and organic beauty. Its flowing curves echo the forms of nature — each grain pattern unique, each surface smooth as silk beneath the fingertips.',
      height: '9"', width: '7.5"', capacity: '200 cu in',
      colors: [{ name: 'Walnut', hex: '#6B5038' }, { name: 'Oak', hex: '#9E7C5A' }, { name: 'Ebony', hex: '#3A2E1E' }]
    },
    lumina: {
      description: 'The Lumina is our most prestigious piece — crystal glass adorned with hand-applied gold leaf. Light refracts through its faceted form, casting prismatic patterns that shift throughout the day. A true work of art.',
      height: '11"', width: '6"', capacity: '200 cu in',
      colors: [{ name: 'Gold Leaf', hex: '#C4A87C' }, { name: 'Silver Leaf', hex: '#C0C0C0' }, { name: 'Rose Gold', hex: '#B76E79' }]
    },
    terra: {
      description: 'Inspired by the Japanese philosophy of wabi-sabi, the Terra celebrates the beauty of imperfection. Hand-shaped from earthen clay and fired with natural glazes, each piece is a unique expression of the maker\'s hand.',
      height: '8"', width: '8"', capacity: '180 cu in',
      colors: [{ name: 'Earth', hex: '#A8937A' }, { name: 'Sand', hex: '#C4B098' }, { name: 'Sage', hex: '#8A9A78' }]
    },
    companion: {
      description: 'Shaped like a smooth river stone, the Companion is a gentle tribute to our most faithful friends. Its organic form invites you to hold it, to carry the weight of memory in your hands.',
      height: '5.5"', width: '6"', capacity: '75 cu in',
      colors: [{ name: 'River Stone', hex: '#BEB5A8' }, { name: 'Slate', hex: '#8A8A86' }, { name: 'Cream', hex: '#E8E0D4' }]
    },
    whisper: {
      description: 'The Whisper is a delicate glass pendant keepsake — a small vessel that keeps memory close to the heart. Worn on a fine chain, it catches the light like a tiny lantern of remembrance.',
      height: '1.5"', width: '0.8"', capacity: '1 tsp',
      colors: [{ name: 'Clear', hex: '#E8E6E2' }, { name: 'Rose', hex: '#D4A0A0' }, { name: 'Blue', hex: '#A0B8D4' }]
    },
    soulful: {
      description: 'A luminous orb of hand-blown glass with oceanic depths, the Soulful captures the spirit of beloved pets. Swirling colors within suggest the endless play of waves and light.',
      height: '6"', width: '6"', capacity: '50 cu in',
      colors: [{ name: 'Ocean', hex: '#3C96AA' }, { name: 'Forest', hex: '#4A7A5A' }, { name: 'Twilight', hex: '#5A4A7A' }]
    },
    pebble: {
      description: 'The Pebble is the smallest in our keepsake collection — a tiny, smooth stone shape that fits perfectly in the palm of your hand. Small enough to carry, strong enough to hold all your memories.',
      height: '2"', width: '2.5"', capacity: '2 tsp',
      colors: [{ name: 'Warm Stone', hex: '#BFB3A0' }, { name: 'Cool Stone', hex: '#A0A8B0' }, { name: 'Blush', hex: '#C4A8A0' }]
    },
    'ember-glow': {
      description: 'The Ember Glow is a memorial candle crafted from soy wax infused with a small portion of cremated ashes. When lit, it creates a warm, intimate glow — a comforting ritual of remembrance.',
      height: '4"', width: '3"', capacity: '1 tsp',
      colors: [{ name: 'Warm Cream', hex: '#F5E6D0' }, { name: 'Honey', hex: '#D4B080' }, { name: 'Lavender', hex: '#C4B0D4' }]
    },
    'eternal-thread': {
      description: 'The Eternal Thread is a sterling silver pendant with a discreet ash chamber. Its teardrop form is both elegant and meaningful — a wearable memorial that keeps your loved one close to your heart, always.',
      height: '1.2"', width: '0.6"', capacity: 'pinch',
      colors: [{ name: 'Sterling Silver', hex: '#C0BEBA' }, { name: 'Gold Plate', hex: '#C4A87C' }, { name: 'Rose Gold', hex: '#B76E79' }]
    }
  };

  function getProductId() {
    return window.location.hash.replace('#', '') || 'solace';
  }

  function loadProduct(id) {
    const product = AETERNA_PRODUCTS[id];
    const details = productDetails[id];
    if (!product || !details) return;

    document.title = `${product.name} — AETERNA`;

    // Update breadcrumb
    document.getElementById('breadcrumbName').textContent = product.name;

    // Update product data attributes
    const layout = document.querySelector('.pdp__layout');
    layout.setAttribute('data-product-id', id);
    layout.setAttribute('data-variant-id', `${id}-v1`);
    layout.setAttribute('data-price', product.price);
    layout.setAttribute('data-sku', `AET-${id.toUpperCase()}`);

    // Image
    const artShape = document.getElementById('pdpArtShape');
    artShape.className = `art-shape art-shape--${product.image}`;

    // Info
    document.getElementById('pdpName').textContent = product.name;
    document.getElementById('pdpPrice').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('pdpAffirm').textContent = `$${Math.ceil(product.price / 12)}`;
    document.getElementById('pdpMaterial').textContent = product.material;
    document.getElementById('pdpDescription').textContent = details.description;
    document.getElementById('pdpHeight').textContent = details.height;
    document.getElementById('pdpWidth').textContent = details.width;
    document.getElementById('pdpCapacity').textContent = details.capacity;

    // Swatches
    const swatchContainer = document.getElementById('pdpSwatches');
    swatchContainer.innerHTML = details.colors.map((c, i) => 
      `<button class="pdp__swatch ${i === 0 ? 'active' : ''}" style="background:${c.hex}" title="${c.name}" data-color="${c.name}"></button>`
    ).join('');

    swatchContainer.querySelectorAll('.pdp__swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        swatchContainer.querySelectorAll('.pdp__swatch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Price display
    updatePriceDisplay(product.price);

    // Add to cart
    document.getElementById('addToCart').onclick = () => {
      const qty = parseInt(document.getElementById('qtyValue').textContent);
      AeternaCart.add(id, qty);
    };

    // Related products
    loadRelated(id);
  }

  let qty = 1;
  function updatePriceDisplay(unitPrice) {
    document.getElementById('addToCartPrice').textContent = `$${(unitPrice * qty).toLocaleString()}`;
  }

  document.getElementById('qtyIncrease').addEventListener('click', () => {
    qty++;
    document.getElementById('qtyValue').textContent = qty;
    const product = AETERNA_PRODUCTS[getProductId()];
    if (product) updatePriceDisplay(product.price);
  });

  document.getElementById('qtyDecrease').addEventListener('click', () => {
    if (qty > 1) qty--;
    document.getElementById('qtyValue').textContent = qty;
    const product = AETERNA_PRODUCTS[getProductId()];
    if (product) updatePriceDisplay(product.price);
  });

  function loadRelated(currentId) {
    const allProducts = Object.values(AETERNA_PRODUCTS);
    const current = AETERNA_PRODUCTS[currentId];
    // Get 4 related: same category first, then others
    let related = allProducts
      .filter(p => p.id !== currentId)
      .sort((a, b) => {
        if (a.category === current.category && b.category !== current.category) return -1;
        if (b.category === current.category && a.category !== current.category) return 1;
        return 0;
      })
      .slice(0, 4);

    document.getElementById('relatedGrid').innerHTML = related.map(p => `
      <a href="product.html#${p.id}" class="product-card">
        <div class="product-card__image">
          <div class="art-shape art-shape--${p.image}"></div>
          <div class="product-card__overlay"><span>View Piece</span></div>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__material">${p.material}</p>
          <p class="product-card__price">$${p.price.toLocaleString()}</p>
        </div>
      </a>
    `).join('');
  }

  // Hash change
  window.addEventListener('hashchange', () => {
    qty = 1;
    document.getElementById('qtyValue').textContent = 1;
    loadProduct(getProductId());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    const sunIcon = themeToggle.querySelector('.icon-sun');
    const moonIcon = themeToggle.querySelector('.icon-moon');
    sunIcon.style.display = theme === 'dark' ? '' : 'none';
    moonIcon.style.display = theme === 'dark' ? 'none' : '';
    ;(window._aeternaStore=window._aeternaStore||{})['aeterna_theme']=theme;
  }

  themeToggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  const saved = ((window._aeternaStore||{})['aeterna_theme']);
  if (saved) setTheme(saved);

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Init
  loadProduct(getProductId());

})();
