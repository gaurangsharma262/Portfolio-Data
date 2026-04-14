/* ═══════════════════════════════════════════════════════
   GAURANG SHARMA — ANTIGRAVITY PORTFOLIO ENGINE
   Particles · Physics · Decode · Tilt · Antigravity
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── HERO LETTER ANIMATION ──────────────────────────
  const heroNameEl = document.getElementById('hero-name');
  const nameHTML = 'Gaurang<br><em>Sharma</em>';

  function buildLetters() {
    // Parse the template and wrap each visible character in a span
    let result = '';
    let inTag = false;
    let delay = 0;
    const parts = nameHTML.split(/(<[^>]+>)/);

    parts.forEach(part => {
      if (part.startsWith('<')) {
        result += part;
      } else {
        for (const char of part) {
          if (char === ' ') {
            result += ' ';
          } else {
            result += `<span class="letter" style="animation-delay:${delay * 0.07}s">${char}</span>`;
            delay++;
          }
        }
      }
    });

    heroNameEl.innerHTML = result;
  }

  buildLetters();

  // ── PARTICLE CANVAS ────────────────────────────────
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 150;
  const MOUSE_RADIUS = 200;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.baseAlpha = Math.random() * 0.5 + 0.15;
      this.alpha = this.baseAlpha;
      // Random color from palette
      const colors = ['165,240,60', '60,240,198', '110,142,251'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
        this.alpha = Math.min(1, this.baseAlpha + force * 0.5);
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.05;
      }

      // Damping
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(165,240,60,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Track mouse for particles + cursor glow
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // ── CURSOR GLOW ────────────────────────────────────
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  let glowX = 0, glowY = 0;
  let targetGlowX = 0, targetGlowY = 0;

  document.addEventListener('mousemove', (e) => {
    targetGlowX = e.clientX;
    targetGlowY = e.clientY;
  });

  function updateGlow() {
    glowX += (targetGlowX - glowX) * 0.08;
    glowY += (targetGlowY - glowY) * 0.08;

    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';

    requestAnimationFrame(updateGlow);
  }

  updateGlow();

  // ── SCROLL REVEAL (with stagger support) ───────────
  const sections = document.querySelectorAll('.section');

  function checkSections() {
    sections.forEach((sec, i) => {
      const top = sec.getBoundingClientRect().top;
      const trigger = window.innerHeight - 100;

      if (top < trigger) {
        sec.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkSections);
  // Initial check
  setTimeout(checkSections, 100);

  // ── SCROLL PROGRESS BAR ────────────────────────────
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = percent + '%';
  });

  // ── TEXT DECODE EFFECT ─────────────────────────────
  const decodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

  function decodeText(element) {
    const original = element.getAttribute('data-text');
    if (!original || element.dataset.decoded === 'true') return;
    element.dataset.decoded = 'true';

    let iteration = 0;
    const maxIterations = original.length;

    const interval = setInterval(() => {
      element.textContent = original
        .split('')
        .map((char, index) => {
          if (index < iteration) return original[index];
          return decodeChars[Math.floor(Math.random() * decodeChars.length)];
        })
        .join('');

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        element.textContent = original;
        clearInterval(interval);
      }
    }, 40);
  }

  // Observe decode-text elements
  const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        decodeText(entry.target);
        decodeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.decode-text').forEach(el => {
    decodeObserver.observe(el);
  });

  // ── 3D TILT ON PROJECT CARDS ───────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      // Update shine position
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        shine.style.setProperty('--mouse-x', percentX + '%');
        shine.style.setProperty('--mouse-y', percentY + '%');
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });

    // Click expand
    card.addEventListener('click', () => {
  // If it's the IPL project → open link
  if (card.id === "project-1") {
    window.open("https://ipl-prediction-r5b8.onrender.com/", "_blank");
    return;
  }

  // Otherwise keep normal behavior
  card.classList.toggle('active');
});
  });

  // ── MAGNETIC EFFECT ON BUTTONS ─────────────────────
  const magneticEls = document.querySelectorAll('.btn, .contact-link, .antigravity-btn');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // ── ANTIGRAVITY EASTER EGG ─────────────────────────
  const antigravityBtn = document.getElementById('antigravity-btn');
  let isAntigravity = false;

  const floatTargets = document.querySelectorAll(
    '.hero, .status-bar, .section, .footer'
  );

  antigravityBtn.addEventListener('click', () => {
    isAntigravity = !isAntigravity;
    antigravityBtn.classList.toggle('active', isAntigravity);
    document.body.classList.toggle('antigravity-mode', isAntigravity);

    if (isAntigravity) {
      antigravityBtn.textContent = '⬇';

      floatTargets.forEach((el, i) => {
        // Random float parameters
        const y = -(Math.random() * 300 + 100);
        const r = (Math.random() - 0.5) * 15;
        const s = 0.85 + Math.random() * 0.15;
        const o = 0.3 + Math.random() * 0.5;

        el.style.setProperty('--ag-y', y);
        el.style.setProperty('--ag-r', r);
        el.style.setProperty('--ag-s', s);
        el.style.setProperty('--ag-o', o);
        el.classList.add('antigravity-float');
        el.style.animationDelay = (i * 0.12) + 's';
      });

      // Make particles float upward
      particles.forEach(p => {
        p.vy -= Math.random() * 3;
      });

    } else {
      antigravityBtn.textContent = '⬆';

      floatTargets.forEach(el => {
        el.classList.remove('antigravity-float');
        el.style.transform = '';
        el.style.opacity = '';
        el.style.animationDelay = '';
      });
    }
  });

  // ── SKILL TAGS: SUBTLE HOVER RIPPLE ────────────────
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      // Briefly boost adjacent tags
      const siblings = [...tag.parentElement.children];
      const index = siblings.indexOf(tag);

      [-1, 1].forEach(offset => {
        const neighbor = siblings[index + offset];
        if (neighbor) {
          neighbor.style.transform = 'translateY(-2px)';
          neighbor.style.transition = 'transform 0.3s ease';
          setTimeout(() => {
            neighbor.style.transform = '';
          }, 300);
        }
      });
    });
  });

  // ── FLOATING NAV HIDE ON SCROLL UP ─────────────────
  const floatingNav = document.getElementById('floating-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 300) {
      floatingNav.style.opacity = '1';
      floatingNav.style.pointerEvents = 'auto';
    } else {
      floatingNav.style.opacity = '0';
      floatingNav.style.pointerEvents = 'none';
    }

    lastScroll = currentScroll;
  });

  // Start hidden
  floatingNav.style.opacity = '0';
  floatingNav.style.pointerEvents = 'none';
  floatingNav.style.transition = 'opacity 0.4s ease';

  // ── SMOOTH ANCHOR SCROLL FOR NAV ───────────────────
  document.querySelectorAll('.floating-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── KONAMI CODE EXTRA EASTER EGG ───────────────────
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        // Explosion of particles
        for (let i = 0; i < 50; i++) {
          const p = new Particle();
          p.x = canvas.width / 2;
          p.y = canvas.height / 2;
          p.vx = (Math.random() - 0.5) * 10;
          p.vy = (Math.random() - 0.5) * 10;
          p.radius = Math.random() * 4 + 1;
          p.alpha = 1;
          particles.push(p);
        }
        // Clean up extra particles after a while
        setTimeout(() => {
          particles.splice(PARTICLE_COUNT);
        }, 5000);
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ── PRELOADER FADE ─────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();

function openEmail() {
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=gaurangsharma262@gmail.com",
    "_blank"
  );
}

function openProject() {
  window.open("https://ipl-prediction-r5b8.onrender.com/", "_blank");
}