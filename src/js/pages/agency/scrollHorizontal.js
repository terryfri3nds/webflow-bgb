$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  let horizontalItem = $(".team-item");
  let horizontalSection = $(".team-section");
  let moveDistance;

  function calculateScroll() {
    // Desktop
    let itemsInView = 4;
    let scrollSpeed = 0.5;

    if (window.matchMedia("(max-width: 1600px)").matches) {
      // Desktop
      console.log("pasee");
      itemsInView = 3;
      scrollSpeed = 0.1;
    } else if (window.matchMedia("(max-width: 479px)").matches) {
      // Mobile Portrait
      itemsInView = 1;
      scrollSpeed = 0.5;
    } else if (window.matchMedia("(max-width: 767px)").matches) {
      // Mobile Landscape
      itemsInView = 1;
      scrollSpeed = 0.5;
    } else if (window.matchMedia("(max-width: 991px)").matches) {
      // Tablet
      itemsInView = 2;
      scrollSpeed = 0.5;
    }
    let moveAmount = horizontalItem.length - itemsInView;
    let minHeight =
      scrollSpeed * horizontalItem.outerWidth() * horizontalItem.length;

    if (moveAmount <= 0) {
      moveAmount = 0;
      minHeight = 0;
      // horizontalSection.css('height', '100vh');
    } else {
      horizontalSection.css("height", "200vh");
    }
    moveDistance = horizontalItem.outerWidth() * moveAmount;
    horizontalSection.css("min-height", minHeight + "px");
  }
  calculateScroll();
  window.onresize = function () {
    calculateScroll();
  };

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".team-trigger",
      // trigger element - viewport
      start: "top top",
      end: "bottom top",
      invalidateOnRefresh: true,
      scrub: 1,
    },
  });
  tl.to(".team-section .team-list", {
    x: () => -moveDistance,
    duration: 1,
  });
});
