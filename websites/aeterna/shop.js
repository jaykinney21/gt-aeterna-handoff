/* ============================================
   AETERNA — Shop Page JavaScript
   ============================================ */

(function () {
  'use strict';

  const products = Object.values(AETERNA_PRODUCTS);

  // Assign sort order (newest = last 4)
  const sortOrder = ['solace','ember','meridian','vesper','lumina','terra','companion','whisper','soulful','pebble','ember-glow','eternal-thread'];

  // Extended product descriptions for shop
  const descriptions = {
    solace: 'A serene sphere of pure white ceramic, embodying quiet peace.',
    ember: 'Warm amber gradients dance through hand-blown glass, catching the light like a sunset.',
    meridian: 'A bold sculptural bronze form that commands attention and reverence.',
    vesper: 'Organic walnut curves carved by hand, warm as an embrace.',
    lumina: 'Crystal glass adorned with gold leaf — where luxury meets eternity.',
    terra: 'Wabi-sabi beauty in earthen ceramic, celebrating imperfect perfection.',
    companion: 'A smooth river stone form for our most loyal companions.',
    whisper: 'A delicate glass pendant keepsake, carrying memory close to the heart.',
    soulful: 'A luminous glass orb with oceanic depths, for beloved pets.',
    pebble: 'A tiny, smooth stone keepsake — small enough to hold, strong enough to remember.',
    'ember-glow': 'An ashes-infused soy wax candle, creating a warm memorial glow.',
    'eternal-thread': 'A sterling silver pendant with a discreet ash chamber — wear your memories.'
  };

  function renderProducts(filteredProducts) {
    const grid = document.getElementById('shopGrid');
    const empty = document.getElementById('shopEmpty');
    const count = document.getElementById('productCount');

    if (filteredProducts.length === 0) {
      grid.style.display = 'none';
      empty.style.display = '';
      count.textContent = '0';
      return;
    }

    grid.style.display = '';
    empty.style.display = 'none';
    count.textContent = filteredProducts.length;

    grid.innerHTML = filteredProducts.map(p => `
      <a href="product.html#${p.id}" class="product-card fade-in" data-category="${p.category}" data-material="${p.materialType}" data-price="${p.price}" data-product-id="${p.id}">
        <div class="product-card__image">
          <div class="art-shape art-shape--${p.image}"></div>
          <div class="product-card__overlay"><span>View Piece</span></div>
          <button class="product-card__quick-add" onclick="event.preventDefault();event.stopPropagation();AeternaCart.add('${p.id}')">Add to Cart</button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__material">${p.material}</p>
          <p class="product-card__price">$${p.price.toLocaleString()}</p>
        </div>
      </a>
    `).join('');
  }

  function getFilters() {
    const category = document.querySelector('input[name="category"]:checked')?.value || 'all';
    const material = document.querySelector('input[name="material"]:checked')?.value || 'all';
    const price = document.querySelector('input[name="price"]:checked')?.value || 'all';
    const sort = document.getElementById('sortSelect')?.value || 'featured';
    return { category, material, price, sort };
  }

  function applyFilters() {
    const { category, material, price, sort } = getFilters();

    let filtered = products.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (material !== 'all' && p.materialType !== material) return false;
      if (price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });

    // Sort
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => sortOrder.indexOf(b.id) - sortOrder.indexOf(a.id));
        break;
      default: // featured
        filtered.sort((a, b) => sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id));
    }

    renderProducts(filtered);
  }

  // Attach filter listeners
  document.querySelectorAll('input[name="category"], input[name="material"], input[name="price"]').forEach(input => {
    input.addEventListener('change', applyFilters);
  });

  document.getElementById('sortSelect')?.addEventListener('change', applyFilters);

  // Mobile filter toggle
  const filterToggle = document.getElementById('filterToggle');
  const filtersPanel = document.getElementById('shopFilters');

  if (filterToggle && filtersPanel) {
    filterToggle.addEventListener('click', () => {
      filtersPanel.classList.toggle('active');
      document.body.style.overflow = filtersPanel.classList.contains('active') ? 'hidden' : '';
    });
  }

  window.resetFilters = function () {
    document.querySelectorAll('input[name="category"][value="all"], input[name="material"][value="all"], input[name="price"][value="all"]').forEach(el => el.checked = true);
    applyFilters();
  };

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    const sunIcon = themeToggle.querySelector('.icon-sun');
    const moonIcon = themeToggle.querySelector('.icon-moon');
    if (theme === 'dark') {
      sunIcon.style.display = '';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = '';
    }
    ;(window._aeternaStore=window._aeternaStore||{})['aeterna_theme']=theme;
  }

  themeToggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Restore theme
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

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Initial render
  applyFilters();

})();
