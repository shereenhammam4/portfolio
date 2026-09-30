const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

/* ===== Dark Mode ===== */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

/* ===== Mobile Menu ===== */
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuToggle.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
  });
});

/* ===== Active Navigation ===== */
window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

/* ===== Scroll Reveal Animation ===== */
const animatedElements = document.querySelectorAll(
  ".section-heading, .about-grid, .skill-card, .timeline-item, .project-card, .certificate-card, .contact-box"
);

animatedElements.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

animatedElements.forEach((element) => observer.observe(element));

/* ===== Small Button Ripple ===== */
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    const ripple = document.createElement("span");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.position = "absolute";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.25)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.55s ease-out";
    ripple.style.pointerEvents = "none";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});
