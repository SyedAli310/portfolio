$(document).ready(function () {
  const animatedHero = document.querySelector("#animated-text-hero");
  const hiSpan = document.querySelector("#animated-text-hero .hi-span");
  const getInTouchFormInpFields = document.querySelectorAll('.modal .input-field');
  const smallSpinner = `<span id='spinner-sm'></span>`
  animatedHero.style.animation = "appear-from-middle ease 1s forwards";
  hiSpan.style.animation =
    "slide-in-left 1s ease 1s forwards, gradient-animation 3s backwards infinite";
  function changeProfessionText() {
    const professionText = document.querySelector(".profession-span");
    const professionTextArray = [
      "<ion-icon name='logo-web-component'></ion-icon>&nbsp;Web Designer",
      "<ion-icon name='globe-outline'></ion-icon>&nbsp;Web Developer",
      "<ion-icon name='desktop-outline'></ion-icon>&nbsp;UI/UX Designer",
      "<ion-icon name='game-controller-outline'></ion-icon>&nbsp;Graphic Designer",
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

    // sendMail function
    async function sendMail(params){
      var tempParams = {
          'to_email' : params.email,
          'from_name': params.name,
          'reply_to' : 'czuar47@gmail.com',
      };
      const res = await emailjs.send('service_bq0bz8q','template_iwj5q8g', tempParams)
      return res;
    }

  //modal open handlers
  $(".get-in-touch-btn").on("click", (e) => {
    $(".get-in-touch-modal").addClass("active");
  });

  //submit get-in-touch form
  $('#get-in-touch-form').on('submit', async (e)=>{
    e.preventDefault();
    $('#modal-send-msg-btn').html(`${smallSpinner}&nbsp;Sending`);
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    const data = {name ,email, message}
    if(data && name && email && message){
      console.log('formData',data);
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
      const mailData = {
        email,
        name,
      }
      const res = await sendMail(mailData);
      setTimeout(()=>{
        if(res){
          $('#form-res-span').html('<h5 style="color:var(--TEXT_SUCCESS);">Thank you for contacting me</h5>');
          $('#modal-send-msg-btn').html(`
              <span>Send</span>
              <ion-icon name="send-outline"></ion-icon>
          `);
        } else {
          $('#form-res-span').html('<h5 style="color:var(--TEXT_DANGER);">Something went wrong. Please try again.</h5>');
          $('#modal-send-msg-btn').html(`
              <span>Send</span>
              <ion-icon name="send-outline"></ion-icon>
          `);
        }
      },3500)
    }
  });

  const getGithubStats = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url)
    const data = await res.json();
    return data;
  }

  const fillDataFromGithub = async () =>{
    const data = await getGithubStats('SyedAli310');
    console.log(data);
    const avatarImg = document.querySelector('#gh-avatar');
    const name = document.querySelector('#gh-name');
    const bio = document.querySelector('#gh-bio');
    const joined = document.querySelector('#gh-joined');
    const repos = document.querySelector('#gh-repos');
    avatarImg.src = data.avatar_url;
    name.innerHTML = `${data.name} <br> <span style='font-size:smaller; opacity:0.5;'>${data.login}</span>`;
    bio.innerHTML = `<span style='color:grey;'>Bio :</span> ${data.bio}`;
    joined.innerHTML = `<span style='color:grey;'>Joined :</span> ${new Date(data.created_at).getMonth()}/${new Date(data.created_at).getFullYear()}`;
    repos.innerHTML = `<span style='color:grey;'>Repos :</span> ${data.public_repos}`;
  }
  window.onload = fillDataFromGithub()


  //floating input labels on focus
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