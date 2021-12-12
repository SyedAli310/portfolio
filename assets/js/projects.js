$(document).ready(function () {
  // projects appear animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animation = "slide-in-up ease 300ms forwards";
    card.style.animationDelay = `${100 * index}ms`;
  });

  //modal open handlers
  $(".filters-btn").on("click", (e) => {
    $(".filters-modal").addClass("active");
  });
});
