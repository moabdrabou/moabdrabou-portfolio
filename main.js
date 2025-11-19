(function () {
  // Function to set the current year in the footer
  function setCurrentYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
      const currentYear = new Date().getFullYear();
      yearSpan.textContent = currentYear;
    }
  }

  // Call the function when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", setCurrentYear);

  var loader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    if (loader) {
      loader.style.display = "none";
    }
  });

  // Settings toggle
  const settingContainer = document.getElementById("setting-container");
  const visualModeToggleBtnContainer = document.getElementById(
    "visualmodetogglebuttoncontainer"
  );
  const switchForSetting = document.getElementById("switchforsetting");

  if (switchForSetting) {
    switchForSetting.addEventListener("click", () => {
      if (settingContainer) {
        settingContainer.classList.toggle("settingactivate");
      }
      if (visualModeToggleBtnContainer) {
        visualModeToggleBtnContainer.classList.toggle("visualmodeshow");
      }
    });
  }

  // Visual mode
  const switchForVisualMode = document.getElementById("switchforvisualmode");
  if (switchForVisualMode) {
    switchForVisualMode.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      var elements = document.querySelectorAll(".needtobeinvert");
      elements.forEach(function (element) {
        element.classList.toggle("invertapplied");
      });
    });
  }

  // Hamburger menu
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileToggleMenu = document.getElementById("mobiletogglemenu");
  const burgerBar1 = document.getElementById("burger-bar1");
  const burgerBar2 = document.getElementById("burger-bar2");
  const burgerBar3 = document.getElementById("burger-bar3");

  if (hamburgerButton) {
    hamburgerButton.addEventListener("click", () => {
      document.body.classList.toggle("stopscrolling");
      if (mobileToggleMenu) {
        mobileToggleMenu.classList.toggle("show-toggle-menu");
      }
      if (burgerBar1) {
        burgerBar1.classList.toggle("hamburger-animation1");
      }
      if (burgerBar2) {
        burgerBar2.classList.toggle("hamburger-animation2");
      }
      if (burgerBar3) {
        burgerBar3.classList.toggle("hamburger-animation3");
      }
    });
  }

  // Hide menu by li
  const mobileNavLi = document.querySelectorAll(
    ".mobiletogglemenu .mobile-navbar-tabs-ul li"
  );
  mobileNavLi.forEach((li) => {
    li.addEventListener("click", () => {
      document.body.classList.remove("stopscrolling");
      if (mobileToggleMenu) {
        mobileToggleMenu.classList.remove("show-toggle-menu");
      }
      if (burgerBar1) {
        burgerBar1.classList.remove("hamburger-animation1");
      }
      if (burgerBar2) {
        burgerBar2.classList.remove("hamburger-animation2");
      }
      if (burgerBar3) {
        burgerBar3.classList.remove("hamburger-animation3");
      }
    });
  });

  // Scrollspy and Back to top button
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
  const backToTopButton = document.getElementById("backtotopbutton");

  window.addEventListener("scroll", () => {
    // Scrollspy
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    mobileNavLi.forEach((li) => {
      li.classList.remove("activeThismobiletab");
      if (li.classList.contains(current)) {
        li.classList.add("activeThismobiletab");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("activeThistab");
      if (li.classList.contains(current)) {
        li.classList.add("activeThistab");
      }
    });

    // Back to top button
    if (backToTopButton) {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    }
  });

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }


  // Resume button
  const resumeBtn = document.getElementById("resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      var url = "assets/Mohammed-Abdrabou.pdf";
      window.open(url, "_blank");
    });
  }

  // Cursor
  const cursorInner = document.getElementById("cursor-inner");
  const cursorOuter = document.getElementById("cursor-outer");
  const links = document.querySelectorAll("a,label,button");

  if (cursorInner && cursorOuter) {
    document.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorInner.style.left = `${posX}px`;
      cursorInner.style.top = `${posY}px`;

      cursorOuter.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
      );

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursorInner.classList.add("hover");
          cursorOuter.classList.add("hover");
        });
        link.addEventListener("mouseleave", () => {
          cursorInner.classList.remove("hover");
          cursorOuter.classList.remove("hover");
        });
      });
    });
  }

  console.log(
    "%c Developed by Mohammed Abdrabou",
    "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;"
  );
})();
