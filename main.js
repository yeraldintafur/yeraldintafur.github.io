/* Funciones de la página: idioma, menú móvil y animación de barras */
(function () {
  document.documentElement.classList.add("js");
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---- Idioma ---- */
  var nodes = document.querySelectorAll("[data-i18n]");
  var ES = {};
  nodes.forEach(function (el) { ES[el.dataset.i18n] = el.innerHTML; });
  var titles = { es: document.title, en: "Yeraldin Tafur Chacua | Business Analytics & Intelligence" };

  function setLang(lang) {
    var dict = lang === "en" ? EN : ES;
    nodes.forEach(function (el) {
      var t = dict[el.dataset.i18n];
      if (t) el.innerHTML = t;
    });
    document.documentElement.lang = lang;
    document.title = titles[lang];
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (saved === "en") setLang("en");

  document.getElementById("lang-toggle").addEventListener("click", function () {
    setLang(document.documentElement.lang === "es" ? "en" : "es");
  });

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("nav-list");
  toggle.addEventListener("click", function () {
    var open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  list.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      list.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- Barras antes/después: crecen al aparecer en pantalla ---- */
  var blocks = document.querySelectorAll(".hero-metric, .impact");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: 0.3 });
    blocks.forEach(function (b) { io.observe(b); });
  } else {
    blocks.forEach(function (b) { b.classList.add("in-view"); });
  }
})();
