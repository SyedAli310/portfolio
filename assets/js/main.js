$(document).ready(() => {
  const animatedHero = document.querySelector("#animated-text-hero");
  const hiSpan = document.querySelector("#animated-text-hero .hi-span");

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
  animatedHero.style.animation = "appear-from-middle ease 1s forwards";
  hiSpan.style.animation =
    "slide-in-left 2s ease 1s forwards, gradient-animation 3s backwards infinite";
  function changeProfessionText() {
    const professionText = document.querySelector(".profession-span");
    const professionTextArray = [
      "<ion-icon name='globe-outline'></ion-icon>Web Developer",
      "<ion-icon name='globe-outline'></ion-icon>Web Designer",
      "<ion-icon name='globe-outline'></ion-icon>UI/UX Designer",
      "<ion-icon name='globe-outline'></ion-icon>Graphic Designer",
    ];
    let index = 0;
    setInterval(() => {
      professionText.classList.add("pre-animation");
      setTimeout(function () {
        professionText.innerHTML = professionTextArray[index];
        professionText.classList.remove("pre-animation");
      }, 750);
      index++;
      if (index >= professionTextArray.length) {
        index = 0;
      }
    }, 3500);
  }
  changeProfessionText();
});
