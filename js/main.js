/* ══════════════════════════════════
   SURYAM GROUP — main.js
   Navigation · Tabs · Scroll · Reveal
══════════════════════════════════ */

/* ── PAGE NAVIGATION ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo(0, 0);

  // Hide main nav on project detail pages
  const nav = document.getElementById('mainNav');
  nav.style.display = (id === 'btw' || id === 'sage') ? 'none' : 'flex';

  // Re-trigger scroll reveal for new page
  setTimeout(initReveal, 100);
}

function navTo(id) {
  showPage(id);
  toggleMenu();
}

function goContact() {
  showPage('home');
  setTimeout(() => {
    const el = document.getElementById('home-contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 120);
}

/* ── MENU OVERLAY ── */
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('menuOv').classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

/* ── NAV SCROLL STATE ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')
    .classList.toggle('scrolled', window.scrollY > 60);
});

/* ── TAB SWITCHER — Homepage projects ── */
/*function switchTab(el, tab) {
  document.querySelectorAll('.proj-tabs .proj-tab')
    .forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('tab-ongoing').style.display   = tab === 'ongoing'   ? 'block' : 'none';
  document.getElementById('tab-completed').style.display = tab === 'completed' ? 'block' : 'none';
}*/

/* ── TAB SWITCHER — Projects page ── */
function switchProjTab(el, tab) {
  el.closest('.proj-tabs').querySelectorAll('.proj-tab')
    .forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('tab-ongoing-proj').style.display   = tab === 'ongoing-proj'   ? 'block' : 'none';
  document.getElementById('tab-completed-proj').style.display = tab === 'completed-proj' ? 'block' : 'none';
}

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, { threshold: 0.08 });

function initReveal() {
  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));
}

// Init on page load
initReveal();
