$(document).ready(() => {
  //<-start of document ready->//

  // function to check the document scroll location
  function checkScroll() {
    if ($(document).scrollTop() > 1) {
      $(".main-navigation").addClass("scrolled");
    } else {
      $(".main-navigation").removeClass("scrolled");
    }
  }
  checkScroll();

  // toggle (open/close) navigation-menu
  $("#mobile-nav-toggle").on("click", () => {
    // animate button
    $("#mobile-nav-toggle").toggleClass("open");
    // toggle navigation
    $(".navbar").toggleClass("is-open");
  });

  // run checkScroll() function whenever document is scrolled
  $(document).on("scroll", checkScroll);

  // modal open/close handlers

  $(".open-modal-btn").on("click", (e) => {
    $(".modal").addClass("active");
  });
  $(".modal-close-btn").on("click", (e) => {
    $(".modal").toggleClass("active");
  });

  // close modal on clicking outside of modal
  $(".modal").on("click", (e) => {
    if (
      $(e.target).hasClass("active") &&
      e.target.classList.contains("modal")
    ) {
      $(e.target).removeClass("active");
    }
  });

  //close navigation-menu on clicking outside of navigation-menu
  $("body").on("click", (e) => {
    // console.log(e.target);
    if (
      $(".navbar").hasClass("is-open") &&
      !$(e.target).hasClass("navbar") &&
      !$(e.target).hasClass("mobile-nav-toggle") &&
      !$(e.target).hasClass("hamburger") &&
      !$(e.target).hasClass("nav-links") &&
      !$(e.target).hasClass("nav-anchor-links") &&
      !$(e.target).hasClass("navbar-title")
    ) {
      // console.log('clicked');
      // animate button
      $("#mobile-nav-toggle").removeClass("open");
      // toggle navigation
      $(".navbar").removeClass("is-open");
    } else {
      // console.log('not clicked');
      return;
    }
  });

  //adding animation to section-heading
  $(".section-heading").css("animation", "appear-from-top 0.5s ease forwards");

  // store the original tab title
  var origTitle = document.title;

  // function to change title when focusing on tab
  function oldTitle() {
    document.title = origTitle;
  }

  // function to change title when un-focusing on tab
  function newTitle() {
    document.title = `Idling💤 / ` + ` ${origTitle}`;
  }

  // bind functions to blur and focus events
  window.onblur = newTitle;
  window.onfocus = oldTitle;

  function fillFooterYear() {
    var date = new Date();
    var year = date.getFullYear();
    $(".footer-year").text(year);
  }
  fillFooterYear();

  //<-end of document ready->//
});
