/* ==========================================================================
   Khushbu Singh Portfolio — main.js
   ========================================================================== */
(function ($) {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  $(window).on('load', function () {
    setTimeout(function () {
      $('#loader').addClass('loaded');
    }, 400);
  });

  /* ---------- AOS ---------- */
  if (window.AOS && !prefersReduced) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---------- Custom cursor ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced) {
    var $dot = $('.cursor-dot'), $ring = $('.cursor-ring');
    var ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    $(document).on('mousemove', function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
      $dot.css({ top: mouseY, left: mouseX });
    });
    (function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      $ring.css({ top: ringY, left: ringX });
      requestAnimationFrame(loop);
    })();
    $('a, button, .filter-btn, input, textarea').on('mouseenter', function () { $ring.addClass('grow'); });
    $('a, button, .filter-btn, input, textarea').on('mouseleave', function () { $ring.removeClass('grow'); });
  }

  /* ---------- Scroll progress bar ---------- */
  var $progress = $('#scroll-progress');
  function updateProgress() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height() - $(window).height();
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $progress.css('width', pct + '%');
  }

  /* ---------- Navbar scroll state + active link ---------- */
  var $navbar = $('#navbar');
  var sections = $('main section[id]');
  function updateNav() {
    var scrollTop = $(window).scrollTop();
    $navbar.toggleClass('scrolled', scrollTop > 40);
    $('.back-to-top').toggleClass('show', scrollTop > 500);

    var current = '';
    sections.each(function () {
      var top = $(this).offset().top - 140;
      if (scrollTop >= top) current = $(this).attr('id');
    });
    $('.nav-links a').removeClass('active');
    $('.nav-links a[href="#' + current + '"]').addClass('active');
  }

  $(window).on('scroll', function () {
    updateProgress();
    updateNav();
  });
  updateProgress();
  updateNav();

  /* ---------- Mobile menu ---------- */
  $('.nav-toggle').on('click', function () {
    $('.nav-links').toggleClass('open');
  });
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
  });

  /* ---------- Back to top ---------- */
  $('.back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ---------- Typed.js hero role rotator ---------- */
  if (window.Typed && document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: [
        'Frontend Developer',
        'React.js Developer',
        'TypeScript Engineer',
        'Micro-Frontend Architect',
        'Performance &amp; SEO Specialist'
      ],
      typeSpeed: 45,
      backSpeed: 28,
      backDelay: 1400,
      loop: true,
      cursorChar: '|'
    });
  }

  /* ---------- Animated counters ---------- */
  function animateCounter($el) {
    var target = parseFloat($el.data('count'));
    var suffix = $el.data('suffix') || '';
    var decimals = ($el.data('count') + '').includes('.') ? 1 : 0;
    var current = 0;
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      current = target * eased;
      $el.text(current.toFixed(decimals) + suffix);
      if (progress < 1) requestAnimationFrame(step);
      else $el.text(target.toFixed(decimals) + suffix);
    }
    requestAnimationFrame(step);
  }

  var countersRun = false;
  function checkCounters() {
    if (countersRun) return;
    var $stats = $('.js-counter');
    if (!$stats.length) return;
    var top = $stats.first().offset().top;
    if ($(window).scrollTop() + $(window).height() > top + 60) {
      countersRun = true;
      $stats.each(function () { animateCounter($(this)); });
    }
  }
  $(window).on('scroll', checkCounters);
  checkCounters();

  /* ---------- Project filtering ---------- */
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    $('.project-card').each(function () {
      var tags = ($(this).data('tags') || '').toString();
      var show = filter === 'all' || tags.indexOf(filter) > -1;
      if (show) {
        $(this).show();
        if (window.gsap && !prefersReduced) {
          gsap.fromTo(this, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        }
      } else {
        $(this).hide();
      }
    });
  });

  /* ---------- Card tilt effect (project + skill cards) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced) {
    $('.project-card, .editor-window').each(function () {
      var $card = $(this);
      $card.on('mousemove', function (e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotateY = ((x / rect.width) - 0.5) * 8;
        var rotateX = ((y / rect.height) - 0.5) * -8;
        $card.css('transform', 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)');
      });
      $card.on('mouseleave', function () {
        $card.css('transform', '');
      });
    });
  }

  /* ---------- GSAP hero entrance ---------- */
  if (window.gsap && !prefersReduced) {
    gsap.from('.hero-kicker, .hero h1, .hero-typed-line, .hero-desc, .hero-actions, .hero-stats', {
      y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3
    });
    gsap.from('.hero-visual', { x: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
  }

  /* ---------- Button ripple ---------- */
  $(document).on('click', '.btn', function (e) {
    var $btn = $(this);
    var rect = this.getBoundingClientRect();
    var $ripple = $('<span class="ripple"></span>');
    var size = Math.max(rect.width, rect.height);
    $ripple.css({
      width: size, height: size,
      left: e.clientX - rect.left - size / 2,
      top: e.clientY - rect.top - size / 2
    });
    $btn.append($ripple);
    setTimeout(function () { $ripple.remove(); }, 650);
  });

  /* ---------- Contact form: client validation + real async submit ---------- */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    $form.find('.field').removeClass('has-error');
    $('#form-success, #form-error').fadeOut(150);

    var $name = $('#cf-name');
    var $email = $('#cf-email');
    var $message = $('#cf-message');

    if ($name.val().trim().length < 2) {
      $name.closest('.field').addClass('has-error'); valid = false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test($email.val().trim())) {
      $email.closest('.field').addClass('has-error'); valid = false;
    }
    if ($message.val().trim().length < 10) {
      $message.closest('.field').addClass('has-error'); valid = false;
    }

    if (!valid) return;

    var actionUrl = $form.attr('action');
    if (!actionUrl || actionUrl.indexOf('YOUR_FORM_ID') > -1) {
      // Endpoint hasn't been configured yet — tell the developer, don't silently pretend it worked.
      $('#form-error').html('<i class="fa-solid fa-circle-exclamation"></i> Form endpoint not configured yet — see README.md to connect Formspree.').fadeIn(200);
      return;
    }

    var $submitBtn = $('#cf-submit');
    $submitBtn.prop('disabled', true);
    $submitBtn.find('.cf-btn-text').hide();
    $submitBtn.find('.cf-btn-loading').show();

    $.ajax({
      url: actionUrl,
      method: 'POST',
      data: $form.serialize(),
      headers: { 'Accept': 'application/json' }
    })
      .done(function () {
        $('#form-success').fadeIn(200);
        $form[0].reset();
        setTimeout(function () { $('#form-success').fadeOut(300); }, 6000);
      })
      .fail(function () {
        $('#form-error').html('<i class="fa-solid fa-circle-exclamation"></i> Something went wrong sending your message. Please try again, or email me directly.').fadeIn(200);
      })
      .always(function () {
        $submitBtn.prop('disabled', false);
        $submitBtn.find('.cf-btn-loading').hide();
        $submitBtn.find('.cf-btn-text').show();
      });
  });

  /* ---------- Set current year ---------- */
  $('#year').text(new Date().getFullYear());

})(jQuery);
