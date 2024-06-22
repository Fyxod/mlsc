var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".part-2",
    start: "0% 70%",
    end: "50% 50%",
    scrub: true,
  },
});

tl2.to(".rounded-div-wrapper", {
  height: 0,
  marginTop: 0,
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".content-2",
    start: "20% 50%",
    end: "100% 50%",
    scrub: 1,
  },
});
tl3.to(".content-2 .text-area-hover h1", {
  width: "100%",
});
tl3.to(".content-2 .text-area-hover h2", {
  delay: -0.4,
  width: "100%",
});
