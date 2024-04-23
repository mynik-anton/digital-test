import Swiper from "swiper";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".blog-slider__swiper", {
    direction: "horizontal",
    loop: false,

    speed: 500,
    watchOverflow: true,
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 1.4,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1.8,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2.4,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
});
