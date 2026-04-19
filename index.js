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

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor && ring) {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.opacity = '0.2';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (cursor && ring) {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.opacity = '0.4';
    }
  });
});

const items = [
  'New Arrivals',
  'Free Shipping Over $150',
  'SS25 Collection Live',
  'Worldwide Shipping',
  'Handcrafted Quality',
  'Limited Runs'
];

const track = document.getElementById('marqueeTrack');
if (track) {
  const repeated = [...items, ...items, ...items, ...items];
  repeated.forEach((txt, i) => {
    const span = document.createElement('span');
    span.className = 'marquee-item' + (i % 2 === 1 ? ' marquee-dot' : '');
    span.textContent = i % 2 === 1 ? '·' : txt;
    track.appendChild(span);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

async function loadProducts() {
  try {
    const products = [
  {
    name: "Obsidian Hoodie",
    category: "Outerwear",
    price: 125,
    image: "https://via.placeholder.com/400x600",
    description: "A heavyweight hoodie cut with a relaxed silhouette, dropped shoulders, and a washed obsidian tone designed for everyday wear.",
    fabric: "100% Cotton Fleece",
    fit: "Relaxed Fit",
    color: "Obsidian Black",
    sizes: "S, M, L, XL",
    code: "VLC-OH-001"
  },
  {
    name: "Ash Cargo Trousers",
    category: "Bottoms",
    price: 95,
    image: "https://via.placeholder.com/400x600",
    description: "Structured cargo trousers with a straight-leg fit, utility pocket detailing, and a muted ash finish built for movement.",
    fabric: "Cotton Twill Blend",
    fit: "Straight Leg",
    color: "Ash Grey",
    sizes: "28, 30, 32, 34, 36",
    code: "VLC-ACP-002"
  },
  {
    name: "Noir Tee",
    category: "Tops",
    price: 45,
    image: "https://via.placeholder.com/400x600",
    description: "A premium essential tee with a slightly oversized cut, soft hand feel, and deep noir tone for a minimal everyday look.",
    fabric: "240 GSM Cotton Jersey",
    fit: "Boxy Fit",
    color: "Noir Black",
    sizes: "S, M, L, XL",
    code: "VLC-NT-003"
  }
];

    const grid = document.getElementById('productGrid');
    if (!grid) return;

    if (!products.length) {
      grid.innerHTML = '<p style="font-size:0.8rem; color: var(--ash);">No products available right now.</p>';
      return;
    }

    grid.innerHTML = products.map((product, index) => {
      return `
        <div 
  class="collection-card reveal"
  style="transition-delay:${index * 0.1}s"
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
            <img src="${product.image}" alt="${product.name}">
            <div class="card-overlay">
              <span class="card-overlay-text">Quick View</span>
            </div>
          </div>
          <div class="card-label">
            <div>
              <p class="card-name">${product.name}</p>
              <p class="card-tag">${product.category} · SS25</p>
            </div>
            <span class="card-price">$${product.price}</span>
          </div>
        </div>
      `;
    }).join('');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
   document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => { 
     openProductModal({
  name: card.dataset.name,
  category: card.dataset.category,
  price: card.dataset.price,
  image: card.dataset.image,
  description: card.dataset.description,
  fabric: card.dataset.fabric,
  fit: card.dataset.fit,
  color: card.dataset.color,
  sizes: card.dataset.sizes,
  code: card.dataset.code
});
   });
 });   
  } catch (error) {
    console.error('Error loading products:', error);

    const grid = document.getElementById('productGrid');
    if (grid) {
      grid.innerHTML = '<p style="font-size:0.8rem; color: var(--ash);">Failed to load products.</p>';
    }
  }
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
});

const siteLoader = document.getElementById('siteLoader');

document.body.classList.add('loading');

function hideLoader() {
  if (siteLoader) {
    siteLoader.classList.add('hidden');
  }
  document.body.classList.remove('loading');
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 5000);
});

updateActiveNav();
loadProducts();

const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalFabric = document.getElementById('modalFabric');
const modalFit = document.getElementById('modalFit');
const modalColor = document.getElementById('modalColor');
const modalSizes = document.getElementById('modalSizes');
const modalCode = document.getElementById('modalCode');

