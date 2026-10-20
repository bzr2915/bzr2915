/* ClaySet minimal — counters + play videos only when visible */
function countUp() {
  document.querySelectorAll(".stat-num").forEach(node => {
    const target = +node.dataset.count;
    const t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / 1400, 1);
      const e = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function videoAutoplay() {
  const vids = document.querySelectorAll("video.plate-video");
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.play().catch(() => {}); }
      else { en.target.pause(); }
    });
  }, { threshold: 0.2 });
  vids.forEach(v => io.observe(v));
}

document.addEventListener("DOMContentLoaded", () => {
  countUp();
  videoAutoplay();
});
