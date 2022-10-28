$(document).ready(function () {
  /* SECTION SCROLLBAR */

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
  console.clear();

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
});
