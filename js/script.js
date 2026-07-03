// Mobile nav toggle
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

burgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
  burgerBtn.classList.toggle('is-active');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    burgerBtn.classList.remove('is-active');
  });
});

// Liquid glass — pointer-tracked highlight on glass surfaces
// Skipped on touch devices: no real hover there, and it saves battery/perf.
const supportsFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (supportsFineHover) {
  const glassEls = document.querySelectorAll('.glass');
  let pendingEl = null, pendingX = 0, pendingY = 0, ticking = false;

  const applyHighlight = () => {
    pendingEl.style.setProperty('--mx', pendingX + '%');
    pendingEl.style.setProperty('--my', pendingY + '%');
    ticking = false;
  };

  glassEls.forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      pendingEl = el;
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyHighlight);
      }
    });
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.willChange = 'transform, opacity';
      el.classList.add('is-visible');
      el.addEventListener('transitionend', () => { el.style.willChange = 'auto'; }, { once: true });
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