function openProductModal(product) {
  if (!productModal) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalName.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `$${product.price}`;
  modalDescription.textContent = product.description || "";
  modalFabric.textContent = product.fabric || "";
  modalFit.textContent = product.fit || "";
  modalColor.textContent = product.color || "";
  modalSizes.textContent = product.sizes || "";
  modalCode.textContent = product.code || "";

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
  if (e.key === 'Escape') closeProductModal();
});
 document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductModal();
});

const siteAudio = document.getElementById('siteAudio');
const playPauseTrack = document.getElementById('playPauseTrack');
const songPopup = document.getElementById('songPopup');
const songPopupTitle = document.getElementById('songPopupTitle');

const playlist = [
  {
    title: 'Treasue In The Hills - Leon Thomas',
    src: 'music/track1.mp3'
  },
  {
    title: 'Friends Again - Baby Rose , Leon Thomas',
    src: 'music/track2.mp3'
  },
  {
    title: 'Track Three',
    src: 'music/track3.mp3'
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
let popupTimeout;
let fadeInterval = null; 
 
function loadTrack(index) {
  const track = playlist[index];
  if (!track || !siteAudio) return;

  siteAudio.src = track.src;
  songPopupTitle.textContent = `Now Playing — ${track.title}`;
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

function playTrack() {
  if (!siteAudio) return;

  siteAudio.play().then(() => {
      isPlaying = true;
      playPauseTrack.textContent = '⏸';
      playPauseTrack.classList.add('playing');
      fadeInAudio(0.7, 1200); 
      showSongPopup();
    }).catch(error => {
      console.error('Playback blocked:', error);
    });
}

function pauseTrack() {
  if (!siteAudio) return;

  siteAudio.pause();
  isPlaying = false;
  playPauseTrack.textContent = '▶';
  playPauseTrack.classList.remove('playing');
}

function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

if (playPauseTrack) {
  playPauseTrack.addEventListener('click', togglePlayPause);
}

if (siteAudio) {
  siteAudio.addEventListener('ended', playNextTrack);
}

loadTrack(currentTrackIndex);
playPauseTrack.textContent = '▶';
 function fadeInAudio(targetVolume = 0.7, duration = 1200) {
  if (!siteAudio) return;

  clearInterval(fadeInterval);
  siteAudio.volume = 0;

  const stepTime = 50;
  const steps = duration / stepTime;
  const volumeStep = targetVolume / steps;

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
  const steps = duration / stepTime;
  const startVolume = siteAudio.volume || 0.7;
  const volumeStep = startVolume / steps;

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
 const savedIndex = localStorage.getItem('vlc_music_index');
const savedPlaying = localStorage.getItem('vlc_music_playing');

if (savedIndex !== null) {
  currentTrackIndex = parseInt(savedIndex, 10) || 0;
}

loadTrack(currentTrackIndex);
playPauseTrack.textContent = '▶';

if (savedPlaying === 'true') {
  songPopupTitle.textContent = `Ready — ${playlist[currentTrackIndex].title}`;
}
const darkSections = document.querySelectorAll('.statement-section');

darkSections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    cursor.style.background = '#ffffff';
    ring.style.borderColor = '#ffffff';
  });

  section.addEventListener('mouseleave', () => {
    cursor.style.background = 'var(--ink)';
    ring.style.borderColor = 'var(--ink)';
  });
});
const nav = document.querySelector('nav');
const darkSection = document.querySelector('.statement-section');
const audio = document.querySelector('.music-toggle-wrap');

function checkNavColor() {
  const navRect = nav.getBoundingClientRect();
  const sectionRect = darkSection.getBoundingClientRect();

  const isOverDark =
    navRect.bottom > sectionRect.top &&
    navRect.top < sectionRect.bottom;

  // NAV
  nav.classList.toggle('nav-white', isOverDark);

  // AUDIO
  if (audio) {
    audio.classList.toggle('audio-white', isOverDark);
  }
}

window.addEventListener('scroll', checkNavColor);

// Run once on load
checkNavColor();
