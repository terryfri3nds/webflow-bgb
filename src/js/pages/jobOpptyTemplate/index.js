$(document).ready(function () {
  function displayRandomImage() {
    var num = Math.floor(Math.random() * $(".job-img-wrapper").length) + 1;
    console.log(num);
    $(".job-img-wrapper:nth-of-type(" + num + ")").addClass("show");
    $("#heroImageID").removeClass("hidden");
  }

  displayRandomImage();

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
  getJobBoards().then((data) => {
    console.log("jsonData", data);

    var jobOppty = {};

    Object.keys(data.jobs).forEach(function (key) {
      let item = data.jobs[key];

      let jobName = item.departments[0].name;
      let jobId = item.departments[0].id;

      jobOppty.id = item.id;
      jobOppty.name = item.title;
      jobOppty.job = jobName;
      jobOppty.internal_job_id = item.internal_job_id;
      jobOppty.jobId = jobId;
    });

    $("#jobPostNameID").html(jobOppty.name);
    $("#jobPostNameID").removeClass("is-inactive");
  });
});
