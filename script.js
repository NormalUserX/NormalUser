// Optional: Add interaction features such as smooth scroll or animations
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.querySelector('#menu').offsetTop, behavior: 'smooth' });
  });
});
