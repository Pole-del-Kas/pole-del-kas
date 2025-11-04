(function() {
  "use strict";

  // -------------------------------
  // Header scroll: add .scrolled class
  // -------------------------------
  const body = document.body;
  const header = document.querySelector('#header');

  function toggleScrolled() {
    if (!header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')) return;

    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // -------------------------------
  // Mobile nav toggle
  // -------------------------------
  const mobileNavBtn = document.querySelector('.mobile-nav-toggle');

  function toggleMobileNav() {
    body.classList.toggle('mobile-nav-active');
    mobileNavBtn.classList.toggle('bi-list');
    mobileNavBtn.classList.toggle('bi-x');
  }

  mobileNavBtn.addEventListener('click', toggleMobileNav);

  // Close mobile nav on same-page/hash links
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) toggleMobileNav();
    });
  });

  // Mobile nav dropdowns
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // -------------------------------
  // Preloader
  // -------------------------------
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // -------------------------------
  // Scroll top button
  // -------------------------------
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }

  scrollTopBtn?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('load', toggleScrollTop);

  // -------------------------------
  // Initialize AOS
  // -------------------------------
  window.addEventListener('load', () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  // -------------------------------
  // Scrollspy with footer fix
  // -------------------------------
  const navLinks = document.querySelectorAll('#navmenu a');

  function scrollSpy() {
    const scrollMiddle = window.scrollY + window.innerHeight / 2;

    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const isLast = link.hash === '#contacto';

      if (isLast) {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else {
        scrollMiddle >= top && scrollMiddle < bottom
          ? link.classList.add('active')
          : link.classList.remove('active');
      }
    });
  }

  document.addEventListener('scroll', scrollSpy);
  window.addEventListener('load', scrollSpy);

  // Smooth scroll to hash on page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // -------------------------------
  // Poledance Carousel
  // -------------------------------
  $(document).ready(function() {
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

      if ($carousel.hasClass('slick-initialized')) $carousel.slick('unslick');
      $carousel.empty();

      imagesToUse.forEach(src => {
        $carousel.append(`<div><img data-lazy="${src}" alt=""></div>`);
      });

      $carousel.slick({
        centerMode: true,
        centerPadding: isMobile ? '40px' : '200px',
        slidesToShow: 1,
        infinite: true,
        arrows: !isMobile,
        dots: !isMobile,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: 'ease-in-out',
        lazyLoad: 'ondemand'
      });
    }

    loadCarousel();

    let resizeTimer;
    $(window).on('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(loadCarousel, 100);
    });
  });

  // -------------------------------
  // Lazy-load Google Maps
  // -------------------------------
  window.addEventListener('load', () => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    setTimeout(() => {
      const iframe = document.createElement('iframe');
      iframe.src = mapContainer.dataset.src;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      mapContainer.appendChild(iframe);
    }, 500); // delay avoids scroll jump
  });

})();
