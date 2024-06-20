var main = document.querySelector("#main");

var circle = document.querySelector("#circle");

var box1 = document.querySelector("#box1");

var box2 = document.querySelector("#box2");

document.body.addEventListener("mousemove",function(dets){
    gsap.to(circle,{
        x : dets.x,
        y : dets.y,
        duration : 0.6,
  })

})


box1.addEventListener("mouseenter",function(){
    circle.innerHTML="MLSC-DB";
    gsap.to(circle,{
        
        duration:0.6,
        scale : 2.5,
        obacity: 0.7,
        backgroundcolor: "rgba(255, 255, 255, 0.977)",
        
    })
})
   
box1.addEventListener("mouseleave",function(){
    circle.innerHTML="";
    gsap.to(circle,{
        duration:0.6,
        scale : 1,
        backgroundcolor: "",
      })
})