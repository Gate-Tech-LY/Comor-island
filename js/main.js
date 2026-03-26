// ── main.js ─────────────────────────────────────────────────────────────
// Comor Island - Premium Vehicle Import Website

document.addEventListener('DOMContentLoaded', () => {

  // 1. ── Active nav link on scroll ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        currentId = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  // 2. ── Header shrink on scroll ────────────────────────────────────────
  const header = document.getElementById('header');
  function onScroll() {
    updateActiveLink();
    if (window.scrollY > 80) {
      header.style.borderBottomColor = 'rgba(227, 91, 28, 0.2)';
    } else {
      header.style.borderBottomColor = '';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // 3. ── Mobile hamburger menu ──────────────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-links');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navList.classList.remove('open'));
    });
  }

  // 4. ── Smooth scroll for all anchors ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 5. ── Reveal-on-scroll animation ────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // 6. ── Animated counters in hero stats ───────────────────────────────
  function animateCounter(el, target, suffix) {
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = '+' + count + (suffix || '');
    }, 25);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        const data = [500, 10, 30, 6];
        const suffix = ['', '', '', ''];
        nums.forEach((el, i) => {
          const raw = parseInt(el.textContent.replace(/\D/g, ''));
          animateCounter(el, raw || data[i], suffix[i]);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.hero-stats');
  if (statsBar) statsObserver.observe(statsBar);

});

// 7. ── Form submit handler ────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ تم إرسال طلبك بنجاح';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
