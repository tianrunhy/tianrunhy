/* Tianrun Hengyuan Technology - Main JavaScript */

(function() {
  'use strict';

  // ====== Scroll Header ======
  const header = document.querySelector('.site-header');
  if (header) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      // active section highlighting
      document.querySelectorAll('section[id]').forEach(sec => {
        const top = sec.offsetTop - 130;
        const h = sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.main-nav a[href*="#${id}"]`);
        if (link && y >= top && y < top + h) {
          document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ====== Mobile Menu ======
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ====== Reveal on Scroll ======
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // ====== Number Counter ======
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const ease = t => 1 - Math.pow(1 - t, 3);
    const animateCounter = el => {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || '0', 10);
      const dur = 1800;
      const start = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - start) / dur);
        const val = (target * ease(p)).toFixed(dec);
        el.textContent = val;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cntIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          animateCounter(en.target);
          cntIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cntIO.observe(c));
  }

  // ====== Smooth In-page Anchors ======
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        const el = document.querySelector(id);
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ====== Legal TOC Active ======
  const tocLinks = document.querySelectorAll('.legal-toc a[href^="#"]');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const tocIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const id = '#' + en.target.id;
          tocLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => tocIO.observe(s));
  }



  // ====== Scroll Progress Bar ======
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // ====== Back to Top Button ======
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '<svg viewBox=\"0 0 24 24\"><path d=\"M12 4l-8 8h5v8h6v-8h5z\"/></svg>';
  document.body.appendChild(btt);
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) btt.classList.add('show');
    else btt.classList.remove('show');
  }, { passive: true });

  // ====== Mobile Menu Enhancements ======
  if (toggle && nav) {
    // Add both icons (menu + close) into toggle
    toggle.innerHTML = '<svg class=\"menu-icon\" viewBox=\"0 0 24 24\"><path d=\"M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z\"/></svg><svg class=\"close-icon\" viewBox=\"0 0 24 24\"><path d=\"M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z\"/></svg>';
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (isOpen) {
        const firstLink = nav.querySelector('a');
        if (firstLink) setTimeout(() => firstLink.focus(), 280);
      }
    });
    // Trap focus inside open nav
    nav.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
      if (e.key === 'Tab' && nav.classList.contains('open')) {
        const focusables = nav.querySelectorAll('a, button');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ====== Lazy Load Images with Fade-in ======
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading=\"lazy\"]').forEach(img => {
      if (img.complete) { img.classList.add('loaded'); }
      else { img.addEventListener('load', () => img.classList.add('loaded')); }
    });
  } else {
    // Fallback for older browsers
    const lazyIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const img = en.target;
          if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
          img.classList.add('loaded');
          lazyIO.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[loading=\"lazy\"]').forEach(img => lazyIO.observe(img));
  }

  // ====== Cookie Consent Banner ======
  (function(){
    const KEY = 'tianrunhy-cookie-consent';
    if (localStorage.getItem(KEY)) return;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = '<p>We use <strong>strictly necessary cookies</strong> for routing and security. No advertising cookies on this site. <a href=\"privacy.html#cookies\">Read our cookie policy</a>.</p><div class=\"cookie-actions\"><button class=\"btn-accept\" data-act=\"all\">Accept all</button><button class=\"btn-reject\" data-act=\"necessary\">Necessary only</button></div>';
    document.body.appendChild(banner);
    setTimeout(() => banner.classList.add('show'), 1200);
    banner.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem(KEY, btn.dataset.act);
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 600);
      });
    });
  })();

  // ====== Form Validation Enhancement ======
  const form = document.querySelector('#contactForm');
  if (form) {
    const validators = {
      firstName: v => v.length >= 1 || 'Required',
      lastName: v => v.length >= 1 || 'Required',
      email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Enter a valid email',
      message: v => v.length >= 10 || 'Tell us a bit more (10+ characters)',
      topic: v => v !== '' || 'Please select a topic'
    };
    Object.keys(validators).forEach(name => {
      const input = form.querySelector('[name=\"' + name + '\"]');
      if (!input) return;
      const field = input.closest('.field');
      const err = document.createElement('div');
      err.className = 'error-msg';
      field.appendChild(err);
      input.addEventListener('blur', () => {
        const result = validators[name](input.value.trim());
        if (result === true) {
          field.classList.remove('has-error');
          input.classList.remove('error');
          input.classList.add('success');
          err.textContent = '';
        } else {
          field.classList.add('has-error');
          input.classList.add('error');
          input.classList.remove('success');
          err.textContent = result;
        }
      });
      input.addEventListener('input', () => {
        if (field.classList.contains('has-error')) {
          const result = validators[name](input.value.trim());
          if (result === true) {
            field.classList.remove('has-error');
            input.classList.remove('error');
            input.classList.add('success');
            err.textContent = '';
          }
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      Object.keys(validators).forEach(name => {
        const input = form.querySelector('[name=\"' + name + '\"]');
        if (!input) return;
        const result = validators[name](input.value.trim());
        const field = input.closest('.field');
        const err = field.querySelector('.error-msg');
        if (result !== true) {
          field.classList.add('has-error');
          input.classList.add('error');
          if (err) err.textContent = result;
          ok = false;
        }
      });
      if (!ok) {
        const firstError = form.querySelector('.has-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      const btn = form.querySelector('button[type=\"submit\"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '\u2713 Message Sent';
        btn.style.background = '#1aaa55';
        form.reset();
        form.querySelectorAll('.field').forEach(f => f.classList.remove('has-error'));
        form.querySelectorAll('input, textarea, select').forEach(i => i.classList.remove('success','error'));
        setTimeout(() => {
          btn.innerHTML = orig; btn.disabled = false; btn.style.background = '';
        }, 2400);
      }, 900);
    });
  }

  // ====== Console Greeting ======
  console.log('%cTIANRUN HENGYUAN TECH', 'color:#E82127; font-size:24px; font-weight:bold; letter-spacing:2px;');
  console.log('%cData stays local. Crafted with care.', 'color:#666; font-size:13px;');
})();
