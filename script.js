// script.js — interactivity for Sandra's Little World

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fade-in sections as they enter the viewport
  const sections = document.querySelectorAll('.section, .final-note');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add the visible state via a small style injection
  const style = document.createElement('style');
  style.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // Little floating hearts when the hero star is clicked
  const star = document.querySelector('.hero-card .star');
  if (star) {
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.textContent = '♡';
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 40 - 20}px`;
        heart.style.top = '0px';
        heart.style.opacity = '1';
        heart.style.transition = 'transform 1s ease, opacity 1s ease';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '18px';
        heart.style.color = '#f7c9d8';
        star.style.position = 'relative';
        star.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translateY(-60px) translateX(${Math.random() * 30 - 15}px)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 1000);
      }
    });
  }

  // Rotate the "current mood" line for a bit of life
  const moods = [
    'eat something good',
    'watch something dramatic',
    'hang out with friends',
    'stream CORTIS on repeat'
  ];
  const quoteText = document.querySelector('.quote-card p');
  if (quoteText) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % moods.length;
      quoteText.style.opacity = 0;
      setTimeout(() => {
        quoteText.textContent = moods[i];
        quoteText.style.transition = 'opacity 0.4s ease';
        quoteText.style.opacity = 1;
      }, 400);
    }, 3500);
  }

});
