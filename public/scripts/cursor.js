var circle = document.querySelector("#circle");

var box1 = document.querySelector(".swiper");
var box3 = document.querySelector("#aboutprojects");
var box4 = document.querySelector("#white");

document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

document.addEventListener("keydown", (event) => {
  if (
    
    (event.ctrlKey &&
      (event.key === "U" || event.key === "Shift" || event.key === "I"))
  ) {
    event.preventDefault();
  }
});

document.body.addEventListener("mousemove", function (dets) {
  gsap.to(circle, {
    x: dets.clientX,
    y: dets.clientY,
    duration: 0.6,
  });
});

if (box1) {
  box1.addEventListener("mouseenter", function () {
    circle.innerHTML = `<img src="../assets/images/horizontal.png" alt="" width="13px">`;
    gsap.to(circle, {
      duration: 0.6,
      scale: 2.5,
      color: "#0e0e0e",
      opacity: 1,
      backgroundColor: "#0077ff",
    });
  });

  box1.addEventListener("mouseleave", function () {
    circle.innerHTML = "";
    gsap.to(circle, {
      duration: 0.6,
      scale: 1,
      backgroundColor: "",
      opacity: 1,
    });
  });
}

if (box3) {
  box3.addEventListener("mouseenter", function () {
    gsap.to(circle, {
      duration: 0.6,
      scale: 1.5,
      color: "#0e0e0e",
      opacity: 0.6,
      backgroundColor: "#ffffff",
    });
  });

  box3.addEventListener("mouseleave", function () {
    circle.innerHTML = "";
    gsap.to(circle, {
      duration: 0.6,
      scale: 1,
      backgroundColor: "",
      opacity: 1,
    });
  });
}
if (box4) {
  box4.addEventListener("mouseenter", function () {
    gsap.to(circle, {
      duration: 0.6,
      scale: 1,
      color: "#0e0e0e",
      opacity: 1,
      backgroundColor: "#0e0e0e",
    });
  });

  box4.addEventListener("mouseleave", function () {
    circle.innerHTML = "";
    gsap.to(circle, {
      duration: 0.6,
      scale: 1,
      backgroundColor: "",
      opacity: 1,
    });
  });
}
