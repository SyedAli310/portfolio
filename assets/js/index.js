$(document).ready(function () {
  const animatedHero = document.querySelector("#animated-text-hero");
  const hiSpan = document.querySelector("#animated-text-hero .hi-span");
  const getInTouchFormInpFields = document.querySelectorAll('.modal .input-field');
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

  $('#get-in-touch-form').on('submit',(e)=>{
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    const data = {name ,email, message}
    if(data && name && email && message){
      console.log('formData',data);
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    }
  });

  //floating labels by jQuery
  getInTouchFormInpFields.forEach((field)=>{
    $(field).on('focus',(e)=>{
      $(e.target).siblings(".input-label").css('transform','translateY(0)');
      $(e.target).siblings(".input-label").css('opacity','1');
      $(e.target).siblings(".input-label").css('visibility','visible');
    })
    $(field).on('blur',(e)=>{
      $(e.target).siblings(".input-label").css('transform','translateY(50%)');
      $(e.target).siblings(".input-label").css('opacity','0');
      $(e.target).siblings(".input-label").css('visibility','hidden');
    })
  })

})