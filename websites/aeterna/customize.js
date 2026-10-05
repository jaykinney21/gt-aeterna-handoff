/* ============================================
   AETERNA — 3D Configurator (Three.js ES Module)
   ============================================ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Scene Setup ---
const canvas = document.getElementById('threeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();

// Background color from theme
function updateBgColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  scene.background = new THREE.Color(theme === 'dark' ? '#1A1918' : '#F5F4F0');
}
updateBgColor();

// Observe theme changes
new MutationObserver(updateBgColor).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 0.5, 4);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 8;
controls.target.set(0, 0.3, 0);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xe6f0ff, 0.4);
fillLight.position.set(-3, 2, -2);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
rimLight.position.set(0, 3, -5);
scene.add(rimLight);

// Environment map (simple gradient)
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
const envGeo = new THREE.SphereGeometry(10, 32, 16);
const envMat = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  map: createGradientTexture()
});
envScene.add(new THREE.Mesh(envGeo, envMat));
const envMap = pmremGenerator.fromScene(envScene, 0).texture;
scene.environment = envMap;

function createGradientTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#f5f0e8');
  grad.addColorStop(0.5, '#d4c8b8');
  grad.addColorStop(1, '#a09080');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

// --- Urn Shapes (LatheGeometry) ---
function createUrnProfile(type) {
  const points = [];
  const segments = 40;

  if (type === 'classic') {
    // Classic urn shape
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let x, y;
      y = t * 2 - 1; // -1 to 1

      if (t < 0.05) {
        x = 0.3 + t * 2; // base
      } else if (t < 0.15) {
        x = 0.4 - (t - 0.05) * 1.5; // taper in
      } else if (t < 0.7) {
        const tt = (t - 0.15) / 0.55;
        x = 0.25 + Math.sin(tt * Math.PI) * 0.5; // body bulge
      } else if (t < 0.85) {
        const tt = (t - 0.7) / 0.15;
        x = 0.3 - tt * 0.15; // neck taper
      } else if (t < 0.9) {
        x = 0.15; // neck
      } else {
        const tt = (t - 0.9) / 0.1;
        x = 0.15 + Math.sin(tt * Math.PI * 0.5) * 0.1; // lip
      }

      points.push(new THREE.Vector2(Math.max(0.001, x), y));
    }
  } else if (type === 'sphere') {
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI;
      const x = Math.sin(angle) * 0.7;
      const y = Math.cos(angle) * 0.7;
      points.push(new THREE.Vector2(Math.max(0.001, x), y));
    }
  } else if (type === 'pebble') {
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI;
      const x = Math.sin(angle) * 0.8;
      const y = Math.cos(angle) * 0.45;
      points.push(new THREE.Vector2(Math.max(0.001, x), y));
    }
  }

  return points;
}

// --- State ---
let currentShape = 'classic';
let currentMaterial = 'ceramic';
let currentColor = '#F0EDE8';
let currentFinish = 'satin';
let currentSize = 'large';
let currentText = '';
let currentFont = 'serif';

let urnMesh = null;
let engravingTexture = null;

// Material properties
const materialPresets = {
  ceramic: { roughness: 0.7, metalness: 0.0, clearcoat: 0.2 },
  glass: { roughness: 0.05, metalness: 0.0, clearcoat: 1.0, transmission: 0.3 },
  metal: { roughness: 0.3, metalness: 0.9, clearcoat: 0.1 },
  wood: { roughness: 0.8, metalness: 0.0, clearcoat: 0.05 }
};

const finishPresets = {
  matte: { roughness: 0.9 },
  satin: { roughness: 0.5 },
  gloss: { roughness: 0.1 },
  brushed: { roughness: 0.6 }
};

const sizeScales = { small: 0.6, medium: 0.8, large: 1.0 };

const basePrices = { small: 195, medium: 295, large: 395 };
const materialPriceAdds = { ceramic: 0, glass: 50, metal: 150, wood: 30 };
const engravingPrice = 45;

// --- Create Urn ---
function createUrn() {
  if (urnMesh) {
    scene.remove(urnMesh);
    urnMesh.geometry.dispose();
    urnMesh.material.dispose();
  }

  const points = createUrnProfile(currentShape);
  const geometry = new THREE.LatheGeometry(points, 64);

  // Create engraving texture
  engravingTexture = createEngravingTexture(currentText, currentFont);

  const preset = materialPresets[currentMaterial];
  const finish = finishPresets[currentFinish];

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(currentColor),
    roughness: Math.max(preset.roughness, finish.roughness) * 0.5 + Math.min(preset.roughness, finish.roughness) * 0.5,
    metalness: preset.metalness,
    envMapIntensity: 1.0
  });

  if (currentText) {
    mat.map = engravingTexture;
  }

  urnMesh = new THREE.Mesh(geometry, mat);
  const scale = sizeScales[currentSize];
  urnMesh.scale.set(scale, scale, scale);
  scene.add(urnMesh);

  // Ground shadow circle
  updatePrice();
}

function createEngravingTexture(text, fontType) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext('2d');

  // Fill with base color (white = no tint)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 1024);

  if (text) {
    let fontFamily = "'Instrument Serif', serif";
    if (fontType === 'sans') fontFamily = "'Switzer', sans-serif";
    if (fontType === 'script') fontFamily = "Georgia, serif";

    ctx.font = `${fontType === 'script' ? 'italic ' : ''}36px ${fontFamily}`;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 512);
  }

  const texture = new THREE.CanvasTexture(c);
  texture.needsUpdate = true;
  return texture;
}

function updatePrice() {
  let price = basePrices[currentSize] + materialPriceAdds[currentMaterial];
  if (currentText) price += engravingPrice;
  document.getElementById('configPrice').textContent = `$${price.toLocaleString()}`;
}

// --- Event Handlers ---

// Shape
document.querySelectorAll('.config-shape').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.config-shape').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentShape = btn.dataset.shape;
    createUrn();
  });
});

// Material
document.querySelectorAll('#materialOptions .config-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#materialOptions .config-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMaterial = btn.dataset.material;
    createUrn();
  });
});

// Color swatches
document.querySelectorAll('.config-swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.config-swatch').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentColor = btn.dataset.color;
    if (urnMesh) urnMesh.material.color.set(currentColor);
  });
});

// Custom color picker
document.getElementById('customColor').addEventListener('input', (e) => {
  currentColor = e.target.value;
  document.querySelectorAll('.config-swatch').forEach(b => b.classList.remove('active'));
  if (urnMesh) urnMesh.material.color.set(currentColor);
});

// Finish
document.querySelectorAll('#finishOptions .config-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#finishOptions .config-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFinish = btn.dataset.finish;
    if (urnMesh) {
      const preset = materialPresets[currentMaterial];
      const finish = finishPresets[currentFinish];
      urnMesh.material.roughness = (preset.roughness + finish.roughness) * 0.5;
      urnMesh.material.needsUpdate = true;
    }
  });
});

// Size
document.querySelectorAll('#sizeOptions .config-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#sizeOptions .config-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSize = btn.dataset.size;
    if (urnMesh) {
      const scale = sizeScales[currentSize];
      urnMesh.scale.set(scale, scale, scale);
    }
    updatePrice();
  });
});

// Engraving text
let engravingTimeout;
document.getElementById('engravingText').addEventListener('input', (e) => {
  currentText = e.target.value;
  clearTimeout(engravingTimeout);
  engravingTimeout = setTimeout(() => {
    createUrn();
  }, 300);
});

// Font
document.querySelectorAll('.config-font').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.config-font').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFont = btn.dataset.font;
    if (currentText) createUrn();
  });
});

// --- Resize ---
function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);

// --- Ground plane ---
const groundGeo = new THREE.CircleGeometry(1.5, 64);
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 1,
  metalness: 0,
  transparent: true,
  opacity: 0.05
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Slow auto-rotate
  if (urnMesh && !controls.isDragging) {
    urnMesh.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
}

// --- Init ---
resize();
createUrn();
animate();
