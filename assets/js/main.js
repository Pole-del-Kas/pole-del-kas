(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);


  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
/*  window.addEventListener('load', function(e) {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section && !section.classList.contains('map-container')) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}); */

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    if (window.innerWidth <= 768) return;
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 50;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


 
$(document).ready(function() {
  /*--------------------------------------------------------------
  # Carousel Section
  --------------------------------------------------------------*/  
  const $carousel = $('.poledance-carousel');

  const mobileImages = [
  'assets/img/carousel/Copia de S07042024M (22).webp',
  'assets/img/carousel/cupido.webp',
  'assets/img/carousel/P23042023 (2).webp',
  'assets/img/carousel/drama queen.webp',
  'assets/img/carousel/P23042023 (5).webp',
  'assets/img/carousel/flexi.webp',
  'assets/img/carousel/POLEMERITAS09102022 (13).webp',
  'assets/img/carousel/lavanda 1.webp',
  'assets/img/carousel/POLEMERITAS09102022 (14).webp',
  'assets/img/carousel/russian layback.webp',
  'assets/img/carousel/POLEMERITAS09102022 (15).webp',
  'assets/img/carousel/plegado.webp',
  'assets/img/carousel/S07042024M (25).webp',
  'assets/img/carousel/reiko.webp',
  'assets/img/carousel/S07042024M (26).webp',
  'assets/img/carousel/retrato.webp',
  'assets/img/carousel/S07042024M (28).webp',
  'assets/img/carousel/superman variation.webp',
  'assets/img/carousel/S07042024M (30).webp'
];

const desktopImages = [
  'assets/img/carousel/P23042023 (3).webp',
  'assets/img/carousel/lavanda 2.webp',
  'assets/img/carousel/lady planche.webp',
  'assets/img/carousel/POLEMERITAS09102022 (16).webp',
  'assets/img/carousel/machine gun.webp',
  'assets/img/carousel/marchetti split.webp'
];

  function loadCarousel() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const imagesToUse = isMobile ? mobileImages : desktopImages;

    // Destroy Slick if it’s already initialized
    if ($carousel.hasClass('slick-initialized')) {
      $carousel.slick('unslick');
    }

    // Clear existing images
    $carousel.empty();

    // Add new images
    imagesToUse.forEach(src => {
      $carousel.append(`<div><img data-lazy="${src}" alt=""></div>`);
    });

    // Re-initialize Slick
    $carousel.slick({
      centerMode: true,
      centerPadding: isMobile ? '40px' : '200px',
      slidesToShow: 1,
      infinite: true,
      arrows: !isMobile,
      dots:!isMobile,
      autoplay: true,
      autoplaySpeed: 1000,
      cssEase: 'ease-in-out',
      lazyLoad: 'ondemand'
    });
  }


  // Initial load
  loadCarousel();

  // Detect screen size changes
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      loadCarousel();
    }, 100); // small delay to prevent rapid reloads
  });

  /*--------------------------------------------------------------
  # End of Carousel Section
  --------------------------------------------------------------*/


});

})();