$(document).ready(() => {
  function checkScroll() {
    if ($(document).scrollTop() > 1) {
      $(".main-navigation").addClass("scrolled");
    } else {
      $(".main-navigation").removeClass("scrolled");
    }
  }
  checkScroll();
  $("#mobile-nav-toggle").on("click", () => {
    // animate button
    $("#mobile-nav-toggle").toggleClass("open");
    // toggle navigation
    $(".navbar").toggleClass("is-open");
  });
  $(document).on("scroll", checkScroll);
  $(".get-in-touch-btn").on("click", (e) => {
    $(".modal").addClass("active");
  });
  $(".open-modal-btn").on("click", (e) => {
    $(".modal").addClass("active");
  });
  $(".modal-close-btn").on("click", (e) => {
    $(".modal").toggleClass("active");
  });
  $(".modal-close-btn").on("mouseenter", () => {
    $(".modal-body").addClass("to-be-closed");
    $(".modal-header").addClass("to-be-closed");
  });
  $(".modal-close-btn").on("mouseleave", () => {
    $(".modal-body").removeClass("to-be-closed");
    $(".modal-header").removeClass("to-be-closed");
  });
  $(".modal").on("click", (e) => {
    if (
      $(".modal").hasClass("active") &&
      e.target.classList.contains("modal")
    ) {
      $(".modal").removeClass("active");
    }
  });
});
