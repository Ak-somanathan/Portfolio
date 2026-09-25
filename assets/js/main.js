// =========================================================
// Akshaya V. — Portfolio Interactions
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------------------
  // Theme Toggle
  // -------------------------------------------------------

  var themeBtn = document.querySelector(".theme-toggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {

      var root = document.documentElement;

      var current =
        root.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";

      var next =
        current === "dark"
          ? "light"
          : "dark";

      root.setAttribute("data-theme", next);

      try {
        localStorage.setItem("akv-theme", next);
      } catch (e) {}

    });
  }


  // -------------------------------------------------------
  // Scroll Progress Bar
  // -------------------------------------------------------

  var progress = document.querySelector(".scroll-progress");

  function updateProgress() {

    var h = document.documentElement;

    var scrolled =
      h.scrollTop || document.body.scrollTop;

    var height =
      (h.scrollHeight - h.clientHeight) || 1;

    if (progress) {

      progress.style.width =
        Math.min(
          100,
          (scrolled / height) * 100
        ) + "%";

    }
  }


  // -------------------------------------------------------
  // Mobile Navigation
  // -------------------------------------------------------

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");

  if (toggle && menu) {

    toggle.addEventListener("click", function () {

      var isOpen =
        menu.classList.toggle("open");

      toggle.classList.toggle(
        "open",
        isOpen
      );

      toggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    menu.querySelectorAll("a").forEach(function (a) {

      a.addEventListener("click", function () {

        menu.classList.remove("open");

        toggle.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // -------------------------------------------------------
  // Sticky Navbar + Scroll Progress
  // -------------------------------------------------------

  var navbar =
    document.getElementById("navbar");

  function onScroll() {

    if (navbar) {

      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 8
      );

    }

    updateProgress();

  }

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  onScroll();


  // -------------------------------------------------------
  // Reveal on Scroll
  // -------------------------------------------------------

  var containers = new Map();

  document
    .querySelectorAll(".reveal")
    .forEach(function (el) {

      var parent = el.parentElement;

      if (!containers.has(parent)) {
        containers.set(parent, 0);
      }

      var idx =
        containers.get(parent);

      el.style.transitionDelay =
        Math.min(idx * 70, 280) + "ms";

      containers.set(
        parent,
        idx + 1
      );

    });


  var revealEls =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealEls.length
  ) {

    var io =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("in");

              io.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealEls.forEach(function (el) {
      io.observe(el);
    });


  } else {

    revealEls.forEach(function (el) {
      el.classList.add("in");
    });

  }


  // -------------------------------------------------------
  // Active Navigation Link
  // -------------------------------------------------------

  var sections =
    document.querySelectorAll(
      "main section[id]"
    );

  var navLinks =
    document.querySelectorAll(
      ".nav-links a, .mobile-menu a"
    );


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    var navIo =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              var id =
                entry.target.getAttribute("id");

              navLinks.forEach(function (link) {

                link.classList.toggle(
                  "active",
                  link.getAttribute("href") ===
                    "#" + id
                );

              });

            }

          });

        },
        {
          rootMargin:
            "-45% 0px -50% 0px"
        }
      );


    sections.forEach(function (section) {
      navIo.observe(section);
    });

  }


  // -------------------------------------------------------
  // Footer Year
  // -------------------------------------------------------

  var yearEl =
    document.querySelector("[data-year]");

  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }


  // =======================================================
  // PROJECT IMAGE LIGHTBOX
  // =======================================================

  var lightbox =
    document.getElementById("imageLightbox");

  var lightboxImage =
    document.getElementById("lightboxImage");

  var closeButton =
    document.getElementById("lightboxClose");


  // If this page doesn't contain a lightbox,
  // simply skip the lightbox functionality.

  if (
    !lightbox ||
    !lightboxImage ||
    !closeButton
  ) {
    return;
  }


  var galleryImages =
    document.querySelectorAll(
      ".proj-gallery .gallery-frame img"
    );


  // -------------------------------------------------------
  // Open Image
  // -------------------------------------------------------

  galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

      lightboxImage.src =
        image.currentSrc || image.src;

      lightboxImage.alt =
        image.alt || "";


      lightbox.classList.add("active");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "lightbox-open"
      );

    });

  });


  // -------------------------------------------------------
  // Close Lightbox
  // -------------------------------------------------------

  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "lightbox-open"
    );


    // Clear image after fade-out animation

    setTimeout(function () {

      if (
        !lightbox.classList.contains("active")
      ) {

        lightboxImage.src = "";

        lightboxImage.alt = "";

      }

    }, 250);

  }


  // -------------------------------------------------------
  // Close using X button
  // -------------------------------------------------------

  closeButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      closeLightbox();

    }
  );


  // -------------------------------------------------------
  // Close by clicking outside image
  // -------------------------------------------------------

  lightbox.addEventListener(
    "click",
    function (event) {

      if (
        event.target === lightbox ||
        event.target === lightboxImage
      ) {

        closeLightbox();

      }

    }
  );


  // -------------------------------------------------------
  // Close using Escape key
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
      ) {

        closeLightbox();

      }

    }
  );

});

const resumeButton = document.getElementById("resume-download");

if (resumeButton) {
  resumeButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const resumeUrl = "./assets/resume/Akshaya_Resume_Software_Developer.pdf";

    console.log("Trying to download from:", resumeUrl);
    console.log("Current website URL:", window.location.href);

    try {
      const response = await fetch(resumeUrl);

      console.log("Response status:", response.status);
      console.log("Response URL:", response.url);

      if (!response.ok) {
        throw new Error(`PDF request failed: ${response.status} ${response.statusText}`);
      }

      const resumeBlob = await response.blob();
      const temporaryUrl = URL.createObjectURL(resumeBlob);

      const temporaryLink = document.createElement("a");
      temporaryLink.href = temporaryUrl;
      temporaryLink.download = "Akshaya_Resume_Software_Developer.pdf";

      document.body.appendChild(temporaryLink);
      temporaryLink.click();
      temporaryLink.remove();

      setTimeout(() => URL.revokeObjectURL(temporaryUrl), 100);
    } catch (error) {
      console.error("FULL RESUME DOWNLOAD ERROR:", error);
      alert(`Resume download error: ${error.message}`);
    }
  });
}
