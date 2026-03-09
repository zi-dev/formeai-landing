/**
 * FormeAI 랜딩 페이지 - Vanilla JS
 * 네비게이션 스크롤, 햄버거 메뉴, 스무스 스크롤
 */

(function () {
  'use strict';

  const THROTTLE_MS = 100;
  const NAVBAR_SCROLL_THRESHOLD = 50;

  const navbar = document.getElementById('navbar');
  const nav = document.querySelector('.navbar__nav');
  const toggleBtn = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelectorAll('.navbar__link, .navbar__cta');

  /**
   * throttle - 스크롤 등 빈번한 이벤트에 사용
   * @param {Function} fn - 실행할 함수
   * @param {number} delay - 딜레이(ms)
   * @returns {Function}
   */
  function throttle(fn, delay) {
    let lastCall = 0;
    let timeoutId = null;
    return function (...args) {
      const now = Date.now();
      const remaining = delay - (now - lastCall);
      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastCall = now;
        fn.apply(this, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          timeoutId = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  /**
   * 스크롤 시 네비게이션에 scrolled 클래스 추가/제거
   */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  /**
   * 햄버거 메뉴 열기/닫기
   */
  function toggleMobileMenu() {
    if (!nav || !toggleBtn) return;
    const isOpen = nav.classList.toggle('navbar__nav--open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  /**
   * 메뉴 링크 클릭 시 모바일 메뉴 닫기
   */
  function closeMobileMenuOnLinkClick() {
    if (!nav || !toggleBtn) return;
    nav.classList.remove('navbar__nav--open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = '';
  }

  /**
   * 앵커 링크 클릭 시 부드럽게 스크롤 (html scroll-behavior: smooth 사용)
   * 모바일에서 메뉴만 닫기
   */
  function initSmoothClose() {
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          closeMobileMenuOnLinkClick();
        }
      });
    });
  }

  function init() {
    const throttledScroll = throttle(handleNavbarScroll, THROTTLE_MS);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleNavbarScroll();

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleMobileMenu);
    }

    initSmoothClose();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
