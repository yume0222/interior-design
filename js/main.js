// Header
document.addEventListener("DOMContentLoaded", function () {
  const gnav = document.querySelector(".gnav");
  const hamburger = document.querySelector(".hamburger");
  const links = document.querySelectorAll(".gnav__link");
  const mask = document.querySelector(".header__mask");

  // （メニューが非表示・開く操作
  const openMenu = () => {
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "メニューを閉じる");
    gnav.setAttribute("aria-hidden", "false");
    mask.setAttribute("aria-hidden", "false");
  };

  // （メニューが展開済・閉じる操作）
  const closeMenu = () => {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "メニューを開く");
    gnav.setAttribute("aria-hidden", "true");
    mask.setAttribute("aria-hidden", "true");
  };

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded");
    if (expanded === "false") {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // リンク
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  // マスク
  mask.addEventListener("click", closeMenu);

  //ブレイクポイントをまたいだときの挙動
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleBreakpointChange(event) {
    if (event.matches) {
      // PC用の初期表示
      gnav.setAttribute("aria-hidden", "false");
    } else {
      // SP用の初期表示
      closeMenu();
    }
  }

  // 初期状態の表示を設定
  handleBreakpointChange(mediaQuery);

  // メディアクエリの変更を監視
  mediaQuery.addEventListener("change", handleBreakpointChange);

  // サブメニュー
  document.querySelectorAll(".gnav__label").forEach((link) => {
    link.addEventListener("click", () => {
      const parent = link.parentElement;
      const isActive = parent.classList.toggle("active");
      link.setAttribute("aria-expanded", isActive);
    });
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
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".products");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetID = "#" + this.getAttribute("aria-controls");

      //いったんすべてのタブの選択を解除
      tabs.forEach(function (t) {
        t.setAttribute("aria-selected", "false");
        t.setAttribute("aria-expanded", "false");
      });

      //いったんすべてのタブパネルを非表示
      tabPanels.forEach(function (panel) {
        panel.setAttribute("aria-hidden", "true");
      });

      //現在のタブを選択中に変更
      this.setAttribute("aria-selected", "true");
      this.setAttribute("aria-expanded", "true");

      //現在のタブパネルを表示
      document.querySelector(targetID).setAttribute("aria-hidden", "false");
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
