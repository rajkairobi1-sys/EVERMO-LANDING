document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  /* REVEAL ANIMÁCIÓ */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* HASH LINKEK FINOMABB KEZELÉSE */
  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);

      if (!targetEl) return;

      event.preventDefault();

      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      history.pushState(null, "", targetId);
    });
  });

  /* HA MEGNYITÁSKOR VAN HASH A LINKBEN */
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);

    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }
});