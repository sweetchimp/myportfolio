(function () {
  var USERNAME = 'sweetchimp';
  var API_URL = 'https://api.github.com/users/' + USERNAME + '/repos?sort=updated&per_page=100';
  var GITHUB_URL = 'https://github.com/' + USERNAME;
  var CACHE_KEY = 'gh-projects:v2:' + USERNAME;
  var CACHE_TTL_MS = 15 * 60 * 1000;
  var MAX_PROJECTS = 6;
  var NO_DESCRIPTION = 'No description provided';
  var MAX_COMMIT_LENGTH = 90;

  /* GitHub's language palette (fallback to the site accent) */
  var LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    PHP: '#4F5D95',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    'C#': '#178600',
    'C++': '#f34b7d',
    C: '#555555',
    Java: '#b07219',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Vue: '#41b883',
    Shell: '#89e051',
    Go: '#00ADD8',
    Ruby: '#701516',
    Rust: '#dea584',
    Blade: '#f7523f'
  };

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

  function truncate(str, max) {
    var text = String(str || '').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    return text.slice(0, max - 1).trim() + '\u2026';
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

  /* "Updated 3 days ago" — falls back to an absolute date for old pushes */
  function relativeTime(value) {
    if (!value) return '';
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';

    var seconds = Math.round((Date.now() - date.getTime()) / 1000);
    if (seconds < 0) seconds = 0;
    if (seconds < 60) return 'just now';

    var units = [
      { limit: 3600, secs: 60, label: 'minute' },
      { limit: 86400, secs: 3600, label: 'hour' },
      { limit: 2592000, secs: 86400, label: 'day' },
      { limit: 31536000, secs: 2592000, label: 'month' },
      { limit: Infinity, secs: 31536000, label: 'year' }
    ];
    for (var i = 0; i < units.length; i++) {
      if (seconds < units[i].limit) {
        var amount = Math.floor(seconds / units[i].secs);
        return amount + ' ' + units[i].label + (amount === 1 ? '' : 's') + ' ago';
      }
    }
    return '';
  }

  function fetchLatestCommit(fullName) {
    return fetch('https://api.github.com/repos/' + fullName + '/commits?per_page=1', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Commit request failed');
        return res.json();
      })
      .then(function (data) {
        var commit = Array.isArray(data) ? data[0] : null;
        if (!commit || !commit.commit) return null;
        var committedAt = (commit.commit.committer && commit.commit.committer.date) ||
          (commit.commit.author && commit.commit.author.date) || '';
        return {
          message: (commit.commit.message || '').split('\n')[0],
          sha: commit.sha || '',
          date: committedAt
        };
      })
      .catch(function () {
        return null;
      });
  }

  function buildStats(repo) {
    var stats = document.createElement('div');
    stats.className = 'project-stats';

    if (repo.language) {
      var lang = document.createElement('span');
      lang.className = 'project-stat project-stat--lang';
      var dot = document.createElement('span');
      dot.className = 'lang-dot';
      dot.style.background = LANG_COLORS[repo.language] || 'var(--primary)';
      lang.appendChild(dot);
      lang.appendChild(document.createTextNode(repo.language));
      stats.appendChild(lang);
    }

    var stars = repo.stargazers_count || 0;
    if (stars > 0) {
      var starsEl = document.createElement('span');
      starsEl.className = 'project-stat project-stat--stars';
      starsEl.textContent = stars + ' \u2605';
      starsEl.title = stars + ' star' + (stars === 1 ? '' : 's');
      stats.appendChild(starsEl);
    }

    return stats.children.length ? stats : null;
  }

  function buildCard(repo) {
    var name = escapeHtml(formatName(repo.name));
    var desc = repo.description && repo.description.trim()
      ? escapeHtml(repo.description.trim())
      : escapeHtml(NO_DESCRIPTION);

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

    var stats = buildStats(repo);
    if (stats) card.appendChild(stats);

    var commit = repo.latest_commit;
    if (commit && commit.message) {
      var commitEl = document.createElement('p');
      commitEl.className = 'project-commit';
      commitEl.title = commit.message;
      commitEl.textContent = truncate(commit.message, MAX_COMMIT_LENGTH);
      card.appendChild(commitEl);
    }

    var updated = relativeTime(repo.pushed_at);
    if (updated) {
      var date = document.createElement('p');
      date.className = 'project-updated';
      date.textContent = 'Updated ' + updated;
      card.appendChild(date);
    }

    return card;
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

  /* Attach the latest commit to each of the top repos (best-effort) */
  function enrich(repos) {
    var originals = repos.filter(function (repo) { return !repo.fork; });
    var top = rankRepos(originals).slice(0, MAX_PROJECTS);

    return Promise.all(top.map(function (repo) {
      return fetchLatestCommit(repo.full_name).then(function (commit) {
        repo.latest_commit = commit;
      });
    })).then(function () {
      return repos;
    });
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
          return null;
        }
        return enrich(repos);
      })
      .then(function (repos) {
        if (!repos) return;
        writeCache(repos);
        render(repos);
      })
      .catch(function () {
        renderError();
      });
  });
})();
