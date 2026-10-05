/* ============================================
   AETERNA — AI Imagine Tool JavaScript
   ============================================ */

(function () {
  'use strict';

  const generateBtn = document.getElementById('generateBtn');
  const promptInput = document.getElementById('imaginePrompt');
  const resultsSection = document.getElementById('imagineResults');
  const loadingEl = document.getElementById('imagineLoading');
  const gridEl = document.getElementById('imagineGrid');

  // Prompt chips
  document.querySelectorAll('.imagine-prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      promptInput.value = chip.dataset.prompt;
      promptInput.focus();
    });
  });

  // Generate
  generateBtn.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      promptInput.focus();
      promptInput.style.borderColor = 'var(--color-primary)';
      setTimeout(() => promptInput.style.borderColor = '', 2000);
      return;
    }

    generate(prompt);
  });

  // Also allow Enter key
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateBtn.click();
    }
  });

  function generate(prompt) {
    // Show loading
    resultsSection.style.display = '';
    loadingEl.style.display = '';
    gridEl.style.display = 'none';
    generateBtn.classList.add('generating');

    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Simulate generation delay
    setTimeout(() => {
      loadingEl.style.display = 'none';
      gridEl.style.display = '';
      generateBtn.classList.remove('generating');

      renderResults(prompt);
    }, 2500);
  }

  function renderResults(prompt) {
    const artStyles = generateArtStyles(prompt);

    gridEl.innerHTML = artStyles.map((style, i) => `
      <div class="imagine-card">
        <div class="imagine-card__art">
          <div class="concept-art" style="${style}"></div>
        </div>
        <div class="imagine-card__actions">
          <button class="imagine-card__action" onclick="alert('Concept saved to your wishlist!')">
            Save
          </button>
          <button class="imagine-card__action imagine-card__action--primary" onclick="alert('Request submitted! Our team will contact you within 24 hours to discuss this design.')">
            Request Design
          </button>
          <button class="imagine-card__action" onclick="regenerateSingle(this, ${i})">
            Regenerate
          </button>
        </div>
      </div>
    `).join('');
  }

  function generateArtStyles(prompt) {
    // Generate unique CSS art based on prompt keywords
    const lower = prompt.toLowerCase();

    // Color palettes based on keywords
    let palettes = [
      ['#2A4A6B', '#4A8BA8', '#7BC8D8', '#D4E8F0'], // blue/ocean
      ['#3A2818', '#8B7355', '#C4A87C', '#E8DFD0'],  // bronze/warm
      ['#F5F0E8', '#E0DCD4', '#D0CBC2', '#C0BAB0'],  // white/ceramic
      ['#1A2A1A', '#4A7A4A', '#8AB88A', '#C0E0C0'],  // green/forest
    ];

    if (lower.includes('blue') || lower.includes('ocean') || lower.includes('sea')) {
      palettes[0] = ['#0A2A4A', '#2A5A8B', '#5A9ABC', '#B0D8E8'];
      palettes[1] = ['#1A3A5A', '#3A6A9A', '#7AAACA', '#C8E0F0'];
    }
    if (lower.includes('red') || lower.includes('ruby') || lower.includes('cherry')) {
      palettes[0] = ['#4A1A1A', '#8B3A3A', '#C46060', '#E8A0A0'];
      palettes[2] = ['#3A1A2A', '#7A3A5A', '#B06080', '#D8A0B8'];
    }
    if (lower.includes('gold') || lower.includes('bronze') || lower.includes('amber')) {
      palettes[1] = ['#2A1A08', '#6A4A28', '#A88048', '#D4B878'];
      palettes[3] = ['#3A2A1A', '#7A5A3A', '#B08A5A', '#D8C090'];
    }
    if (lower.includes('green') || lower.includes('forest') || lower.includes('celtic')) {
      palettes[3] = ['#0A1A0A', '#2A4A2A', '#5A8A5A', '#90C890'];
      palettes[0] = ['#1A2A18', '#3A5A38', '#6A8A68', '#A0C0A0'];
    }

    // Generate 4 unique abstract art CSS backgrounds
    const shapes = [
      'border-radius: 50% 50% 10% 10% / 60% 60% 40% 40%',
      'border-radius: 30% 70% 60% 40% / 50% 30% 70% 50%',
      'border-radius: 50%',
      'border-radius: 48% 52% 55% 45% / 50% 48% 52% 50%'
    ];

    return palettes.map((colors, i) => {
      const bg = `background: linear-gradient(${135 + i * 30}deg, ${colors[0]} 0%, ${colors[1]} 35%, ${colors[2]} 65%, ${colors[3]} 100%);`;
      return bg;
    });
  }

  // Also render the static concept art cards
  function regenerateSingle(btn, index) {
    const card = btn.closest('.imagine-card');
    const artDiv = card.querySelector('.concept-art');

    // Quick shimmer effect
    artDiv.style.opacity = '0.3';
    artDiv.style.transition = 'opacity 0.3s';

    setTimeout(() => {
      // Generate new random colors
      const hue = Math.random() * 360;
      const s1 = 30 + Math.random() * 40;
      const s2 = 20 + Math.random() * 50;
      artDiv.style.background = `linear-gradient(${Math.random() * 360}deg, 
        hsl(${hue}, ${s1}%, 15%) 0%, 
        hsl(${hue + 20}, ${s2}%, 35%) 35%, 
        hsl(${hue + 40}, ${s1}%, 55%) 65%, 
        hsl(${hue + 60}, ${s2}%, 80%) 100%)`;
      artDiv.style.opacity = '1';
    }, 500);
  }

  window.regenerateSingle = regenerateSingle;

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(t) {
    html.setAttribute('data-theme', t);
    themeToggle.querySelector('.icon-sun').style.display = t === 'dark' ? '' : 'none';
    themeToggle.querySelector('.icon-moon').style.display = t === 'dark' ? 'none' : '';
    ;(window._aeternaStore=window._aeternaStore||{})['aeterna_theme']=t;
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

  mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }));

})();
