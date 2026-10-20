(function () {
  'use strict';

  var KEYWORD = 'terminal';
  var USERNAME = 'sweetchimp';
  var EMAIL = 'joshuakorutaro05@gmail.com';
  var GITHUB_URL = 'https://github.com/' + USERNAME;
  var CACHE_KEY = 'gh-projects:' + USERNAME;
  var PROMPT = 'guest@joshs-workspace:~$';
  var TYPE_DELAY = 18;
  var WELCOME = "Welcome. Type 'help' to see available commands.";

  var COMMANDS = [
    { name: 'help', desc: 'show available commands' },
    { name: 'whoami', desc: 'who is this user?' },
    { name: 'skills --list', desc: 'list technical skills' },
    { name: 'experience --show', desc: 'show experience entries' },
    { name: 'projects --list', desc: 'list GitHub projects' },
    { name: 'goals --list', desc: 'show goals' },
    { name: 'contact', desc: 'get in touch' },
    { name: 'github', desc: 'open my GitHub profile' },
    { name: 'cv --download', desc: 'download my CV' },
    { name: 'clear', desc: 'clear the screen' },
    { name: 'exit', desc: 'close the terminal' }
  ];

  var overlay, bodyEl, inputEl, closeBtn, hintBtn;
  var history = [];
  var historyIndex = -1;
  var buffer = '';
  var queue = [];
  var started = false;

  function init() {
    overlay = document.getElementById('terminal-overlay');
    bodyEl = document.getElementById('terminal-body');
    inputEl = document.getElementById('terminal-input');
    closeBtn = document.getElementById('terminal-close');
    hintBtn = document.getElementById('terminal-hint');
    if (!overlay || !bodyEl || !inputEl) return;

    closeBtn.addEventListener('click', close);
    if (hintBtn) hintBtn.addEventListener('click', open);
    inputEl.addEventListener('keydown', onInputKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function onDocumentKeydown(e) {
    if (e.key === 'Escape' && overlay && !overlay.hidden) {
      close();
      return;
    }
    if (overlay && !overlay.hidden) return;

    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.length !== 1) return;

    buffer = (buffer + e.key).toLowerCase().slice(-KEYWORD.length);
    if (buffer === KEYWORD) open();
  }

  function onInputKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      historyBack();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      historyForward();
      return;
    }
  }

  function historyBack() {
    if (!history.length) return;
    if (historyIndex < 0) historyIndex = history.length - 1;
    else if (historyIndex > 0) historyIndex--;
    inputEl.value = history[historyIndex];
  }

  function historyForward() {
    if (!history.length) return;
    if (historyIndex >= history.length - 1) {
      historyIndex = -1;
      inputEl.value = '';
      return;
    }
    historyIndex++;
    inputEl.value = history[historyIndex];
  }

  function open() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    buffer = '';
    historyIndex = -1;
    inputEl.value = '';
    inputEl.disabled = false;

    if (!started) {
      started = true;
      enqueueTypeLine(WELCOME);
      runQueue();
    }
    scrollToBottom();
    setTimeout(function () { inputEl.focus(); }, 50);
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    buffer = '';
    queue = [];
    inputEl.disabled = false;
  }

  function scrollToBottom() {
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function makeLine() {
    var line = document.createElement('div');
    line.className = 'term-line';
    bodyEl.appendChild(line);
    return line;
  }

  function echoCommand(input) {
    var line = makeLine();
    var p = document.createElement('span');
    p.className = 'term-prompt';
    p.textContent = PROMPT;
    line.appendChild(p);
    if (input) {
      line.appendChild(document.createTextNode(' '));
      var c = document.createElement('span');
      c.className = 'term-cmd';
      c.textContent = input;
      line.appendChild(c);
    }
    scrollToBottom();
  }

  function runCommand() {
    var input = inputEl.value.trim();
    if (input) history.push(input);
    historyIndex = -1;
    inputEl.value = '';
    echoCommand(input);
    if (!input) return;

    busyStart();
    execute(input);
    runQueue();
  }

  function busyStart() {
    inputEl.disabled = true;
  }

  function runQueue() {
    var item = queue.shift();
    if (!item) {
      inputEl.disabled = false;
      inputEl.focus();
      return;
    }
    item(runQueue);
  }

  function enqueueTypeLine(text) {
    queue.push(function (done) { typeLine(text, done); });
  }

  function enqueueTypeLineWithLink(text, href, linkText) {
    queue.push(function (done) { typeLineWithLink(text, href, linkText, done); });
  }

  function enqueueAction(fn) {
    queue.push(function (done) { fn(); done(); });
  }

  function typeLine(text, done) {
    var line = makeLine();
    var out = document.createElement('span');
    out.className = 'term-output';
    line.appendChild(out);

    var i = 0;
    (function tick() {
      if (i < text.length) {
        out.textContent = text.slice(0, i + 1);
        i++;
        scrollToBottom();
        setTimeout(tick, TYPE_DELAY);
      } else if (done) {
        done();
      }
    })();
  }

  function typeLineWithLink(text, href, linkText, done) {
    var line = makeLine();
    var out = document.createElement('span');
    out.className = 'term-output';
    line.appendChild(out);

    var i = 0;
    (function tick() {
      if (i < text.length) {
        out.textContent = text.slice(0, i + 1);
        i++;
        scrollToBottom();
        setTimeout(tick, TYPE_DELAY);
      } else {
        var a = document.createElement('a');
        a.className = 'term-link';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = linkText;
        line.appendChild(a);
        scrollToBottom();
        done();
      }
    })();
  }

  function execute(input) {
    var lower = input.toLowerCase();
    var parts = lower.split(/\s+/);
    var cmd = parts[0];
    var arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help': cmdHelp(); break;
      case 'whoami': cmdWhoami(); break;
      case 'skills': cmdSkills(arg); break;
      case 'experience': cmdExperience(arg); break;
      case 'projects': cmdProjects(arg); break;
      case 'goals': cmdGoals(arg); break;
      case 'contact': cmdContact(); break;
      case 'github': cmdGithub(); break;
      case 'cv': cmdCv(arg); break;
      case 'clear': cmdClear(); break;
      case 'exit': cmdExit(); break;
      default:
        enqueueTypeLine("command not found: " + input + " \u2014 type 'help' for a list of commands");
    }
  }

  function cmdHelp() {
    enqueueTypeLine('Available commands:');
    COMMANDS.forEach(function (c) {
      enqueueTypeLine((c.name + '        ').slice(0, 20) + c.desc);
    });
  }

  function cmdWhoami() {
    enqueueTypeLine('Joshua Korutaro Mwesigwa \u2014 CS Engineering Student, University of Debrecen');
  }

  function cmdSkills(arg) {
    if (arg !== '--list') {
      enqueueTypeLine('Usage: skills --list');
      return;
    }
    var cats = document.querySelectorAll('.skills-category');
    if (!cats.length) {
      enqueueTypeLine('Skills not found.');
      return;
    }
    enqueueTypeLine('Skills:');
    cats.forEach(function (cat) {
      var label = cat.querySelector('.category-label');
      var tags = cat.querySelectorAll('.tag');
      var tagNames = Array.prototype.map.call(tags, function (t) { return t.textContent.trim(); });
      enqueueTypeLine('- ' + (label ? label.textContent.trim() : '') + ': ' + tagNames.join(', '));
    });
  }

  function cmdExperience(arg) {
    if (arg !== '--show') {
      enqueueTypeLine('Usage: experience --show');
      return;
    }
    var cards = document.querySelectorAll('.exp-card');
    if (!cards.length) {
      enqueueTypeLine('Experience not found.');
      return;
    }
    enqueueTypeLine('Experience:');
    cards.forEach(function (card) {
      var role = card.querySelector('.exp-role');
      var company = card.querySelector('.exp-company');
      var line = (role ? role.textContent.trim() : '') + (company ? ' \u2014 ' + company.textContent.trim() : '');
      enqueueTypeLine('- ' + line);
    });
  }

  function cmdProjects(arg) {
    if (arg !== '--list') {
      enqueueTypeLine('Usage: projects --list');
      return;
    }
    var names = loadProjectNames();
    if (!names) {
      enqueueTypeLine('Loading projects... try again in a moment');
      return;
    }
    if (!names.length) {
      enqueueTypeLine('No projects found.');
      return;
    }
    enqueueTypeLine('GitHub projects:');
    names.forEach(function (n) {
      enqueueTypeLine('- ' + n);
    });
  }

  function loadProjectNames() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.repos)) {
          var originals = parsed.repos.filter(function (repo) { return !repo.fork; });
          if (originals.length) {
            return originals.map(function (repo) { return formatName(repo.name); });
          }
        }
      }
    } catch (e) {
      // fall through to DOM
    }
    var cards = document.querySelectorAll('.project-card .project-title');
    if (cards.length) {
      return Array.prototype.map.call(cards, function (c) { return c.textContent.trim(); });
    }
    return null;
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

  function cmdGoals(arg) {
    if (arg !== '--list') {
      enqueueTypeLine('Usage: goals --list');
      return;
    }
    var items = document.querySelectorAll('.goal-list li');
    if (!items.length) {
      enqueueTypeLine('Goals not found.');
      return;
    }
    enqueueTypeLine('Goals:');
    Array.prototype.slice.call(items, 0, 5).forEach(function (li) {
      enqueueTypeLine('- ' + li.textContent.trim());
    });
  }

  function cmdContact() {
    enqueueTypeLineWithLink('Email: ', 'mailto:' + EMAIL, EMAIL);
    enqueueTypeLine('Prefer the contact form at the bottom of the page.');
  }

  function cmdGithub() {
    enqueueTypeLineWithLink('GitHub: ', GITHUB_URL, GITHUB_URL);
  }

  function cmdCv(arg) {
    if (arg !== '--download') {
      enqueueTypeLine('Usage: cv --download');
      return;
    }
    enqueueTypeLine('Downloading /Korutaro_Joshua_Mwesigwa_CV.pdf ...');
    enqueueAction(function () {
      var a = document.createElement('a');
      a.href = '/Korutaro_Joshua_Mwesigwa_CV.pdf';
      a.download = '';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  function cmdClear() {
    enqueueAction(function () {
      bodyEl.innerHTML = '';
      scrollToBottom();
    });
  }

  function cmdExit() {
    close();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
