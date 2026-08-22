<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JOSH'S WORKSPACE</title>
  <meta name="description" content="Computer Science Engineering student at the University of Debrecen with interests in cybersecurity, artificial intelligence, and technology-driven innovation.">
  <meta property="og:title" content="JOSH'S WORKSPACE">
  <meta property="og:description" content="Computer Science Engineering student at the University of Debrecen with interests in cybersecurity, artificial intelligence, and technology-driven innovation.">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/portfolio.css">
  <link rel="stylesheet" href="/css/terminal.css">
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 550ms ease-out, transform 550ms ease-out;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  </style>
</head>
<body>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="bg-glow bg-glow-2"></div>

  @if (session('success'))
    <div class="success-banner">{{ session('success') }}<button class="banner-dismiss" aria-label="Dismiss">&times;</button></div>
  @endif

  <nav class="nav-bar">
    <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle color theme">
      <svg class="icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
      </svg>
      <svg class="icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="view-toggle" aria-label="Switch site view">
      <a href="{{ route('home') }}" class="active" aria-current="page">Portfolio</a>
      <a href="{{ route('joshko-labs') }}">Joshko Labs</a>
    </div>
    <div class="nav-links">
      <div class="view-toggle" aria-label="Switch site view">
        <a href="{{ route('home') }}" class="active" aria-current="page">Portfolio</a>
        <a href="{{ route('joshko-labs') }}">Joshko Labs</a>
      </div>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#goals">Goals</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <main>

    {{-- ─── Hero / About ─── --}}
    <section id="about" class="hero hero-split">
      <div class="hero-content">
        <p class="section-readout"><span class="readout-dark">[ ABOUT.EXE ]</span><span class="readout-light">ABOUT ME</span></p>
        <p class="hero-eyebrow glow-text">CS ENGINEERING &middot; UNIVERSITY OF DEBRECEN</p>
        <h1 class="hero-name glow-text">Joshua Korutaro</h1>
        <p class="hero-subtitle">Full-Stack Junior Software Engineer &amp; AI Application Developer</p>
        <p class="hero-subtitle-secondary">University of Debrecen, graduating 2028</p>
        <p class="hero-bio">Joshua Korutaro is a Computer Science Engineering student at the University of Debrecen who builds practical digital solutions across web development, cybersecurity, and AI. He has completed two software internships, maintains public projects on GitHub, and is focused on engineering secure, reliable systems. Beyond the keyboard, he values personal growth, community, and building technology that makes a difference.</p>
        <div class="hero-stats">
          <div class="stat-block">
            <span class="stat-value">2</span>
            <span class="stat-label">Internships Completed</span>
          </div>
          <div class="stat-block">
            <span class="stat-value">BSc</span>
            <span class="stat-label">Computer Science &middot; Debrecen</span>
          </div>
          <div class="stat-block">
            <span class="stat-value">2028</span>
            <span class="stat-label">Expected Graduation</span>
          </div>
        </div>
        <div class="hero-buttons">
          <a href="#contact" class="btn btn-primary">Get In Touch</a>
          <a href="#skills" class="btn btn-outline">View Skills</a>
        </div>
        <div class="social-links">
          <a href="https://github.com/sweetchimp" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/josh-korutaro" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:joshuakorutaro05@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
        <a href="/cv.pdf" class="btn btn-outline cv-btn" download>Download CV</a>
      </div>
    </section>

    {{-- ─── Skills / Experience / Projects: unified bento grid ─── --}}
    <section class="section bento-section">
      <p class="section-readout"><span class="readout-dark">[ SKILLS.LOADED ]</span><span class="readout-light">SKILLS &amp; WORK</span></p>
      <h2 class="section-title glow-text glow-cyan"><span class="section-title-accent">//</span> Skills &middot; Experience &middot; Projects</h2>
      <div class="bento-grid">

        <div id="experience" class="bento-cluster bento-exp">
          <h3 class="cluster-label">Experience</h3>
          <div class="exp-list">
            <div class="exp-card">
              <h4 class="exp-role">Junior Developer Intern</h4>
              <p class="exp-company">Ardenfield, Cygnus Solutions Limited</p>
              <ul class="exp-bullets">
                <li>Contributed to software development projects with senior developers</li>
                <li>Assisted in developing, testing, and maintaining web applications</li>
                <li>Worked with modern development frameworks and version control</li>
                <li>Strengthened debugging, collaboration, and software engineering skills</li>
              </ul>
            </div>
            <div class="exp-card">
              <h4 class="exp-role">Intern</h4>
              <p class="exp-company">Tiscon Solutions</p>
              <ul class="exp-bullets">
                <li>Assisted with technology-related projects</li>
                <li>Worked collaboratively on assigned technical tasks</li>
                <li>Developed strong communication and problem-solving abilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="skills" class="bento-cluster bento-skills">
          <h3 class="cluster-label">Skills</h3>
          <div class="skills-category">
            <h4 class="category-label">Frontend</h4>
            <div class="skill-tags">
              <span class="tag">React</span>
              <span class="tag">Next.js</span>
              <span class="tag">TypeScript</span>
              <span class="tag">JavaScript</span>
            </div>
          </div>
          <div class="skills-category">
            <h4 class="category-label">Backend</h4>
            <div class="skill-tags">
              <span class="tag">Laravel</span>
              <span class="tag">Node.js</span>
              <span class="tag">Python</span>
            </div>
          </div>
          <div class="skills-category">
            <h4 class="category-label">Databases</h4>
            <div class="skill-tags">
              <span class="tag">PostgreSQL</span>
              <span class="tag">MySQL</span>
            </div>
          </div>
          <div class="skills-category">
            <h4 class="category-label">Artificial Intelligence</h4>
            <div class="skill-tags">
              <span class="tag">AI Agent Development</span>
              <span class="tag">AI Image Generation</span>
              <span class="tag">AI Video Generation</span>
              <span class="tag">Machine Learning Fundamentals</span>
            </div>
          </div>
          <div class="skills-category">
            <h4 class="category-label">Tools</h4>
            <div class="skill-tags">
              <span class="tag">Git</span>
              <span class="tag">GitHub</span>
              <span class="tag">Microsoft Office</span>
            </div>
          </div>
          <div class="skills-category">
            <h4 class="category-label">Professional</h4>
            <div class="skill-tags">
              <span class="tag">Teamwork</span>
              <span class="tag">Communication</span>
              <span class="tag">Problem Solving</span>
              <span class="tag">Time Management</span>
            </div>
          </div>
        </div>

        <div id="projects" class="bento-cluster bento-projects">
          <h3 class="cluster-label">Projects</h3>
          <div id="projects-grid" class="projects-grid"></div>
        </div>

      </div>
    </section>

    {{-- ─── Beyond the Code ─── --}}
    <section id="beyond-the-code" class="beyond-section reveal">
      <p class="section-readout"><span class="readout-dark">[ JOSHKO.LABS ]</span><span class="readout-light">BEYOND THE CODE</span></p>
      <h2 class="beyond-title">Beyond the Code</h2>
      <p class="beyond-text">Alongside his personal work, Josh runs Joshko Labs — a small studio building practical business software for real operations, from booking systems to custom management platforms.</p>
      <a href="{{ route('joshko-labs') }}" class="beyond-btn">Explore Joshko Labs &rarr;</a>
    </section>

    {{-- ─── Goals ─── --}}
    <section id="goals" class="section">
      <p class="section-readout"><span class="readout-dark">[ GOALS.LOADED ]</span><span class="readout-light">GOALS</span></p>
      <h2 class="section-title glow-text glow-magenta"><span class="section-title-accent">//</span> Goals</h2>
      <ul class="goal-list">
        <li>Become a skilled cybersecurity professional.</li>
        <li>Build innovative technology solutions.</li>
        <li>Continuously expand my technical expertise.</li>
        <li>Solve real-world problems through technology.</li>
        <li>Contribute to secure and reliable digital systems.</li>
        <li>Grow as a software and cybersecurity engineer.</li>
        <li>Embrace lifelong learning and innovation.</li>
        <li>Develop impactful and scalable applications.</li>
        <li>Lead technology-driven projects.</li>
        <li>Make a positive impact through technology.</li>
        <li>Earn industry-recognized certifications.</li>
        <li>Build a successful career in information security.</li>
        <li>Collaborate on meaningful technology projects.</li>
        <li>Drive digital transformation through innovation.</li>
        <li>Deliver secure, efficient, and user-focused solutions.</li>
      </ul>
    </section>

    {{-- ─── Contact ─── --}}
    <section id="contact" class="section">
      <p class="section-readout"><span class="readout-dark">[ CONTACT.OPEN ]</span><span class="readout-light">CONTACT</span></p>
      <h2 class="section-title glow-text glow-cyan"><span class="section-title-accent">//</span> Contact</h2>
      <p class="reach-out">Open to internships, freelance work, and collaboration — reach out below.</p>
      @if (env('NETLIFY_BUILD'))
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="website" action="/thanks.html" class="contact-form">
          <div class="hp-field" aria-hidden="true">
            <input type="text" name="website" tabindex="-1" autocomplete="off">
          </div>
          <input type="text" name="name" placeholder="Your Name" required>
          <input type="email" name="email" placeholder="your@email.com" required>
          <textarea name="message" placeholder="Your Message..." required></textarea>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      @else
        <form action="{{ route('contact.submit') }}" method="POST" class="contact-form">
          @csrf
          <div class="hp-field" aria-hidden="true">
            <input type="text" name="website" tabindex="-1" autocomplete="off">
          </div>
          <input type="text" name="name" placeholder="Your Name" required>
          <input type="email" name="email" placeholder="your@email.com" required>
          <textarea name="message" placeholder="Your Message..." required></textarea>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      @endif

      @if (session('success'))
        <div class="contact-success">{{ session('success') }}</div>
      @endif

      <div class="contact-footer">
        <a href="mailto:joshuakorutaro05@gmail.com">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          joshuakorutaro05@gmail.com
        </a>
        <a href="https://linkedin.com/in/josh-korutaro" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Josh Korutaro
        </a>
        <a href="https://github.com/sweetchimp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
          @@sweetchimp
        </a>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-name">JOSH'S WORKSPACE &copy; {{ date('Y') }}</p>
      <div class="footer-icons">
        <a href="https://github.com/sweetchimp" target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/josh-korutaro" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="mailto:joshuakorutaro05@gmail.com" aria-label="Email">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>
      <p class="footer-credit">Built with Laravel</p>
      <button id="terminal-hint" class="term-hint" aria-label="Open hidden terminal">&gt;_</button>
    </div>
  </footer>

  <div id="terminal-overlay" class="term-overlay" hidden>
    <div class="term-window" role="dialog" aria-label="Terminal">
      <div class="term-titlebar">
        <div class="term-dots">
          <span class="term-dot red"></span>
          <span class="term-dot yellow"></span>
          <span class="term-dot green"></span>
        </div>
        <span class="term-title">josh@workspace: ~</span>
        <button class="term-close" id="terminal-close" aria-label="Close terminal">&times;</button>
      </div>
      <div class="term-body" id="terminal-body"></div>
      <div class="term-input-line">
        <span class="term-prompt">guest@joshs-workspace:~$</span>
        <input class="term-input" id="terminal-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input">
        <span class="term-cursor"></span>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      var banner = document.querySelector('.success-banner');
      if (!banner) return;
      var timer = setTimeout(function () { dismiss(); }, 4000);
      banner.querySelector('.banner-dismiss').addEventListener('click', function () {
        clearTimeout(timer);
        dismiss();
      });
      function dismiss() {
        banner.classList.add('banner-fade-out');
        banner.addEventListener('transitionend', function () { banner.remove(); });
      }

      var toggle = document.querySelector('.nav-toggle');
      if (toggle) {
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
    });
  </script>
  <script src="/js/theme-toggle.js"></script>
  <script src="/js/scroll-reveal.js"></script>
  <script src="/js/particles.js"></script>
  <script src="/js/github-projects.js"></script>
  <script src="/js/terminal.js"></script>

</body>
</html>
