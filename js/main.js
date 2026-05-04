// Header
// ハンバーガーメニュー
const hamburger = document.querySelector(".header__hamburger");
const nav = document.querySelector(".header__nav");
const links = document.querySelectorAll(".header__subnav-link");
const mask = document.querySelector(".header__mask");
const toggleMenu = () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.classList.toggle("is-open");
  mask.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen);
};
const closeMenu = () => {
  nav.classList.remove("is-open");
  hamburger.classList.remove("is-open");
  mask.classList.remove("is-open");
};
hamburger.addEventListener("click", toggleMenu);
mask.addEventListener("click", closeMenu);
links.forEach((link) => link.addEventListener("click", closeMenu));

// ドロップダウンメニュー
document
  .querySelectorAll(".header__nav-label")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const parent = link.parentElement;
      const isActive = parent.classList.toggle("active");
      link.setAttribute("aria-expanded", isActive);
    });
  });

// フェードイン
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          transform: ["translateY(80px)", "translateY(0)"],
        },
        {
          duration: 1000,
          fill: "forwards",
        }
      );
      obs.unobserve(entry.target);
    }
  });
};
const fadeObserver = new IntersectionObserver(animateFade);
const fadeElements = document.querySelectorAll(".fadein");
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

// タブメニュー
const tabs = document.querySelectorAll(".tabs__item");
const contents = document.querySelectorAll(".products");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });
    contents.forEach((content) => {
      content.classList.remove("is-active");
    });
    tab.classList.add("is-active");
    const target = tab.dataset.tab;
    document
      .querySelector(`[data-content="${target}"]`)
      .classList.add("is-active");
  });
});

// モーダルウィンドウ
document.querySelectorAll(".works__modal-open").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.style.overflowY = "hidden";
    const modal = document.getElementById(btn.dataset.modal);
    modal.classList.add("is-active");
  });
});
document.querySelectorAll(".works__modal-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.style.overflowY = "auto";
    btn.closest(".works__modal").classList.remove("is-active");
  });
});

// アコーディオンメニュー
const headers = document.querySelectorAll(".faq__question");
headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("is-open");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("is-open");
    }
  });
});
