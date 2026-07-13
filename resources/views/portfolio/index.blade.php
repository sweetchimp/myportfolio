<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KORUTARO JOSHUA MWESIGWA — Portfolio</title>
  <link rel="stylesheet" href="/css/portfolio.css">
</head>
<body>

  @if (session('success'))
    <div class="success-banner">{{ session('success') }}</div>
  @endif

  <nav class="nav-bar">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#goals">Goals</a>
    <a href="#contact">Contact</a>
  </nav>

  <main>

    {{-- ─── Hero / About ─── --}}
    <section id="about" class="hero">
      <p class="hero-eyebrow glow-text">HELLO, I'M</p>
      <h1 class="hero-name glow-text">KORUTARO JOSHUA MWESIGWA</h1>
      <p class="hero-subtitle">Coder Josh &middot; 1st Year Computer Science Engineering @ University of Debrecen</p>
      <p class="hero-bio">Joshua Korutaro is a Computer Science Engineering student with a strong interest in cybersecurity, artificial intelligence, and technology-driven innovation. He is passionate about building practical digital solutions, creating impactful content, and exploring opportunities that combine technology with business. Beyond academics, Josh enjoys building meaningful connections, values personal growth and faith, and is committed to using his skills to make a difference in his community and beyond.</p>
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
    </section>

    {{-- ─── Skills ─── --}}
    <section id="skills" class="section">
      <h2 class="section-title glow-text"><span class="section-title-accent">//</span> Skills</h2>
      <div class="skills-category">
        <h3 class="category-label glow-text">Languages</h3>
        <div class="skill-tags">
          <span class="tag">Python</span>
          <span class="tag">JavaScript</span>
          <span class="tag">PHP</span>
        </div>
      </div>
      <div class="skills-category">
        <h3 class="category-label glow-text">Frameworks &amp; Libraries</h3>
        <div class="skill-tags">
          <span class="tag">React</span>
        </div>
      </div>
      <div class="skills-category">
        <h3 class="category-label glow-text">AI &amp; Tools</h3>
        <div class="skill-tags">
          <span class="tag">AI Video &amp; Image Generation</span>
          <span class="tag">AI Agents</span>
        </div>
      </div>
    </section>

    {{-- ─── Goals ─── --}}
    <section id="goals" class="section">
      <h2 class="section-title glow-text"><span class="section-title-accent">//</span> Goals</h2>
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
      <h2 class="section-title glow-text"><span class="section-title-accent">//</span> Contact</h2>
      <form action="{{ route('contact.submit') }}" method="POST" class="contact-form">
        @csrf
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="your@email.com" required>
        <textarea name="message" placeholder="Your Message..." required></textarea>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>

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
          @sweetchimp
        </a>
      </div>
    </section>

  </main>

</body>
</html>
