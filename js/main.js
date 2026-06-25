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
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const tabPanels = document.querySelectorAll('.products');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const targetID = '#' + this.getAttribute('aria-controls');
      
      //いったんすべてのタブの選択を解除
      tabs.forEach(function(t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('aria-expanded', 'false');
      });
      
      //いったんすべてのタブパネルを非表示
      tabPanels.forEach(function(panel) {
        panel.setAttribute('aria-hidden', 'true');
      });
      
      //現在のタブを選択中に変更
      this.setAttribute('aria-selected', 'true');
      this.setAttribute('aria-expanded', 'true');

      //現在のタブパネルを表示
      document.querySelector(targetID).setAttribute('aria-hidden', 'false');
    });
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
