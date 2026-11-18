'use strict';

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMenu(event) {
  const mode = pointerMotion(event) ? 'animated' : 'instant';
  mobileMenu.dataset.motion = mode;
  menuButton.dataset.motion = mode;
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', event => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  const mode = pointerMotion(event) ? 'animated' : 'instant';
  mobileMenu.dataset.motion = mode;
  menuButton.dataset.motion = mode;
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu(event);
});
window.matchMedia('(min-width:801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', event => {
    cancelFades();
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.room').forEach(room => {
      const wasHidden = room.hidden;
      room.hidden = button.dataset.filter !== 'all' && room.dataset.size !== button.dataset.filter;
      if (!room.hidden) {
        room.querySelectorAll('[data-reveal="pending"]').forEach(revealImage);
        if (wasHidden) fadeIn(room, pointerMotion(event));
      }
    });
  });
});

const galleries = {
  rooms45: { title: 'Rooms 4 & 5', images: [
    ['assets/rooms-45.jpg', 'Two-bed room · Air conditioning · Private bathroom'],
    ['assets/rooms45-alternate-clean.jpg', 'Another view of the sleeping area'],
    ['assets/rooms45-exterior-clean.jpg', 'The porch outside Rooms 4 and 5'],
    ['assets/rooms45-bathroom-clean.jpg', 'Private bathroom and shower']
  ] },
  rooms12: { title: 'Rooms 1 & 2', images: [
    ['assets/rooms-12.jpg', 'Double bed and bunk beds · Good for 12 guests'],
    ['assets/rooms12-exterior.jpg', 'The bamboo-fronted accommodation'],
    ['assets/rooms12-porch.jpg', 'The shaded porch outside the room']
  ] },
  room3: { title: 'Room 3', images: [
    ['assets/room-3.jpg', 'The sleeping area · Good for 10 guests'],
    ['assets/room3-porch.jpg', 'A shaded porch to sit and relax'],
    ['assets/room3-beach-view.jpg', 'The view towards the beach'],
    ['assets/room3-exterior.jpg', 'The entrance and porch'],
    ['assets/room3-kitchen.jpg', 'Own kitchen and private bathroom']
  ] },
  resthouse: { title: 'The Rest House', images: [
    ['assets/rest-house.jpg', 'The rest house sleeping area · Good for 8 guests'],
    ['assets/resthouse-dining.jpg', 'The shared dining space'],
    ['assets/resthouse-exterior.jpg', 'The rest house at the resort'],
    ['assets/beach-hero.jpg', 'Looking out at the beach']
  ] },
  cottages: { title: 'Open Beach Cottages', images: [
    ['assets/cottage.jpg', 'Shady open cottages beside the beach'],
    ['assets/cottage-2.jpg', 'A place to gather for the day'],
    ['assets/cottage-3.jpg', 'Our cottage spaces'],
    ['assets/cottage-4.jpg', 'A closer look at the cottages']
  ] },
  kitchen: { title: 'The Shared Kitchen', images: [
    ['assets/kitchen.jpg', 'Shared outdoor cooking and washing area']
  ] },
  bathrooms: { title: 'Bathroom Facilities', images: [
    ['assets/bathroom-shared.jpg', 'Shared bathroom facilities'],
    ['assets/rooms45-bathroom-clean.jpg', 'The private bathroom in Rooms 4 and 5']
  ] }
};

const gallery = document.querySelector('#gallery');
const galleryImage = document.querySelector('#gallery-image');
const galleryStage = document.querySelector('.gallery-stage');
let currentGallery;
let currentPhoto = 0;
let galleryTrigger;
let photoRequest = 0;

function showPhoto(animate = false) {
  const request = ++photoRequest;
  const [src, caption] = currentGallery.images[currentPhoto];
  galleryImage.getAnimations().forEach(animation => animation.cancel());
  galleryStage.setAttribute('aria-busy', 'true');
  document.querySelector('#gallery-title').textContent = currentGallery.title;
  document.querySelector('#gallery-caption').textContent = caption;
  document.querySelector('#gallery-counter').textContent = `${currentPhoto + 1} / ${currentGallery.images.length}`;
  document.querySelector('#gallery-prev').disabled = currentPhoto === 0;
  document.querySelector('#gallery-next').disabled = currentPhoto === currentGallery.images.length - 1;

  let settled = false;
  const loaded = () => {
    if (request !== photoRequest || settled) return;
    settled = true;
    galleryStage.setAttribute('aria-busy', 'false');
    fadeIn(galleryImage, animate && gallery.open);
  };
  galleryImage.onload = loaded;
  galleryImage.onerror = () => {
    if (request !== photoRequest) return;
    galleryStage.setAttribute('aria-busy', 'false');
    document.querySelector('#gallery-caption').textContent = 'This photo could not load. Please try another photo.';
  };
  galleryImage.alt = caption;
  galleryImage.src = src;
  if (galleryImage.complete && galleryImage.naturalWidth) loaded();
}

