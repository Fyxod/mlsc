var p = document.querySelector("#projectinfo p");
var btn1 = document.getElementById("firstbutton");
var btn2 = document.getElementById("secondbutton");
var btn3 = document.getElementById("thirdbutton");
var i = document.getElementById("projectimg");
document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home-link");
  const eventsLink = document.getElementById("events-link");
  const teamLink = document.getElementById("team-link");
  const formLink = document.getElementById("form-link");
  const homeSection = document.getElementById("home");
  const eventsSection = document.getElementById("events");
  const teamSection = document.getElementById("main");
  const formSection = document.getElementById("white");

  eventsLink.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));
    eventsLink.classList.add("active");
    eventsSection.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;
    const eventsTop = eventsSection.offsetTop;
    const homeTop = homeSection.offsetTop;
    const buffer = 200;

    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));

    if (currentScroll >= eventsTop - buffer) {
      eventsLink.classList.add("active");
    } else {
      homeLink.classList.add("active");
    }
  });
  teamLink.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));
    eventsLink.classList.add("active");
    teamSection.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;
    const teamTop = teamLink.offsetTop;
    const homeTop = homeSection.offsetTop;
    const buffer = 200;

    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));

    if (currentScroll >= teamTop - buffer) {
      eventsLink.classList.add("active");
    } else {
      homeLink.classList.add("active");
    }
  });
  formLink.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));
    formLink.classList.add("active");
    formSection.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;
    const teamTop = formLink.offsetTop;
    const homeTop = homeSection.offsetTop;
    const buffer = 200;

    document
      .querySelectorAll(".navbar-menu a")
      .forEach((link) => link.classList.remove("active"));

    if (currentScroll >= teamTop - buffer) {
      formLink.classList.add("active");
    } else {
      homeLink.classList.add("active");
    }
  });
});

function swapFirst() {
  if (!i.style.backgroundImage.includes("https://res.cloudinary.com/dvhwz7ptr/image/upload/f_auto,q_auto/jklg3dpf6y8otrqygk2h")) {
    p.textContent =
      "Delta, a three-day flagship event, featured a Cryptic Hunt on day 1, a Treasure Hunt on day 2, and a Gaming Night on day 3, offering participants a blend of challenging puzzles, adventurous quests, and competitive gaming.";
    i.style.opacity = 0;
    p.style.opacity = 0;
    btn1.style.color = "white";
    btn1.style.borderLeftColor = "rgb(31, 146, 146)";
    btn1.style.borderLeftWidth = "4px";
    btn1.style.marginLeft = "0";
    btn1.style.marginRight = "0";
    btn2.style.color = "rgba(92, 92, 92, 0.736)";
    btn2.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn2.style.borderLeftWidth = "3px";
    btn2.style.marginLeft = "0.1vw";
    btn2.style.marginRight = "0.1vw";
    btn3.style.color = "rgba(92, 92, 92, 0.736)";
    btn3.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn3.style.borderLeftWidth = "3px";
    btn3.style.marginLeft = "0.1vw";
    btn3.style.marginRight = "0.1vw";
    setTimeout(function () {
      i.style.backgroundImage = "url('https://res.cloudinary.com/dvhwz7ptr/image/upload/f_auto,q_auto/jklg3dpf6y8otrqygk2h')";
      i.style.opacity = 1;
      p.style.opacity = 1;
    }, 300);
  }
}

function swapSecond() {
  if (!i.style.backgroundImage.includes("https://res.cloudinary.com/dvhwz7ptr/image/upload/f_auto,q_auto/wahswfysi62covjwfzcd")) {
    p.textContent =
      "Astellar featured a 24-hour Cryptic Hunt followed by a Gaming Night, offering participants the chance to win prizes worth ₹12,000. It combined intellectual challenge with competitive gaming for an engaging and rewarding experience.";
    i.style.opacity = 0;
    p.style.opacity = 0;
    btn1.style.color = "rgba(92, 92, 92, 0.736)";
    btn1.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn1.style.borderLeftWidth = "3px";
    btn1.style.marginLeft = "0.1vw";
    btn1.style.marginRight = "0.1vw";
    btn2.style.color = "white";
    btn2.style.borderLeftColor = "rgb(31, 146, 146)";
    btn2.style.borderLeftWidth = "4px";
    btn2.style.marginLeft = "0";
    btn2.style.marginRight = "0";
    btn3.style.color = "rgba(92, 92, 92, 0.736)";
    btn3.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn3.style.borderLeftWidth = "3px";
    btn3.style.marginLeft = "0.1vw";
    btn3.style.marginRight = "0.1vw";
    setTimeout(function () {
      i.style.backgroundImage = "url('https://res.cloudinary.com/dvhwz7ptr/image/upload/f_auto,q_auto/wahswfysi62covjwfzcd')";
      i.style.opacity = 1;
      p.style.opacity = 1;
    }, 300);
  }
}

function swapThird() {
  if (!i.style.backgroundImage.includes("../assets/images/astellar.webp")) {
    p.textContent =
      "Hallo, es ist sehr schwierig, das Fett loszuwerden. Macht es große Freude daran? Zu diesem Zeitpunkt wird jemand darunter leiden oder ihn sogar hassen, denn wenn wir dazu geboren werden, zu wählen, werden wir Probleme haben!";
    i.style.opacity = 0;
    p.style.opacity = 0;
    btn1.style.color = "rgba(92, 92, 92, 0.736)";
    btn1.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn1.style.borderLeftWidth = "3px";
    btn1.style.marginLeft = "0.1vw";
    btn1.style.marginRight = "0.1vw";
    btn2.style.color = "rgba(92, 92, 92, 0.736)";
    btn2.style.borderLeftColor = "rgba(92, 92, 92, 0.736)";
    btn2.style.borderLeftWidth = "3px";
    btn2.style.marginLeft = "0.1vw";
    btn2.style.marginRight = "0.1vw";
    btn3.style.color = "white";
    btn3.style.borderLeftColor = "rgb(31, 146, 146)";
    btn3.style.borderLeftWidth = "4px";
    btn3.style.marginLeft = "0";
    btn3.style.marginRight = "0";
    setTimeout(function () {
      i.style.backgroundImage = "url('../assets/images/astellar.webp')";
      i.style.opacity = 1;
      p.style.opacity = 1;
    }, 300);
  }
}
