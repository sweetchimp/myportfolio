/* ═══════════════════════════════════════════════════════════
   JOSHKO LABS — page interactions & animations
   Standalone; independent from portfolio JS by design.
   Requires html.js class (added inline in <head>) so that all
   JS-driven hidden states are opt-in and no-JS renders fine.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LETTER_STAGGER_MS = 55;

  /* ── Success banner dismiss ── */
  function initBanner() {
    var banner = document.querySelector('.success-banner');
    if (!banner) return;
    var timer = null;
    if (!reduceMotion) {
      timer = setTimeout(dismiss, 5000);
    }
    banner.querySelector('.banner-dismiss').addEventListener('click', function () {
      if (timer) clearTimeout(timer);
      dismiss();
    });
    function dismiss() {
      banner.classList.add('banner-fade-out');
      banner.addEventListener('transitionend', function () {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      });
      setTimeout(function () {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      }, 500);
    }
  }

  /* ── Mobile hamburger ── */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      this.closest('.nav-bar').classList.toggle('nav-open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        var bar = document.querySelector('.nav-bar');
        bar.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Hero entrance ── */
  function initHero() {
    var hero = document.querySelector('.kl-hero');
    var title = document.querySelector('.kl-hero-title');
    if (!hero || !title || title.dataset.done) return;
    title.dataset.done = '1';

    if (reduceMotion) {
      /* Static fallback: everything simply fades in once */
      hero.classList.add('is-settled-simple');
      return;
    }

    var text = title.textContent.trim();
    title.textContent = '';

    var frag = document.createDocumentFragment();
    var letters = [];
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'kl-letter';
      span.setAttribute('aria-hidden', 'true');
      if (text[i] === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = text[i];
      }
      frag.appendChild(span);
      letters.push(span);
    }
    title.appendChild(frag);

    /* Keep an accessible copy of the full word for screen readers */
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    title.appendChild(sr);

    title.classList.add('is-animating');
    hero.classList.add('is-animating');

    letters.forEach(function (span, i) {
      span.style.transitionDelay = i * LETTER_STAGGER_MS + 'ms';
    });

    var tagline = document.querySelector('.kl-tagline');
    var lateFades = document.querySelectorAll('.kl-fade-late');
    var brand = document.querySelector('.kl-fade-first');
    if (brand) brand.style.transitionDelay = '0ms';
    var taglineDelayMs = letters.length * LETTER_STAGGER_MS + 260;
    if (tagline) tagline.style.transitionDelay = taglineDelayMs + 'ms';
    lateFades.forEach(function (el) {
      el.style.transitionDelay = taglineDelayMs + 190 + 'ms';
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (brand) brand.classList.add('is-shown');
        title.classList.add('is-settled');
        if (tagline) tagline.classList.add('is-shown');
        lateFades.forEach(function (el) { el.classList.add('is-shown'); });
      });
    });
  }

  /* ── Service tabs ── */
  function initTabs() {
    var tablist = document.querySelector('.kl-tablist');
    var wrap = document.querySelector('.kl-panel-wrap');
    if (!tablist || !wrap) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.kl-tabpanel'));
    if (!tabs.length || panels.length !== tabs.length) return;

    var current = 0;
    var swapTimer = null;

    function equalizeHeights() {
      var maxH = 0;
      panels.forEach(function (p) {
        var wasHidden = p.hidden;
        p.hidden = false;
        p.style.visibility = 'hidden';
        maxH = Math.max(maxH, p.offsetHeight);
        p.style.visibility = '';
        p.hidden = wasHidden;
      });
      wrap.style.minHeight = maxH > 0 ? maxH + 'px' : '';
    }

    function wiggle(panel) {
      panel.classList.remove('wiggle');
      void panel.offsetWidth;
      panel.classList.add('wiggle');
    }

    function setStateInstant(i) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', String(j === i));
        t.tabIndex = j === i ? 0 : -1;
      });
      panels.forEach(function (p, j) {
        p.hidden = j !== i;
        p.classList.remove('is-leaving', 'is-entering', 'is-shown');
      });
    }

    function activate(i, focusTab) {
      if (i === current) {
        if (focusTab) tabs[i].focus();
        return;
      }
      var prev = current;
      current = i;

      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', String(j === i));
        t.tabIndex = j === i ? 0 : -1;
      });
      if (focusTab) tabs[i].focus();

      var prevPanel = panels[prev];
      var nextPanel = panels[i];

      if (reduceMotion) {
        setStateInstant(i);
        return;
      }

      clearTimeout(swapTimer);
      panels.forEach(function (p, j) {
        if (j !== prev && j !== i) {
          p.hidden = true;
          p.classList.remove('is-leaving', 'is-entering', 'is-shown');
        }
      });

      prevPanel.classList.remove('is-entering', 'is-shown');
      prevPanel.classList.add('is-leaving');

      swapTimer = setTimeout(function () {
        prevPanel.hidden = true;
        prevPanel.classList.remove('is-leaving');

        nextPanel.hidden = false;
        nextPanel.classList.add('is-entering');
        void nextPanel.offsetWidth;
        nextPanel.classList.add('is-shown');

        swapTimer = setTimeout(function () {
          nextPanel.classList.remove('is-entering', 'is-shown');
        }, 320);

        wiggle(nextPanel);
      }, 165);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(i, false); });
    });

    tablist.addEventListener('keydown', function (e) {
      var idx = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') idx = (current + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') idx = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') idx = 0;
      else if (e.key === 'End') idx = tabs.length - 1;
      if (idx !== null) {
        e.preventDefault();
        activate(idx, true);
      }
    });

    setStateInstant(0);
    equalizeHeights();

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalizeHeights, 150);
    });
  }

  /* ── Scroll reveals ── */
  function initReveals() {
    var reveals = Array.prototype.slice.call(document.querySelectorAll('.js-reveal'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.js-reveal-card'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.concat(cards).forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    /* Stagger cards inside their grid */
    document.querySelectorAll('.kl-work-grid').forEach(function (grid) {
      Array.prototype.slice.call(grid.querySelectorAll('.js-reveal-card')).forEach(function (card, i) {
        card.style.transitionDelay = i * 150 + 'ms';
      });
    });
    document.querySelectorAll('.kl-why-grid').forEach(function (grid) {
      Array.prototype.slice.call(grid.querySelectorAll('.js-reveal')).forEach(function (card, i) {
        card.style.transitionDelay = i * 100 + 'ms';
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    reveals.concat(cards).forEach(function (el) { io.observe(el); });
  }

  /* ── Magnetic buttons ── */
  function initMagneticButtons() {
    if (reduceMotion || !window.matchMedia('(pointer:fine)').matches) return;

    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        var pullX = Math.max(-5, Math.min(5, dx * 0.14));
        var pullY = Math.max(-4, Math.min(4, dy * 0.18));
        btn.style.transform = 'translate(' + pullX.toFixed(1) + 'px,' + pullY.toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ── GitHub showcase ── */
  function initShowcase() {
    var grid = document.getElementById('kl-github-grid');
    if (!grid) return;

    var USERNAME = 'sweetchimp';
    var API_URL = 'https://api.github.com/users/' + USERNAME + '/repos?sort=updated&per_page=100';
    var CACHE_KEY = 'gh-joshko:' + USERNAME;
    var CACHE_TTL_MS = 15 * 60 * 1000;
    var MAX_PROJECTS = 6;
    var NO_DESCRIPTION = 'No description provided';

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function formatName(name) {
      return String(name)
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .split(' ')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }

    function recencyWeight(repo) {
      var pushed = new Date(repo.pushed_at).getTime();
      if (!pushed) return 0;
      return Math.min(1, pushed / Date.now());
    }

    function rankRepos(repos) {
      return repos.slice().sort(function (a, b) {
        var scoreA = (a.stargazers_count || 0) + recencyWeight(a);
        var scoreB = (b.stargazers_count || 0) + recencyWeight(b);
        if (scoreA !== scoreB) return scoreB - scoreA;
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
    }

    function formatUpdated(value) {
      var date = new Date(value);
      if (isNaN(date.getTime())) return '';
      var parts = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return 'Updated ' + parts;
    }

    function buildCard(repo) {
      var desc = repo.description && repo.description.trim()
        ? escapeHtml(repo.description.trim())
        : NO_DESCRIPTION;

      var card = document.createElement('article');
      card.className = 'kl-work-card kl-gh-card js-reveal-card';

      var kindText = repo.language || 'Code';
      var kind = document.createElement('p');
      kind.className = 'kl-work-kind';
      kind.textContent = kindText;

      var title = document.createElement('h3');
      title.textContent = formatName(repo.name);

      var body = document.createElement('p');
      body.className = 'kl-work-desc';
      body.textContent = desc;

      var meta = document.createElement('p');
      meta.className = 'kl-gh-meta';
      var updated = formatUpdated(repo.pushed_at);
      var stars = repo.stargazers_count || 0;
      meta.innerHTML = '<span>' + escapeHtml(updated || '\u00A0') + '</span>' +
        (stars > 0 ? '<span class="kl-gh-stars">' + stars + ' \u2605</span>' : '<span></span>');

      card.appendChild(kind);
      card.appendChild(title);
      card.appendChild(body);
      card.appendChild(meta);

      return card;
    }

    function revealCards(cards) {
      cards.forEach(function (card, i) {
        card.style.transitionDelay = i * 120 + 'ms';
      });

      if (reduceMotion || !('IntersectionObserver' in window)) {
        cards.forEach(function (card) { card.classList.add('is-visible'); });
        return;
      }

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

      cards.forEach(function (card) { io.observe(card); });
    }

    function render(repos) {
      grid.innerHTML = '';
      var originals = repos.filter(function (repo) { return !repo.fork; });
      if (!originals.length) return;

      var top = rankRepos(originals).slice(0, MAX_PROJECTS);
      var cards = top.map(buildCard);
      cards.forEach(function (card) { grid.appendChild(card); });
      revealCards(cards);
    }

    function readCache() {
      try {
        var raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        var parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.repos)) return null;
        if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
        return parsed.repos;
      } catch (e) {
        return null;
      }
    }

    function writeCache(repos) {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos: repos }));
      } catch (e) {
        // sessionStorage unavailable — ignore
      }
    }

    var cached = readCache();
    if (Array.isArray(cached)) {
      render(cached);
      return;
    }

    fetch(API_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API request failed');
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) throw new Error('Unexpected response');
        writeCache(repos);
        render(repos);
      })
      .catch(function () {
        /* Grid stays empty; the "See everything on GitHub" link below remains as fallback */
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initBanner();
    initNav();
    initHero();
    initTabs();
    initReveals();
    initMagneticButtons();
    initShowcase();
  });
})();
