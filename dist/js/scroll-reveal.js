document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sections = document.querySelectorAll('.section');
  var tags = document.querySelectorAll('.tag');
  var goals = document.querySelectorAll('.goal-list li');

  sections.forEach(function (el) { el.classList.add('reveal'); });

  tags.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 60) + 'ms';
  });

  goals.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 60) + 'ms';
  });

  var all = document.querySelectorAll('.reveal');
  all.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  all.forEach(function (el) {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
});
