// Set image to cover
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }
  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;
  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,
    nh = ih * r,
    cx,
    cy,
    cw,
    ch,
    ar = 1;
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;
  cw = iw / (nw / w);
  ch = ih / (nh / h);
  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

// Apply interaction to all elements with this class
$(".cc-zigzag").each(function (index) {
  const canvas = $(this).find("canvas")[0];
  const embed = $(this).find(".embed")[0];
  const context = canvas.getContext("2d");
  function setCanvasSize() {
    canvas.width = embed.offsetWidth;
    canvas.height = embed.offsetHeight;
  }
  setCanvasSize();
  const frameCount = $(this).attr("total-frames");
  const urlStart = $(this).attr("url-start");
  const urlEnd = $(this).attr("url-end");
  const floatingZeros = $(this).attr("floating-zeros");
  const currentFrame = (index) =>
    `${urlStart}${(index + 1)
      .toString()
      .padStart(floatingZeros, "0")}${urlEnd}`;
  const images = [];
  const imageFrames = {
    frame: 0,
  };
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    console.log(currentFrame(i));
    img.src = currentFrame(i);
    images.push(img);
  }
  gsap.to(imageFrames, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: $(this),
      start: $(this).attr("scroll-start"),
      end: $(this).attr("scroll-end"),
      scrub: 0,
    },
    onUpdate: render,
  });
  images[0].onload = render;
  function render() {
    context.clearRect(0, 0, embed.offsetWidth, embed.offsetHeight);
    drawImageProp(
      context,
      images[imageFrames.frame],
      0,
      0,
      embed.offsetWidth,
      embed.offsetHeight,
      0.5,
      0.5
    );
  }

  // Update canvas size & animation state
  let iOS = !!navigator.platform.match(/iPhone|iPod|iPad/);
  let resizeTimer;
  $(window).on("resize", function (e) {
    if (iOS) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        setCanvasSize();
        render();
      }, 250);
    } else {
      setCanvasSize();
      render();
    }
  });
});

// Split Lines
/*
$(document).ready(function () {
  clippingText = {
    mask: function (element) {
      console.log(element);
      element.splitLines({ tag: "<span class='words'>" });

      const lines = gsap.utils.toArray(element.children(".words"));
      let width = window.innerWidth;
      let speed = 350; //pixels per second
      let endX = width;
      let duration = endX / speed;

      console.log(endX);
      console.log(duration);
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 60%",
          end: "bottom 60%",
          markers: false,
          scrub: 0.3,
        },
      });

      console.log(lines);
      //bus.to(lines, {duration:duration, color:'green', xPercent: 0, ease:'none'})

      lines.forEach((line) => {
        timeline.to(line, {
          duration: duration,
          color: "white",
          xPercent: 0,
          ease: "ease",
        });
      });
    },
  };

  $(".js-clipping-text").each(function (index) {
    clippingText.mask($(this));
  });

  
  const amountText = $("[class*='js-clipping-text']").length;
  for(i = 1; i <= amountText; i++)
  {
      clippingText.mask($("[class*='js-clipping-text']"));
  }
*/
