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

  // ── PROJECT CARD INTERACTIONS ───────────────────────
  const projectCards = document.querySelectorAll('.project-card');
  let overCard = false;

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => { overCard = true; });
    card.addEventListener('mouseleave', () => { overCard = false; });

    // Update shine position only
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        shine.style.setProperty('--mouse-x', (x / rect.width * 100) + '%');
        shine.style.setProperty('--mouse-y', (y / rect.height * 100) + '%');
      }
    });

    // Project links
    card.addEventListener('click', () => {
      if (card.id === "project-panorama") {
        window.open("https://gaurangsharma262-panorama-deploy.hf.space/", "_blank");
      } else if (card.id === "project-ipl") {
        window.open("https://ipl-prediction-r5b8.onrender.com/", "_blank");
      } else if (card.id === "project-chatbot") {
        window.open("https://ai-chatbot-06fq.onrender.com/", "_blank");
      } else if (card.id === "project-yatrabook") {
        window.open("https://yatrabook-collegemajor-9wf3.vercel.app/", "_blank");
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

  // ── LIGHTWEIGHT SPRING WEB ─────────────────────────────
  const canvas = document.getElementById('web-canvas');
  const ctx    = canvas.getContext('2d');

  const COLORS = [
    '#FF3B3B','#FF6B35','#FF9F1C','#FFCF40',
    '#39D353','#00C9B1','#00B4D8','#4361EE',
    '#7B2FBE','#D62AD0','#FF5FA0','#06D6A0'
  ];

  // Small grid — lightweight
  const COLS = 16, ROWS = 10;
  const COUNT = COLS * ROWS;

  const homeX = new Float32Array(COUNT);
  const homeY = new Float32Array(COUNT);
  const curX  = new Float32Array(COUNT);
  const curY  = new Float32Array(COUNT);
  const velX  = new Float32Array(COUNT);
  const velY  = new Float32Array(COUNT);
  const phase = new Float32Array(COUNT);
  const color = [];

  let W = window.innerWidth, H = window.innerHeight;

  function setup() {
    canvas.width  = W;
    canvas.height = H;
    const padX = W * 0.05, padY = H * 0.05;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        homeX[i] = curX[i] = padX + (c / (COLS - 1)) * (W - padX * 2);
        homeY[i] = curY[i] = padY + (r / (ROWS - 1)) * (H - padY * 2);
        velX[i]  = velY[i] = 0;
        phase[i] = Math.random() * Math.PI * 2;
        color[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
    }
  }

  // Pre-build connections: right, down, diagonal — O(n) per particle
  const edges = []; // [i, j] pairs
  function buildEdges() {
    edges.length = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        if (c < COLS - 1)                       edges.push(i, i + 1);           // right
        if (r < ROWS - 1)                       edges.push(i, i + COLS);        // down
        if (c < COLS - 1 && r < ROWS - 1)       edges.push(i, i + COLS + 1);   // diag ↘
        if (c > 0 && r < ROWS - 1)              edges.push(i, i + COLS - 1);   // diag ↙
      }
    }
  }

  setup();
  buildEdges();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    setup(); buildEdges();
  });

  const mouse = { x: W / 2, y: H / 2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const SPRING = 0.035, DAMP = 0.78, REP_R = 120, REP_F = 12, AMP = 5, SPD = 0.006;
  let t = 0;

  function tick() {
    requestAnimationFrame(tick);
    t += SPD;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < COUNT; i++) {
      const ox = Math.sin(t + phase[i])       * AMP;
      const oy = Math.cos(t * 0.8 + phase[i]) * AMP;

      velX[i] += (homeX[i] + ox - curX[i]) * SPRING;
      velY[i] += (homeY[i] + oy - curY[i]) * SPRING;

      const dx = curX[i] - mouse.x, dy = curY[i] - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < REP_R * REP_R && d2 > 0.1) {
        const d = Math.sqrt(d2), f = (REP_R - d) / REP_R;
        velX[i] += (dx / d) * f * f * REP_F;
        velY[i] += (dy / d) * f * f * REP_F;
      }

      velX[i] *= DAMP; velY[i] *= DAMP;
      curX[i] += velX[i]; curY[i] += velY[i];
    }

    // Draw edges
    const n = edges.length;
    for (let k = 0; k < n; k += 2) {
      const i = edges[k], j = edges[k + 1];
      const mx = (curX[i] + curX[j]) * 0.5;
      const my = (curY[i] + curY[j]) * 0.5;
      const dm = Math.sqrt((mx - mouse.x) ** 2 + (my - mouse.y) ** 2);
      const alpha = Math.max(0.06, 0.55 - dm / 600);

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color[i];
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(curX[i], curY[i]);
      ctx.lineTo(curX[j], curY[j]);
      ctx.stroke();
    }

    // Draw nodes
    ctx.globalAlpha = 1;
    for (let i = 0; i < COUNT; i++) {
      const dx = curX[i] - mouse.x, dy = curY[i] - mouse.y;
      const dm = Math.sqrt(dx * dx + dy * dy);
      const a  = Math.max(0.15, 0.85 - dm / 500);
      ctx.globalAlpha = a;
      ctx.fillStyle   = color[i];
      ctx.beginPath();
      ctx.arc(curX[i], curY[i], 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  tick();

})();


function openEmail() {
  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=gaurangsharma262@gmail.com", "_blank");
}