document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', event => {
    galleryTrigger = button;
    currentGallery = galleries[button.dataset.gallery];
    currentPhoto = 0;
    gallery.dataset.motion = pointerMotion(event) ? 'animated' : 'instant';
    showPhoto();
    gallery.showModal();
    document.body.classList.add('gallery-open');
    document.querySelector('#gallery-close').focus();
  });
});

function closeGallery(event) {
  gallery.dataset.motion = pointerMotion(event) ? 'animated' : 'instant';
  gallery.close();
}
document.querySelector('#gallery-close').addEventListener('click', closeGallery);
gallery.addEventListener('cancel', () => { gallery.dataset.motion = 'instant'; });
gallery.addEventListener('click', event => {
  if (event.target !== gallery) return;
  const rect = gallery.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    closeGallery(event);
  }
});
gallery.addEventListener('close', () => {
  document.body.classList.remove('gallery-open');
  galleryTrigger?.focus({ preventScroll: true });
});

function movePhoto(direction, event) {
  if (!currentGallery) return;
  const nextPhoto = Math.max(0, Math.min(currentGallery.images.length - 1, currentPhoto + direction));
  if (nextPhoto === currentPhoto) return;
  currentPhoto = nextPhoto;
  showPhoto(pointerMotion(event));
}
document.querySelector('#gallery-prev').addEventListener('click', event => movePhoto(-1, event));
document.querySelector('#gallery-next').addEventListener('click', event => movePhoto(1, event));
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
  }
});

const stays = {
  rooms45: { name: 'Rooms 4 or 5', price: 3000, capacity: 4, period: 'overnight' },
  room12: { name: 'Rooms 1 or 2', price: 3500, capacity: 12, period: 'overnight' },
  room3: { name: 'Room 3 with own kitchen', price: 4000, capacity: 10, period: 'overnight' },
  resthouse: { name: 'Rest House', price: 2500, capacity: 8, period: 'overnight' },
  'cottage-day': { name: 'a day-tour cottage', price: 400, capacity: 15, period: 'day tour' },
  'cottage-night': { name: 'an overnight cottage', price: 800, capacity: 15, period: 'overnight' }
};
const staySelect = document.querySelector('#stay');
const guestsInput = document.querySelector('#guests');
const arrival = document.querySelector('#arrival');
const manilaParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit'
}).formatToParts(new Date());
const dateParts = Object.fromEntries(manilaParts.map(part => [part.type, part.value]));
arrival.min = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;

function updateCapacity() {
  const stay = stays[staySelect.value];
  const guests = Number(guestsInput.value);
  document.querySelector('#capacity-note').textContent = guests > stay.capacity
    ? `This stay is good for ${stay.capacity} guests. Ask us about extra guests or additional rooms for your group.`
    : `Good for ${stay.capacity} guests. ${staySelect.value.startsWith('cottage') ? 'Beach entrance: ₱30 per person.' : 'Ask us how entrance applies to your booking.'}`;
  document.querySelector('#inquiry-result').hidden = true;
}
staySelect.addEventListener('change', updateCapacity);
guestsInput.addEventListener('input', updateCapacity);
arrival.addEventListener('change', () => { document.querySelector('#inquiry-result').hidden = true; });
const scrollBehavior = () => motionPreference.matches ? 'auto' : 'smooth';

document.querySelectorAll('[data-stay]').forEach(button => {
  button.addEventListener('click', () => {
    staySelect.value = button.dataset.stay;
    guestsInput.value = Math.min(4, stays[staySelect.value].capacity);
    updateCapacity();
    document.querySelector('#booking').scrollIntoView({ behavior: scrollBehavior() });
    staySelect.focus({ preventScroll: true });
  });
});

let inquiryMessage = '';
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const stay = stays[staySelect.value];
  const date = new Date(`${arrival.value}T12:00:00`);
  const displayDate = date.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
  inquiryMessage = `Hello Yolly Beach Resort! I would like to ask about ${stay.name} for ${guestsInput.value} guests on ${displayDate} (${stay.period}). I saw the listed rate of ₱${stay.price.toLocaleString('en-PH')}. Could you please confirm availability, the total including applicable entrance fees, and the booking arrangements? Thank you!`;
  document.querySelector('#inquiry-message').textContent = inquiryMessage;
  document.querySelector('#sms-link').href = `sms:+639633168453?body=${encodeURIComponent(inquiryMessage)}`;
  document.querySelector('#copy-status').textContent = '';
  const result = document.querySelector('#inquiry-result');
  result.hidden = false;
  fadeIn(result, document.documentElement.dataset.input === 'pointer');
  result.scrollIntoView({ block: 'nearest', behavior: scrollBehavior() });
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(inquiryMessage);
    document.querySelector('#copy-status').textContent = 'Copied. You can paste this into a message to us.';
  } catch {
    document.querySelector('#copy-status').textContent = 'Please select and copy the enquiry text above, then paste it into your message.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
