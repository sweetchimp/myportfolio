(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas, ctx, w, h, particles, raf;
  var colors = [
    [56, 200, 210],
    [215, 106, 169],
    [143, 150, 173]
  ];
  var COUNT = 14;

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function buildCanvas() {
    canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1';
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);

    particles = [];
    for (var i = 0; i < COUNT; i++) {
      var c = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.1 + Math.random() * 0.3),
        color: c,
        alpha: 0.07 + Math.random() * 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + p.alpha + ')';
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (canvas) return;
    buildCanvas();
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (canvas) {
      canvas.remove();
      canvas = null;
      ctx = null;
      window.removeEventListener('resize', resize);
    }
  }

  function sync() {
    if (isDarkTheme()) start(); else stop();
  }

  document.addEventListener('DOMContentLoaded', sync);
  document.addEventListener('themechange', sync);
})();
