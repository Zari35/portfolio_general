// Carousel initializer (safe: no-op if IDs not found)
function initCarousel(carouselId, prevBtnId, nextBtnId) {
  const carousel = document.getElementById(carouselId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  if (!carousel || !prevBtn || !nextBtn) return; // guard

  let index = 0;
  const total = carousel.children.length;

  function updateSlide() {
    const offset = index * carousel.clientWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) { index--; updateSlide(); }
  });

  nextBtn.addEventListener("click", () => {
    if (index < total - 1) { index++; updateSlide(); }
  });

  window.addEventListener("resize", updateSlide);
  updateSlide(); // initial position
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Init all present carousels (including your new #carousel-4)
  initCarousel("carousel-1", "prevBtn-1", "nextBtn-1");
  initCarousel("carousel-2", "prevBtn-2", "nextBtn-2");
  initCarousel("carousel-3", "prevBtn-3", "nextBtn-3");
  initCarousel("carousel-4", "prevBtn-4", "nextBtn-4"); // <-- missing before

  // ✅ Fade-in on scroll (moved inside DOMContentLoaded)
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -10% 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // Zoomable Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll("[data-zoom]").forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove("flex");
        lightbox.classList.add("hidden");
        if (lightboxImg) lightboxImg.src = "";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox) {
      lightbox.classList.remove("flex");
      lightbox.classList.add("hidden");
      if (lightboxImg) lightboxImg.src = "";
    }
  });
});
