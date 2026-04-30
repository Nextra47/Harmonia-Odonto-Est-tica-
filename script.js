// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

// Hero animation
window.addEventListener('load', () => document.querySelector('.hero')?.classList.add('loaded'));

// Mobile nav
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.style.overflow = '';
}));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  });
});

// Sobre images slide from right
const sobreImages = document.querySelector('.sobre-images');
if (sobreImages) {
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) { sobreImages.classList.add('slide-in'); obs.disconnect(); }
  }, { threshold: 0.2 }).observe(sobreImages);
}

// Services tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.servicos-lista').forEach(g => g.classList.add('hidden'));
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

// Contact form — Formspree
document.getElementById('contactForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...'; btn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      btn.textContent = '✓ Solicitação Enviada!'; btn.style.background = '#4CAF50';
      form.reset();
      setTimeout(() => { btn.textContent = 'Solicitar Avaliação Gratuita'; btn.style.background = ''; btn.disabled = false; }, 4000);
    } else {
      btn.textContent = 'Erro, tente novamente'; btn.style.background = '#e53935'; btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Erro, tente novamente'; btn.style.background = '#e53935'; btn.disabled = false;
  }
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.13, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
