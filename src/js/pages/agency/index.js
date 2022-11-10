$(document).ready(function () {
  /* SECTION SCROLLBAR */

  function changePopUp(trigger) {
    $(".item-popup").removeClass("active");

    let myIndex = trigger.index();
    $(".item-popup").eq(myIndex).addClass("active");
    $(".popup-wrapper").css("display", "block");

    $(".item-popup").eq(myIndex).find("video").trigger("play");
    // $(".grid-image").eq(myIndex).addClass("current");
  }

  // Page Load
  $(".grid-card").eq(0).addClass("current");
  //$('.grid2-item').eq(0).addClass('current');
  $(".grid-image").eq(0).addClass("current");

  function changeFocus(trigger) {
    $(".current").removeClass("current");
    trigger.addClass("current");
    let myIndex = trigger.closest(".grid1-item").index();
    $(".grid2-item").eq(myIndex).addClass("current");
    $(".grid-image").eq(myIndex).addClass("current");
  }

  $(".grid-card").on("mouseenter", function () {
    changeFocus($(this));
  });

  $(".scroll-trigger").on("inview", function (event, isInView) {
    if (isInView) {
      let myTrigger = $(this).closest(".grid-card");
      changeFocus(myTrigger);
    } else {
      // do something else
    }
  });

  // = custom scrollbar ============
  const scrollBar = document.querySelector(".barcontainer");
  const handler = document.querySelector(".bar");
  const scroller = document.querySelector("#scroller");
  let trigger, draggable;

  // this ScrollTrigger will use onUpdate whenever any scroll happens to move the handler to the corresponding ratio according to the scroll position of the scroller
  // and calling an onRefresh when the page resizes to record the maximum scroll value for the scroller and the scrollBar size
  // when dragging, the scroller will be scrolled to the corresponding ratio

  trigger = ScrollTrigger.create({
    scroller: scroller,
    start: 0,
    end: "max",
    onRefresh: onResize,
    onUpdate: updateHandler,
  });

  draggable = Draggable.create(handler, {
    type: "y",
    bounds: ".bar",
    onDrag: function () {
      trigger.scroll((this.y / barLength) * maxScroll);
      console.log(barLength);
    },
  })[0];

  function onResize() {
    if (trigger) {
      maxScroll = ScrollTrigger.maxScroll(scroller);
      barLength = scrollBar.offsetHeight - handler.offsetHeight;
      updateHandler();
    }
  }

  function updateHandler() {
    gsap.set(handler, { y: (barLength * trigger.scroll()) / maxScroll });
  }
  /* END SCROLLBAR */

  /* POPUP VIDEO */

  // Adds overflow hidden to the body prevent page scrolling when popup is open
  $(".popup-toggle").on("click", function () {
    $("body").addClass("overflow-hidden");

    changePopUp($(this));
  });

  // Removes overflow hidden from body if popup is closed
  $(".popup-close, .popup-background").on("click", function () {
    $("body").removeClass("overflow-hidden");
  });

  $(".grid1-item").on("click", function () {
    $(".popup-toggle").eq($(this).index()).trigger("click");
  });

  // Stops YouTube / Vimeo Video from playing if Popup is closed
  /*$(function () {
    $(
      ".popup-video-group .popup-close, .popup-video-group .popup-background"
    ).click(function () {
      setTimeout(function () {
        $(".popup-video-group iframe").attr(
          "src",
          $(".popup-video-group iframe").attr("src")
        );
      }, 400);
    });
  });*/

  /* END POPUP VIDEO */
});
