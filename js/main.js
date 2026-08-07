// Reveal-on-scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Video modal
const modal = document.getElementById('workModal');
const modalVideo = document.getElementById('modalVideo');
const modalSource = document.getElementById('modalSource');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.getAttribute('data-video');
    modalSource.setAttribute('src', src);
    modalVideo.load();
    modal.classList.add('open');
    modalVideo.play().catch(() => {});
  });
});

function closeModal() {
  modal.classList.remove('open');
  modalVideo.pause();
  modalSource.setAttribute('src', '');
  modalVideo.load();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Animated stat counters
const counters = document.querySelectorAll('[data-count]');
const cIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target + (el.getAttribute('data-suffix') || ''); return; }
        el.textContent = cur + (el.getAttribute('data-suffix') || '');
        requestAnimationFrame(tick);
      };
      tick();
      cIo.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => cIo.observe(el));
