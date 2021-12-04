$(document).ready( () => {
    const animatedHero = document.querySelector('#animated-text-hero');

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
  animatedHero.style.animation = 'appear-from-middle ease 1s forwards';

  function changeProfessionText() {
    const professionText = document.querySelector('.profession-span');
    const professionTextArray = ['Web Developer', 'Web Designer', 'UI/UX Designer', 'Graphic Designer'];
    let index = 0;
    setInterval( () => {
      professionText.innerHTML = professionTextArray[index];
      index++;
      if (index >= professionTextArray.length) {
        index = 0;
      }
    }, 2000);
  }
    changeProfessionText();
});
