/* gallery.js – Full‑screen image viewer with left/right navigation */

/* 1️⃣ Get all elements we’ll need */
const galleryImages = document.querySelectorAll('.obrazek');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const closeBtn = document.getElementById('close');

let currentIndex = 0; // index of the currently displayed image

/* 2️⃣ Helper: show image at index */
function showImage(index) {
  if (index < 0 || index >= galleryImages.length) return;
  currentIndex = index;
  overlayImg.src = galleryImages[index].src;
  overlayImg.alt = galleryImages[index].alt || '';
  overlay.classList.remove('hidden');
}

/* 3️⃣ Attach click handlers to gallery images */
galleryImages.forEach((img, idx) => {
  img.addEventListener('click', () => showImage(idx));
});

/* 4️⃣ Navigation buttons */
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

/* 5️⃣ Keyboard navigation */
document.addEventListener('keydown', (e) => {
  if (overlay.classList.contains('hidden')) return; // only when overlay open
  switch (e.key) {
    case 'ArrowLeft':  showImage(currentIndex - 1); break;
    case 'ArrowRight': showImage(currentIndex + 1); break;
    case 'Escape':     overlay.classList.add('hidden'); break;
  }
});

/* 6️⃣ Click outside image to close */
overlay.addEventListener('click', (e) => {
  if (e.target === overlayImg || e.target === prevBtn || e.target === nextBtn) return;
  overlay.classList.add('hidden');
});

