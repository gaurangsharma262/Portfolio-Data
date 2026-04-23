/* ═══════════════════════════════════════════════════════
   GAURANG SHARMA — MINIMALIST ANTIGRAVITY ENGINE
   Scroll · Physics · Tilt · Float
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── SCROLL REVEAL ───────────────────────────
  const sections = document.querySelectorAll('.section');

  function checkSections() {
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      const trigger = window.innerHeight - 100;

      if (top < trigger) {
        sec.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkSections);
  setTimeout(checkSections, 100);

  // ── 3D TILT ON PROJECT CARDS ───────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

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
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

      // Project links
    card.addEventListener('click', () => {
      if (card.id === "project-panorama") {
        window.open("https://huggingface.co/spaces/gaurangsharma262/panorama-deploy", "_blank");
      } else if (card.id === "project-ipl") {
        window.open("https://ipl-prediction-r5b8.onrender.com/", "_blank");
      } else if (card.id === "project-chatbot") {
        window.open("https://ai-chatbot-demo.onrender.com/", "_blank"); // Placeholder
      } else if (card.id === "project-yatrabook") {
        window.open("https://yatrabook.vercel.app/", "_blank"); // Placeholder
      } else if (card.id === "project-sales") {
        window.open("#", "_blank"); // Placeholder
      }
    });
  });

  // ── ANTIGRAVITY EASTER EGG ─────────────────────────
  const antigravityBtn = document.getElementById('antigravity-btn');
  let isAntigravity = false;

  const floatTargets = document.querySelectorAll('.hero-left, .section, .footer');

  antigravityBtn.addEventListener('click', () => {
    isAntigravity = !isAntigravity;
    antigravityBtn.classList.toggle('active', isAntigravity);
    document.body.classList.toggle('antigravity-mode', isAntigravity);

    if (isAntigravity) {
      antigravityBtn.textContent = '⬇';

      floatTargets.forEach((el, i) => {
        // Assign random floating variables
        const y = -(Math.random() * 400 + 100);
        const r = (Math.random() - 0.5) * 20;
        const o = 0.4 + Math.random() * 0.4;
        const d = 3 + Math.random() * 3;

        el.style.setProperty('--ag-y', y);
        el.style.setProperty('--ag-r', r);
        el.style.setProperty('--ag-o', o);
        el.style.setProperty('--duration', d + 's');
        el.style.animationDelay = (i * 0.1) + 's';
        el.classList.add('antigravity-float');
      });
    } else {
      antigravityBtn.textContent = '⬆';
      floatTargets.forEach(el => {
        el.classList.remove('antigravity-float');
        el.style.transform = '';
        el.style.animationDelay = '';
      });
    }
  });

  // ── MAGNETIC BUTTONS ────────────────────────────────
  const btns = document.querySelectorAll('.btn, .antigravity-btn, .skill-tag, .contact-link');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = btn.classList.contains('contact-link') ? 0.1 : 0.3;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── TEXT DECODE EFFECT ─────────────────────────────
  const decodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  function decodeText(element) {
    const original = element.getAttribute('data-text');
    if (!original) return;
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = original.split('').map((char, index) => {
        if (index < iteration) return original[index];
        return decodeChars[Math.floor(Math.random() * decodeChars.length)];
      }).join('');
      iteration += 1 / 3;
      if (iteration >= original.length) clearInterval(interval);
    }, 30);
  }

  const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        decodeText(entry.target);
        decodeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.decode-text').forEach(el => decodeObserver.observe(el));

  // ── WEB STRUCTURE ENGINE (ANTIGRAVITY STYLE) ────────
  const canvas = document.getElementById('web-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const mouse = { x: null, y: null, radius: 250 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = 1.5;
    }
    update() {
      // Normal motion
      this.x += this.vx;
      this.y += this.vy;

      // Bounce
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Cursor attraction
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = (dx / distance) * force * 5;
        const directionY = (dy / distance) * force * 5;
        this.x += directionX;
        this.y += directionY;
      } else {
        // Return to base motion if needed or just drift
      }
    }
    draw() {
      ctx.fillStyle = '#A31D1D';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    let count = (canvas.width * canvas.height) / 15000; // Reduced density for performance
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          let opacity = 1 - (distance / 150);
          ctx.strokeStyle = `rgba(163, 29, 29, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

})();


function openEmail() {
  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=gaurangsharma262@gmail.com", "_blank");
}
