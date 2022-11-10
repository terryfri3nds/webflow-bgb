$(document).ready(function () {
  /* VIDEO PLAYER */
  var videoList = document.querySelectorAll("video");
  var arrPlayers = [];

  for (video of videoList) {
    var player = videojs(video, {
      controls: true,
      autoplay: true,
      preload: "auto",
    });

    arrPlayers.push(player);

    player.on("pause", function (e) {
      console.log(e);
      e.target.player.posterImage.el_.style.display = "block";
      e.target.parentNode.classList.add("video-cursor-play");
      e.target.parentNode.classList.remove("video-cursor-pause");
    });

    player.on("play", function (e) {
      console.log(e);
      e.target.parentNode.classList.add("video-cursor-pause");
      e.target.player.posterImage.el_.style.display = "none";
      e.target.parentNode.classList.remove("video-cursor-play");
    });
  }

  $(".popup-close").on("click", function () {
    console.log("pase", arrPlayers);
    for (player of arrPlayers) {
      player.currentTime(0); // 2 minutes into the video
      player.pause();
      //player.posterImage.el_.style.display = "block";

      player.bigPlayButton.show();
    }
  });
  /* END VIDEO PLAYER */
});
