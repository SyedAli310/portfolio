$(document).ready(function () {
  // projects appear animation
  const projectCards = document.querySelectorAll(".project-card");
  const cardsContainer = document.querySelector(".projects-container");

  const projectViewModal = document.querySelector(".project-view-modal");
  window.onload = async () => {
    await fillProjectCards();
    console.log("projects loaded");
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.style.animation = "slide-in-left ease 300ms forwards";
      card.style.animationDelay = `${100 * index}ms`;
    });
  };

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

  const getLanguagesOfProject = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
    projectViewContent.innerHTML = `
    <h4>${
      projectData.description
        ? projectData.description
        : "No description available"
    }</h4>
    <br>
 
      <span>Languages: </span>
      <span style='color:var(--MAIN_ACCENT);'>
      ${
        projectLangs
          ? Object.keys(projectLangs).join(" | ")
          : "No languages specified"
      }
      </span>
      <br><br>
        <span> Topics : </span>
        <span style='color:var(--COLORFULL_YELLOW);'>
        ${
          projectData.topics.length > 0
            ? projectData.topics.join(" | ")
            : "No topics specified"
        }
        </span>
      
<br><br>
      <div style='display:flex; justify-content:flex-start; align-items:center; gap:1rem;'>
        <a class="btn" href="${projectData.html_url}" target="_blank">
        <ion-icon name="logo-github"></ion-icon>
        Repo
        </a>
        <button class="btn homepage-checker" style='font-size:inherit;' data-url='${
          projectData.homepage
        }'>
          <ion-icon name="eye-outline"></ion-icon>
          Visit
        </button>
      </div>

      <br>
      <span style='display:flex; justify-content:flex-start; align-items:center;'>Created by &nbsp;
      <a href='${
        projectData.owner.html_url
      }' target='_blank' style='display:flex; justify-content:flex-start; align-items:center; gap:0.25rem; color:var(--COLORFULL_YELLOW);' >
      <img src='${projectData.owner.avatar_url}' alt='${
      projectData.owner.login
    }' style='width:20px; height:auto;' />
      ${projectData.owner.login}
      </a> 
      &nbsp;on ${new Date(projectData.created_at).toLocaleDateString()}</span>
               
    `;
    bindHomepageCheckerEvent(
      projectViewModal.querySelectorAll(".homepage-checker")
    );
  };

  const fillProjectCards = async () => {
    cardsContainer.innerHTML =
      "<h4 style='color:var(--WHITE);'>Loading projects...</h4>";
    const res = await fetch("https://api.github.com/users/SyedAli310/repos");
    const data = await res.json();
    console.log(data);
    cardsContainer.innerHTML = "";
    data.forEach((project, index) => {
      const newCard = document.createElement("div");
      newCard.classList.add("project-card");

      newCard.innerHTML = `
        <div class="project-card-img">
          <img
            src="https://picsum.photos/300/200?random=${index}"
            alt="project-${index}"
          />
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
          <span>${project.name}</span> 
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
      // const projectLangs = await getLanguagesOfProject(project.languages_url);
      // newCard.querySelector(".languages-tags").innerHTML = `
      //   <span>Languages: </span>
      //   <span style='color:var(--MAIN_ACCENT);'>
      //   ${
      //     projectLangs
      //       ? Object.keys(projectLangs).join(" | ")
      //       : "No languages specified"
      //   }
      //   </span>
      // `;

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
