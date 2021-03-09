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

if (AOS) {
  AOS.init({});
}
