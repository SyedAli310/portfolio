$(document).ready(() => {
    const socialLinks = document.querySelectorAll(".social-links a");
    window.onload = () => {
      socialLinks.forEach((link, index) => {
          link.style.animation = "slide-in-left ease 300ms forwards";
          link.style.animationDelay = `${100 * index}ms`;
      });
    }
}); 