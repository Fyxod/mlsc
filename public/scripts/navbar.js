document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navPart2 = document.getElementById("nav-part2");

    hamburger.addEventListener("click", function () {
      navPart2.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  });