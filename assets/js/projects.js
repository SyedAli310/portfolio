$(document).ready(function () {
  // projects appear animation
  const projectCards = document.querySelectorAll(".project-card");
  const cardsContainer = document.querySelector(".projects-container");
  window.onload = async () => {
    await fillProjectCards();
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.style.animation = "slide-in-left ease 300ms forwards";
      card.style.animationDelay = `${100 * index}ms`;
    });
  };

  const alertCustom = (msg) => {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = msg;
    document.body.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 3000);
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
          ${
            project.description
              ? project.description
              : "No description available"
          }
        </div>
      `;
      cardsContainer.append(newCard);
    });

    // homepage checker
    const checkerBtns = document.querySelectorAll(".homepage-checker");
    checkerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const url = btn.dataset.url;
        if (!url || url === "null") {
          alertCustom("This project has no homepage");
        } else {
          // alertCustom("Opening homepage...");
          window.open(url, "_blank");
        }
      });
    });
  };
  //modal open handlers
  $(".filters-btn").on("click", (e) => {
    $(".filters-modal").addClass("active");
  });
});
