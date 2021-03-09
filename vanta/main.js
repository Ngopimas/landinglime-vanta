if (document) {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
  const contact = document.querySelector(".contact-link");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
  });

  contact.addEventListener("click", () => {
    navLinks.classList.remove("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
  });
}

if (VANTA) {
  VANTA.GLOBE({
    el: ".globe-canvas",
    mouseControls: false,
    // touchControls: true,
    // gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    color: 0x219653,
    color2: 0xb3e189,
    backgroundColor: 0xf3f4f6,
  });
}
