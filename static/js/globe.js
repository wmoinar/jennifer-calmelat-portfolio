/* ============================================================
   Jennifer Calmelat — globe.js
   Dependency-light animated globe: own orthographic projection
   on canvas 2D, continents rendered as a dot matrix.
   topojson-client (CDN) is only needed to decode the land file;
   without it the globe still renders sphere + country markers.
   ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("globeCanvas");
  var wrap = document.getElementById("globeWrap");
  var listEl = document.getElementById("fpList");
  if (!canvas || !wrap || !listEl) return;

  var RAD = Math.PI / 180;

  /* [lon, lat], type: field = deployed on site, remote = remote casework */
  var COUNTRIES = [
    { lon: 2.4, lat: 46.6, type: "field", name: { en: "France", fr: "France", es: "Francia" } },
    { lon: 4.5, lat: 50.6, type: "field", name: { en: "Belgium", fr: "Belgique", es: "Bélgica" } },
    { lon: 31.0, lat: 49.0, type: "field", name: { en: "Ukraine", fr: "Ukraine", es: "Ucrania" } },
    { lon: -74.0, lat: 4.6, type: "field", name: { en: "Colombia", fr: "Colombie", es: "Colombia" } },
    { lon: 69.0, lat: 30.0, type: "field", name: { en: "Pakistan", fr: "Pakistan", es: "Pakistán" } },
    { lon: 23.6, lat: -2.9, type: "field", name: { en: "DR Congo", fr: "RD Congo", es: "RD Congo" } },
    { lon: -11.8, lat: 8.5, type: "field", name: { en: "Sierra Leone", fr: "Sierra Leone", es: "Sierra Leona" } },
    { lon: 31.5, lat: -26.5, type: "field", name: { en: "Eswatini", fr: "Eswatini", es: "Esuatini" } },
    { lon: -5.5, lat: 7.5, type: "field", name: { en: "Côte d'Ivoire", fr: "Côte d'Ivoire", es: "Costa de Marfil" } },
    { lon: 40.5, lat: 9.1, type: "field", name: { en: "Ethiopia", fr: "Éthiopie", es: "Etiopía" } },
    { lon: 12.7, lat: 5.7, type: "field", name: { en: "Cameroon", fr: "Cameroun", es: "Camerún" } },
    { lon: 103.8, lat: 1.35, type: "remote", name: { en: "Singapore", fr: "Singapour", es: "Singapur" } },
    { lon: 37.9, lat: 0.4, type: "remote", name: { en: "Kenya", fr: "Kenya", es: "Kenia" } },
    { lon: 34.9, lat: -6.4, type: "remote", name: { en: "Tanzania", fr: "Tanzanie", es: "Tanzania" } },
    { lon: 30.0, lat: -2.0, type: "remote", name: { en: "Rwanda", fr: "Rwanda", es: "Ruanda" } },
    { lon: 47.5, lat: 15.5, type: "remote", name: { en: "Yemen", fr: "Yémen", es: "Yemen" } },
    { lon: -75.0, lat: -9.2, type: "remote", name: { en: "Peru", fr: "Pérou", es: "Perú" } },
    { lon: -15.3, lat: 13.45, type: "remote", name: { en: "The Gambia", fr: "Gambie", es: "Gambia" } },
    { lon: 18.7, lat: 15.4, type: "remote", name: { en: "Chad", fr: "Tchad", es: "Chad" } },
    { lon: 35.8, lat: 33.9, type: "remote", name: { en: "Lebanon", fr: "Liban", es: "Líbano" } },
    { lon: -66.6, lat: 6.4, type: "remote", name: { en: "Venezuela", fr: "Venezuela", es: "Venezuela" } },
  ];

  /* Precompute marker trig */
  COUNTRIES.forEach(function (c) {
    c.sinLat = Math.sin(c.lat * RAD);
    c.cosLat = Math.cos(c.lat * RAD);
  });

  /* Palette (must match site.css) */
  var SPHERE_FILL = "#1f2c38";
  var SPHERE_EDGE = "rgba(245, 240, 232, 0.18)";
  var DOT_COLOR = "245, 240, 232";
  var ACC_BRIGHT = "#c96a3c";
  var HALO_RGB = "201, 106, 60";

  /* ---------------- Country list ---------------- */

  function currentLang() {
    var l = document.documentElement.lang || "en";
    return ["en", "fr", "es"].indexOf(l) >= 0 ? l : "en";
  }

  function renderList() {
    var lang = currentLang();
    listEl.innerHTML = "";
    COUNTRIES.forEach(function (c, i) {
      var li = document.createElement("li");
      li.className = "fp-item";
      li.setAttribute("data-idx", String(i));
      var dot = document.createElement("span");
      dot.className = "fp-dot " + (c.type === "field" ? "fp-dot-field" : "fp-dot-remote");
      dot.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.textContent = c.name[lang];
      li.appendChild(dot);
      li.appendChild(label);
      listEl.appendChild(li);
    });
    activeIdx = -1;
  }

  renderList();
  document.addEventListener("jc:lang", renderList);

  var activeIdx = -1;
  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    var items = listEl.children;
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("active", i === idx);
    }
  }

  /* ---------------- Land dot matrix ----------------
     Decode land topojson, then sample a lat/lon grid and keep
     points that fall on land (even-odd ray casting, with ring
     bounding-box prefilter). Built asynchronously in row chunks. */

  var landDots = []; /* {sinLat, cosLat, lonRad} */

  function buildLandDots(geojson) {
    var rings = [];
    function collect(poly) {
      poly.forEach(function (ring) {
        var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (var i = 0; i < ring.length; i++) {
          var x = ring[i][0], y = ring[i][1];
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        rings.push({ pts: ring, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
      });
    }
    var geoms = geojson.type === "FeatureCollection"
      ? geojson.features.map(function (f) { return f.geometry; })
      : [geojson.geometry || geojson];
    geoms.forEach(function (g) {
      if (!g) return;
      if (g.type === "Polygon") collect(g.coordinates);
      else if (g.type === "MultiPolygon") g.coordinates.forEach(collect);
    });

    function onLand(lon, lat) {
      var inside = false;
      for (var r = 0; r < rings.length; r++) {
        var ring = rings[r];
        if (lon < ring.minX || lon > ring.maxX || lat < ring.minY || lat > ring.maxY) continue;
        var pts = ring.pts;
        for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
          var yi = pts[i][1], yj = pts[j][1];
          if (yi > lat !== yj > lat) {
            var xi = pts[i][0], xj = pts[j][0];
            if (lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
          }
        }
      }
      return inside;
    }

    var STEP = 2.2;
    var lat = -58;
    function chunk() {
      var end = Math.min(lat + 14, 84);
      for (; lat < end; lat += STEP) {
        var lonStep = STEP / Math.max(0.25, Math.cos(lat * RAD));
        for (var lon = -180; lon < 180; lon += lonStep) {
          if (onLand(lon, lat)) {
            landDots.push({
              sinLat: Math.sin(lat * RAD),
              cosLat: Math.cos(lat * RAD),
              lonRad: lon * RAD,
            });
          }
        }
      }
      if (lat < 84) setTimeout(chunk, 0);
      else drawNow();
    }
    chunk();
  }

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
    .then(function (r) { return r.json(); })
    .then(function (topo) {
      if (window.topojson) buildLandDots(topojson.feature(topo, topo.objects.land));
    })
    .catch(function () { /* globe still renders sphere + markers */ });

  /* ---------------- Projection ---------------- */

  var ctx = canvas.getContext("2d");
  var size = 0;
  var dpr = 1;
  var R = 0; /* sphere radius in px */
  var CX = 0, CY = 0;

  function resize() {
    var rect = wrap.getBoundingClientRect();
    size = Math.min(rect.width, 620);
    if (size <= 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    R = size / 2 - 10;
    CX = size / 2;
    CY = size / 2;
    drawNow();
  }

  /* Rotation: starts over Africa/Europe where most points live */
  var lambda = -20; /* center longitude = -lambda… we advance lambda over time */
  var tilt = 12; /* center latitude */
  var dragging = false;
  var lastPointer = null;
  var lastTime = null;
  var SPEED = 0.005; /* deg per ms ≈ 5°/s */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  canvas.addEventListener("pointerdown", function (e) {
    dragging = true;
    lastPointer = [e.clientX, e.clientY];
    canvas.classList.add("dragging");
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!dragging || !lastPointer) return;
    var dx = e.clientX - lastPointer[0];
    var dy = e.clientY - lastPointer[1];
    lastPointer = [e.clientX, e.clientY];
    lambda -= dx * 0.35;
    tilt = Math.max(-55, Math.min(55, tilt + dy * 0.35));
    if (reduceMotion || !running) drawNow();
  });
  function endDrag() {
    dragging = false;
    lastPointer = null;
    canvas.classList.remove("dragging");
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  /* ---------------- Render ---------------- */

  function draw(t) {
    if (!size) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    var lonC = -lambda * RAD; /* center longitude (rad) */
    var sinT = Math.sin(tilt * RAD);
    var cosT = Math.cos(tilt * RAD);

    /* Sphere with a soft top-left sheen for depth */
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, 2 * Math.PI);
    var grad = ctx.createRadialGradient(
      CX - R * 0.35, CY - R * 0.4, R * 0.1,
      CX, CY, R
    );
    grad.addColorStop(0, "#26343f");
    grad.addColorStop(1, SPHERE_FILL);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = SPHERE_EDGE;
    ctx.lineWidth = 1;
    ctx.stroke();

    /* Land dot matrix */
    var i, d, dLon, cosc, x, y;
    for (i = 0; i < landDots.length; i++) {
      d = landDots[i];
      dLon = d.lonRad - lonC;
      cosc = sinT * d.sinLat + cosT * d.cosLat * Math.cos(dLon);
      if (cosc <= 0) continue;
      x = CX + R * d.cosLat * Math.sin(dLon);
      y = CY - R * (cosT * d.sinLat - sinT * d.cosLat * Math.cos(dLon));
      ctx.fillStyle = "rgba(" + DOT_COLOR + "," + (0.1 + 0.32 * cosc).toFixed(3) + ")";
      ctx.fillRect(x - 1.1, y - 1.1, 2.2, 2.2);
    }

    /* Country markers */
    var bestIdx = -1;
    var bestCosc = -1;
    for (i = 0; i < COUNTRIES.length; i++) {
      var c = COUNTRIES[i];
      dLon = c.lon * RAD - lonC;
      cosc = sinT * c.sinLat + cosT * c.cosLat * Math.cos(dLon);
      if (cosc <= 0) continue;
      x = CX + R * c.cosLat * Math.sin(dLon);
      y = CY - R * (cosT * c.sinLat - sinT * c.cosLat * Math.cos(dLon));

      var alpha = 0.35 + 0.65 * cosc; /* fade toward the limb */

      /* Pulsing halo, staggered per country */
      var pulse = ((t || 0) / 1800 + i * 0.37) % 1;
      ctx.beginPath();
      ctx.arc(x, y, 5 + pulse * 14, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(" + HALO_RGB + "," + ((1 - pulse) * 0.5 * alpha).toFixed(3) + ")";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      /* Core dot */
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.globalAlpha = alpha;
      if (c.type === "field") {
        ctx.fillStyle = ACC_BRIGHT;
        ctx.fill();
      } else {
        ctx.fillStyle = SPHERE_FILL;
        ctx.fill();
        ctx.strokeStyle = ACC_BRIGHT;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (cosc > bestCosc) {
        bestCosc = cosc;
        bestIdx = i;
      }
    }

    setActive(bestIdx);
  }

  function drawNow() {
    draw(performance.now());
  }

  /* ---------------- Animation loop ---------------- */

  var running = false;
  var rafId = null;

  function loop(t) {
    if (!running) return;
    if (lastTime != null && !dragging && !reduceMotion) {
      lambda += (t - lastTime) * SPEED;
    }
    lastTime = t;
    draw(t);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = null;
    rafId = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  /* Animate only while the section is on screen */
  new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) start();
        else stop();
      });
    },
    { threshold: 0.05 }
  ).observe(wrap);

  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(wrap);
  } else {
    window.addEventListener("resize", resize);
  }
  resize();

  /* Debug/test hook */
  window.JCGlobe = {
    redraw: drawNow,
    dots: function () { return landDots.length; },
  };
})();
