var circle = document.querySelector("#circle");
var box1 = document.querySelector("#page4");
document.body.addEventListener("mousemove", function (dets) {
  gsap.to(circle, {
    x: dets.clientX,
    y: dets.clientY,
    duration: 0.6,
  });
});

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