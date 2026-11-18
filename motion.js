// Small, interruptible transitions; all content is visible without JavaScript.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionEase = 'cubic-bezier(0.23, 1, 0.32, 1)';
const runningAnimations = new Set();
document.documentElement.dataset.input = 'pointer';

document.addEventListener('pointerdown', () => {
  document.documentElement.dataset.input = 'pointer';
}, { capture: true, passive: true });
document.addEventListener('keydown', () => {
  document.documentElement.dataset.input = 'keyboard';
}, { capture: true });

function pointerMotion(event) {
  return !motionPreference.matches && Boolean(event && event.detail > 0);
}

function fadeIn(element, enabled = true) {
  if (!enabled || !element.animate) return;
  const animation = element.animate([{ opacity: 0.55 }, { opacity: 1 }], {
    duration: motionPreference.matches ? 100 : 180,
    easing: motionEase
  });
  runningAnimations.add(animation);
  const done = () => runningAnimations.delete(animation);
  animation.addEventListener('finish', done, { once: true });
  animation.addEventListener('cancel', done, { once: true });
}

function cancelFades() {
  [...runningAnimations].forEach(animation => animation.cancel());
}

let revealObserver;
const revealImages = [...document.querySelectorAll(
  '.about-photo img, .room-photo > img, .cottage-image > img, .amenity-grid .image-button img, .visit figure img'
)];

function revealImage(image) {
  image.dataset.reveal = 'visible';
  revealObserver?.unobserve(image);
}

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) revealImage(entry.target);
    });
  }, { threshold: 0.08 });

  revealImages.forEach(image => {
    // Above-the-fold imagery remains immediate; later photographs reveal once.
    if (image.getBoundingClientRect().top >= window.innerHeight) {
      image.classList.add('reveal-media');
      image.dataset.reveal = 'pending';
      revealObserver.observe(image);
    }
  });
}

document.addEventListener('focusin', event => {
  const container = event.target.closest('.room-photo, .image-button, .cottage-image');
  container?.querySelectorAll('[data-reveal="pending"]').forEach(revealImage);
});

motionPreference.addEventListener('change', () => {
  cancelFades();
  if (motionPreference.matches) {
    revealImages.forEach(revealImage);
    revealObserver?.disconnect();
    document.querySelector('#gallery').dataset.motion = 'instant';
    document.querySelector('#mobile-menu').dataset.motion = 'instant';
  }
});

window.addEventListener('beforeprint', () => revealImages.forEach(revealImage));
