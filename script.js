/**
 * Sochetra Oeun - Portfolio
 * Interactive behaviors and animations
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSmoothScroll();
  initSkillBars();
  initScrollAnimations();
  initNavbarScroll();
  initProjectToggles();
  initThemeSwitcher();
});

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Animate skill bars when they come into view
 */
function initSkillBars() {
  const skillFills = document.querySelectorAll(".skill-fill");
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute("data-level") || 0;
        entry.target.style.width = `${level}%`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillFills.forEach((fill) => observer.observe(fill));
}

/**
 * Fade-in animations on scroll
 */
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(
    ".timeline-item, .skill-card, .course-card, .edu-item, .about-content, .project-card",
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

/**
 * Project card details toggle
 */
function initProjectToggles() {
  document.querySelectorAll(".project-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const details = document.getElementById(targetId);
      if (!details) return;

      const isOpen = details.classList.contains("is-open");
      details.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", !isOpen);
      btn.textContent = !isOpen ? "Hide details" : "View details";
    });
  });
}

/**
 * Theme switcher (Light / Dark / Night Light)
 */
function initThemeSwitcher() {
  const html = document.documentElement;
  const themeBtns = document.querySelectorAll(".theme-btn");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    themeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-theme") === theme);
    });
    // Update navbar immediately when theme changes
    window.dispatchEvent(new Event("scroll"));
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.getAttribute("data-theme"));
    });
  });

  // Set initial active state
  const currentTheme = html.getAttribute("data-theme") || "dark";
  themeBtns.forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.getAttribute("data-theme") === currentTheme,
    );
  });
}

/**
 * Navbar background on scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const handleScroll = () => {
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    const navBg = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-bg-scrolled")
      .trim();
    const navBgDefault = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-bg")
      .trim();
    navbar.style.background = window.scrollY > 50 ? navBg : navBgDefault;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check
}
