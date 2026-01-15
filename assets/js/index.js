console.log("[boot] index.js loaded");
console.log("[boot] location:", location.href);
console.log("[boot] readyState:", document.readyState);


// ========================================
// Header & Footer Include
// ========================================

async function loadInclude(targetId, filePath) {
  const el = document.getElementById(targetId);
  if (!el) {
    console.warn(`[include] #${targetId} 엘리먼트를 찾을 수 없습니다.`);
    return false;
  }

  try {
    const res = await fetch(filePath, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} (${filePath})`);

    el.innerHTML = await res.text();
    return true;
  } catch (err) {
    console.error(`[include] ${filePath} 로드 실패:`, err);
    return false;
  }
}

// ========================================
// Mobile Menu Toggle (matches your header HTML)
// - button.mobile-toggle
// - nav.nav
// ========================================

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) {
    console.warn("[initMobileMenu] .mobile-toggle 또는 .nav를 찾을 수 없습니다.");
    return;
  }

  // ✅ 중복 바인딩 방지
  if (toggle.dataset.bound === "1") return;
  toggle.dataset.bound = "1";

  // 접근성 힌트(선택)
  toggle.setAttribute("aria-expanded", "false");

  const open = () => {
    nav.classList.add("active");
    toggle.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll"); // 원치 않으면 CSS/이 줄 제거
  };

  const close = () => {
    nav.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  const isOpen = () => nav.classList.contains("active");

  toggle.addEventListener("click", () => {
    isOpen() ? close() : open();
  });

  // ✅ 메뉴 링크 클릭 시 닫기 (모바일 UX)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    if (isOpen()) close();
  });

  // ✅ ESC로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });
}

// ========================================
// Smooth Scroll (event delegation, works with included header)
// ========================================

function initSmoothScroll() {
  // ✅ 중복 바인딩 방지
  if (document.body.dataset.smoothScrollBound === "1") return;
  document.body.dataset.smoothScrollBound = "1";

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#" || href === "") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // 헤더가 fixed/sticky면 높이만큼 보정
    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight : 0;

    const top =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  });
}

// ========================================
// FAQ Accordion
// ========================================

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    // ✅ 중복 바인딩 방지
    if (question.dataset.bound === "1") return;
    question.dataset.bound = "1";

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
}

// ========================================
// Contact Form Handling
// ========================================

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // ✅ 중복 바인딩 방지
  if (form.dataset.bound === "1") return;
  form.dataset.bound = "1";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      company: formData.get("company"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      privacy: formData.get("privacy"),
    };

    if (!data.company || !data.name || !data.phone || !data.email) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!data.privacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    console.log("Form Data:", data);

    alert("신청해주셔서 감사합니다.\n영업일 기준 1일 내로 담당자가 연락드립니다.");

    form.reset();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// Scroll-based Header Shadow (after header exists)
// ========================================

function initHeaderShadow() {
  const header = document.querySelector("header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ========================================
// Boot (IMPORTANT: include -> header init -> rest)
// ========================================

document.addEventListener("DOMContentLoaded", async () => {
  // 1) include 먼저 (이 순서가 핵심)
  const [headerLoaded] = await Promise.all([
    loadInclude("header", "inc/header.html"),
    loadInclude("footer", "inc/footer.html"),
  ]);

  // 2) 헤더가 로드된 뒤에만 헤더 관련 초기화
  if (headerLoaded) {
    initMobileMenu();
    initHeaderShadow();
  } else {
    console.warn("[boot] header include 실패: 메뉴/헤더 효과 초기화를 건너뜁니다.");
  }

  // 3) 나머지는 헤더 유무와 무관하게 초기화
  initSmoothScroll();
  initFAQ();
  initContactForm();
});
