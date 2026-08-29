// NIAKX LaunchKit — interactions (vanilla JS, no dependencies)
(function () {
  "use strict";

  // Sticky nav shadow
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal
  var items = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Preview chart bars
  [].slice.call(document.querySelectorAll(".chart i")).forEach(function (bar, i) {
    var h = [38, 54, 46, 70, 62, 84, 96][i % 7];
    bar.style.height = h + "%";
    bar.style.animationDelay = i * 70 + "ms";
  });

  // FAQ accordion
  [].slice.call(document.querySelectorAll(".q")).forEach(function (q) {
    var btn = q.querySelector("button");
    var panel = q.querySelector(".a");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      var open = q.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });
})();
