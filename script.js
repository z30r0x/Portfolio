/* ── Cursor ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

function addHover(sel) {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width  = '20px'; cur.style.height  = '20px';
      ring.style.width = '54px'; ring.style.height = '54px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width  = '12px'; cur.style.height  = '12px';
      ring.style.width = '38px'; ring.style.height = '38px';
    });
  });
}
addHover('a, button, .skill-chip, .proj-card, .contact-item, .filter-btn, .tl-item, .achieve-card');

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tl-item, .cert-card, .edu-card, .achieve-card').forEach(el => obs.observe(el));

/* ── Active nav highlight ── */
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

/* ── SVG fallback banners (used only when no image is set) ── */
const BANNERS = {
  default_mobile: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#101010"/><stop offset="100%" stop-color="#1e1e1e"/></linearGradient></defs><rect width="400" height="180" fill="url(#gm)"/><rect x="166" y="22" width="68" height="116" rx="12" fill="none" stroke="#2a2a2a" stroke-width="1.5"/><rect x="178" y="36" width="44" height="72" rx="3" fill="#181818"/><circle cx="200" cy="124" r="6" fill="none" stroke="#2e2e2e" stroke-width="1.5"/><text x="200" y="158" text-anchor="middle" fill="#333" font-size="10" font-family="monospace" letter-spacing="4">MOBILE APP</text></svg>`,

  default_web: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gw" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#111"/><stop offset="100%" stop-color="#1c1c1c"/></linearGradient></defs><rect width="400" height="180" fill="url(#gw)"/><rect x="88" y="42" width="224" height="96" rx="6" fill="none" stroke="#252525" stroke-width="1.5"/><rect x="88" y="42" width="224" height="24" rx="6" fill="#181818" stroke="#2a2a2a" stroke-width="1"/><circle cx="106" cy="54" r="4" fill="#252525"/><circle cx="120" cy="54" r="4" fill="#252525"/><circle cx="134" cy="54" r="4" fill="#252525"/><rect x="104" y="82" width="90" height="7" rx="2" fill="#222"/><rect x="104" y="97" width="130" height="5" rx="2" fill="#1c1c1c"/><rect x="104" y="110" width="110" height="5" rx="2" fill="#1c1c1c"/><text x="200" y="158" text-anchor="middle" fill="#333" font-size="10" font-family="monospace" letter-spacing="4">WEB PROJECT</text></svg>`,

  default_security: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gs" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a0a"/><stop offset="100%" stop-color="#181818"/></linearGradient></defs><rect width="400" height="180" fill="url(#gs)"/><path d="M200 30 l44 20 v36 c0 24-44 48-44 48s-44-24-44-48V50z" fill="none" stroke="#2a2a2a" stroke-width="1.5"/><path d="M187 92 l9 9 18-18" stroke="#444" stroke-width="2" stroke-linecap="round" fill="none"/><text x="200" y="158" text-anchor="middle" fill="#333" font-size="10" font-family="monospace" letter-spacing="4">SECURITY</text></svg>`
};

function getFallbackBanner(p) {
  if (p.type === 'security') return BANNERS.default_security;
  if (p.type === 'mobile')   return BANNERS.default_mobile;
  return BANNERS.default_web;
}

