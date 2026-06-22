/* =========================================================
   CURSOS DE EQUITACIÓN - SCRIPT PRINCIPAL
   ========================================================= */

/* ---------- Preloader: logo + barra de carga ---------- */
(() => {
  const preloader = document.getElementById('preloader');
  const siteWrapper = document.getElementById('siteWrapper');
  if (!preloader || !siteWrapper) return;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const reveal = () => {
    siteWrapper.classList.add('is-visible');
    document.body.classList.remove('no-scroll');
  };

  document.body.classList.add('no-scroll');

  const SHOW_DURATION = 1800;
  const HIDE_DURATION = 500;

  window.setTimeout(() => {
    preloader.classList.add('is-hidden');
    preloader.setAttribute('aria-hidden', 'true');
    reveal();

    window.setTimeout(() => {
      preloader.style.display = 'none';
    }, HIDE_DURATION);
  }, SHOW_DURATION);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: cambia de estilo al hacer scroll ---------- */
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  /* ---------- Menú hamburguesa (mobile) ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', isOpen);
  });

  /* Cierra el menú al hacer clic en un enlace (mobile) */
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });

  /* ---------- Scroll suave para enlaces internos ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Animaciones al hacer scroll (Intersection Observer) ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  /* ---------- Barra de scroll lateral con caballo ---------- */
  const scrollFill = document.getElementById('scrollFill');
  const scrollHorse = document.getElementById('scrollHorse');

  const handleScrollRail = () => {
    if (!scrollFill || !scrollHorse) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollFill.style.height = progress + '%';
    scrollHorse.style.top = progress + '%';
  };

  handleScrollRail();
  window.addEventListener('scroll', handleScrollRail);
  window.addEventListener('resize', handleScrollRail);

  /* ---------- Carrusel de la galería ---------- */
  const viewport = document.querySelector('.carousel__viewport');
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (viewport && track && dotsContainer && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    let current = 0;
    let maxIndex = 0;

    const update = () => {
      const slideWidth = slides[0].getBoundingClientRect().width + gap;
      const visibleCount = Math.round((viewport.clientWidth + gap) / slideWidth);
      maxIndex = Math.max(slides.length - visibleCount, 0);
      current = Math.min(current, maxIndex);
      track.style.transform = `translateX(-${current * slideWidth}px)`;

      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
        if (i === current) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goToSlide = (index) => {
      current = Math.max(0, Math.min(index, maxIndex));
      update();
    };

    prevBtn.addEventListener('click', () => goToSlide(current === 0 ? maxIndex : current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current === maxIndex ? 0 : current + 1));
    window.addEventListener('resize', update);

    update();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      let autoplay = setInterval(() => goToSlide(current === maxIndex ? 0 : current + 1), 5000);
      const pauseAutoplay = () => clearInterval(autoplay);
      const resumeAutoplay = () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => goToSlide(current === maxIndex ? 0 : current + 1), 5000);
      };
      viewport.addEventListener('mouseenter', pauseAutoplay);
      viewport.addEventListener('mouseleave', resumeAutoplay);
      viewport.addEventListener('focusin', pauseAutoplay);
      viewport.addEventListener('focusout', resumeAutoplay);
    }
  }

  /* ---------- Lightbox de la galería ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightbox && lightboxImg && lightboxClose && lightboxPrev && lightboxNext) {
    const galleryImages = document.querySelectorAll('.carousel__img');
    let lightboxIndex = 0;

    const showImage = () => {
      const img = galleryImages[lightboxIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    };

    const openLightbox = (index) => {
      lightboxIndex = index;
      showImage();
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
    });

    lightboxPrev.addEventListener('click', () => {
      lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage();
    });

    lightboxNext.addEventListener('click', () => {
      lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
      showImage();
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    });
  }

  /* ---------- Carrito de compras (lleva a WhatsApp) ---------- */
  const cartBtn = document.getElementById('cartBtn');
  const cartCount = document.getElementById('cartCount');
  const cartFloatBtn = document.getElementById('cartFloatBtn');
  const cartFloatCount = document.getElementById('cartFloatCount');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartClose = document.getElementById('cartClose');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCheckout = document.getElementById('cartCheckout');
  const whatsappNumber = '5492323654029';

  if (cartBtn && cartOverlay && cartDrawer) {
    let cart = [];

    const formatPrice = (value) => `$${value.toLocaleString('es-AR')}`;

    const renderCart = () => {
      cartItemsEl.querySelectorAll('.cart-item').forEach((el) => el.remove());
      cartEmpty.style.display = cart.length === 0 ? 'block' : 'none';

      cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
          <div>
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">${formatPrice(item.price)}</div>
          </div>
          <button class="cart-item__remove" aria-label="Quitar">×</button>
        `;
        itemEl.querySelector('.cart-item__remove').addEventListener('click', () => {
          cart.splice(index, 1);
          renderCart();
        });
        cartItemsEl.appendChild(itemEl);
      });

      const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotalEl.textContent = formatPrice(total);
      cartCount.textContent = cart.length;
      if (cartFloatCount) cartFloatCount.textContent = cart.length;

      const message = cart.length
        ? `Hola, quiero consultar por estos productos:\n${cart.map((item) => `- ${item.name} (${formatPrice(item.price)})`).join('\n')}\n\nTotal: ${formatPrice(total)}`
        : 'Hola, quiero consultar por los libros de Doma Nativa.';
      cartCheckout.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    const openCart = () => {
      cartOverlay.classList.add('active');
      cartDrawer.classList.add('active');
      document.body.classList.add('no-scroll');
    };

    const closeCart = () => {
      cartOverlay.classList.remove('active');
      cartDrawer.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartDrawer.classList.contains('active')) closeCart();
    });

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        cart.push({
          name: button.dataset.name,
          price: Number(button.dataset.price),
        });
        renderCart();
        openCart();
      });
    });

    cartBtn.addEventListener('click', openCart);
    if (cartFloatBtn) cartFloatBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    renderCart();
  }

  /* ---------- Año dinámico en el footer ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
