(function () {
  var USERNAME = 'sweetchimp';
  var API_URL = 'https://api.github.com/users/' + USERNAME + '/repos?sort=updated&per_page=100';
  var GITHUB_URL = 'https://github.com/' + USERNAME;
  var CACHE_KEY = 'gh-projects:' + USERNAME;
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

  function buildCard(repo) {
    var name = escapeHtml(formatName(repo.name));
    var desc = repo.description && repo.description.trim()
      ? escapeHtml(repo.description.trim())
      : escapeHtml(NO_DESCRIPTION);
    var url = escapeHtml(repo.html_url);

    var card = document.createElement('a');
    card.className = 'project-card';
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    var title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = formatName(repo.name);

    var description = document.createElement('p');
    description.className = 'project-desc';
    description.textContent = desc;

    card.appendChild(title);
    card.appendChild(description);

    var updated = formatUpdatedDate(repo.pushed_at);
    if (updated) {
      var date = document.createElement('p');
      date.className = 'project-updated';
      date.textContent = updated;
      card.appendChild(date);
    }

    return card;
  }

  function formatUpdatedDate(value) {
    if (!value) return '';
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';
    var parts = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return 'Updated ' + parts;
  }

  function buildFallback() {
    var wrapper = document.createElement('div');
    wrapper.className = 'projects-fallback';

    var text = document.createElement('p');
    text.textContent = 'Check out all my projects on GitHub';

    var link = document.createElement('a');
    link.href = GITHUB_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = GITHUB_URL;

    wrapper.appendChild(text);
    wrapper.appendChild(link);
    return wrapper;
  }

  function render(repos) {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    var originals = repos.filter(function (repo) { return !repo.fork; });
    if (!originals.length) {
      grid.appendChild(buildFallback());
      return;
    }

    var top = rankRepos(originals).slice(0, MAX_PROJECTS);
    top.forEach(function (repo) {
      grid.appendChild(buildCard(repo));
    });
  }

  function renderError() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    grid.appendChild(buildFallback());
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

  document.addEventListener('DOMContentLoaded', function () {
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
        if (!Array.isArray(repos) || !repos.length) {
          renderError();
          return;
        }
        writeCache(repos);
        render(repos);
      })
      .catch(function () {
        renderError();
      });
  });
})();
