const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (!reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    observer.observe(node);
  });

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--y", `${event.clientY}px`);
  }, { passive: true });
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
}
