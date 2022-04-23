$(document).ready(function () {
  // random skill floating animation
  const floatingIcons = document.querySelectorAll(".floating-icons");
  const skillsDetailWrapper = document.querySelector("#skills-details-wrapper");
  const floatingIconsWrapper = document.querySelector("#floating-icons-wrap");

  const SKILLS_URL =
    "https://syedali310.github.io/mock-db/portfolio/skills.json";

  window.onload = async () => {
    floatingIconsWrapper.innerHTML = "loading...";
    const skills = await fetchSkills();
    floatingIconsWrapper.innerHTML = "";
    await renderFloatingIcons(skills);
    await animateFloatingIcons();
    renderSkillsDetail(skills);
  };

  const fetchSkills = async () => {
    const response = await fetch(SKILLS_URL);
    const skills = await response.json();
    return skills;
  };

  const getUniqueSkillTypes = (skills) => {
    const skillTypes = [];
    skills.forEach((skill) => {
      skill.type.forEach((type) => {
        if (!skillTypes.includes(type)) {
          skillTypes.push(type);
        }
      });
    });
    return skillTypes;
  };

  const renderSkillsDetail = (skills) => {
    const uniqueSkillTypes = getUniqueSkillTypes(skills);
    uniqueSkillTypes.forEach((type) => {
      const skillTypeDiv = document.createElement("fieldset");
      skillTypeDiv.classList.add("skill-type");
      skillTypeDiv.innerHTML = `<legend>${type}</legend>`;
      const skillTypeSkills = skills.filter((skill) =>
        skill.type.includes(type)
      );
      const skillsOfType = document.createElement("div");
      skillsOfType.classList.add("skills-of-type");
      skillTypeSkills.forEach((skill) => {
        const skillDiv = document.createElement("div");
        skillDiv.classList.add("skill");
        skillDiv.innerHTML = `
        <a href='${skill.docs}' target='_blank'>
          <img src='${skill.image}' style='height:15px; widht:15px;'/>
          <p>${skill.name}</p>
          </a>
          ${
            skillTypeSkills.indexOf(skill) == skillTypeSkills.length - 1
              ? ""
              : "<span style='color:var(--WHITE);'>&nbsp;|</span>"
          }
        `;
        skillsOfType.appendChild(skillDiv);
      });
      skillTypeDiv.appendChild(skillsOfType);
      skillsDetailWrapper.appendChild(skillTypeDiv);
    });
  };

  // <div class="floating-icons" name="logo-js">
  //   <img src="../assets/img/skills-icons/javascript.png" alt="php" />
  //   <span>JavaScript</span>
  // </div>

  const renderFloatingIcons = async (skills) => {
    skills.forEach((skill) => {
      const floatingIcon = document.createElement("div");
      floatingIcon.classList.add("floating-icons");
      floatingIcon.setAttribute("name", skill.name);
      floatingIcon.innerHTML = `
        <img src="${skill.image}" alt="${skill.name}" />
        <span>${skill.name}</span>
      `;
      floatingIconsWrapper.appendChild(floatingIcon);
    });
  };

  const animateFloatingIcons = async () => {
    const floatingIcons = document.querySelectorAll(".floating-icons");
    floatingIcons.forEach((icon, index) => {
      icon.style.animation = "slide-in-up ease 300ms forwards";
      icon.style.animationDelay = `${100 * index}ms`;
    });
    // wait for animation to finish
    await new Promise((resolve) =>
      setTimeout(resolve, 100 * floatingIcons.length)
    );
  };
});
