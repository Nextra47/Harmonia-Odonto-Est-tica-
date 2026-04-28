// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Hero image animation
window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('loaded');
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');
menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  });
});

// Tabs serviços
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.cards-grid').forEach(g => g.classList.add('hidden'));
    document.getElementById('tab-' + btn.dataset.tab)?.classList.remove('hidden');
  });
});

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
