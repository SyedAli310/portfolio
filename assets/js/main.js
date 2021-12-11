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
  $('.modal-close-btn').on('mouseenter', () => {
    $('.modal-body').addClass('to-be-closed');
    $('.modal-header').addClass('to-be-closed');
  })
  $('.modal-close-btn').on('mouseleave', () => {
    $('.modal-body').removeClass('to-be-closed');
    $('.modal-header').removeClass('to-be-closed');
  })
});
