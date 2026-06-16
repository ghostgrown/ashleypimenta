/* Portfolio filter bar */
(function () {
  const btns = document.querySelectorAll(".filter-btn");
  const select = document.querySelector(".filter-select");
  const items = document.querySelectorAll(".portfolio-item");
  if (!btns.length && !select) return;

  function applyFilter(value) {
    items.forEach((item) => {
      if (value === "all") {
        item.classList.remove("hidden");
      } else {
        const cats = (item.dataset.categories || "").split(" ");
        item.classList.toggle("hidden", !cats.includes(value));
      }
    });
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (select) select.value = btn.dataset.filter;
      applyFilter(btn.dataset.filter);
    });
  });

  if (select) {
    select.addEventListener("change", () => {
      btns.forEach((b) => {
        b.classList.toggle("active", b.dataset.filter === select.value);
      });
      applyFilter(select.value);
    });
  }
})();

/* Sliders */
(function () {
  document.querySelectorAll(".gallery-slider").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    if (slides.length <= 1) return;
    let current = 0;

    function show(n) {
      slides[current].classList.remove("active");
      current = (n + slides.length) % slides.length;
      slides[current].classList.add("active");
    }

    slider.querySelector(".slider-prev")?.addEventListener("click", () => show(current - 1));
    slider.querySelector(".slider-next")?.addEventListener("click", () => show(current + 1));
  });
})();

/* Photography lightbox */
(function () {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const lbImg = lb.querySelector(".lightbox-img");
  const photos = [...document.querySelectorAll(".photo-item img")];
  let current = 0;

  function open(i) {
    current = i;
    lbImg.src = photos[i].src;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  function nav(dir) {
    open((current + dir + photos.length) % photos.length);
  }

  document.querySelectorAll(".photo-item").forEach((el, i) => {
    el.addEventListener("click", () => open(i));
  });

  lb.querySelector(".lightbox-close")?.addEventListener("click", close);
  lb.querySelector(".lightbox-prev")?.addEventListener("click", () => nav(-1));
  lb.querySelector(".lightbox-next")?.addEventListener("click", () => nav(1));

  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") nav(-1);
    if (e.key === "ArrowRight") nav(1);
  });
})();

/* Year for footer */
document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* Mobile nav hamburger */
(function () {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  // Close menu when a link is tapped
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