/* ── Projects — exact data from CV & repo links ── */
const PROJECTS = [
  {
    name:  'BMI Calculator',
    desc:  'A simple UI app that calculates Body Mass Index based on the user\'s weight and height, with real-time health classification, custom UI widgets, and input validation.',
    lang:  'Dart, Flutter',
    type:  'mobile',
    year:  '2026',
    url:   'https://github.com/z30r0x/BMI_calculator',
    image: 'images/bmi.png'
  },
  {
    name:  'Notes App',
    desc:  'A simple UI app to create, edit, and delete notes. Features full CRUD operations, local persistence, state management, and a clean Material Design interface.',
    lang:  'Dart, Flutter',
    type:  'mobile',
    year:  '2026',
    url:   'https://github.com/z30r0x/Notes_App',
    image: 'images/notes.png'
  },
  {
    name:  'Booking App',
    desc:  'A Flutter booking application with date and time selection, reservation management, and a clean intuitive user interface built with Dart and Flutter.',
    lang:  'Dart, Flutter',
    type:  'mobile',
    year:  '2026',
    url:   'https://github.com/z30r0x/Booking_App',
    image: 'images/booking.png'
  },
  {
    name:  'E-Commerce App',
    desc:  'NTI graduation project — a multi-screen Flutter shopping app with product listings, cart management, RESTful API integration, and a complete user authentication flow.',
    lang:  'Dart, Flutter',
    type:  'mobile',
    year:  '2026',
    url:   'https://github.com/z30r0x/E-Commerce_app',
    image: 'images/ecommerce.png'
  },
  {
    name:  'Authentication App',
    desc:  'A Flutter app with full-screen login and registration flows, form validation, and state management — demonstrating secure authentication UI patterns.',
    lang:  'Dart, Flutter',
    type:  'mobile',
    year:  '2026',
    url:   'https://github.com/z30r0x/Authentication_App',
    image: 'images/authentication.png'
  },
  {
    name:  'Asyut Hack Club',
    desc:  'Community website for the Asyut Hack Club — a hub for local developers and cybersecurity enthusiasts, featuring events, resources, and team information.',
    lang:  'HTML, CSS',
    type:  'web',
    year:  '2025',
    url:   'https://github.com/z30r0x/Asyut_Hack_Club',
    image: 'images/hackclub.png'
  },
  {
    name:  'School Management System',
    desc:  'A multi-role responsive web app for student and staff management, built with HTML5, CSS3, and Bootstrap 5, with GitHub-based collaborative workflow.',
    lang:  'HTML, Bootstrap',
    type:  'web',
    year:  '2025',
    url:   'https://github.com/z30r0x',
    image: 'images/schoolmanagement.png'
  },
  {
    name:  'Course Application Form',
    desc:  'An accessible, responsive multi-step course application form built with advanced HTML and CSS, featuring client-side validation and a polished UX.',
    lang:  'HTML, CSS',
    type:  'web',
    year:  '2023',
    url:   'https://github.com/z30r0x',
    image: 'images/courseform.png'
  },
];

/* ── Render ── */
function renderProjects(list) {
  const grid = document.getElementById('projGrid');
  grid.innerHTML = list.map(p => `
    <div class="proj-card pb-${p.type}" data-type="${p.type}">
      <div class="proj-banner">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name} screenshot" loading="lazy" onerror="this.parentElement.innerHTML='${getFallbackBanner(p).replace(/'/g, "\\'")}'" />`
          : getFallbackBanner(p)
        }
      </div>
      <div class="proj-body">
        <div class="proj-card-label">Project</div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-meta">${p.type} &nbsp;·&nbsp; ${p.year}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-skills">
          ${p.lang.split(',').map(t => `<span class="skill-tag">${t.trim()}</span>`).join('')}
        </div>
        <a href="${p.url}" target="_blank" class="proj-link">View on GitHub →</a>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.proj-card').forEach(el => obs.observe(el));
  addHover('.proj-card');
}

function filterProjects(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(c => {
    c.classList.toggle('hidden', type !== 'all' && c.dataset.type !== type);
  });
}

/* ── Always render from PROJECTS (canonical source of truth) ── */
renderProjects(PROJECTS);

/* ── Contact form ── */
function handleSubmit(btn) {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();
  const errorEl = document.getElementById('form-error');

  /* Validation */
  if (!name || !email || !message) {
    errorEl.textContent = 'Please fill in all fields before sending.';
    errorEl.style.display = 'block';
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    errorEl.textContent = 'Please enter a valid email address.';
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';

  /* Build mailto and open default mail client */
  const to      = 'toka.sayed.ahmed@outlook.com';
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  /* Button feedback */
  btn.textContent = '✓ Opening mail app…';
  btn.style.background = '#222';
  btn.style.color = '#888';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
  }, 4000);
}