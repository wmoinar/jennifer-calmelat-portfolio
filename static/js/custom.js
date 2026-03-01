(function ($) {
  "use strict";
  var NAY = {};
  var plugin_track = "static/plugin/";
  $.fn.exists = function () {
    return this.length > 0;
  };

  /* ---------------------------------------------- /*
	 * Pre load
	/* ---------------------------------------------- */
  NAY.PreLoad = function () {
    document.getElementById("loading").style.display = "none";
  };

  /*--------------------
        * Menu Close
    ----------------------*/
  NAY.MenuClose = function () {
    $(".navbar-nav a").on("click", function () {
      var toggle = $(".navbar-toggler").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse("hide");
      }
    });
  };

  NAY.MenuTogglerClose = function () {
    $(".toggler-menu").on("click", function () {
      $(this).toggleClass("open");
      $(".header-left").stop().toggleClass("menu-open menu-open-desk");
    });
    $(".header-left a").on("click", function () {
      var toggle = $(".toggler-menu").is(":visible");
      if (toggle) {
        $(".header-left").removeClass("menu-open");
        $(".toggler-menu").removeClass("open");
      }
    });
  };

  /* ---------------------------------------------- /*
	 * Hero Scroll Darkening & Corner Rounding
	/* ---------------------------------------------- */
  NAY.HeroDarken = function () {
    var overlay = document.querySelector(".hero-overlay");
    var hero = document.getElementById("home");
    if (!overlay || !hero) return;
    var scrolled = window.scrollY || window.pageYOffset;
    var heroH = hero.offsetHeight;

    var isMobile = window.innerWidth <= 991;
    var maxRadius = isMobile ? 40 : 80;
    
    // Animate border radius from 0 to maxRadius over the first 300px of scroll
    var radiusProgress = Math.min(scrolled / 200, 1);
    var currentRadius = radiusProgress * maxRadius;
    hero.style.borderRadius =
      "0 0 " + currentRadius + "px " + currentRadius + "px";

    // Once past the hero, go fully opaque → gaps between cards show solid black
    if (scrolled >= heroH) {
      overlay.style.background = "rgba(9,10,12,1)";
      return;
    }
    var progress = Math.min(scrolled / (heroH * 0.75), 1);
    var opacity = 0.55 + progress * 0.45; // 0.55 → 1.0
    overlay.style.background = "rgba(9,10,12," + opacity + ")";
  };

  /* ---------------------------------------------- /*
	 * Hero Scroll Indicator Fade Out
	/* ---------------------------------------------- */
  NAY.ScrollIndicatorHide = function () {
    var indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    var scrolled = window.scrollY || window.pageYOffset;
    
    // Fade out completely over the first 150px of scroll
    var progress = Math.min(scrolled / 150, 1);
    var opacity = 1 - progress;
    
    indicator.style.opacity = opacity;
    
    // Disable clicks when fully invisible
    if (opacity <= 0) {
      indicator.style.pointerEvents = "none";
    } else {
      indicator.style.pointerEvents = "all";
    }
  };

  /* ---------------------------------------------- /*
	 * Section 3 (Competencies) Top Corners reveal
	/* ---------------------------------------------- */
  var competenciesRaf = null;
  NAY.CompetenciesReveal = function () {
    if (competenciesRaf) return;
    competenciesRaf = window.requestAnimationFrame(function () {
      competenciesRaf = null;
      var section = document.getElementById("competencies");
      if (!section) return;

      var isMobile = window.innerWidth <= 991;
      var maxRadius = isMobile ? 40 : 80;

      // TOP corners: round as section enters viewport from below
      var winH = window.innerHeight;
      var sectionTop = section.getBoundingClientRect().top;
      var scrolledIn = Math.max(0, winH - sectionTop);
      var topRadius = Math.min(1, scrolledIn / 400) * maxRadius;

      // BOTTOM corners: round as section leaves viewport (bottom edge moves up)
      var botScrolledIn = Math.max(0, winH - section.getBoundingClientRect().bottom);
      var botRadius = Math.min(1, botScrolledIn / 400) * maxRadius;

      // Apply to section itself — white page shows through the rounded cutouts
      section.style.borderRadius =
        topRadius +
        "px " +
        topRadius +
        "px " +
        botRadius +
        "px " +
        botRadius +
        "px";
    });
  };

  /* ---------------------------------------------- /*
	 * Mobile Smooth Reveal Animations (T25)
	/* ---------------------------------------------- */
  NAY.MobileReveal = function () {
    if (window.innerWidth > 991) return;

    var elementsToReveal = document.querySelectorAll(
      ".about-img-reveal, .about-fade-item, .comp-skill-row, .comp-stat-item"
    );

    if (!elementsToReveal.length) return;

    // Remove any inline styles left over from desktop calculations
    elementsToReveal.forEach(function (el) {
      el.style.opacity = "";
      el.style.transform = "";
      el.classList.add("mobile-reveal");
    });

    var observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully in view
        threshold: 0.1,
      }
    );

    elementsToReveal.forEach(function (el) {
      observer.observe(el);
    });
  };

  /* ---------------------------------------------- /*
	 * Dynamic Origami Engine (Section 3)
	/* ---------------------------------------------- */
  var currentOrigamiIndex = -1;
  var origamiTimeout = null;

  NAY.DrawOrigami = function (idx) {
    if (idx === currentOrigamiIndex || idx < 0) return;
    currentOrigamiIndex = idx;
    
    // The 6 morphing geometric origami shapes
    // Each MUST have exactly 6 triangles defined by M x,y L x,y L x,y Z
    // They are grouped as arrays of exactly 6 facet objects: {d: "path...", fill: "color"}
    var shapes = [
      // 0: Paper Plane (PSEAH) - High Contrast
      [
        { d: "M 0,-40 L -20,15 L 0,15 Z", fill: "#ffffff" },
        { d: "M 0,-40 L 20,15 L 0,15 Z", fill: "#e2e8f0" },
        { d: "M 0,-40 L -30,20 L -20,15 Z", fill: "#cbd5e1" },
        { d: "M 0,-40 L 30,20 L 20,15 Z", fill: "#94a3b8" },
        { d: "M 0,15 L -20,15 L 0,30 Z", fill: "#f8fafc" },
        { d: "M 0,15 L 20,15 L 0,30 Z", fill: "#cbd5e1" }
      ],
      // 1: Diamond (Project Management) - Tightly folded multifaceted block
      [
        { d: "M 0,-30 L -20,-10 L 0,0 Z", fill: "#ffffff" },
        { d: "M 0,-30 L 20,-10 L 0,0 Z", fill: "#f1f5f9" },
        { d: "M -20,-10 L -30,10 L 0,0 Z", fill: "#cbd5e1" },
        { d: "M 20,-10 L 30,10 L 0,0 Z", fill: "#e2e8f0" },
        { d: "M -30,10 L 0,35 L 0,0 Z", fill: "#94a3b8" },
        { d: "M 30,10 L 0,35 L 0,0 Z", fill: "#cbd5e1" }
      ],
      // 2: Shield / Scales (Compliance)
      [
        { d: "M 0,-25 L -25,-25 L 0,-5 Z", fill: "#e2e8f0" },
        { d: "M 0,-25 L 25,-25 L 0,-5 Z", fill: "#ffffff" },
        { d: "M -25,-25 L -25,5 L 0,-5 Z", fill: "#94a3b8" },
        { d: "M 25,-25 L 25,5 L 0,-5 Z", fill: "#cbd5e1" },
        { d: "M -25,5 L 0,35 L 0,-5 Z", fill: "#cbd5e1" },
        { d: "M 25,5 L 0,35 L 0,-5 Z", fill: "#f1f5f9" }
      ],
      // 3: Opened Box / Folder (Case Management)
      [
        { d: "M 0,10 L -25,-5 L -25,20 Z", fill: "#cbd5e1" },
        { d: "M 0,10 L 25,-5 L 25,20 Z", fill: "#e2e8f0" },
        { d: "M -25,20 L 0,35 L 0,10 Z", fill: "#94a3b8" },
        { d: "M 25,20 L 0,35 L 0,10 Z", fill: "#cbd5e1" },
        { d: "M -25,-5 L 0,-20 L 0,10 Z", fill: "#ffffff" },
        { d: "M 25,-5 L 0,-20 L 0,10 Z", fill: "#f1f5f9" }
      ],
      // 4: Crane / Bird (Review) - Profile folded bird
      [
        { d: "M -10,10 L 15,5 L 0,25 Z", fill: "#cbd5e1" },
        { d: "M 15,5 L 25,15 L 0,25 Z", fill: "#e2e8f0" },
        { d: "M 15,5 L 25,-15 L 20,0 Z", fill: "#f1f5f9" },
        { d: "M 25,-15 L 35,-10 L 20,0 Z", fill: "#ffffff" },
        { d: "M -10,10 L -30,-20 L 15,5 Z", fill: "#ffffff" },
        { d: "M -10,10 L 0,-30 L 15,5 Z", fill: "#cbd5e1" }
      ],
      // 5: Arrow / Star Ribbon (Capacity Building)
      [
        { d: "M -8,30 L 0,30 L 0,0 Z", fill: "#cbd5e1" },
        { d: "M 0,30 L 8,30 L 0,0 Z", fill: "#e2e8f0" },
        { d: "M -8,0 L -25,0 L 0,0 Z", fill: "#94a3b8" },
        { d: "M 8,0 L 25,0 L 0,0 Z", fill: "#cbd5e1" },
        { d: "M -25,0 L 0,-35 L 0,0 Z", fill: "#ffffff" },
        { d: "M 25,0 L 0,-35 L 0,0 Z", fill: "#f1f5f9" }
      ]
    ];

    var shape = shapes[idx];
    if (!shape) return;

    // Apply the 6 triangle definitions directly to the DOM to trigger CSS morphing
    for (var i = 0; i < 6; i++) {
      var pathEl = document.getElementById('poly' + (i + 1));
      if (pathEl) {
        pathEl.setAttribute('d', shape[i].d);
        pathEl.setAttribute('fill', shape[i].fill);
      }
    }
  };

  /* ---------------------------------------------- /*
	 * Section 3 (Competencies) Sticky Scroll Animation
	 * Items 01-06 reveal one by one as user scrolls
	/* ---------------------------------------------- */
  NAY.CompetenciesScrollAnim = function () {
    var scrollArea = document.querySelector(".comp-scroll-area");
    if (!scrollArea) return;

    var rows = scrollArea.querySelectorAll(".comp-skill-row");
    var rightCol = scrollArea.querySelector(".comp-right-col");
    var statItems = scrollArea.querySelectorAll(".comp-stat-item");
    var langChips = scrollArea.querySelectorAll(".comp-lang-chip");
    var titleEl = scrollArea.querySelector(".comp-main-title");
    if (!rows.length) return;

    var N = rows.length; // 6
    var countersTriggered = false;

    function smoothstep(x) {
      x = Math.max(0, Math.min(1, x));
      return x * x * (3 - 2 * x);
    }

    function update() {
      if (window.innerWidth <= 991) {
        // On mobile, reset inline styles so CSS takes over
        for (var j = 0; j < N; j++) {
          rows[j].style.opacity = "";
          rows[j].style.transform = "";
        }
        for (var s = 0; s < statItems.length; s++) {
          statItems[s].style.opacity = "";
          statItems[s].style.transform = "";
        }
        for (var c = 0; c < langChips.length; c++) {
          langChips[c].style.opacity = "";
          langChips[c].style.transform = "";
        }
        if (rightCol) {
          rightCol.style.opacity = "";
        }
        if (titleEl) {
          titleEl.style.removeProperty("--title-fill");
        }
        requestAnimationFrame(update);
        return;
      }

      var scrollAreaTop =
        scrollArea.getBoundingClientRect().top + window.pageYOffset;
      var scrollRange = scrollArea.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) {
        requestAnimationFrame(update);
        return;
      }

      var progress = (window.pageYOffset - scrollAreaTop) / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      // Title reveal: gray → dark from left to right (0→25% of scroll)
      if (titleEl) {
        var fillPct =
          smoothstep(Math.max(0, Math.min(1, progress / 0.25))) * 100;
        titleEl.style.setProperty("--title-fill", fillPct.toFixed(1) + "%");
      }

      // 6 skill items: staggered over 5→65% range
      var skillRange = 0.6;
      var skillChunk = skillRange / N;
      var skillStart = 0.05;
      var skillRevealDur = skillChunk * 0.75;
      
      var activeImgIndex = -1;
      var dynamicImgs = rightCol ? rightCol.querySelectorAll(".comp-dynamic-img") : [];

      for (var i = 0; i < N; i++) {
        var itemStart = skillStart + i * skillChunk;
        var t = smoothstep(
          Math.max(0, Math.min(1, (progress - itemStart) / skillRevealDur)),
        );
        rows[i].style.opacity = t;
        rows[i].style.transform = "translateY(" + (1 - t) * 28 + "px)";
        
        // Track the currently active image based on scroll progress
        // An image becomes "active" when its corresponding row is at least 30% revealed
        // and before the next row reaches 30% reveal.
        if (progress >= itemStart + (skillRevealDur * 0.3)) {
          activeImgIndex = i;
        }
      }

      // Special case: before the first item starts, show the first image if we are scrolling down
      if (progress > 0 && activeImgIndex === -1) {
        activeImgIndex = 0;
      }

      // Draw the origami canvas shapes based on the active index
      if (typeof NAY.DrawOrigami === 'function') {
        NAY.DrawOrigami(activeImgIndex);
      }

      // Right column wrapper: toggle .show-stats class just before stat items start
      // Also ensure the right column base container is fully opaque immediately
      if (rightCol) {
        rightCol.style.opacity = progress > 0.01 ? "1" : "0"; // Always visible once scroll starts
        
        if (progress >= 0.66) {
          rightCol.classList.add("show-stats");
        } else {
          rightCol.classList.remove("show-stats");
        }
      }

      // 4 stat items: staggered over 68→88% (5% gap between each)
      for (var si = 0; si < statItems.length; si++) {
        var statStart = 0.68 + si * 0.05;
        var st = smoothstep(
          Math.max(0, Math.min(1, (progress - statStart) / 0.08)),
        );
        statItems[si].style.opacity = st;
        statItems[si].style.transform = "scale(" + (0.92 + 0.08 * st) + ")";
      }

      // Trigger counters once at progress >= 0.72
      if (!countersTriggered && progress >= 0.72) {
        countersTriggered = true;
        NAY.runCounters();
      }

      // 4 language chips: staggered over 84→96% (3% gap between each)
      for (var li = 0; li < langChips.length; li++) {
        var chipStart = 0.84 + li * 0.03;
        var lt = smoothstep(
          Math.max(0, Math.min(1, (progress - chipStart) / 0.06)),
        );
        langChips[li].style.opacity = lt;
        langChips[li].style.transform = "translateY(" + (1 - lt) * 12 + "px)";
      }

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  };

  /* ---------------------------------------------- /*
	 * Header Fixed — show only when scrolling UP
	/* ---------------------------------------------- */
  var _lastScrollTop = 0;
  NAY.HeaderFixd = function () {
    var scrollTop = $(window).scrollTop();
    var heroHeight = $("#home").outerHeight() || $(window).height();
    var scrollingDown = scrollTop > _lastScrollTop;
    _lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Toggle dark lang-switcher once fully past the hero
    $("#langSwitcherContainer").toggleClass(
      "lang-dark",
      scrollTop >= heroHeight,
    );

    if (scrollTop >= heroHeight - 80) {
      // Past the hero: show navbar only when scrolling UP
      if (!scrollingDown) {
        $("#topNavbar").addClass("visible");
        $("#langSwitcherContainer").addClass("nav-active");
      } else {
        $("#topNavbar").removeClass("visible");
        $("#langSwitcherContainer").removeClass("nav-active");
      }
    } else {
      $("#topNavbar").removeClass("visible");
      $("#langSwitcherContainer").removeClass("nav-active");
    }
  };

  /*--------------------
        * One Page
    ----------------------*/
  NAY.OnePage = function () {
    $(
      '.header-left a[href*="#"]:not([href="#"]), .go-to a[href*="#"]:not([href="#"])',
    ).on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          NAY.navigateTo(target);
          return false;
        }
      }
    });

    $('.header-nav a[href*="#"]:not([href="#"])').on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          NAY.navigateTo(target);
          return false;
        }
      }
    });
  };

  /*--------------------
        * One Page
    ----------------------*/
  NAY.OnePageTop = function () {
    $('.header-one-page a[href*="#"]:not([href="#"])').on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 65,
            },
            1000,
          );
          return false;
        }
      }
    });
  };

  /* ---------------------------------------------- /*
	 * Search Box
	/* ---------------------------------------------- */
  NAY.SearchBox = function () {
    var SearchToggle = $(".h_search");
    SearchToggle.on("click", function () {
      $(".h-search-section").toggleClass("searh-form-open");
    });
  };

  NAY.HeaderHeight = function () {
    var HHeight = $(".header-height .fixed-header-bar").height();
    $(".header-height").css("min-height", HHeight);
  };

  /* ---------------------------------------------- /*
	 * Mega Menu
	/* ---------------------------------------------- */

  NAY.MegaMenu = function () {
    var mDropdown = $(".m-dropdown-toggle");
    mDropdown.on("click", function () {
      $(this).parent().toggleClass("open-menu-parent");
      $(this).next("ul").toggleClass("open-menu");
      $(this).toggleClass("open");
    });
  };
  /* ---------------------------------------------- /*
		* accordion
	/* ---------------------------------------------- */
  NAY.Accordion = function () {
    $(".accordion").each(function (i, elem) {
      var $elem = $(this),
        $acpanel = $elem.find(".acco-group > .acco-des"),
        $acsnav = $elem.find(".acco-group > .acco-heading");
      $acpanel.hide().first().slideDown("easeOutExpo");
      $acsnav.first().parent().addClass("acco-active");
      $acsnav.on("click", function () {
        if (!$(this).parent().hasClass("acco-active")) {
          var $this = $(this).next(".acco-des");
          $acsnav.parent().removeClass("acco-active");
          $(this).parent().addClass("acco-active");
          $acpanel.not($this).slideUp("easeInExpo");
          $(this).next().slideDown("easeOutExpo");
        } else {
          $(this).parent().removeClass("acco-active");
          $(this).next().slideUp("easeInExpo");
        }
        return false;
      });
    });
  };

  /*--------------------
    * Counter JS
    ----------------------*/
  NAY.Counter = function () {
    var counts = document.querySelectorAll(".comp-stat-number .count");
    if (!counts.length) return;

    // Set initial display to 0
    counts.forEach(function (el) {
      el.textContent = "0";
    });

    // On mobile or reduced-motion, show final values immediately
    if (
      window.innerWidth <= 991 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      counts.forEach(function (el) {
        el.textContent = el.getAttribute("data-to") || "0";
      });
    }
  };

  // Public: triggered by CompetenciesScrollAnim when progress crosses 0.72
  NAY.runCounters = function () {
    var counts = document.querySelectorAll(".comp-stat-number .count");
    counts.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-to"), 10) || 0;
      var duration = 1200;
      var start = performance.now();
      function tick(now) {
        var t = Math.min((now - start) / duration, 1);
        t = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = Math.round(target * t);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  };

  /*--------------------
    * OwlSlider
    ----------------------*/
  NAY.Owl = function () {
    var owlslider = jQuery("div.owl-carousel");
    if (owlslider.length > 0) {
      loadScript(
        plugin_track + "owl-carousel/js/owl.carousel.min.js",
        function () {
          owlslider.each(function () {
            var $this = $(this),
              $items = $this.data("items") ? $this.data("items") : 1,
              $loop = $this.attr("data-loop") ? $this.data("loop") : true,
              $navdots = $this.data("nav-dots")
                ? $this.data("nav-dots")
                : false,
              $navarrow = $this.data("nav-arrow")
                ? $this.data("nav-arrow")
                : false,
              $autoplay = $this.attr("data-autoplay")
                ? $this.data("autoplay")
                : true,
              $autospeed = $this.attr("data-autospeed")
                ? $this.data("autospeed")
                : 5000,
              $smartspeed = $this.attr("data-smartspeed")
                ? $this.data("smartspeed")
                : 1000,
              $autohgt = $this.data("autoheight")
                ? $this.data("autoheight")
                : false,
              $CenterSlider = $this.data("center")
                ? $this.data("center")
                : false,
              $space = $this.attr("data-space") ? $this.data("space") : 30;

            $(this).owlCarousel({
              loop: $loop,
              items: $items,
              responsive: {
                0: {
                  items: $this.data("xx-items") ? $this.data("xx-items") : 1,
                },
                480: {
                  items: $this.data("xs-items") ? $this.data("xs-items") : 1,
                },
                768: {
                  items: $this.data("sm-items") ? $this.data("sm-items") : 1,
                },
                980: {
                  items: $this.data("md-items") ? $this.data("md-items") : 1,
                },
                1200: { items: $items },
              },
              dots: $navdots,
              autoplayTimeout: $autospeed,
              smartSpeed: $smartspeed,
              autoHeight: $autohgt,
              center: $CenterSlider,
              margin: $space,
              nav: $navarrow,
              navText: [
                "<i class='ti-arrow-left'></i>",
                "<i class='ti-arrow-right'></i>",
              ],
              autoplay: $autoplay,
              autoplayHoverPause: true,
            });
          });
        },
      );
    }
  };

  /* ---------------------------------------------- /*
     * lightbox gallery
    /* ---------------------------------------------- */
  NAY.Gallery = function () {
    if (
      $(".lightbox-gallery").exists() ||
      $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()
    ) {
      loadScript(
        plugin_track + "magnific/jquery.magnific-popup.min.js",
        function () {
          if ($(".lightbox-gallery").exists()) {
            $(".lightbox-gallery").magnificPopup({
              delegate: ".gallery-link",
              type: "image",
              tLoading: "Loading image #%curr%...",
              mainClass: "mfp-fade",
              fixedContentPos: true,
              closeBtnInside: false,
              gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1], // Will preload 0 - before current, and 1 after NAY current image
              },
            });
          }
          if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
            $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
              disableOn: 700,
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: false,
              fixedContentPos: false,
            });
          }
        },
      );
    }
  };

  /*--------------------
    * Masonry
    ----------------------*/
  NAY.masonry = function () {
    var portfolioWork = $(".portfolio-content");
    if ($(".portfolio-content").exists()) {
      loadScript(plugin_track + "isotope/isotope.pkgd.min.js", function () {
        if ($(".portfolio-content").exists()) {
          $(portfolioWork).isotope({
            resizable: false,
            itemSelector: ".grid-item",
            layoutMode: "masonry",
            filter: "*",
          });
          //Filtering items on portfolio.html
          var portfolioFilter = $(".filter li");
          // filter items on button click
          $(portfolioFilter).on("click", function () {
            var filterValue = $(this).attr("data-filter");
            portfolioWork.isotope({ filter: filterValue });
          });
          //Add/remove class on filter list
          $(portfolioFilter).on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
          });
        }
      });
    }
  };

  /*--------------------
        * Progress Bar
    ----------------------*/
  NAY.ProgressBar = function () {
    $(".skill-bar .skill-bar-in").each(function () {
      var bottom_object = $(this).offset().top + $(this).outerHeight();
      var bottom_window = $(window).scrollTop() + $(window).height();
      var progressWidth = $(this).attr("aria-valuenow") + "%";
      if (bottom_window > bottom_object) {
        $(this).css({
          width: progressWidth,
        });
      }
    });
  };

  /*--------------------
        * particles
    ----------------------*/
  NAY.particles = function () {
    if ($("#particles-box").exists()) {
      loadScript(plugin_track + "particles/particles.min.js", function () {});
      loadScript(plugin_track + "particles/particles-app.js", function () {});
    }
  };

  /*--------------------
        * Fade Page Transition
    ----------------------*/
  // Returns the correct scrollTop for a section target.
  // #about has a 200vh sticky scroll-area; without an offset the nav lands in
  // the blue title-only phase (Phase 1).  Content is fully visible at ~65% of
  // the scroll-area's scrollable height, so we add that offset on desktop.
  function scrollTopFor(target) {
    var top = target.offset().top;
    if (target.attr("id") === "about" && window.innerWidth > 991) {
      var scrollArea = document.querySelector("#about .about-scroll-area");
      if (scrollArea) {
        var scrollH = Math.max(0, scrollArea.offsetHeight - window.innerHeight);
        top += Math.round(scrollH * 0.85);
      }
    }
    return top;
  }

  var _navBusy = false;
  NAY.navigateTo = function (target) {
    if (_navBusy) return;
    if (!target || !target.length) return;
    _navBusy = true;

    var overlay = document.getElementById("pageTransition");
    var targetTop = scrollTopFor(target);

    // Phase 1: fade to white (350ms)
    overlay.classList.add("active");

    setTimeout(function () {
      // Phase 2: instant jump
      window.scrollTo(0, targetTop);

      // Phase 3: wait for paint, then fade back in
      setTimeout(function () {
        overlay.classList.remove("active");
        // Unlock after fade-in completes
        setTimeout(function () {
          _navBusy = false;
        }, 350);
      }, 50);
    }, 350);
  };

  /*--------------------
        * Top Nav Init
    ----------------------*/
  NAY.initTopNav = function () {
    // Hamburger toggle
    $("#topNavToggle").on("click", function () {
      $("#mobileDrawer").addClass("open");
      $("#drawerOverlay").addClass("open");
    });
    // Close drawer
    $("#drawerClose, #drawerOverlay").on("click", function () {
      $("#mobileDrawer").removeClass("open");
      $("#drawerOverlay").removeClass("open");
    });
    // Drawer links close drawer and fade-navigate
    $('#mobileDrawer a[href^="#"]').on("click", function () {
      $("#mobileDrawer").removeClass("open");
      $("#drawerOverlay").removeClass("open");
      var target = $(this.hash);
      if (target.length) {
        NAY.navigateTo(target);
        return false;
      }
    });
    // Top navbar links fade-navigate
    $('#topNavbar .top-navbar-links a[href^="#"]').on("click", function () {
      var target = $(this.hash);
      if (target.length) {
        NAY.navigateTo(target);
        return false;
      }
    });
    // Top navbar logo fade-navigate to top
    $("#topNavbar .top-navbar-logo").on("click", function (e) {
      e.preventDefault();
      NAY.navigateTo($("#home"));
    });
    // Close top lang dropdown when clicking outside
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".top-navbar-lang").length) {
        $("#topLangDropdown").removeClass("open");
      }
    });

    // Set default active language on load
    var defaultLang = $("body").attr("data-lang") || "en";
    $('#topLangDropdown a[data-lang="' + defaultLang + '"]').addClass("active");

    // Scroll indicator — fade-navigate to next section
    $(".scroll-indicator a").on("click", function () {
      var target = $($(this).data("scroll-to"));
      if (!target.length) return;
      NAY.navigateTo(target);
    });
  };

  NAY.toggleTopLangMenu = function () {
    $("#topLangDropdown").toggleClass("open");
  };

  /*--------------------
        * Video Bg
    ----------------------*/
  NAY.VideoBG = function () {
    if ($(".video-bg").exists()) {
      loadScript(plugin_track + "vide/jquery.vide.min.js", function () {});
    }
  };

  /*--------------------
        * Language Switcher SPA
    ----------------------*/
  NAY.changeLanguage = function (lang) {
    // Update active class on dropdown links
    $(".lang-switcher .lang-dropdown a").removeClass("active");
    $('.lang-switcher .lang-dropdown a[data-lang="' + lang + '"]').addClass(
      "active",
    );

    // Update the badge text (hero lang switcher)
    var langText = lang.toUpperCase();
    var heroToggle = $(".lang-switcher .lang-toggle");
    heroToggle.find(".btn-txt").text(langText);
    heroToggle.find(".btn-over > span:first-child").text(langText);

    // Close dropdown
    $("#langSwitcherContainer").removeClass("open");

    // Update top navbar lang button
    var topToggle = $(".lang-toggle-top");
    topToggle.find(".btn-txt").text(langText);
    topToggle.find(".btn-over > span:first-child").text(langText);
    $("#topLangDropdown").removeClass("open");
    $("#topLangDropdown a").removeClass("active");
    $('#topLangDropdown a[data-lang="' + lang + '"]').addClass("active");

    // Close mobile drawer if open
    $("#mobileDrawer").removeClass("open");
    $("#drawerOverlay").removeClass("open");

    // Update body data-lang
    $("body").attr("data-lang", lang);

    // Update Content
    NAY.updateContent(lang);

    // Re-init Typewriter
    NAY.mTypeIt();
  };

  // Close language dropdown when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".lang-switcher").length) {
      $("#langSwitcherContainer").removeClass("open");
    }
  });

  NAY.updateContent = function (lang) {
    if (typeof translations === "undefined" || !translations[lang]) return;

    $("[data-i18n]").each(function () {
      var rawKey = $(this).data("i18n");
      var key = rawKey;
      var attr = "html";

      if (rawKey.indexOf("[") === 0 && rawKey.indexOf("]") > 0) {
        var parts = rawKey.split("]");
        attr = parts[0].replace("[", "");
        key = parts[1];
      }

      var value = translations[lang][key];
      if (value) {
        if (attr === "html") {
          $(this).html(value);
        } else {
          $(this).attr(attr, value);
        }
      }
    });
  };

  /*--------------------
        * Type It
    ----------------------*/
  var typeItInstance = null;

  NAY.mTypeIt = function () {
    if ($("#type-it").exists()) {
      loadScript(plugin_track + "typeit-master/typeit.min.js", function () {
        // Destroy existing instance if any
        if (typeItInstance) {
          typeItInstance.destroy();
          typeItInstance = null;
        }
        $("#type-it").empty();

        var lang = $("body").attr("data-lang") || "en";
        var strings = ["Investigator", "Humanitarian", "Consultant"];

        if (lang === "fr") {
          strings = ["Enquêtrice", "Humanitaire", "Consultante"];
        } else if (lang === "es") {
          strings = ["Investigadora", "Humanitaria", "Consultora"];
        }

        // Initialize TypeIt with proper chaining
        typeItInstance = new TypeIt("#type-it", {
          speed: 100,
          waitUntilVisible: true,
          loop: true,
        });

        // Chain the strings
        strings.forEach(function (str, index) {
          typeItInstance.type(str);
          if (index < strings.length - 1) {
            typeItInstance.pause(1500).delete().pause(500);
          }
        });

        typeItInstance.go();
      });
    }
  };

  /* ---------------------------------------------- /*
	 * About Section Scroll Animation (Joby-style)
	/* ---------------------------------------------- */
  NAY.AboutScrollAnim = function () {
    var section = document.getElementById("about");
    if (!section) return;

    var scrollArea = section.querySelector(".about-scroll-area");
    var sticky = section.querySelector(".about-sticky");
    var heroTitle = section.querySelector(".about-hero-title");
    var heroH3 = heroTitle ? heroTitle.querySelector("h3") : null;
    var heroSub = heroTitle ? heroTitle.querySelector(".about-sub") : null;
    var contentWrap = section.querySelector(".about-content-wrap");
    var imgReveal = section.querySelector(".about-img-reveal");
    var fadeItems = section.querySelectorAll(".about-fade-item");

    if (!scrollArea || !sticky) return;

    // Color keyframes: blue → light blue → cream → white
    var bgStops = [
      { pos: 0, r: 0, g: 122, b: 229 }, // #007ae5
      { pos: 0.35, r: 130, g: 178, b: 230 }, // light blue
      { pos: 0.65, r: 220, g: 225, b: 220 }, // light sage
      { pos: 1, r: 255, g: 255, b: 255 }, // white
    ];
    // Title color: white → dark
    var txtStops = [
      { pos: 0, r: 255, g: 255, b: 255 }, // white
      { pos: 0.35, r: 200, g: 200, b: 200 }, // light gray
      { pos: 0.65, r: 80, g: 80, b: 80 }, // dark gray
      { pos: 1, r: 25, g: 25, b: 30 }, // near-black
    ];

    function lerpStops(stops, t) {
      t = Math.max(0, Math.min(1, t));
      for (var i = 0; i < stops.length - 1; i++) {
        if (t >= stops[i].pos && t <= stops[i + 1].pos) {
          var local = (t - stops[i].pos) / (stops[i + 1].pos - stops[i].pos);
          // Smooth easing
          local = local * local * (3 - 2 * local);
          return {
            r: Math.round(stops[i].r + (stops[i + 1].r - stops[i].r) * local),
            g: Math.round(stops[i].g + (stops[i + 1].g - stops[i].g) * local),
            b: Math.round(stops[i].b + (stops[i + 1].b - stops[i].b) * local),
          };
        }
      }
      var last = stops[stops.length - 1];
      return { r: last.r, g: last.g, b: last.b };
    }

    // Cache values that must NOT be recalculated mid-scroll (causes reflow / mobile toolbar jumps)
    var computedH3Size = 100;
    var startY = 0;
    var cachedInnerH = window.innerHeight;
    // On mobile/tablet (≤991px) the sticky element is taller than its scroll area,
    // so position:sticky never pins and progress is always 0. Skip JS animation entirely;
    // CSS !important rules in the media query handle the static display.
    var isDesktop = window.innerWidth > 991;

    // ---- Spring physics state ----
    // Critically damped spring: d = 2 * sqrt(k) eliminates oscillation.
    // k=120 → ω₀=10.95 rad/s → settles in ~4 frames; d=22 (slight overdamp for smoothness)
    var SPRING_K = 120;
    var SPRING_D = 22;
    var springPos = 0; // smoothed progress value (0 → 1)
    var springVel = 0; // current velocity

    function cacheLayoutValues() {
      isDesktop = window.innerWidth > 991;
      // Cache viewport height — mobile browser toolbar changes innerHeight ~60px on scroll,
      // causing rawProgress to jump if innerHeight is read per-frame.
      cachedInnerH = window.innerHeight;
      // getComputedStyle forces layout — only call this on init and resize, never per-frame
      if (heroH3) {
        computedH3Size =
          parseFloat(window.getComputedStyle(heroH3).fontSize) || 100;
      }
      startY = isDesktop ? Math.max(0, cachedInnerH * 0.35 - 80) : 0;
      // On resize, snap spring to current scroll position (avoid snap-back animation)
      var rect = scrollArea.getBoundingClientRect();
      var scrollH = scrollArea.offsetHeight - cachedInnerH;
      if (scrollH > 0) {
        springPos = Math.max(0, Math.min(1, -rect.top / scrollH));
        springVel = 0;
      }
    }
    cacheLayoutValues();
    window.addEventListener("resize", cacheLayoutValues, { passive: true });

    function updateAnim(dt) {
      // On mobile/tablet, CSS handles the static display — no JS animation needed
      if (!isDesktop) return;

      var rect = scrollArea.getBoundingClientRect();
      // Use cachedInnerH — avoids per-frame jump when mobile browser toolbar shows/hides
      var scrollH = scrollArea.offsetHeight - cachedInnerH;
      if (scrollH <= 0) return;

      // Raw scroll target (0 to 1) — instantaneous, may jump on fast scroll
      var rawTarget = Math.max(0, Math.min(1, -rect.top / scrollH));

      // Spring step: F = -k*(pos - target) - d*vel
      // This smooths out the animation relative to scroll velocity:
      // slow scroll → spring follows closely; fast scroll → spring lags slightly then catches up
      var force = -SPRING_K * (springPos - rawTarget) - SPRING_D * springVel;
      springVel += force * dt;
      springPos += springVel * dt;
      springPos = Math.max(0, Math.min(1, springPos));

      // Snap to target when negligibly close (avoids infinite micro-updates)
      if (
        Math.abs(springPos - rawTarget) < 0.0005 &&
        Math.abs(springVel) < 0.0005
      ) {
        springPos = rawTarget;
        springVel = 0;
      }

      var progress = springPos;

      // Phase 1: 0 → 0.4 = color transition + title shrinks into its resting position
      var rawColorProgress = Math.min(1, progress / 0.4);
      var colorProgress =
        rawColorProgress * rawColorProgress * (3 - 2 * rawColorProgress);

      // Phase 2: starts only after title is fully "placed" (progress ≥ 0.4)
      // Maps 0.4 → 1.0 of progress to 0 → 1 for content reveal
      var rawContentProgress = Math.max(0, (progress - 0.4) / 0.6);
      var contentProgress =
        rawContentProgress * rawContentProgress * (3 - 2 * rawContentProgress);

      // -- Phase 1: Background + Title color --
      var bg = lerpStops(bgStops, rawColorProgress);
      sticky.style.backgroundColor =
        "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")";

      var txt = lerpStops(txtStops, rawColorProgress);
      if (heroH3)
        heroH3.style.color = "rgb(" + txt.r + "," + txt.g + "," + txt.b + ")";
      if (heroSub)
        heroSub.style.color =
          "rgba(" + txt.r + "," + txt.g + "," + txt.b + ",0.6)";

      // Use cached computedH3Size — no getComputedStyle per frame
      var targetScale = 35 / computedH3Size;
      var currentScale = 1 - (1 - targetScale) * colorProgress;

      // Use cached startY — no window.innerHeight per frame
      var currentY = startY * (1 - colorProgress);

      if (heroTitle) {
        heroTitle.style.transform =
          "translateY(" + currentY + "px) scale(" + currentScale + ")";
        heroTitle.style.top = "0"; // reset any residual top styles
      }

      // -- Phase 2: Content reveal (only after title is placed) --
      if (contentProgress > 0) {
        var contentOpacity = Math.min(1, contentProgress * 2.5);
        contentWrap.style.opacity = contentOpacity;
        contentWrap.style.pointerEvents =
          contentProgress > 0.3 ? "auto" : "none";

        // Image scales from subtle start (0.85) to full (1) with smoothstep
        if (imgReveal) {
          var imgP = Math.min(1, contentProgress * 1.6);
          var imgEased = imgP * imgP * (3 - 2 * imgP);
          var imgScale = 0.85 + 0.15 * imgEased;
          imgReveal.style.transform = "scale(" + imgScale + ")";
          imgReveal.style.opacity = Math.min(1, contentProgress * 2.5);
        }

        // Stagger fade-in for text items with smoothstep + subtle slide
        fadeItems.forEach(function (el, i) {
          var itemDelay = i * 0.05;
          var itemP = Math.max(
            0,
            (contentProgress - itemDelay) / (1 - itemDelay),
          );
          itemP = Math.min(1, itemP * 1.4);
          var eased = itemP * itemP * (3 - 2 * itemP);
          el.style.opacity = eased;
          el.style.transform = "translateY(" + 20 * (1 - eased) + "px)";
        });
      } else {
        contentWrap.style.opacity = 0;
        contentWrap.style.pointerEvents = "none";
        if (imgReveal) {
          imgReveal.style.transform = "scale(0.85)";
          imgReveal.style.opacity = 0;
        }
        fadeItems.forEach(function (el) {
          el.style.opacity = 0;
          el.style.transform = "translateY(20px)";
        });
      }
    }

    // RAF loop with real delta-time — avoids assuming 60fps, handles tab-switch pauses correctly
    var lastTime = performance.now();
    function loop(timestamp) {
      // Cap dt at 50ms to prevent a massive jump after the tab is switched back
      var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      updateAnim(dt);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  };

  /* ---------------------------------------------------------------------- /*
	 * T8: Areas of Expertise — Parametric Wave Surface
	 *
	 * Dense COLS×ROWS grid.  Y and X displaced in quadrature (sin/cos),
	 * so dots bunch at crests → natural 3-D density variation.
	 * Nonlinear column mapping (u^0.60) compresses the left (near) edge,
	 * reproducing the tight-fold look of the reference image.
	/* ---------------------------------------------------------------------- */
  NAY.ExpertiseWave = function () {
    var canvas = document.getElementById("expertise-canvas");
    var stickyEl = document.querySelector(".expertise-sticky");
    if (!canvas || !stickyEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    var ctx = canvas.getContext("2d");
    var mouse = { x: -9999, y: -9999 };
    var rafId = null;
    var W = 0,
      H = 0,
      t = 0;
    var COLS, ROWS;
    // project blue #5099df = rgb(80,153,223)
    var CR = 80,
      CG = 153,
      CB = 223;

    function resize() {
      W = canvas.width = stickyEl.offsetWidth;
      H = canvas.height = stickyEl.offsetHeight;
      // ~1 col per 13 px, ~1 row per 11 px — high density
      COLS = Math.max(50, Math.min(85, Math.round(W / 13)));
      ROWS = Math.max(48, Math.min(75, Math.round(H / 11)));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.002;

      var cx = W * 0.67,
        hw = W * 0.28;
      var col, row, u, v, uNL, phaseU, envV, depth, amp;
      var p1, p2, p3, yD, xD, sx, sy, dx, dy, md, mf, size, alpha;

      for (col = 0; col < COLS; col++) {
        u = col / (COLS - 1);
        uNL = Math.pow(u, 0.6); // near-edge compression
        phaseU = uNL * Math.PI * 3.5; // wave travels across ribbon
        depth = 1 - uNL * 0.58; // near=large, far=small

        for (row = 0; row < ROWS; row++) {
          v = row / (ROWS - 1);
          envV = Math.sin(v * Math.PI); // balloon silhouette
          amp = envV * H * 0.19;

          p1 = v * Math.PI * 2.8 + phaseU + t;
          p2 = v * Math.PI * 5.4 - phaseU * 0.7 + t * 1.35;
          p3 = v * Math.PI * 9.1 + phaseU * 0.4 - t * 0.85;

          yD =
            amp *
            (0.58 * Math.sin(p1) + 0.28 * Math.sin(p2) + 0.14 * Math.sin(p3));
          xD = amp * 0.1 * (Math.cos(p1) + 0.35 * Math.cos(p2));

          sx = cx - hw + uNL * hw * 2 + xD;
          sy = v * H + yD;

          if (sy < -4 || sy > H + 4) continue;

          dx = sx - mouse.x;
          dy = sy - mouse.y;
          md = Math.sqrt(dx * dx + dy * dy);
          if (md < 95 && md > 0) {
            mf = (1 - md / 95) * 30;
            sx += (dx / md) * mf;
            sy += (dy / md) * mf;
          }

          size = Math.max(0.3, envV * depth * 1.8);
          alpha = Math.min(0.55, Math.max(0.04, envV * depth * 0.48));

          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fillStyle =
            "rgba(" + CR + "," + CG + "," + CB + "," + alpha + ")";
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(draw);
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !rafId) {
            rafId = requestAnimationFrame(draw);
          } else if (!e.isIntersecting && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      },
      { rootMargin: "100px" },
    );
    obs.observe(stickyEl);

    stickyEl.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    stickyEl.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    window.addEventListener("resize", function () {
      resize();
    });
    resize();
  };

  /* ---------------------------------------------------------------------- /*
	 * T8: Areas of Expertise — Scroll-Driven Panel Switch
	/* ---------------------------------------------------------------------- */
  NAY.ExpertiseScroll = function () {
    var scrollArea = document.querySelector(".expertise-scroll-area");
    if (!scrollArea) return;

    var panels = scrollArea.querySelectorAll(".exp-panel");
    var counterEl = scrollArea.querySelector(".expertise-current-num");
    var progressFill = scrollArea.querySelector(".expertise-progress-fill");
    
    /* New references for dynamic images and stats wrapper */
    var rightCol = document.querySelector(".comp-right-col");
    var dynamicImgs = document.querySelectorAll(".comp-dynamic-img");

    var n = panels.length,
      activeIdx = 0;

    for (var k = 0; k < n; k++) {
      panels[k].classList.remove("active");
      if (dynamicImgs[k]) dynamicImgs[k].classList.remove("active");
    }
    panels[0].classList.add("active");
    if (dynamicImgs.length > 0) dynamicImgs[0].classList.add("active");
    
    if (counterEl) counterEl.textContent = "01";
    if (progressFill) progressFill.style.height = (1 / n) * 100 + "%";

    function isMobile() {
      return window.innerWidth < 768;
    }

    function onScroll() {
      if (isMobile()) return;
      var rect = scrollArea.getBoundingClientRect();
      var scrolled = -rect.top;
      var total = rect.height - window.innerHeight;
      if (total <= 0) return;

      var idx =
        scrolled <= 0
          ? 0
          : scrolled >= total
            ? n - 1
            : Math.min(Math.floor((scrolled / total) * n), n - 1);

      if (idx !== activeIdx) {
        // Toggle text panels
        panels[activeIdx].classList.remove("active");
        panels[idx].classList.add("active");
        
        // Toggle dynamic images
        if (dynamicImgs[activeIdx]) dynamicImgs[activeIdx].classList.remove("active");
        if (dynamicImgs[idx]) dynamicImgs[idx].classList.add("active");

        activeIdx = idx;
      }

      // Show stats only when scrolling at the very end (last panel)
      if (rightCol) {
        // threshold: show stats when reaching the last 5% of the scroll area
        var progress = scrolled / total;
        if (progress > 0.95) {
          rightCol.classList.add("show-stats");
        } else {
          rightCol.classList.remove("show-stats");
        }
      }

      if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, "0");
      if (progressFill) progressFill.style.height = ((idx + 1) / n) * 100 + "%";
    }

    function initMobileReveal() {
      if (!isMobile()) return;
      var mObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("active");
              e.target.classList.add("mobile-vis");
              mObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      for (var i = 0; i < n; i++) mObs.observe(panels[i]);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    initMobileReveal();
  };

  /* ---------------------------------------------- /*
	 * T9: Work Experience — Light-Ray Scroll Animation
	 * Ray tip sits at 62% viewport height; as the timeline
	 * scrolls up, the orange beam "illuminates" each item.
	/* ---------------------------------------------- */
  NAY.ExperienceTimeline = function () {
    var timeline = document.querySelector(".experience-timeline");
    if (!timeline) return;

    var track = timeline.querySelector(".exp-track");
    var fill = timeline.querySelector(".exp-track-fill");
    var items = timeline.querySelectorAll(".experience-item");
    if (!fill || !items.length) return;

    var reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      fill.style.height = "100%";
      for (var j = 0; j < items.length; j++)
        items[j].classList.add("exp-active");
      return;
    }

    /* Ray "reading line" sits at 62% from top of viewport */
    var RAY_VP = 0.62;

    function updateRay() {
      var viewH = window.innerHeight;
      var rayViewY = viewH * RAY_VP; /* ray Y in viewport coords */

      /* Size the fill relative to the track container */
      var trackEl = track || fill.parentElement;
      var trackRect = trackEl.getBoundingClientRect();
      var trackH = trackEl.offsetHeight;
      var fillPx = rayViewY - trackRect.top;
      fillPx = Math.max(0, Math.min(trackH, fillPx));
      fill.style.height = fillPx + "px";

      /* Illuminate items whose dot has been crossed by the ray */
      for (var i = 0; i < items.length; i++) {
        var dotViewY =
          items[i].getBoundingClientRect().top + 18; /* ~dot offset */
        if (dotViewY <= rayViewY) {
          items[i].classList.add("exp-active");
        } else {
          items[i].classList.remove("exp-active");
        }
      }
    }

    window.addEventListener("scroll", updateRay, { passive: true });
    window.addEventListener("resize", updateRay, { passive: true });
    updateRay();
  };

  /* ---------------------------------------------- /*
	 * Education Reveal (horizontal timeline)
	/* ---------------------------------------------- */
  NAY.CertReveal = function () {
    var section = document.getElementById("certifications");
    if (!section) return;
    var wall = section.querySelector(".cert-wall");
    if (!wall) return;

    var reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      wall.classList.add("cert-wall-visible");
      wall.querySelectorAll(".cert-card").forEach(function (c) {
        c.classList.add("cert-entered");
      });
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          wall.classList.add("cert-wall-visible");
          /* After longest stagger (0.55s delay + 0.55s transition), mark cards
				   as cert-entered so hover transform works without stagger delay */
          setTimeout(function () {
            wall.querySelectorAll(".cert-card").forEach(function (c) {
              c.classList.add("cert-entered");
            });
          }, 1300);
        } else {
          wall.classList.remove("cert-wall-visible");
          wall.querySelectorAll(".cert-card").forEach(function (c) {
            c.classList.remove("cert-entered");
          });
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(section);
  };

  NAY.EducationReveal = function () {
    var section = document.getElementById("education");
    if (!section) return;
    var timeline = section.querySelector(".edu-timeline");
    if (!timeline) return;

    /* Align track line with node row center.
     * Uses offsetTop (layout-based, unaffected by CSS transforms on parent entries)
     * so the track stays correct before AND after the translateY animation. */
    function positionEduTrack() {
      var firstNode = section.querySelector(".edu-node");
      if (!firstNode) return;
      /* offsetTop is relative to .edu-timeline (nearest positioned ancestor) */
      var trackTop = Math.round(
        firstNode.offsetTop + firstNode.offsetHeight / 2 - 1,
      );
      var bg = timeline.querySelector(".edu-track-bg");
      var fill = timeline.querySelector(".edu-track-fill");
      if (bg) bg.style.top = trackTop + "px";
      if (fill) fill.style.top = trackTop + "px";
    }

    positionEduTrack();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(positionEduTrack);
    }
    window.addEventListener("resize", positionEduTrack);

    var reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      timeline.classList.add("edu-visible");
      return;
    }

    /* Bidirectional: add .edu-visible on scroll-in, remove on scroll-out */
    var obs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          timeline.classList.add("edu-visible");
        } else {
          timeline.classList.remove("edu-visible");
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(section);
  };

  /* ---------------------------------------------- /*
	 * Section Radius — scroll-driven border-radius
	 * About (.about-sticky) bottom + Key Competencies (.comp-sticky) + footer
	/* ---------------------------------------------- */
  NAY.SectionRadius = function () {
    var comp = document.querySelector(".comp-sticky");
    var about = document.querySelector(".about-sticky");
    var contact = document.querySelector("#contactus");
    var footer = document.querySelector("footer.footer");
    if (!comp && !footer) return;

    var MAX = 40; /* peak radius in px */

    /* Tent function (sticky sections that traverse full viewport height):
     *   top = vpHeight  → 0   (just entering, below fold)
     *   top = vpHeight/2 → MAX (section centered in viewport)
     *   top = 0          → 0   (reached the top, flush edge)
     */
    function tent(top, vh) {
      if (top <= 0 || top >= vh) return 0;
      return Math.round((1 - Math.abs(2 * (top / vh) - 1)) * MAX);
    }

    /* Footer ramp: driven by contact.bottom (or footer.top as fallback).
     * FOOT_RAMP = 60px — footer is ~55px tall, so radius reaches MAX
     * exactly when the footer is fully visible in the viewport.
     *   driver = vh   → rf = 0   (footer just entering)
     *   driver = vh-60 → rf = MAX (footer fully visible)
     */
    var FOOT_RAMP = 60;

    function update() {
      var vh = window.innerHeight;
      if (comp) {
        var r = tent(comp.getBoundingClientRect().top, vh);
        comp.style.borderRadius = r + "px";
        /* about-sticky bottom corners mirror comp-sticky top corners */
        if (about) {
          about.style.borderBottomLeftRadius = r + "px";
          about.style.borderBottomRightRadius = r + "px";
        }
      }
      if (footer) {
        /* Use contact.bottom as driver so animation starts exactly
         * when contact exits the viewport (= footer starts entering) */
        var driver = contact
          ? contact.getBoundingClientRect().bottom
          : footer.getBoundingClientRect().top;
        var rf = Math.round(
          Math.min(1, Math.max(0, (vh - driver) / FOOT_RAMP)) * MAX,
        );
        footer.style.borderTopLeftRadius = rf + "px";
        footer.style.borderTopRightRadius = rf + "px";
        if (contact) {
          contact.style.borderBottomLeftRadius = rf + "px";
          contact.style.borderBottomRightRadius = rf + "px";
        }
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  };

  /* ---------------------------------------------- /*
	 * All Functions
	/* ---------------------------------------------- */
  // loadScript
  var _arr = {};
  function loadScript(scriptName, callback) {
    if (!_arr[scriptName]) {
      _arr[scriptName] = true;
      var body = document.getElementsByTagName("body")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = scriptName;
      // NAYn bind NAY event to NAY callback function
      // NAYre are several events for cross browser compatibility
      // script.onreadystatechange = callback;
      script.onload = callback;
      // fire NAY loading
      body.appendChild(script);
    } else if (callback) {
      callback();
    }
  }

  // Window on Load
  $(window).on("load", function () {
    (NAY.masonry(), NAY.PreLoad());
  });
  // Document on Ready
  $(document).on("ready", function () {
    (NAY.particles(),
      NAY.VideoBG(),
      NAY.HeaderFixd(),
      NAY.OnePage(),
      NAY.OnePageTop(),
      NAY.Accordion(),
      NAY.Counter(),
      NAY.MenuClose(),
      NAY.MenuTogglerClose(),
      NAY.Gallery(),
      NAY.SearchBox(),
      NAY.HeaderHeight(),
      NAY.MegaMenu(),
      NAY.ProgressBar(),
      NAY.initTopNav(),
      NAY.mTypeIt(),
      NAY.Owl(),
      NAY.AboutScrollAnim());
    NAY.CompetenciesReveal();
    NAY.CompetenciesScrollAnim();
    NAY.ExpertiseWave();
    NAY.ExpertiseScroll();
    NAY.ExperienceTimeline();
    NAY.CertReveal();
    NAY.EducationReveal();
    NAY.SectionRadius();
    NAY.ScrollIndicatorHide();
    NAY.MobileReveal();

    // Initialize translations with default language
    var defaultLang = $("body").attr("data-lang") || "en";
    NAY.updateContent(defaultLang);
  });

  // Document on Scrool
  $(window).on("scroll", function () {
    (NAY.ProgressBar(), NAY.HeaderFixd());
    NAY.HeroDarken();
    NAY.CompetenciesReveal();
    NAY.ScrollIndicatorHide();
  });

  // Window on Resize
  $(window).on("resize", function () {
    NAY.HeaderHeight();
    NAY.CompetenciesReveal();
  });

  window.NAY = NAY;
})(jQuery);
