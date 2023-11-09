const parallax = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0,
  yValue = 0;

let rotate = 0;
main.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  parallax.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;

    rotate = (xValue / (window.innerWidth / 2)) * 20;

    let isinletf =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (e.clientX - parseFloat(getComputedStyle(el).left)) * isinletf * 0.1;

    el.style.transform = `rotateY(${rotate}deg) translateX(calc(-50% + ${
      -xValue * speedx
    }px))   translateY(calc(-50% + ${
      yValue * speedy
    }px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
  });
});

// Gsap

let timeline = gsap.timeline();

Array.from(parallax)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
        duration: 2.5,
        ease: "power3.out",
      },
      "1"
    );
  });
timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "2"
  );

//

let button = document.querySelector("button");
let farsi = document.querySelector(".farsi");
let english = document.querySelector(".engelish");
let h1 = document.getElementById("h1-text");
button.addEventListener("click", () => {
  if (farsi.classList.contains("display")) {
    farsi.classList.remove("display");
    button.innerHTML = "english";
    h1.innerHTML = "What is a parallax effect?";
  } else {
    farsi.classList.add("display");
    button.innerHTML = "persian";
    h1.innerHTML = "افکت پارالاکس چیست؟";
    h1.style.fontFamily = "iranyekan";
  }
  if (english.classList.contains("display2")) {
    english.classList.remove("display2");
  } else {
    english.classList.add("display2");
  }
});
