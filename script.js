const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const bookingForm = document.querySelector("#bookingForm");
const formNote = document.querySelector("#formNote");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(bookingForm);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const date = String(data.get("date") || "").trim();
    const time = String(data.get("time") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      "Hello Chirosy, I'd like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Interested in: ${interest}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time || "Any time"}`,
      `Message: ${message || "No additional message."}`
    ];

    const url =
      "https://wa.me/2347062037704?text=" +
      encodeURIComponent(lines.join("\n"));

    if (formNote) {
      formNote.textContent =
        "Opening WhatsApp with your enquiry details...";
    }

    window.open(url, "_blank", "noopener,noreferrer");
  });
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}
