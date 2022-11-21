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
$(".cc-sticky").each(function (index) {
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
/* API GreenHouse */

async function getJobBoards() {
  const response = await fetch(
    "https://boards-api.greenhouse.io/v1/boards/bgb368test/jobs?content=true"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;

    throw new Error(message);
  }

  const dataJSON = await response.json();

  return dataJSON;
}

getJobBoards()
  .then((data) => {
    console.log("jsonData", data);

    //Map JSON TO arrays
    var arrJobs = [];
    var arrJobOppty = [];
    Object.keys(data.jobs).forEach(function (key) {
      let item = data.jobs[key];
      //console.log("item", item);
      //console.log("item.departments[0].name", item.departments);
      let jobName = item.departments[0].name;
      let jobId = item.departments[0].id;
      let jobOppty = {};
      jobOppty.id = item.id;
      jobOppty.name = item.title;
      jobOppty.job = jobName;
      jobOppty.internal_job_id = item.internal_job_id;
      jobOppty.jobId = jobId;

      arrJobs.push(jobName);
      if (!Array.isArray(arrJobOppty[jobName])) arrJobOppty[jobName] = [];

      arrJobOppty[jobName].push(jobOppty);
    });

    //console.log("arrJobs", arrJobs);
    //console.log("arrJobOppty", arrJobOppty);

    //Make filter
    var htmlFilter = "";
    Object.keys(arrJobs).forEach(function (index) {
      let jobName = arrJobs[index];
      htmlFilter += `<div class="filter-item">
                          <label class="w-checkbox btn-light">
                            <input type="radio" id="radio-${jobName}" name="radio" class="radio-button">
                            <span class="btn-filter" for="radio">${jobName}</span>
                          </label>
                      </div>`;
    });

    //Add Filter to document
    $(".filter-item").remove();
    $(".collection-list").append(htmlFilter);
    /* $(".items-filter").append(
      `<div class="filter-item"><span class="reset" >Reset all</span></div>`
    );*/

    //Make items
    var html = "";
    Object.keys(arrJobOppty).forEach(function (job) {
      //Key Account
      html += `<div class="jobboards" f3-job="${job}">
                    <div class="head-container">
                      <h2 class="heading-xlarge-2 text-black">${job}</h2>
                      <p class="p-large text-black count">(${arrJobOppty[job].length})</p>
                    </div>
                    <div class="spacer-y-6"></div>
                    <div class="opportunities-container">`;

      Object.keys(arrJobOppty[job]).forEach(function (index) {
        let jobOppty = arrJobOppty[job][index];
        // console.log("jobOpptyId", jobOppty.id);

        html += `<div class="opportunities-item">
                    <div class="item">
                      <div class="separator"></div>
                      <div class="spacer-y-4"></div>
                      <div class="spacer-y-4"></div>
                      <a class="link-job" href="/job-opportunities?gh_jid=${jobOppty.id}"><h1 class="heading-md-2 text-black">${jobOppty.name}</h1></a>
                    </div>
                  </div>`;
      });

      html += ` </div>
                <div class="spacer-y-6"></div>
              </div>`;
    });

    //Add items to document
    $(".jobboards").remove();
    $(".categories-container").append(html);

    //Events
    $(".btn-light").on("click", function () {
      //filter selected
      $(".btn-light, .btn-filter").removeClass("cc-dark");
      $(this).addClass("cc-dark");
      $(this).children(".btn-filter").addClass("cc-dark");

      //filter data
      $(`[f3-job]`).addClass("hidden");
      console.log($(this).children("span").html());
      $(`[f3-job="${$(this).children("span").html()}"]`).removeClass("hidden");
    });

    $(".reset").on("click", function () {
      $(".btn-light, .btn-filter").removeClass("cc-dark");
      $(`[f3-job]`).removeClass("hidden");
    });
  }) //then
  .catch((error) => {
    console.log(error.message);
  });
