$(document).ready(function () {
  // projects appear animation
  const projectCards = document.querySelectorAll(".project-card");
  const cardsContainer = document.querySelector(".projects-container");

  const projectViewModal = document.querySelector(".project-view-modal");

  const GITHUB_USERNAME = "SyedAli310";

  window.onload = async () => {
    await fillProjectCards();
    console.log("projects loaded");
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.style.animation = "slide-in-left ease 300ms forwards";
      card.style.animationDelay = `${100 * index}ms`;
    });
  };

  const getInitials = (fullName) => {
    let response = "";
    var specialCharsNums = /[!@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?0123456789]+/;
    if (specialCharsNums.test(fullName)) {
      fullName = fullName.replace(
        /[&\/\\@#!,+()$~%^.'":*?<>{}0123456789]/g,
        ""
      );
    }

    fullName = fullName.replace(/\s+/g, " ");
    fullName = fullName.trim();
    localStorage.setItem("f_name", fullName);
    //console.log('Full name after processing: ',fullName); //dev-purpose-log
    if (fullName.length <= 1) {
      response = "error";
    } else {
      let fullNameArr = fullName.split(" ");
      // console.log("Array constructed: ", fullNameArr); //dev-purpose-log
      if (typeof fullNameArr[1] === "undefined") {
        response =
          fullNameArr[0][0].toUpperCase() + fullNameArr[0][1].toUpperCase();
      } else {
        response =
          fullNameArr[0][0].toUpperCase() +
          fullNameArr[fullNameArr.length - 1][0].toUpperCase();
      }
    }
    // console.log('Func res = ',response); //dev-purpose-log
    return response;
  };

  // generate random color
  function getRandomColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  const alertCustom = (msg) => {
    // remove previous alert
    const alertPrev = document.querySelector(".alert");
    if (alertPrev) {
      alertPrev.remove();
    }
    // create new alert
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = `
        <button class='btn alert-close-btn'>
           <ion-icon name="close-circle"></ion-icon>
        </button>
        <ion-icon name="alert-circle-outline"></ion-icon>
        <div>${msg}</div>
      `;
    document.body.appendChild(alert);
    // close alert
    alert.querySelector(".alert-close-btn").addEventListener("click", () => {
      alert.remove();
    });
    let timeout = setTimeout(() => {
      alert.remove();
    }, 3500);
    // stop alert from disappearing on mouseover
    alert.addEventListener("mouseover", () => {
      // pause alert
      clearTimeout(timeout);
    });
    alert.addEventListener("mouseout", () => {
      // resume alert
      timeout = setTimeout(() => {
        alert.remove();
      }, 2000);
    });
  };

  const addLanguagesPercentage = (langs) => {
    let total = 0;
    Object.keys(langs).forEach((lang) => {
      total += langs[lang];
    });
    Object.keys(langs).forEach((lang) => {
      tempPercentage = Number(((langs[lang] / total) * 100).toFixed(1));
      langs[lang] = tempPercentage;
    });
    return langs;
  };

  const getLanguagesOfProject = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const langsWithPercentage = addLanguagesPercentage(data);
    return langsWithPercentage;
  };

  const getRepoData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const bindHomepageCheckerEvent = (checkerBtns) => {
    checkerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const url = btn.dataset.url;
        if (!url || url === "null") {
          alertCustom(
            "This project is not deployed.<br> You can check the repo."
          );
        } else {
          window.open(url, "_blank");
        }
      });
    });
  };

  const bindProjectViewBtnEvent = (projectViewBtns) => {
    projectViewBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        openProjectViewer(e.target.dataset.projectUrl);
      });
    });
  };

  const openProjectViewer = async (projectUrl) => {
    projectViewModal.classList.add("active");
    const projectViewTitle = projectViewModal.querySelector(
      "#project-view-title"
    );
    const projectViewContent = projectViewModal.querySelector(
      "#project-view-content"
    );
    projectViewTitle.innerHTML = "Loading...";
    projectViewContent.innerHTML = "Loading...";
    const projectData = await getRepoData(projectUrl);
    const projectLangs = await getLanguagesOfProject(projectData.languages_url);
    console.log(projectData);
    projectViewTitle.innerHTML = projectData.name;
    if (projectData.fork) {
      projectViewTitle.classList.add("is-forked");
    } else {
      projectViewTitle.classList.remove("is-forked");
    }

    const descData = projectData.description
      ? projectData.description
      : "No description available";

    const descElement = document.createElement("p");
    descElement.classList.add("project-view-desc");
    descElement.innerHTML =
      descData +
      "<br>" +
      `<div class='sub-desc'>
      <span>
      Date: ${new Date(projectData.created_at).toLocaleDateString()} 
      </span>
      &bull;&nbsp;
      <span>
      Author: <a href='${projectData.owner.html_url}' target='_blank' >
      <img src='${projectData.owner.avatar_url}' alt='${
        projectData.owner.login
      }' style='width:20px; height:auto;' />
      ${projectData.owner.login}
      </a> 
      </span>
      </div>`;

    const langsElementWrapper = document.createElement("fieldset");
    langsElementWrapper.classList.add("langs-container");
    langsElementWrapper.innerHTML = "<legend>Languages </legend>";
    if (Object.keys(projectLangs).length > 0) {
      Object.keys(projectLangs).forEach((lang) => {
        const langElement = document.createElement("div");
        langElement.classList.add("lang-item");
        langElement.innerHTML = `${lang} - ${projectLangs[lang]}%`;
        langsElementWrapper.appendChild(langElement);
      });
    } else {
      langsElementWrapper.innerHTML += "No languages found";
    }

    const topicsData = projectData.topics
      ? projectData.topics
      : "No topics specified";
    const topicsElementWrapper = document.createElement("fieldset");
    topicsElementWrapper.classList.add("topics-container");
    topicsElementWrapper.innerHTML = "<legend>Topics </legend>";
    if (topicsData.length > 0) {
      topicsData.forEach((topic) => {
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic-item");
        topicElement.innerHTML = topic;
        topicsElementWrapper.appendChild(topicElement);
      });
    } else {
      topicsElementWrapper.innerHTML += "No topics specified";
    }

    projectViewContent.innerHTML = "";
    projectViewContent.appendChild(descElement);
    projectViewContent.appendChild(langsElementWrapper);
    projectViewContent.appendChild(topicsElementWrapper);

    projectViewContent.innerHTML += `      
<br><br>
      <div style='display:flex; justify-content:flex-start; align-items:center; gap:1rem;'>
        <a class="btn" href="${projectData.html_url}" target="_blank">
        <ion-icon name="logo-github"></ion-icon>
        Repo
        </a>
        <button class="btn homepage-checker" style='font-size:inherit;' data-url='${projectData.homepage}'>
          <ion-icon name="eye-outline"></ion-icon>
          Visit
        </button>
      </div>

       
    `;
    bindHomepageCheckerEvent(
      projectViewModal.querySelectorAll(".homepage-checker")
    );
  };

  const fillProjectCards = async () => {
    cardsContainer.innerHTML =
      "<h4 style='color:var(--WHITE);'>Loading projects...</h4>";
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`
    );
    const data = await res.json();
    console.log(data);
    cardsContainer.innerHTML = "";
    data.forEach((project, index) => {
      const newCard = document.createElement("div");
      newCard.classList.add("project-card");
      newCard.innerHTML = `
        <div class="project-card-img"
        style='
        --rand-clr-1: ${getRandomColor()};
        --rand-clr-2: ${getRandomColor()};
        '
        >
          <h1>${getInitials(project.name)}</h1>
        </div>
        <div class="project-card-title">${project.name}</div>
          <div class="project-card-links">
            <a class="btn" href="${project.html_url}" target="_blank">
              <ion-icon name="logo-github"></ion-icon>
              Repo
            </a>
            <button class="btn homepage-checker" data-url='${project.homepage}'>
              <ion-icon name="eye-outline"></ion-icon>
              Visit
            </button>
        </div>
        <div class="project-card-content">
        <h4>
          <span style='color:var(--MAIN_ACCENT);'>${project.name}</span> 
          <button class='btn project-view-btn' data-project-url='${
            project.url
          }'><ion-icon name="expand"></ion-icon></button>
        </h4>
        <hr>
          <small>${
            project.description
              ? project.description
              : "No description available"
          }</small>
          <br>
          <small class='main-lang'>
            ${project.language}
          </small>
        </div>
      `;
      cardsContainer.append(newCard);
    });
    bindHomepageCheckerEvent(document.querySelectorAll(".homepage-checker"));
    bindProjectViewBtnEvent(document.querySelectorAll(".project-view-btn"));
  };
  //modal open handlers
  $(".filters-btn").on("click", (e) => {
    $(".filters-modal").addClass("active");
  });
});
