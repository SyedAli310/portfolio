$(document).ready(function () {
  const animatedHero = document.querySelector(".animated-text-hero");
  const hiSpan = document.querySelector(".animated-text-hero .hi-span");
  const getInTouchFormInpFields = document.querySelectorAll(
    ".input-field"
  );
  const smallSpinner = `<span class='spinner-sm'></span>`;
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
  async function sendMail(params) {
    var tempParams = {
      to_email: params.email,
      from_name: params.name,
      reply_to: "czuar47@gmail.com",
    };
    const res = await emailjs.send(
      "service_bq0bz8q",
      "template_iwj5q8g",
      tempParams
    );
    return res;
  }

  //modal open handlers
  $(".get-in-touch-btn").on("click", (e) => {
    $(".get-in-touch-modal").addClass("active");
  });

  //submit get-in-touch form
  $("#get-in-touch-form").on("submit", async (e) => {
    e.preventDefault();
    $("#modal-send-msg-btn").html(`${smallSpinner}&nbsp;Sending`);
    const name = $("#name").val();
    const email = $("#email").val();
    const message = $("#message").val();
    const data = { name, email, message };
    if (data && name && email && message) {
      console.log("formData", data);
      $("#name").val("");
      $("#email").val("");
      $("#message").val("");
      const mailData = {
        email,
        name,
      };
      const res = await sendMail(mailData);
      setTimeout(() => {
        if (res) {
          $("#form-res-span").html(
            '<h5 style="color:var(--TEXT_SUCCESS);">Thank you for contacting me</h5>'
          );
          $("#modal-send-msg-btn").html(`
              <span>Send</span>
              <ion-icon name="send-outline"></ion-icon>
          `);
        } else {
          $("#form-res-span").html(
            '<h5 style="color:var(--TEXT_DANGER);">Something went wrong. Please try again.</h5>'
          );
          $("#modal-send-msg-btn").html(`
              <span>Send</span>
              <ion-icon name="send-outline"></ion-icon>
          `);
        }
      }, 3500);
    }
  });

  const getGithubStats = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const fillDataFromGithub = async (username) => {
    try {
      const gh_stats = document.getElementById("github-stats");
      gh_stats.innerHTML = `<div class="spinner-lg"></div>`;
      const data = await getGithubStats(username);
      console.log(data);
      if (Object.keys(data).includes("message")) {
        gh_stats.innerHTML = `<h2 style="color:var(--TEXT_DANGER); text-align:center;">Invalid Username</h2>`;
        return;
      }
      gh_stats.innerHTML = `
      <div class="github-user">
      <a href="https://github.com/${data.login}" target="_blank" class='github-profile-link'>
      <div class="user-profile">
        <img src="${data.avatar_url}" alt="" id="gh-avatar" class="gh-avatar">
        <p id="gh-name">${data.name || "Not Set"}<br> 
        <span style='font-size:smaller; opacity:0.5;'>${data.login}</span>
        </p>
        </div>
      </a>
      <div class="user-info">
          <p id="gh-bio"><span style='color:grey;'>Bio :</span> ${
            data.bio || "Not Set"
          }</p>
          <p id="gh-joined"><span style='color:grey;'>Joined :</span> ${new Date(
            data.created_at
          ).getMonth()}/${new Date(data.created_at).getFullYear()}</p>
          <p id="gh-repos"><span style='color:grey;'>Repos :</span> ${
            data.public_repos
          }</p>
      </div>
      </div>
      <div class="github-contributions">
        <h1>Contributions</h1>
        <img src="https://ghchart.rshah.org/green/${username}" id="contributions-img" alt="Syed Ali Contributions - GitHub">
      </div>
      `;
    } catch (error) {
      gh_stats.innerHTML = `<h2 style="color:var(--TEXT_DANGER); text-align:center;">${error.message}</h2>`;
      return;
    }
  };
  window.onload = fillDataFromGithub("SyedAli310");

  $('#gh-finder').on('submit', async (e) => {
    e.preventDefault();
    const username = $('#gh-username-inp').val();
    if (username) {
      fillDataFromGithub(username);
    }
  });
  //floating input labels on focus
  getInTouchFormInpFields.forEach((field) => {
    $(field).on("focus", (e) => {
      $(e.target).siblings(".input-label").css("transform", "translateY(0)");
      $(e.target).siblings(".input-label").css("opacity", "1");
      $(e.target).siblings(".input-label").css("visibility", "visible");
    });
    $(field).on("blur", (e) => {
      $(e.target).siblings(".input-label").css("transform", "translateY(50%)");
      $(e.target).siblings(".input-label").css("opacity", "0");
      $(e.target).siblings(".input-label").css("visibility", "hidden");
    });
  });
});
