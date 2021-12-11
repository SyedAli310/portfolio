$(document).ready(function () {
  const animatedHero = document.querySelector("#animated-text-hero");
  const hiSpan = document.querySelector("#animated-text-hero .hi-span");
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
  $('.get-in-touch-btn').on('click',(e)=>{
    $('.modal').addClass('active');
  })
  $('.modal-close-btn').on('click',(e)=>{
    $('.modal').toggleClass('active');
  })
  $('#get-in-touch-form').on('submit',(e)=>{
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    const data = {name ,email, message}
    console.log('formData',data);
  })
});