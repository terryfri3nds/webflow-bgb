$(document).ready(function () {
  function displayRandomImage() {
    var num = Math.floor(Math.random() * 3) + 1;
    $(".splide__slide:nth-of-type(" + num + ")").addClass("show");
  }

  displayRandomImage();

  /*
function slider1() {
    let splides = $(".slider1");
    for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
      new Splide(splides[i], {
        // Desktop on down
        perPage: 1,
      //  perMove: 1,
        focus: 0, // 0 = left and 'center' = center
        type: "loop", // 'loop' or 'slide'
        gap: "2.78em", // space between slides
        autoplay: true,
        interval: 3000,
        arrows: false, // 'slider' or false
        pagination: false, // 'slider' or false
        speed: 600, // transition speed in miliseconds
      //  dragAngleThreshold: 30, // default is 30
        autoWidth: false, // for cards with differing widths
        rewind: true, // go back to beginning when reach end
        rewindSpeed: 400,
        waitForTransition: false,
        updateOnMove: true,
        trimSpace: false, // true removes empty space from end of list
        breakpoints: {
          991: {
            // Tablet
            perPage: 2,
            gap: "1.39em"
          },
          767: {
            // Mobile Landscape
            perPage: 2,
            gap: "1.39em"
          },
          479: {
            // Mobile Portrait
            perPage: 1,
            gap: "1.39em"
          }
        }
      }).mount();
    }
  }

  slider1();
  */
});
