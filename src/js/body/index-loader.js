/* Here Start The Loader */
$(document).ready(function () {
  var hasPlayed = sessionStorage.getItem("visited");
  //console.log("hasPlayed", hasPlayed);

  if (hasPlayed == null) {
    let tl = gsap.timeline({ delay: 2.5 });

    sessionStorage.setItem("visited", true);
    //console.log("hasPlayed", hasPlayed);
    tl.to("#load-logo", {
      scale: 300,
      x: "0%",
      duration: 4,
      ease: "sine.inOut",
      force3D: false,
    })
      .to(".logo-bg", { opacity: 0, duration: 0.3 }, "-=3.8")
      .to(".fix-nav", { opacity: 1, duration: 2, ease: "ease" }, "-=3")
      .to(
        ".load-logo",
        { opacity: 0, duration: 3, ease: "slow(0.7, 0.7, false)" },
        "4.5"
      )
      .to(
        ".load-text",
        { opacity: 0, duration: 0.2, ease: "slow(2, 2, false)" },
        "8"
      )
      .to(".fixed-loader, .load-logo, .load-text", {
        display: "none",
        pointerEvents: "none",
      })
      .to("body", { overflow: "auto" });
  } else {
    let tl2 = gsap.timeline();

    tl2.to("#load-logo, load-logo", {
      scale: 300,
      x: "0%",
      duration: 2,
      ease: "sine.inOut",
      opacity: 0,
      force3D: false,
    });
    tl2
      .to(
        ".fixed-loader, .load-logo, .load-text",
        {
          duration: 1,
          ease: "ease",
          opacity: 0,
        },
        "-=1.5"
      )
      .to(".fix-nav", { opacity: 1, duration: 0.2, ease: "ease" }, "-=1")
      .to(
        ".fixed-loader, .load-logo, .load-text",
        {
          display: "none",
          pointerEvents: "none",
        },
        "-=1"
      )
      .to("body", { overflow: "auto" }, "-=1");
    //.to(".logo-bg", { opacity: 0, duration: 0.2 })
  }
  /* Scroll to top */

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  /* Video Delay */

  const startVideo = async () => {
    const video = document.querySelector("#load-video");

    try {
      await video.play();
      video.setAttribute("autoplay", true);
      console.log("video started playing successfully");
    } catch (err) {
      console.log(err, "video play error");
      // do stuff in case your video is unavailable to play/autoplay
    }
  };
  setTimeout(startVideo, 2500);

  /* clippingText */

  clippingText = {
    mask: function (element, color) {
      //console.log(element);

      element.splitLines({ tag: "<span class='words'>" });

      //element.append("<span class='words'>" + element.html() + "</span>");

      const lines = gsap.utils.toArray(element.children(".words"));
      let width = window.innerWidth;
      let speed = 350; //pixels per second
      let endX = width;
      let duration = endX / speed;

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 50%",
          end: "bottom 50%",
          markers: false,
          scrub: 1,
        },
      });

      // console.log(lines);
      //bus.to(lines, {duration:duration, color:'green', xPercent: 0, ease:'none'})

      // lines.forEach((line) => {
      timeline.to(".words", {
        duration: 1.5,
        //color: color,
        //xPercent: 0,
        ease: "none",
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 1,
      });
      //  });
    },
  };

  clippingTextLarge = {
    mask: function (element, color) {
      // console.log(element);

      element.splitLines({ tag: "<span class='words'>" });

      //element.append("<span class='words'>" + element.html() + "</span>");

      const lines = gsap.utils.toArray(element.children(".words"));
      let width = window.innerWidth;
      let speed = 350; //pixels per second
      let endX = width;
      let duration = endX / speed;

      let timelineLarge = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 85%",
          markers: false,
          scrub: 1,
        },
      });

      // console.log(lines);
      //bus.to(lines, {duration:duration, color:'green', xPercent: 0, ease:'none'})

      // lines.forEach((line) => {
      timelineLarge.to(".words", {
        duration: 1.5,
        //color: color,
        //xPercent: 0,
        ease: "none",
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 1,
      });
      //  });
    },
  };

  $(".js-clipping-text-black").each(function (index) {
    console.log($(this));
    clippingText.mask($(this), "black");
  });

  $(".js-clipping-text").each(function (index) {
    clippingText.mask($(this), "white");
  });

  $(".js-clipping-text-black-large").each(function (index) {
    console.log($(this));
    clippingTextLarge.mask($(this), "black");
  });

  $(".js-clipping-text-large").each(function (index) {
    clippingTextLarge.mask($(this), "white");
  });

  /*
  let typeSplit;
  // Split the text up
  function runSplit() {
    typeSplit = new SplitType(".split-lines", {
      types: "lines, words",
    });
    $(".line").append("<div class='line-mask'></div>");
    createAnimation();
  }
  runSplit();
  // Update on window resize
  let windowWidth = $(window).innerWidth();
  window.addEventListener("resize", function () {
    if (windowWidth !== $(window).innerWidth()) {
      windowWidth = $(window).innerWidth();
      typeSplit.revert();
      runSplit();
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  function createAnimation() {
    $(".line").each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          // trigger element - viewport
          start: "top center",
          end: "bottom center",
          // markers: true,
          scrub: 1,
        },
      });
      tl.to($(this).find(".line-mask"), {
        width: "0%",
        duration: 1,
      });
    });
  }
  */
});
