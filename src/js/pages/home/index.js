$(document).ready(function () {
  $("#tab1").click(function () {
    if ($("#tab1").hasClass("is-tab-active")) {
      $("#tab1").removeClass("is-tab-active");
      $("#panel1").addClass("is-hidden");
    } else {
      $("#tab2").removeClass("is-tab-active");
      $("#tab1").addClass("is-tab-active");
      $("#panel2").addClass("is-hidden");
      $("#panel1").removeClass("is-hidden");
      $("#tab-top-1").addClass("is-tab-top-active");
      $("#panel1").show();
      $("#panel1").toggle();
      $("#panel2").hide();
    }

    $("#panel1").toggle();
    $("#panel2").hide();
  });

  $("#tab2").click(function () {
    if ($("#tab2").hasClass("is-tab-active")) {
      $("#tab2").removeClass("is-tab-active");
      $("#panel2").addClass("is-hidden");
    } else {
      $("#tab1").removeClass("is-tab-active");
      $("#tab2").addClass("is-tab-active");
      $("#panel1").addClass("is-hidden");
      $("#panel2").removeClass("is-hidden");
      $("#tab-top-4").addClass("is-tab-top-active");
      $("#panel1").hide();
      $("#panel2").toggle();
    }
    $("#panel1").hide();
    $("#panel2").toggle();
  });

  $("#tab-top-2").click(function () {
    $("#panel2").delay(1000).fadeToggle();
    $("#tab1").removeClass("is-tab-active");
    $("#panel1").removeClass("is-show");
    $("#panel2").addClass("is-show");
    $("#tab2").addClass("is-tab-active");
    $("#tab-top-4").addClass("is-tab-top-active");
    $("#panel1").addClass("is-hidden");
    $("#panel2").removeClass("is-hidden");
  });

  $("#tab-top-3").click(function () {
    $(".is-horizontal-1").delay(1000).fadeToggle();
    $("#tab2").removeClass("is-tab-active");
    $("#panel1").removeClass("is-hidden");
    $("#panel1").addClass("is-show");
    $("#tab1").addClass("is-tab-active");
    $("#tab-top-1").addClass("is-tab-top-active");
    $("#panel2").addClass("is-hidden");
    $("#panel1").removeClass("is-hidden");
  });
});
